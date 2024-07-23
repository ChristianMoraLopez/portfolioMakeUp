<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

class PaymentController extends Controller
{
    private $apiKey = 'tsG2CYzQLRDpQhkj6wmj6h5siZ';
    private $apiLogin = '5poAbwFB9ewb47Y';
    private $merchantId = '1008897';
    private $accountId = '1017706';

    public function generateSignature(Request $request)
    {
        $request->validate([
            'referenceCode' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string'
        ]);

        $referenceCode = $request->input('referenceCode');
        $amount = $request->input('amount');
        $currency = $request->input('currency');

        $signature = md5("{$this->apiKey}~{$this->merchantId}~{$referenceCode}~{$amount}~{$currency}");

        // Prepare the data for PayU request
        $data = [
            'language' => 'es',
            'command' => 'SUBMIT_TRANSACTION',
            'merchant' => [
                'apiKey' => $this->apiKey,
                'apiLogin' => $this->apiLogin
            ],
            'transaction' => [
                'order' => [
                    'accountId' => $this->accountId,
                    'referenceCode' => $referenceCode,
                    'description' => 'Payment description',
                    'language' => 'es',
                    'signature' => $signature,
                    'additionalValues' => [
                        'TX_VALUE' => [
                            'value' => $amount,
                            'currency' => $currency
                        ]
                    ]
                ],
                'payer' => [
                    // Add payer details here
                ],
                'creditCard' => [
                    // Add credit card details here
                ],
                'extraParameters' => [
                    // Add extra parameters here if needed
                ],
                'type' => 'AUTHORIZATION_AND_CAPTURE',
                'paymentMethod' => 'VISA',
                'paymentCountry' => 'CO',
                'deviceSessionId' => session_id(),
                'ipAddress' => $request->ip(),
                'cookie' => session()->getId(),
                'userAgent' => $request->userAgent()
            ],
            'test' => true
        ];

        $client = new Client();
        $response = $client->post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi', [
            'json' => $data
        ]);

        $responseBody = json_decode($response->getBody()->getContents(), true);

        return response()->json([
            'signature' => $signature,
            'merchantId' => $this->merchantId,
            'accountId' => $this->accountId,
            'referenceCode' => $referenceCode,
            'amount' => $amount,
            'currency' => $currency,
            'payUResponse' => $responseBody
        ]);
    }

    public function handleCallback(Request $request)
    {
        // Aquí se manejaría la lógica de la respuesta del callback de PayU
        // Asumimos que PayU envía información en la solicitud
        $request->validate([
            'referenceCode' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string',
            'transactionState' => 'required|integer',
            'signature' => 'required|string',
        ]);

        $referenceCode = $request->input('referenceCode');
        $amount = $request->input('amount');
        $currency = $request->input('currency');
        $transactionState = $request->input('transactionState');
        $signature = $request->input('signature');

        $newValue = number_format($amount, 1, '.', '');
        $firmaCadena = "{$this->apiKey}~{$this->merchantId}~{$referenceCode}~{$newValue}~{$currency}~{$transactionState}";
        $firmaCreada = md5($firmaCadena);

        if (strtoupper($signature) != strtoupper($firmaCreada)) {
            return response()->json(['status' => 'error', 'message' => 'Firma no válida.']);
        }

        $estadoTx = $this->getTransactionState($transactionState);

        $service = Service::where('reference_code', $referenceCode)->first();

        if ($service && $transactionState == 4) {
            $user = Auth::user();
            $user->serviciosComprados()->attach($service);

            return response()->json(['status' => 'success', 'message' => 'Servicio comprado exitosamente.']);
        }

        return response()->json(['status' => 'error', 'message' => 'Servicio no encontrado o pago no confirmado.']);
    }

    private function getTransactionState($transactionState)
    {
        switch ($transactionState) {
            case 4:
                return "Transacción aprobada";
            case 6:
                return "Transacción rechazada";
            case 104:
                return "Error";
            case 7:
                return "Pago pendiente";
            default:
                return "Estado desconocido";
        }
    }

    public function misCompras()
    {
        $user = Auth::user();
        $serviciosComprados = $user->serviciosComprados()->get();

        return view('servicios.mis-compras', compact('serviciosComprados'));
    }
}
