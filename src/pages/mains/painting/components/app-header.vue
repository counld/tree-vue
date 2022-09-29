<template>
  <div>
    <div class="app-header flex">
      <el-tag v-if="connected" type="success">服务已连接</el-tag>
      <el-tag v-else type="danger">服务未连接</el-tag>

      <el-tag v-if="isGameStarted" type="success">话题进行中</el-tag>
      <el-tag v-else type="info">话题未开始</el-tag>
      <div class="input-wraper" v-if="holder && holder == nickname">
        <el-input
          prefix-icon="el-icon-edit"
          min="1"
          max="20"
          type="number"
          v-model="input"
        ></el-input>
      </div>
      <div class="input-wraper" v-if="holder && holder == nickname">
        <el-color-picker v-model="color"></el-color-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "app-header",
  data() {
    return {
      input: 5,
      color: "#409EFF",
    };
  },
  computed: {
    ...mapState(["connected", "holder", "nickname"]),
    ...mapGetters(["isGameStarted"]),
  },
  watch: {
    input() {
      this.$store.commit("changeLineWidth", this.input);
    },
    color() {
      this.$store.commit("changeLineColor", this.color);
    },
  },
};
</script>

<style scoped>
.app-header {
  margin: 10px 0;
  flex-wrap: wrap;
  align-items: center;
}
.el-tag {
  margin: 10px 0 0 10px;
}
.input-wraper {
  margin: 10px 0 0 10px;
}
:deep(.el-input__inner) {
  width: 80px;
  height: 30px;
  padding-right: 0;
  line-height: inherit;
}
:deep(.el-input__prefix) {
  top: -3px;
}
:deep(.el-color-picker__trigger) {
  width: 30px;
  height: 30px;
}
:deep(.el-color-picker) {
  height: inherit;
}
</style>
