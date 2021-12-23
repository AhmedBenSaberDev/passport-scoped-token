import { createRouter, createWebHistory } from 'vue-router';


import Home from '../views/Home.vue';
import Register from '../components/Form/Register.vue';
import Login from '../components/Form/Login.vue';
import Forgot from '../components/Forgot/Forgot.vue';
import store from '../store/index';
import Reset from '../components/Forgot/ResetPassword.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/register',
    name:'register',
    component:Register,
  },
  {
    path:'/login',
    name:'login',
    component:Login,
    beforeEnter: (from,to,next) => {
      if(store.getters['user'] == null)
      {
        next()
      }else{
        next({name:'home'})
      }
    }
  },{
    path:'/forgot',
    name:'forgot',
    component:Forgot
  },
  {
    path:'/reset/:token',
    name:'reset',
    component:Reset
  },
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
