import commonApi from "./cmmon";

export function queryApiList() {
	return commonApi.call(this,'get', '/api/articleList',{nums: 3});
}

//获取首页的轮播
export function queryApiSwipper() {
	return commonApi.call(this,'get', '/api/swipper',{nums: 4})
}

//用户登入接口
export function AuthLogin(arr) {
	return commonApi.call(this,'post', '/api/login', arr)
}