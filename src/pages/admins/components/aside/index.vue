<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
		router
  >
    <el-menu-item index="userManagement">
      <i class="el-icon-menu"></i>
      个人中心
		</el-menu-item>
		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span>内容管理</span>
			</template>
      <el-menu-item index="videoPlatform">
					<i class="el-icon-video-camera"></i>
					视频发布
			</el-menu-item>
      <el-menu-item index="videoManage">
        <i class="el-icon-s-tools"></i>
        视频管理
      </el-menu-item>
      <el-menu-item-group title="分组2">
				<el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="4" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
		<el-menu-item index="6">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
		<el-menu-item index="7">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "administration-menu",
  props: ["isCollapse"],
  data() {
    return {
      // isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
	computed: {
			defaultActive: function(){
				return this.$route.path.replace('/admins/', '');
			}
		},
};
</script>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
</style>