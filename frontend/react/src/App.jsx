import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Navbar from './components/Navbar/Navbar';

function App() {
	return (
		<Provider store={store}>
			<Navbar />
			<Router>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/sign-up'
						element={<SignUp />}
					/>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
