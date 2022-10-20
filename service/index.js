const routerApi = require('./Api/routerApi');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// let cxt = require('./services-server');

//静态资源配置
// app.use(express.static('dist'));
app.use(express.static('public'));

app.get("/mains/?*",function(req, res) {
  res.send('等会刷新！\<a href="http:\/\/localhost:8000"\ target="_self" title="点击就能看到神奇的东西">去首页\<\/a\>');
})

// 上传配置
const upload = multer({
  storage: multer.diskStorage({
    //设置文件存储位置
    destination: function (req, file, cb) {
      // 判断月份，获取到的月份范围(0-11)所有在这需要将月份加一才能获取到当前月份，padStart是判断这个字符串是否大于2位，不大于在前面拼接一个0
      let dir = path.resolve(__dirname + '/../public/upload/');
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
      let fileName = 'img' + '-xuewu' + Date.now();
      //fileName就是上传文件的文件名
      cb(null, fileName);
    },
    dest: 'static/upload', // 上传文件的存储目录
    limits: {
      fileSize: 1024 * 1024 * 3 // 单个文件大小限制在2M以内
    }
  })
})

// 但圖片上传配置
const avatar = multer({
  storage: multer.diskStorage({
    //设置文件存储位置
    destination: function (req, file, cb) {
      // 判断月份，获取到的月份范围(0-11)所有在这需要将月份加一才能获取到当前月份，padStart是判断这个字符串是否大于2位，不大于在前面拼接一个0
      let dir = path.resolve(__dirname + '/../public/avatar/');
      //设置图片存储位置
      // 上传文件路径
      console.log(file,'destination',__dirname,'file',dir);

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
      let fileName = 'img' + '-xuewu_' + Math.round(Math.random() * 100000);
      //fileName就是上传文件的文件名
      cb(null, fileName);
    },
    dest: 'static/avatar', // 上传文件的存储目录
    limits: {
      fileSize: 1024 * 1024 * 3 // 单个文件大小限制在2M以内
    }
  })
})

let httpPort = 8000;

//开启socket服务
let server = require('http').createServer(app);
  require('./websocket')(server);

// app.get('/socket.io', function (req, res) {
//   // 开启socket服务
//     let server = require('http').createServer(app);
//     require('./websocket')(server);

// });

// 采用设置所有均可访问的方法解决跨域问题
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  // 解决node.js返回中文出现乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() === 'options') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.json()); // 以json格式返回出去
app.use(bodyParser.urlencoded({ extended: true }));

// 后端api路由
app.use('/api', routerApi);

// 上传操作
app.post('/api/upload/image', upload.single("editormd-image-file"), (req, res, next) => {
  // 上传成功后的文件对象
  let { file } = req
  if (file) {
    //  file.originalname ==> 文件的原名称
    let extname = path.extname(file.originalname)
    // file.path ==> 上传后的文件路径
    fs.renameSync(file.path, file.path + extname)
    // file.filename ==> 上传后的文件名
    req.uploadUrl = '/upload/' + file.filename + extname
  }
  if (req.uploadUrl) {
    res.send({
      "errno": 0, // 注意：值是数字，不能是字符串
      data: {
        url: req.uploadUrl,
        alt: '',
        herf: req.uploadUrl,
      }
    })
  } else {
    res.send({
      "errno": 1, // 只要不等于 0 就行
      "message": "失败信息",
      uploaded: false,
    })
  }
})

// 退出
app.get('/api/user/logout', (req, res) => {
  // req.session.user = null
  res.send({
    data:'header',
    error: 1,
  })
  // res.render('login', { msg: '退出成功' })
})
// / 上传操作avatar
app.post('/api/upload/avatar', avatar.single('file'), (req, res, next) => {
  // 上传成功后的文件对象
  let { file } = req
  if (file) {
    //  file.originalname ==> 文件的原名称
    let extname = path.extname(file.originalname)
    // file.path ==> 上传后的文件路径
    fs.renameSync(file.path, file.path + extname)
    // file.filename ==> 上传后的文件名
    req.uploadUrl = '/avatar/' + file.filename + extname
  }
  if (req.uploadUrl) {
    res.send({
      "errno": 0, // 注意：值是数字，不能是字符串
      data: {
        url: req.uploadUrl,
        alt: '',
        herf: req.uploadUrl,
      }
    })
  } else {
    res.send({
      "errno": 1, // 只要不等于 0 就行
      "message": "失败信息",
      uploaded: false,
    })
  }
})

// 监听端口
server.listen(httpPort);
console.log(`success listen at port:${httpPort}......`, path.resolve(__dirname + '/../static/upload/'),'io listen success !! ' + httpPort);
