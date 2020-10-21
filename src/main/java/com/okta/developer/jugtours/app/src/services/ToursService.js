import http from '../http-common';

const getAll = () => http.get('/groups');

const getById = id => http.get(`/group/${id}`);

const create = data => http.post('/group', data);

const edit = data => http.put(`/group/${data.id}`, data);

const deleteById = id => http.delete(`/group/${id}`);

export default {
	getAll,
	getById,
	create,
	edit,
	deleteById
};
