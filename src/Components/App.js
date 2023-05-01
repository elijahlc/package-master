import React from 'react';
import { Routes, Route } from 'react-router-dom';

import '../mystyles.scss'; //added line

import Nav from './Nav/Nav';
import HeroSection from './Home/Hero';
import Login from './Auth/Login';

const App = () => {
	return (
		<div className="App">
            <Nav />
            
			<Routes>
				<Route path="/" element={<HeroSection />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default App;
