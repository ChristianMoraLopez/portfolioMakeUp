import { useState, useCallback } from 'react';
import axios from 'axios';

interface PurchaseData {
  amount: string;
  description: string;
  referenceCode: string;
}

const usePurchase = () => {
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPurchaseData = useCallback(async (amount: string, description: string, referenceCode: string) => {
    try {
      const response = await axios.post<PurchaseData>('http://localhost:8000/generate-signature', {
        amount,
        description,
        referenceCode,
      });

      setPurchaseData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error generating signature:', error);
      if (axios.isAxiosError(error)) {
        setError(`Error: ${error.response?.status} - ${error.response?.statusText}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  }, []);

  const handleSubmit = useCallback(async (data: PurchaseData) => {
    try {
      const response = await axios.post<PurchaseData>('http://localhost:8000/generate-signature', data);
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/';

      Object.entries(response.data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (axios.isAxiosError(error)) {
        setError(`Error: ${error.response?.status} - ${error.response?.statusText}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  }, []);

  return {
    purchaseData,
    error,
    fetchPurchaseData,
    handleSubmit,
  };
};

export default usePurchase;
