import commonApi from "./cmmon";

//获取文章列表
export function queryApiList() {
	return commonApi.call(this,'get', '/api/articleList');
}
// 下一组文章列表
export function GetArticleNextList(id) {
	return commonApi.call(this,'get', '/api/articleNextList',{id});
}
//获取文章详情内容
export function queryApiDetail(id) {
	return commonApi.call(this,'get', '/api/articleDetail',{id});
}
//增加文章点击量
export function queryApiArticleHits(id) {
	return commonApi.call(this,'get', '/api/articleHits',{id});
}
//获取文章列表搜索
export function queryApiArticleSearchList(keyWord) {
	return commonApi.call(this,'get', '/api/searchList',{keyWord});
}

//获取文章列表搜索
export function queryApiArticleHots() {
	return commonApi.call(this,'get', '/api/getArticleHots');
}

//获取首页的轮播
export function queryApiSwipper() {
	return commonApi.call(this,'get', '/api/swipper',{nums: 4})
}

//用户登入接口
export function AuthLogin(arr) {
	return commonApi.call(this,'post', '/api/login', arr)
}queryCheckUser

//用戶查重
export function queryCheckUser(username) {
	return commonApi.call(this,'get', '/api/queryCheckUser', {username}) 
}
//用戶注冊 register
export function PostUserRegister(obj) {
	return commonApi.call(this,'post', '/api/register', obj) 
}

//用户添加文章
export function addArtice(obj) {
	return commonApi.call(this,'post', '/api/addArtice',obj)
}

//用户添加猜谜语
export function addRiddle(obj) {
	return commonApi.call(this,'post', '/api/addRiddle',obj)
}
//获取猜谜语
export function queryApiRiddleList(nums) {
	return commonApi.call(this,'get', '/api/riddleList', {nums});
}
//获取猜谜语
export function queryApiNewestRiddleList(nums) {
	return commonApi.call(this,'get', '/api/newestRiddleList', {nums});
}
//获取下一个猜谜语
export function queryApiNextRiddle(id) {
	return commonApi.call(this,'get', '/api/nextRiddle', {id});
}