<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img">
    <!-- 2个多层的输入框，为撑开必要的高度有嵌套的容器 -->
    <div class="wrapper__input">
      <input  class="wrapper__input__content" placeholder="请输入手机号"/>
    </div>
    <div class="wrapper__input">
      <input  class="wrapper__input__content" placeholder="请输入密码"/>
    </div>
    <!-- button非其子类，用其他符号做语义上的间隔 -->
     <div class="wrapper__login-button" @click="handleLogin">登录</div>
     <div class="wrapper__login-link">立即注册</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'LoginView',
  setup () {
    const router = useRouter()
    const handleLogin = () => {
      localStorage.isLogin = true
      // 告知路由，登录之后做页面的跳转
      // 参数：字符串路径、对象路径-命名路由、带参数的对象-传参
      router.push({ name: 'HomeView' })
    }

    return {
      handleLogin
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
.wrapper{
  // 使用绝对定位让其垂直居中
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);//使用 CSS transform 属性将 .wrapper 沿 Y 轴向上移动 50% 的自身高度
  &__img{
    display: block;//变成一个块元素之后再设置margin
    margin: 0 auto .4rem auto;//水平居中，下边保留40px
    width: .66rem;
    height: 0.66rem;
  }
  &__input{
    height: .48rem;
    margin:0 .4rem .16rem .4rem ;
    padding: 0 .16rem;
    background: #F9F9F9;
    border: .01rem solid rgba(0,0,0,0.10);
    border-radius: .06rem;
    border-radius:.06rem;
    &__content{
      width: 100%;
      border: none;
      outline: none;//去除掉边框
      line-height: .48rem;
      background: none;
      // input框中的字体颜色，下面是placeholder的字体颜色
      color: $content-notice-fontcolor;
      &::placeholder{
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button{
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32); //有透明度的颜色
    border-radius: .04rem;
    border-radius: .04rem;
    color:#fff;
    font-size: .16rem;
    text-align: center; //按钮中的文本居中
  }
  &__login-link{
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor
  }
}
</style>
