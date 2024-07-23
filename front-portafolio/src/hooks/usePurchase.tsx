import { useState, useCallback } from 'react';
import axios from '@/lib/axios';
import { useAuth } from './auth';
import { AxiosError } from 'axios';

// Interface for purchase data
interface PurchaseData {
  amount: string;
  description: string;
  referenceCode: string;
  currency?: string;
}

const usePurchase = () => {
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { csrf, user } = useAuth(); // Get CSRF token and user from auth hook

  // Function to check if error is an AxiosError
  const isAxiosError = (error: any): error is AxiosError => {
    return error.isAxiosError === true;
  };

  // Make the request
  const makeRequest = useCallback(async (url: string, data: any) => {
    if (!user) {
      throw new Error('User is not authenticated');
    }
    await csrf(); // Ensure CSRF token is set
   
    return axios.post<PurchaseData>(url, data);
  }, [csrf, user]);

  // Handle errors
  const handleError = (error: unknown) => {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        setError('You are not authenticated. Please log in.');
      } else if (status === 419) {
        setError('CSRF token mismatch. Please refresh the page and try again.');
      } else {
        setError(`Error: ${status} - ${error.response?.statusText}`);
      }
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // Fetch purchase data
  const fetchPurchaseData = useCallback(async (amount: string, description: string, referenceCode: string, currency: string = 'USD') => {
    setIsLoading(true);
    try {
      const response = await makeRequest('/generate-signature', { amount, description, referenceCode, currency });
      if (response.status === 200) { // Check if response status is 200 OK
        setPurchaseData(response.data);
        setError(null);
        return response.data;
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error fetching purchase data:', error);
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [makeRequest]);

  // Handle form submission
  const handleSubmit = useCallback(async (data: PurchaseData) => {
    setIsLoading(true);
    try {
      const response = await makeRequest('/generate-signature', {
        ...data,
        currency: data.currency || 'USD',
      });
      if (response.status === 200) { // Check if response status is 200 OK
        setPurchaseData(response.data);
        setError(null);
        return response.data;
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [makeRequest]);

  return {
    purchaseData,
    error,
    isLoading,
    fetchPurchaseData,
    handleSubmit,
  };
};

export default usePurchase;
