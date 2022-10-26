<template>
  <div class="container">
    <div class="show-register">
      <el-card>
        <my-form :ruleForm="ruleForm" ref="ruleForm">
          <template #footer>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
              <el-button
                type="info"
                plain
                size="mini"
                @click="submitLogin('ruleForm')"
                >登入</el-button
              >
            </el-form-item>
          </template>
        </my-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import myForm from "@/components/my-form";
import { queryCheckUser, PostUserRegister } from "@/api/queryApi";
export default {
  name: "register",
  components: {myForm},
  data() {
    return {
      ruleForm: {
        password: "",
        username: "",
      },
      formName: null,
    }
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.formName = this.$refs[formName]?.$refs[formName]; 
     console.log(this.formName,this.ruleForm);
      this.formName.validate((valid) => {
        if (valid) {
          const {  username, password } = this.ruleForm;
          const avatar = "https://img2.baidu.com/it/u=390829681,3002818272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
          queryCheckUser.call(this,username).then((res) => {
            if(res.data.length) {
              this.$message({
                  showClose: true,
                  message: "用户名已经存在,请重新注册！",
                  type: "error",
                });
                return;
              }
              PostUserRegister.call(this, { register: {username, password, avatar} })
                .then((res) => {
                  const { insertId } = res.data;
                  if (insertId) {
                    this.$router.push({
                      name: "login",
                    });
                    this.$message({
                      showClose: true,
                      message: "注冊信息成功,请去到登入页面",
                      type: "success",
                    });
                  }
                })
                .catch((err) => {
                  console.log(err, "错误粗混");
                });
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitLogin() {
      this.$router.push({name: 'login'});
    },
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
}

.show-register {
  position: absolute;
  min-width: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 380px) {
  .show-register {
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>