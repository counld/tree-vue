<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="auto">
		<el-form-item label="是否热门" props="isOpen">
			<el-switch
				v-model="form.isOpen"
				active-color="#13ce66"
				inactive-color="#ff4949"
			>
			</el-switch>
		</el-form-item>
		<el-form-item label="作品标题" prop="title">
      <el-input v-model="form.title"></el-input>
		</el-form-item>
    <el-form-item label="作品描述" prop="description">
			<el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="视频预览:" prop="video" label-width="-6px">
      <div class="padding-5">
        <video
          class="video"
          controls
					metud
          v-if="videoShow"
          :src="videoShow"
        />
      </div>
      <el-progress v-if="!successStatus" :format="format" :percentage="progressNums" status="success"></el-progress>
      <div class="padding-10 flex">
        <el-tooltip
          class="item"
          effect="dark"
          content="请选择你要上传的视频,但不得大于20M"
          placement="top"
        >
          <input
            ref="videoFile"
            @change="fileChange($event)"
            type="file"
            id="video_file"
            accept="video/*"
          />
        </el-tooltip>
        <el-button
          :type="successStatus ? 'success' : 'primary'"
          @click="handleUploadVideo"
          :disabled="successStatus"
          >上传视频</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { API_URL } from "@/config/env.js";
import { queryAdminsVideo } from "@/api/admins";

export default {
  name: "videoPlatform",
  data() {
    return {
      videoShow: '',
      form: {
        video: "",
				title: "",
        description: "",
				isOpen: false
      },
      videoFile: "",
      formData: new FormData(),
      successStatus: true,
      isCheck: false,
      progressNums: 1,
      rules: {
        description: [
          {
            required: true,
            message: "请输入视频话题，更好的体验",
            trigger: "blur",
          },
          {
            min: 5,
            max: 300,
            message: "长度在 5 到 300 个字符",
            trigger: "blur",
          },
        ],
				title: [
          {
            required: true,
            message: "请输入视频标题，获得更多的体验量",
            trigger: "blur",
          },
          {
            min: 5,
            max: 70,
            message: "长度在 5 到 70 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    console.log("spark",'SparkMD5');
  },
  methods: {
    //方法
    fileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let name = files[0].name.toLowerCase();
      console.log(files, 'files');
      if (
        !/\.(avi|wmv|mpeg|mp4|mov|mkv|flv|f4v|m4v|rmvb|rm|3gp|dat|ts|mts|vob)$/.test(
          name
        )
      ) {
        this.$message.warning("请上传视频");
        return;
      }
      if (files[0].size > 1024 * 1024 * 20) {
        this.$message.warning("视频大小不能大于20M");
        return;
      }
      //这里是file文件
      this.videoFile = files;
      this.form.video = files[0];
      this.BlobToBase64(files[0]).then((res) => {
				this.videoShow = res;
        this.formData.append("file", files[0]);
        this.successStatus = false;
      });
    },
    BlobToBase64(blob) {
      return new Promise(function (resolve) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
          resolve(this.result);
        };
      });
    },
    async handleUploadVideo() {
      this.submitForm('form')
      if(!this.isCheck) return;
      const username = localStorage.getItem("username");
			try {
				const { data } = await this.axios({
					method: "post",
					url: API_URL + "/api/uploadVideo",
					data: this.formData,
				});
				this.successStatus = true;
				const videoData = {
					title: this.form.title,
					description: this.form.description,
					uploadTime: Date.now(),
					videoUrl: data.videoUrl,
					author_video: username,
					hotVideo: this.form.isOpen ? 1 : 0
				};
				if(data.code !== 1) return;
				const result = await queryAdminsVideo.call(this, videoData);
				if(result.data.insertId) {
          this.form = {
              video: "",
              title: "",
              description: "",
              isOpen: 0
          }
          this.isCheck = false;
          this.$router.push({
            name: 'videoManage'
          })
					this.$message({
						title: "上传视频成功",
            message: "你已经成功上传了你喜欢的视频, 感谢你的贡献",
					})
				} else {
					this.$message({
						title: '上传视频出错',
						message: '查看你的接口是否通畅'
					})
				}
			} catch(err) {
				console.log(err, 'err');
			}
    },
		submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.isCheck = valid;
        });
      },

      format(percentage) {
        return percentage === 100 ? '成功' : `${percentage}%`;
      }
  },
};
</script>

<style scoped>
:deep(.el-form-item) {
	margin-bottom: 16px;
}
.video {
	max-width: 400px;
	height: 250px;
}

@media screen and (max-width: 640px) {
  .item {
    width: 200px;
  }
  .video {
    max-width: 260px;
    height: 200px;
  }
}
</style>