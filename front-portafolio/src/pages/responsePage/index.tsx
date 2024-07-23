import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface ApiResponse {
  signature: string;
  merchantId: string;
  accountId: string;
  referenceCode: string;
  amount: string;
  currency: string;
  status?: string;
  message?: string;
  [key: string]: any; // Add more fields as needed
}

const ResponsePage: React.FC = () => {
  const router = useRouter();
  const { responseData } = router.query;
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (responseData) {
      try {
        const parsedResponse = JSON.parse(responseData as string);
        setResponse(parsedResponse);
      } catch (e) {
        setError('Failed to parse response data.');
      }
    }
  }, [responseData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Response Page</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : response ? (
        <div>
          <h2 className="text-xl font-semibold">Response Details:</h2>
          <div className="bg-gray-100 p-4 rounded">
            {response.status && <p><strong>Status:</strong> {response.status}</p>}
            {response.message && <p><strong>Message:</strong> {response.message}</p>}
            <p><strong>Signature:</strong> {response.signature}</p>
            <p><strong>Merchant ID:</strong> {response.merchantId}</p>
            <p><strong>Account ID:</strong> {response.accountId}</p>
            <p><strong>Reference Code:</strong> {response.referenceCode}</p>
            <p><strong>Amount:</strong> {response.amount}</p>
            <p><strong>Currency:</strong> {response.currency}</p>
          </div>
        </div>
      ) : (
        <p>No response data available.</p>
      )}
    </div>
  );
};

export default ResponsePage;
