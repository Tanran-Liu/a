<script>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import LibraryRegistrationForm from './views/HomeView.vue'
import router from './router';
import CountBookAPI from "./views/CountBookAPI.vue";

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI';
    }
  }
};
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>

    <main class="main-box">
      <!--<LibraryRegistrationForm />-->
      <!-- <JSONLab /> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>
