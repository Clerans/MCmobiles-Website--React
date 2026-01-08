import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity: 1 });
            navigate('/cart');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <Button variant="outline" className="mb-8" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 flex items-center justify-center">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full max-w-md object-contain"
                    />
                </div>

                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-3xl font-bold text-indigo-600 mb-8">Rs. {product.price.toLocaleString()}</p>

                    <div className="prose prose-lg text-gray-600 mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="flex gap-4">
                        <Button size="lg" onClick={handleAddToCart} className="w-full md:w-auto">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                        </Button>
                    </div>

                    <div className="mt-12 border-t pt-8">
                        <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Genuine Product</li>
                            <li>1 Year Warranty</li>
                            <li>Fast Delivery</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
