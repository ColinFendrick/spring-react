import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = () => (
	<Container fluid>
		<div className='card-container'>
			<div className='card-column'>
				<h4>WELCOME MY GOOD BITCH</h4>
				<Link to='/groups'>
					<div className='card'></div>
				</Link>
			</div>
		</div>
	</Container>
);

export default Home;
