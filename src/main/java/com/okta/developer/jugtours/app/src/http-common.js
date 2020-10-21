import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
	credentials: 'include',
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json'
	}
});

export default instance;
