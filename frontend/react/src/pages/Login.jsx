import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../store/reducers/authReducer';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({
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
		if (!formData.email) newErrors.email = 'Must provide an email!';
		if (!formData.password) newErrors.password = 'Must provide a password!';
		if (!formData.email.includes('@')) {
			newErrors.email = 'Invalid email!';
		}
		if (formData.password.length < 8) {
			newErrors.password = 'Password must be longer than 8 characters!';
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
			dispatch(loginUserThunk(formData));
		}
	};
	return (
		<div>
			<h1>Login Page</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
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
						required
					/>
					{submitted && errors.password && (
						<p style={{ color: 'red' }}>{errors.password}</p>
					)}
				</div>
				<button type='submit'>Log In</button>
			</form>
		</div>
	);
};

export default Login;
