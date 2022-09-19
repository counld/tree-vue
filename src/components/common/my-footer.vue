<template>
	<footer>
		<div class="footer-item">Copyright © 2022 </div>
		<div class="footer-item">赣2022008315</div>
	</footer>
</template>

<script>
	export default{
		name: 'my-footer',
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	footer {
		position: relative;
		padding: 10px;
	}
	.footer-item{
		text-align: center;
		line-height: 20px;
		color: #999;
		font-size: 12px;
	}
</style>