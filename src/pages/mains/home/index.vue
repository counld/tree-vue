<template>
  <div>
    <div class="home-top flex container">
      <aside-componet></aside-componet>
      <main>
        <div class="warp-carousel">
          <my-carousel :swiperList="swiperList" v-if="isOpenCarousel"/>
          <div class="videoWrapper">
            <div  v-for="(item, index) in videoUrlList" :key="index" class="videoList">
              <div class="video-title">{{item.title}}</div>
              <div class="video-description ellipsis">{{item.description}} </div>
              <video class="videoContronls" autoplay controls :src="API_URL + item.videoUrl"></video>
            </div>
          </div>
        </div>
        <!--I'm a comment.-->
        <article class="flex-wrap">
          <myCard />
        </article>
      </main>
    </div>
    <my-footer />
  </div>
</template>

<script>
import { queryApiSwipper } from "@/api/queryApi";
import { queryAdminsHotsVideoList } from "@/api/admins";
import { API_URL } from "@/config/env.js";
import asideComponet from "@/components/aside/aside.vue";
import myCard from "@/components/my-card";
import myCarousel from "@/components/my-carousel";
import myFooter from "@/components/common/my-footer.vue";
export default {
  components: { asideComponet, myCard, myFooter, myCarousel },
  name: "home",
  comments: true,
  data() {
    return {
      visible: false,
      message: "这是mysql连接的数据",
      tab: "",
      swiperList: [],
      username: localStorage.getItem("username") || "",
      isOpenCarousel: true,
      videoUrlList: [],
      API_URL: API_URL
    };
  },
  async created() {
   const { data } = await queryAdminsHotsVideoList.call(this, 1);
   if(data.length) {
    this.isOpenCarousel = false;
    this.videoUrlList = data;
   }
  },
  mounted() {
    this.getSwipper();
  },
  methods: {
    getSwipper() {
      queryApiSwipper
        .call(this)
        .then((res) => {
          this.swiperList = res.data;
        })
        .catch((err) => {
          console.log(err.message || "请求出错 ");
        });
    },
    showComponent() {
      this.tab = "tab2";
    },
    showComponent1() {
      this.tab = "tab1";
    },
  },

  computed: {
  },
};
</script>

<style scoped>
.home-top {
  margin: 10px 90px;
}

main {
  width: 100%;
}
.warp-carousel {
  position: relative;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.15);
}
.el-carousel {
  border-radius: 4px;
}
.videoWrapper {
  bottom: 0;
  min-width: 300px;
  overflow: hidden;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
}
.videoList {
 position: relative;
 width: 100%;
 height: 100%;
}
.videoContronls {
  height: 300px;
  width: 100%;
}
.video-title {
  position: absolute;
  top: 10px;
  left: 16px;
  background: rgba(255, 255, 255, 0.15);
}
.video-description {
  position: absolute;
  width: 90%;
  left: 10px;
  bottom: 10px;
  opacity: .8;
  font-size: 14px;
  color:  #ffe601;
}
.list-title {
  color: #232333;
  font-size: 18px;
}
.list-title :deep(.markdown-toc-list) {
  display: flex;
  justify-content: space-evenly;
}
.list-title :deep(.markdown-toc-list li) {
  padding: 4px;
}
.list-title div {
  text-align: left;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

:deep(.el-tag) {
  margin: none;
}
@media screen and (max-width: 640px) {
  .home-top {
    padding: 10px 20px;
    display: block;
    margin: 10px auto;
  }
  .container {
    max-width: 100%;
  }
  .warp-carousel {
    margin-right: 0;
  }
  .video-description {
    opacity: 0.5;
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 60%;
  }
}
</style>