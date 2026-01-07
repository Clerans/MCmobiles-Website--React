import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-indigo-600 text-white py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                        Welcome to MC Mobiles
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto mb-8">
                        Your one-stop shop for the latest mobile phones and cutting-edge accessories.
                    </p>
                    <Link to="/products">
                        <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 border-transparent">
                            Shop Now
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Featured Section Placeholder */}
            <section className="py-16 container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Phones</h2>
                <div className="text-center text-gray-500">
                    <p>Loading best sellers...</p>
                </div>
            </section>
        </div>
    );
};
