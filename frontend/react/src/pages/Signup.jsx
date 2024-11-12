import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUserThunk } from '../store/reducers/authReducer';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		const newErrors = {};
		if (formData.username.length === 0) {
			errors.username = 'Must provide a username!';
		} else if (formData.username.length < 8) {
			errors.username = 'Username must be longer than 8 characters!';
		}
		if (formData.email.length === 0) {
			errors.email = 'Must provide an email!';
		} else if (!formData.email.includes('@')) {
			errors.email = 'Must provide a working email!';
		}
		if (formData.password.length === 0) {
			errors.password = 'Must provide a password!';
		} else if (formData.password.length < 8) {
			errors.password = 'Password must be longer than 8 characters!';
		}
		setErrors(newErrors);
	}, [formData]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (Object.keys(errors).length === 0) {
			dispatch(signupUserThunk(formData));
		}
	};
	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username</label>
					<input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleChange}
					/>
					{submitted && errors.username && (
						<p style={{ color: 'red' }}>{errors.username}</p>
					)}
				</div>

				<div>
					<label>Email</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
					/>
					{submitted && errors.email && (
						<p style={{ color: 'red' }}>{errors.email}</p>
					)}
				</div>

				<div>
					<label>Password</label>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
					{submitted && errors.password && (
						<p style={{ color: 'red' }}>{errors.password}</p>
					)}
				</div>

				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;
