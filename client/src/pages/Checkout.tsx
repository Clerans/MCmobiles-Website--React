import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import api from '../utils/api';

export const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    if (items.length === 0) {
        return <div className="text-center py-12">Cart is empty</div>;
    }

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        setLoading(true);

        try {
            await api.post('/orders', {
                userId: user.id,
                items,
                total: total + 500, // + Shipping
                customerDetails: {
                    name: user.name,
                    email: user.email,
                    address,
                    phone
                }
            });
            clearCart();
            alert('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            console.error('Order failed', error);
            alert('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 bg-gray-50 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h2>

                <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold border-b pb-2">Shipping Information</h3>
                        <Input
                            label="Address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="123 Main St, City"
                        />
                        <Input
                            label="Phone Number"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+94 77 123 4567"
                        />
                    </div>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-xl font-semibold border-b pb-2">Order Summary</h3>
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <span>Total (inc. shipping)</span>
                            <span>Rs. {(total + 500).toLocaleString()}</span>
                        </div>
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={loading}>
                        {loading ? 'Processing...' : 'Place Order'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
