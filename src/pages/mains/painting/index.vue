<template>
  <div class="relative">
    <div class="ling-games">
      <el-card>
        <div class="flex align-center">
          <el-button @click="handleShow"> 去聊天 </el-button>
          <el-tag type="info" class="topicTag"
            >@话题:
            <span class="topic_color" v-if="topicInput">{{topicInput}}</span>
            <el-tooltip v-else :disabled="isGameStarted || !holder === nickname" content="开始加入话题, 才有机会开启大头贴, 例如: 答案是一个苹果吗?" effect="light" placement="bottom">
              <el-input
              :disabled="!isGameStarted || holder !== nickname"
              v-model="topicdesc"
              @change="changeTopic"
              placeholder="根据主持人所画的图形,描述他的最终形态"
            ></el-input>
            </el-tooltip>
          </el-tag>
        </div>
        <div v-if="answerSuccess.type" style="text-align: center; padding: 6px; color: red">
          <p class="flex align-center font_size_12">
              <span class="alone-ellipsis messageInfo">{{ answerSuccess.message
            }}</span>
            <el-button v-if="holder === nickname" @click="handleReset">重新来过</el-button>
          </p>
        </div>
      </el-card>
      <div class="painting-panel">
        <!-- 布局：头部 -->
        <app-header />
        <!-- 布局：主体 -->
        <el-container>
          <!-- 左边 -->
          <app-side-panel @changeTopicdesc="changeTopicdesc"/>
          <!-- 右边 -->
          <app-stage @handleMessage="handleShow" />
        </el-container>
      </div>
    </div>
    <!-- 添加聊天框 -->
    <div
      v-if="!isShow"
      :class="['fixed', 'flex', 'hide', message ? 'message' : '']"
    >
      <div class="padding-auto" id="scroll">
        <div class="wh">
          <ul>
            <div v-for="(item, index) in MessageInfoList" :key="index">
              <li
                v-if="item.message"
                :class="[
                  item.username === identitySelf ? 'text-right' : 'text-left',
                ]"
              >
                <el-avatar :src="item.avatar" shape="square"></el-avatar>
                <p
                  :class="[ 'text-topic',
                    item.username === identitySelf
                      ? 'margin-right-10'
                      : 'margin-left-10',
                    item.username === identitySelf
                      ? 'text-color'
                      : 'text-white',
                  ]"
                >
                  <span>{{ item.message }}</span>
                </p>
              </li>
              <div v-else class="font-size-14 text-center">
                <span>{{ item.sysInfo }}</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex absolute-bottom">
        <el-input
          type="textarea"
          :rows="2"
          id="session"
          placeholder="请输入聊天内容"
          v-model="input"
        >
        </el-input>
        <el-button type="success" @click="handSend">发送</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import appHeader from "./components/app-header";
import appStage from "./components/app-stage";
import appSidePanel from "./components/app-side-panel";
import { mapState, mapGetters } from "vuex";
export default {
  name: "painting",
  components: {
    appHeader,
    appStage,
    appSidePanel,
  },
  data() {
    return {
      input: "",
      message: false,
      identitySelf: localStorage.getItem("username") || "guest",
      avatar: localStorage.getItem("avatar"),
      beforeTime: true,
      isShow: false,
      topicdesc: this.topicInput || '',
    };
  },
  crated() {
    // console.log(this.topicInput,'wedcjk ewiodnkciewnvd我我爹为女的')
  },
  //updated生命周期钩子函数可以让弹窗在刚打开时，滚动条就在绑定id的盒子的最底部
  methods: {
    handSend() {
      const messageInfo = {
        username: this.identitySelf,
        // 这里的头像要连表查询出来，不能这里给
        avatar: this.avatar,
        message: this.input,
      };
      if (this.input == "") return;
      this.$store.dispatch("userDiscussInfo", messageInfo);
      this.input = "";
      this.scrollToBottom();
    },
    scrollToBottom() {
      setTimeout(() => {
        const div = document.getElementById("scroll");
        div && (div.scrollTop = div.scrollHeight);
      }, 10);
    },

    handleShow(message) {
      if (!message) {
        this.message = message;
      } else {
        this.message = !this.message;
      }
    },
    handleReset() {
      this.$store.dispatch('resetGame');
    },
    //失去焦点发送
    changeTopic() {
      this.$store.dispatch('topicdesc_message',this.topicdesc);
    },
    // 修改话题文案
    changeTopicdesc(value) {
      this.topicdesc = value;
    }
  },
  computed: {
    ...mapState(["MessageInfoList", "answerSuccess", "holder", "nickname",'topicInput']),
    ...mapGetters(["isGameStarted"]),
  },
  watch: {
  }
};
</script>

