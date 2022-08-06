<template>
	<div class="login-cartainer">
		<div class="login-title">
			<p>数据操作,连接你的使命</p>
			<h3>请登入你的账号:</h3>
		</div>
		<div class="el-absolute">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
				<el-form-item 
					label="用户名" 
					prop="user"
					:rules="[
					{ required: true, message: '用户名不能为空'},
					{ type: 'string', message: '用户名必须为有值'}
					]"
				>
					<el-input type="" v-model="ruleForm.user" autocomplete="off" placeholder="输入你的昵称"></el-input>
				</el-form-item>
				<el-form-item 
				label="密码"
				prop="pass"
				:rules="[
					{ required: true, message: '密码不能为空'},
				]">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="12" placeholder="输入你的密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model.number="ruleForm.age"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { TOKEN_KEY } from '../../../service/config';
import { AuthLogin } from '../../utils/queryApi';
  export default {
		name: 'login',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
					console.log(value,'password')
          callback({value});
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
			var checkUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入你的正确的登入名'));
        } else {
					console.log(value,'user')
          callback({value});
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: '',
					user:''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
					user:[
						{ validator: checkUser, trigger: 'blur' }
					]
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
						const { pass, user } = this.ruleForm;
						AuthLogin.call(this,{login: [user, pass]})
							.then(res => {
								const receiveAuth = res.data[0];
								if(receiveAuth) {
									localStorage.setItem("token",TOKEN_KEY);
									this.$router.push({ name: 'home', params: { username: receiveAuth.username }}) 
								}else {
									 this.$message({
											showClose: true,
											message: '请确认你的输入的',
											type: 'error'
										});
								}
							}).catch(err => {
								console.log(err,'错误粗混')
							})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
.login-cartainer {
	overflow: hidden;
	position: relative;
	height: 100vh;
	background-color: #24292f; 
}
.login-title {
	margin-top: 20px;
	padding: 16px;
	color: #f6f8fa;
}
.el-absolute {
	position: absolute;
	background: #fff;
	width: 400px;
	min-height: 350px;
	padding: 25px 25px 23px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.el-form-item__label {
	text-align: left;
}
</style>