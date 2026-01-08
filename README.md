# MC Mobiles E-Commerce Platform

A modern, full-stack e-commerce application for selling mobile phones and accessories. Built with React (Vite) on the frontend and Node.js/Express with MongoDB on the backend.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT and Bcrypt.
- **Product Management**: Browse, search, and view product details.
- **Shopping Cart & Orders**: Add items to cart and place orders.
- **Admin Dashboard**: Manage products and view orders (Role-based access).
- ** responsive Design**: Built with TailwindCSS for a seamless mobile and desktop experience.
- **Secure API**: protected by API Key middleware and JWT authorization.

## 🛠️ Tech Stack

### Client
- **Framework**: [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Styling**: [TailwindCSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **State/Routing**: React Router DOM, React Hooks (Context API)
- **HTTP Client**: Axios

### Server
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & Bcryptjs

## 📦 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (Local or Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd react
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

Create `.env` files in both `client` and `server` directories based on the examples below.

**Server (`server/.env`):**
```properties
PORT=5000
MONGO_URI=mongodb://localhost:27017/mcmobiles # Enter your MongoDB URI Or your Atlas URI
JWT_SECRET=Enter_your_jwt_secret_key
API_KEY=Enter_your_secure_api_key
```

**Client (`client/.env`):**
```properties
VITE_API_KEY=Enter_your_secure_api_key # Must match the server API_KEY
```

### Running the Application

You need to run both the backend and frontend servers.

**1. Start the Backend Server:**
```bash
cd server
npm run dev
```
_Server runs on http://localhost:5000_

**2. Start the Client:**
```bash
cd client
npm run dev
```
_Client runs on http://localhost:5173 (typically)_

## 📂 Project Structure

```
react/
├── client/          # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── ...
├── server/          # Backend Express Application
│   ├── config/      # DB connection
│   ├── middleware/  # Auth middleware
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   └── ...
└── README.md
```
