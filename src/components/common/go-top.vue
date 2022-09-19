<template>
  <div v-show="isShowTop" class="gotop" @click.prevent="gotop">
      <i class="icon el-icon-top"></i>
  </div>
</template>
<script>
import '@/utils/scrollTop.js'
export default {
	name: 'go-top',
  data(){
    return {
      isShowTop:false
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
  },
  methods:{
    handleScroll(){
      if (window.scrollY > 600) {
        this.isShowTop = true
      } else {
        this.isShowTop = false
      }
    },
    gotop(){
      this.$scrollTop({
        scrollTop: 0,
        duration: 500,
      })
    }
  }
}
</script>

<style scoped>
.gotop {
	position: fixed;
	z-index: 999;
	right: 30px;
	bottom: 40px;
	border-radius: 50%;
  transition: 3s;
	background-color: lightgray;
}
.icon {
	font-size: 30px;
}
</style>