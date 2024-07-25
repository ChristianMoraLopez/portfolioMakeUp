<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    private $isTest = true; // Cambia esto a false para usar los datos de producción

    private $apiKey;
    private $merchantId;
    private $accountId;
    private $url;

    public function __construct()
    {
        if ($this->isTest) {
            // Datos de prueba
            $this->apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
            $this->merchantId = '508029';
            $this->accountId = '512321';
            $this->url = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/';
        } else {
            // Datos de producción
            $this->apiKey = 'tsG2CYzQLRDpQhkj6wmj6h5siZ';
            $this->merchantId = '5poAbwFB9ewb47Y';
            $this->accountId = 'PKh78itZ9rC91uP1W0E28G836Y';
            $this->url = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';
        }
    }

    public function initiatePayment(Request $request)
{
    $request->validate([
        'referenceCode' => 'required|string',
        'amount' => 'required|numeric',
        'currency' => 'required|string',
        'buyerEmail' => 'required|email',
        'description' => 'required|string',
    ]);

    $referenceCode = $request->input('referenceCode');
    $amount = number_format($request->input('amount'), 2, '.', '');
    $currency = $request->input('currency');
    $buyerEmail = $request->input('buyerEmail');
    $description = $request->input('description');

    $paymentData = [
        'merchantId' => $this->merchantId,
        'accountId' => $this->accountId,
        'description' => $description,
        'referenceCode' => $referenceCode,
        'amount' => $amount,
        'tax' => '0',
        'taxReturnBase' => '0',
        'currency' => $currency,
        'buyerEmail' => $buyerEmail,
        'responseUrl' => route('payment.response'),
        'confirmationUrl' => route('payment.confirmation'),
        'test' => $this->isTest ? '1' : '0',
    ];

    // Generate the signature
    $signature = md5($this->apiKey . "~" . $this->merchantId . "~" . $referenceCode . "~" . $amount . "~" . $currency);
    $paymentData['signature'] = $signature;

    // Generate the checkout URL
    $checkoutUrl = $this->url . '?' . http_build_query($paymentData);

    // Return JSON response with redirect URL
    return response()->json(['redirectUrl' => $checkoutUrl]);
}
    public function handleConfirmation(Request $request)
    {
        $referenceCode = $request->input('reference_sale');
        $transactionState = $request->input('state_pol');
        $TX_VALUE = $request->input('TX_VALUE');
        $currency = $request->input('currency');

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
