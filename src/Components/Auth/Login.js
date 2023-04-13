import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { attemptLogin } from '../../store/auth';

const Login = () => {
	const dispatch = useDispatch();

	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const [error, setError] = useState(null);

	const handleCredentialsChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const login = async (e) => {
		e.preventDefault();

		const response = await dispatch(attemptLogin(credentials));

		if ((response && response === 'Bad credentials') || response === 'User not found') {
			setError('Incorrect email or password. Please try again.');
		}
	};

	return (
		<div className="Login">
			<form onSubmit={login}>
				<label className="" htmlFor="email">
					Email
				</label>
				<input id="email" value={credentials.email} name="email" onChange={handleCredentialsChange} />

				<label htmlFor="password">Password</label>
				<input type="password" name="password" value={credentials.password} onChange={handleCredentialsChange} />

				{error ? <div className="Login-error">{error}</div> : null}
				<button>Sign in</button>
			</form>
		</div>
	);
};

export default Login;
