import { useEffect, lazy, Suspense } from 'react'
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router';

import AOS from "aos";
import "aos/dist/aos.css";

import ScrollToTop from "./components/ScrollToTop";
import { startBackendKeepAlive } from "./services/keepAlive";

import './index.css'

// Lazy load all pages
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Product = lazy(() => import('./pages/Products/Products'));
const ProductDetail = lazy(() => import('./pages/Products/ProductDetail'));
const Certificate = lazy(() => import('./pages/Certificate/Certificate'));
const PolicyPage = lazy(() => import('./pages/Policy/PolicyPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Admin pages
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const CategoryAdmin = lazy(() => import('./pages/Admin/CategoryAdmin'));
const ProductAdmin = lazy(() => import('./pages/Admin/ProductAdmin'));
const ContactAdmin = lazy(() => import('./pages/Admin/ContactAdmin'));

// Loading fallback
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f9fafb'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid #e5e7eb',
      borderTop: '3px solid #dc2626',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    const intervalId = startBackendKeepAlive();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Toaster richColors />

      <BrowserRouter>
        <ScrollToTop />

        <Suspense fallback={<PageLoader />}>
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
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="categories" element={<CategoryAdmin />} />
              <Route path="products" element={<ProductAdmin />} />
              <Route path="contacts" element={<ContactAdmin />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;