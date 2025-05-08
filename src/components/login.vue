<template>
<div class="login-wrap">
  <el-form
    class="login-container"
  >
  <h1 class="title">用户登录：</h1>
    <el-form-item label="user">
      <el-input v-model="username" />
      <div style="color: red " v-if="tishiview">用户名不存在</div>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="passw" />
      <div style="color: red " v-if="passshiview">密码错误</div>
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
import { toRaw } from 'vue';
export default {
    data() {
        return {
            username: "",
            passw: "",
            users:[],
            tishiview:false,
            passshiview:false
        };
    },
    mounted() {
        this.$api.getusers({

        }).then(res=>{
          console.log(res);
          this.users=res.data;
          
         console.log(toRaw(this.users)); 
        })
      },
    methods: {
        doLogin() {
          
          if(this.username!== "" && this.passw !== ""){
            let checkuser=toRaw(this.users).find((item)=>{ return item.username===this.username});
            console.log(checkuser)
          if(checkuser)
          {
            this.tishiview=false
          if(checkuser.password===this.passw){
              console.log("Yes")
              localStorage.setItem("user_id",checkuser.id);
              this.$api.getLogin({
                
                  username: this.id,
                  password: this.passw,
                  
                 
              }).then(res => {
                  console.log(res)
                  localStorage.setItem("token",res.data);
                
                })
              
              
            this.$router.push("/") 
              
            }
            else{
              console.log("No")
              this.passshiview=true
            }
          }
          else{
            this.tishiview=true
          }
        }
        else{
          alert("请输入用户名和密码")
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
