import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { ref } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

const hardcodedUser = {
  username: "test_user",
  password: "Test@1234",
  isAustralian: false,
  gender: "male",
  reason: "Testing purposes"
};


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*
const firebaseConfig = {
  apiKey: "AIzaSyCKM8E62mC0Ww4K8QwpNdwtyBB_bRaNVaY",
  authDomain: "week7-tanran-liu.firebaseapp.com",
  projectId: "week7-tanran-liu",
  storageBucket: "week7-tanran-liu.appspot.com",
  messagingSenderId: "858298378773",
  appId: "1:858298378773:web:07b08014487c8334c6bc1c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
*/
const initializeUsers = () => {
  // 获取当前存储的用户列表
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // 检查硬编码用户是否已经存在
  const userExists = users.find(user => user.username === hardcodedUser.username);
  
  if (!userExists) {
    // 如果硬编码用户不存在，将其添加到用户列表并存储
    users.push(hardcodedUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('硬编码用户已添加:', hardcodedUser);
  } else {
    console.log('硬编码用户已存在:', hardcodedUser);
  }
};

// 创建认证状态
export const isAuthenticated = ref(false);

// 从 localStorage 恢复认证状态
if (localStorage.getItem('isAuthenticated') === 'true') {
  isAuthenticated.value = true;
}

const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);

app.mount('#app');

initializeUsers();