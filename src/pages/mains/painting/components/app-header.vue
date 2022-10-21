<template>
  <div>
    <div class="app-header flex">
      <el-tag v-if="connected" type="success">服务已连接</el-tag>
      <el-tag v-else type="danger">服务未连接</el-tag>

      <el-tag v-if="isGameStarted" type="success">话题进行中</el-tag>
      <el-tag v-else type="info">话题未开始</el-tag>
      <div class="input-wraper" v-if="holder && holder == nickname">
        <el-input
          prefix-icon="el-icon-edit"
          min="1"
          max="20"
          type="number"
          required
          v-model="input"
        ></el-input>
      </div>
      <div class="input-wraper" v-if="holder && holder == nickname">
        <el-color-picker v-model="color"></el-color-picker>
      </div>
      <div class="input-wraper" v-if="lines.length && holder == nickname">
        <!-- 存储的确认提示 -->
        <el-popover
          popper-class="popper_present_width"
          placement="bottom"
          v-model="SaveVisible">
          <p style="margin-bottom: 10px">你确定画完了,要保存这张话题吗?</p>
          <el-input v-model="expectSaveName" size="mini" placeholder="输入你画图存储的名称" ></el-input>
          <div style="text-align: right; margin-top: 10px">
            <el-button size="mini" type="text" @click="SaveVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="handelSaveList">确定</el-button>
          </div>
          <el-button slot="reference">储存</el-button>
        </el-popover>
        <el-popover
          popper-class="popper_present_width"
          placement="bottom"
          v-model="lineVisible">
          <p style="margin-bottom: 10px; text-align: center;" class="show_line" v-if="saveLine.length" @click="showLine">显示已保存话题图</p>
          <p style="margin-bottom: 10px" v-else>一张话题图都没得显示过</p>
          <div style="text-align: right; margin-top: 10px">
            <el-button size="mini" type="text" @click="lineVisible = false">取消</el-button>
          </div>
          <el-button @click="handleRecord" slot="reference" class="margin-left-10">画图记录</el-button>
        </el-popover>
      </div>
    </div>
    <div>
      <!-- 弹出框：图片查看地址 -->
    <el-dialog
      title="请输入你要查看图片的地址"
      :visible.sync="resultImageVisible"
      :modal="false"
      width="70%"
    >
      <el-input v-model="expectImageName" placeholder="请输入您的图片地址" >
        <template slot="prepend">Https://</template></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resultImageVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveImageHandler"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "app-header",
  data() {
    return {
      input: 5,
      color: "#409EFF",
      resultImageVisible: false,
      expectImageName: '',
      expectSaveName: '',
      SaveVisible: false,
      lineVisible: false,
      saveLine: [],
    };
  },
  methods: {
    saveImageHandler() {
      if(!this.expectImageName) return;
      const image = new window.Image();
      image.src = this.expectImageName;
      image.onload = () => {
        // set image only when it is loaded
        this.resultImageVisible = false;
        this.$bus.$emit('changeImageSee',image)
      };
    },
    // 记录画图列表
    handleRecord() {
      const lineList = localStorage.getItem('saveLines');
      const line = JSON.parse(lineList);
      this.saveLine = line;
      this.lineVisible = false;
    },
    handelSaveList() {
      if(!this.expectSaveName && !this.lines.length) return;
      const result = JSON.stringify(this.lines);
      localStorage.setItem('saveLines',result);
      this.SaveVisible = false;
    },
    showLine() {
      //展示之前的画板
      this.lineVisible = false;
      // this.$store.commit("updateNewLine", this.saveLine);
      // 请求服务器展示存储的线
      this.$store.dispatch("sendSaveLine", this.saveLine);
    }
  },
  computed: {
    ...mapState(["connected", "holder", "nickname","lines"]),
    ...mapGetters(["isGameStarted"]),
  },
  watch: {
    input() {
      if(this.input > 20) {
        this.input = 20;
      }
      this.$store.commit("changeLineWidth", this.input);
    },
    color() {
      this.$store.commit("changeLineColor", this.color);
    },
  },
};
</script>

<style scoped>
.app-header {
  margin: 10px 0;
  flex-wrap: wrap;
  align-items: center;
}
.el-tag {
  margin: 10px 0 0 10px;
}
.input-wraper {
  margin: 10px 0 0 10px;
}
.popper_present_width {
  width: 80%;

}

.show_line {
  padding: 4px;
  color: rebeccapurple;
}
.show_line:hover {
  cursor: pointer;
  color: rgb(42, 130, 217);
  border-bottom: 1px solid rgb(75, 110, 143);
}
:deep(.el-input--prefix .el-input__inner) {
  width: 80px;
  height: 30px;
  padding-right: 0;
  line-height: inherit;
}
:deep(.el-input__prefix) {
  top: -3px;
}
:deep(.el-color-picker__trigger) {
  width: 30px;
  height: 30px;
}
:deep(.el-color-picker) {
  height: inherit;
}
</style>
