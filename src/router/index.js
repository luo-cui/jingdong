import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    // 已登录之后还能访问登录页面是错误的；在这里进行验证
    // beforeEnter (to, from, next) {} 只有访问这个页面之前才会触发此函数；在这里写入逻辑
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      // 如果已经登录，跳转到home页面
      isLogin ? next({ name: 'HomeView' }) : next()
      // if (isLogin) {
      //   next({ name: 'HomeView' })
      // } else {
      //   next() // 正常地展示当前页面即可
      // }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/** 导航守卫
 * 每次做路由跳转之前都会执行此方法
 *  @description
    (method) Router.beforeEach(guard: NavigationGuardWithThis<undefined>): () => void
    Add a navigation guard that executes before any navigation. Returns a function that removes the registered guard.
    @param guard — navigation guard to add
    * 在之前的 Vue Router 版本中，还可以使用 第三个参数 next 。这是一个常见的错误来源，我们经过 RFC 讨论将其移除。然而，它仍然是被支持的，这意味着你可以向任何导航守卫传递第三个参数
    // next(false):中断当前的导航，并确保整个导航被取消
    // next('/') 或 next({ path: '/' }):重定向到一个新的位置
 */
router.beforeEach((to, from, next) => {
  // 判断是否已登录；如果已登录让你访问相关页面；否则跳转到登录页面
  // 单纯判断isLogin会死循环
  // const isLogin = false // 从本地存储里取这个状态
  // 如果即将跳转的页面是Login也可以让其访问，避免死循环
  // 代码重构
  // tag 1 对isLogin 进行解构赋值 2 重构为三元运算
  // const isLogin = localStorage.isLogin
  const { isLogin } = localStorage
  // isLogin || to.name === 'LoginView' ? next() : next({ name: 'LoginView' }) 也可以
  isLogin || to.name === 'LoginView'
    ? next()
    : next({ name: 'LoginView' })
  /*   if (isLogin || to.name === 'LoginView') {
  // 如果已登录或即将跳转的页面是 LoginView，则允许导航继续
    next()
  } else {
    next({ name: 'LoginView' })
  } */
  // console.log(to, from)
  // next() // 正常继续执行
})

export default router
