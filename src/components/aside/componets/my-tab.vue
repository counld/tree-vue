<template>
  <div class="tab-wraper">
		<el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="猜谜语" name="first">
      <template v-if="raddleList">
        <div class="raddle-warper">
          <div v-for="item in raddleList" :key="item.id" style="display: inline-block">
          <h4>{{item.title}} <span class="question" @click="handleGoRaddle(item.id)">去答题</span></h4>
          <p>{{item.puzzle}}<span class="think-raddle">————想一想这是什么谜语？</span></p>
        </div>
        </div>
      </template>
			<el-empty :image-size="80" v-else></el-empty>
		</el-tab-pane>
    <el-tab-pane label="学习网站" name="second">
      <div class="content_title">
        <li><a href="https://github.com/tnfe/TNT-Weekly">前端领域最新文章</a></li>
        <li><a href="https://github.com/coffe1891/frontend-hard-mode-interview" target="_bleak">大前端范畴内的知识分享</a></li> 
        <li><a href="https://es6.ruanyifeng.com/" target="_bleak">ES6 入门教程</a></li> 
        <li><a href="https://github.com/coffe1891/frontend-hard-mode-interview/blob/master/1/1.2.5.md" target="_bleak">高频的“闭包”</a></li>
        <li><a href="https://github.com/coffe1891/frontend-hard-mode-interview/blob/master/1/1.2.9.md" target="_bleak">强大的数组</a></li>
        <li><a href="https://github.com/coffe1891/frontend-hard-mode-interview/blob/master/1/1.2.10.md" target="_bleak">正则表达式</a></li>
        <li><a href="https://github.com/coffe1891/frontend-hard-mode-interview/blob/master/1/1.5.4.md" target="_bleak">Http和Https的区别在哪里</a></li>
        <li><a href="https://www.zhihu.com/question/19562698/answer/89480175" target="_bleak">关于 JavaScript 的好书有哪些？</a></li>
      </div>
		</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">
			<el-empty :image-size="80"></el-empty>
		</el-tab-pane>
  </el-tabs>
	</div>
</template>
<script>
  import { queryApiNewestRiddleList } from "@/api/queryApi";
  export default {
    data() {
      return {
        activeName: 'second',
        raddleList: [],
        errorList: [],
      };
    },
    created() {
      queryApiNewestRiddleList.call(this,3).then(res => {
        this.raddleList = res.data
      });
    },
    methods: {
      handleClick(tab) {
        const { name } = tab
        this.activeName = name;
      },
      handleGoRaddle(riddleId) {
        this.$router.push({
          name: "riddle",
          params: { riddleId },
      })
      }
    }
  };
</script>

<style scoped>
.tab-wraper {
	padding: 4px;
	border-radius: 4px;
  margin-bottom: 10px;
	background-color: #fff;
}
.el-tabs__nav {
	padding: 4px;
}
.raddle-warper {
  width: 100%;
}
h4 {
  color: #3E73A0;
}
.question {
  font-size: 12px;
  color: #e78f8f;
  margin-left: 10px;
}
.question:hover {
  color: red;
}

.content_title {
  padding-left: 6px;
}
.content_title li {
  padding: 2px;
}
.content_title li a {
  color: #396f9d;
}

.content_title li a:hover {
  color: #0986f4;
}

p {
  font-size: 14px;
}
:deep(.el-empty) {
  padding: 25px 0;
}
:deep(.el-tabs__header) {
  margin-bottom: 10px;
}
.think-raddle {
  color: #2378c2;
  margin-left: 6px;
  font-size: 12px;
}

</style>