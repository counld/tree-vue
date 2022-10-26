const ServerConn = require('../conn');


//获取文章列表
const GetArticleList = (sql) => {
	return (req, res) => {
		ServerConn(sql,null, res);
	}
}
// 获取下一组文章列表
const GetArticleNextList = (sql) => {
	return (req, res) => {
		let id = Number(req.query.id);
		ServerConn(sql,id, res);
	}
}

// 获取文章详情
const GetDetail = (sql) => {
	return (req, res) => {
		let id = Number(req.query.id);
		ServerConn(sql,id, res);
	}
}
//
// 增加文章的点击量
const GetAddHits = (sql) => {
	return (req, res) => {
		let id = Number(req.query.id);
		ServerConn(sql,id, res);
	}
}
// 搜索文章列表
const SearchList = (sql) => {
	return (req, res) => {
		let keyWord = req.query.keyWord;
		ServerConn(sql,`%${keyWord}%`, res);
	}
}

// 获取最新的热门数据
const GetArticleHots = (sql) => {
	return (req, res) => {
		ServerConn(sql, null, res);
	}
}

//获取wipper轮播图
const GetSwipper = (sql) => {
	return (req, res) => {
		let nums = Number(req.query.nums);
		ServerConn(sql, nums, res);
	}
}

//用户登入
const PostLoginAuth = (sql) => {
	return (req, res) => {
		let arr = req.body.login;
		ServerConn(sql, arr, res);
	}
}
//用户查重
const GetQueryCheckUser = (sql) => {
	return (req, res) => {
		let username = req.query.username;
		ServerConn(sql, username, res);
	}
}

//用户注冊
const PostRegister = (sql) => {
	return (req, res) => {
		let arr = req.body.register;
		ServerConn(sql, arr, res);
	}
}

//添加文章 { object } article
const PostAddArticle = (sql) => {
	return (req, res) => {
		const article = req.body;
		ServerConn(sql, article, res);
	}
}
//添加猜谜语 { object } riddle
const PostAddRiddle = (sql) => {
	return (req, res) => {
		const article = req.body;
		ServerConn(sql, article, res);
	}
}
//获取猜谜语项
const GetRiddleList = (sql) => {
	return (req, res) => {
		const nums = Number(req.query.nums);
		ServerConn(sql,nums, res);
	}
}
//获取最新猜谜语项
const GetNewestRiddleList = (sql) => {
	return (req, res) => {
		const nums = Number(req.query.nums);
		ServerConn(sql,nums, res);
	}
}

//该id下的谜底
const GetriddleIdData = (sql) => {
	return (req, res) => {
		const id = Number(req.query.id);
		ServerConn(sql, id, res);
	}
}
//下一个谜底
const GetNextRiddle = (sql) => {
	return (req, res) => {
		const id = Number(req.query.id);
		ServerConn(sql, id, res);
	}
}

module.exports = {
	GetArticleList,
	GetArticleNextList,
	GetDetail,
	GetAddHits,
	SearchList,
	GetArticleHots,
	GetSwipper,
	PostLoginAuth,
	GetQueryCheckUser,
	PostRegister,
	PostAddArticle,
	PostAddRiddle,
	GetRiddleList,
	GetNewestRiddleList,
	GetriddleIdData,
	GetNextRiddle,
}