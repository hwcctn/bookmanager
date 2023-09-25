<template>
<div class="login-wrap">
  <el-form
    class="login-container"
  >
  <h1 class="title">用户登录：</h1>
    <el-form-item label="id">
      <el-input v-model="id" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="passw" />
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="doLogin" style="width: 100%;">登录</el-button>
</el-form-item>

    <el-row  :gutter="20" style="text-align: center;margin-top: 10px;">
        <el-col :span="6"></el-col>
        <el-col :span="6"><el-link type="primary" @click="toRegister">用户注册</el-link></el-col>
        <el-col :span="6"><el-link type="primary">忘记密码</el-link> </el-col>
      </el-row>
  </el-form>
</div>
</template>

<script>
import router from '@/router';

export default {
    data() {
        return {
            id: "",
            passw: ""
        };
    },
    methods: {
        doLogin() {
            
            if(this.id !== "" && this.passw !== ""){
              console.log(this.user)
              this.$api.getLogin({
                
                  id: this.id,
                  password: this.passw,
                  
                 
              }).then(res => {
                  console.log(res)
                  localStorage.setItem("token",res);
                
                })
              
              localStorage.setItem("user_id",this.id);
              //this.$router.push("/")
              
            }
            else{
              alert("用户名密码错误")
            }
            
        },
        toRegister(){
            this.$router.push('/Register');
        }
    },
    components: { router }
}

</script>

<style lang='less' scoped>
.login-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    padding-top: 15%;
    background-image: url(../assets/R.png);
    background-repeat: no-repeat; 
    background-position: center right;
    background-size: 100%;
  }
 
  .login-container {
    border-radius: 10px;
    margin: 0px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  }
 
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }



</style>
