<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   }
  // },
  // 数组中的元素是属性的名称，父组件上使用子组件的时候绑定的属性
  props: ['message'],
  setup () {
    return {}
  }
}

export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { show, toastMessage } = toRefs(toastData)
  return { show, toastMessage, showToast }
  // <Toast v-if="show" :message="toastMessage" /> 在父组件中有使用到
}

</script>

<style lang="scss" scoped>
.toast{
  position: fixed;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  padding: .1rem;
  background: rgba(0,0,0,.35);
  border-radius: .05rem;
  color:#FFF;
}

</style>
