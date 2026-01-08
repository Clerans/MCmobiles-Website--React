import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import api from '../../utils/api';

export const Profile: React.FC = () => {
    const { user, login } = useAuth(); // We need to update user in context after save
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '', // Email usually read-only
        phone: user?.phone || '',
        avatar: user?.avatar || '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await api.put('/auth/profile', formData);
            // Update local storage/context with new user data
            // Note: Backend doesn't return token on profile update, so we reuse current one?
            // AuthContext needs a way to update User without token, or we assume token is valid.
            // For now, let's assume login() can take just user? check AuthContext.
            // Checking AuthContext... it stores user. We can manually update it if we expose a setter, 
            // or re-call login with existing token.
            // Let's assume we can reload or just re-set user.
            // The current AuthContext `login` takes `token` and `user`. 
            // We can grab token from localStorage.
            const token = localStorage.getItem('token');
            if (token) login(token, response.data);

            setMessage({ type: 'success', text: 'Profile updated successfully' });
            setFormData(prev => ({ ...prev, password: '' })); // Clear password
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File size too large. Please choose an image under 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>

            {message.text && (
                <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                {/* Profile Picture Upload */}
                <div className="flex items-center space-x-6">
                    <div className="relative w-24 h-24">
                        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-200">
                            {formData.avatar ? (
                                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-indigo-600 uppercase">{formData.name?.charAt(0) || 'U'}</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Upload New Photo
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                            {formData.avatar && (
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, avatar: '' })}
                                    className="text-sm text-red-600 hover:text-red-500"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">JPG, GIF or PNG. Max size 5MB.</p>
                    </div>
                </div>

                <Input
                    label="Profile Picture URL (Optional)"
                    value={formData.avatar || ''}
                    onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                />

                <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                    label="Email Address"
                    value={formData.email}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                    onChange={() => { }}
                />
                <Input
                    label="Mobile Number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+94 77 123 4567"
                />

                <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                    <Input
                        label="New Password"
                        type="password"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Leave blank to keep current password"
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving Changes...' : 'Save Changes'}
                </Button>
            </form>
        </div>
    );
};
