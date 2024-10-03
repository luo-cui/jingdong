module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭驼峰命名规则 使用之后eslint无法正常检查其他错误
    // 'vue/multi-word-component-names': 0
    // 关闭对单个单词组件名称的限制
    'vue/multi-word-component-names': 'off'
  }
}
