import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Profile from "../features/user/pages/Profile";
import Signup from "../components/SignUp";
import Home from '../components/Home';
import Confirmado from "../components/Confirmado";
import Vuelos from "../features/vuelos/pages/VuelosItem";




const Routing = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/vuelos" element={<Vuelos/>} />
				<Route path="/confirmado" element={<Confirmado />} />

			</Routes>
		</div>
	);
};

export default Routing;
