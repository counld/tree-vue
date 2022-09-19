// 开发环境地址
const hostMap = {
	dev: 'http://localhost:8000',
	prod: 'http://xuewuboy.club:8080'
}
export const API_URL = hostMap.dev;
export const apiUrlImg = hostMap.dev + '/fileDown?key=';
export const TOKEN_KEY = 'vue-app-token-key';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
