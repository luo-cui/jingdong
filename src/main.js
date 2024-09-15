import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 安装  'normalize.css'-抹平各个浏览器之间的样式差异
import 'normalize.css'

// 导入基本样式
// import './style/base.scss'
// 导入iconfont
// import './style/iconfont.css'
// 前两者均整合并使用 index.scss导入即可
import './style/index.scss'

createApp(App).use(store).use(router).mount('#app')
