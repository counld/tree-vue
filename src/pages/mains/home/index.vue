<template>
  <div>
    <div class="home-top flex container">
      <aside-componet></aside-componet>
      <main>
        <div class="warp-carousel">
          <my-carousel :swiperList="swiperList" />
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
import { queryApiSwipper } from "@/utils/queryApi";
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
    };
  },
  created() {},
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
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.15);
}
.el-carousel {
  border-radius: 4px;
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
}
@media (min-width: 1024px) {
  .container {
    max-width: 60%;
  }
}
</style>