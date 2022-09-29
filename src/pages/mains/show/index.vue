<template>
  <div>
   <div class="show-cantianer">
    <el-card>
      <div>
        <div class="theme-color" style="margin-left: 10%">这是个人展示区</div>
        <div style="text-align: center; padding: 4px">
          <span class="show-title">需要完成的東西，得一步不斷向前添加</span>
        </div>
      </div>
      <div class="flex">
        <el-button>
          <a
            href="http://xuewuboy.club:8000/onlinegame/"
            target="_blank"
            title="2048"
            >2048</a
          >
        </el-button>
        <el-button>
          <a
            href="http://xuewuboy.club:8000/luckdraw/"
            target="_blank"
            title="抽奖"
            >抽奖</a
          >
        </el-button>
        <el-button>
          <a
            href="http://xuewuboy.club:8000/towergame/"
            target="_blank"
            title="推塔高"
            >推塔高</a
          >
        </el-button>
      </div>
    </el-card>
   </div>
    <div class="container">
      <my-echarts />
    </div>
  </div>
</template>
<script>
import myEcharts from "@/components/my-echarts";
export default {
  name: "show",
  components: { myEcharts },
  data() {
    return {
      value1: "",
      formInline: "",
    };
  },
  created() {},

  methods: {},
};
</script>

<style scoped>
.show-cantianer {
  width: 90%;
  margin: 10px auto;
}
.show-title {
  background-color: #c4bdbd;
}
.container {
  height: 100vh;
}
</style>