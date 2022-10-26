const adminsManageRouter = [	
	{
		path: '/admins',
		name: 'admins',
		component: () => import(/* webpackChunkName: "admins" */ '@/pages/admins'),
		redirect: '/admins/userManagement',
		meta: {
			title: '管理信息'
		},
		children: [
			{
				path: 'userManagement',
				name: 'userManagement',
				component: () => import( '@/pages/admins/userManagement'),
				meta: {
					title: '个人中心'
				}
			},
			{
				path: 'videoPlatform',
				name: 'videoPlatform',
				component: () => import(/* webpackChunkName: "videoPlatform" */  '@/pages/admins/videoPlatform'),
				meta: {
					title: '视频上传平台',
				},
			},
			{
				path: 'videoManage',
				name: 'videoManage',
				component: () => import(/* webpackChunkName: "videoManage" */ '@/pages/admins/videoManage'),
				meta: {
					title: '视频管理',
				}
			}
		]
	},
]

export default adminsManageRouter;