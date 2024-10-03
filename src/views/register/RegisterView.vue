<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img">
    <div class="wrapper__input">
      <input v-model="username" class="wrapper__input__content" placeholder="请输入用户名" />
    </div>
    <div class="wrapper__input">
      <input v-model="password" class="wrapper__input__content" placeholder="请输入密码" type="password"/>
    </div>
    <div class="wrapper__input">
      <input v-model="ensurement" class="wrapper__input__content" placeholder="确认密码" type="password"/>
    </div>
    <!-- 注册成功后跳转到 登录页 -->
     <div class="wrapper__register-button"  @click="handleRegitser">注册</div>
     <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
     <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request.js'
import Toast, { useToastEffect } from '../../components/Toast.vue'
const useRegisterEffect = (showToast) => {
  // 数据拿上来
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })

  function removeComments (jsonString) {
    return jsonString.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*\n/g, '')
  }
  const handleRegitser = async () => {
    try {
      // 如果将baseUrl配置后无法实现跨域、无法识别报错信息404
      const res = await get('http://www.nuanwan.com/api/user/register.json', {
        params: {
          username: data.username,
          password: data.password,
          ensurement: data.ensurement
        }
      })
      // 移除字符串中的注释
      const cleanedData = removeComments(res.data)
      // 解析为 JSON 对象
      const parsedData = JSON.parse(cleanedData)
      console.log('Parsed Data:', parsedData)
      if (parsedData.errno === 0) {
        router.push({ name: 'LoginView' })
      } else {
        showToast('注册失败')
      }
    } catch (error) {
      showToast('发送请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegitser }
}

// todo 不同组件的名字相似的函数
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    // 跳转到登录页面
    router.push({ name: 'LoginView' })
  }
  return { handleLoginClick }
}

export default {
  name: 'RegisterView',
  components: { Toast },
  setup () {
    // const router = useRouter()
    const { show, toastMessage, showToast } = useToastEffect()
    // 忘记传参会导致报错 showToast is not a function
    const { username, password, ensurement, handleRegitser } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    // const handleLoginClick = () => {
    //   // 跳转到登录页面
    //   router.push({ name: 'LoginView' })
    // }
    return {
      show,
      toastMessage,
      showToast,
      username,
      password,
      ensurement,
      handleRegitser,
      handleLoginClick
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
  &__register-button{
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
  &__register-link{
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor
  }
}
</style>
