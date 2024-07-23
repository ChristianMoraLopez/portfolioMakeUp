import React from 'react';
import AppLayout from '@/components/Layout';
import usePurchase from '@/hooks/usePurchase';

interface PurchaseData {
  description: string;
  amount: number;
  referenceCode: string;
}

const MakePurchasePage: React.FC = () => {
  const { purchaseData, error, handleSubmit } = usePurchase();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (purchaseData) {
      handleSubmit(purchaseData);
    }
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

  if (!purchaseData) {
    return (
      <AppLayout>
        <div className="make-purchase">
          <p>Cargando...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="make-purchase">
        <h1>Confirmar Compra</h1>
        <p>Descripción: {purchaseData.description}</p>
        <p>Total: ${purchaseData.amount}</p>
        <form onSubmit={onSubmit}>
          <button type="submit">Realizar Compra</button>
        </form>
      </div>
    </AppLayout>
  );
};

export default MakePurchasePage;