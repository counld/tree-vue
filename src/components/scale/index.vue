<template>
  <div
    :class="isShow ? '' : 'ScaleBox'"
    ref="ScaleBox"
    :style="{
      width: isShow ? '' : width + 'px',
      height: isShow ? '' : height + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>
 
<script>

import { isMobile } from "@/utils/judgmentTools.js";
export default {
  name: "ScaleBox",
  props: {},
  data() {
    const isShow = isMobile();
    return {
      scale: 0,
      width: 1280,
      height: 649,
      isShow: isShow,
    };
  },
  mounted() {
    this.setScale();
    window.addEventListener("resize", this.debounce(this.setScale));
  },
  methods: {
    getScale() {
      // 固定好16：9的宽高比，计算出最合适的缩放比
      const { width, height } = this;
      const wh = window.innerHeight / height;
      const ww = window.innerWidth / width;
      // console.log(ww < wh ? ww : wh);
      return ww < wh ? ww : wh;
    },
    setScale() {
      // 获取到缩放比例，设置它
      this.scale = this.getScale();
      if (this.$refs.ScaleBox && !this.isShow) {
        this.$refs.ScaleBox.style.setProperty("--scale", this.scale);
      }
    },
    debounce(fn, delay) {
      const delays = delay || 500;
      let timer;
      return function () {
        const th = this;
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
        }, delays);
      };
    },
  },
};
</script>
 
<style scoped>
#ScaleBox {
  --scale: 1;
}
.ScaleBox {
  position: absolute;
  transform: scale(var(--scale)) translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  z-index: 999;
  /* background: rgba(255, 0, 0, 0.3); */
}
</style>
 