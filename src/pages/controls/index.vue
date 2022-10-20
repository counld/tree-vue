<template>
  <div class="flex-column controls_pages">
		<!-- 头部信息 -->
		<header>
			<div class="flex justify-content align-center fullheight">
				<div class="avatar_logo">
				<img class="logo" src="/image/avatar.jpg" alt="这是logo"/>
			</div>
			<div class="flex margin-right-10 controls_list">
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
    <section class="flex">
			<!-- 侧边导航 -->
      <aside class="aside_sider">
				<div class="text-center">
					<div class="margin-top-20 overflow">
						<ul class="overflow-y container_list">
							<li>文章管理 </li>
							<li>谜底管理 </li>
							<li>情感管理</li>
							<li>卡片整理 </li>
						</ul>
					</div>
				</div>
		</aside>
      <main>主题信息内容</main>
    </section>
  </div>
</template>

<script>
export default {
  name: "controls",
  data() {
    return {};
  },
};
</script>

<style scoped>
.controls_pages {
	height: 100vh;
	background-color: #fff;
}

aside {
	flex: 0 0 200px;
	max-width: 200px;
	min-width: 200px;
	width: 200px;
}
.aside_sider {
	position: relative;
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
	position: relative;
  white-space: nowrap;
	overflow-y: scroll;
}

.container_list {
	font-size: 18px;
	color: #374151
}
.container_list li {
	padding: 5px;
}
.container_list li:hover {
	color: #bca5d2
}
section {
	flex: 1;
}

header {
	height: 58px;
	border-bottom: 2px solid #e5e7eb;
}
.avatar_logo {
	width: 50px;
	height: 50px;
	margin-left: 30px;
	border-radius: 50%;
	display: inline-block;
}

main {
	flex: 1;
}
</style>