import http from '../http-common';

const logout = () => http.post('/logout');

const getUser = () => http.get('/user');

export default {
	logout,
	getUser
};
