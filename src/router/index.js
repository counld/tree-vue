import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/mains/home';

Vue.use(Router);
// vue2项目中使用keep-alive,可在路由跳回该组件时展示跳走前的数据形式，滚动条等。
const routes = [
	{
		path: '/',
		redirect: '/mains',
	},
	{
		path: '/mains',
		name: 'mains',
		component: () => import('../pages/mains'),
		redirect: '/mains/study',
		//添加权限访问，表示只有登录之后才能进行该操
		meta: {
			requireAuth: true
		},
		children: [
			{
				path: 'home/:username',
				name: 'home',
				component: Home,
				meta: {
					title: 'xuewu主页',
					keepAlive: true,
				}
			},
			{
				path: 'riddle/:riddleId',
				name: 'riddle',
				component: () => import('../pages/mains/riddle'),
				meta: {
					title: '猜谜语详情',
				}
			},
			{
				path: 'detail/:id',
				name: 'detail',
				component: () => import('../pages/mains/details'),
				meta: {
					title: '文章详情页',
				}
			},
			{
				path: 'study',
				name: 'study',
				component: () => import('../pages/mains/study'),
				meta: {
					title: '创作故事',
					keepAlive: true,
				}
			},
			{
				path: 'painting',
				name: 'painting',
				component: () => import('../pages/mains/painting'),
				meta: {
					title: '在线请求话题',
					keepAlive: true,
				}
			},
			{
				path: 'person/show',
				name: 'person/show',
				component: () => import('../pages/mains/show'),
				meta: {
					title: '展示个人作品',
					keepAlive: true,
				}
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../pages/login'),
		meta: {
			title: '登入页'
		}
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('../pages/register'),
		meta: {
			title: '注册页',
		}
	},
	{
		path: '*',
		component: () => import('../pages/NotFound'),
	}
]

const router = new Router({
	mode: 'history',
	routes,
})



//路由判断登录，根据路由配置文件的参数
router.beforeEach((to, from, next) => {
	//判断该路由是否需要登录权限
	//record.meta.requireAuth是获取到该请求中携带的该参数
	document.title = to.meta.title;
	if (to.matched.some(record => record.meta.requireAuth)) {
		//获取到本地的token
		const token = localStorage.getItem("token")
		
		//判断当前的token是否存在，也就是登录时的token
		if (token) {
			//如果指向的是登录页面，不做任何操作
			if (to.path === "/login") {
				console.log('login');
			} else {
				//如果不是登录页面，且token存在，就放行
				next()
			}
		} else {
			//    如果token不存在
			//    前往登录
			next({ path: '/login' })
		}

	} else {
		//如果不需要登录认证，就直接访问
		next()
	}
})


export default router;