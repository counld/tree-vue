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
        <template v-if="showLine">
          <v-line v-for="(line, index) in lines" :key="index" :config="line" />
        </template>
        <v-image v-else :config="{
            image: image
          }"/>
      </v-layer>
    </v-stage>
  </el-card>
</template>

<script>
// import { _getClientWidth } from "@/utils/getScreenHeight.js";
import { mapGetters, mapState } from "vuex";
export default {
  name: "app-stage",
  data() {
    // let clientWidth = _getClientWidth() > 640 ? 700 : 300;
    return {
      // 画布配置
      stageConfig: {
        width: 700,
        height: 400,
      },
      // 绘画状态
      painting: false,
      // stroke: "#df4b26",
      stage: null,
      showLine: true,
      image: null,
    };
  },
  created() {
    const image = new window.Image();
    image.src = "https://konvajs.org/assets/yoda.jpg";
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
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
    //一开始就把修改的imgae的src注册号
    this.$bus.$on('changeImageSee',this.changeImageSee);
  },
  beforeDestory() {
    this.$bus.$on('changeImageSee');
  },
  methods: {
    // 鼠标按下
    mousedownHandler(e) {
      e.preventDefault && e.preventDefault();
      this.$emit("handleMessage", false);
      if (!this.isGameStarted || !this.isGameHolder) return;
      this.painting = true;
      let { x, y} = this.stage.getPointerPosition(); //
      // 创建一个新线条
      const width = Number(this.lineWidth);//直接上数字
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
    // 改变image查看
    changeImageSee(saveImage) {
      console.log(saveImage,'改变image查看');
      this.image = saveImage;
    },
  },
};
</script>
