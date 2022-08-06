var conn = require('../mysql');
var $sql = require('../sqlMap');

function ServerConn(sql,params,res) {
		const sqls = $sql[sql]
		conn.query(sqls, params, function (err, result) {
			if (err) {
				//返回接口内容
				let datas = {
					code: 500,
					msg: err.sqlMessage || "后台服务异常,请稍后再试"
				}
				res.end(JSON.stringify(datas));
				return;
			} else {
				//返回接口内容
				res.end(JSON.stringify(result));
				return;
			}
		});
}

module.exports = ServerConn;