<template>
  <div>
    <template v-if="articelList">
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        class="margin-bottom-10 border-radius-4"
        v-for="(item,index) in articelList"
        :key="index"
      >
        <el-card body-style="padding: '0px'" shadow="hover">
          <div style="minwidth: 200px">
            <h1 class="theme-color">{{ item.title }}</h1>
            <h5 class="ellipsis">
              {{ item.description }}
            </h5>
            <div class="bottom-style clearfix">
              <el-avatar
                size="small"
                :src="item.thumbnail ? item.thumbnail : '/image/xuewu.png'"
              ></el-avatar>
              <el-tag type="success">{{ item.tag }}</el-tag>
              <span class="time">{{
                new Date(item.time).toLocaleString()
              }}</span>
              <div class="read">
                阅读<span class="read-hits">{{ item.hits }}</span
                >次
              </div>
              <el-button
                type="text"
                class="button"
                @click="goDetails(item.id)"
                >{{ opration }}</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
    </template>

    <div class="empty-200 flex" v-else>
      <p>努力加载中.......</p>
    </div>
  </div>
</template>

<script>
import {
  queryApiList,
  queryApiArticleHits,
  GetArticleNextList,
} from "@/utils/queryApi";
export default {
  name: "my-card",
  data() {
    return {
      hover: "hover",
      opration: "看详情",
      articelList: [],
      isQueryOpen: true,
      id: 0,
      loading: true,
    };
  },
  mounted() {
    this.handleGetArticle();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleGetArticle() {
      queryApiList
        .call(this)
        .then((response) => {
          if (response.status == 200 && response.data.length) {
            this.visible = true;
            this.loading = false;
            this.articelList = response.data;
          } else {
            this.$message({
              showClose: true,
              content: "提交失败,请刷新页面并重新提交",
              type: "error",
              offset: 140,
            });
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    goDetails(id) {
      queryApiArticleHits.call(this, id).then(() => {
        this.$router
          .push({
            name: "detail",
            params: { id },
          })
          .catch((err) => {
            console.log(err.msg || "请求出错");
          });
      });
    },
    handleScroll() {
      const height =
        document.documentElement.offsetHeight -
        document.documentElement.clientHeight;
      let top = Math.floor(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      if (top > height - 300 && this.isQueryOpen) {
        this.isQueryOpen = false;
        GetArticleNextList.call(this, this.getLastId).then((response) => {
          if (response.status == 200 && response.data.length) {
            this.articelList = this.articelList.concat(response.data);
            if (response.data.length == 10) {
              //一次请求十条数据;
              this.isQueryOpen = true;
              window.removeEventListener("scroll", this.handleScroll);
            }
          }
        });
      }
    },
  },
  computed: {
    getLastId() {
      // 计算数据的最后id
      return this.articelList[this.articelList.length - 1]?.id;
    },
  },
};
</script>

<style scoped>
.time {
  font-size: 14px;
  color: #999;
}
h1,
h2 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
h5 {
  text-indent: 2em;
}
.bottom-style {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.ellipsis {
  -webkit-line-clamp: 3;
}
.image {
  width: 100%;
  display: block;
}
.read {
  flex: 1;
  text-align: center;
}
.read-hits {
  font-size: 14px;
  color: #409eff;
}
:deep(.el-tag--success) {
  line-height: inherit;
  height: inherit;
  padding: 4px;
}
:deep(.el-avatar) {
  width: 25px;
  height: 25px;
  line-height: 25px;
  margin-right: 10px;
}
.empty-200 {
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #fff;
  text-align: center;
}

@media screen and (max-width: 640px) {
  .read {
    font-size: 12px;
  }
}
</style>
