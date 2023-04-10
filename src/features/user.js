import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { config } from 'utils/instances';

// export const register = createAsyncThunk(
// 	'users/register',
// 	async ({ first_name, last_name, email, password }, thunkAPI) => {
// 		const body = JSON.stringify({
// 			first_name,
// 			last_name,
// 			email,
// 			password,
// 		});

// 		try {
// 			const res = await fetch('/api/users/register', {
// 				method: 'POST',
// 				headers: {
// 					Accept: 'application/json',
// 					'Content-Type': 'application/json',
// 				},
// 				body,
// 			});

// 			const data = await res.json();

// 			if (res.status === 201) {
// 				return data;
// 			} else {
// 				return thunkAPI.rejectWithValue(data);
// 			}
// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(err.response.data);
// 		}
// 	}
// );

const getUser = createAsyncThunk('users/me', async (_, thunkAPI) => {
	try {
		const access_key = Cookies.get('access_token')
		const res = await axios.get(`${process.env.REACT_APP_END_URL}auth/users/me/`, config(access_key))
		const data = res.data;

		if (res.status === 200) {
			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const login = createAsyncThunk(
	'users/login',
	async ({ email, password }, thunkAPI) => {
		const body = JSON.stringify({
			email,
			password,
		});
		try {
			const res = await axios.post(`${process.env.REACT_APP_END_URL}auth/jwt/create`, body, config())
			const data = res.data; // use res.data instead of res.json()
			if (res.status === 200) {
				const { dispatch } = thunkAPI;
				const access_token = data.access;
				Cookies.set('access_token', access_token, { expires: 1, secure: true });
				dispatch(getUser());
				return data;
			} else {
				console.log('something went wrong')
				return thunkAPI.rejectWithValue(data);
			}
		} catch (err) {
			console.log('error')
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const checkAuth = createAsyncThunk(
	'users/verify',
	async (_, thunkAPI) => {
		try {
			const access = Cookies.get('access_token')
			const body = JSON.stringify({
				token: access
			  });
			const res = await axios.post(`${process.env.REACT_APP_END_URL}auth/jwt/verify/`,body, config());
			const data = await res.data;

			if (res.status === 200) {
				const { dispatch } = thunkAPI;

				dispatch(getUser());

				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);
export const changePassword = createAsyncThunk(
	'users/ChangePassword',
	async (body, thunkAPI) => {
		try {
			const access = Cookies.get('access_token')
			
			const res = await axios.post(`${process.env.REACT_APP_END_URL}users/password-change/`,body, config(access));
			const data = await res.data;

			if (res.status === 200) {
				const { dispatch } = thunkAPI;

				dispatch(getUser());

				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const logout = createAsyncThunk('users/logout', async (_, thunkAPI) => {
	// remove access token from cookies
	Cookies.remove('access_token');
	return { success: "Logged out successfully" }; // return the success message as data
});
const initialState = {
	isAuthenticated: false,
	user: null,
	loading: false,
	access: null,
	// registered: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	// reducers: {
	// 	resetRegistered: state => {
	// 		state.registered = false;
	// 	},
	// },
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state,action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.access = action.payload.access;
			})
			.addCase(login.rejected, state => {
				state.loading = false;
			})
			.addCase(getUser.pending, state => {
				state.loading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, state => {
				state.loading = false;
			})
			.addCase(checkAuth.pending, state => {
				state.loading = true;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.access = Cookies.get('access_token');
			})
			.addCase(checkAuth.rejected, state => {
				state.loading = false;
				state.access = null;
			})
			.addCase(logout.pending, state => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, state => {
				state.loading = false;
				state.isAuthenticated = false;
				state.user = null;
				state.access = null;
			})
			.addCase(logout.rejected, state => {
				state.loading = false;
			}).addCase(changePassword.fulfilled, state => {
				state.loading = false;
			}).addCase(changePassword.pending, state => {
				state.loading = true;
			}).addCase(changePassword.rejected, state => {
				state.loading = false;
			})
	},
});

// export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;