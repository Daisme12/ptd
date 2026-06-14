import { useState, useEffect } from 'react'
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router';

import AOS from "aos";
import "aos/dist/aos.css";

import HomePage from './pages/Home/HomePage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Product from './pages/Products/Products';
import Certificate from './pages/Certificate/Certificate';
import PolicyPage from './pages/Policy/PolicyPage';
import NotFound from './pages/NotFound/NotFound';

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy/:slug" element={<PolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;