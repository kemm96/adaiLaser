import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/'

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization : `Bearer ${window.localStorage.getItem('access-token')}`
	}
});

export default api