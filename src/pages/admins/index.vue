<template>
  <div class="flex-column controls_pages">
		<!-- 头部信息 -->
		<header class="header-set position-fixed">
			<div class="flex justify-content align-center fullheight">
				<div class="avatar_logo">
				<img class="logo" src="/image/avatar.jpg" alt="这是logo"/>
			</div>
			<div class="flex margin-right-10 controls_list">
			  <div class="margin-left-10 iscollapse" @click="handleIsCollapse">
					<i class="el-icon-s-fold"></i>
				</div>
				<div class="margin-left-10">个人中心管理</div>
				<router-link to="/" class="margin-left-10">首页</router-link>
				<div>
					<el-avatar
                size="small"
                src="/image/xuewu.png"
            ></el-avatar>
				</div>
			</div>
			</div>
		</header>
		<div class="sidebar-poper"></div>
    <section>
			<!-- 侧边导航 -->
      <aside class="aside_sider">
				<div class="overflow-y container_list">
					<admini-stration-menu :isCollapse="isCollapse"/>
				</div>
		</aside>
      <main class="padding-10 overflow-hidden white">
				<router-view></router-view>
			</main>
    </section>
  </div>
</template>

<script>
import adminiStrationMenu from "./components/aside/index.vue";
export default {
  name: "controls",
	components: {
		adminiStrationMenu,
	},
  data() {
    return {
			isCollapse: false,
		};
  },
	methods: {
		handleIsCollapse() {
			this.isCollapse = !this.isCollapse;
		}
	}
};
</script>

<style scoped>

header {
	height: 58px;
	border-bottom: 2px solid #e5e7eb;
}
.avatar_logo {
	width: 45px;
	height: 45px;
	margin-left: 30px;
	border-radius: 50%;
	display: inline-block;
}

.iscollapse {
	width: 50px;
	font-size: 28px;
	transition: all linear;
}
.header-set {
	padding: 5px;
	z-index: 99;	
	background-color: #fff;
}
.controls_pages {
	min-height: 100vh;
	background-color: rgba(154, 154, 161, 0.6);
	box-shadow: 0px 0px 1px rgba(0,0,0,0.3),0px 4px 14px rgba(0,0,0,0.1);

}

.sidebar-poper {
	position: fixed;
	top: 76px;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	pointer-events: none;
	z-index: 11;
}

.aside_sider {
	border-radius: 8px;
	position: sticky;
	top: 76px;
	margin-right: 20px;
	float: left;
	z-index: 10;
	transition: all .2s;
}
.logo {
	opacity: .6;
}
.controls_list {
	flex: 1;
	justify-content: space-between;
	font-size: 18px;
}
.margin-top-20 {
	margin-top: 20px;
}
.overflow-y {
	border-right: none;
	height: -moz-calc(100vh - 76px);
	height: calc(100vh - 76px);
	overflow-y: auto;
	overflow-x: hidden;
}

.container_list {
	font-size: 18px;
	color: #374151;
	background: #fff;
}
.container_list li {
	padding: 5px;
}
.container_list li:hover {
	color: #bca5d2
}
section {
	padding: 76px 24px 0;
	flex: 1;
}

main {
	border-radius: 8px;
	min-height: 560px;
}
:deep(.el-menu-item i) {
	font-size: 24px;
	margin-right: 15px!important;
}
:deep(.el-submenu i) {
	font-size: 24px;
	margin-right: 14px;
}

@media screen and (max-width: 640px) {
	.avatar_logo {
		margin-left: 1rem;
	}
	section {
	 padding: 76px 6px 0;
	}
	.aside_sider {
		margin-right: 10px;
	}
}
</style>