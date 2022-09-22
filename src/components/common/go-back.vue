<template>
	<div class="goback" @click="goback">
      <i class="el-icon-back"></i>
    </div>
</template>

<script>
export default {
	name: 'go-back',
	methods: {
    goback() {
      this.$router.go(-1);
    },
	}
}
</script>

<style scoped>
.goback {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  font-size: 24px;
  background-color: #d6e8ee;
}
.goback:hover {
  background-color: #b8deeb;
}
</style>