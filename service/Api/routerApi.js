var express = require('express');
var router = express.Router();
const { json } = require('body-parser');
var Api = require('.');

// 获取文章列表
router.get('/articleList',Api.GetArticleList('articleList'));
// 下一组文章列表
router.get('/articleNextList',Api.GetArticleNextList('articleNextList'));
//获取文章详情内容
router.get('/articleDetail',Api.GetDetail('detail'));
//增加文章阅读量
router.get('/articleHits',Api.GetAddHits('addHits'));
// 获取最新的几条热门数据
router.get('/getArticleHots',Api.GetArticleHots('getArticleHots'));
// 添加文章
router.post('/addArtice',Api.PostAddArticle('addArtice'));

//搜索文章列表
router.get('/searchList',Api.SearchList('searchList'));

//获取轮播图片
router.get('/swipper',Api.GetSwipper('swipper'))

//用户登入
router.post('/login',Api.PostLoginAuth('login'));
//用户查询 是否存在用戶
router.get('/queryCheckUser',Api.GetQueryCheckUser('queryCheckUser'));
//用户注冊 添加用戶
router.post('/register',Api.PostRegister('addUser'));

//获得猜谜语的权限
router.post('/addRiddle',Api.PostAddRiddle('addRiddle'));
router.get('/riddleList',Api.GetRiddleList('riddleList'));
router.get('/newestRiddleList',Api.GetNewestRiddleList('newestRiddleList'));
router.get('/nextRiddle',Api.GetNextRiddle('nextRiddle'));

module.exports = router;

