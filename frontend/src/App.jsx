import { useState, useEffect } from 'react'
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router';

import AOS from "aos";
import "aos/dist/aos.css";

import ScrollToTop from "./components/ScrollToTop";

import HomePage from './pages/Home/HomePage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Product from './pages/Products/Products';
import ProductDetail from './pages/Products/ProductDetail';
import Certificate from './pages/Certificate/Certificate';
import PolicyPage from './pages/Policy/PolicyPage';
import NotFound from './pages/NotFound/NotFound';

import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CategoryAdmin from './pages/Admin/CategoryAdmin';
import ProductAdmin from './pages/Admin/ProductAdmin';

import './index.css'

function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <Toaster richColors />

      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy/:slug" element={<PolicyPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} /> {/* Default to Dashboard */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="categories" element={<CategoryAdmin />} />
            <Route path="products" element={<ProductAdmin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;