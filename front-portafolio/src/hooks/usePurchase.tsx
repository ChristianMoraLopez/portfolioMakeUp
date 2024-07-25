import React from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from './auth';

interface PurchaseData {
  amount: string;
  description: string;
  referenceCode: string;
}

export const usePurchase = () => {
  const router = useRouter();
  const { csrf } = useAuth(); // Se usa solo en funciones que requieren autenticación

  // Estado para almacenar el error
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (purchaseData: PurchaseData) => {
    try {
      await csrf(); // Establecer el token CSRF

      // Verifica si el token de autenticación está presente en el almacenamiento local
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found.');
      }

      const response = await axios.post('/payment/initiate', purchaseData, {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Obtén el token de tu almacenamiento local
        },
      });

      // Redirige al usuario a la página de confirmación de pago
      router.push('/payment/confirmation');
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred.';

      if (axios.isAxiosError(error)) {
        // La respuesta del error está disponible
        errorMessage = error.response?.data?.message || 'Error initiating payment.';
        console.error('Error initiating payment:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else if (error instanceof Error) {
        // Error estándar
        errorMessage = error.message;
        console.error('Error initiating payment:', error.message);
      } else {
        // Manejo de errores no esperados
        console.error('Unexpected error:', error);
      }

      // Actualiza el estado del error
      setError(errorMessage);
    }
  };

  return { handleSubmit, error };
};
