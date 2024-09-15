<template>
  <!-- 使用首字母大写的标签更好表示标签就是组件 -->
  <HomeView />
</template>

<script>
import HomeView from './views/home/HomeView.vue'
export default {
  name: 'App',
  components: {
    HomeView
  }
}
</script>
