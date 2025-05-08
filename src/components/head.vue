
  <template>
  <div id="all">
  <div class="common-layout">
    <el-container>

      <el-header class="Header" >
        
        <el-row :gutter="20">
          <el-col :span="2" > <el-icon size="50px"><Reading   /></el-icon><div class="grid-content ep-bg-purple" />
 </el-col>


    <el-col :span="6" ><div class="grid-content ep-bg-purple" />
   
    <h2 >图书管理系统</h2>
  </el-col>
    <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="2"><div class="grid-content ep-bg-purple" />
     
      <el-icon size="40px" ><User /></el-icon>
    
      <div >{{ this.idName }}</div>
    </el-col>

  </el-row>

      </el-header>
    
      <el-container>
        
        <el-aside width="200px"  class="Aside">
          <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
     
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
          <div><router-link exact to="/manager">
            <el-menu-item index="1">
        <i class="el-icon-menu"></i>
          <span>图书管理</span>
      </el-menu-item>
          
          </router-link></div>
          
          <div><router-link exact to="/bookUser">
            <el-menu-item index="2">
        <i class="el-icon-menu"></i>
          <span>图书界面</span>
        </el-menu-item>
           
          </router-link></div>
          <div><router-link exact to="/historicRecords">
            <el-menu-item index="3">
        <i class="el-icon-menu"></i>
          <span>历史记录</span>
        </el-menu-item>
          
          </router-link></div>
        </el-menu>
        </el-aside>
        <el-main class="Main">
          <router-view/>
        </el-main>
    
      </el-container>
    </el-container>
  </div>
</div>

</template>


<script>
export default {
  data(){
    return{
      idName:localStorage.getItem("idname")
    }
  },
 
   
  
}

</script>

<style lang='less' scoped>

h2{
  font-size: 35px;
}
.Header{
  background-color:#545c64;
  height: 100px;
}
.Aside{
   background-color:#545c64 ;
   min-height:calc(100vh - 100px);
 
}
.Main{
 background-color:#f4f4f5; 
 height: calc(100vh - 100px);
 padding: 0;
}
.Aside .rmanager{
  font-size: 25px;
  margin: 20px;
}
.Aside .ruser{
  font-size: 25px;
  margin: 25px;
}
.el-icon {
    position: relative;
    top: 30px;
    left: 40px;
}
</style>
