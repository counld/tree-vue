const routerApi = require('./Api/routerApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


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

// 监听端口
app.listen(8000);
console.log(`success listen at port:8000......`);
