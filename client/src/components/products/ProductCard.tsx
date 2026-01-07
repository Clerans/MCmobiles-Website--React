import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicking the button triggers link logic (though it shouldn't here)
        addToCart({ ...product, quantity: 1 });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <Link to={`/products/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h4>
                    <p className="text-lg font-bold text-indigo-600 mb-4">Rs. {product.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                        <Button
                            className="flex-1"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" /> Add
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
