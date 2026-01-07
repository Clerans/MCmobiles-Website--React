import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { items } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold text-indigo-600">
                        MC Mobiles
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
                        <Link to="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">Products</Link>
                        <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to={user.role === 'admin' ? '/admin' : '/account/profile'} className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <UserIcon className="w-5 h-5 text-indigo-600" />
                                        )}
                                    </div>
                                    <span className="font-medium hidden lg:block">{user.name}</span>
                                </Link>
                                <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
                            </div>
                        ) : (
                            <div className="space-x-2">
                                <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
                                <Link to="/register"><Button size="sm">Register</Button></Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 space-y-4 flex flex-col items-center border-t pt-4">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" className="text-gray-600 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Products</Link>
                        <Link to="/cart" className="text-gray-600 hover:text-indigo-600 relative" onClick={() => setIsMenuOpen(false)}>
                            Cart ({cartItemCount})
                        </Link>
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? '/admin' : '/orders'} className="text-gray-600 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>My Account</Link>
                                <Button variant="outline" size="sm" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" size="sm">Login</Button></Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)}><Button size="sm">Register</Button></Link>
                            </>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
};
