<template>
  <div class="moive_wrapper">
			<iframe v-if="iframeUrl" style="width: 100%; height: 100%" :src="iframeUrl" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
  </div>
</template>

<script>
export default {
  name: "movie",
	data() {
		return {
			iframeUrl: `//player.bilibili.com/player.html?aid=332144517&bvid=BV1KA411N7KQ&cid=312693663&page=1`,

		}
	}
};
</script>

<style scoped>
.moive_wrapper {
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
</style>