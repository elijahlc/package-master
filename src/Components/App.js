import React from 'react';
import { Routes, Route } from 'react-router-dom';

import '../index.css'; //added line

import Login from './Auth/Login';

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default App;
