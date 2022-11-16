<template>
 <!-- <scale-box> -->
  <div class="flex" ref="container">
    <!-- 头部信息 -->
    <headers />
    <header-right />
    <!-- 点击蒙层是否允许关闭 -->
    <div class="mask-absolute"></div>
    <!-- 主体内容 -->
    <div class="margin-top-70 clearfix">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
 <!-- </scale-box> -->
</template>

<script>
// import ScaleBox from "@/components/scale/index.vue";
import headerRight from "@/components/common/header-right.vue";
import headers from "@/components/common/header.vue";
export default {
  components: { headerRight, headers },
  name: "mains",
  data() {
    return {
      flex: false,
    };
  },
  methods: {
    touchMOve(event) {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    },
  },
  mounted() {
    // 禁止ios页面缩放
    document.addEventListener("touchmove", this.touchMOve, false);
  },
  destroy() {
    document.removeEventListener("touchmove", this.touchMOve);
  },
};
</script>

<style scoped>
.margin-top-70 {
  margin-top: 70px;
  overflow: hidden;
  width: 100%;
}
.mask-absolute {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: whitesmoke;
  opacity: 0;
  z-index: -1;
}
</style>