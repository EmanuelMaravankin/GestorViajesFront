import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Signup from "../components/SignUp";
import Home from '../components/Home';
import Confirmado from "../components/Confirmado";
import Vuelos from "../components/Vuelos";




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
