<template>
  <div id="app">
    <!-- 右侧操作 -->

    <router-view></router-view>
    <!-- 回到顶部 -->
    <go-top></go-top>
  </div>
</template>

<script>
import goTop from "@/components/common/go-top.vue";
import { playTopic } from "@/utils/voice";
import { isMobile } from "@/utils/judgmentTools";
export default {
  name: "App",
  components: {
    goTop,
  },
  data() {
    return {};
  },
  mounted() {
    function getSelectionField() {
      var selection = "";
      selection = getIeSelection();
      //从这里播放选中的文字语音
      if (!selection) return;
      window.speechSynthesis.cancel(); //取消上一次播放
      playTopic(selection);
    }
    function getIeSelection() {
      if (window.getSelection) {
        return window.getSelection().toString();
      } else if (document.getSelection) {
        return document.getSelection();
      } else if (document.selection) {
        return document.selection.createRange().text;
      }
    }
    if(isMobile()) {
      window.addEventListener('touchend',getSelectionField);
      return;
    }
    document.onmouseup = getSelectionField;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url("../public/image/bg.gif");
  background-repeat: repeat;
  background-color: #0a0a0a;
}
</style>
