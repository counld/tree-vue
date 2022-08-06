const sqlMap = {
  // 用户
  articleList:  'SELECT id,title,content,`time`,thumbnail FROM article WHERE hot = 1 LIMIT ?',
  article: 'SELECT id,title,content,`time`,thumbnail FROM article ORDER BY TIME DESC',//获取文章
  swipper: 'SELECT id, thumbnail FROM picture ORDER BY RAND() LIMIT ?',//获取swipper动态图
  login: 'SELECT id,username FROM `user` WHERE username = ? AND PASSWORD = ?'//登入  params [user,pass]
}

module.exports = sqlMap;
