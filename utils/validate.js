// let vali = validate(obj,order); 返回true 或 false,当传入order为true时，逐条验证(失败时用tip属性提示)
import formcheck from '@/utils/formcheck';
//单属性对象验证
export const validateItem = (data) => {
  if (data) {
    let rule = data.rule;
    if (rule) {
      for (let rulekey in rule) {
        if (!formcheck[rulekey](data.value)) {
          data.tip = data.rule[rulekey];
          data.callback && data.callback(data.rule[rulekey])
          return false;
        }
      }
      return true;
    }else{
      return true;
    }
  } else {
    console.error("请传入数据")
    return false;
  }
}
//多属性对象验证
export const validate = (data, order) => {
  let state = true;
  let dataObj = {};
  if (data) {
    for (let key in data) {
      dataObj[key] = data[key].value;
      if (!validateItem(data[key], key)) {
        if (!order) {
          state = false;
        } else {
          return false;
        }
      };
    }
  } else {
    console.error("请传入数据")
    return false;
  }
  if (!order) {
    if (state) {
      return dataObj
    } else {
      return false;
    }
  } else {
    return dataObj
  }
}