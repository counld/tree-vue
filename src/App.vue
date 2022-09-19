<template>
  <div id="app">
    <!-- 右侧操作 -->
    
     <router-view></router-view>
      <!-- 回到顶部 -->
      <go-top></go-top>
  </div>
</template>

<script>
import goTop from '@/components/common/go-top.vue';
export default {
  name: 'App',
  components: {
    goTop,
  },
  data() {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#2c3e50;
  background-image: url('../public/image/bg.gif');
  background-repeat: repeat;
  background-color: #0a0a0a 
}
</style>
