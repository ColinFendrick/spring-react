import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';

import './App.css';

const App = () => {
	const [state, setState] = useState({
		isLoading: true,
		groups: [],
		error: ''
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/groups');
				const body = await response.json();
				setState({ groups: body, isLoading: false, error: '' });
			} catch (e) {
				setState({ groups: [], isLoading: false, error: e.message });
			}
		})();
	}, []);

	return (
		<>
			{state.isLoading ? <Spinner color='light' children='' /> :
				!state.isLoading && state.error ? <div>{state.error}</div> : (
					<div className='App'>
						<header className='App-header'>
							<div className='App-intro'>
								<h2>JUG List</h2>
								{state.groups.map(group =>
									<div key={group.id}>
										{group.name}
									</div>
								)}
							</div>
						</header>
					</div>
				)}
		</>
	);
};

export default App;
