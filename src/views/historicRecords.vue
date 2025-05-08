<template>
  <div>
    <el-table stripe border :data="tableData"  style="width: 100%"   >
		
			<el-table-column prop="userId" label="userId" width="180" >
			</el-table-column>
			<el-table-column prop="bookId" label="书的id">
			</el-table-column>
			<el-table-column prop="borrowDate" label="借书时间" >
			</el-table-column>
			<el-table-column prop="returnDate" label="还书时间" >
			</el-table-column>
			<el-table-column label="状态" >
				
				<template #default="scope" >
					<div v-if="scope.row.state === '未还书'">未还书</div>
					<div v-if="scope.row.state === '已还书'">已还书</div>
				</template>
				
				
			</el-table-column>

		</el-table>
		
  </div>
</template>

<script>
export default {
	data(){
	/* const currentDate = new Date();
    const dateString = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    const user_id=localStorage.getItem("user_id"); */
	return{
		/* suretime:false,
		currentDate,
		dateString,
		user_id, */
		tableData:[],
		
		
	}
},
mounted(){
		this.$api.build3Book({
			
			}).then(res=>{
				this.tableData=res.data
			}).catch(error => {
      console.error('API request failed:', error);
      // 这里可以添加错误处理逻辑    
	});
}
	}

	

</script>

<style lang='stylus' scoped>

</style>

