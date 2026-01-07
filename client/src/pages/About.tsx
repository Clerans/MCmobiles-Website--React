import React from 'react';

export const About: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">About MC Mobiles</h1>

                <div className="prose prose-lg mx-auto text-gray-600 mb-12">
                    <p className="mb-6">
                        Welcome to MC Mobiles, your premier destination for the latest smartphones and accessories.
                        Founded in 2025, we have dedicated ourselves to providing technology enthusiasts with
                        cutting-edge devices at competitive prices.
                    </p>
                    <p className="mb-6">
                        Our mission is simple: to make modern technology accessible to everyone. We carefully
                        curate our product selection to ensure that you get the best quality and performance.
                    </p>
                    <p>
                        Whether you are looking for the newest flagship phone or a reliable budget-friendly option,
                        MC Mobiles is here to serve you with exceptional customer support and genuine products.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="p-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-indigo-600 mb-2">Quality Guarantee</h3>
                        <p className="text-gray-500">All our products are 100% genuine and come with official manufacturer protection.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-indigo-600 mb-2">Fast Delivery</h3>
                        <p className="text-gray-500">We offer swift and secure delivery across the island to get your device to you fast.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-indigo-600 mb-2">Expert Support</h3>
                        <p className="text-gray-500">Our dedicated team is always ready to assist you with any queries or technical support.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
