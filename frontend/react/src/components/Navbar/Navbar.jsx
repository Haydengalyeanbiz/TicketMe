import { useSelector } from 'react-redux';

const Navbar = () => {
	const user = useSelector((state) => state.auth.user);
	return (
		<div>
			<h1>navbar</h1>
		</div>
	);
};

export default Navbar;
