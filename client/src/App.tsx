import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Dashboard } from './pages/admin/Dashboard';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AccountLayout } from './components/layout/AccountLayout';
import { Profile } from './pages/account/Profile';
import { Addresses } from './pages/account/Addresses';
import { AccountOrders } from './pages/account/AccountOrders';
import { Payments } from './pages/account/Payments';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />

              {/* Account Routes */}
              <Route path="/account/*" element={
                <AccountLayout>
                  <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="addresses" element={<Addresses />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="orders" element={<AccountOrders type="orders" />} />
                    <Route path="returns" element={<AccountOrders type="returns" />} />
                    <Route path="cancellations" element={<AccountOrders type="cancellations" />} />
                  </Routes>
                </AccountLayout>
              } />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
