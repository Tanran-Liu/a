import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import AccessDenied from '../views/AccessDenied.vue';
import LoginView from '../views/LoginView.vue';
import { isAuthenticated } from '../main.js';
import FirebaseSigninView from '../views/FirebaseSigninView.vue';
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue';
import WeatherView from '../views/WeatherView.vue';
import AddBookView from '../views/AddBookView.vue';
import CountBookAPI from '../views/CountBookAPI.vue';
import GetAllBookAPI from '../views/GetAllBookAPI.vue';

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      // 路由守卫，检查用户是否已登录
      if (!isAuthenticated.value) {
        next('/accessDenied'); // 如果未登录，跳转到 AccessDenied 页面
      } else {
        next(); // 允许访问
      }
    }
  },
  {
    path: '/accessDenied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes // 传递路由配置
});

export default router;
