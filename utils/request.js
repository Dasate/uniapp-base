import codeCheck from './errorCode.js'
import { loading, loadEnd } from '@/utils'
import { useUserStore } from '@/store/user.js';
/**
 ** url：地址
 ** data: 参数
 ** option: 配置
 ** success: 成功的回调函数
 ** fail：失败的回调函数
 ** todo: 自定义接口调用成功的状态码判断方法(delete)
 **/
const request = function (url, data, method, hideLoad, success, fail) {
  !hideLoad && loading();
  let dataType = 'json';
  let responseType = 'text';
  let apiUrl
  // #ifndef H5
  apiUrl = import.meta.env.VITE_API_HOST + url
  // #endif
  // #ifdef H5
  apiUrl = '/api' + url;
  // #endif

  let token = useUserStore().token
  uni.request({
    url: apiUrl,
    data: data,
    method: method,
    dataType: dataType,
    responseType: responseType,
    header: {
      'content-type': 'application/json',
      'X-Token': token
    },
    success: function (res) {
      !hideLoad && loadEnd();
      codeCheck(res.data, success, fail);
    },
    fail: function (err) {
      !hideLoad && loadEnd();
    }
  })
}

export function $get(url, data = {}, hideLoad) {
  return new Promise((resolve, reject) => {
    request(url, data, 'GET', hideLoad, res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

export function $post(url, data = {}, hideLoad) {
  return new Promise((resolve, reject) => {
    request(url, data, 'POST', hideLoad, res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

export function $del(url, data, hideLoad) {
  return new Promise((resolve, reject) => {
    request(url, data, 'DELETE', hideLoad, res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

export function $put(url, data, hideLoad) {
  return new Promise((resolve, reject) => {
    request(url, data, 'PUT', hideLoad, res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

export function $all(reqList) {
  return new Promise(resolve => {
    Promise.all(reqList).then(res => {
      resolve(res)
    })
  })
}