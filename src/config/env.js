// 开发环境地址 请求地址切换
const hostMap = {
	dev: 'http://localhost:8000',
	prod: 'https://xuewuboy.club',

}
let proxypath = '';
//设置不同环境下的请求地址
switch(process.env.NODE_ENV){
	case 'development':  proxypath = hostMap.dev; break;
	case 'production':  proxypath = hostMap.prod; break;
}
export const API_URL = proxypath;
export const apiUrlImg = proxypath + '/fileDown?key=';
export const TOKEN_KEY = 'vue-app-token-key';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
