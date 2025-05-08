<template>
	<div>
		<el-form-item label="搜索方式">
			<el-select v-model="searchFunction" placeholder="请选择你的搜索方式">
				<el-option label="按名查找" value="1" />
				<el-option label="按类查找" value="2" />
			</el-select>
		</el-form-item>
		<el-row style="padding: 20px;">

			<el-col :span="10">
				<el-input v-model="input" placeholder="请输入书名"></el-input>
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="6">
				<el-button type="primary" @click='searchUser'><el-icon>
						<Search />
					</el-icon>搜索</el-button>
			</el-col>

		</el-row>
		<el-table stripe border :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="id" width="180">
			</el-table-column>
			<el-table-column prop="bookname" label="书名">
			</el-table-column>
			<el-table-column prop="brief" label="简介">
			</el-table-column>
			<el-table-column prop="state" label="状态">
			</el-table-column>
			<el-table-column label="操作">

				<template #default="scope">
					<el-button type="primary" v-if="scope.row.state === '未借阅'"
						@click="broBook(scope.row.bookname, scope.row.id)">借阅</el-button>
					<el-button type="success" color="#626aef" v-else
						@click=" returnBook(scope.row.id)">还书</el-button>
					<el-button type="primary" color="darkseagreen" @click="questBook" icon="Edit">提出反馈</el-button>
				</template>

			</el-table-column>

		</el-table>
		<el-dialog title="确定借书时间" v-model="suretimeBro" width="30%" height="30%">

			<el-form-item label="borrow_date">
				<el-date-picker v-model="borrow_date" type="date" placeholder="Pick a date" clearable />
			</el-form-item>
			<el-form-item label="expiration_date">
				<el-date-picker v-model="expiration_date" type="date" placeholder="Pick a date" clearable />
			</el-form-item>
			<el-button @click="closesuretimeviewBro">确定</el-button>
		</el-dialog>
<!-- 
		<el-dialog title="检查借阅是否成功" v-model="checkVisible" width="30%" height="70%">

			<div>{{ broBookcheck }}</div>
			<el-button @click="closecheck">确定</el-button>

		</el-dialog>
 -->
		<el-dialog title="确定还书日期" v-model="suretime" width="50%" height="50%">

			<div>{{ dateString }}</div>
			<el-button @click="closesuretime">确定</el-button>
		</el-dialog>

		<el-dialog title="意见" v-model="requsetview" width="30%" height="30%">
			
			<el-input v-model="RequestId" :rows="6" maxlength="50" placeholder="Please input" show-word-limit type="textarea" />
			<div style="margin: 20px 0" />
			<el-button @click="closerequest">确定</el-button>
		</el-dialog>

	</div>
</template>

<script>

import { toRaw } from 'vue';
export default {
	name: "bookUser",
	data() {
		return {
			searchFunction: "1",
			input: "",
			tableData: [],
			/* checkVisible: false, */
			broBookcheck: "",
			borrow_date: "",
			expiration_date: "",
			suretime: false,
			dialogTableVisible: false,
			RequestId: "",
			requsetview: false,
			suretime: false,
			dateString: "",
			suretimeBro: false,
			user_id: localStorage.getItem("user_id"),
			nowbookid:0,
			allhistory:[],
		}
	},
	mounted() {

		this.getNowTime()
		this.requesUser()
	},
	methods: {
		requesUser() {
			this.$api.getbookShow({

			})
				.then(res => {
					if (res) {
						this.tableData = res.data
					}
				})
		},
		getNowTime() {
		  let dt = new Date() 
		 
			let y = dt.getFullYear()
			let mt = (dt.getMonth() + 1).toString().padStart(2, '0')
			let day = dt.getDate().toString().padStart(2, '0')

			this.dateString = y + "-" + mt + "-" + day
		 	console.log('此刻时间', this.dateString) 
		},
		handletime(dt){
			let y = dt.getFullYear()
			let mt = (dt.getMonth() + 1).toString().padStart(2, '0')
			let day = dt.getDate().toString().padStart(2, '0')

		return   y + "-" + mt + "-" + day
		},
		searchUser() {
			if (this.searchFunction === "1") {
				this.$api.getbookSearch({
					bookname: this.input
				})
					.then(res => {
						console.log(res)
						this.tableData = res.data
					})
			}
			if (this.searchFunction === "2") {
				this.$api.getkindSearch({
					name: this.input
				})
					.then(res => {
						console.log(res)
						this.tableData = res.data
					})
			}
		},
		broBook(bookname, id) {
			this.nowbookid=id
			console.log(bookname)
			this.$api.putbroBook({
				id:id
			}).then(res => {
				console.log(res)
				this.broBookcheck = res.data

			})
			
			this.suretimeBro = true
		},

		closecheck() {
			this.checkVisible = false
			this.requesUser()
		},
		 closesuretimeviewBro() {
			
			let user_id = localStorage.getItem("user_id")
			
				this.$api.buildBook({
					userId: parseInt (user_id),
					bookId: this.nowbookid,
					borrowDate: this.handletime(this.borrow_date),
					expirationDate: this.handletime(this.expiration_date)
					
				})
			this.suretimeBro = false
			this.requesUser()
		}, 
		questBook() {
			this.requsetview = true

		},
		closerequest() {
			this.$api.questBook({
				username:this.user_id,
				idea: this.RequestId
			}).then(res => {
				console.log(res)
			})
			this.requsetview = false
		},
		returnBook(id) {
			this.getNowTime()
			this.$api.returnBook({
				id:id
			}).then(res => {
				console.log(res)
			})
			this.suretime = true,

			this.$api.build3Book({
			
		}).then(res=>{
			this.allhistory=res.data;
			console.log(toRaw(this.allhistory))
		}).catch(error => {
  console.error('API request failed:', error);
		})
		console.log( toRaw(this.allhistory));
		let logindex=this.allhistory.lastIndexOf(item=>item.bookId=id);
		console.log(logindex);
		
		/* let log=this.allhistory[logindex].log; */

			this.$api.build2({
				/* log:log, */
				returnDate: this.dateString
			}).then(res => {
				console.log(res)
			})
			

		},
		closesuretime() {
			this.suretime = false
			this.requesUser()
		},
	},

}

</script>



