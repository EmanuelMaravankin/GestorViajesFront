import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Profile from "../features/user/pages/Profile";
import Signup from "../components/SignUp";
import Home from '../components/Home';
import Confirmado from "../components/Confirmado";
import ClientesList from "../features/clientes/pages/ClientesList";
import HotelesContainer from "../features/hoteles/components/HotelesContainer";
import DashboardContainer from "../features/dashboard/components/DashboardContainer";
import ProtectedRoute from "../routes/ProtectedRoute";
import VuelosBasico from "../components/VuelosBasico";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirmado" element={<Confirmado />} />
        
        {/* Rutas públicas para testing */}
        <Route path="/vuelos" element={<VuelosBasico />} />
        <Route path="/hoteles" element={<HotelesContainer />} />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardContainer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/clientes" element={<ClientesList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routing;
