import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AppNavbar, Home, GroupEdit, GroupList } from './components';

import './App.css';

const App = () => (
	<div>
		<AppNavbar />

		<Switch>
			<Route path='/' exact={true} component={Home}/>
			<Route path='/groups' exact={true} component={GroupList}/>
			<Route path='/groups/:id' component={GroupEdit}/>
		</Switch>
	</div>
);

export default App;
