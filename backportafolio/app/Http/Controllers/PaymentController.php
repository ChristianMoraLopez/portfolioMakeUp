<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    private $apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
    private $merchantId = '508029';
    private $accountId = '512321';

    public function generateSignature(Request $request)
    {
        $referenceCode = $request->input('referenceCode');
        $amount = $request->input('amount');
        $currency = $request->input('currency');

        $signature = md5("{$this->apiKey}~{$this->merchantId}~{$referenceCode}~{$amount}~{$currency}");

        return response()->json(['signature' => $signature]);
    }

    public function handleConfirmation(Request $request)
    {
        $referenceCode = $request->input('reference_sale');
        $transactionState = $request->input('state_pol');
        $signature = $request->input('signature');
        $TX_VALUE = $request->input('TX_VALUE');
        $currency = $request->input('currency');

        $newValue = number_format($TX_VALUE, 1, '.', '');
        $firmaCadena = "{$this->apiKey}~{$this->merchantId}~{$referenceCode}~{$newValue}~{$currency}~{$transactionState}";
        $firmaCreada = md5($firmaCadena);

        if (strtoupper($signature) != strtoupper($firmaCreada)) {
            return response()->json(['status' => 'error', 'message' => 'Firma no válida.']);
        }

        if ($transactionState == 4) {
            $estadoTx = "Transacción aprobada";
        } elseif ($transactionState == 6) {
            $estadoTx = "Transacción rechazada";
        } elseif ($transactionState == 104) {
            $estadoTx = "Error";
        } elseif ($transactionState == 7) {
            $estadoTx = "Pago pendiente";
        } else {
            $estadoTx = "Estado desconocido";
        }

        $service = Service::where('reference_code', $referenceCode)->first();

        if ($service && $transactionState == 4) {
            $user = Auth::user();
            $user->serviciosComprados()->attach($service);

            return response()->json(['status' => 'success', 'message' => 'Servicio comprado exitosamente.']);
        }

        return response()->json(['status' => 'error', 'message' => 'Servicio no encontrado o pago no confirmado.']);
    }

    public function misCompras()
    {
        $user = Auth::user();
        $serviciosComprados = $user->serviciosComprados()->get();

        return view('servicios.mis-compras', compact('serviciosComprados'));
    }
}
