import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, CustomInput, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import EmployeeService from '../services/EmployeeService';

const EmployeeEdit = () => {
	const emptyItem = { name: '', relationship: '', isContractor: false, events: []};
	const [state, setState] = useState({ item: emptyItem, error: '', eventToAdd: null });
	const { id: paramsId } = useParams();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			if (paramsId !== 'new') {
				try {
					const res = await EmployeeService.getById(paramsId);
					setState(s => ({ ...s, item: res.data, error: '', eventToAdd: null }));
				} catch (e) {
					setState(s => ({ ...s, error: e.message, eventToAdd: null }));
				}
			}
		})();
	}, [paramsId]);


	// targetKey will tell the function which key on target to use as the new value, so we can handle other input types than text
	// See the switch below for the use case
	const handleChange = (targetKey = 'value') => ({ target } = {}) =>
		setState({ ...state, item: { ...state.item, [target.name]: target[targetKey] }});

	const modifyNewEvent = ({ target } = {}) =>
		setState({ ...state, eventToAdd: { ...state.eventToAdd, [target.name]: target.value }});

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
			setState({ ...state, eventToAdd: null, error: `${e.message}${e?.response?.status === 500 ? ' - Check your employees, the name may be a duplicate' : ''}` });
		}
	};

	const clearForm = () => setState({ ...state, eventToAdd: null, error: '', item: { ...state.item, ...emptyItem }});

	const saveEvent = () => {
		const newEvents = [...state.item.events];
		if (state.eventToAdd.id) {
			const toModIx = state.item.events.findIndex(ev => ev.id === state.eventToAdd.id);
			newEvents[toModIx] = state.eventToAdd;
			setState(s => ({
				...s,
				eventToAdd: null,
				error: '',
				item: { ...state.item, events: newEvents }
			}));

		} else {
			setState(s => ({
				...s,
				eventToAdd: null,
				error: '',
				item: { ...state.item, events: [...newEvents, s.eventToAdd]}
			}));
		}
	};

	const popUnsavedEvent = eventToAdd => {
		const ix = state.item.events.findIndex(ev => ev === eventToAdd);
		const newEvents = [...state.item.events];
		newEvents.splice(ix, 1);
		setState({
			...state,
			eventToAdd,
			item: { ...state.item, events: newEvents }
		});
	};

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
								className='width-65'
							/>
							<br />
							<Label for='relationship'>Relationship</Label>
							<Input
								type='text'
								name='relationship'
								id='relationship'
								value={state.item.relationship}
								onChange={handleChange()}
							/>
							<br />
							<Label for='isContractor'>Is a Contractor</Label>
							<CustomInput
								type='switch'
								id='isContractor'
								name='isContractor'
								label={state.item.isContractor ? 'Yes' : 'No'}
								onChange={handleChange('checked')}
								checked={state.item.isContractor}
							/>

							<Table className='mt-4'>
								<thead>
									<tr>
										<th width='95%' className='no-border'>
											Events
										</th>
										<th className='no-border'>
											<FontAwesomeIcon icon={!state.eventToAdd ? faPlusCircle : faMinusCircle}
												onClick={() => setState({
													...state,
													eventToAdd: state.eventToAdd ? null : { title: '', date: '', description: '' }
												})}
											/>
										</th>

									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											{state.item.events.map((event, ix) => (
												((!event.id && state.eventToAdd?.title !== event.title) || state.eventToAdd?.id !== event.id)

												&& <div
													key={`${event.name}-${ix}`}
													onClick={() => event.id ? setState({ ...state, eventToAdd: event }) : popUnsavedEvent(event)}>
													{event.date && `${event.date}: `}{event.title}{event.description ? ` - ${event.description}` : ''}
												</div>
											))}
										</td>
									</tr>
									{state.eventToAdd && (
										<tr>
											<td>
												<div className='flex-row justify-content-between d-flex mb-4'>
													<Input
														type='text'
														name='title'
														id='eventToAdd.title'
														placeholder='Event Title'
														className='width-25'
														required
														value={state.eventToAdd.title}
														onChange={modifyNewEvent}
													/>
													<Input
														type='date'
														name='date'
														id='eventToAdd.date'
														className='width-25'
														required
														value={state.eventToAdd.date}
														onChange={modifyNewEvent}
													/>
													<Input
														type='text'
														name='description'
														id='eventToAdd.description'
														placeholder='Event Description'
														className='width-25'
														value={state.eventToAdd.description}
														onChange={modifyNewEvent}
													/>
												</div>
												<div>
													<Button color='primary' type='button' onClick={saveEvent}>Add Event</Button>{' '}
													<Button color='secondary' type='button' onClick={() => setState({ ...state, eventToAdd: null })}>
													Cancel
													</Button>
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</Table>

						</FormGroup>
						<br />
						<br />
						<br />
						<FormGroup>
							<Button color='primary' type='submit'>Save</Button>{'   '}
							<Button color='secondary' tag={Link} to='/employees'>Cancel</Button>{'   '}
							<Button color='warning' type='button' onClick={clearForm}>Clear Form</Button>
						</FormGroup>
					</Form>
				</>
			)}
		</Container>
	);
};

export default EmployeeEdit;
