import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, CustomInput } from 'reactstrap';

import EmployeeService from '../services/EmployeeService';

const EmployeeEdit = () => {
	const emptyItem = { name: '', relationship: '', isContractor: false };
	const [state, setState] = useState({ item: emptyItem, error: '' });
	const { id: paramsId } = useParams();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			if (paramsId !== 'new') {
				try {
					const res = await EmployeeService.getById(paramsId);
					setState(s => ({ ...s, item: res.data, error: '' }));
				} catch (e) {
					setState(s => ({ ...s, error: e.message }));
				}
			}
		})();
	}, [paramsId]);


	// targetKey will tell the function which key on target to use as the new value, so we can handle other input types than text
	// See the switch below for the use case
	const handleChange = (targetKey = 'value') => ({ target } = {}) =>
		setState({ ...state, item: { ...state.item, [target.name]: target[targetKey] }});

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			if (!state.item.id) {
				await EmployeeService.create(state.item);
			} else {
				await EmployeeService.edit(state.item);
			}
			history.push('/employees');
		} catch (e) {
			setState({ ...state, error: `${e.message}${e?.response?.status === 500 ? ' - Check your employees, the name may be a duplicate' : ''}` });
		}
	};

	const clearForm = () => setState({ ...state, item: { ...state.item, ...emptyItem }});

	return (
		<Container>
			{state.error ? (
				<>
					<h4>{state.error}</h4>
					<Button color='secondary' onClick={paramsId === 'new' ? clearForm : () => window.location.reload()}>
						Try Again
					</Button>
				</>
			) : (
				<>
					<h2>{state.item.id ? 'Edit Employee' : 'Add Employee'}</h2>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for='name'>Name</Label>
							<Input
								type='text'
								name='name'
								id='name'
								required
								value={state.item.name}
								onChange={handleChange()}
							/>

							<Label for='relationship'>Relationship</Label>
							<Input
								type='text'
								name='relationship'
								id='relationship'
								value={state.item.relationship}
								onChange={handleChange()}
							/>

							<Label for='isContractor'>Is a Contractor</Label>
							<CustomInput
								type='switch'
								id='isContractor'
								name='isContractor'
								label={state.item.isContractor ? 'Yes' : 'No'}
								onChange={handleChange('checked')}
								checked={state.item.isContractor}
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
