import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AppNavbar, Employees, EmployeeEdit, Home, GroupEdit, GroupList } from './components';

import './App.css';

const App = () => (
	<div>
		<AppNavbar />

		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/groups' component={GroupList}/>
			<Route path='/groups/:id' component={GroupEdit}/>
			<Route exact path='/employees' component={Employees} />
			<Route path='/employee/:id' component={EmployeeEdit}/>
		</Switch>
	</div>
);

export default App;
