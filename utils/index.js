import moment from 'moment'
// 页面跳转
const navToIndex = (cb1, cb2) => {
  nav('index', '', cb1, cb2);
}
export function nav(page_path, type, cb1, cb2) {
  /* page_path 页面路径或特殊页面*/
  /* index---关闭所有页面返回首页 */
  /* back或4---返回type个页面栈或type的页面路径 */
  /* 页面路径 用type的方式跳转*/
  /* 4或back---navigateBack 关闭当前页面，返回上一页面或多级页面。*/
  /* ---------------------------------------------------- */
  /* type 跳转类型【无switchTab，因为模拟的tabbar】*/
  /* 1或nav---navigateTo 【默认】保留当前页面，跳转到应用内的某个页面 */
  /* 2或red---redirectTo 关闭当前页面，跳转到应用内的某个页面。 */
  /* 3或rel或reL---reLaunch  关闭所有页面，打开到应用内的某个页面。*/
  /* 任意正整数---page_path=4或back 关闭当前页面，返回该值页面数。 */
  /* 页面路径---page_path=4或back 关闭当前页面，返回倒数第一个该路径，无则跳转。 */
  /* ---------------------------------------------------- */
  /* cb1 成功回调*/
  /* cb2 失败回调 返回err信息*/
  /* 例如 */
  /* nav('index', '', cb1, cb2)  nav('index');返回首页 */
  /* nav('/pages/test/test')  nav('/pages/test/test',1) 跳转test*/
  /* nav('/pages/test/test',2) 关闭当前页并跳转test*/
  /* nav('/pages/test/test','rel') 关闭所有页并跳转test*/
  /* nav('back') 返回上一页*/
  /* nav('back',3) 返回前3页*/
  if (!page_path) {
    toast('参数异常，请检查');
    return;
  }
  let navType = '';
  let navObj = {
    success() {
      cb1 && cb1()
    },
    fail(err) {
      console.log(err);
      cb2 && cb2(err)
    }
  }
  if (page_path == 'index') {
    navType = 'reLaunch'
    navObj.url = '/pages/index/index';
  } else {
    if (page_path === 4 || page_path === 'back' || page_path === 'Back') {
      navType = 'navigateBack';
      const pages = getCurrentPages();
      if (!type) {
        if (pages.length > 1) {
          navObj.delta = 1;
        } else {
          navToIndex();
          return;
        }
      } else {
        if (typeof type === 'number') {
          if (pages.length > type) {
            navObj.delta = type;
          } else {
            navToIndex();
            return;
          }
        } else if (typeof type === 'string') {
          if (~type.search('/pages')) {
            let index = pages.findIndex(v => '/' + v.route === type);
            if (index != -1) {
              navObj.delta = pages.length - 1 - index;
            } else {
              navType = 'redirectTo'
              navObj.url = type;
            }
          } else {
            toast('路径异常，请检查');
            return;
          }
        } else {
          toast('参数异常，请检查');
          return;
        }
      }
    } else {
      if (!type || type === 1 || type === 'nav') {
        navType = 'navigateTo';
        navObj.url = page_path;
      } else if (type === 2 || type === 'red') {
        navType = 'redirectTo';
        navObj.url = page_path;
      } else if (type === 3 || type === 'rel' || type === 'reL') {
        navType = 'reLaunch';
        navObj.url = page_path;
      }
    }
  }
  uni[navType](navObj);
}

// 简易提示框
export function toast(msg = '提示', duration = 3000) {
  setTimeout(() => {
    uni.showToast({
      title: msg,
      icon: 'none',
      duration: duration
    })
  }, 10)
}

//确认框
export function modal(obj, cb_confirm, cb_cancel) {
  const {
    title = "提示",
    content = "",
    showCancel = true,
    cancelText = "取消",
    confirmText = "确定",
    cancelColor = "#848484",
    confirmColor = "007AFF",
  } = obj;
  uni.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    cancelText: cancelText,
    confirmText: confirmText,
    cancelColor: cancelColor,
    confirmColor: confirmColor,
    success: function (res) {
      if (res.confirm) {
        cb_confirm && cb_confirm()
      } else if (res.cancel) {
        cb_cancel && cb_cancel()
      }
    }
  })
}

// 显示loading
export function loading(msg = '') {
  uni.showLoading({
    title: msg,
    mask: true,
  });
};
// 隐藏loading
export function loadEnd() {
  uni.hideLoading();
};
// 支付倒计时传入剩余时间戳，返回分秒
export function timeDown(timestamp) {
  // let totalTime = time * 60 * 1000 + createTime * 1000 // 5分钟转换毫秒，5分钟的倒计时
  let minute = parseInt(timestamp / 60)
  let second = parseInt(timestamp % 60)

  if (minute < 0 || second < 0) {
    return 0
  }

  if (minute.toString().length == 1) {
    minute = '0' + minute
  }

  if (second.toString().length == 1) {
    second = '0' + second
  }

  return minute + ':' + second
}

