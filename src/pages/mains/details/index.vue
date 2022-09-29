<template>
  <article class="detail-page">
    <div class="detail-head">
      <div class="detail-content">
        <el-card
          body-style="padding: '0px'"
          v-for="(item, index) in detailItem"
          :key="index"
          shadow="hover"
        >
          <h1 class="theme-color">{{ getArticle(item.title) }}</h1>
          <details open class="detail-title margin-bottom-10">
            <summary class="theme-color">情感 专栏</summary>
            {{ item.description }}
          </details>
          <div class="reset-style" v-html="item.content"></div>
          <div class="flex justify-content align-center">
            <span>标签: <el-tag>{{item.tag.trim()}}</el-tag></span>
            <div class="read">浏览<span class="read-hits">{{ item.hits }}</span>次</div>
            <span class="time">创作时间: {{ item.creatTime}}</span>
          </div>
        </el-card>
      </div>
    </div>
    <go-edit edit="写话题" @goTopic="goTopic" />
    <go-back />
  </article>
</template>

<script>
import { queryApiDetail } from "@/utils/queryApi";
import goBack from "@/components/common/go-back.vue";
import GoEdit from "@/components/common/go-edit.vue";
export default {
  components: { goBack, GoEdit },
  name: "detail",
  data() {
    return {
      detailItem: [],
      id: "",
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.id = this.$route.params.id;
      queryApiDetail
        .call(this, this.id)
        .then((res) => {
          this.detailItem = res.data;
        })
        .catch((err) => {
          console.log(err.message || "请求出错了");
        });
    },

    getArticle(title) {
      return title.lenght < 3 ? "" : title;
    },

    goTopic() {
      this.$router.push({
        name: "study",
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 14px 0;
  font-size: 18px;
  font-family: "微软雅黑", "黑体";
  font-weight: 300;
}
.detail-page {
  display: flex;
  position: relative;
  justify-content: center;
  width: 80%;
  margin: 10px auto 0;
  background-color: antiquewhite;
}
.detail-head {
  width: 100%;
  margin-top: -80px;
}
.detail-content {
  padding: 115px 40px 25px;
  min-height: 100vh;
}
.reset-style {
  font-family: 宋体;
  font-size: 10.5pt;
  line-height: 150%;
  word-wrap: normal;
  word-break: normal;
}
:deep(.el-tag) {
  height: inherit;
  line-height: inherit;
  font-weight: 600;
  margin: 0;
  padding: 0 6px;
}
.detail-title {
  font-size: 14px;
  color: #e15959;
}
summary {
  text-align: center;
  font-size: 18px;
  outline: none;
}
.time {
  font-size: 14px;
  color: #999;
}
details,
summary::-webkit-details-marker {
  display: none;
}

.read {
  flex: 1;
  text-align: center;
}
.read-hits {
  font-size: 14px;
  color: #3e73a0;
}

@media screen and (max-width: 640px) {
  .detail-page {
    width: 96%;
  }
  .detail-content {
    padding-right: 0;
    padding-left: 0;
  }
  .el-card {
    padding: 15px 0;
  }
  :deep(.el-card__body) {
    padding: 10px;
  }
}
</style>