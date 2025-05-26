import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList.jsx"
import City from "./components/City.jsx";

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
          <Route path="cities/:idx" element={<City/>} />
          <Route path="countries" element={<CountryList  cities={cities} isLoading={loading}/>} />
          <Route path="form" element={<p> Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
