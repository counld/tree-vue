<template>
  <div class="upload-container flex">
    <p>上传头像</p>
    <el-upload
      class="avatar-uploader"
      :action="baseUrl"
      :show-file-list="false"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>s
<script>
  import { API_URL } from "@/config/env.js";
export default {
  name: "my-upload",
  props: ['imageUrl'],
  data() {
    return {
      baseUrl: API_URL + '/api/upload/avatar'
    };
  },
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handleAvatarSuccess(res, file) {
      this.$emit('handleUpload',URL.createObjectURL(file.raw),res);
      // console.log(this.imageUrl,'imageUrl',file,'ieraudn',res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 png,jpeg 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.upload-container {
  border-radius: 4px;
  background-color: whitesmoke;
}
p {
  display: inline-block;
  flex-basis: 18px;
  padding: 8px;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color: #409eff;
}
:deep(.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
  border: none;
  width: 110px;
  height: 110px;
  line-height: 110px;
}
.avatar {
  width: 110px;
  height: 110px;
  display: block;
}
</style>