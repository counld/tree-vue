const sqlMap = {
  // 用户 
  getArticleHots:  'SELECT id,title,description,`time`,thumbnail,tag FROM article WHERE hot = 1 ORDER BY TIME DESC LIMIT 2 ',//获取最新的限制几条数据
  articleList: 'SELECT * FROM article LIMIT 10',//获取文章
  articleNextList: 'SELECT * FROM article WHERE id > ? ORDER BY id ASC LIMIT 10',//获取下一节文章
  swipper: 'SELECT * FROM pictures ORDER BY RAND() LIMIT ?',//获取swipper动态图
  login: 'SELECT id, username, avatar FROM `users` WHERE username = ? AND PASSWORD = ?',//登入  params [user,pass]
  queryCheckUser: 'SELECT username FROM `users` WHERE username = ? ORDER BY username',
  addUser: 'INSERT INTO users SET ?',// 添加用戶
  addArtice: 'INSERT INTO article SET ?', //添加文章
  addRiddle: 'INSERT INTO riddle SET ?', //添加猜谜语项
  nextRiddle: 'SELECT id,answer,description,errorlist,puzzle,title FROM riddle WHERE id > ? ORDER BY id ASC LIMIT 1',//下一个谜底
  riddleList: 'SELECT id,answer,description,errorlist,puzzle,title FROM riddle LIMIT ?',//获取猜谜语项
  riddleIdData: 'SELECT id,answer,description,errorlist,puzzle,title FROM riddle WHERE id = ?',//获取id下的猜谜语项
  newestRiddleList: 'SELECT id,answer,description,errorlist,puzzle,title FROM riddle ORDER BY TIME DESC LIMIT ?',//获取最新猜谜语项
  appointArticle: 'SELECT a.id,a.title,a.content,a.`time`,a.hits,c.`avatar`,c.`name`,a.`thumbnail`,a.`hot` FROM article a,users c WHERE a.`category_id` = c.`id` AND a.id = ?',
  detail: 'SELECT title,content,`time`,hits, description,thumbnail,tag,creatTime FROM article WHERE id = ? ORDER BY TIME DESC',//获取改id下的文章,
  addHits: 'UPDATE article SET hits = hits + 1 WHERE id = ?',
  searchList: 'SELECT id,title,content,`time`,thumbnail,description FROM article WHERE title LIKE ? ORDER BY TIME DESC',//搜索文章列表
  prevPage: 'SELECT id,title,tag FROM article WHERE id < ? ORDER BY id DESC LIMIT 1'//上一篇文章
}

module.exports = sqlMap;
