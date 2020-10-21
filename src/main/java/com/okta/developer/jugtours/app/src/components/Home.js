import React, { useState, useEffect } from 'react';
import {
	Button,
	Container,
	Spinner
} from 'reactstrap';
import { Link } from 'react-router-dom';

import AuthService from '../services/AuthService';

const Home = () => {
	const [state, setState] = useState({
		isLoading: true,
		isAuthenticated: false,
		user: null,
		error: ''
	});

	useEffect(() => {
		(async () => {
			setState(s => ({ ...s, isLoading: true }));
			try {
				const { data } = await AuthService.getUser();

				if (data === '') {
					setState(s => ({ ...s, isAuthenticated: false, isLoading: false }));
				} else {
					setState(s => ({ ...s, isAuthenticated: true, user: data, isLoading: false }));
				}
			} catch (e) {
				setState(s => ({ ...s, isLoading: false, error: e.message }));
			}

		})();
	}, []);

	const login = () => {
		let port = (window.location.port ? `:${window.location.port}` : '');

		if (port === ':3000') {
			port = ':8080';
		}

		window.location.href = `//${window.location.hostname}${port}/private`;
	};

	console.log(state);
	const logout = async () => {
		try {
			const res = await AuthService.logout();
			window.location.href = `${res.data.logoutUrl}?id_token_hint=${res.data.idToken}&post_logout_redirect_uri=${window.location.origin}`;
		} catch (e) {
			setState({ ...state, isLoading: false, error: e.message });
		}
	};

	const message = state.error ? <h3>{state.error}</h3> :
		state.isLoading ? <Spinner color='light' /> :
			state.user ? <h2>Welcome, {state.user.name}!</h2> :
				<p>Please log in to manage your Tour.</p>;

	const card = state.isAuthenticated ? (
		<Link to='/groups'>
			<div className='card'></div>
		</Link>
	) :
		<div className='card' onClick={login}></div>;


	const button = state.isAuthenticated ?
		<div>
			<Button color='danger' onClick={logout}>Logout</Button>
		</div> :
		<Button color='primary' onClick={login}>Login</Button>;

	return (
		<Container fluid>
			<div className='card-container'>
				<div className='card-column'>

					{message}

					{card}

					{button}

				</div>
			</div>
		</Container>
	);
};

export default Home;
