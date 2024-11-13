import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUserThunk } from '../../store/reducers/authReducer';
import { IoPerson } from 'react-icons/io5';
import { FaDoorOpen } from 'react-icons/fa6';
import './Navbar.css';

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);

	const handleLogout = () => {
		dispatch(logoutUserThunk());
		navigate('/');
	};
	return (
		<nav className='navbar-wrapper'>
			<h1
				onClick={() => navigate('/')}
				className='navbar-logo'
			>
				TicketMe
			</h1>
			<div>
				{user ? (
					<div className='button-holder'>
						<button className='nav-btn'>
							<IoPerson />
						</button>
						<button
							className='nav-btn'
							onClick={handleLogout}
						>
							<FaDoorOpen />
						</button>
					</div>
				) : (
					<div className='button-holder'>
						<Link
							className='navbar-loginsu'
							to='/sign-up'
						>
							Sign Up
						</Link>
						<Link
							className='navbar-loginsu'
							to='/login'
						>
							Login
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
