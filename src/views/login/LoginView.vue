<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img">
    <!-- 2个多层的输入框，为撑开必要的高度有嵌套的容器 -->
    <div class="wrapper__input">
      <input v-model="username"  class="wrapper__input__content" placeholder="请输入用户名"/>
    </div>
    <div class="wrapper__input">
      <input  v-model="password" class="wrapper__input__content" placeholder="请输入密码" type="password" autocomplete="new-password"/>
    </div>
    <!-- button非其子类，用其他符号做语义上的间隔 -->
     <div class="wrapper__login-button" @click="handleLogin">登录</div>
     <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
     <!-- tag 不同的组件传递给toast组件；此时Login作为父组件 -->
     <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
// import axios from 'axios'
import { get } from '../../utils/request.js'
import Toast, { useToastEffect } from '../../components/Toast.vue'

/* 将toast相关的内容封装到这里
    修改弹窗的数据、逻辑都在此函数,而setup函数只关注主流程
    更新：再抽取到 toast组件中
const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastData.showToast = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 2000)
  }
  return { toastData, showToast }
} */
// 将showToast函数传入
const useLoginEffect = (showToast) => {
  // 数据拿上来
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const { username, password } = toRefs(data)

  function removeComments (jsonString) {
    return jsonString.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*\n/g, '')
  }
  const handleLogin = async () => {
    try {
      // todo 这个校验如何完善
      // if (data.username.trim() === '' || data.password.trim() === '') {
      //   showToast('请输入用户名和密码')
      //   return
      // }
      // 如果将baseUrl配置后无法实现跨域、无法识别报错信息404
      const res = await get('http://www.nuanwan.com/api/user/login.json', {
        params: {
          username: data.username,
          password: data.password
        }
      })
      //  const res = await post('/api/user/login', {
      //     username: data.username,
      //     password: data.password
      //   })
      console.log('Response:', res)
      // 移除字符串中的注释
      const cleanedData = removeComments(res)
      // 解析为 JSON 对象
      const parsedData = JSON.parse(cleanedData)
      console.log('Parsed Data:', parsedData)
      // 处理登录成功和失败的情况
      if (parsedData.errno === 0) {
        // 登录成功，将登录状态保存到本地
        // localStorage.setItem('isLogin', true)
        localStorage.isLogin = true
        router.push({ name: 'HomeView' })
      } else {
        // console.error('登录失败:', parsedData.message || '未知错误')
        showToast('登录失败')
      }
    } catch (error) {
      showToast('请求失败')
      /*         data.showToast = true
        data.toastMessage = '请求失败'
        setTimeout(() => {
          data.showToast = false
          data.toastMessage = ''
        }, 2000)
        console.error('请求失败:', error) */
    }
  }
  return { username, password, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'RegisterView' })
  }
  return { handleRegisterClick }
}
export default {
  name: 'LoginView',
  components: { Toast },
  setup () {
    // 修改后整个setup函数的逻辑比较清晰-代码执行的流程
    // const router = useRouter()
    // axios.defaults.headers.get['Content-Type'] = 'application/json ' 已配置在所封装的请求函数中
    // 将 reactive的数据转换成多个ref数据
    // 一个包含了toast数据和逻辑的函数
    const { show, toastMessage, showToast } = useToastEffect()
    // 一个包含了login数据和逻辑的函数
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()

    // 抽取出showtoast，因为显示信息在多个失败的条件分支中需要使用
    /*     const showToast = (message) => {
      data.showToast = true
      data.toastMessage = message
      setTimeout(() => {
        data.showToast = false
        data.toastMessage = ''
      }, 2000)
    } */
    // const handleLogin = () => {
    //   // localStorage.isLogin = true
    //   // // 告知路由，登录之后做页面的跳转
    //   // // 参数：字符串路径、对象路径-命名路由、带参数的对象-传参
    //   // router.push({ name: 'HomeView' })
    //   // 真实场景：发送请求进行校验
    //   // 传递与不传递参数都是请求失败--错误信息：跨域问题
    //   // 请求发送格式有无,返回的数据无法解析
    //   axios.get('http://www.nuanwan.com/api/user/login', {
    //     username: data.username,
    //     password: data.password
    //   }
    //   ).then((response) => {
    //     console.log('Response:', response)
    //     alert('登录成功')
    //   }).catch((error) => {
    //     console.error('Error:', error)
    //     alert('登录失败')
    //   })
    // }
    // vue3支持syanc-await
    // bug 提取返回的数据失败 json文件中的注释；结构解析问题、属性名字使用了双引号
    // const handleLogin = async () => {
    //   const res = await axios.get('http://www.nuanwan.com/api/user/login.json', {
    //     username: data.username,
    //     password: data.password
    //   })
    //   // 如果result 有data，data里有 errno，而且errno ===0 ，再执行逻辑;判空校验
    //   // 登录成功
    //   if (res?.data?.errno === 0) {
    //     // 登录成功，将登录状态保存到本地
    //     localStorage.isLogin = true
    //     router.push({ name: 'HomeView' })
    //   } else {
    //     alert('登录失败')
    //   }
    // }

    // 解决方案1
    // 直接使用json文件接口请求无法成功请求，多走2步，去除原json文件中的注释-eslin的限制,解析json
    // 移除 JSON 字符串中的注释
    // todo 由于接口变化，这块需要重新整理

    return {
      handleLogin,
      handleRegisterClick,
      username,
      password,
      show,
      toastMessage
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
