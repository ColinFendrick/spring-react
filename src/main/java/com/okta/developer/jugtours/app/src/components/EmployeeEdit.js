import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

import EmployeeService from '../services/EmployeeService';

const EmployeeEdit = () => {
	const emptyItem = {
		name: ''
	};
	const [state, setState] = useState({ item: emptyItem, error: '' });
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			if (id !== 'new') {
				try {
					const res = EmployeeService.getById(id);
					setState({ item: res.data, error: '' });
				} catch (e) {
					setState({ ...state, error: e.message });
				}
			}
		})();
	});

	const handleChange = ({ target: { name, value }} = {}) =>
		setState({ ...state, item: { ...state.item, [name]: value }});

	const handleSubmit = async ev => {
		ev.preventDefault();

		try {
			if (!state.item.id) {
				await EmployeeService.create(state.item);
			} else {
				await EmployeeService.edit(state.item);
			}
		} catch (e) {
			setState({ ...state, error: e.message });
		}
	};

	const clearForm = () => setState({ item: emptyItem, error: '' });

	return (
		<Container>
			{state.error ? <h4>{state.error}</h4> : (
				<>
					<h2>{state.item.id ? 'Edit Employee' : 'Add Employee'}</h2>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for='name'>Name</Label>
							<Input
								type='text'
								name='name'
								id='name'
								value={state.item.name || ''}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Button color='primary' type='submit'>Save</Button>{' '}
							<Button color='secondary' tag={Link} to='/employees'>Cancel</Button>
							<Button color='warning' type='button' onClick={clearForm}>Clear Form</Button>
						</FormGroup>
					</Form>
				</>
			)}
		</Container>
	);
};

export default EmployeeEdit;
