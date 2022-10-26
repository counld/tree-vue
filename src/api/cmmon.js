import { API_URL } from '@/config/env.js';

export default function commonApi(method, url, params={}) {
	url = `${API_URL}${url}`;
	if(method.toLowerCase() == 'post' || method.toLowerCase() == 'put') {
		return this.axios({
			method,
			url,
			data: params,
		})
	}
	if(method.toLowerCase() === 'delete') {
		return this.axios.delete(url, {data: { params }})
	}
	return this.axios({
		method,
		url,
		params
	})
}