import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '@/components/Layout';

interface FormData {
  amount?: string;
  description?: string;
  referenceCode?: string;
  [key: string]: string | undefined;
}

interface LocationState {
  amount: string;
  description: string;
  referenceCode: string;
}

const MakePurchasePage: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignature = async () => {
      const { amount, description, referenceCode } = location.state as LocationState;
      
      try {
        const response = await axios.post<FormData>('/generate-signature', {
          amount,
          description,
          referenceCode,
        });
        setFormData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error generating signature:', error);
        setError('Error al generar la firma. Por favor, intente de nuevo.');
      }
    };

    fetchSignature();
  }, [location.state]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/';

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();
  };

  if (error) {
    return (
      <AppLayout>
        <div className="make-purchase">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="make-purchase">
        <h1>Confirmar Compra</h1>
        <p>Descripción: {formData.description}</p>
        <p>Total: ${formData.amount}</p>
        <form onSubmit={handleSubmit}>
          <button type="submit">Realizar Compra</button>
        </form>
      </div>
    </AppLayout>
  );
};

export default MakePurchasePage;