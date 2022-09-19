<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="70px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="用户名"
      prop="username"
      :rules="[
        { required: true, message: '用户名不能为空' },
        { type: 'string', message: '用户名必须为有值' },
      ]"
    >
      <el-input
        type=""
        v-model="ruleForm.username"
        autocomplete="off"
        :placeholder="`输入你的昵称 ${guest?guest:''}`"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
      :rules="[{ required: true, message: '密码不能为空 ' }]"
    >
      <el-input
        type="password"
        v-model="ruleForm.password"
        autocomplete="off"
        maxlength="12"
        :placeholder="`输入你的密码 ${guest?guest:''}`"
      ></el-input>
    </el-form-item>
    <slot name="password"></slot>
    <slot name="footer"></slot>
  </el-form>
</template>
<script>
export default {
  name: "my-form",
  props: ["ruleForm", "guest"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        console.log(value, "password");
        callback({ value });
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入你的正确的登入名"));
      } else {
        console.log(value, "username");
        callback({ value });
      }
    };
    return {
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }],
      },
    };
  },
};
</script>

<style>
.el-form-item__label {
  text-align: left;
}
</style>