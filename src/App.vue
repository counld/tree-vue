<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  component: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  color:#2c3e50;
  margin-top: 60px;
  background-image: url('../public/image/bg.gif');
  background-repeat: repeat;
  background-color: #0a0a0a 
}
</style>
