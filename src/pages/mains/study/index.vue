<template>
  <div>
    <div class="study-cantainer">
    <h3 style="textalign: center; color: purple; padding: 0 0 5px">
      如果生命在来一次
    </h3>
    <div class="flex">
      <nav>
          <click-carousel />
          <el-divider content-position="left">手札描述</el-divider>
          <el-card class="box-card">
            <div v-for="item in articleList" :key="item.id" class="text item under-line">
              <h3 class="padding-5 alone-ellipsis">
                <a @click="addHits(item.id)">{{ item.title }}</a>
                <i class="el-reset">HOT</i>
              </h3>
              <p class="ellipsis description" :title="item.description" v-if="item.description">
                {{ item.description }}
              </p>
              <p v-else class="ellipsis description">没有人事先了解自己到底有多大的力量，直到他试过以后才知道。这启发了我， 培根在不经意间这样说过，阅读使人充实，会谈使人敏捷，写作使人精确...</p>
              <p class="flex align-center justify-content">
                <el-tag>{{item.tag}}</el-tag>
                <span>{{new Date(item.time).toLocaleString()}}</span>
              </p>
            </div>
          </el-card>
      </nav>
      <writing :imageUrl="imageUrl" @changeImageUrl="changeImageUrl">
        <template #upload>
        <myUpload @handleUpload="handleUpload" :imageUrl="imageUrl"/>
      </template>
      </writing>
    </div>
  </div>
  </div>
</template>
<script>
import { queryApiArticleHots, queryApiArticleHits } from "@/utils/queryApi";
import writing from "@/components/writing";
import clickCarousel from "@/components/common/click-carousel.vue";
import { DEFDAULTCARDLISTMAP } from '../../contants';
import myUpload from "@/components/my-upload";
export default {
  name: "study",
  components: { clickCarousel, writing, myUpload },
  data() {
    return {
      imageUrl:'',
      cardList: DEFDAULTCARDLISTMAP,
      articleList: [],
    };
  },
  mounted() {
    this.getHotsArticle(2) 
  },
  methods: {
    getHotsArticle() { 
      queryApiArticleHots
        .call(this)
        .then((res) => {
          this.articleList = res.data;
        }).catch((err) => {
          console.log(err.message || '请求出错')
        })
    },
    addHits(id) {
      //使用a 标签进行跳转，处出现刷新页面的情况;
      this.$router.push({
        name: 'detail',
        params: {
          id,
        }
      })
      queryApiArticleHits.call(this, id);
    },
    handleUpload(url,res) {
      if(res.errno === 0) {
        const { data } = res;
        this.imageUrl = data.url;
      }
    },
    changeImageUrl(url) {
      this.imageUrl = url;
    }
  },
  computed: {},
};
</script>

<style scoped>
.study-cantainer {
  padding: 10px 40px;
  min-height: 100vh;
}
nav {
  border-radius: 4px;
  padding: 0 8px;
  flex-basis: 350px;
  background-color: antiquewhite;
}
.padding-5 {
  width: 300px;
  position: relative;
  overflow: hidden;
}
.el-reset {
  color: #ec1b1b;
  position: absolute;
  right: 0;
  top: 10px;
  font-family: monospace;
  font-size: 14px;
}
.description {
  margin-bottom: 8px;
}
a {
  text-decoration-line: inherit;
}
a:hover {
  text-decoration: underline;
}
:deep(.el-tag) {
  height: inherit;
  line-height: inherit;
}
@media screen and (max-width: 845px) {
  nav {
    flex-basis: 275px;
  }
  nav {
    display: none;
  }
  .study-cantainer {
    padding: 10px 20px;
  }
}

.text {
  font-size: 14px;
}
.margin-left-10 {
  font-size: 14px;
  color: antiquewhite;
}

.item {
  padding: 12px 0;
}

.box-card {
  margin-top: 10px;
  border-radius: 4px;
}
.el-divider__text {
  background-color: antiquewhite;
}
</style>