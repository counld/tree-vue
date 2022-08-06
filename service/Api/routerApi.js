var express = require('express');
var router = express.Router();
const { json } = require('body-parser');
var Api = require('.');

// 增加用户接口
router.get('/articleList',Api.GetArticleList('articleList'));
//获取轮播图片
router.get('/swipper',Api.GetSwipper('swipper'))
//用户登入
router.post('/login',Api.GetLoginAuth('login'));

module.exports = router;

