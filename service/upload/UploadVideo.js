const fs = require('fs');
const pathLib = require('path');
const multer = require('multer');

//设置 视频文件存放位置
const uploadVido = multer({
	storage: multer.diskStorage({
		//设置文件存储位置
		destination: function (req, file, cb) {

			let dir = pathLib.resolve(__dirname + '/../../public/video/');
			//设置图片存储位置
			// 上传文件路径

			//判断目录是否存在，没有则创建
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, {
					recursive: true
				});
			}

			//dir就是上传文件存放的目录
			cb(null, dir);

		},
		filename: function (req, file, cb) {
			let fileName = 'video' + '-xuewu' + Date.now().toString().slice(-10);;
			//fileName就是上传文件的文件名
			cb(null, fileName);
		},
		dest: 'static/video', // 上传文件的存储目录
		limits: {
			fileSize: 1024 * 1024 * 20 // 单个文件大小限制在2M以内
		}
	}),
});
//上传视频
module.exports = (app) => {
	app.post('/api/uploadVideo', uploadVido.single('file'), (req, res) => {
		if (req.file) {
			let file = req.file;
			let newName = file.path + pathLib.parse(file.originalname).ext; //修改path
			fs.rename(file.path, newName, (err) => { //修改path
				if (err) {
					return res.status(200).json({
						code: 0,
						msg: '服务器繁忙！'
					})
				} else {
					return res.status(200).json({
						code: 1,
						msg: '上传完成',
						title: pathLib.parse(file.originalname).name,
						videoUrl: '/video/' + file.filename + pathLib.parse(file.originalname).ext
					})
				}
			})
		} else {
			return res.status(200).json({
				code: 0,
				msg: '服务器繁忙！'
			})
		}
	});

	//删除本地视频文件
	app.delete('/api/deleteSynsVideo', function(req, res) {
		
		const { videoId } = req.body.params;
		console.log(videoId, req.body, )
		const linkPath = pathLib.resolve(__dirname + '/../../public/' + videoId)
		fs.unlink(linkPath, function(error) {
			if (error) {
				return res.status(200).json({
					code: 0,
					msg: '服务器繁忙！'
				})
			} else {
				return res.status(200).json({
					code: 1,
					msg: '删除文件成功',
				})
			}
			
		})
	})
}