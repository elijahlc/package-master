import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { value: {}, isLoading: false, error: null };

export const register = createAsyncThunk('/auth/register', async (credentials, thunkAPI) => {
	try {
		const response = await axios.post('/api/auth/register', credentials);
		window.localStorage.setItem('token', response.data);
		return thunkAPI.dispatch(loginWithToken());
	} catch (err) {
		throw new Error(err.response.data.error);
	}
});

export const attemptLogin = createAsyncThunk('auth/attemptLogin', async (credentials, thunkAPI) => {
	try {
		const response = await axios.post('/api/auth', credentials);
		window.localStorage.setItem('token', response.data);

		return thunkAPI.dispatch(loginWithToken());
	} catch (err) {
		throw new Error(err.response.data.error);
	}
});

export const loginWithToken = createAsyncThunk('/auth/loginWithToken', async () => {
	const token = window.localStorage.getItem('token');

	if (token) {
		const response = await axios.get('/api/auth', {
			headers: {
				authorization: token,
			},
		});

		return response.data;
	}
});

export const updateAuth = createAsyncThunk('/auth/updateAuth', async (updatedCredentials) => {
	const token = window.localStorage.getItem('token');

	try {
		const response = await axios.put('/api/auth', updatedCredentials, {
			headers: {
				authorization: token,
			},
		});

		return response.data;
	} catch (err) {
		throw new Error(err.response.data.error);
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			window.localStorage.removeItem('token');
			state.value = {};
		},
	},
	extraReducers: {
		[loginWithToken.pending]: (state) => {
			state.isLoading = true;
		},
		[updateAuth.fulfilled]: (state) => {
			state.isLoading = true;
		},
		[loginWithToken.fulfilled]: (state, action) => {
			state.value = action.payload;
			state.isLoading = false;
		},
		[updateAuth.fulfilled]: (state, action) => {
			state.value = action.payload;
			state.isLoading = false;
		},
		[loginWithToken.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		},
		[updateAuth.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		},
	},
});

export default authSlice.reducer;
