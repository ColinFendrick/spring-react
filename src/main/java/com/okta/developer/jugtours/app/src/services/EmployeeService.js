import http from '../http-common';

const getAll = () => http.get('/employees');

const getById = id => http.get(`/employees/${id}`);

const create = data => http.post('/employee', data);

const edit = data => http.put(`/employee/${data.id}`, data);

const deleteById = id => http.delete(`/employee/${id}`);

export default {
	getAll,
	getById,
	create,
	edit,
	deleteById
};
