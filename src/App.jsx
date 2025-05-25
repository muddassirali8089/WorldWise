import React from 'react';

import Homepage from './pages/Homepage';
import PageNav from './components/PageNav';
import Pricing  from "./pages/Pricing"
import Product from "./pages/Product"
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
         <Route path="/login" element={<Login />} />
         <Route path="*" element={<PageNotFound />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
