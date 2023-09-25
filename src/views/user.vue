<template>
  <div>用户</div>
  
    <el-table stripe border :data="tableData" style="width: 100%">
			<el-table-column prop="bookname" label="书名" width="180">
			</el-table-column>
			<el-table-column prop="brotime" label="借书日期">
			</el-table-column>
			<el-table-column prop="retime" label="还书日期">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click=" returnBook">还书</el-button>
					<el-button type="primary"   @click="questBook " >提出反馈</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<el-dialog title="确定还书日期"  v-model="suretime" width="30%"  height="30%" >
			
			<div >{{ dateString }}</div>
			<el-button @click="closesuretime">确定</el-button>
		</el-dialog>
		<el-dialog title="意见"  v-model="requsetview" width="30%"  height="30%" >
			
			<input type="text" v-model="RequestId">
			<el-button @click="closerequest">确定</el-button>
		</el-dialog>

</template>

<script>


export default {
data(){
 return{
  tableData:[],
  name:"user",
  RequestId:"",
  requsetview:false,
  suretime:false,
  user_id:localStorage.getItem("user_id"),
	}
	},
  methods:{
	questBook(){
		this.requsetview=true
			
		},
		closerequest(){
			this.$api.questBook({
				username:this.user_id,
				idea:this.RequestId
			}).then(res=>{
				console.log(res)
			})
			this.requsetview=false
		},
		returnBook(bookname){
			this.suretime=true
			this.$api.build2({
				log:"5",
				return_date:this.dateString
			}).then(res=>{
				console.log(res)
			})
			this.$api.returnBook({
				bookname:bookname
			}).then(res=>{
				console.log(res)
			})
		},
		closesuretime(){
			this.suretime=false
		},
		requesUser(){
			this.$api.getbookShow({

			})
			.then(res=>{
				this.tableData=res.data
			})
		}
	},
	

  }


</script>

<style lang='stylus' scoped>

</style>
