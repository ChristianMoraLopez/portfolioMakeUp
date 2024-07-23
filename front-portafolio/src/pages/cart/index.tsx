import React from 'react';
import Link from 'next/link';
import AppLayout from '@/components/Layout';
import { useCart, useCartMutations } from '@store/Cart';
import { ShoppingCart, Trash, Plus, Minus } from 'lucide-react';
import usePurchase from '@/hooks/usePurchase';

const CartPage: React.FC = () => {
  const { items, subTotal } = useCart();
  const { addToCart, removeFromCart } = useCartMutations();
  const { handleSubmit, error } = usePurchase();

  const handleCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit({
      amount: subTotal.toFixed(2),
      description: 'Compra de servicios',
      referenceCode: `REF-${Date.now()}`,
    });
  };

  if (items.length === 0) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <ShoppingCart size={64} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Tu carrito está vacío</h2>
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            Continuar Comprando
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Carrito de Compras</h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col sm:flex-row items-center">
                  <div className="sm:w-1/4 mb-4 sm:mb-0">
                    <div className="bg-gray-200 h-32 w-32 rounded-lg flex items-center justify-center">
                      <ShoppingCart size={48} className="text-gray-400" />
                    </div>
                  </div>
                  <div className="sm:w-1/2 sm:px-4">
                    <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <p className="text-blue-500 font-semibold mt-2">
                      Precio: ${typeof item.price === 'number' 
                        ? item.price.toFixed(2) 
                        : Number(item.price).toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <div className="sm:w-1/4 flex flex-col items-center sm:items-end mt-4 sm:mt-0">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button onClick={() => removeFromCart(item.id)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 transition duration-300 ease-in-out">
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 bg-white">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 transition duration-300 ease-in-out">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="mt-4 flex items-center text-red-500 hover:text-red-600 transition duration-300 ease-in-out">
                      <Trash size={16} className="mr-1" /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resumen</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Impuestos</span>
                  <span>$0.00</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${subTotal.toFixed(2)}</span>
                </div>
                <form onSubmit={handleCheckout}>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Finalizar Compra
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CartPage;