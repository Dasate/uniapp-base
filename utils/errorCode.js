import { nav, toast, modal } from '@/utils';

// 状态码处理
function codeCheck(data, success, fail) {
  let code = parseInt(data.code)
  let err_code = parseInt(data.err_code) // token报错的时候，后台返的是err_code，并且不敢修改。。
  switch (err_code || code) {
    case 0: //成功
      success && success(data);
      break;
    case 50001:
    case 50002:
    case 50003:
    case 50004:
      fail && fail(data);
      let txt = ""
      if(uni.getStorageSync("token")){
        txt = "登录已过期，请重新登录"
      }else{
        txt = "请先登录"
      }
      uni.setStorageSync("token", "")
      modal({title:'提示',content:txt,showCancel:false}, ()=>{
        nav('/pages/login/login')
      })
      break;

    default:
      fail && fail(data);
      modal({title:'提示',content:data.msg|| '系统出错'})
      break;
  }
}


export default codeCheck
