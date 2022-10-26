<template>
  <div>
    <el-table
    :data="tableData"
    max-height="540"
    border
    style="width: 100%">
    <el-table-column
      label="视频预览"
      align="center"
      min-width="200px"
      >
      <template slot-scope="scope">
        <div class="relative">
          <video
            class="video"
            controls
            metud
            v-if="scope.row.videoUrl"
            :src="scope.row.videoUrl"
          />
          <span class="read-video"><i class="el-icon-view margin-right-10"></i>预览</span>
      </div>
      </template>
    </el-table-column>
    <el-table-column
      label="作品标题" 
      min-width="180px"
      align="center"
     >
      <template slot-scope="scope">
          <h5 class="padding-5 alone-ellipsis" :title="scope.row.title">{{scope.row.title}}</h5>
          <p><i class="el-icon-view" v-if="scope.row.hits_stars"></i>{{scope.row.hits_stars}}
           <i class="el-icon-video-play padding-5"> 12</i>
           <i class="el-icon-s-comment"> 2</i>
           <span class="theme-color margin-left-10" v-if="scope.row.hotVideo">热门视频</span>
          </p>
          <p><span class="video-title">已发布</span> <span>{{scope.row.uploadTime | fileTime}}</span></p>
      </template>
    </el-table-column>
    <el-table-column 
      prop="description"
      label="作品描述" 
      align="center" 
      min-width="160px">
      <template slot-scope="scope"> 
          <p class="ellipsis ell-6">{{scope.row.description}}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" 
      min-width="160px">
      <template slot-scope="scope">
          <el-button
          size="mini"
          class="margin-right-10"
          @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            title="这是一段视频你确定删除吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
             >删除</el-button>
          </el-popconfirm>
      </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改视频文案"
      :visible.sync="centerDialogVisible"
      width="60%"
      center>
        <el-col class="padding-10">
          <span class="margin-right-10 ">为什么他的戏里面，每个人都是主角，那么的鲜明，那么的突出</span>
          <el-switch
            v-model="rowObj.hotVideo"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-col>
       <div class="padding-5"> 
        <el-input v-model="rowObj.title"></el-input>
       </div>
      <el-input class="padding-5" v-model="rowObj.description"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateVideo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { API_URL } from "@/config/env.js";
import { queryAdminsVideoList, removeAdminsVideo, deleteSynsVideo, uploadVideoComment } from "@/api/admins";

export default {
  name: "videoManage",
  data() {
    return {
      successStatus: false,
      tableData: [{
          videoUrl: '',
          title: '数据是没有的，等你上传',
          description: '上海市普陀区金沙江路 1518 弄',
          hotVideo: 1,
        }],
      centerDialogVisible: false,
      rowObj: {
        description: '',
        hotVideo: false,
        title: '',
        uploadTime: '',
      },
    };
  },
  async created() {
    const { data } = await queryAdminsVideoList.call(this, 10);
    data.forEach(item => {
      item.videoUrl = API_URL + item.videoUrl;
      item.hotVideo = item.hotVideo == 1 ? true : false;
    })
    this.tableData = data;
  },
  methods: {
    handleEdit(row) {
      this.rowObj = row;
      this.centerDialogVisible = true;
    },
    async handleDelete(row) {
      const { id, videoUrl } = row
      const list = this.tableData.filter(item => item.id !== id)
      const videoId = videoUrl.slice(videoUrl.indexOf('video'));
      try {
        const { data } = await removeAdminsVideo.call(this, id);
        if(data.affectedRows) {
         this.tableData = list;
         const res = await deleteSynsVideo.call(this, videoId);
         if(res.data.code == '1') {
           this.$message({
               type: 'success',
               title: res.data.msg,
               message: "你已经成功删除了你的视频, 感谢你的维护",
           })
         }else {
          this.$message({
            type: 'error',
            title: '删除出错',
            message: '请检查你的信息',
          })
         }
        }
      } catch(err) {
        console.log(err.msg, '删除出错')
      }
    },
    async handleUpdateVideo() {
      this.centerDialogVisible = false;
      const videoObj = [
        this.rowObj.title,
        this.rowObj.description,
        this.rowObj.hotVideo ? 1 : 0,
        Date.now(),
        this.rowObj.id,
    ]
      try {
        const { data } = await uploadVideoComment.call(this, { comment: videoObj});
        if(data.affectedRows) {
          this.$message({
            type: 'success',
            content: '更新文案成功',
            message: '喜欢你的文案,再次感谢你的贡献'
          })
        }
      } catch(err) {
        console.log(err,'出错了')
      }
    }
  },
  filters: {
    fileTime(value) {
      const num = Number(value);
      return new Date(num).toLocaleString()
    }
  }
};
</script>

<style scoped>
:deep(.el-form-item) {
	margin-bottom: 16px;
}
.video {
	max-width: 200px;
	height: 150px;
}
.read-video {
  position: absolute;
  top: 40%;
  left: 50%;
  display: none;
  border-radius: 20%;
  background: rgba(0,0,0,0.3);
  transform: translate(-50%, -50%);
}
.ell-6 {
  -webkit-line-clamp: 6;
}
.relative:hover .read-video {
  display: block;
}
.video-title  {
  color: rgb(57, 181, 74);
  margin-right: 5px;
}
</style>