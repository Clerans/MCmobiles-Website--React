import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

interface Order {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    items: any[];
}

export const Orders: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders'); // In real app, filter by user ID on backend or endpoint /orders/my
                // Mock filtering client side for now as our backend route returns all orders (simulated)
                // Actually our backend route returns ALL. We should filter on client for this demo.
                const allOrders = response.data;
                const myOrders = allOrders.filter((o: any) => o.userId === user?.id);
                setOrders(myOrders);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchOrders();
    }, [user]);

    if (loading) return <div className="text-center py-12">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h2>
            <div className="space-y-6">
                {orders.length === 0 ? (
                    <p className="text-gray-500">No orders found.</p>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-indigo-600">Rs. {order.total.toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {order.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm text-gray-700">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
