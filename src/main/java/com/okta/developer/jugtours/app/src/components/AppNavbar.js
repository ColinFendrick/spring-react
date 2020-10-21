import React, { useState } from 'react';
import {
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Navbar,
	NavbarBrand,
	NavbarToggler
} from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
	const [state, setState] = useState({ isOpen: false });

	const toggle = () => setState({ ...state, isOpen: !state.isOpen });


	return (
		<Navbar color='dark' dark expand='md'>
			<NavbarBrand tag={Link} to='/'>Home</NavbarBrand>
			<NavbarBrand tag={Link} to='/groups'>Manage Tours</NavbarBrand>
			<NavbarToggler onClick={toggle}/>
			<Collapse isOpen={state.isOpen} navbar>
				<Nav className='ml-auto' navbar>
					<NavItem>
						<NavLink href='https://github.com/ColinFendrick/spring-react'>GitHub</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);

};

export default AppNavbar;
