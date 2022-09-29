<template>
  <el-card :body-style="{ padding: 0 }">
    <v-stage
      :config="stageConfig"
      @mousedown="mousedownHandler"
      @mousemove="mousemoveHandler"
      @mouseup="mouseupHandler"
      @touchstart="mousedownHandler"
      @touchmove="mousemoveHandler"
      @touchend="mouseupHandler"
      ref="wrapper"
    >
      <v-layer>
        <v-line v-for="(line, index) in lines" :key="index" :config="line" />
      </v-layer>
    </v-stage>
  </el-card>
</template>

<script>
import { _getClientWidth } from "@/utils/getScreenHeight.js";
import { mapGetters, mapState } from "vuex";
export default {
  name: "app-stage",
  data() {
    let clientWidth = _getClientWidth() > 640 ? 700 : 300;
    return {
      // 画布配置
      stageConfig: {
        width: clientWidth,
        height: 400,
      },
      // 绘画状态
      painting: false,
      // stroke: "#df4b26",
      stage: null,
    };
  },
  computed: {
    ...mapState(["lines", "lineWidth", "lineColor"]),
    ...mapGetters(["isGameStarted", "isGameHolder"]),
  },

  mounted() {
    // 将画布宽度设置与容器同宽
    this.stageConfig.width = this.$refs.wrapper.$el.offsetWidth;
    this.stage =  this.$refs.wrapper.getNode();
  },

  methods: {
    // 鼠标按下
    mousedownHandler(e) {
      e.preventDefault && e.preventDefault();
      this.$emit("handleMessage", false);
      if (!this.isGameHolder || !this.isGameHolder) return;
      this.painting = true;
      let { x, y} = this.stage.getPointerPosition(); //
      // 创建一个新线条
      const width = Number(this.lineWidth);
      const newLine = {
        stroke: this.lineColor,
        strokeWidth: width,
        points: [x, y],
      };
      // 本地画线, 存到vuex中
      // console.log(newLine,'newLine');
      this.$store.commit("drawNewLine", newLine);
      // 请求服务器
      this.$store.dispatch("sendDrawNewLine", newLine);
    },

    // 鼠标拖动
    mousemoveHandler() {
      if (!this.painting) return;
      const lastLine = this.lines[this.lines.length - 1];
      let { x, y} = this.stage.getPointerPosition(); // 使用这个方法就不需要判断是不是移动端的
      lastLine.points = lastLine.points.concat([x, y]);
      this.$store.commit("updateNewLine", lastLine);
      // 请求服务器
      this.$store.dispatch("sendUpdateNewLine", lastLine);
    },

    // 鼠标释放
    mouseupHandler() {
      this.painting = false;
    },
  },
};
</script>
