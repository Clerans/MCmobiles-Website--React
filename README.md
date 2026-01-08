# 📱 MC Mobiles E-Commerce Platform

A modern, full-stack e-commerce application for selling mobile phones and accessories.  
Built with **React (Vite)** on the frontend and **Node.js / Express** with **MongoDB** on the backend.

---

## 🚧 Development Status

This project is **currently under active development**.  
Core e-commerce features are implemented and functional, while additional features, UI improvements, performance optimizations, and security enhancements are continuously in progress.

### Planned Enhancements
- Payment gateway integration
- Order tracking and status updates
- Product reviews and ratings
- Improved admin analytics dashboard
- Performance and SEO optimizations

---

## 🚀 Features

- **User Authentication** – Secure login and registration using JWT and Bcrypt
- **Product Management** – Browse, search, and view product details
- **Shopping Cart & Orders** – Add items to cart and place orders
- **Admin Dashboard** – Manage products and view orders (role-based access)
- **Responsive Design** – Built with TailwindCSS for mobile and desktop devices
- **Secure API** – Protected with API key middleware and JWT authorization

---

## 🛠️ Tech Stack

### Client
- React (Vite)
- TailwindCSS
- Framer Motion
- React Router DOM, Context API
- Axios

### Server
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT), Bcryptjs

---

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- MongoDB (local instance or MongoDB Atlas)

---

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd react
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

---

## ⚙️ Configuration

Create `.env` files in both the **client** and **server** directories.

### Server (`server/.env`)
```properties
PORT=5000
MONGO_URI=mongodb://localhost:27017/mcmobiles
JWT_SECRET=your_jwt_secret_key
API_KEY=your_secure_api_key
```

### Client (`client/.env`)
```properties
VITE_API_KEY=your_secure_api_key
```

> ⚠️ `VITE_API_KEY` must match the `API_KEY` used in the server.

---

## ▶️ Running the Application

### Start Backend Server
```bash
cd server
npm run dev
```
Server runs on: **http://localhost:5000**

### Start Frontend Client
```bash
cd client
npm run dev
```
Client runs on: **http://localhost:5173**

---

## 📂 Project Structure

```
react/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── ...
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── ...
└── README.md
```

---

## 🔐 Security Notes

- Environment variables are used for sensitive configuration
- Passwords are hashed using Bcrypt
- APIs are protected using JWT and API key validation
- Role-based authorization is enforced for admin routes

---

## 📌 Disclaimer

This project is built for **learning, practice, and portfolio purposes**.  
Additional testing, security hardening, and production optimizations will be applied as development continues.

---
