import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AppNavbar, Home, GroupList } from './components';

import './App.css';

const App = () => (
	<div>
		<AppNavbar />

		<Switch>
			<Route path='/' exact={true} component={Home}/>
			<Route path='/groups' exact={true} component={GroupList}/>
		</Switch>
	</div>
);

export default App;
