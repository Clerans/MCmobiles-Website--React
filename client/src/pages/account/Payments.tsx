import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const Payments: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Add New Card
                </Button>
            </div>

            <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
                <CreditCard className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No payment methods saved yet.</p>
                <p className="text-sm">Securely save your card details for faster checkout.</p>
            </div>
        </div>
    );
};
