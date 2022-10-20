// 开发环境地址 请求地址切换
const hostMap = {
	dev: 'http://localhost:8000',
	prod: 'https://xuewuboy.club',

}
export const API_URL = hostMap.dev;
export const apiUrlImg = hostMap.dev+ '/fileDown?key=';
export const TOKEN_KEY = 'vue-app-token-key';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
