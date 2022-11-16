<template>
	<footer>
		<div style="width:400px;margin:0 auto; padding:20px 0;">
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36112702000056" style="display: flex;text-decoration:none;height:20px;line-height:20px;"><img src="/image/beian.png" style="float:left;width: 20px;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 10px 0px 5px; color:#939393;">赣公网安备 36112702000056号</p>
					<div class="footer-item">赣ICP号2022008315</div>
				</a>
		 	</div>
		<!-- <div class="footer-item">Copyright © 2022 </div> -->
		
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