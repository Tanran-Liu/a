<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated } from '../main.js';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(user => user.username === username.value && user.password === password.value);

      if (user) {
        isAuthenticated.value = true;
        localStorage.setItem('isAuthenticated', 'true'); // 持久化认证状态
        router.push('/about'); // 登录成功后导航到受保护的页面
      } else {
        alert('Invalid username or password.');
      }
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.login h2 {
  margin-bottom: 20px;
}
.login div {
  margin-bottom: 15px;
}
</style>
