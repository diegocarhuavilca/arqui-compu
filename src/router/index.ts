import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import userListVue from '@/components/userList.vue'
import userCreate from '@/components/userCreate.vue'
import userEditVue from '@/components/userEdit.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path:'',
        name:'userList',
        component: userListVue
      },{
        path:'create',
        name:'userCreate',
        component: userCreate
      },{
        path:'edit',
        name:'userEdit',
        component: userEditVue
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
