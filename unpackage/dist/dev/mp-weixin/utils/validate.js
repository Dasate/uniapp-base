"use strict";
const utils_formcheck = require("./formcheck.js");
const validate = {
  state: true,
  validateItem(data, key) {
    if (data) {
      let rule = data.rule;
      if (rule) {
        for (let rulekey in rule) {
          if (!utils_formcheck.formcheck[rulekey](data.value)) {
            data.tip = data.rule[rulekey];
            data.callback && data.callback(data.rule[rulekey]);
            return false;
          }
        }
        return true;
      }
    } else {
      console.error("请传入数据");
      return false;
    }
  },
  validate(data, order) {
    if (data) {
      for (let key in data) {
        if (!this.validateItem(data[key], key)) {
          if (!order) {
            this.state = false;
          } else {
            return false;
          }
        }
      }
    } else {
      console.error("请传入数据");
      return false;
    }
    if (!order) {
      return this.state;
    } else {
      return true;
    }
  }
};
exports.validate = validate;
