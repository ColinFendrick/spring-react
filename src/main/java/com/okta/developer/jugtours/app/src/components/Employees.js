import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Container, Spinner, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import EmployeeService from '../services/EmployeeService';

const Employees = () => {
	const [state, setState] = useState({ employees: [], isLoading: true, error: '' });

	useEffect(() => {
		(async () => {
			try {
				const response = await EmployeeService.getAll();
				setState({ employees: response.data, isLoading: false, error: '' });
			} catch (e) {
				setState({ employees: [], isLoading: false, error: e.message });
			}
		})();
	}, []);

	const remove = async id => {
		try {
			const { data } = await EmployeeService.deleteById(id);
			const employees = [...state.employees].filter(i => i.id !== data);
			setState({ ...state, employees });
		} catch (e) {
			setState({ employees: [], isLoading: false, error: e.message });
		}
	};

	const employeeList = state.employees.map(employee => (
		<tr key={`employee-${employee.id}`}>
			<td style={{ whiteSpace: 'nowrap' }}>{employee.name}</td>
			<td>
				{employee.relationship}
			</td>
			<td>
				{employee.isContractor ? 'Yes' : 'No'}
			</td>
			<td>{employee.events.map(event => (
				<div key={event.id}>{event.date && `${event.date}: `}{event.title}</div>
			))}
			</td>
			<td>
				<ButtonGroup>
					<Button size='sm' color='primary' tag={Link} to={`/employee/${employee.id}`}>Edit</Button>
					<Button size='sm' color='danger' onClick={() => remove(employee.id)}>Delete</Button>
				</ButtonGroup>
			</td>
		</tr>
	));

	return (
		<Container fluid>
			{state.isLoading ? <Spinner color='light' /> :
				!state.isLoading && state.error ? <div>{state.error}</div> : (
					<>
						<div className='float-right'>
							<Button color='success' tag={Link} to='/employee/new'>Add Employee</Button>
						</div>
						<h3>My Employee</h3>
						<Table className='mt-4'>
							<thead>
								<tr>
									<th width='20%'>Name</th>
									<th width='20%'>Relationship</th>
									<th width='10%'>Contractor</th>
									<th>Events</th>
									<th width='10%'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{employeeList}
							</tbody>
						</Table>
					</>
				)}
		</Container>
	);
};

export default Employees;
