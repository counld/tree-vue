<template>
  <div class="goback" @click="goback">
    <i class="el-icon-back"></i>
  </div>
</template>

<script>
export default {
  name: "go-back",
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.goback {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  left: 50px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  font-size: 27px;
  background-color: #d6e8ee;
}
.goback:hover {
  background-color: #b8deeb;
}
@media screen and (max-width: 640px) {
  .goback {
    width: 30px;
    height: 30px;
    left: 8px;
  }
}
</style>