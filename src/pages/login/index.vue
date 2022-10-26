<template>
  <div class="login-cartainer">
    <div class="login-title">
      <p>天涯海角</p>
      <h3>请登入你的账号:</h3>
    </div>
    <div class="el-absolute">
      <my-form :ruleForm="ruleForm" guest="guest" ref="ruleForm">
        <template #password>
          <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        </template>
        <template #footer>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button v-if="isRegisterOpem" type="info" plain size="mini" @click="submitRegister('ruleForm')" >注册</el-button>
        </el-form-item>
        </template>
      </my-form>
    </div>
  </div>
</template>
<script>
import { TOKEN_KEY } from "@/config/env.js";
import { AuthLogin } from "@/api/queryApi";
import myForm from "@/components/my-form";
export default {
  name: "login",
  components: {myForm},
  data() {
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        age: "",
        username: "",
      },
      formName: null,
      isRegisterOpem: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.formName = this.$refs[formName]?.$refs[formName]; 
      this.formName.validate((valid) => {
        if (valid) {
          const { password, username } = this.ruleForm;
          AuthLogin.call(this, { login: [username, password] })
            .then((res) => {
              const receiveAuth = res.data[0];
              if (receiveAuth) {
                localStorage.setItem("token", TOKEN_KEY);
                localStorage.setItem("username", receiveAuth.username);
                localStorage.setItem("nickname", receiveAuth.username);
                localStorage.setItem("avatar", receiveAuth.avatar);
                this.$router.push({
                  name: "home",
                  params: { username: receiveAuth.username },
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "请确认你的输入的用户信息！",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err, "错误粗混");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitRegister() {
      this.$router.push({name: 'register'});
    },
    resetForm(formName) {
      this.formName = this.$refs[formName]?.$refs[formName]; 
      this.formName.validate.resetFields();
    },
  },
  watch: {
    'ruleForm.username': function hanleChangeClick(oldValue) {
      if(oldValue == '@register') { //开放register功能
        this.isRegisterOpem = true;
      }
    },
  }
};
</script>

<style>
.login-cartainer {
  overflow: hidden;
  position: relative;
  height: 100vh;
}
.login-title {
  margin-top: 20px;
  padding: 16px;
  text-align: center;
  color: #f6f8fa;
}
.el-absolute {
  position: absolute;
  background: #fff;
  width: 400px;
  padding: 25px 25px 23px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-form-item__label {
  text-align: left;
}
</style>