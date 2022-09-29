<template>
	<el-dropdown @command="handleExit">
		<span class="el-dropdown-link">
			用户中心<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item icon="el-icon-plus" command="admit">{{username}}</el-dropdown-item>
			<el-dropdown-item icon="el-icon-circle-plus" command="exit">退出</el-dropdown-item>
			<el-dropdown-item icon="el-icon-circle-plus-outline" command="accout">account</el-dropdown-item>
			<el-dropdown-item icon="el-icon-check" command="help">help</el-dropdown-item>
			<el-dropdown-item icon="el-icon-circle-check" command="setting">setting</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
	name: 'user-dropdown',
	data() {
		return {	
			username: localStorage.getItem('username') || '手札',
		}
	},
	mounted() {
		if(this.username == '') {
			this.$message({
				showClose: true,
				message: `欢迎${this.$route.params.username}您的到来`,
				type: 'success'
			})
			this.username = this.$route.params.username;
			localStorage.setItem("username", this.username)
		}
	},
	methods: {
		handleExit(command) {
			console.log(command,'command');
			if(command === 'exit'){
				localStorage.clear();
				window.location.reload() 
				// this.$router.go(0);
				this.$message('click on item ' + command);
			}
		},
	}
}
</script>

<style scoped>

</style>