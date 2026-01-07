const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    phone: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    addresses: [{
        name: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        phone: String,
        isDefault: Boolean
    }],
    paymentMethods: [{
        type: String, // Placeholder for now, can be expanded
        last4: String,
        brand: String
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
