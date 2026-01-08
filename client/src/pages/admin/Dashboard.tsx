import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}

export const Dashboard: React.FC = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            return;
        }

        fetchProducts();
    }, [isAdmin, navigate]);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/products', {
                name,
                price: Number(price),
                imageUrl,
                description
            });
            setIsAdding(false);
            resetForm();
            fetchProducts();
        } catch (error) {
            alert('Failed to add product');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            alert('Failed to delete product');
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setImageUrl('');
        setDescription('');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? 'Cancel' : 'Add New Product'}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto border border-indigo-100">
                    <h3 className="text-xl font-bold mb-4">Add New Product</h3>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                        <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
                        <Input label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                        <Input label="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required placeholder="https://..." />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                                rows={3}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit">Save Product</Button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500 max-w-xs truncate">{product.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">Rs. {product.price.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="text-red-600 hover:text-red-900 flex items-center justify-end gap-1 ml-auto"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
