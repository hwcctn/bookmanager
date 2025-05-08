<template>
    <div class="login-wrap">
      <el-form
        class="login-container"
      >
      <h1 class="title">用户注册：</h1>
      <el-form-item label="id名称">
        
          <el-input v-model="username" />
          <div style="color: red " v-if="tishiview">用户名重复</div>
        </el-form-item>
        
      <el-form-item label="邮箱">
          <el-input v-model="mailbox" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="passw" />

          
        </el-form-item>
       
  
        <el-form-item>
        <el-button type="primary" @click="doRegister" style="width: 100%;">注册</el-button>
    </el-form-item>
    
      </el-form>
    </div>
    </template>
    
    <script>
    import router from '@/router';
import { toRaw } from 'vue';

    export default {
      name: "register",
      data() {
        return {
          mailbox: "",

          passw: "",

          username: "",
          users:"",
          tishiview:false
        };
      },
      mounted() {
        this.$api.getusers({

        }).then(res => {
          ;
          this.users = res.data;
          console.log(res.data)
})
      }, methods: {
        getusers(){
          this.$api.getusers({

          }).then(res => {
            ;
            this.users = res.data;
            console.log(res.data)
          })
        },
        doRegister() {
          let checkuser=toRaw(this.users).find((item)=>{return item.username===this.username});
          console.log(checkuser )
          if (this.mailbox !== "" && this.passw !== "" && this.username != ""&&!checkuser) {
            
            this.$api.getRegister({
              username: this.username,
              mail: this.mailbox,
              password: this.passw
            }).then(res => {
              console.log(res)
            })
           
         
          
        
             this.$router.push("/login")
          }
          else{
            this.tishiview=true
          }
        },

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