// 小程序用，为富文本新增类名
export function changeRichText(txt) {
  let data = txt.replace(/\<img/gi, '<img class="edit-img"')
    .replace(/\<p/gi, '<p class="edit-p"')
    .replace(/\<h1/gi, '<h1 class="edit-h1"')
    .replace(/\<h2/gi, '<h2 class="edit-h2"')
    .replace(/\<h3/gi, '<h3 class="edit-h3"')
    .replace(/\<h4/gi, '<h4 class="edit-h4"')
    .replace(/\<h5/gi, '<h5 class="edit-h5"')
    .replace(/\<h6/gi, '<h6 class="edit-h6"')
    .replace(/\<a/gi, '<a class="edit-a"')
    .replace(/\<th/gi, '<th class="edit-th"')
    .replace(/\<td/gi, '<td class="edit-td"')

  return data
}

//日期格式化
export function format(time, type) {
  return moment(time).format(type);
}

// 获取富文本编辑器纯文字
export function getEditorText(html) {
  if (html) {
    html = html.replace(/(\n)/g, "")
    html = html.replace(/(\t)/g, "")
    html = html.replace(/(\r)/g, "")
    html = html.replace(/<\/?[^>]*>/g, "")
    // html = html.replace(/\s*/g, "");
    return html
  } else {
    return ""
  }
}

//处理富文本中图片宽度问题
export function formatRichText(html) {
  let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\ style="text-align: center;"/gi, '');
  newContent = newContent.replace(/\<p/gi, '<p style="display: flex !important;flex-direction: column;margin:0;padding:0"');
  newContent = newContent.replace(/\<a/gi, '<a style="display: flex !important;flex-direction: column;margin:0;padding:0" ');
  newContent = newContent.replace(/\<img/gi, '<img  class="richImg"');
  return newContent;
}

//时间戳转时间
export function dateForm(e) {
  let obj = moment(e).format('YYYY/MM/DD HH:mm:ss')
  return obj
}

/*格式化时间, 传入毫秒 返回  [ 小时, 分钟, 秒钟, 毫秒 ] */
export function momentTime(t) {
  const hour = Math.floor(t / (3600 * 1000))
  const min = Math.floor((t - hour * 3600 * 1000) / (60 * 1000))
  const sec = Math.floor((t - hour * 3600 * 1000 - min * 60 * 1000) / 1000)
  const ms = t - hour * 3600 * 1000 - min * 60 * 1000 - sec * 1000
  let h = hour < 10 ? `0${hour}` : hour
  let m = min < 10 ? `0${min}` : min
  let s = sec < 10 ? `0${sec}` : sec
  let _m = ms.toString()[0]
  return [h, m, s, _m]
}

export function momentTime2(t, type = 1) {
  const hour = Math.floor(t / (3600 * 1000))
  const min = Math.floor((t - hour * 3600 * 1000) / (60 * 1000))
  const sec = Math.floor((t - hour * 3600 * 1000 - min * 60 * 1000) / 1000)
  const ms = t - hour * 3600 * 1000 - min * 60 * 1000 - sec * 1000
  let h = hour < 10 ? `0${hour}` : hour
  let m = min < 10 ? `0${min}` : min
  let s = sec < 10 ? `0${sec}` : sec
  let _m = ms.toString()[0]
  switch (type) {
    case 1:
      return `${h}:${m}:${s}:${_m}`
    case 2:
      return `${h}小时${m}分`
  }
}

/*格式化时间, 传入秒 返回  [ 天数, 小时, 分钟, 秒钟 ] */
export function momentDay(time) {
  const day = Math.floor(time / (3600 * 24))
  const t = time - day * 3600 * 24
  const hour = Math.floor(t / 3600)
  const min = Math.floor((t - hour * 3600) / 60)
  const sec = (t - hour * 3600 - min * 60)
  const d = day < 10 ? `0${day}` : day
  let h = hour < 10 ? `0${hour}` : hour
  let m = min < 10 ? `0${min}` : min
  let s = sec < 10 ? `0${sec}` : sec

  return [d, h, m, s]
}

// 换行符转为br标签
export function NToBr(txt) {
  return txt.replace(/\n/g, '<br />')
}

// 转base64
export function toBase64(path) {
  return new Promise((resolve, reject) => {
    // #ifdef APP-PLUS
    uni.saveFile({
      tempFilePath: path,
      success: (res) => {
        plus.io.resolveLocalFileSystemURL(res.savedFilePath, (entry) => {
          entry.file(function (file) {
            var fileReader = new plus.io.FileReader();
            fileReader.onloadend = function (e) {
              // console.log(e);
              var picUrl = e.target.result;
              var size = 0
              uni.getFileInfo({
                filePath: e.target.fileName,
                success: function (res) {
                  size = res.size
                  uni.removeSavedFile({
                    filePath: e.target.fileName,
                    complete: function (res) {
                      // console.log(res);
                    }
                  });
                  resolve({ picUrl, size });
                },
                complete: function (res) {
                  console.log(res);
                }
              });
            };
            fileReader.readAsDataURL(file);
          });
        }, (err) => {
          reject(err)
        });
      },
      fail: (err) => {
        reject(err)
      }
    })
    // #endif

    // #ifdef MP-WEIXIN
    uni.getFileSystemManager().readFile({
      filePath: path,
      encoding: "base64",
      success(res) {
        console.log(res);
        resolve(res);
      },
      fail(err) {
        reject(err)
      }
    })
    // #endif

    /* #ifdef H5 */
    const fileReader = new FileReader()
    fileReader.readAsDataURL(path)
    fileReader.onload = (event) => {
      resolve(fileReader.result);
    }
    /* #endif */
  })
}

