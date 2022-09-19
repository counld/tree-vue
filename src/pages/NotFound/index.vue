<template>
	<div class="container">
		<p>这是一个NotFound页面</p>
		<div class="relogin">
			请重新登入你的账户
			<el-button type="primary" @click="handleClear">重新登入</el-button>
		</div>
	</div>
</template>
<script>

export default {
	name: 'NotFound',
	methods: {
		handleClear() {
			window.localStorage.clear();
			this.$router.push({name: 'login'})
		}
	}
	
}
</script>

<style>
.container {
	position: relative;
	text-align: center;
	height: 100vh;
}
p{
	padding: 10px;
	font-size: 20px;
}
.relogin {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 9999;
	width: 350px;
	height: 400px;
	transform: translate(-50%,-50%);
	background-color: #fff;
}
</style>