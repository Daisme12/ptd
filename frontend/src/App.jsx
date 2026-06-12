import { useState } from 'react'
import { Toaster, toast } from 'sonner';
import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from './pages/Home/HomePage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Product from './pages/Products/Products';
import NotFound from './pages/NotFound/NotFound';
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
    <Toaster richColors />

    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>   
    </>
  )
}

export default App
