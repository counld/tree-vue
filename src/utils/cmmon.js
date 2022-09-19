import { API_URL } from '../../service/config';

export default function commonApi(method, url, params={}) {
	if(method.toLowerCase() == 'post' || method.toLowerCase() == 'put') {
		return this.axios({
			method,
			url: `${API_URL}${url}`,
			data: params,
		})
	}
	return this.axios({
		method,
		url: `${API_URL}${url}`,
		params
	})
}