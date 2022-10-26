const adminsMapSql = {
	adminsVideo: 'INSERT INTO videoList SET ?',
	adminsHotVideoList: 'SELECT id,title,description, videoUrl, hits_stars, hotVideo, uploadTime FROM videoList WHERE hotVideo = 1 ORDER BY uploadTime DESC LIMIT ?',
	adminsVideoList: 'SELECT id,title,description, videoUrl, hits_stars, hotVideo, uploadTime FROM videoList ORDER BY uploadTime DESC LIMIT ?',
	commentVideo: 'UPDATE videoList SET title = ?, description = ?, hotVideo = ?, uploadTime = ? WHERE id = ?',// 更新video的信息
	removeAdmins: 'DELETE FROM videoList WHERE id = ?',
}


module.exports = adminsMapSql;