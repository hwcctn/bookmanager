// index.js
//网络请求方法放在这个文件


import path from "./path"
import axios from "../utils/request"
axios.defaults.withCredentials = true;
const api={
    getLogin(params){
        return axios.get(path.baseUrl+path.login,{ params: params })
    },
    getRegister(params){
        return axios.get(path.baseUrl+path.register,{ params: params })
    },
    getbookShow(){
        return axios.get(path.baseUrl+path. bookShow)
    },
    getbookSearch(params){
        return axios.get(path.baseUrl+path.searchBook,{ params: params })
    },
    getkindSearch(params){
        return axios.get(path.baseUrl+path.searchkind,{ params: params })
    },
    putbroBook(params){
        return axios.put(path.baseUrl+path.broBook, params)
    },
    postaddBook(params){
         return axios.post(path.baseUrl+path.addBook, params )
        // return  axios(
        //     {
        //         method: 'post',
        //         url: 'http://192.168.123.191:8080/book/add',
        //         headers: { 
        //         	'Content-Type': 'application/json'
                   
        //         },
        //         data :params
        //         }
        // )

        
    },
    putxiuBook(params){
        return axios.put(path.baseUrl+path.xiuBook,params)
    },
    delBook(params){
        return axios.delete(path.baseUrl+path.delBook, { data: params })
    },
    
    buildBook(params){
        return axios.post(path.baseUrl+path.buildBook,params)
    },
    returnBook(params){
        return axios.put(path.baseUrl+path.returnBook, params )
    },
    build2(params){
        return axios.post(path.baseUrl+path.build2, params)
    },
    build3Book(){
        return axios.get(path.baseUrl+path.build3Book)
    }, 
    questBook(params){
        return axios.post(path.baseUrl+path.questBook,{ params: params })
    },
    getusers(){
        return axios.get(path.baseUrl+path.user);
    }
}

   


export default api
   
