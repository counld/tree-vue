<template>
  <div>
    <div class="theme-color" style="margin-left: 10%">
      这是个人展示区
    </div>
    <div style="text-align: center; padding: 4px;">
      <span class="show-title">需要完成的東西，得一步不斷向前添加</span>
    </div>
    <div class="container">
      <my-echarts />
      <el-card>
        <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 80%"
        @clearFilter="clearFilter"
        @filter-change="filterChange"
      >
   
        <el-table-column
          column-key="date"
          prop="date"
          label="日期"
          width="100"
          :filters="[
            { text: '2016-05-02', value: '2016-05-02' },
            { text: '2016-05-03', value: '2016-05-03' },
          ]"
          filter-placement="bottom-end"
        >
        </el-table-column>
   
        <el-table-column
          column-key="name"
          prop="name"
          label="姓名"
          width="100"
          :filters="[
            {text: '王大锤',value: '王大锤'},
            { text: '王小虎', value: '王小虎'
            }
          ]"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="100"
          filter-placement="bottom-end"
        >
        </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
  import myEcharts from "@/components/my-echarts";
export default {
  name: "show",
  components: {myEcharts,},
  data() {
    return {
      value1: '',
      formInline: '',
      queryParams: {
        date: '2015-12',
        name: '厉害',
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      tableData2: [],
    };
  },
  created() {
    this.tableData2 = this.tableData;
  },

  methods: {
        // 筛选状态
        filterChange(filter) {
        if(filter['date']){
          if(!filter.date.length) {
            this.resetQuery();
            return;
          }
          this.tableData = this.tableData.filter(item => {
            return item.date == filter['date'];
          })
          console.log(filter,!!filter['date']);
        } if(filter['name']){
          // 修改传给后端接口的参数，并重新调用接口
          // if(filter)
          if(!filter.name.length) {
            this.resetQuery()
            return ;
          }
          this.tableData = this.tableData.filter(item => {
            return item.name == filter['name'];
          })
          console.log('this.queryParams',filter,filter.name);
          // this.getList()
        }
    },
    clearFilter(key) {console.log(key,'key')},
    resetQuery() {
      this.tableData=this.tableData2
    }
  }
};
</script>

<style scoped>
  .show-title {
    background-color: #c4bdbd;
  }
.container {
  /* height: 100vh; */
}
</style>