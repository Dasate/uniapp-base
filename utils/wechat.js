import { $post } from './request'
import wx from 'weixin-js-sdk'

// 是否为微信浏览器
export function isWeixin(){
  let ua = navigator.userAgent.toLowerCase();
  let res = ua.indexOf('micromessenger') != -1;
  return res;
}

/**
 * 获取code
 * @param params {Object} config 参数
 * @param data {Object} 分享参数
 * @param callback {Function} 回调函数
 */
export function getWxCode(option, link){
  var appid = import.meta.env.VITE_APP_ID
  var url = link ? link.split("?")[0] : window.location.href.split("?")[0]
  for (var i in option) {
    if (i == "code" || i == "state") {
      continue;
    }

    if (url.indexOf("?") == -1) {
      url += ("?" + i + "=" + option[i])
    } else {
      url += ("&" + i + "=" + option[i])
    }

  }
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ appid +"&redirect_uri=" + encodeURIComponent(url) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
}


export function WechatConfig(callback) {
  const u = navigator.userAgent
  let url = ''
  // location.origin + location.pathname + location.search
  if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
    url = window.location.href
  } else {
    url = sessionStorage.getItem("url") || window.location.href
  }
  $post('/wx/sdk', { url: url }).then(resp => {
    const data = resp.data
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "chooseWXPay", "startRecord", "stopRecord", "playVoice", "uploadVoice"] // 必填，需要使用的JS接口列表
    });

    wx.ready(() => {
      if (callback) callback();
    });

    wx.error(err => {
      console.error("config fail:", err);
    });
  })
}

/**
 * 分享接口
 * @param data {Object} 分享参数
 * @param callback {Function} 回调函数
 */
export function WeChatShare(data, callback) {
  // WechatConfig(() => {
  //   console.log("分享内容", data);

    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    wx.updateAppMessageShareData({
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: data.imgUrl, // 分享图标
      success: function () {
        if (callback) callback();
      }
    });

    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData({
      title: data.title, // 分享标题
      link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: data.imgUrl, // 分享图标
      success: function () {
        if (callback) callback();
      }
    });
  // });
}

/**
 * 支付接口
 * @param paydata {Object} 微信支付签名参数
 * @param callback {Function} 回调函数
 */
export function WeChatPay(paydata){
  return new Promise((resolve, reject) => {
    wx.chooseWXPay({
      appId: paydata.appId,
      timestamp: paydata.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: paydata.nonceStr, // 支付签名随机串，不长于 32 位
      package: paydata.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***
      signType: paydata.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paydata.paySign, // 支付签名
      success: function (result) {
        resolve(result)
      },
      fail: function (err){
        reject(err)
      },
    })
  })
}

// 开始录音
export function WeChatStartRecord(){
  return new Promise((resolve, reject) => {
    wx.ready(function(){
      wx.startRecord({
        success: function(res) {
          // var tempFilePath = res.tempFilePath
          resolve(res)
        },
        fail: function(err) {
          //录音失败
          reject(err)
        }
      });
    })
  })
}

// 停止录音
export function WeChatStopRecord(){
  return new Promise((resolve, reject) => {
    wx.stopRecord({
      success: function (res) {
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    });
  })
}

/**
 * 上传录音文件
 * @param localId string 录音本地id
 *
 */
export function WeChatUploadVoice(localId){
  return new Promise((resolve, reject) => {
    wx.uploadVoice({
      localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        var serverId = res.serverId; // 返回音频的服务器端ID
        resolve(serverId)
      }
    });
  })
}


