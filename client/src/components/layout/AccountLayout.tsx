import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, MapPin, CreditCard, Package, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AccountLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { label: 'Profile', icon: User, path: '/account/profile' },
        { label: 'Address Book', icon: MapPin, path: '/account/addresses' },
        { label: 'Payment Options', icon: CreditCard, path: '/account/payments' },
        { label: 'My Orders', icon: Package, path: '/account/orders' },
        { label: 'My Returns', icon: Package, path: '/account/returns' },
        { label: 'My Cancellations', icon: Package, path: '/account/cancellations' },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <div className="w-full md:w-1/4">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        {/* User Profile Header */}
                        <div className="flex flex-col items-center mb-6 border-b pb-6">
                            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-3 overflow-hidden">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10 text-indigo-600" />
                                )}
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 text-center">{user?.name}</h3>
                            <p className="text-sm text-gray-500 text-center truncate w-full px-2">{user?.email}</p>
                        </div>

                        <nav className="space-y-2">
                            {menuItems.map(item => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                            <button
                                onClick={logout}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4 border-t"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-3/4">
                    {children}
                </div>
            </div>
        </div>
    );
};
