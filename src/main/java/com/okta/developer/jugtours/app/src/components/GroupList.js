import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Spinner, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import ToursService from '../services/ToursService';

const GroupList = () => {
	const [state, setState] = useState({ groups: [], isLoading: true, error: '' });

	useEffect(() => {
		(async () => {
			try {
				const response = await ToursService.getAll();
				setState({ groups: response.data, isLoading: false, error: '' });
			} catch (e) {
				setState({ groups: [], isLoading: false, error: e.message });
			}
		})();
	}, []);

	const remove = async id => {
		try {
			await ToursService.deleteById(id);
			const groups = [...state.groups].filter(i => i.id !== id);
			setState({ ...state, groups });
		} catch (e) {
			setState({ groups: [], isLoading: false, error: e.message });
		}
	};

	const groupList = state.groups.map(group => {
		const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
		return (
			<tr key={group.id}>
				<td style={{ whiteSpace: 'nowrap' }}>{group.name}</td>
				<td>{address}</td>
				<td>{group.events.map(event => (
					<div key={event.id}>{new Intl.DateTimeFormat('en-US', {
						year: 'numeric',
						month: 'long',
						day: '2-digit'
					}).format(new Date(event.date))}: {event.title}</div>
				))}
				</td>
				<td>
					<ButtonGroup>
						<Button size='sm' color='primary' tag={Link} to={`/groups/${group.id}`}>Edit</Button>
						<Button size='sm' color='danger' onClick={() => remove(group.id)}>Delete</Button>
					</ButtonGroup>
				</td>
			</tr>
		);
	});

	return (
		<Container fluid>
			{state.isLoading ? <Spinner color='light' /> :
				!state.isLoading && state.error ? <div>{state.error}</div> : (
					<>
						<div className='float-right'>
							<Button color='success' tag={Link} to='/groups/new'>Add Tour</Button>
						</div>
						<h3>My Tours</h3>
						<Table className='mt-4'>
							<thead>
								<tr>
									<th width='20%'>Name</th>
									<th width='20%'>Location</th>
									<th>Events</th>
									<th width='10%'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{groupList}
							</tbody>
						</Table>
					</>
				)}
		</Container>
	);
};

export default GroupList;
