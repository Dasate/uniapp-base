// 表单验证
export default {
  // 空验证
  check_null: function (value) {
    if (!value) {
      return false;
    } else {
      var r = new RegExp(/^[ ]+$/);
      var result = r.test(value);
      return !result;
    }
  },
  // 手机验证
  check_phone: function (txt) {
    return /^(1[3456789]\d{9})$/g.test(txt)
  },
  // 检测固话号码
  check_tele: function (txt) {
    return /^((0\d{2,3}-\d{7,8}))$/g.test(txt)
  },
  // 检测手机和固话
  check_telephone: function (txt) {
    return /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/g.test(txt)
  },
  // 邮箱验证
  check_email: function (txt) {
    return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/g
      .test(txt)
  },
  // 检测身份证
  check_idcard: function (txt) {
    return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/g.test(txt)
  },
  // 检测姓名
  check_name: function (txt) {
    return /^[a-zA-Z\u4e00-\u9fa5\_\-\.\·]*$/g.test(txt)
  },
  // 检测姓名(中文)
  check_cn_name: function (txt) {
    return /^[\u4e00-\u9fa5\.\·]*$/g.test(txt)
  },
  // 检测姓名(英文)
  check_en_name: function (txt) {
    return /^[a-zA-Z\_\-\.\·]*$/g.test(txt)
  },
  // 检测用户名(长度在3~16之间，只能包含英文、数字和下划线，区分大小写)
  check_username: function (txt) {
    return /^[a-zA-Z0-9_-]{3,16}$/g.test(txt)
  },
  // 密码验证(至少含1小写字母，1大写字母，1数字，长度在8~16之间)
  check_password: function (txt) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(txt)
  },
  // 检测url
  check_url: function (txt) {
    return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g.test(txt)
  },
  // 检测ip地址
  check_ip: function (txt) {
    return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/g
      .test(txt)
  },
  // 金钱验证（两位小数）
  check_money: function (txt) {
    return /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/g.test(txt)
  },
  // 整数
  check_int: function (txt) {
    return /(^[0-9]\d*$)/g.test(txt)
  },
  // 正整数
  check_int2: function (txt) {
    return /(^[1-9]\d*$)/g.test(txt)
  },
  // emoji表情验证
  check_emoji: function (txt) {
    return /^([\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])$/g
      .test(txt)
  },
  // 隐藏手机号
  phoneChang: function (txt) {
    // return /^((\d{4})(\d{4})(\d)$,'$1****$3'$)/g.test(txt)
    return txt.toString().replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$3')
  },
  // 替换表单的前后空格
  trim: function (txt) {
    return txt.replace(/(^\s*)|(\s*$)/g, "")
  },
  // 身份证位数
  idcardNumTest: function (txt) {
    return (txt.toString().length == 15 || txt.toString().length == 18) ? true : false
  },
  // /n替换成br
  NToBr: function (txt) {
    return txt.replace(/\n/g, '<br>')
  },
  // br替换成/n
  BrToN: function (txt) {
    return txt.replace(/<br>/g, '\n')
  },
  // 验证码
  setTime: function (that) {
    if (that.phonecode.phoneFlag === 0) {
      // 界面倒计时
      that.phonecode.time = 60
      that.phonecode.phoneFlag = 1
      that.phonecode.phoneText = that.phonecode.time + 's' + "后重新获取"
      var times = setInterval(function () {
        if (--that.phonecode.time !== 0) {
          that.phonecode.phoneText = that.phonecode.time + 's' + "后重新获取"
        } else {
          clearInterval(times)
          // that.time = 3
          that.phonecode.phoneText = '重新发送'
          that.phonecode.phoneFlag = 0
        }
      }, 1000)
      that.phonecode.oldPhone = that.phone // 记录现时的手机号
    }
  }
}
