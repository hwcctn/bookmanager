import { createRouter, createWebHashHistory } from 'vue-router'
import  register  from '../components/register.vue'
import login from '../components/login.vue'
import head from '../components/head.vue'
import manager from '../views/manager.vue'

import bookUser from '../views/bookUser.vue'

const routes = [
  {
    path:"/",
    name:"head",
    component:head,
    children:[
      {
        path: '/manager',
        name: 'manager',
        component: manager
      },
     
      {
        path:'/bookUser',
        name:'bookUser',
        component: bookUser
      },
      {
        path:'/historicRecords',
        name:'historicRecords',
        component:()=>import("../views/historicRecords.vue")
      }

    ]
  },

{
    path:"/register",
    name:"register",
    component:register
},
{
    path:"/login",
    name:"login",
    component:login
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
    console.log(to)
    console.log(from)
    let token=localStorage.getItem("token")
    if(token||to.path==="/login"){
        next()
    }
    else{
    next("/login")
    }

}) 
export default router
