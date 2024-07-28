import React, { useState } from 'react';
import Link from 'next/link';
import { useCart, useCartMutations } from '@store/Cart';
import { ShoppingCart, Trash, Plus, Minus } from 'lucide-react';
import md5 from 'crypto-js/md5';

const CartPage: React.FC = () => {
  const { items, subTotal } = useCart();
  const { addToCart, removeFromCart } = useCartMutations();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const merchantId = '1008897';
  const accountId = '1017706';
  const apiKey = 'tsG2CYzQLRDpQhkj6wmj6h5siZ';
  const referenceCode = `REF-${Date.now()}`;
  const currency = 'COP';
  const description = 'Compra de productos';

  const amount = subTotal.toFixed(2);
  const tax = (subTotal * 0.16).toFixed(2);
  const taxReturnBase = (subTotal - parseFloat(tax)).toFixed(2);

  const signatureString = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
  const signature = md5(signatureString).toString();

  const handleError = (error: unknown) => {
    console.error('Error during checkout:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    setError(errorMessage);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !phone) {
      setError('Please fill in all required fields.');
      return;
    }
    // Si la validación pasa, enviamos el formulario
    e.currentTarget.submit();
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
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
                    Price: ${Number(item.price).toFixed(2)}
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
                    <Trash size={16} className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subTotal.toFixed(2)} COP</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${tax} COP</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(parseFloat(amount) + parseFloat(tax)).toFixed(2)} COP</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} method="post" action="https://checkout.payulatam.com/ppp-web-gateway-payu/" className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="buyerEmail"
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    id="phone"
                    name="telephone"
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <input name="merchantId" type="hidden" value={merchantId} />
                <input name="accountId" type="hidden" value={accountId} />
                <input name="description" type="hidden" value={description} />
                <input name="referenceCode" type="hidden" value={referenceCode} />
                <input name="amount" type="hidden" value={amount} />
                <input name="tax" type="hidden" value={tax} />
                <input name="taxReturnBase" type="hidden" value={taxReturnBase} />
                <input name="currency" type="hidden" value={currency} />
                <input name="signature" type="hidden" value={signature} />
                <input name="test" type="hidden" value="0" />
                <input name="responseUrl" type="hidden" value="http://localhost:3000/payment/confirmation" />
                <input name="confirmationUrl" type="hidden" value="http://localhost:8000/api/payment/confirmation" />
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;