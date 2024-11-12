// !action creators
const LOGIN_USER = 'user/LOGIN_USER';
const LOGOUT_USER = 'user/LOGOUT_USER';
const SIGNUP_USER = 'user/SIGNUP_USER';

// !actions
const loginUser = (user) => {
	return {
		type: LOGIN_USER,
		payload: user,
	};
};

const logoutUser = () => {
	return {
		type: LOGOUT_USER,
	};
};

const signupUser = (newUser) => {
	return {
		type: SIGNUP_USER,
		payload: newUser,
	};
};

// !thunks
// !Login thunk
export const loginUserThunk = (credentials) => async (dispatch) => {
	try {
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(loginUser(data.user)); // Pass the user object to loginUser
		} else if (response.status < 500) {
			const errorMessages = await response.json();
			return errorMessages;
		} else {
			return { server: 'Something went wrong. Please try again.' };
		}
	} catch (error) {
		console.error('An error occurred while logging in: ', error);
	}
};

// !Logout thunk
export const logoutUserThunk = () => async (dispatch) => {
	const response = await fetch('/api/auth/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
		dispatch(logoutUser());
	} else {
		console.error('Logout failed: ', response.statusText);
	}
};

// !Signup thunk
export const signupUserThunk = (credentials) => async (dispatch) => {
	const response = await fetch('/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});
	if (response.ok) {
		const newUser = response.json();
		dispatch(signupUser(newUser));
	}
};

const initialState = {
	user: null,
	isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return { ...state, user: action.payload, isAuthenticated: true };
		case 'LOGOUT_USER':
			return { ...state, user: null, isAuthenticated: false };
		case 'SIGNUP_USER':
			return { ...state, user: action.payload, isAuthenticated: true };
		default:
			return state;
	}
};

export default authReducer;
