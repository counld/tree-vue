<template>
  <div>
    <div class="theme-color" style="margin-left: 10%">
      这是个人展示区
    </div>
    <div style="text-align: center; padding: 4px;">
      <span class="show-title">需要完成的東西，得一步不斷向前添加</span>
    </div>
    <my-echarts />
  </div>
</template>
<script>
  import myEcharts from "@/components/my-echarts";
export default {
  name: "show",
  components: {myEcharts,},
  data() {
    return {
      value1: '',
      formInline: '',
    };
  },

};
</script>

<style scoped>
  .show-title {
    background-color: #c4bdbd;
  }
</style>