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

### 一. node 服务
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
### 二、 部署后的记录
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
三.  #################### 第二种场景（代理地址+斜杠） ####################
    # 请求路径为：http://127.0.0.1:8080/api/article   实际代理为：http://127.0.0.1:8000/api/article
    location ^~/api {
      proxy_pass http://127.0.0.1:8080;
      proxy_set_header Host $http_host; #后台可以获取到完整的ip+端口号
      proxy_set_header X-Real-IP $remote_addr; #后台可以获取到用户访问的真实ip地址
    }
这样就可以把项目请求的api的地址通过nginx代理到node部署的8080的服务资源上了

四. ########################  如何在nginx上配置获取403不到页面时的      ###############################


    location / {
        // # proxy_pass http://127.0.0.1:8080; 把这请求代理到node服务上使用nginx进行访问
        try_files $uri $uri/ @router;		
        index  index.html index.htm; 
	root /www/wwwroot/backstage/dist;
    }

  //  ###配置路由文件
   location @router {
         rewrite ^.*$ /index.html last;
      }
      
项目请求的环境配置
// 开发环境地址
const hostMap = {
	dev: 'http://localhost:8000',
	prod: 'https://xuewuboy.club',

}
这样就可以通过打包，把请求的资源都是向https配置代理的地方运行啦
！欧耶终于可以看到一个正常的项目了

```
```javascript
四. CDN（内容分发网络）指请求资源的方式，即通过script头去请求对应的脚本资源的一种方式，项目里配置之后不需要通过npm包管理工具去下载配置的包。

目的：将引用的外部js、css文件剥离开来，不编译到vendor.js中，而是用资源的形式引用，这样浏览器可以使用多个线程异步将vendor.js、外部的js等加载下来，达到加速首页展示效果。
1. 在vue.config.js进行配置
//生产环境标记
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
//配置引用cdn的js、css地址
const cdn = {
    css: [
        'https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css'
    ],
    js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.0.2/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.0/vuex.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.18.1/axios.min.js',
        'https://unpkg.com/element-ui@2.13.2/lib/index.js',
        'https://cdn.bootcdn.net/ajax/libs/echarts/5.0.1/echarts.min.js'
    ]
}
//配置打包时使用CDN节点（加入externals外部扩展）， 忽略打包的第三方库
//左面放package.json中的扩展的名称,右面放项目依赖的名称(项目初始化要用的名称)
const externals = {
  // 属性名称 vue, 表示遇到 import xxx from 'vue' 这类引入 'vue'的，不去 node_modules 中找，而是去找全局变量 Vue（其他的为VueRouter、Vuex、axios、ELEMENT、echarts，注意全局变量是一个确定的值，不能修改为其他值，修改为其他大小写或者其他值会报错，若有异议可留言）
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'element-ui': 'ELEMENT',
    'echarts': 'echarts'
}
chainWebpack(config) {
        if (IS_PRODUCTION) {
            config.plugin('html').tap(args => {
                args[0].cdn = cdn
                return args
            })
            //视为一个外部库，而不将它打包进来
            config.externals(externals)
        }
    }      
2.在public/index.html文件配置
使用 webpack中自带的插件 html插件进行配置，在 index.html 中增加判断，是否使用 CDN， htmlWebpackPlugin.options 使用的是vue.config中的config.plugin('html')的插件属性。

  // <!-- 使用CDN的CSS文件 -->
     <% for (var i in
     htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.css) { %>
     <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="external nofollow"  rel="external nofollow"  rel="preload" as="style" />
     <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="external nofollow"  rel="external nofollow"  rel="stylesheet" />
   <% } %>
    // <!-- 使用CDN加速的JS文件，配置在vue.config.js下 -->
   <% for (var i in
     htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
     <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
   <% } %>

// 试一试.看看首次加载是否快了许多
```
```javascript
1. node 线上服务器部署时， vue-konva 在移动端的获取位置的统一使用api,不然获取的到pc端de
 this.stage =  this.$refs.wrapper.getNode();
let { x, y} = this.stage.getPointerPosition(); //这个去获取

2. socket.io 在node部署时出现了请求出做，这里是本地服务器会开启一个websocket线程，使得本地node服务和本地项目链接在了一起
可是部署到线上，这就不一样了，这还得配置nignx服务代理 /socket.io 这个接口
nignx 配置
  location ^~/socket.io/ {
      proxy_set_header Host $host:$server_port; #后台可以获取到完整的ip+端口号
      proxy_set_header X-Real-IP $remote_addr; #后台可以获取到用户访问的真实ip地址
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host:$server_port;
      proxy_pass http://127.0.0.1:8080;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      sub_filter /node /;
    }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

node服务器也得接受一个这个请求
app.get('/socket.io', function (req, res) {
//   开启socket服务
    // let server = require('http').createServer(app);
    require('./websocket')(server);

});
------------------------------这样请求到这就有了一个闭环 ----------------------------------

```


## 新增scale-box的包裹组件，使得组件能自私应大屏显示器
```javascript

 if (this.$refs.ScaleBox && !this.isShow) {
        this.$refs.ScaleBox.style.setProperty("--scale", this.scale);
      }
  //css 参数的核心
  transform: scale(var(--scale)) translate(-50%, -50%);

```

### 新增了git commit 提交检测
规范了git提交必须要说明格式是
## 富文本编辑器
https://www.wangeditor.com/v5/getting-started.html

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
