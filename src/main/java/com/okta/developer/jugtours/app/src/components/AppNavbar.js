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

	const links = [
		{ href: '/', text: 'Home' },
		{ href: '/groups', text: 'Manage Tours' },
		{ href: '/employees', text: 'Manage Employees' },
		{ href: 'https://github.com/ColinFendrick/spring-react', text: 'Github' }
	];

	const createNavItem = ({ href, text }, ix) => (
		<NavItem key={`nav-link-${ix}`}>
			<NavLink href={href}>{text}</NavLink>
		</NavItem>
	);

	const toggle = () => setState({ ...state, isOpen: !state.isOpen });

	return (
		<Navbar color='dark' dark expand='md'>
			<NavbarBrand tag={Link} to='/' className='mr-auto logo'>React Spring w/ Okta</NavbarBrand>
			<NavbarToggler onClick={toggle} className='mr-2' />
			<Collapse isOpen={state.isOpen} navbar>
				<Nav className='ml-auto' navbar>
					{links.map(createNavItem)}
				</Nav>
			</Collapse>
		</Navbar>
	);

};

export default AppNavbar;
