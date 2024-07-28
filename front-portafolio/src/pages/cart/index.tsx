import React, { useState } from 'react';
import Link from 'next/link';
import { useCart, useCartMutations } from '@store/Cart';
import { ShoppingCart, Trash, Plus, Minus, ShoppingBag } from 'lucide-react';
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
    e.currentTarget.submit();
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <ShoppingBag size={80} className="text-purple-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link href="/" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Your Shopping Cart</h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-xl">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="sm:w-1/4 mb-4 sm:mb-0">
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 h-32 w-32 rounded-lg flex items-center justify-center shadow-inner">
                      <ShoppingBag size={48} className="text-purple-500" />
                    </div>
                  </div>
                  <div className="sm:w-1/2 sm:px-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <p className="text-purple-600 font-bold text-xl">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="sm:w-1/4 flex flex-col items-center sm:items-end mt-4 sm:mt-0">
                    <div className="flex items-center border-2 border-purple-200 rounded-full overflow-hidden mb-4">
                      <button onClick={() => removeFromCart(item.id)} className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold py-2 px-4 transition duration-300 ease-in-out">
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 bg-white text-lg font-semibold text-purple-800">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold py-2 px-4 transition duration-300 ease-in-out">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="flex items-center text-red-500 hover:text-red-600 transition duration-300 ease-in-out font-semibold">
                      <Trash size={18} className="mr-2" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subTotal.toFixed(2)} COP</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">${tax} COP</span>
                </div>
                <div className="border-t-2 border-purple-100 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-purple-600">${(parseFloat(amount) + parseFloat(tax)).toFixed(2)} COP</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} method="post" action="https://checkout.payulatam.com/ppp-web-gateway-payu/" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    name="buyerEmail"
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    id="phone"
                    name="telephone"
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
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