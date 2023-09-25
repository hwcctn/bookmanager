<template>
    <div id="app">
  <div>图书管理</div>
  
  <el-row style="padding: 20px;">
			<!-- <el-col :span="10">
				<el-input v-model="input" placeholder="请输入书名" ></el-input>
			</el-col>
			<el-col :span="6">
				<el-button type="primary" @click='searchUser'><el-icon><Search /></el-icon>搜索</el-button>
			</el-col>-->
			<el-col :span="6"> 
				<el-button type="primary" @click='onaddUserVisible'>增加图书</el-button>
			</el-col>
		</el-row>
        <el-table stripe border :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="id" width="180">
			</el-table-column>
			<el-table-column prop="bookname" label="书名" width="180">
			</el-table-column>
			<el-table-column prop="brief" label="介绍">
			</el-table-column>
			<el-table-column prop="sort" label="分类">
			</el-table-column>
			<el-table-column prop="state" label="状态">
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" @click="updateUser(scope.row)">修改书籍信息</el-button>
					<el-button type="danger" @click="deleteUser(scope.row.id)">删除书籍信息</el-button>
				</template>
			</el-table-column>
		</el-table>

        <el-dialog title="添加书籍" v-model="addUserVisible" width="80%" >
			<el-form ref="form" :model="form" label-width="80px">
				
				<el-form-item label="书名:">
					<el-input v-model="form.bookname"></el-input>
				</el-form-item>
				<el-form-item label="简介:">
					<el-input v-model="form.brief"></el-input>
				</el-form-item>
				<el-form-item label="分类:">
					<el-input v-model="form.sort"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onaddUser">立即添加图书</el-button>
					<el-button @click="onaddUsercancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

        <el-dialog title="修改书籍信息" v-model="updataUserVisible" width="80%" >
			<el-form :model="updateUserForm" label-width="80px">
				<el-form-item label="编号:">
					<el-input v-model="updateUserForm.id"></el-input>
				</el-form-item>
				
				<el-form-item label="简介:">
					<el-input v-model="updateUserForm.brief"></el-input>
				</el-form-item>
				<el-form-item label="分类:">
					<el-input v-model="updateUserForm.sort"></el-input>
				</el-form-item>
				
				<el-form-item>
					
					<el-button type="primary" @click="onUpdateCommit">立即修改图书</el-button>
					<el-button @click="onupdatecancel">取消</el-button>
				
				</el-form-item>
			</el-form>
		</el-dialog>

    </div>
</template>

<script>
import axios from "../utils/request"

export default {
   name:"manager",
   data(){
    return {
        tableData:[],
        input:'',
        addUserVisible:false,
        updataUserVisible:false,
        form:{
            
            bookname:'',
            brief:"",
			sort:""
        },
        updateUserForm:{
            id:0,
			sort:"",
            bookname:'',
            brief:"",
            state:''
        }
    }
   },
   mounted(){
    this.requesUser()
   },
   methods:{
	//添加图书信息
	onaddUser() {
		// const _this = this
		/* 
		var axios = require('axios');
		var data = JSON.stringify( {
			"bookname": this.form.bookname,
			"brief":this.form.brief,
			"sort":this.form.sort
		});
		console.log(data)

		var config = {
		method: 'post',
		url: 'http://192.168.123.191:8080/book/add',
		headers: { 
			'Content-Type': 'application/json'
		},
		data : data
		};

		axios(config)
		.then(function (response) {
		console.log(JSON.stringify(response.data));
		})
		.catch(function (error) {
		console.log(error);
		});
		 */
		this.$api.postaddBook( {
			bookname: this.form.bookname,
			brief:this.form.brief,
			sort:this.form.sort
		}
		
		).then(() =>{
		
		
		this.addUserVisible = false
		this.requesUser()
		
})	
 	},
//根据图书名查询图书
/* searchUser(){
	this.$axios.get('#' )
					.then(function(response) {
						console.log(response.data)
						that.tableData=response.data.data
						console.log(that.tableData)
					}).catch(function(error) {

					})
				
			}, */
onaddUsercancel(){
	this.addUserVisible=false
},
onupdatecancel(){
	this.updataUserVisible=false
},
onaddUserVisible(){
	this.addUserVisible=true
},

updateUser(user){
	
	this.updateUserForm=user
	this.updataUserVisible=true
	
	
},
//修改图书
onUpdateCommit(sort){
	
	this.$api.putxiuBook( {
						id: this.updateUserForm.id,
						sort:this.updateUserForm.sort,
						//bookname: this.updateUserForm.bookname,
						brief:this.updateUserForm.brief,
						//state:this.updateUserForm.state
					})
					.then(res=>{
						console.log(res)
						this.updataUserVisible = false
						
						this.requesUser()
						
					})

},
//删除图书
deleteUser(id){
	id=id.toString()
	this.$api.delBook({
		id:id
	})
	.then(res=>{
		console.log(res)
		this.requesUser()

	})
},
//查询图书
requesUser(){
	this.$api.getbookShow({

	})
	.then(res=>{
		if(res){
		this.tableData=res.data
		}
	})
}

   }

}

</script>

<style lang='less' scoped>
#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

</style>
''