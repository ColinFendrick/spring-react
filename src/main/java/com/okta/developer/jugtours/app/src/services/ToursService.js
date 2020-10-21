import http from '../http-common';

const getAll = () => http.get('/groups');

const deleteById = id => http.delete(`/group/${id}`);

export default {
	getAll,
	deleteById
};
