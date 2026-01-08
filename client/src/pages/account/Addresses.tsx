import React, { useEffect, useState } from 'react';
import { Plus, Trash2, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import api from '../../utils/api';

interface Address {
    id: string;
    name: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
    isDefault: boolean;
}

export const Addresses: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        name: '', street: '', city: '', province: '', postalCode: '', phone: '', isDefault: false
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await api.get('/auth/address');
            setAddresses(response.data);
        } catch (error) {
            console.error('Failed to fetch addresses');
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/address', formData);
            setIsAdding(false);
            setFormData({ name: '', street: '', city: '', province: '', postalCode: '', phone: '', isDefault: false });
            fetchAddresses();
        } catch (error) {
            alert('Failed to add address');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this address?')) return;
        try {
            await api.delete(`/auth/address/${id}`);
            fetchAddresses();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSetDefault = async (id: string) => {
        try {
            await api.put(`/auth/address/${id}/default`);
            fetchAddresses();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Address Book</h2>
                <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add New Address</>}
                </Button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddSubmit} className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                    <h3 className="font-bold mb-4">New Address Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        <Input label="Phone Number" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        <Input label="Street Address" required value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
                        <Input label="City" required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                        <Input label="Province/State" required value={formData.province} onChange={e => setFormData({ ...formData, province: e.target.value })} />
                        <Input label="Postal Code" required value={formData.postalCode} onChange={e => setFormData({ ...formData, postalCode: e.target.value })} />
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <input type="checkbox" id="def" checked={formData.isDefault} onChange={e => setFormData({ ...formData, isDefault: e.target.checked })} />
                        <label htmlFor="def">Make this my default address</label>
                    </div>
                    <div className="mt-4">
                        <Button type="submit">Save Address</Button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {addresses.length === 0 && !isAdding && <p className="text-gray-500">No addresses saved.</p>}
                {addresses.map(addr => (
                    <div key={addr.id} className={`border rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center ${addr.isDefault ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                        <div className="flex items-start gap-4">
                            <MapPin className={`w-6 h-6 mt-1 ${addr.isDefault ? 'text-indigo-600' : 'text-gray-400'}`} />
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-lg">{addr.name}</p>
                                    {addr.isDefault && <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-bold">Default</span>}
                                </div>
                                <p className="text-gray-600">{addr.street}, {addr.city}</p>
                                <p className="text-gray-600">{addr.province} {addr.postalCode}</p>
                                <p className="text-gray-600 mt-1">{addr.phone}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                            {!addr.isDefault && (
                                <Button variant="outline" size="sm" onClick={() => handleSetDefault(addr.id)}>Set as Default</Button>
                            )}
                            <button onClick={() => handleDelete(addr.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
