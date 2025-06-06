import React  from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList.jsx"
import City from "./components/City.jsx";
import Form from "./components/Form.jsx"
import {AuthProvider} from "./Contexts/FakeAuthContext.jsx"


import "./index.css"
import { CitiesProvider } from "./Contexts/CitiesContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";



function App() {
  

  return (
    <AuthProvider>


    <CitiesProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />

        <Route path="/login" element={<Login />} />
        <Route path="/app" element={
          <ProtectedRoute>
            <AppLayout />

          </ProtectedRoute>
          
          }>
          <Route index element={<Navigate replace to="cities"/>} />
          <Route path="cities" element={<CityList/>} />
          <Route path="cities/:id" element={<City/>} />
          // here is the id variable that store the data what ever we pass when we call this route 
          // to get the data using useparams an destructure the obj by using this nane 
          <Route path="countries" element={<CountryList  />} />
          <Route path="form" element={<Form/>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
     </CitiesProvider>

         </AuthProvider>
  );
}

export default App;
