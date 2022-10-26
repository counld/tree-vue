<template>
  <el-row :gutter="20">
    <el-card class="box-card">
      <video controls :src="src" autoplay style="width: 400px">
      </video>
    </el-card>
  </el-row>
</template>
<script>
export default {
  name: "UserManagement",
  data() {
    return {
      info: {},
      input: "",
      src: '',
      select: "",
      music: false,
      seen: false,
      iseen: false,
      loading: false,
      avatar: "https://img2.baidu.com/it/u=1644941556,604602934&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1666717200&t=4b7f997da2e423736aa6f6ee06e17776",
      images_url: {},
      copyVideoUrl: '',
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      const url = /http[s]?:\/\/[\w.]+[\w/]*[\w.]*\??[\w=&:\-+%]*[/]*/.exec(
        this.input
      );
      if (this.select == "1" || this.select == "") {
        this.axios.get("https://tenapi.cn/video/?url=" + url).then((res) => {
          console.log(res, 'res-----')
          if (res.data.url != null) {
            if (res.data.music != null) {
              this.music = true;
            }
            this.copyVideoUrl = res.url;
            this.seen = true;
            this.info = res.data;
            this.loading = false;
            this.$message.success({
              title: "解析成功",
              message: "请及时下载音视频",
            });
          } else {
            this.seen = false;
            this.loading = false;
            this.$message.error({
              title: "解析失败",
              message: "视频不存在或接口失效",
            });
          }
        });
      } else {
        this.seen = false;
        this.axios.get("https://tenapi.cn/images/?url=" + url).then((res) => {
          if (res.data.code == 200) {
            this.iseen = true;
            this.loading = false;
            this.images_url = res.data.images;
            this.$message.success({
              title: "解析成功",
              message: "图集暂不支持批量下载，请长按下载或右键另存为",
            });
          } else {
            this.iseen = false;
            this.loading = false;
            this.$message.error({
              title: "解析失败",
              message: "图集不存在或接口失效",
            });
          }
          console.log(this.images_url,'res',res);
        });
      }
    },
  },
};
</script>

<style>
::selection {
  background: rgba(0, 149, 255, 0.1);
}

body:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  z-index: -1;
  content: "";
  position: fixed;
  background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
}

.grid-content {
  margin-top: 1em;
  border-radius: 4px;
  min-height: 50px;
}

.el-select .el-input {
  width: 80px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.box-card {
  margin-top: 4em !important;
  margin-bottom: 4em !important;
  opacity: 0.8;
}

@media screen and (max-width: 700px) {
  .box-card {
    margin-top: 1em !important;
    margin-bottom: 1em !important;
  }
}
.download h3 {
  margin-top: 2em;
}

.download button {
  margin-right: 0.5em;
  margin-left: 0.5em;
}

.waterfall {
  -moz-column-count: 3;
  -webkit-column-count: 3;
  column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-gap: 1em;
  column-gap: 1em;
}

.item {
  padding: 5px;
  break-inside: avoid;
}

.item img {
  width: 100%;
  margin-bottom: 10px;
}
.typo {
  text-align: left;
}
.typo a {
  color: #2c3e50;
  text-decoration: none;
}

hr {
  height: 10px;
  margin-bottom: 0.8em;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
