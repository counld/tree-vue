<template>
  <div :class="['relative', riddleHead]">
    <div v-for="(item, index) in raddleList" :key="index" :class="['white',riddleBody]">
      <div class="raddle-title">
        <span class="deep-theme">标题: </span>{{ item.title }}
      </div>
      <p class="raddle-temp">
        <span class="deep-theme">谜题: </span>{{ item.puzzle }}
      </p>
      <el-form ref="form" :model="form" size="mini">
        <el-form-item
          :label="'选项' + (index + 1) + ':'"
          v-for="(item, index) in refreshlist"
          :key="index"
        >
          <el-checkbox-group v-model="form.type">
            <el-checkbox :label="item" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <span class="margin-left-10 hover-red" v-if="isRiddleTopic" @click="goTipic">去出题</span>
        </el-form-item>
      </el-form>
      <el-dialog
        title="公布"
        :visible.sync="centerDialogVisible"
        :center="true"
        :modal="false"
        :before-close="handleNext"
        :close-on-click-modal="false"
      >
        <div style="text-align: center">
          <p class="text-indent">
            {{title}}
          </p>
          <div class="correct">
            {{correctObj.title}} <span class="answer">{{ correctObj.answer }}</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="nextRaddle"
            >下一题</el-button
          >
        </span>
      </el-dialog>
      <details class="margin-bottom-10">
        <summary class="theme-color">有趣的想法</summary>
        {{ item.description }}
      </details>
    </div>
  </div>
</template>
<script>
import { queryApiRiddleList, queryApiNextRiddle,queryApiriddleIdData } from "@/utils/queryApi";
import { shuffle } from "@/utils/format.js";
export default {
  name: "riddle-card",
  props: ['id','riddleHead','asideCard','riddleBody'],
  data() {
    return {
      raddleList: [], //初始数据
      // correctOption: false, // 正确答案
      answer: "",
      description: '',
      centerDialogVisible: false, //弹框显示
      refreshlist: [], //打乱的答案
      form: {
        type: [],
      },
      selfId: 0,
      title: '',//正确title
      correctObj: {
        title: '正确的答案',
        answer: this.answer,
      }, //正确的答案
      isRiddleTopic: false,
    };
  },
  mounted() {
    if(this.asideCard && this.id == 1) {
      this.checkFunction(queryApiRiddleList)
    }else {
      this.checkFunction(queryApiriddleIdData)
    }
  },
  methods: {
    onSubmit() {
      const length = this.form.type.length;
      if(!length) {
        this.$message({
          message: '警告哦, 请选择一个你认为话题',
          type: 'warning',
          offset: 300,
          duration: 2000,
        });
        return;
      }
      this.centerDialogVisible = true;
      const puzzle = this.form.type.every(item => item && this.answer == item);
      if(puzzle) {
        this.title = '恭喜您！你知识的正确, 有一般的水平, 可以继续玩耍啦!';
        this.correctObj = {
          title: '答案:',
          answer: this.answer,
        } 
        this.$refs.form[0].resetFields();
      }else {
        this.title = '你这不太给力,这一场只能强制下一个谜';
        this.correctObj = {
          title: '建议:',
          answer: this.description,
        }
      }
    },

    getAsncData(res) {
      this.raddleList = res.data;
      this.answer = res.data[0].answer;
       this.selfId = res.data[0].id;
      this.$emit('changeId',this.selfId);
      this.description = res.data[0].description;
      const errorlist = res.data[0].errorlist.split(",").concat(this.answer);
      this.refreshlist = shuffle(errorlist); //打乱函数
    },

    nextRaddle() {
      queryApiNextRiddle
      .call(this, this.selfId)
      .then((res) => {
        this.form.type = []; // 置空,不然下一题还是上一个答案;
        if(!res.data.length) {
          this.title = '题库已经答题完了,你可以自己去《手札区》创作谜底疑问去啦!----选择选谜语';
          this.correctObj = {
            title: '话题不会丢失:等会去出题吗？',
            answer: `我不能让这话题从我这断联的---5s关闭`,
          } 
          this.isRiddleTopic = true;
          setTimeout(() => {
            this.centerDialogVisible=false;
          },5000)
          return;
        } 
        this.centerDialogVisible=false;
        this.getAsncData(res);
      })
      .catch((err) => {
        this.centerDialogVisible=false;
        console.log(err.msg || "请求出错了");
      });
    },

    checkFunction(func) {
      func
        .call(this, this.id)
        .then((res) => {
          this.getAsncData(res);
        })
        .catch((err) => {
          console.log(err.msg || "请求出错了");
        });
    },

    handleNext() {
      this.nextRaddle();
    },

    goTipic() {
      this.$router.push({
        name: "study",
        params: {
          tag: "猜谜语",
        },
      });
    }
  },
  watch: {
      id(id) {
        return id
      }
  }
};
</script>
<style scoped>
.white {
  background-color: #fff;
  text-align: center;
  padding: 0 4px;
  border-radius: 4px;
}
.raddle-title {
  color: #3e73a0;
  padding: 4px;
}
.deep-theme,details {
  outline: none;
  color: #218ae6;
}
.raddle-temp {
  padding: 4px;
}
:deep(.el-form-item) {
  text-align: left;
  margin-bottom: 0 !important;
  margin-left: 25%;
}
:deep(.el-form-item__label) {
  margin-right: 6px;
  font-size: 16px;
  color: #218ae6;
}
.text-indent {
  text-indent: 2em;
}
.hover-red {
  padding: 6px;
  border-radius: 4px;
  margin-left: 20px;
  color: #fff;
  background-color: #6ca7db;
}
.hover-red:hover {
  color: #c14242;
}
.correct {
  color: #c14242;
  padding: 8px;
}
@media screen and (min-width: 1024px) {
  :deep(.el-form-item--medium .el-form-item__content) {
    line-height: 30px;
  }
  .raddle-temp {
    font-size: 14px;
  }
}
@media screen and (max-width: 640px) {
  :deep(.el-dialog) {
    width: 80%;
  }
}
.answer {
  font-family: "楷体";
  font-size: 18px;
  color: #2378c2;
}
</style>