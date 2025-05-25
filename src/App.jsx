import React from "react";

import Homepage from "./pages/Homepage";
import PageNav from "./components/PageNav";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />

        <Route path="/login" element={<Login />} />
        < Route path="/app" element={<AppLayout />}>
        <Route index  element ={<p> citesi</p>}/>
          <Route path="cities" element={<p> our citeis</p>} />
          <Route path="countries" element={<p> Our Countries</p>} />
          <Route path="form" element={<p> Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