// 上传图片
export function uploadImg(count, cb) {
  uni.chooseImage({
    count,
    sizeType: ['original'],
    sourceType: ['album'],
    success: async (res) => {
      console.log(res);
      uni.showLoading({
        title: '上传中',
        mask: true
      })
      let img = []
      for (const file of res.tempFiles) {
        // #ifdef APP-PLUS
        file.name = file.path.split('/').pop()
        let { picUrl: base64, size } = await toBase64(file.path)
        // #endif
        //  #ifndef APP-PLUS 
        let base64 = await toBase64(file)
        let size = file.size
        // #endif
        img.push({ name: file.name, base64, size })
      }
      uni.hideLoading()
      cb && cb(img)
    },
    fail: (err) => {
      console.log(err);
    }
  })
}

// 预览图片
export function previewImage(img_arr, first_img = 0) {
  uni.previewImage({
    urls: img_arr, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
    current: first_img, // 当前显示图片的http链接，默认是第一个
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
}

// 保留num位小数--存在n.00 n.10最后带0的
export const keepFloat = (data, num = 2) => {
  let _data = Math.floor(data * Math.pow(10, num)) + '1';
  _data = _data / Math.pow(10, num + 1) + '';
  return _data.slice(0, _data.length - 1);
};

//十六进制色卡或rgb转成rgba
//#ffffff=>rgba(255,255,255,1)
//rgb(255,255,255)=>rgba(255,255,255,1)
export const colorChangeRgba = (color, opacity = 1) => {
  if (color.search('#') > -1) {
    let rgbastr = ''
    if (color.length == 4) {
      let str = color.split('')
      rgbastr += '#' + str[1] + str[1] + str[2] + str[2] + str[3] + str[3]
      color = rgbastr
    }
    let rgba = 'rgba(' + parseInt('0x' + color.slice(1, 3)) + ',' +
      parseInt('0x' + color.slice(3, 5)) + ',' +
      parseInt('0x' + color.slice(5, 7)) + ',' +
      opacity + ')'
    return rgba
  } else if (color.search('rgba') > -1) {
    let str = color.split(',');
    str.pop();
    str.push(opacity + ')')
    return str.join(',');
  } else if (color.search('rgb') > -1) {
    return color.replace(')', ',' + opacity + ')');
  } else {
    toast('色值有误')
  }
};

//16进制颜色转rgb
export const set16ToRgb = (str) => {
  var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
  if (!reg.test(str)) { return; }
  let newStr = (str.toLowerCase()).replace(/\#/g, '')
  let len = newStr.length;
  if (len == 3) {
    let t = ''
    for (var i = 0; i < len; i++) {
      t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1))
    }
    newStr = t
  }
  let arr = [];
  for (var i = 0; i < 6; i = i + 2) {
    let s = newStr.slice(i, i + 2)
    arr.push(parseInt("0x" + s))
  }
  return 'rgb(' + arr.join(",") + ')';
}

//rgb颜色转16进制
export const setRgbTo16 = (str) => {
  let reg = /^(rgb|RGB)/;
  if (!reg.test(str)) { return; }
  var arr = str.slice(4, str.length - 1).split(",")
  let color = '#';
  for (var i = 0; i < arr.length; i++) {
    var t = Number(arr[i]).toString(16)
    if (t == "0") {   //如果为“0”的话，需要补0操作,否则只有5位数
      t = t + "0"
    }
    color += t;
  }
  return color;
}
//判断深浅色[是否为浅色，true浅色，false深色]
export const colorisLight = (rgb, opacity) => {
  if (rgb) {
    if (rgb && rgb.length == 3) {
      //不用转颜色的[255,255,255]
      let num = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
      if (opacity < 0.3) {
        return true;
      } else {
        return num > 192 ? true : false
      }
    } else if (rgb.search('#') > -1) {
      //16进制格式的[#ffffff]
      let c = colorisLight(set16ToRgb(rgb))
      return c;
    } else if (rgb.search('rgb') > -1) {
      //rgb或rgba格式的[rgba(255,255,255,0.3)]
      let _rgb = rgb.replace(')', '');
      let opa;
      if (rgb.search('rgba') > -1) {
        _rgb = _rgb.replace('rgba(', '')
        _rgb = _rgb.split(',');
        opa = _rgb.pop();
      } else {
        _rgb = _rgb.replace('rgb(', '')
        _rgb = _rgb.split(',');
      }
      let c = colorisLight(_rgb, opa)
      return c;
    } else if (rgb === 'transparent') {
      return true;
    } else {
      console.log('色值有误')
    }
  } else {
    console.log('请传入色值')
  }
};