<style scoped>
.ling-games {
  min-height: calc(100vh - 70px);
  min-width: 375px;
  padding: 10px;
}
.painting-panel {
  position: relative;
  z-index: 9;
}
:deep(.el-card__body) {
  padding: 4px;
}
:deep(.el-input__inner) {
  height: 30px;
  padding-right: 0;
  line-height: inherit;
}
.topicTag {
  width: 100%;
  padding: 0;
  margin-left: 10px;
}
:deep(.el-button--default) {
  padding: 8px 8px;
}
.app-header {
  display: flex;
}
.fixed {
  position: fixed;
  right: 0;
  bottom: 30px;
  width: 400px;
  height: 450px;
  padding-top: 8px;
  flex-direction: column;
  background: #999;
}
.padding-auto {
  padding: 4px;
  overflow: hidden;
  overflow-y: auto;
  flex: 1;
}
.text-left {
  color: #333;
  display: flex;
  align-items: center;
  margin-left: 1rem;
}
.messageInfo {
  display: inline-block;
  width: 70%;
}
.text-right {
  color: #333;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin-right: 1rem;
}
ul {
  /* min-height: 100vh; */
  margin-bottom: 6px;
}
li {
  margin: 8px 0;
}
/*  滚动条 */
.padding-auto::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
}
.padding-auto::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e5e5e5;
}
.padding-auto::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: #ffffff;
}

.el-avatar {
  align-self: flex-start;
}
.text-topic {
  max-width: 70%;
  font-family: "宋体";
  font-weight: 700;
  border-radius: 4px;
}
p:hover {
  opacity: 0.8;
}
.text-white {
  background-color: #fff;
  padding: 0.5em;
  position: relative;
}
.text-white::before {
  position: absolute;
  content: "";
  left: -20px;
  top: 8px;
  border: 10px solid;
  border-color: transparent;
  border-right-color: #fff;
}
.text-color {
  position: relative;
  padding: 0.5em;
  background-color: greenyellow;
}
.text-color::after {
  position: absolute;
  content: "";
  right: -20px;
  top: 8px;
  border: 10px solid;
  border-color: transparent;
  border-left-color: greenyellow;
}
.absolute-bottom {
  width: 100%;
  background-color: #888;
  padding: 0 10px;
}
.absolute-bottom span {
  padding: 2px;
  background-color: #888;
  color: rgb(225, 213, 213);
}
:deep(.el-textarea) {
  margin-right: 10px;
}
.message {
  z-index: 99;
}
.topic_color {
  font-size: 14px;
  color: #1677ff;
}
@media screen and (max-width: 1200px) {
  .hide {
    visibility: hidden;
  }
  .message {
    position: fixed;
    z-index: 99;
    bottom: 2px;
    visibility: visible;
  }
}
@media screen and (max-width: 640px) {
  .ling-games {
    padding: 4px;
  }
  .fixed {
    position: absolute;
    margin-top: 2rem;
    width: 100%;
    height: 280px;
    bottom: auto;
  }
  .margin-top-70 {
    overflow: hidden;
  }
  :deep(.el-card__body) {
    padding: 4px;
  }
  .text-topic {
    max-width: 60%;
  }
  .message {
    position: fixed;
    z-index: 99;
    bottom: 2px;
    visibility: visible;
  }
  :deep(.el-textarea__inner) {
    padding: 0;
  }
  .font_size_12 {
    font-size: 12px;
  }
  :deep(.el-button--default) {
    font-size: 12px;
  }
}
</style>
