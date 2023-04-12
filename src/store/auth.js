import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { value: {} };

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		register: async (state, credentials) => {
			const response = await axios.post('/api/auth/register', credentials);
			window.localStorage.setItem('token', response.data);
			authSlice.caseReducers.loginWithToken(state);
		},

		attemptLogin: async (state, credentials) => {
			try {
				const response = await axios.post('/api/auth', credentials);
				window.localStorage.setItem('token', response.data);
				authSlice.caseReducers.loginWithToken(state);
			} catch (err) {
				return err.response.data.error;
			}
		},

		loginWithToken: async (state) => {
			const token = window.localStorage.getItem('token');

			if (token) {
				const response = await axios.get('/api/auth', {
					headers: {
						authorization: token,
					},
				});

				state.value = response.data;
			}
		},

		updateAuth: async (state, auth) => {
			const token = window.localStorage.getItem('token');

			const response = await axios.put('/api/auth', auth, {
				headers: {
					authorization: token,
				},
			});

			state.value = response.data;
		},

		logout: (state) => {
			window.localStorage.removeItem('token');
			state.value = {};
		},
	},
});

export const { loginWithToken } = authSlice.actions;

export default authSlice.reducer;
