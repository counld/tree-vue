<template>
  <div class="container">
    <!-- 合同类型 -->
    <div class="echarts">
      <div v-if="pieData.length == 0">
        //没有值的时候显示
        <h4>合同地域分布</h4>
        <el-empty
          description="暂无数据"
          :image="require('../../assets/image/logo.webp')"
        ></el-empty>
      </div>
      <template v-else>
        <div class="pie" ref="pie" style="width: 100%; height: 350px"></div>
      </template>
    </div>
  </div>
</template>
<script>
import { addDay } from "@/utils/format.js";
export default {
  name: "my-echarts",
  data() {
    return {
      screenWidth: document.body.clientWidth, //屏幕可视区宽度
      screenHeight: document.body.clientHeight, //屏幕高度
      pieData: [], //饼图
      chartCopy: null,
      currentHours: [],
      yData: [120, 200, 150, 80, 70, 110, 130],
      isAgain: true,
    };
  },
  created() {
    this.getPie(); //地域饼状图

    //方法一：created()延迟加载getChart方法，先加载dom，否则会报错
    // setTimeout(() => {
    // }, 2000);
  },
  mounted() {
    //方法二：使用mounted()挂载
    this.inOrigin(); // 地域分布
    this.handClick(); //点击事件
    // 监听窗口变化
    let _this = this;
    window.addEventListener("resize", function () {
      _this.screenWidth = document.body.clientWidth;
      _this.screenHeight = document.body.clientHeight;
    });
  },
  unmounted() {
   
  },
  methods: {
    // 地域饼状图
    inOrigin() {
      this.chartCopy = this.chartCopy || this.$echarts.init(this.$refs.pie);
      // 地域分布---圆形饼状图
      let optionPie = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: this.pieData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.yData,
            type: "bar",
            name: "销量",
            // 高亮样式。
            emphasis: {
              itemStyle: {
                // 高亮时点的颜色。
                color: "blue",
              },
              label: {
                show: true,
                // 高亮时标签的文字。
                formatter: "This is a emphasis label.",
              },
            },
          },
        ],
      };
      //图标自适应
      this.chartCopy.setOption(optionPie);
    },
    // 接口--地域饼状图
    getPie() {
      // 获取之前7天
      for (let i = 0; i < 7; i++) {
        const year = addDay(i).getFullYear();
        let month = addDay(i).getMonth() + 1;
        const day = addDay(i).getDate();
        month = month > 10 ? month : "0" + month;
        const str = year + "年" + month + "月" + day + "日";
        this.pieData.push(str);
      }
    },
    handClick() {
      this.chartCopy.on("click", (params) => {
        // 控制台打印数据的名称
        if (!this.isAgain) return;
        this.gethours();
        this.inOrigin();
        console.log(params.name);
      });
    },
    gethours() {
      // 获取24小时
      for (let i = 0; i < 24; i++) {
        const str = i + ":00:00";
        this.currentHours.push(str);
      }
      this.pieData = this.currentHours;
      this.yData = new Array(24).fill(1).map((item) => {
        item = Math.ceil(Math.random() * item * 100) + 100;
        return item;
      });
      this.isAgain = false;
      console.log(this.pieData, "aiuewdbs", this.yData, "auiedsj ");
    },
    //图标自适应
    listener() {
      this.chartCopy.resize();
    },
  },
  watch: {
    // 窗口宽度改变
    screenWidth() {
      this.listener()
    },
    // 窗口高度改变
    screenHeight() {
      this.listener()
    },
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
}
</style>