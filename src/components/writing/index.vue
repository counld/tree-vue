<template>
  <div class="wraper">
    <div class="select-list" v-once>
      <el-input
        class="select-title"
        placeholder="请辞一个标题"
        v-model="input"
        clearable
      />
      <my-select @change="handleChange" :options="optionList" ref="select" />
      <span class="margin-left-10" 
        >是否热门
        <el-switch
          v-model="isOpen"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </span>
    </div>
    <el-input
      class="margin-bottom-10"
      placeholder="请描述标题内容，获得更多的阅读"
      v-model="description"
      clearable
    >
    </el-input>
    <div v-if="tag === '猜谜语'" style="background: lightgrey;">
      <riddle 
      :input="input"
      :isOpen="isOpen"
      :tag="tag"
      :id="id"
      @removeTitle="removeTitle"
      :description="description"
      />
    </div>
    <template v-else>
      <my-editor @getEditor="handleSend" />
      <slot name="upload"></slot>
      <el-button class="fixed" type="success" @click="handleHtml">发表</el-button>
    </template>
  </div>
</template>
<script>
import { addArtice } from "@/utils/queryApi";
import { SELECTMAP } from "@/pages/contants";
import myEditor from "@/components/my-editor";
import riddle from "./components/riddle.vue";
import mySelect from "@/components/common/my-select.vue";
import { DEFDAULTOPTIONSLISTMAP } from "@/pages/contants";
export default {
  name: "writing",
  components: { myEditor, mySelect, riddle },
  props: ["imageUrl"],
  data() {
    return {
      optionList: DEFDAULTOPTIONSLISTMAP,
      isOpen: false,
      editor: null,
      tag: "",
      id: 0,
      value: "",
      input: "",
      description: "",
    };
  },
  mounted() {
    if(!this.$route.params.tag) return;
    this.tag = this.$route.params.tag;
    this.$refs.select.value = this.tag;
    // this.value = this.tag;
  },
  methods: {
    handleSend(editor) {
      this.editor = editor;
    },
    handleHtml() {
      const text = this.editor.getText();
      if (!text || !this.value) {
        this.$message({ message: "请输入你的内容", duration: 2000 });
        return;
      }
      if (this.tag === "猜谜语") {
        console.log(this.tag, "caimiyu");
      } else {
        this.handleaddData();
      }
    },
    handleChange(value) {
      this.tag = SELECTMAP[value];
      this.value = value;
      this.id = this.optionList.find((item) => item.value == value).id;
    },
    //子组件清空标题
    removeTitle(description,input) {
      this.description = description;
      this.input= input;
    },
    handleaddData() {
      const html = this.editor.getHtml();
      let article = {
        tag: this.tag,
        content: html,
        title: this.input,
        hot: this.isOpen ? 1 : 0,
        description: this.description ? this.description : null,
        thumbnail: this.imageUrl ? this.imageUrl : null,
        category: this.id,
        creatTime: new Date().toLocaleString(),
      };
      addArtice
        .call(this, article)
        .then((res) => {
          if (res.data?.insertId) {
            this.editor.clear();
            this.description = "";
            this.input = "";
            this.$refs.select.value = "";
            this.$emit("changeImageUrl", "");
            this.$message({
              showClose: true,
              message: "添加数据成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.message || "添加数据不成功",
            type: "error",
          });
        });
    },
  },
  handleRiddle() {},
  computed: {},
};
</script>

<style scoped>
.wraper {
  width: 60%;
  margin: 0 auto;
}
.el-button {
  position: fixed;
  bottom: 35px;
  right: 35px;
}
.select-list {
  display: flex;
  align-items: center;
  margin: 0 0 10px;
}
.select-title {
  flex: 1;
  margin-right: 10px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
:deep(.el-select) {
  flex-basis: 20%;
}
@media screen and (max-width: 845px) {
  .wraper {
    width: 100%;
  }
  .padding-10 {
    padding: 10px 20px;
  }
}

.text {
  font-size: 14px;
}
.margin-left-10 {
  margin-left: 10px;
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