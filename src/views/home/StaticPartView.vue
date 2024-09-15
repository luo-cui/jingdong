<template>
 <div class="position">
      <span class="iconfont position__icon">&#xe7f1;</span>
      珠海市香洲区唐家镇港湾一号科技园区
      <span class="iconfont position__notice">&#xe74a;</span>
    </div>
    <div class="search">
      <span class="iconfont">&#xe6a0;</span>
      <span class="search__text">山姆会员商店</span>
    </div>
    <div class="banner">
      <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      />
    </div>
    <div class="icons">
      <div v-for="item in iconList" :key="item.desc" class="icons__item">
        <!-- 模板字符串：$ -->
        <img
          class="icons__item__img"
          :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
        />
        <p class="icons__item__desc">{{ item.desc }}</p>
      </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘焙蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return {
      iconList
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/variable.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem; //Determines the block-progression dimension of the text content area of an inline box.
  font-size: 0.16rem;
  margin-right: 0.24rem; //右边bell约 .2rem
  @include ellipse;
  // 原先使用 &__icon 但编译出来的css的结果不对
  .position__icon {
    position: relative;
    top: 0.01rem; //这个属性将元素相对于元素本身的位置进行向上移动 .01rem 的距离。
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem; //加上内边距的.16rem
    font-size: 0.2rem;
  }
  color: $content-fontcolor;
}
.search {
  line-height: 0.32rem;
  background: #f5f5f5;
  border-radius: 16px;
  font-size: 0.14rem;
  .iconfont {
    font-size: 0.2rem;
    display: inline-block; //让它们在一行，不换行
    padding: 0 0.08rem 0 0.16rem;
  }
  &__text {
    display: inline-block;
    color: #b7b7b7;
    // font-size: .16rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%; //图片的高宽比，先事先撑开一定的高度，防止抖动
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap; //内容显示一行放不下时换行
  &__item {
    margin-top: 0.16rem;
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto; //居中
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  margin: 0 -0.18rem; //往外撑，一整行
  height: 0.1rem;
  background: $content-bgcolor;
}

</style>
