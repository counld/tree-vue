var express = require('express');
var router = express.Router();
var Api = require('./querylist.js');

// 上传视频
router.post('/adminsVideo',Api.PostAdminsVideo('adminsVideo'));

// 获取热门视频列表
router.get('/adminsHotVideoList',Api.GetAdminsHotVideoList('adminsHotVideoList'));

// 获取视频列表
router.get('/adminsVideoList', Api.GetAdminsVideoList('adminsVideoList'));

// 删除视频
router.delete('/removeAdminsVideo', Api.RemoveVideo('removeAdmins'))

// 修改 视频文案
router.put('/uploadVideo', Api.putAdminsVideo('commentVideo'));

module.exports = router;

