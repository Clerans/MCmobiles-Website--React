import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

interface Order {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    items: any[];
}

interface AccountOrdersProps {
    type: 'orders' | 'returns' | 'cancellations';
}

export const AccountOrders: React.FC<AccountOrdersProps> = ({ type }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                // Simple client-side filters for demo
                let allOrders = response.data.filter((o: any) => o.userId === user?.id);

                if (type === 'returns') {
                    allOrders = allOrders.filter((o: any) => o.status === 'Returned');
                } else if (type === 'cancellations') {
                    allOrders = allOrders.filter((o: any) => o.status === 'Cancelled');
                } else {
                    // "Orders" usually means active or completed, excluding returns/cancelled if strict, 
                    // but often includes all history. Let's just show non-cancelled/returned for "Orders" tab 
                    // or show all. User just asked for "View order history".
                }

                setOrders(allOrders);
            } catch (error) {
                console.error('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchOrders();
    }, [user, type]);

    const getTitle = () => {
        switch (type) {
            case 'returns': return 'My Returns';
            case 'cancellations': return 'My Cancellations';
            default: return 'My Orders';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{getTitle()}</h2>

            {loading ? <div>Loading...</div> : (
                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <p className="text-gray-500">No records found.</p>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="font-bold">Order #{order.id}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {order.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>Rs. {item.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>Rs. {order.total.toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
