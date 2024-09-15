<template>
  <!-- 页面主体部分 -->
  <div class="wrapper">
    <StaticPartView />
    <NearbyView />
  </div>
  <DockerView />
</template>

<script>
import StaticPartView from './StaticPartView.vue'
import NearbyView from './NearbyView.vue'
import DockerView from './DockerView.vue'
export default {
  name: 'HomeView',
  components: {
    StaticPartView,
    NearbyView,
    DockerView
  }
}
</script>
<style lang="scss">
.wrapper {
  overflow-y: auto; //可以纵向滚动
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0.5rem; //将底部导航所占空间留出
  right: 0;
  // background: blue;f
  // 左右留出.18
  padding: 0 0.18rem .2rem .18rem; //在页面滑动到最底部之后有较多留白
}
</style>
