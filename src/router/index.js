import { createRouter, createWebHistory } from 'vue-router';


import Home from '../views/Home.vue';
import Register from '../components/Form/Register.vue';
import Login from '../components/Form/Login.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
