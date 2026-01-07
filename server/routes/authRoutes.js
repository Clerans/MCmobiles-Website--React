const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SEC_KEY = process.env.JWT_SECRET || 'supersecretkey';

// Middleware for auth
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SEC_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            role: 'user',
            phone: '',
            avatar: '',
            addresses: [],
            paymentMethods: []
        });

        res.status(201).json({ message: 'User created', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SEC_KEY, { expiresIn: '1h' });

        // Return user data without password
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            avatar: user.avatar,
            addresses: user.addresses
        };

        res.json({ token, user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login error' });
    }
});

// Update Profile
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { name, phone, password, avatar } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name !== undefined) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (avatar !== undefined) user.avatar = avatar;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();

        const userData = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            avatar: updatedUser.avatar,
            addresses: updatedUser.addresses
        };

        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Update failed' });
    }
});

// Address Management
router.get('/address', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.addresses || []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses' });
    }
});

router.post('/address', authenticateToken, async (req, res) => {
    try {
        const { name, street, city, province, postalCode, phone, isDefault } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const newAddress = {
            name,
            street,
            city,
            state: province, // Mapped 'province' to 'state' in schema
            zip: postalCode, // Mapped 'postalCode' to 'zip' in schema
            phone, // User schema has phone on user, but can put it in address object specifically if needed? Schema definition for addresses didn't explicitly check phone logic
            isDefault
        };

        // Wait, schema for addresses is: street, city, state, zip, isDefault.
        // It seems the schema I created was a bit simplified compared to the logic here.
        // I should update the schema or map fields correctly.
        // Let's allow flexible fields for now or map correctly.
        // Schema: addresses: [{ street, city, state, zip, isDefault }] 
        // Frontend sends: name, street, city, province, postalCode, phone, isDefault

        // Let's assume we map province->state, postalCode->zip.
        // And I'll add 'name' and 'phone' to the schema definition momentarily if strictly needed,
        // or just rely on Mongoose optional fields if strict: false (default is strict).
        // I better update the User model quickly to include 'name' and 'phone' in addresses schema if I can,
        // OR just map what I can.

        if (isDefault) {
            user.addresses.forEach(a => a.isDefault = false);
        } else if (user.addresses.length === 0) {
            newAddress.isDefault = true;
        }

        user.addresses.push(newAddress);
        await user.save();
        res.json(user.addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding address' });
    }
});

router.delete('/address/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.addresses = user.addresses.filter(a => a.id !== req.params.id);
        await user.save();
        res.json(user.addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address' });
    }
});

router.put('/address/:id/default', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.addresses.forEach(a => {
            a.isDefault = a.id === req.params.id;
        });

        await user.save();
        res.json(user.addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error updating default address' });
    }
});

module.exports = router;

