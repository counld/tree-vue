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
    <el-tab-pane label="配置管理" name="second">
			<el-empty :image-size="80"></el-empty>
		</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">
			<el-empty :image-size="80"></el-empty>
		</el-tab-pane>
  </el-tabs>
	</div>
</template>
<script>
  import { queryApiNewestRiddleList } from "@/utils/queryApi";
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