<template>
  <div class="side-list alone-ellipsis">
    <!-- 玩家列表 -->
    <div class="panel-area">
      <ul class="participants w-e-scroll" v-if="!showJionButton && isGameStarted">
        <li v-for="item in nicknames" :key="item" class="alone-ellipsis">
          <span :title="item"
            >{{ item }}
            <span v-if="item === nickname" style="color: red">(我)</span></span
          >
          <el-tag v-if="item === holder" size="mini">主持</el-tag>
        </li>
      </ul>
    </div>

    <!-- 按钮工具栏 -->
    <div class="panel-area button-area">
      <el-button
        v-if="!showJionButton && !holder"
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="startGameHandler"
        >主持话题</el-button
      >
      <el-button
        v-if="showJionButton"
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="jionGameHandler"
        >加入话题</el-button
      >

      <el-button
        v-if="isGameStarted && nickname === holder"
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="resetGameHandler"
        >重置话题</el-button
      >
      <el-button
        v-if="isGameStarted && nickname === holder"
        type="success"
        size="small"
        icon="el-icon-refresh"
        @click="repaintGameHandler"
        >重新绘制</el-button
      >
      <el-button
        v-if="isGameStarted && nickname === holder"
        type="warning"
        size="small"
        icon="el-icon-delete"
        @click="stopGameHandler"
        >终止话题</el-button
      >

      <el-button
        v-if="!showJionButton && isGameStarted && nickname !== holder"
        type="success"
        size="small"
        :disabled="answerSuccess.type"
        icon="el-icon-magic-stick"
        @click="answerGameHandler"
        >猜答案</el-button
      >

      <el-button
        v-if="!showJionButton && isGameStarted && nickname !== holder"
        type="danger"
        size="small"
        icon="el-icon-switch-button"
        @click="exitHandler"
        >退出话题</el-button
      >
    </div>

    <!-- 弹出框：主持人设置答案 -->
    <el-dialog
      title="请设置答案"
      :visible.sync="resultDialogVisible"
      :modal="false"
      width="70%"
    >
      <el-input v-model="expectImageName" placeholder="请输入您的答案" />

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resultDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveDialogHandler"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 弹出框：答题人设置答案 -->
    <el-dialog
      title="请填写答案"
      :visible.sync="answerDialogVisible"
      :modal="false"
      width="70%"
    >
      <el-input v-model="inputImageName" placeholder="请输入您的答案" />

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="answerDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveAnswerDialogHandler"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "app-side-panel",
  data() {
    return {
      resultDialogVisible: false,
      expectImageName: "",
      answerDialogVisible: false,
      inputImageName: "",
      showJionButton: true, //没加入前展示
      resetAnswer: false, //期初
    };
  },

  mounted() {},
  computed: {
    ...mapState(["nickname", "nicknames", "holder", "answerSuccess",'topicInput']),
    ...mapGetters(["isGameStarted"]),
  },
  updated() {},

  methods: {
    startGameHandler() {
      // 开始游戏
      // 1. 显示弹框
      this.resultDialogVisible = true;
      // 2. 清空输入框内容
      // this.expectImageName = ''  //重置答案显示
    },
    jionGameHandler() {
      this.$store.dispatch("sendUserEnter"); //开始加入话题
      this.showJionButton = false; //加入关闭
    },
    resetGameHandler() {
      //主持重置答案
      // 开始游戏
      // 1. 显示弹框
      this.resultDialogVisible = true;
      this.resetAnswer = true;
      // 2. 清空输入框内容
      // this.expectImageName = '' // //重置答案显示
    },
    // 重新绘制话题
    repaintGameHandler() {
      this.$store.dispatch('resetGame');
    },
    
    stopGameHandler() {
      this.$confirm("确定要终止游戏吗?", "温馨提示")
        .then(() => {
          // 发送游戏终止申请
          this.$store.dispatch("sendStopGame");
          this.$emit('changeTopicdesc', '');
          // 2. 清空输入框内容
          this.expectImageName = ""; // //重置答案显示
        })
        .catch((e) => {
          console.log(e);
        });
    },

    answerGameHandler() {
      this.answerDialogVisible = true;
      this.inputImageName = "";
    },

    saveDialogHandler() {
      // 此处只做修改答案处理
      if (this.resetAnswer) {
        this.$store.dispatch("reset_answer",this.expectImageName);
        this.resetAnswer = false;
        // 2. 关闭弹框
        this.resultDialogVisible = false;
        return;
      }
      // 1. 校验答案是否为空
      if (!this.expectImageName) {
        this.$message.error("答案不能为空哦!");
        return;
      }
      // 2. 发送开始游戏的申请
      this.$store.dispatch("sendStartGame", this.expectImageName);

      // 3. 关闭弹框
      this.resultDialogVisible = false;
    },

    saveAnswerDialogHandler() {
      // 1. 检查答案是否为空
      if (!this.inputImageName) {
        this.$message.error("答案不能为空");
        return;
      }
      // 2. 将答案发送到服务器
      this.$store.dispatch("sendAnswerGame", this.inputImageName);
      // 3. 关闭弹出框
      this.answerDialogVisible = false;
    },

    exitHandler() {
      this.$confirm("是否退出游戏", "温馨提示")
        .then(() => {
          this.showJionButton = true; //开启加入;
          this.$store.dispatch("sendUserLeave");
          // 2. 清空输入框内容
          this.expectImageName = ""; // //重置答案显示
          // this.$router.replace('/login')
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.side-list {
  overflow: inherit;
  margin-right: 10px;
  background: #fff;
  border-radius: 4px;
}
.panel-area {
  width: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.participants {
  text-align: left;
  overflow: auto;
}
ul li {
  min-width: 90px;
  margin: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid gray;
}
.panel-area {
  margin: 10px 0;
  text-align: center;
}

:deep(.el-button--small) {
  padding: 9px;
  margin: 10px 0 0;
}

@media screen and (max-width: 980px) {
  .w-e-scroll{
      overflow:hidden;
  }
  .w-e-scroll:hover{
      overflow-x:scroll;
  }
  .w-e-scroll::-webkit-scrollbar {
    height: 2px;
  }
  .panel-area {
    width: 100px;
  }
  ul li {
    font-size: 12px;
  }
}
</style>
