<template>
	<el-tooltip class="item" effect="dark" :content="title" placement="bottom"> 
		<span @click="handleFullScreen" class="margin-right-10">
			<i class="el-icon-full-screen"></i>
		</span>
	</el-tooltip>
</template>
<script>
export default {
props: [
],
data() {
    return {
        title: '全屏',
        fullscreen: false  // 是否全屏
    }
},
methods: {
    // 全屏事件
    handleFullScreen(){
        let element = document.documentElement;
        // 判断是否已经是全屏
        // 如果是全屏，退出
        if (this.fullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
						this.title = '全屏';
        } else {    // 否则，进入全屏
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
						this.title = '退出全屏';
        }
        // 改变当前全屏状态
        this.fullscreen = !this.fullscreen;
    }
  }
}
</script>
<style scoped>
@media screen and (max-width: 640px){
.el-tooltip {
    display: none;
}
}
</style>