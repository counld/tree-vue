# tree-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
使用vue搭建后台服务，为其他小应用搭建入口平台

### express + mysql + vue-axios 搭建node+vue项目
```
封装了连接数据的方法，并自作了后端请求接口,这样有利一请求接口是独立，后续改动请求配置就好,
前端请求后端接口数据,动态渲染数据,
这里主要是学习了怎么样连接数据库,操作数据库内的内容,
```

### node 服务
```
采用设置所有均可访问的方法解决跨域问题
node服务要在本地另开一个端口,
npm run start;
```
### 注意打包之前切换环境，不然没定义环境会出现错误请求;

### Compiles and minifies for production
```
npm run build
```
### 部署后的记录
1. 使用a标签的href属性做跳转的时候，node部署的router不会获取到，也就等不到相应的页面
2. 按钮在ios下的手机端会发生边框样式，影响很大
3. 直接输入路由，服务器根本就相应不到这个路由，因为这个是单页面应用的，node服务器只是渲染了初始的页面，后面的页面都是考vue这个框架路由进行跳转的;
4. 初始是home页面是可以加载进来的，后面切换到别的页面后，home路由下的list组件没有渲染上来，初步发现是请求网络时间耗时长，没有返回数据,(增加动态添加请求数据)
5. 搜索框出现的列表跳转，详情页面没有请求数据;(已修改)

优化建议
1. 每次切换页面都是重新请求资源，有没有办法让资源保存下来，点击的速度很快
2. 网络慢的情况下首页根本加载不出来，首页加载的优化
3. 图片资源的优化
### Lints and fixes files
```
npm run lint
```

### node项目部署vue的
怎么使用https进行访问项目，这个可以通过nginx进行请求配置代理`
```javascript

  // #################### 第二种场景（代理地址+斜杠） ####################
    # 请求路径为：http://127.0.0.1:8080/api/article   实际代理为：http://127.0.0.1:8000/api/article
    location ^~/api {
      proxy_pass http://127.0.0.1:8080;
      proxy_set_header Host $http_host; #后台可以获取到完整的ip+端口号
      proxy_set_header X-Real-IP $remote_addr; #后台可以获取到用户访问的真实ip地址
    }
这样就可以把项目请求的api的地址通过nginx代理到node部署的8080的服务资源上了

项目请求的环境配置
// 开发环境地址
const hostMap = {
	dev: 'http://localhost:8000',
	prod: 'https://xuewuboy.club',

}
这样就可以通过打包，把请求的资源都是向https配置代理的地方运行啦
！欧耶终于可以看到一个正常的项目了

```

## 富文本编辑器
https://www.wangeditor.com/v5/getting-started.html

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
