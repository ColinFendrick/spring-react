import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

import ToursService from '../services/ToursService';

const GroupEdit = props => {
	const emptyItem = {
		name: '',
		address: '',
		city: '',
		stateOrProvince: '',
		country: '',
		postalCode: ''
	};

	const [state, setState] = useState({ item: emptyItem, error: '' });

	useEffect(() => {
		(async () => {
			if (props.match.params.id !== 'new') {
				try {
					const res = await ToursService.getById(props.match.params.id);
					setState({ item: res.data, error: '' });
				} catch (e) {
					setState(s => ({ ...s, error: e.message }));
				}
			}
		})();
	}, [props.match.params.id]);


	const handleChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let item = { ...state.item };
		item[name] = value;
		setState({ item });
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			if (!state.item.id) {
				await ToursService.create(state.item);
			} else {
				await ToursService.edit(state.item);
			}
			props.history.push('/groups');
		} catch (e) {
			setState({ ...state, error: e.message });
		}
	};

	return (
		<Container>
			{state.error ? <h4>{state.error}</h4> : (
				<>
					<h2>{state.item.id ? 'Edit Group' : 'Add Group'}</h2>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for='name'>Name</Label>
							<Input type='text' name='name' id='name' value={state.item.name || ''}
								onChange={handleChange} autoComplete='name'/>
						</FormGroup>
						<FormGroup>
							<Label for='address'>Address</Label>
							<Input type='text' name='address' id='address' value={state.item.address || ''}
								onChange={handleChange} autoComplete='street-address'/>
						</FormGroup>
						<FormGroup>
							<Label for='city'>City</Label>
							<Input type='text' name='city' id='city' value={state.item.city || ''}
								onChange={handleChange} autoComplete='address-level2'/>
						</FormGroup>
						<div className='row'>
							<FormGroup className='col-md-4 mb-3'>
								<Label for='stateOrProvince'>State/Province</Label>
								<Input type='text' name='stateOrProvince' id='stateOrProvince' value={state.item.stateOrProvince || ''}
									onChange={handleChange} autoComplete='address-level1'/>
							</FormGroup>
							<FormGroup className='col-md-5 mb-3'>
								<Label for='country'>Country</Label>
								<Input type='text' name='country' id='country' value={state.item.country || ''}
									onChange={handleChange} autoComplete='country'/>
							</FormGroup>
							<FormGroup className='col-md-3 mb-3'>
								<Label for='country'>Postal Code</Label>
								<Input type='text' name='postalCode' id='postalCode' value={state.item.postalCode || ''}
									onChange={handleChange} autoComplete='postal-code'/>
							</FormGroup>
						</div>
						<FormGroup>
							<Button color='primary' type='submit'>Save</Button>{' '}
							<Button color='secondary' tag={Link} to='/groups'>Cancel</Button>
						</FormGroup>
					</Form>
				</>
			)}
		</Container>
	);
};

export default withRouter(GroupEdit);
