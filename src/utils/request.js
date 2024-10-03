import axios from 'axios'
// 将get请求和post请求封装到用一实例中
const instance = axios.create({
  baseURL: 'http://www.nuanwan.com',
  timeout: 10000
})

/**
 * @description:接收所需参数，发送请求
 * @param {*} url
 * @param {*} data 默认为空对象
 * @param {*} config 添加配置项
 * @return {*}
 */
/* export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    // 原先有2种请求；封装到同一实例中；从axios.post()修改为instance.post()
    axios.post(url, data, {
      // baseURL: 'http://www.nuanwan.com', // 无效,api 请求的是127.0.0.1:8080/api/xxx
      // 原先的后端发送post时候要求此请求头
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
      .then((res) => {
        resolve(res)
      }, err => {
        reject(err)
      })
  })
}
 */

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, params)
      .then((res) => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}
