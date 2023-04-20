import React from 'react';
import { Routes, Route } from 'react-router-dom';

import '../mystyles.scss'; //added line

import HeroSection from './Home/Hero';
import Login from './Auth/Login';

const App = () => {
	return (
		<div className="App bg-gray-200">
			<Routes>
				<Route path="/" element={<HeroSection />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default App;
