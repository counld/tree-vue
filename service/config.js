// 开发环境地址
const hostMap = {
	dev: 'http://localhost:8000',
	prod: 'https://xuewuboy.club',

}
export const API_URL = hostMap.prod;
export const apiUrlImg = hostMap.prod+ '/fileDown?key=';
export const TOKEN_KEY = 'vue-app-token-key';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
