<template>
      <!-- 附近店铺是个列表；列表中的每一项的内容列出 -->
      <div class="nearby">
      <h3>附近店铺</h3>
      <div v-for="item in nearbyList" :key="item._id" class="nearby__item">
        <img :src="item.imgUrl" class="nearby__item__img">
        <div class="nearby__content">
          <div class="nearby__content__title">{{item.name}}</div>
          <div class="nearby__content__tags">
            <!-- 从接口的内容来看不能使用循环了，每个字段都是独立的 -->
            <span class="nearby__content__tag">月售{{item.sales}}</span>
            <span class="nearby__content__tag">起送¥{{item.expressLimit}}</span>
            <span class="nearby__content__tag">基础运费¥{{item.expressPrice}}</span>
            <!--<span
              class="nearby__content__tag"
              v-for="(innerItem,innerIndex) in item.tags"
              :key="innerIndex">{{innerItem}}
            </span> -->
            <!-- 内部也可以转为嵌套循环 -->
            <!-- <span class="nearby__content__tag">{{item.tags[1]}}</span>
            <span class="nearby__content__tag">{{item.tags[2]}}</span> -->
          </div>
          <p class="nearby__content__highlight">{{item.slogan}}</p>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request.js'
const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const res = await get('http://www.nuanwan.com/api/shop/hot-list.json')
    console.log('Response:', res)
    // 后者判断 res的data有无数据
    if (res?.errno === 0 && res?.data?.length) {
      nearbyList.value = res.data
    }
  }
  // 将数据、逻辑导出
  return { getNearbyList, nearbyList }
}
export default {
  name: 'NearbyView',
  setup () {
    // 删除掉所有写死的数据
    /*     const nearbyList = [
      {
        // 设置了id
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售1万+', '起送¥0', '基础运费¥5'],
        desc: 'VIP尊享满89元减4元运费券（每月3张）'
      }
    ] */
    const { getNearbyList, nearbyList } = useNearbyListEffect()
    getNearbyList()
    return {
      nearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
.nearby{
  &__title{
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  &__item{
    display: flex;
    padding-top: .12rem; //每个item之间有12px的间隔
    &__img{
      margin-right: .16rem;
      width: .56rem;
      height: .56rem;
    }
  }
  &__content{
    flex: 1; //todo
    padding-bottom: .12rem;
    border-bottom: 1px solid $content-bgcolor;
    &__title{
      line-height:.22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__tags{
      margin-top: .08rem;
      line-height:.18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }
    &__tag{
      margin-right: .16rem;
    }
    &__highlight{
      // margin-top: .08rem; //为了清除p元素本身自带的外边距
      margin: .08rem 0 0 0;
      color: #E93B3B;
      line-height:.18rem;
      font-size: .13rem;
    }
  }
}
</style>
