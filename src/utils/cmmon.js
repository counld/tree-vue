import { API_URL } from '../../service/config';

export default function commonApi(method, url, params) {
	return this.axios({
		method,
		url: `${API_URL}${url}`,
		params
	})
}