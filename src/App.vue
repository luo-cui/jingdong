<template>
  <!-- 使用首字母大写的标签更好表示标签就是组件 -->
  <!-- <HomeView /> -->
   <!-- 展示路由中的内容，根据路径不同展示不同的组件内容 -->
    <router-view />

</template>

<script>
// import HomeView from './views/home/HomeView.vue'
// import LoginView from './views/login/LoginView.vue'
export default {
  name: 'App',
  components: {
    // HomeView
    // LoginView
  }
}
</script>
