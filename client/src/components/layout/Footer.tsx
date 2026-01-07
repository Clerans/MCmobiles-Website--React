import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-auto">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-6 space-x-6 text-lg">
                    <a href="/about" className="hover:text-indigo-400 transition-colors">About Us</a>
                    <a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a>
                </div>
                <p>&copy; 2025 MC Mobiles. All rights reserved.</p>
                <div className="mt-4 flex justify-center space-x-6">
                    <a href="#" className="hover:text-indigo-400 transition-colors"><Facebook className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-indigo-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-indigo-400 transition-colors"><Instagram className="w-5 h-5" /></a>
                </div>
            </div>
        </footer>
    );
};
