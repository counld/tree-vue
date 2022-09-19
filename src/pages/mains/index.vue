<template>
	 <div class="flex" ref="container">
		<!-- 头部信息 -->
	 	<headers />
		<header-right />
		<!-- 点击蒙层是否允许关闭 -->
		<div class="mask-absolute"></div>
		<!-- 主体内容 -->
		<div class="margin-top-70 clearfix">
			<router-view></router-view>
		</div>
	 </div>
</template>

<script>
import headerRight from '@/components/common/header-right.vue';
import headers from '@/components/common/header.vue';
export default {
  components: { headerRight, headers },
	name: 'mains',
	data() {
		return {
			flex: false,
	}
	}
}
</script>

<style scoped>
.margin-top-70 {
  margin-top: 70px;
	width: 100%;
}
.mask-absolute {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: whitesmoke;
	opacity: 0;
	z-index: -1;
}
</style>