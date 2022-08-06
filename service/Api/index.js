const ServerConn = require('./conn');


//获取文章列表
const GetArticleList = (sql) => {
	return (req, res) => {
		let nums = Number(req.query.nums);
		ServerConn(sql, nums,res);
	}
}

//获取wipper轮播图
const GetSwipper = (sql) => {
	return (req, res) => {
		let nums = Number(req.query.nums);
		ServerConn(sql, nums,res);
	}
}

//用户登入
const GetLoginAuth = (sql) => {
	return (req, res) => {
		let arr = req.query.login;
		ServerConn(sql, arr, res);
	}
}

module.exports = {
	GetArticleList,
	GetSwipper,
	GetLoginAuth
}