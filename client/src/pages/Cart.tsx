import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';

export const Cart: React.FC = () => {
    const { items, removeFromCart, updateQuantity, total } = useCart();

    const SHIPPING_COST = 500;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added any phones yet.</p>
                <Link to="/products">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Shopping Cart</h2>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-2/3">
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center gap-6 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-50" />
                                <div className="flex-grow">
                                    <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                                    <p className="text-gray-500">Rs. {item.price.toLocaleString()}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="text-right min-w-[100px]">
                                    <p className="font-bold text-lg text-gray-900">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors p-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <div className="pt-4">
                            <Link to="/products" className="text-indigo-600 font-semibold hover:underline flex items-center">
                                <ArrowLeft className="w-4 h-4 mr-1" /> Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/3">
                    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                        <div className="space-y-4 text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>Rs. {total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Rs. {SHIPPING_COST.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl text-gray-900">
                                <span>Total</span>
                                <span>Rs. {(total + SHIPPING_COST).toLocaleString()}</span>
                            </div>
                        </div>
                        {/* TODO: If logged in, go to Checkout, else to Login? Or Checkout can handle Auth */}
                        <Link to="/checkout" className="block mt-8">
                            <Button fullWidth size="lg">Proceed to Checkout</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};
