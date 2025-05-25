import React, { useEffect } from "react";

import Homepage from "./pages/Homepage";
import PageNav from "./components/PageNav";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import { useState } from "react";
import CityList from "./components/CityList";

const BASE_URL = "http://localhost:8000";
function App() {
  const [cities, setCities] = useState([]);
  // const [countries , setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />

        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={loading} />} />
          <Route path="cities" element={<CityList  cities={cities} isLoading={loading}/>} />
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
