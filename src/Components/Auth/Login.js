import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bulma-components';

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
				<Form.Field>
					<Form.Label htmlFor="email">Email</Form.Label>
					<Form.Input id="email" value={credentials.email} name="email" onChange={handleCredentialsChange} />
				</Form.Field>

				<Form.Field>
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Input type="password" name="password" value={credentials.password} onChange={handleCredentialsChange} />
				</Form.Field>
				{error ? <Form.Help>{error}</Form.Help> : null}
				<Button color="primary">Sign in</Button>
			</form>
		</div>
	);
};

export default Login;
