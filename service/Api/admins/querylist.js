const ServerConn = require('../conn');


//获取视频列表
const GetAdminsVideoList = (sql) => {
	return (req, res) => {
		let nums = Number(req.query.nums);
		ServerConn(sql,nums, res);
	}
}
// 获取视频列表
const GetAdminsHotVideoList = (sql) => {
	return (req, res) => {
		let nums = Number(req.query.nums);
		ServerConn(sql, nums, res);
	}
}

// 上传视频
const PostAdminsVideo = (sql) => {
	return (req, res) => {
		const videoObj = req.body;
		ServerConn(sql, videoObj, res);
	}
}

//删除视频
const RemoveVideo = (sql) => {
	return (req, res) => {
		const { id } = req.body.params;
		ServerConn(sql, id, res);
	}
}

//更新视频文案
const putAdminsVideo = (sql) => {
	return (req, res) => {
		const comment = req.body.comment;
		ServerConn(sql, comment, res);
	}
}

module.exports = {
	GetAdminsVideoList,
	GetAdminsHotVideoList,
	PostAdminsVideo,
	RemoveVideo,
	putAdminsVideo
}