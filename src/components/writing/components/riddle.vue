<template>
  <el-card>
    <el-form
      :label-position="labelPosition"
      ref="dynamicValidateForm"
      label-width="auto"
      :model="dynamicValidateForm"
    >
      <el-form-item label="谜题" prop="title">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请书写你的谜题"
          v-model="dynamicValidateForm.title"
        />
      </el-form-item>
      <el-form-item
        v-for="(raddle, index) in dynamicValidateForm.raddles"
        :label="'选项' + index"
        :key="raddle.key"
        :prop="'raddles.' + index + '.value'"
      >
        <el-input v-model="raddle.value"></el-input
        ><el-button @click.prevent="removeRaddle(raddle)">删除</el-button>
      </el-form-item>
      <el-form-item label="谜底" prop="answer">
        <el-input v-model="dynamicValidateForm.answer"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >立即创建</el-button
        >
        <el-button @click="addRaddles">添加选项</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { addRiddle } from "@/utils/queryApi";
export default {
  name: "raddle",
  props: ["input", "isOpen", "tag", "description", "id"],
  data() {
    return {
      labelPosition: "center",
      dynamicValidateForm: {
        raddles: [
          {
            value: "",
          },
          {
            value: "",
            key: Date.now(),
          },
        ],
        title: "",
        answer: "",
      },
    };
  },
  methods: {
    submitForm() {
      const { title, raddles, answer } = this.dynamicValidateForm;
      let list = [];
      raddles.forEach((item) => list.push(item.value));
      const raddleObj = {
        puzzle: title,
        errorlist: list.join(','),
        answer,
        title: this.input,
        hot: this.isOpen,
        category: this.id,
        description: this.description,
        tag: this.tag,
      };
      if (
        this.isEmpty(title) &&
        this.isEmpty(raddles) &&
        this.isEmpty(answer)
      ) {
        addRiddle.call(this, raddleObj).then((res) => {
          if (res.data?.insertId) {
						this.$message({
            showClose: true,
            message: "添加数据成功",
            type: "success",
          });
					this.resetForm('dynamicValidateForm');
          this.$emit("removeTitle", "", "");
          }
        }).catch(err => {
					console.log(err.mes|| '请求出错')
				});
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeRaddle(item) {
      var index = this.dynamicValidateForm.raddles.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.raddles.splice(index, 1);
      }
    },
    addRaddles() {
      this.dynamicValidateForm.raddles.push({
        value: "",
        key: Date.now(),
      });
    },
    isEmpty(value) {
      if (value === "") return;
      if (Array.isArray(value)) {
        return value.every((item) => {
          return item.value !== "";
        });
      }
      return true;
    },
  },
};
</script>
<style scoped>
:deep(.el-form-item) {
  color: #3e73a0;
}
:deep(.el-form-item__content) {
  display: flex;
}
@media screen and (max-width: 640px) {
  :deep(.el-form-item__content) {
    padding-left: -100%;
  }
 :deep(.el-button--primary) {
  margin-left: -38px;
 }
} 

</style>