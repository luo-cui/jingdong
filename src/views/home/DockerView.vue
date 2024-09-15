<template>
    <!-- 底部导航栏 -->
    <div class="docker">
    <!-- BEM命名规则 block__element--modifier -->
     <!-- docker__item 类总是会被添加到当前元素上，因为它的值是 true。
docker__item--active 类仅当 index（即当前项在 itemList 数组中的索引）等于 0 时才会被添加到元素上。 -->
    <div
        v-for="(item,index) in itemList"
        :key="item.icon"
        :class="{'docker__item':true, 'docker__item--active': index===0 }">
      <!-- 使用item.icon渲染图标,不是直接使用icon，item引用了每一个元素 -->
      <!-- <div class="iconfont">{{ item.icon }}</div>  无法显示图标，显示的是编码因为字符转义-->
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DockerView',
  setup () {
    const itemList = [
      { icon: '&#xe618;', title: '首页' },
      { icon: '&#xe60a;', title: '购物车' },
      { icon: '&#xe713;', title: '订单' },
      { icon: '&#xe610;', title: '我的' }
    ]
    return {
      itemList
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
/* 这个 .docker 元素将会：位于页面的最底部（bottom: 0;）、左侧边缘与页面左侧对齐（left: 0;）
宽度为 100%（即占据整个页面宽度）、高度为 .49rem。
顶部有一条 1px 的浅灰色实线。 */
.docker {
  display: flex; //使容器成为弹性容器
  position: absolute; //这个元素将从正常的文档流中移出，并根据其最近的一个已定位的祖先元素（具有 position 值为 relative, absolute, 或 fixed 的祖先元素）进行定位。如果不存在这样的祖先元素，则该元素相对于初始包含块（通常是 <html> 根元素）进行定位
  box-sizing: border-box; //Specifies the behavior of the 'width' and 'height' properties. 宽度和高度包括 padding 和 border；用于指定元素的宽度和高度计算方式,修改默认的不包括的情况
  padding: 0 0.18rem; //上下内边距为 0，左右内边距为 .18 倍根元素字体大小
  left: 0; //元素的左侧边缘与包含块的左侧边缘对齐
  bottom: 0;
  width: 100%; //即填充整个包含块的宽度
  height: 0.49rem;
  border-top: 1px solid $content-bgcolor; //元素的顶部边框为 1px 实线
  // & 表示 .docker
  &__item {
    flex: 1; // 均分等分;这个属性使得 .docker_item 元素在弹性容器（display: flex 的父容器）中均分剩余空间
    text-align: center; // 内部的文本居中对齐；title是其子元素，也会继承这一样式
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.2rem; //浏览器能够显示的是12px，如果想显示10px，需要转变下；但目前在谷歌设置10px之后是11.5;按照以下设置也是11.5
    transform: scale(0.5, 0.5); //缩放
    transform-origin: center top; //以顶部为中心进行缩放
  }
  color: $content-fontcolor;
}
/* 用sass风格写
.docker___item {
  flex: 1; // 均分等分
  text-align: center;
  .iconfont {
    margin: .07rem 0 .02rem 0;
    font-size: .18rem;
  }
}
.docker__item--active {
  color: #1fa4fc;
}
.docker__title {
  font-size: 20px; //浏览器能够显示的是12px，如果想显示10px，需要转变下；但目前在谷歌设置10px之后是11.5;按照以下设置也是11.5
  transform: scale(.5, .5); //缩放
  transform-origin: center top; //以顶部为中心进行缩放
} */
</style>
