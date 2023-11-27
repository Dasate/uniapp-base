if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  //! moment.js
  //! version : 2.29.4
  //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
  //! license : MIT
  //! momentjs.com
  var hookCallback;
  function hooks() {
    return hookCallback.apply(null, arguments);
  }
  function setHookCallback(callback) {
    hookCallback = callback;
  }
  function isArray$1(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
  }
  function isObject(input) {
    return input != null && Object.prototype.toString.call(input) === "[object Object]";
  }
  function hasOwnProp(a2, b2) {
    return Object.prototype.hasOwnProperty.call(a2, b2);
  }
  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k2;
      for (k2 in obj) {
        if (hasOwnProp(obj, k2)) {
          return false;
        }
      }
      return true;
    }
  }
  function isUndefined(input) {
    return input === void 0;
  }
  function isNumber(input) {
    return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
  }
  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
  }
  function map(arr, fn) {
    var res = [], i2, arrLen = arr.length;
    for (i2 = 0; i2 < arrLen; ++i2) {
      res.push(fn(arr[i2], i2));
    }
    return res;
  }
  function extend(a2, b2) {
    for (var i2 in b2) {
      if (hasOwnProp(b2, i2)) {
        a2[i2] = b2[i2];
      }
    }
    if (hasOwnProp(b2, "toString")) {
      a2.toString = b2.toString;
    }
    if (hasOwnProp(b2, "valueOf")) {
      a2.valueOf = b2.valueOf;
    }
    return a2;
  }
  function createUTC(input, format2, locale2, strict) {
    return createLocalOrUTC(input, format2, locale2, strict, true).utc();
  }
  function defaultParsingFlags() {
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidEra: null,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      era: null,
      meridiem: null,
      rfc2822: false,
      weekdayMismatch: false
    };
  }
  function getParsingFlags(m2) {
    if (m2._pf == null) {
      m2._pf = defaultParsingFlags();
    }
    return m2._pf;
  }
  var some;
  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function(fun) {
      var t2 = Object(this), len = t2.length >>> 0, i2;
      for (i2 = 0; i2 < len; i2++) {
        if (i2 in t2 && fun.call(this, t2[i2], i2, t2)) {
          return true;
        }
      }
      return false;
    };
  }
  function isValid(m2) {
    if (m2._isValid == null) {
      var flags = getParsingFlags(m2), parsedParts = some.call(flags.parsedDateParts, function(i2) {
        return i2 != null;
      }), isNowValid = !isNaN(m2._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
      if (m2._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
      }
      if (Object.isFrozen == null || !Object.isFrozen(m2)) {
        m2._isValid = isNowValid;
      } else {
        return isNowValid;
      }
    }
    return m2._isValid;
  }
  function createInvalid(flags) {
    var m2 = createUTC(NaN);
    if (flags != null) {
      extend(getParsingFlags(m2), flags);
    } else {
      getParsingFlags(m2).userInvalidated = true;
    }
    return m2;
  }
  var momentProperties = hooks.momentProperties = [], updateInProgress = false;
  function copyConfig(to2, from2) {
    var i2, prop, val, momentPropertiesLen = momentProperties.length;
    if (!isUndefined(from2._isAMomentObject)) {
      to2._isAMomentObject = from2._isAMomentObject;
    }
    if (!isUndefined(from2._i)) {
      to2._i = from2._i;
    }
    if (!isUndefined(from2._f)) {
      to2._f = from2._f;
    }
    if (!isUndefined(from2._l)) {
      to2._l = from2._l;
    }
    if (!isUndefined(from2._strict)) {
      to2._strict = from2._strict;
    }
    if (!isUndefined(from2._tzm)) {
      to2._tzm = from2._tzm;
    }
    if (!isUndefined(from2._isUTC)) {
      to2._isUTC = from2._isUTC;
    }
    if (!isUndefined(from2._offset)) {
      to2._offset = from2._offset;
    }
    if (!isUndefined(from2._pf)) {
      to2._pf = getParsingFlags(from2);
    }
    if (!isUndefined(from2._locale)) {
      to2._locale = from2._locale;
    }
    if (momentPropertiesLen > 0) {
      for (i2 = 0; i2 < momentPropertiesLen; i2++) {
        prop = momentProperties[i2];
        val = from2[prop];
        if (!isUndefined(val)) {
          to2[prop] = val;
        }
      }
    }
    return to2;
  }
  function Moment(config2) {
    copyConfig(this, config2);
    this._d = new Date(config2._d != null ? config2._d.getTime() : NaN);
    if (!this.isValid()) {
      this._d = /* @__PURE__ */ new Date(NaN);
    }
    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }
  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  }
  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
      formatAppLog("warn", "at node_modules/moment/dist/moment.js:281", "Deprecation warning: " + msg);
    }
  }
  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function() {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }
      if (firstTime) {
        var args = [], arg, i2, key, argLen = arguments.length;
        for (i2 = 0; i2 < argLen; i2++) {
          arg = "";
          if (typeof arguments[i2] === "object") {
            arg += "\n[" + i2 + "] ";
            for (key in arguments[0]) {
              if (hasOwnProp(arguments[0], key)) {
                arg += key + ": " + arguments[0][key] + ", ";
              }
            }
            arg = arg.slice(0, -2);
          } else {
            arg = arguments[i2];
          }
          args.push(arg);
        }
        warn(
          msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
        );
        firstTime = false;
      }
      return fn.apply(this, arguments);
    }, fn);
  }
  var deprecations = {};
  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }
  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;
  function isFunction(input) {
    return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
  }
  function set$1(config2) {
    var prop, i2;
    for (i2 in config2) {
      if (hasOwnProp(config2, i2)) {
        prop = config2[i2];
        if (isFunction(prop)) {
          this[i2] = prop;
        } else {
          this["_" + i2] = prop;
        }
      }
    }
    this._config = config2;
    this._dayOfMonthOrdinalParseLenient = new RegExp(
      (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
    );
  }
  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop];
        } else {
          delete res[prop];
        }
      }
    }
    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        res[prop] = extend({}, res[prop]);
      }
    }
    return res;
  }
  function Locale(config2) {
    if (config2 != null) {
      this.set(config2);
    }
  }
  var keys;
  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function(obj) {
      var i2, res = [];
      for (i2 in obj) {
        if (hasOwnProp(obj, i2)) {
          res.push(i2);
        }
      }
      return res;
    };
  }
  var defaultCalendar = {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  };
  function calendar(key, mom, now2) {
    var output = this._calendar[key] || this._calendar["sameElse"];
    return isFunction(output) ? output.call(mom, now2) : output;
  }
  function zeroFill(number2, targetLength, forceSign) {
    var absNumber = "" + Math.abs(number2), zerosToFill = targetLength - absNumber.length, sign2 = number2 >= 0;
    return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }
  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
  function addFormatToken(token2, padded, ordinal2, callback) {
    var func = callback;
    if (typeof callback === "string") {
      func = function() {
        return this[callback]();
      };
    }
    if (token2) {
      formatTokenFunctions[token2] = func;
    }
    if (padded) {
      formatTokenFunctions[padded[0]] = function() {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }
    if (ordinal2) {
      formatTokenFunctions[ordinal2] = function() {
        return this.localeData().ordinal(
          func.apply(this, arguments),
          token2
        );
      };
    }
  }
  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, "");
    }
    return input.replace(/\\/g, "");
  }
  function makeFormatFunction(format2) {
    var array2 = format2.match(formattingTokens), i2, length;
    for (i2 = 0, length = array2.length; i2 < length; i2++) {
      if (formatTokenFunctions[array2[i2]]) {
        array2[i2] = formatTokenFunctions[array2[i2]];
      } else {
        array2[i2] = removeFormattingTokens(array2[i2]);
      }
    }
    return function(mom) {
      var output = "", i3;
      for (i3 = 0; i3 < length; i3++) {
        output += isFunction(array2[i3]) ? array2[i3].call(mom, format2) : array2[i3];
      }
      return output;
    };
  }
  function formatMoment(m2, format2) {
    if (!m2.isValid()) {
      return m2.localeData().invalidDate();
    }
    format2 = expandFormat(format2, m2.localeData());
    formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
    return formatFunctions[format2](m2);
  }
  function expandFormat(format2, locale2) {
    var i2 = 5;
    function replaceLongDateFormatTokens(input) {
      return locale2.longDateFormat(input) || input;
    }
    localFormattingTokens.lastIndex = 0;
    while (i2 >= 0 && localFormattingTokens.test(format2)) {
      format2 = format2.replace(
        localFormattingTokens,
        replaceLongDateFormatTokens
      );
      localFormattingTokens.lastIndex = 0;
      i2 -= 1;
    }
    return format2;
  }
  var defaultLongDateFormat = {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A"
  };
  function longDateFormat(key) {
    var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
    if (format2 || !formatUpper) {
      return format2;
    }
    this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
      if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
        return tok.slice(1);
      }
      return tok;
    }).join("");
    return this._longDateFormat[key];
  }
  var defaultInvalidDate = "Invalid date";
  function invalidDate() {
    return this._invalidDate;
  }
  var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
  function ordinal(number2) {
    return this._ordinal.replace("%d", number2);
  }
  var defaultRelativeTime = {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    w: "a week",
    ww: "%d weeks",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  };
  function relativeTime(number2, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number2, withoutSuffix, string, isFuture) : output.replace(/%d/i, number2);
  }
  function pastFuture(diff2, output) {
    var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
    return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
  }
  var aliases = {};
  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
  }
  function normalizeUnits(units) {
    return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
  }
  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {}, normalizedProp, prop;
    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);
        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }
    return normalizedInput;
  }
  var priorities = {};
  function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
  }
  function getPrioritizedUnits(unitsObj) {
    var units = [], u2;
    for (u2 in unitsObj) {
      if (hasOwnProp(unitsObj, u2)) {
        units.push({ unit: u2, priority: priorities[u2] });
      }
    }
    units.sort(function(a2, b2) {
      return a2.priority - b2.priority;
    });
    return units;
  }
  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
  function absFloor(number2) {
    if (number2 < 0) {
      return Math.ceil(number2) || 0;
    } else {
      return Math.floor(number2);
    }
  }
  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion, value = 0;
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }
    return value;
  }
  function makeGetSet(unit, keepTime) {
    return function(value) {
      if (value != null) {
        set$1$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get(this, unit);
      }
    };
  }
  function get(mom, unit) {
    return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
  }
  function set$1$1(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
      if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
        value = toInt(value);
        mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
          value,
          mom.month(),
          daysInMonth(value, mom.month())
        );
      } else {
        mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
      }
    }
  }
  function stringGet(units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units]();
    }
    return this;
  }
  function stringSet(units, value) {
    if (typeof units === "object") {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units), i2, prioritizedLen = prioritized.length;
      for (i2 = 0; i2 < prioritizedLen; i2++) {
        this[prioritized[i2].unit](units[prioritized[i2].unit]);
      }
    } else {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
        return this[units](value);
      }
    }
    return this;
  }
  var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
  regexes = {};
  function addRegexToken(token2, regex, strictRegex) {
    regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
      return isStrict && strictRegex ? strictRegex : regex;
    };
  }
  function getParseRegexForToken(token2, config2) {
    if (!hasOwnProp(regexes, token2)) {
      return new RegExp(unescapeFormat(token2));
    }
    return regexes[token2](config2._strict, config2._locale);
  }
  function unescapeFormat(s2) {
    return regexEscape(
      s2.replace("\\", "").replace(
        /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
        function(matched, p1, p2, p3, p4) {
          return p1 || p2 || p3 || p4;
        }
      )
    );
  }
  function regexEscape(s2) {
    return s2.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  var tokens = {};
  function addParseToken(token2, callback) {
    var i2, func = callback, tokenLen;
    if (typeof token2 === "string") {
      token2 = [token2];
    }
    if (isNumber(callback)) {
      func = function(input, array2) {
        array2[callback] = toInt(input);
      };
    }
    tokenLen = token2.length;
    for (i2 = 0; i2 < tokenLen; i2++) {
      tokens[token2[i2]] = func;
    }
  }
  function addWeekParseToken(token2, callback) {
    addParseToken(token2, function(input, array2, config2, token3) {
      config2._w = config2._w || {};
      callback(input, config2._w, config2, token3);
    });
  }
  function addTimeToArrayFromToken(token2, input, config2) {
    if (input != null && hasOwnProp(tokens, token2)) {
      tokens[token2](input, config2._a, config2, token2);
    }
  }
  var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
  function mod(n2, x2) {
    return (n2 % x2 + x2) % x2;
  }
  var indexOf;
  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function(o2) {
      var i2;
      for (i2 = 0; i2 < this.length; ++i2) {
        if (this[i2] === o2) {
          return i2;
        }
      }
      return -1;
    };
  }
  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  }
  addFormatToken("M", ["MM", 2], "Mo", function() {
    return this.month() + 1;
  });
  addFormatToken("MMM", 0, 0, function(format2) {
    return this.localeData().monthsShort(this, format2);
  });
  addFormatToken("MMMM", 0, 0, function(format2) {
    return this.localeData().months(this, format2);
  });
  addUnitAlias("month", "M");
  addUnitPriority("month", 8);
  addRegexToken("M", match1to2);
  addRegexToken("MM", match1to2, match2);
  addRegexToken("MMM", function(isStrict, locale2) {
    return locale2.monthsShortRegex(isStrict);
  });
  addRegexToken("MMMM", function(isStrict, locale2) {
    return locale2.monthsRegex(isStrict);
  });
  addParseToken(["M", "MM"], function(input, array2) {
    array2[MONTH] = toInt(input) - 1;
  });
  addParseToken(["MMM", "MMMM"], function(input, array2, config2, token2) {
    var month = config2._locale.monthsParse(input, token2, config2._strict);
    if (month != null) {
      array2[MONTH] = month;
    } else {
      getParsingFlags(config2).invalidMonth = input;
    }
  });
  var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
    "_"
  ), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
  function localeMonths(m2, format2) {
    if (!m2) {
      return isArray$1(this._months) ? this._months : this._months["standalone"];
    }
    return isArray$1(this._months) ? this._months[m2.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m2.month()];
  }
  function localeMonthsShort(m2, format2) {
    if (!m2) {
      return isArray$1(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
    }
    return isArray$1(this._monthsShort) ? this._monthsShort[m2.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m2.month()];
  }
  function handleStrictParse(monthName, format2, strict) {
    var i2, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
      for (i2 = 0; i2 < 12; ++i2) {
        mom = createUTC([2e3, i2]);
        this._shortMonthsParse[i2] = this.monthsShort(
          mom,
          ""
        ).toLocaleLowerCase();
        this._longMonthsParse[i2] = this.months(mom, "").toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format2 === "MMM") {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format2 === "MMM") {
        ii = indexOf.call(this._shortMonthsParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }
  function localeMonthsParse(monthName, format2, strict) {
    var i2, mom, regex;
    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format2, strict);
    }
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    }
    for (i2 = 0; i2 < 12; i2++) {
      mom = createUTC([2e3, i2]);
      if (strict && !this._longMonthsParse[i2]) {
        this._longMonthsParse[i2] = new RegExp(
          "^" + this.months(mom, "").replace(".", "") + "$",
          "i"
        );
        this._shortMonthsParse[i2] = new RegExp(
          "^" + this.monthsShort(mom, "").replace(".", "") + "$",
          "i"
        );
      }
      if (!strict && !this._monthsParse[i2]) {
        regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
        this._monthsParse[i2] = new RegExp(regex.replace(".", ""), "i");
      }
      if (strict && format2 === "MMMM" && this._longMonthsParse[i2].test(monthName)) {
        return i2;
      } else if (strict && format2 === "MMM" && this._shortMonthsParse[i2].test(monthName)) {
        return i2;
      } else if (!strict && this._monthsParse[i2].test(monthName)) {
        return i2;
      }
    }
  }
  function setMonth(mom, value) {
    var dayOfMonth;
    if (!mom.isValid()) {
      return mom;
    }
    if (typeof value === "string") {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value);
        if (!isNumber(value)) {
          return mom;
        }
      }
    }
    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
    return mom;
  }
  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get(this, "Month");
    }
  }
  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }
  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        computeMonthsParse.call(this);
      }
      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, "_monthsShortRegex")) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }
      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  }
  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        computeMonthsParse.call(this);
      }
      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, "_monthsRegex")) {
        this._monthsRegex = defaultMonthsRegex;
      }
      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
  }
  function computeMonthsParse() {
    function cmpLenRev(a2, b2) {
      return b2.length - a2.length;
    }
    var shortPieces = [], longPieces = [], mixedPieces = [], i2, mom;
    for (i2 = 0; i2 < 12; i2++) {
      mom = createUTC([2e3, i2]);
      shortPieces.push(this.monthsShort(mom, ""));
      longPieces.push(this.months(mom, ""));
      mixedPieces.push(this.months(mom, ""));
      mixedPieces.push(this.monthsShort(mom, ""));
    }
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i2 = 0; i2 < 12; i2++) {
      shortPieces[i2] = regexEscape(shortPieces[i2]);
      longPieces[i2] = regexEscape(longPieces[i2]);
    }
    for (i2 = 0; i2 < 24; i2++) {
      mixedPieces[i2] = regexEscape(mixedPieces[i2]);
    }
    this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp(
      "^(" + longPieces.join("|") + ")",
      "i"
    );
    this._monthsShortStrictRegex = new RegExp(
      "^(" + shortPieces.join("|") + ")",
      "i"
    );
  }
  addFormatToken("Y", 0, 0, function() {
    var y2 = this.year();
    return y2 <= 9999 ? zeroFill(y2, 4) : "+" + y2;
  });
  addFormatToken(0, ["YY", 2], 0, function() {
    return this.year() % 100;
  });
  addFormatToken(0, ["YYYY", 4], 0, "year");
  addFormatToken(0, ["YYYYY", 5], 0, "year");
  addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
  addUnitAlias("year", "y");
  addUnitPriority("year", 1);
  addRegexToken("Y", matchSigned);
  addRegexToken("YY", match1to2, match2);
  addRegexToken("YYYY", match1to4, match4);
  addRegexToken("YYYYY", match1to6, match6);
  addRegexToken("YYYYYY", match1to6, match6);
  addParseToken(["YYYYY", "YYYYYY"], YEAR);
  addParseToken("YYYY", function(input, array2) {
    array2[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken("YY", function(input, array2) {
    array2[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken("Y", function(input, array2) {
    array2[YEAR] = parseInt(input, 10);
  });
  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }
  hooks.parseTwoDigitYear = function(input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
  };
  var getSetYear = makeGetSet("FullYear", true);
  function getIsLeapYear() {
    return isLeapYear(this.year());
  }
  function createDate(y2, m2, d2, h2, M2, s2, ms) {
    var date2;
    if (y2 < 100 && y2 >= 0) {
      date2 = new Date(y2 + 400, m2, d2, h2, M2, s2, ms);
      if (isFinite(date2.getFullYear())) {
        date2.setFullYear(y2);
      }
    } else {
      date2 = new Date(y2, m2, d2, h2, M2, s2, ms);
    }
    return date2;
  }
  function createUTCDate(y2) {
    var date2, args;
    if (y2 < 100 && y2 >= 0) {
      args = Array.prototype.slice.call(arguments);
      args[0] = y2 + 400;
      date2 = new Date(Date.UTC.apply(null, args));
      if (isFinite(date2.getUTCFullYear())) {
        date2.setUTCFullYear(y2);
      }
    } else {
      date2 = new Date(Date.UTC.apply(null, arguments));
    }
    return date2;
  }
  function firstWeekOffset(year, dow, doy) {
    var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  }
  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year);
    } else {
      resYear = year;
      resDayOfYear = dayOfYear;
    }
    return {
      year: resYear,
      dayOfYear: resDayOfYear
    };
  }
  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1;
    } else {
      resYear = mom.year();
      resWeek = week;
    }
    return {
      week: resWeek,
      year: resYear
    };
  }
  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  }
  addFormatToken("w", ["ww", 2], "wo", "week");
  addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
  addUnitAlias("week", "w");
  addUnitAlias("isoWeek", "W");
  addUnitPriority("week", 5);
  addUnitPriority("isoWeek", 5);
  addRegexToken("w", match1to2);
  addRegexToken("ww", match1to2, match2);
  addRegexToken("W", match1to2);
  addRegexToken("WW", match1to2, match2);
  addWeekParseToken(
    ["w", "ww", "W", "WW"],
    function(input, week, config2, token2) {
      week[token2.substr(0, 1)] = toInt(input);
    }
  );
  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }
  var defaultLocaleWeek = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6
    // The week that contains Jan 6th is the first week of the year.
  };
  function localeFirstDayOfWeek() {
    return this._week.dow;
  }
  function localeFirstDayOfYear() {
    return this._week.doy;
  }
  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, "d");
  }
  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, "d");
  }
  addFormatToken("d", 0, "do", "day");
  addFormatToken("dd", 0, 0, function(format2) {
    return this.localeData().weekdaysMin(this, format2);
  });
  addFormatToken("ddd", 0, 0, function(format2) {
    return this.localeData().weekdaysShort(this, format2);
  });
  addFormatToken("dddd", 0, 0, function(format2) {
    return this.localeData().weekdays(this, format2);
  });
  addFormatToken("e", 0, 0, "weekday");
  addFormatToken("E", 0, 0, "isoWeekday");
  addUnitAlias("day", "d");
  addUnitAlias("weekday", "e");
  addUnitAlias("isoWeekday", "E");
  addUnitPriority("day", 11);
  addUnitPriority("weekday", 11);
  addUnitPriority("isoWeekday", 11);
  addRegexToken("d", match1to2);
  addRegexToken("e", match1to2);
  addRegexToken("E", match1to2);
  addRegexToken("dd", function(isStrict, locale2) {
    return locale2.weekdaysMinRegex(isStrict);
  });
  addRegexToken("ddd", function(isStrict, locale2) {
    return locale2.weekdaysShortRegex(isStrict);
  });
  addRegexToken("dddd", function(isStrict, locale2) {
    return locale2.weekdaysRegex(isStrict);
  });
  addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config2, token2) {
    var weekday = config2._locale.weekdaysParse(input, token2, config2._strict);
    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config2).invalidWeekday = input;
    }
  });
  addWeekParseToken(["d", "e", "E"], function(input, week, config2, token2) {
    week[token2] = toInt(input);
  });
  function parseWeekday(input, locale2) {
    if (typeof input !== "string") {
      return input;
    }
    if (!isNaN(input)) {
      return parseInt(input, 10);
    }
    input = locale2.weekdaysParse(input);
    if (typeof input === "number") {
      return input;
    }
    return null;
  }
  function parseIsoWeekday(input, locale2) {
    if (typeof input === "string") {
      return locale2.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
  }
  function shiftWeekdays(ws, n2) {
    return ws.slice(n2, 7).concat(ws.slice(0, n2));
  }
  var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
  function localeWeekdays(m2, format2) {
    var weekdays = isArray$1(this._weekdays) ? this._weekdays : this._weekdays[m2 && m2 !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
    return m2 === true ? shiftWeekdays(weekdays, this._week.dow) : m2 ? weekdays[m2.day()] : weekdays;
  }
  function localeWeekdaysShort(m2) {
    return m2 === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m2 ? this._weekdaysShort[m2.day()] : this._weekdaysShort;
  }
  function localeWeekdaysMin(m2) {
    return m2 === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m2 ? this._weekdaysMin[m2.day()] : this._weekdaysMin;
  }
  function handleStrictParse$1(weekdayName, format2, strict) {
    var i2, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];
      for (i2 = 0; i2 < 7; ++i2) {
        mom = createUTC([2e3, 1]).day(i2);
        this._minWeekdaysParse[i2] = this.weekdaysMin(
          mom,
          ""
        ).toLocaleLowerCase();
        this._shortWeekdaysParse[i2] = this.weekdaysShort(
          mom,
          ""
        ).toLocaleLowerCase();
        this._weekdaysParse[i2] = this.weekdays(mom, "").toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format2 === "dddd") {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format2 === "ddd") {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format2 === "dddd") {
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format2 === "ddd") {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }
  function localeWeekdaysParse(weekdayName, format2, strict) {
    var i2, mom, regex;
    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format2, strict);
    }
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }
    for (i2 = 0; i2 < 7; i2++) {
      mom = createUTC([2e3, 1]).day(i2);
      if (strict && !this._fullWeekdaysParse[i2]) {
        this._fullWeekdaysParse[i2] = new RegExp(
          "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
          "i"
        );
        this._shortWeekdaysParse[i2] = new RegExp(
          "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
          "i"
        );
        this._minWeekdaysParse[i2] = new RegExp(
          "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
          "i"
        );
      }
      if (!this._weekdaysParse[i2]) {
        regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
        this._weekdaysParse[i2] = new RegExp(regex.replace(".", ""), "i");
      }
      if (strict && format2 === "dddd" && this._fullWeekdaysParse[i2].test(weekdayName)) {
        return i2;
      } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i2].test(weekdayName)) {
        return i2;
      } else if (strict && format2 === "dd" && this._minWeekdaysParse[i2].test(weekdayName)) {
        return i2;
      } else if (!strict && this._weekdaysParse[i2].test(weekdayName)) {
        return i2;
      }
    }
  }
  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, "d");
    } else {
      return day;
    }
  }
  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, "d");
  }
  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }
  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }
      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }
  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysShortRegex")) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }
      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }
  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysMinRegex")) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }
      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }
  function computeWeekdaysParse() {
    function cmpLenRev(a2, b2) {
      return b2.length - a2.length;
    }
    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i2, mom, minp, shortp, longp;
    for (i2 = 0; i2 < 7; i2++) {
      mom = createUTC([2e3, 1]).day(i2);
      minp = regexEscape(this.weekdaysMin(mom, ""));
      shortp = regexEscape(this.weekdaysShort(mom, ""));
      longp = regexEscape(this.weekdays(mom, ""));
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    }
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp(
      "^(" + longPieces.join("|") + ")",
      "i"
    );
    this._weekdaysShortStrictRegex = new RegExp(
      "^(" + shortPieces.join("|") + ")",
      "i"
    );
    this._weekdaysMinStrictRegex = new RegExp(
      "^(" + minPieces.join("|") + ")",
      "i"
    );
  }
  function hFormat() {
    return this.hours() % 12 || 12;
  }
  function kFormat() {
    return this.hours() || 24;
  }
  addFormatToken("H", ["HH", 2], 0, "hour");
  addFormatToken("h", ["hh", 2], 0, hFormat);
  addFormatToken("k", ["kk", 2], 0, kFormat);
  addFormatToken("hmm", 0, 0, function() {
    return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken("hmmss", 0, 0, function() {
    return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  addFormatToken("Hmm", 0, 0, function() {
    return "" + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken("Hmmss", 0, 0, function() {
    return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  function meridiem(token2, lowercase) {
    addFormatToken(token2, 0, 0, function() {
      return this.localeData().meridiem(
        this.hours(),
        this.minutes(),
        lowercase
      );
    });
  }
  meridiem("a", true);
  meridiem("A", false);
  addUnitAlias("hour", "h");
  addUnitPriority("hour", 13);
  function matchMeridiem(isStrict, locale2) {
    return locale2._meridiemParse;
  }
  addRegexToken("a", matchMeridiem);
  addRegexToken("A", matchMeridiem);
  addRegexToken("H", match1to2);
  addRegexToken("h", match1to2);
  addRegexToken("k", match1to2);
  addRegexToken("HH", match1to2, match2);
  addRegexToken("hh", match1to2, match2);
  addRegexToken("kk", match1to2, match2);
  addRegexToken("hmm", match3to4);
  addRegexToken("hmmss", match5to6);
  addRegexToken("Hmm", match3to4);
  addRegexToken("Hmmss", match5to6);
  addParseToken(["H", "HH"], HOUR);
  addParseToken(["k", "kk"], function(input, array2, config2) {
    var kInput = toInt(input);
    array2[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(["a", "A"], function(input, array2, config2) {
    config2._isPm = config2._locale.isPM(input);
    config2._meridiem = input;
  });
  addParseToken(["h", "hh"], function(input, array2, config2) {
    array2[HOUR] = toInt(input);
    getParsingFlags(config2).bigHour = true;
  });
  addParseToken("hmm", function(input, array2, config2) {
    var pos = input.length - 2;
    array2[HOUR] = toInt(input.substr(0, pos));
    array2[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config2).bigHour = true;
  });
  addParseToken("hmmss", function(input, array2, config2) {
    var pos1 = input.length - 4, pos2 = input.length - 2;
    array2[HOUR] = toInt(input.substr(0, pos1));
    array2[MINUTE] = toInt(input.substr(pos1, 2));
    array2[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config2).bigHour = true;
  });
  addParseToken("Hmm", function(input, array2, config2) {
    var pos = input.length - 2;
    array2[HOUR] = toInt(input.substr(0, pos));
    array2[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken("Hmmss", function(input, array2, config2) {
    var pos1 = input.length - 4, pos2 = input.length - 2;
    array2[HOUR] = toInt(input.substr(0, pos1));
    array2[MINUTE] = toInt(input.substr(pos1, 2));
    array2[SECOND] = toInt(input.substr(pos2));
  });
  function localeIsPM(input) {
    return (input + "").toLowerCase().charAt(0) === "p";
  }
  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
  function localeMeridiem(hours2, minutes2, isLower) {
    if (hours2 > 11) {
      return isLower ? "pm" : "PM";
    } else {
      return isLower ? "am" : "AM";
    }
  }
  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
  };
  var locales = {}, localeFamilies = {}, globalLocale;
  function commonPrefix(arr1, arr2) {
    var i2, minl = Math.min(arr1.length, arr2.length);
    for (i2 = 0; i2 < minl; i2 += 1) {
      if (arr1[i2] !== arr2[i2]) {
        return i2;
      }
    }
    return minl;
  }
  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace("_", "-") : key;
  }
  function chooseLocale(names) {
    var i2 = 0, j2, next, locale2, split;
    while (i2 < names.length) {
      split = normalizeLocale(names[i2]).split("-");
      j2 = split.length;
      next = normalizeLocale(names[i2 + 1]);
      next = next ? next.split("-") : null;
      while (j2 > 0) {
        locale2 = loadLocale(split.slice(0, j2).join("-"));
        if (locale2) {
          return locale2;
        }
        if (next && next.length >= j2 && commonPrefix(split, next) >= j2 - 1) {
          break;
        }
        j2--;
      }
      i2++;
    }
    return globalLocale;
  }
  function isLocaleNameSane(name) {
    return name.match("^[^/\\\\]*$") != null;
  }
  function loadLocale(name) {
    var oldLocale = null, aliasedRequire;
    if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
      try {
        oldLocale = globalLocale._abbr;
        aliasedRequire = require;
        aliasedRequire("./locale/" + name);
        getSetGlobalLocale(oldLocale);
      } catch (e2) {
        locales[name] = null;
      }
    }
    return locales[name];
  }
  function getSetGlobalLocale(key, values) {
    var data;
    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }
      if (data) {
        globalLocale = data;
      } else {
        if (typeof console !== "undefined" && console.warn) {
          formatAppLog(
            "warn",
            "at node_modules/moment/dist/moment.js:2125",
            "Locale " + key + " not found. Did you forget to load it?"
          );
        }
      }
    }
    return globalLocale._abbr;
  }
  function defineLocale(name, config2) {
    if (config2 !== null) {
      var locale2, parentConfig = baseConfig;
      config2.abbr = name;
      if (locales[name] != null) {
        deprecateSimple(
          "defineLocaleOverride",
          "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
        );
        parentConfig = locales[name]._config;
      } else if (config2.parentLocale != null) {
        if (locales[config2.parentLocale] != null) {
          parentConfig = locales[config2.parentLocale]._config;
        } else {
          locale2 = loadLocale(config2.parentLocale);
          if (locale2 != null) {
            parentConfig = locale2._config;
          } else {
            if (!localeFamilies[config2.parentLocale]) {
              localeFamilies[config2.parentLocale] = [];
            }
            localeFamilies[config2.parentLocale].push({
              name,
              config: config2
            });
            return null;
          }
        }
      }
      locales[name] = new Locale(mergeConfigs(parentConfig, config2));
      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function(x2) {
          defineLocale(x2.name, x2.config);
        });
      }
      getSetGlobalLocale(name);
      return locales[name];
    } else {
      delete locales[name];
      return null;
    }
  }
  function updateLocale(name, config2) {
    if (config2 != null) {
      var locale2, tmpLocale, parentConfig = baseConfig;
      if (locales[name] != null && locales[name].parentLocale != null) {
        locales[name].set(mergeConfigs(locales[name]._config, config2));
      } else {
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
          parentConfig = tmpLocale._config;
        }
        config2 = mergeConfigs(parentConfig, config2);
        if (tmpLocale == null) {
          config2.abbr = name;
        }
        locale2 = new Locale(config2);
        locale2.parentLocale = locales[name];
        locales[name] = locale2;
      }
      getSetGlobalLocale(name);
    } else {
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;
          if (name === getSetGlobalLocale()) {
            getSetGlobalLocale(name);
          }
        } else if (locales[name] != null) {
          delete locales[name];
        }
      }
    }
    return locales[name];
  }
  function getLocale(key) {
    var locale2;
    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }
    if (!key) {
      return globalLocale;
    }
    if (!isArray$1(key)) {
      locale2 = loadLocale(key);
      if (locale2) {
        return locale2;
      }
      key = [key];
    }
    return chooseLocale(key);
  }
  function listLocales() {
    return keys(locales);
  }
  function checkOverflow(m2) {
    var overflow, a2 = m2._a;
    if (a2 && getParsingFlags(m2).overflow === -2) {
      overflow = a2[MONTH] < 0 || a2[MONTH] > 11 ? MONTH : a2[DATE] < 1 || a2[DATE] > daysInMonth(a2[YEAR], a2[MONTH]) ? DATE : a2[HOUR] < 0 || a2[HOUR] > 24 || a2[HOUR] === 24 && (a2[MINUTE] !== 0 || a2[SECOND] !== 0 || a2[MILLISECOND] !== 0) ? HOUR : a2[MINUTE] < 0 || a2[MINUTE] > 59 ? MINUTE : a2[SECOND] < 0 || a2[SECOND] > 59 ? SECOND : a2[MILLISECOND] < 0 || a2[MILLISECOND] > 999 ? MILLISECOND : -1;
      if (getParsingFlags(m2)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }
      if (getParsingFlags(m2)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }
      if (getParsingFlags(m2)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }
      getParsingFlags(m2).overflow = overflow;
    }
    return m2;
  }
  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
    ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
    ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
    ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
    ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
    ["YYYY-DDD", /\d{4}-\d{3}/],
    ["YYYY-MM", /\d{4}-\d\d/, false],
    ["YYYYYYMMDD", /[+-]\d{10}/],
    ["YYYYMMDD", /\d{8}/],
    ["GGGG[W]WWE", /\d{4}W\d{3}/],
    ["GGGG[W]WW", /\d{4}W\d{2}/, false],
    ["YYYYDDD", /\d{7}/],
    ["YYYYMM", /\d{6}/, false],
    ["YYYY", /\d{4}/, false]
  ], isoTimes = [
    ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
    ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
    ["HH:mm:ss", /\d\d:\d\d:\d\d/],
    ["HH:mm", /\d\d:\d\d/],
    ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
    ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
    ["HHmmss", /\d\d\d\d\d\d/],
    ["HHmm", /\d\d\d\d/],
    ["HH", /\d\d/]
  ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
  };
  function configFromISO(config2) {
    var i2, l2, string = config2._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat2, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
    if (match) {
      getParsingFlags(config2).iso = true;
      for (i2 = 0, l2 = isoDatesLen; i2 < l2; i2++) {
        if (isoDates[i2][1].exec(match[1])) {
          dateFormat = isoDates[i2][0];
          allowTime = isoDates[i2][2] !== false;
          break;
        }
      }
      if (dateFormat == null) {
        config2._isValid = false;
        return;
      }
      if (match[3]) {
        for (i2 = 0, l2 = isoTimesLen; i2 < l2; i2++) {
          if (isoTimes[i2][1].exec(match[3])) {
            timeFormat2 = (match[2] || " ") + isoTimes[i2][0];
            break;
          }
        }
        if (timeFormat2 == null) {
          config2._isValid = false;
          return;
        }
      }
      if (!allowTime && timeFormat2 != null) {
        config2._isValid = false;
        return;
      }
      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = "Z";
        } else {
          config2._isValid = false;
          return;
        }
      }
      config2._f = dateFormat + (timeFormat2 || "") + (tzFormat || "");
      configFromStringAndFormat(config2);
    } else {
      config2._isValid = false;
    }
  }
  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
      untruncateYear(yearStr),
      defaultLocaleMonthsShort.indexOf(monthStr),
      parseInt(dayStr, 10),
      parseInt(hourStr, 10),
      parseInt(minuteStr, 10)
    ];
    if (secondStr) {
      result.push(parseInt(secondStr, 10));
    }
    return result;
  }
  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
      return 2e3 + year;
    } else if (year <= 999) {
      return 1900 + year;
    }
    return year;
  }
  function preprocessRFC2822(s2) {
    return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  function checkWeekday(weekdayStr, parsedInput, config2) {
    if (weekdayStr) {
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
        parsedInput[0],
        parsedInput[1],
        parsedInput[2]
      ).getDay();
      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config2).weekdayMismatch = true;
        config2._isValid = false;
        return false;
      }
    }
    return true;
  }
  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset];
    } else if (militaryOffset) {
      return 0;
    } else {
      var hm = parseInt(numOffset, 10), m2 = hm % 100, h2 = (hm - m2) / 100;
      return h2 * 60 + m2;
    }
  }
  function configFromRFC2822(config2) {
    var match = rfc2822.exec(preprocessRFC2822(config2._i)), parsedArray;
    if (match) {
      parsedArray = extractFromRFC2822Strings(
        match[4],
        match[3],
        match[2],
        match[5],
        match[6],
        match[7]
      );
      if (!checkWeekday(match[1], parsedArray, config2)) {
        return;
      }
      config2._a = parsedArray;
      config2._tzm = calculateOffset(match[8], match[9], match[10]);
      config2._d = createUTCDate.apply(null, config2._a);
      config2._d.setUTCMinutes(config2._d.getUTCMinutes() - config2._tzm);
      getParsingFlags(config2).rfc2822 = true;
    } else {
      config2._isValid = false;
    }
  }
  function configFromString(config2) {
    var matched = aspNetJsonRegex.exec(config2._i);
    if (matched !== null) {
      config2._d = /* @__PURE__ */ new Date(+matched[1]);
      return;
    }
    configFromISO(config2);
    if (config2._isValid === false) {
      delete config2._isValid;
    } else {
      return;
    }
    configFromRFC2822(config2);
    if (config2._isValid === false) {
      delete config2._isValid;
    } else {
      return;
    }
    if (config2._strict) {
      config2._isValid = false;
    } else {
      hooks.createFromInputFallback(config2);
    }
  }
  hooks.createFromInputFallback = deprecate(
    "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
    function(config2) {
      config2._d = /* @__PURE__ */ new Date(config2._i + (config2._useUTC ? " UTC" : ""));
    }
  );
  function defaults(a2, b2, c2) {
    if (a2 != null) {
      return a2;
    }
    if (b2 != null) {
      return b2;
    }
    return c2;
  }
  function currentDateArray(config2) {
    var nowValue = new Date(hooks.now());
    if (config2._useUTC) {
      return [
        nowValue.getUTCFullYear(),
        nowValue.getUTCMonth(),
        nowValue.getUTCDate()
      ];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  }
  function configFromArray(config2) {
    var i2, date2, input = [], currentDate, expectedWeekday, yearToUse;
    if (config2._d) {
      return;
    }
    currentDate = currentDateArray(config2);
    if (config2._w && config2._a[DATE] == null && config2._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config2);
    }
    if (config2._dayOfYear != null) {
      yearToUse = defaults(config2._a[YEAR], currentDate[YEAR]);
      if (config2._dayOfYear > daysInYear(yearToUse) || config2._dayOfYear === 0) {
        getParsingFlags(config2)._overflowDayOfYear = true;
      }
      date2 = createUTCDate(yearToUse, 0, config2._dayOfYear);
      config2._a[MONTH] = date2.getUTCMonth();
      config2._a[DATE] = date2.getUTCDate();
    }
    for (i2 = 0; i2 < 3 && config2._a[i2] == null; ++i2) {
      config2._a[i2] = input[i2] = currentDate[i2];
    }
    for (; i2 < 7; i2++) {
      config2._a[i2] = input[i2] = config2._a[i2] == null ? i2 === 2 ? 1 : 0 : config2._a[i2];
    }
    if (config2._a[HOUR] === 24 && config2._a[MINUTE] === 0 && config2._a[SECOND] === 0 && config2._a[MILLISECOND] === 0) {
      config2._nextDay = true;
      config2._a[HOUR] = 0;
    }
    config2._d = (config2._useUTC ? createUTCDate : createDate).apply(
      null,
      input
    );
    expectedWeekday = config2._useUTC ? config2._d.getUTCDay() : config2._d.getDay();
    if (config2._tzm != null) {
      config2._d.setUTCMinutes(config2._d.getUTCMinutes() - config2._tzm);
    }
    if (config2._nextDay) {
      config2._a[HOUR] = 24;
    }
    if (config2._w && typeof config2._w.d !== "undefined" && config2._w.d !== expectedWeekday) {
      getParsingFlags(config2).weekdayMismatch = true;
    }
  }
  function dayOfYearFromWeekInfo(config2) {
    var w2, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
    w2 = config2._w;
    if (w2.GG != null || w2.W != null || w2.E != null) {
      dow = 1;
      doy = 4;
      weekYear = defaults(
        w2.GG,
        config2._a[YEAR],
        weekOfYear(createLocal(), 1, 4).year
      );
      week = defaults(w2.W, 1);
      weekday = defaults(w2.E, 1);
      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config2._locale._week.dow;
      doy = config2._locale._week.doy;
      curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w2.gg, config2._a[YEAR], curWeek.year);
      week = defaults(w2.w, curWeek.week);
      if (w2.d != null) {
        weekday = w2.d;
        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else if (w2.e != null) {
        weekday = w2.e + dow;
        if (w2.e < 0 || w2.e > 6) {
          weekdayOverflow = true;
        }
      } else {
        weekday = dow;
      }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config2)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
      getParsingFlags(config2)._overflowWeekday = true;
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config2._a[YEAR] = temp.year;
      config2._dayOfYear = temp.dayOfYear;
    }
  }
  hooks.ISO_8601 = function() {
  };
  hooks.RFC_2822 = function() {
  };
  function configFromStringAndFormat(config2) {
    if (config2._f === hooks.ISO_8601) {
      configFromISO(config2);
      return;
    }
    if (config2._f === hooks.RFC_2822) {
      configFromRFC2822(config2);
      return;
    }
    config2._a = [];
    getParsingFlags(config2).empty = true;
    var string = "" + config2._i, i2, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
    tokens2 = expandFormat(config2._f, config2._locale).match(formattingTokens) || [];
    tokenLen = tokens2.length;
    for (i2 = 0; i2 < tokenLen; i2++) {
      token2 = tokens2[i2];
      parsedInput = (string.match(getParseRegexForToken(token2, config2)) || [])[0];
      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));
        if (skipped.length > 0) {
          getParsingFlags(config2).unusedInput.push(skipped);
        }
        string = string.slice(
          string.indexOf(parsedInput) + parsedInput.length
        );
        totalParsedInputLength += parsedInput.length;
      }
      if (formatTokenFunctions[token2]) {
        if (parsedInput) {
          getParsingFlags(config2).empty = false;
        } else {
          getParsingFlags(config2).unusedTokens.push(token2);
        }
        addTimeToArrayFromToken(token2, parsedInput, config2);
      } else if (config2._strict && !parsedInput) {
        getParsingFlags(config2).unusedTokens.push(token2);
      }
    }
    getParsingFlags(config2).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
      getParsingFlags(config2).unusedInput.push(string);
    }
    if (config2._a[HOUR] <= 12 && getParsingFlags(config2).bigHour === true && config2._a[HOUR] > 0) {
      getParsingFlags(config2).bigHour = void 0;
    }
    getParsingFlags(config2).parsedDateParts = config2._a.slice(0);
    getParsingFlags(config2).meridiem = config2._meridiem;
    config2._a[HOUR] = meridiemFixWrap(
      config2._locale,
      config2._a[HOUR],
      config2._meridiem
    );
    era = getParsingFlags(config2).era;
    if (era !== null) {
      config2._a[YEAR] = config2._locale.erasConvertYear(era, config2._a[YEAR]);
    }
    configFromArray(config2);
    checkOverflow(config2);
  }
  function meridiemFixWrap(locale2, hour, meridiem2) {
    var isPm;
    if (meridiem2 == null) {
      return hour;
    }
    if (locale2.meridiemHour != null) {
      return locale2.meridiemHour(hour, meridiem2);
    } else if (locale2.isPM != null) {
      isPm = locale2.isPM(meridiem2);
      if (isPm && hour < 12) {
        hour += 12;
      }
      if (!isPm && hour === 12) {
        hour = 0;
      }
      return hour;
    } else {
      return hour;
    }
  }
  function configFromStringAndArray(config2) {
    var tempConfig, bestMoment, scoreToBeat, i2, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config2._f.length;
    if (configfLen === 0) {
      getParsingFlags(config2).invalidFormat = true;
      config2._d = /* @__PURE__ */ new Date(NaN);
      return;
    }
    for (i2 = 0; i2 < configfLen; i2++) {
      currentScore = 0;
      validFormatFound = false;
      tempConfig = copyConfig({}, config2);
      if (config2._useUTC != null) {
        tempConfig._useUTC = config2._useUTC;
      }
      tempConfig._f = config2._f[i2];
      configFromStringAndFormat(tempConfig);
      if (isValid(tempConfig)) {
        validFormatFound = true;
      }
      currentScore += getParsingFlags(tempConfig).charsLeftOver;
      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;
      if (!bestFormatIsValid) {
        if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
          if (validFormatFound) {
            bestFormatIsValid = true;
          }
        }
      } else {
        if (currentScore < scoreToBeat) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
        }
      }
    }
    extend(config2, bestMoment || tempConfig);
  }
  function configFromObject(config2) {
    if (config2._d) {
      return;
    }
    var i2 = normalizeObjectUnits(config2._i), dayOrDate = i2.day === void 0 ? i2.date : i2.day;
    config2._a = map(
      [i2.year, i2.month, dayOrDate, i2.hour, i2.minute, i2.second, i2.millisecond],
      function(obj) {
        return obj && parseInt(obj, 10);
      }
    );
    configFromArray(config2);
  }
  function createFromConfig(config2) {
    var res = new Moment(checkOverflow(prepareConfig(config2)));
    if (res._nextDay) {
      res.add(1, "d");
      res._nextDay = void 0;
    }
    return res;
  }
  function prepareConfig(config2) {
    var input = config2._i, format2 = config2._f;
    config2._locale = config2._locale || getLocale(config2._l);
    if (input === null || format2 === void 0 && input === "") {
      return createInvalid({ nullInput: true });
    }
    if (typeof input === "string") {
      config2._i = input = config2._locale.preparse(input);
    }
    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
      config2._d = input;
    } else if (isArray$1(format2)) {
      configFromStringAndArray(config2);
    } else if (format2) {
      configFromStringAndFormat(config2);
    } else {
      configFromInput(config2);
    }
    if (!isValid(config2)) {
      config2._d = null;
    }
    return config2;
  }
  function configFromInput(config2) {
    var input = config2._i;
    if (isUndefined(input)) {
      config2._d = new Date(hooks.now());
    } else if (isDate(input)) {
      config2._d = new Date(input.valueOf());
    } else if (typeof input === "string") {
      configFromString(config2);
    } else if (isArray$1(input)) {
      config2._a = map(input.slice(0), function(obj) {
        return parseInt(obj, 10);
      });
      configFromArray(config2);
    } else if (isObject(input)) {
      configFromObject(config2);
    } else if (isNumber(input)) {
      config2._d = new Date(input);
    } else {
      hooks.createFromInputFallback(config2);
    }
  }
  function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
    var c2 = {};
    if (format2 === true || format2 === false) {
      strict = format2;
      format2 = void 0;
    }
    if (locale2 === true || locale2 === false) {
      strict = locale2;
      locale2 = void 0;
    }
    if (isObject(input) && isObjectEmpty(input) || isArray$1(input) && input.length === 0) {
      input = void 0;
    }
    c2._isAMomentObject = true;
    c2._useUTC = c2._isUTC = isUTC;
    c2._l = locale2;
    c2._i = input;
    c2._f = format2;
    c2._strict = strict;
    return createFromConfig(c2);
  }
  function createLocal(input, format2, locale2, strict) {
    return createLocalOrUTC(input, format2, locale2, strict, false);
  }
  var prototypeMin = deprecate(
    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
    function() {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other < this ? this : other;
      } else {
        return createInvalid();
      }
    }
  ), prototypeMax = deprecate(
    "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
    function() {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other > this ? this : other;
      } else {
        return createInvalid();
      }
    }
  );
  function pickBy(fn, moments) {
    var res, i2;
    if (moments.length === 1 && isArray$1(moments[0])) {
      moments = moments[0];
    }
    if (!moments.length) {
      return createLocal();
    }
    res = moments[0];
    for (i2 = 1; i2 < moments.length; ++i2) {
      if (!moments[i2].isValid() || moments[i2][fn](res)) {
        res = moments[i2];
      }
    }
    return res;
  }
  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy("isBefore", args);
  }
  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy("isAfter", args);
  }
  var now$1 = function() {
    return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
  };
  var ordering = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond"
  ];
  function isDurationValid(m2) {
    var key, unitHasDecimal = false, i2, orderLen = ordering.length;
    for (key in m2) {
      if (hasOwnProp(m2, key) && !(indexOf.call(ordering, key) !== -1 && (m2[key] == null || !isNaN(m2[key])))) {
        return false;
      }
    }
    for (i2 = 0; i2 < orderLen; ++i2) {
      if (m2[ordering[i2]]) {
        if (unitHasDecimal) {
          return false;
        }
        if (parseFloat(m2[ordering[i2]]) !== toInt(m2[ordering[i2]])) {
          unitHasDecimal = true;
        }
      }
    }
    return true;
  }
  function isValid$1() {
    return this._isValid;
  }
  function createInvalid$1() {
    return createDuration(NaN);
  }
  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput);
    this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
    minutes2 * 6e4 + // 1000 * 60
    hours2 * 1e3 * 60 * 60;
    this._days = +days2 + weeks2 * 7;
    this._months = +months2 + quarters * 3 + years2 * 12;
    this._data = {};
    this._locale = getLocale();
    this._bubble();
  }
  function isDuration(obj) {
    return obj instanceof Duration;
  }
  function absRound(number2) {
    if (number2 < 0) {
      return Math.round(-1 * number2) * -1;
    } else {
      return Math.round(number2);
    }
  }
  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i2;
    for (i2 = 0; i2 < len; i2++) {
      if (dontConvert && array1[i2] !== array2[i2] || !dontConvert && toInt(array1[i2]) !== toInt(array2[i2])) {
        diffs++;
      }
    }
    return diffs + lengthDiff;
  }
  function offset(token2, separator) {
    addFormatToken(token2, 0, 0, function() {
      var offset2 = this.utcOffset(), sign2 = "+";
      if (offset2 < 0) {
        offset2 = -offset2;
        sign2 = "-";
      }
      return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
    });
  }
  offset("Z", ":");
  offset("ZZ", "");
  addRegexToken("Z", matchShortOffset);
  addRegexToken("ZZ", matchShortOffset);
  addParseToken(["Z", "ZZ"], function(input, array2, config2) {
    config2._useUTC = true;
    config2._tzm = offsetFromString(matchShortOffset, input);
  });
  var chunkOffset = /([\+\-]|\d\d)/gi;
  function offsetFromString(matcher, string) {
    var matches = (string || "").match(matcher), chunk, parts, minutes2;
    if (matches === null) {
      return null;
    }
    chunk = matches[matches.length - 1] || [];
    parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
    minutes2 = +(parts[1] * 60) + toInt(parts[2]);
    return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
  }
  function cloneWithOffset(input, model) {
    var res, diff2;
    if (model._isUTC) {
      res = model.clone();
      diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
      res._d.setTime(res._d.valueOf() + diff2);
      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }
  function getDateOffset(m2) {
    return -Math.round(m2._d.getTimezoneOffset());
  }
  hooks.updateOffset = function() {
  };
  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset2 = this._offset || 0, localAdjust;
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    if (input != null) {
      if (typeof input === "string") {
        input = offsetFromString(matchShortOffset, input);
        if (input === null) {
          return this;
        }
      } else if (Math.abs(input) < 16 && !keepMinutes) {
        input = input * 60;
      }
      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }
      this._offset = input;
      this._isUTC = true;
      if (localAdjust != null) {
        this.add(localAdjust, "m");
      }
      if (offset2 !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(
            this,
            createDuration(input - offset2, "m"),
            1,
            false
          );
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null;
        }
      }
      return this;
    } else {
      return this._isUTC ? offset2 : getDateOffset(this);
    }
  }
  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== "string") {
        input = -input;
      }
      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }
  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }
  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;
      if (keepLocalTime) {
        this.subtract(getDateOffset(this), "m");
      }
    }
    return this;
  }
  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === "string") {
      var tZone = offsetFromString(matchOffset, this._i);
      if (tZone != null) {
        this.utcOffset(tZone);
      } else {
        this.utcOffset(0, true);
      }
    }
    return this;
  }
  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }
  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }
  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }
    var c2 = {}, other;
    copyConfig(c2, this);
    c2 = prepareConfig(c2);
    if (c2._a) {
      other = c2._isUTC ? createUTC(c2._a) : createLocal(c2._a);
      this._isDSTShifted = this.isValid() && compareArrays(c2._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }
    return this._isDSTShifted;
  }
  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }
  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }
  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  }
  var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function createDuration(input, key) {
    var duration = input, match = null, sign2, ret, diffRes;
    if (isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months
      };
    } else if (isNumber(input) || !isNaN(+input)) {
      duration = {};
      if (key) {
        duration[key] = +input;
      } else {
        duration.milliseconds = +input;
      }
    } else if (match = aspNetRegex.exec(input)) {
      sign2 = match[1] === "-" ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign2,
        h: toInt(match[HOUR]) * sign2,
        m: toInt(match[MINUTE]) * sign2,
        s: toInt(match[SECOND]) * sign2,
        ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
        // the millisecond decimal point is included in the match
      };
    } else if (match = isoRegex.exec(input)) {
      sign2 = match[1] === "-" ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign2),
        M: parseIso(match[3], sign2),
        w: parseIso(match[4], sign2),
        d: parseIso(match[5], sign2),
        h: parseIso(match[6], sign2),
        m: parseIso(match[7], sign2),
        s: parseIso(match[8], sign2)
      };
    } else if (duration == null) {
      duration = {};
    } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
      diffRes = momentsDifference(
        createLocal(duration.from),
        createLocal(duration.to)
      );
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }
    ret = new Duration(duration);
    if (isDuration(input) && hasOwnProp(input, "_locale")) {
      ret._locale = input._locale;
    }
    if (isDuration(input) && hasOwnProp(input, "_isValid")) {
      ret._isValid = input._isValid;
    }
    return ret;
  }
  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;
  function parseIso(inp, sign2) {
    var res = inp && parseFloat(inp.replace(",", "."));
    return (isNaN(res) ? 0 : res) * sign2;
  }
  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, "M").isAfter(other)) {
      --res.months;
    }
    res.milliseconds = +other - +base.clone().add(res.months, "M");
    return res;
  }
  function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
      return { milliseconds: 0, months: 0 };
    }
    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }
    return res;
  }
  function createAdder(direction, name) {
    return function(val, period) {
      var dur, tmp;
      if (period !== null && !isNaN(+period)) {
        deprecateSimple(
          name,
          "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
        );
        tmp = val;
        val = period;
        period = tmp;
      }
      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this;
    };
  }
  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
    if (!mom.isValid()) {
      return;
    }
    updateOffset = updateOffset == null ? true : updateOffset;
    if (months2) {
      setMonth(mom, get(mom, "Month") + months2 * isAdding);
    }
    if (days2) {
      set$1$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
    }
    if (milliseconds2) {
      mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
    }
    if (updateOffset) {
      hooks.updateOffset(mom, days2 || months2);
    }
  }
  var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
  function isString(input) {
    return typeof input === "string" || input instanceof String;
  }
  function isMomentInput(input) {
    return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
  }
  function isMomentInputObject(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
      "years",
      "year",
      "y",
      "months",
      "month",
      "M",
      "days",
      "day",
      "d",
      "dates",
      "date",
      "D",
      "hours",
      "hour",
      "h",
      "minutes",
      "minute",
      "m",
      "seconds",
      "second",
      "s",
      "milliseconds",
      "millisecond",
      "ms"
    ], i2, property, propertyLen = properties.length;
    for (i2 = 0; i2 < propertyLen; i2 += 1) {
      property = properties[i2];
      propertyTest = propertyTest || hasOwnProp(input, property);
    }
    return objectTest && propertyTest;
  }
  function isNumberOrStringArray(input) {
    var arrayTest = isArray$1(input), dataTypeTest = false;
    if (arrayTest) {
      dataTypeTest = input.filter(function(item) {
        return !isNumber(item) && isString(input);
      }).length === 0;
    }
    return arrayTest && dataTypeTest;
  }
  function isCalendarSpec(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
      "sameDay",
      "nextDay",
      "lastDay",
      "nextWeek",
      "lastWeek",
      "sameElse"
    ], i2, property;
    for (i2 = 0; i2 < properties.length; i2 += 1) {
      property = properties[i2];
      propertyTest = propertyTest || hasOwnProp(input, property);
    }
    return objectTest && propertyTest;
  }
  function getCalendarFormat(myMoment, now2) {
    var diff2 = myMoment.diff(now2, "days", true);
    return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
  }
  function calendar$1(time, formats) {
    if (arguments.length === 1) {
      if (!arguments[0]) {
        time = void 0;
        formats = void 0;
      } else if (isMomentInput(arguments[0])) {
        time = arguments[0];
        formats = void 0;
      } else if (isCalendarSpec(arguments[0])) {
        formats = arguments[0];
        time = void 0;
      }
    }
    var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
    return this.format(
      output || this.localeData().calendar(format2, this, createLocal(now2))
    );
  }
  function clone() {
    return new Moment(this);
  }
  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() > localInput.valueOf();
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
  }
  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() < localInput.valueOf();
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
  }
  function isBetween(from2, to2, units, inclusivity) {
    var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false;
    }
    inclusivity = inclusivity || "()";
    return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  }
  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input), inputMs;
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
  }
  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }
  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }
  function diff(input, units, asFloat) {
    var that, zoneDelta, output;
    if (!this.isValid()) {
      return NaN;
    }
    that = cloneWithOffset(input, this);
    if (!that.isValid()) {
      return NaN;
    }
    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);
    switch (units) {
      case "year":
        output = monthDiff(this, that) / 12;
        break;
      case "month":
        output = monthDiff(this, that);
        break;
      case "quarter":
        output = monthDiff(this, that) / 3;
        break;
      case "second":
        output = (this - that) / 1e3;
        break;
      case "minute":
        output = (this - that) / 6e4;
        break;
      case "hour":
        output = (this - that) / 36e5;
        break;
      case "day":
        output = (this - that - zoneDelta) / 864e5;
        break;
      case "week":
        output = (this - that - zoneDelta) / 6048e5;
        break;
      default:
        output = this - that;
    }
    return asFloat ? output : absFloor(output);
  }
  function monthDiff(a2, b2) {
    if (a2.date() < b2.date()) {
      return -monthDiff(b2, a2);
    }
    var wholeMonthDiff = (b2.year() - a2.year()) * 12 + (b2.month() - a2.month()), anchor = a2.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
    if (b2 - anchor < 0) {
      anchor2 = a2.clone().add(wholeMonthDiff - 1, "months");
      adjust = (b2 - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a2.clone().add(wholeMonthDiff + 1, "months");
      adjust = (b2 - anchor) / (anchor2 - anchor);
    }
    return -(wholeMonthDiff + adjust) || 0;
  }
  hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
  hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  function toString() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }
  function toISOString(keepOffset) {
    if (!this.isValid()) {
      return null;
    }
    var utc = keepOffset !== true, m2 = utc ? this.clone().utc() : this;
    if (m2.year() < 0 || m2.year() > 9999) {
      return formatMoment(
        m2,
        utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
      );
    }
    if (isFunction(Date.prototype.toISOString)) {
      if (utc) {
        return this.toDate().toISOString();
      } else {
        return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m2, "Z"));
      }
    }
    return formatMoment(
      m2,
      utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  function inspect() {
    if (!this.isValid()) {
      return "moment.invalid(/* " + this._i + " */)";
    }
    var func = "moment", zone = "", prefix, year, datetime, suffix;
    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
      zone = "Z";
    }
    prefix = "[" + func + '("]';
    year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
    datetime = "-MM-DD[T]HH:mm:ss.SSS";
    suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }
  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }
  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }
  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }
  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }
  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  }
  function locale(key) {
    var newLocaleData;
    if (key === void 0) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);
      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }
      return this;
    }
  }
  var lang = deprecate(
    "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
    function(key) {
      if (key === void 0) {
        return this.localeData();
      } else {
        return this.locale(key);
      }
    }
  );
  function localeData() {
    return this._locale;
  }
  var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
  function mod$1(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
  }
  function localStartOfDate(y2, m2, d2) {
    if (y2 < 100 && y2 >= 0) {
      return new Date(y2 + 400, m2, d2) - MS_PER_400_YEARS;
    } else {
      return new Date(y2, m2, d2).valueOf();
    }
  }
  function utcStartOfDate(y2, m2, d2) {
    if (y2 < 100 && y2 >= 0) {
      return Date.UTC(y2 + 400, m2, d2) - MS_PER_400_YEARS;
    } else {
      return Date.UTC(y2, m2, d2);
    }
  }
  function startOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);
    if (units === void 0 || units === "millisecond" || !this.isValid()) {
      return this;
    }
    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
    switch (units) {
      case "year":
        time = startOfDate(this.year(), 0, 1);
        break;
      case "quarter":
        time = startOfDate(
          this.year(),
          this.month() - this.month() % 3,
          1
        );
        break;
      case "month":
        time = startOfDate(this.year(), this.month(), 1);
        break;
      case "week":
        time = startOfDate(
          this.year(),
          this.month(),
          this.date() - this.weekday()
        );
        break;
      case "isoWeek":
        time = startOfDate(
          this.year(),
          this.month(),
          this.date() - (this.isoWeekday() - 1)
        );
        break;
      case "day":
      case "date":
        time = startOfDate(this.year(), this.month(), this.date());
        break;
      case "hour":
        time = this._d.valueOf();
        time -= mod$1(
          time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
          MS_PER_HOUR
        );
        break;
      case "minute":
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_MINUTE);
        break;
      case "second":
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_SECOND);
        break;
    }
    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this;
  }
  function endOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);
    if (units === void 0 || units === "millisecond" || !this.isValid()) {
      return this;
    }
    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
    switch (units) {
      case "year":
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;
      case "quarter":
        time = startOfDate(
          this.year(),
          this.month() - this.month() % 3 + 3,
          1
        ) - 1;
        break;
      case "month":
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;
      case "week":
        time = startOfDate(
          this.year(),
          this.month(),
          this.date() - this.weekday() + 7
        ) - 1;
        break;
      case "isoWeek":
        time = startOfDate(
          this.year(),
          this.month(),
          this.date() - (this.isoWeekday() - 1) + 7
        ) - 1;
        break;
      case "day":
      case "date":
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;
      case "hour":
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod$1(
          time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
          MS_PER_HOUR
        ) - 1;
        break;
      case "minute":
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
        break;
      case "second":
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        break;
    }
    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this;
  }
  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 6e4;
  }
  function unix() {
    return Math.floor(this.valueOf() / 1e3);
  }
  function toDate() {
    return new Date(this.valueOf());
  }
  function toArray() {
    var m2 = this;
    return [
      m2.year(),
      m2.month(),
      m2.date(),
      m2.hour(),
      m2.minute(),
      m2.second(),
      m2.millisecond()
    ];
  }
  function toObject() {
    var m2 = this;
    return {
      years: m2.year(),
      months: m2.month(),
      date: m2.date(),
      hours: m2.hours(),
      minutes: m2.minutes(),
      seconds: m2.seconds(),
      milliseconds: m2.milliseconds()
    };
  }
  function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  }
  function isValid$2() {
    return isValid(this);
  }
  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }
  function invalidAt() {
    return getParsingFlags(this).overflow;
  }
  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  }
  addFormatToken("N", 0, 0, "eraAbbr");
  addFormatToken("NN", 0, 0, "eraAbbr");
  addFormatToken("NNN", 0, 0, "eraAbbr");
  addFormatToken("NNNN", 0, 0, "eraName");
  addFormatToken("NNNNN", 0, 0, "eraNarrow");
  addFormatToken("y", ["y", 1], "yo", "eraYear");
  addFormatToken("y", ["yy", 2], 0, "eraYear");
  addFormatToken("y", ["yyy", 3], 0, "eraYear");
  addFormatToken("y", ["yyyy", 4], 0, "eraYear");
  addRegexToken("N", matchEraAbbr);
  addRegexToken("NN", matchEraAbbr);
  addRegexToken("NNN", matchEraAbbr);
  addRegexToken("NNNN", matchEraName);
  addRegexToken("NNNNN", matchEraNarrow);
  addParseToken(
    ["N", "NN", "NNN", "NNNN", "NNNNN"],
    function(input, array2, config2, token2) {
      var era = config2._locale.erasParse(input, token2, config2._strict);
      if (era) {
        getParsingFlags(config2).era = era;
      } else {
        getParsingFlags(config2).invalidEra = input;
      }
    }
  );
  addRegexToken("y", matchUnsigned);
  addRegexToken("yy", matchUnsigned);
  addRegexToken("yyy", matchUnsigned);
  addRegexToken("yyyy", matchUnsigned);
  addRegexToken("yo", matchEraYearOrdinal);
  addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
  addParseToken(["yo"], function(input, array2, config2, token2) {
    var match;
    if (config2._locale._eraYearOrdinalRegex) {
      match = input.match(config2._locale._eraYearOrdinalRegex);
    }
    if (config2._locale.eraYearOrdinalParse) {
      array2[YEAR] = config2._locale.eraYearOrdinalParse(input, match);
    } else {
      array2[YEAR] = parseInt(input, 10);
    }
  });
  function localeEras(m2, format2) {
    var i2, l2, date2, eras = this._eras || getLocale("en")._eras;
    for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
      switch (typeof eras[i2].since) {
        case "string":
          date2 = hooks(eras[i2].since).startOf("day");
          eras[i2].since = date2.valueOf();
          break;
      }
      switch (typeof eras[i2].until) {
        case "undefined":
          eras[i2].until = Infinity;
          break;
        case "string":
          date2 = hooks(eras[i2].until).startOf("day").valueOf();
          eras[i2].until = date2.valueOf();
          break;
      }
    }
    return eras;
  }
  function localeErasParse(eraName, format2, strict) {
    var i2, l2, eras = this.eras(), name, abbr, narrow;
    eraName = eraName.toUpperCase();
    for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
      name = eras[i2].name.toUpperCase();
      abbr = eras[i2].abbr.toUpperCase();
      narrow = eras[i2].narrow.toUpperCase();
      if (strict) {
        switch (format2) {
          case "N":
          case "NN":
          case "NNN":
            if (abbr === eraName) {
              return eras[i2];
            }
            break;
          case "NNNN":
            if (name === eraName) {
              return eras[i2];
            }
            break;
          case "NNNNN":
            if (narrow === eraName) {
              return eras[i2];
            }
            break;
        }
      } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
        return eras[i2];
      }
    }
  }
  function localeErasConvertYear(era, year) {
    var dir = era.since <= era.until ? 1 : -1;
    if (year === void 0) {
      return hooks(era.since).year();
    } else {
      return hooks(era.since).year() + (year - era.offset) * dir;
    }
  }
  function getEraName() {
    var i2, l2, val, eras = this.localeData().eras();
    for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
      val = this.clone().startOf("day").valueOf();
      if (eras[i2].since <= val && val <= eras[i2].until) {
        return eras[i2].name;
      }
      if (eras[i2].until <= val && val <= eras[i2].since) {
        return eras[i2].name;
      }
    }
    return "";
  }
  function getEraNarrow() {
    var i2, l2, val, eras = this.localeData().eras();
    for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
      val = this.clone().startOf("day").valueOf();
      if (eras[i2].since <= val && val <= eras[i2].until) {
        return eras[i2].narrow;
      }
      if (eras[i2].until <= val && val <= eras[i2].since) {
        return eras[i2].narrow;
      }
    }
    return "";
  }
  function getEraAbbr() {
    var i2, l2, val, eras = this.localeData().eras();
    for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
      val = this.clone().startOf("day").valueOf();
      if (eras[i2].since <= val && val <= eras[i2].until) {
        return eras[i2].abbr;
      }
      if (eras[i2].until <= val && val <= eras[i2].since) {
        return eras[i2].abbr;
      }
    }
    return "";
  }
  function getEraYear() {
    var i2, l2, dir, val, eras = this.localeData().eras();
    for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
      dir = eras[i2].since <= eras[i2].until ? 1 : -1;
      val = this.clone().startOf("day").valueOf();
      if (eras[i2].since <= val && val <= eras[i2].until || eras[i2].until <= val && val <= eras[i2].since) {
        return (this.year() - hooks(eras[i2].since).year()) * dir + eras[i2].offset;
      }
    }
    return this.year();
  }
  function erasNameRegex(isStrict) {
    if (!hasOwnProp(this, "_erasNameRegex")) {
      computeErasParse.call(this);
    }
    return isStrict ? this._erasNameRegex : this._erasRegex;
  }
  function erasAbbrRegex(isStrict) {
    if (!hasOwnProp(this, "_erasAbbrRegex")) {
      computeErasParse.call(this);
    }
    return isStrict ? this._erasAbbrRegex : this._erasRegex;
  }
  function erasNarrowRegex(isStrict) {
    if (!hasOwnProp(this, "_erasNarrowRegex")) {
      computeErasParse.call(this);
    }
    return isStrict ? this._erasNarrowRegex : this._erasRegex;
  }
  function matchEraAbbr(isStrict, locale2) {
    return locale2.erasAbbrRegex(isStrict);
  }
  function matchEraName(isStrict, locale2) {
    return locale2.erasNameRegex(isStrict);
  }
  function matchEraNarrow(isStrict, locale2) {
    return locale2.erasNarrowRegex(isStrict);
  }
  function matchEraYearOrdinal(isStrict, locale2) {
    return locale2._eraYearOrdinalRegex || matchUnsigned;
  }
  function computeErasParse() {
    var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i2, l2, eras = this.eras();
    for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
      namePieces.push(regexEscape(eras[i2].name));
      abbrPieces.push(regexEscape(eras[i2].abbr));
      narrowPieces.push(regexEscape(eras[i2].narrow));
      mixedPieces.push(regexEscape(eras[i2].name));
      mixedPieces.push(regexEscape(eras[i2].abbr));
      mixedPieces.push(regexEscape(eras[i2].narrow));
    }
    this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
    this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
    this._erasNarrowRegex = new RegExp(
      "^(" + narrowPieces.join("|") + ")",
      "i"
    );
  }
  addFormatToken(0, ["gg", 2], 0, function() {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ["GG", 2], 0, function() {
    return this.isoWeekYear() % 100;
  });
  function addWeekYearFormatToken(token2, getter) {
    addFormatToken(0, [token2, token2.length], 0, getter);
  }
  addWeekYearFormatToken("gggg", "weekYear");
  addWeekYearFormatToken("ggggg", "weekYear");
  addWeekYearFormatToken("GGGG", "isoWeekYear");
  addWeekYearFormatToken("GGGGG", "isoWeekYear");
  addUnitAlias("weekYear", "gg");
  addUnitAlias("isoWeekYear", "GG");
  addUnitPriority("weekYear", 1);
  addUnitPriority("isoWeekYear", 1);
  addRegexToken("G", matchSigned);
  addRegexToken("g", matchSigned);
  addRegexToken("GG", match1to2, match2);
  addRegexToken("gg", match1to2, match2);
  addRegexToken("GGGG", match1to4, match4);
  addRegexToken("gggg", match1to4, match4);
  addRegexToken("GGGGG", match1to6, match6);
  addRegexToken("ggggg", match1to6, match6);
  addWeekParseToken(
    ["gggg", "ggggg", "GGGG", "GGGGG"],
    function(input, week, config2, token2) {
      week[token2.substr(0, 2)] = toInt(input);
    }
  );
  addWeekParseToken(["gg", "GG"], function(input, week, config2, token2) {
    week[token2] = hooks.parseTwoDigitYear(input);
  });
  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(
      this,
      input,
      this.week(),
      this.weekday(),
      this.localeData()._week.dow,
      this.localeData()._week.doy
    );
  }
  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(
      this,
      input,
      this.isoWeek(),
      this.isoWeekday(),
      1,
      4
    );
  }
  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }
  function getISOWeeksInISOWeekYear() {
    return weeksInYear(this.isoWeekYear(), 1, 4);
  }
  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }
  function getWeeksInWeekYear() {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
  }
  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);
      if (week > weeksTarget) {
        week = weeksTarget;
      }
      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }
  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date2 = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date2.getUTCFullYear());
    this.month(date2.getUTCMonth());
    this.date(date2.getUTCDate());
    return this;
  }
  addFormatToken("Q", 0, "Qo", "quarter");
  addUnitAlias("quarter", "Q");
  addUnitPriority("quarter", 7);
  addRegexToken("Q", match1);
  addParseToken("Q", function(input, array2) {
    array2[MONTH] = (toInt(input) - 1) * 3;
  });
  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  }
  addFormatToken("D", ["DD", 2], "Do", "date");
  addUnitAlias("date", "D");
  addUnitPriority("date", 9);
  addRegexToken("D", match1to2);
  addRegexToken("DD", match1to2, match2);
  addRegexToken("Do", function(isStrict, locale2) {
    return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
  });
  addParseToken(["D", "DD"], DATE);
  addParseToken("Do", function(input, array2) {
    array2[DATE] = toInt(input.match(match1to2)[0]);
  });
  var getSetDayOfMonth = makeGetSet("Date", true);
  addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
  addUnitAlias("dayOfYear", "DDD");
  addUnitPriority("dayOfYear", 4);
  addRegexToken("DDD", match1to3);
  addRegexToken("DDDD", match3);
  addParseToken(["DDD", "DDDD"], function(input, array2, config2) {
    config2._dayOfYear = toInt(input);
  });
  function getSetDayOfYear(input) {
    var dayOfYear = Math.round(
      (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
    ) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
  }
  addFormatToken("m", ["mm", 2], 0, "minute");
  addUnitAlias("minute", "m");
  addUnitPriority("minute", 14);
  addRegexToken("m", match1to2);
  addRegexToken("mm", match1to2, match2);
  addParseToken(["m", "mm"], MINUTE);
  var getSetMinute = makeGetSet("Minutes", false);
  addFormatToken("s", ["ss", 2], 0, "second");
  addUnitAlias("second", "s");
  addUnitPriority("second", 15);
  addRegexToken("s", match1to2);
  addRegexToken("ss", match1to2, match2);
  addParseToken(["s", "ss"], SECOND);
  var getSetSecond = makeGetSet("Seconds", false);
  addFormatToken("S", 0, 0, function() {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ["SS", 2], 0, function() {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ["SSS", 3], 0, "millisecond");
  addFormatToken(0, ["SSSS", 4], 0, function() {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ["SSSSS", 5], 0, function() {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ["SSSSSS", 6], 0, function() {
    return this.millisecond() * 1e3;
  });
  addFormatToken(0, ["SSSSSSS", 7], 0, function() {
    return this.millisecond() * 1e4;
  });
  addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
    return this.millisecond() * 1e5;
  });
  addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
    return this.millisecond() * 1e6;
  });
  addUnitAlias("millisecond", "ms");
  addUnitPriority("millisecond", 16);
  addRegexToken("S", match1to3, match1);
  addRegexToken("SS", match1to3, match2);
  addRegexToken("SSS", match1to3, match3);
  var token, getSetMillisecond;
  for (token = "SSSS"; token.length <= 9; token += "S") {
    addRegexToken(token, matchUnsigned);
  }
  function parseMs(input, array2) {
    array2[MILLISECOND] = toInt(("0." + input) * 1e3);
  }
  for (token = "S"; token.length <= 9; token += "S") {
    addParseToken(token, parseMs);
  }
  getSetMillisecond = makeGetSet("Milliseconds", false);
  addFormatToken("z", 0, 0, "zoneAbbr");
  addFormatToken("zz", 0, 0, "zoneName");
  function getZoneAbbr() {
    return this._isUTC ? "UTC" : "";
  }
  function getZoneName() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }
  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;
  if (typeof Symbol !== "undefined" && Symbol.for != null) {
    proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return "Moment<" + this.format() + ">";
    };
  }
  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.eraName = getEraName;
  proto.eraNarrow = getEraNarrow;
  proto.eraAbbr = getEraAbbr;
  proto.eraYear = getEraYear;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.weeksInWeekYear = getWeeksInWeekYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate(
    "dates accessor is deprecated. Use date instead.",
    getSetDayOfMonth
  );
  proto.months = deprecate(
    "months accessor is deprecated. Use month instead",
    getSetMonth
  );
  proto.years = deprecate(
    "years accessor is deprecated. Use year instead",
    getSetYear
  );
  proto.zone = deprecate(
    "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
    getSetZone
  );
  proto.isDSTShifted = deprecate(
    "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
    isDaylightSavingTimeShifted
  );
  function createUnix(input) {
    return createLocal(input * 1e3);
  }
  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }
  function preParsePostFormat(string) {
    return string;
  }
  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set$1;
  proto$1.eras = localeEras;
  proto$1.erasParse = localeErasParse;
  proto$1.erasConvertYear = localeErasConvertYear;
  proto$1.erasAbbrRegex = erasAbbrRegex;
  proto$1.erasNameRegex = erasNameRegex;
  proto$1.erasNarrowRegex = erasNarrowRegex;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;
  function get$1(format2, index, field, setter) {
    var locale2 = getLocale(), utc = createUTC().set(setter, index);
    return locale2[field](utc, format2);
  }
  function listMonthsImpl(format2, index, field) {
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
    if (index != null) {
      return get$1(format2, index, field, "month");
    }
    var i2, out = [];
    for (i2 = 0; i2 < 12; i2++) {
      out[i2] = get$1(format2, i2, field, "month");
    }
    return out;
  }
  function listWeekdaysImpl(localeSorted, format2, index, field) {
    if (typeof localeSorted === "boolean") {
      if (isNumber(format2)) {
        index = format2;
        format2 = void 0;
      }
      format2 = format2 || "";
    } else {
      format2 = localeSorted;
      index = format2;
      localeSorted = false;
      if (isNumber(format2)) {
        index = format2;
        format2 = void 0;
      }
      format2 = format2 || "";
    }
    var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i2, out = [];
    if (index != null) {
      return get$1(format2, (index + shift) % 7, field, "day");
    }
    for (i2 = 0; i2 < 7; i2++) {
      out[i2] = get$1(format2, (i2 + shift) % 7, field, "day");
    }
    return out;
  }
  function listMonths(format2, index) {
    return listMonthsImpl(format2, index, "months");
  }
  function listMonthsShort(format2, index) {
    return listMonthsImpl(format2, index, "monthsShort");
  }
  function listWeekdays(localeSorted, format2, index) {
    return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
  }
  function listWeekdaysShort(localeSorted, format2, index) {
    return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
  }
  function listWeekdaysMin(localeSorted, format2, index) {
    return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
  }
  getSetGlobalLocale("en", {
    eras: [
      {
        since: "0001-01-01",
        until: Infinity,
        offset: 1,
        name: "Anno Domini",
        narrow: "AD",
        abbr: "AD"
      },
      {
        since: "0000-12-31",
        until: -Infinity,
        offset: 1,
        name: "Before Christ",
        narrow: "BC",
        abbr: "BC"
      }
    ],
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function(number2) {
      var b2 = number2 % 10, output = toInt(number2 % 100 / 10) === 1 ? "th" : b2 === 1 ? "st" : b2 === 2 ? "nd" : b2 === 3 ? "rd" : "th";
      return number2 + output;
    }
  });
  hooks.lang = deprecate(
    "moment.lang is deprecated. Use moment.locale instead.",
    getSetGlobalLocale
  );
  hooks.langData = deprecate(
    "moment.langData is deprecated. Use moment.localeData instead.",
    getLocale
  );
  var mathAbs = Math.abs;
  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }
  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  }
  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1);
  }
  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1);
  }
  function absCeil(number2) {
    if (number2 < 0) {
      return Math.floor(number2);
    } else {
      return Math.ceil(number2);
    }
  }
  function bubble() {
    var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
    if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
      milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
      days2 = 0;
      months2 = 0;
    }
    data.milliseconds = milliseconds2 % 1e3;
    seconds2 = absFloor(milliseconds2 / 1e3);
    data.seconds = seconds2 % 60;
    minutes2 = absFloor(seconds2 / 60);
    data.minutes = minutes2 % 60;
    hours2 = absFloor(minutes2 / 60);
    data.hours = hours2 % 24;
    days2 += absFloor(hours2 / 24);
    monthsFromDays = absFloor(daysToMonths(days2));
    months2 += monthsFromDays;
    days2 -= absCeil(monthsToDays(monthsFromDays));
    years2 = absFloor(months2 / 12);
    months2 %= 12;
    data.days = days2;
    data.months = months2;
    data.years = years2;
    return this;
  }
  function daysToMonths(days2) {
    return days2 * 4800 / 146097;
  }
  function monthsToDays(months2) {
    return months2 * 146097 / 4800;
  }
  function as(units) {
    if (!this.isValid()) {
      return NaN;
    }
    var days2, months2, milliseconds2 = this._milliseconds;
    units = normalizeUnits(units);
    if (units === "month" || units === "quarter" || units === "year") {
      days2 = this._days + milliseconds2 / 864e5;
      months2 = this._months + daysToMonths(days2);
      switch (units) {
        case "month":
          return months2;
        case "quarter":
          return months2 / 3;
        case "year":
          return months2 / 12;
      }
    } else {
      days2 = this._days + Math.round(monthsToDays(this._months));
      switch (units) {
        case "week":
          return days2 / 7 + milliseconds2 / 6048e5;
        case "day":
          return days2 + milliseconds2 / 864e5;
        case "hour":
          return days2 * 24 + milliseconds2 / 36e5;
        case "minute":
          return days2 * 1440 + milliseconds2 / 6e4;
        case "second":
          return days2 * 86400 + milliseconds2 / 1e3;
        case "millisecond":
          return Math.floor(days2 * 864e5) + milliseconds2;
        default:
          throw new Error("Unknown unit " + units);
      }
    }
  }
  function valueOf$1() {
    if (!this.isValid()) {
      return NaN;
    }
    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  }
  function makeAs(alias) {
    return function() {
      return this.as(alias);
    };
  }
  var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
  function clone$1() {
    return createDuration(this);
  }
  function get$2(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + "s"]() : NaN;
  }
  function makeGetter(name) {
    return function() {
      return this.isValid() ? this._data[name] : NaN;
    };
  }
  var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
  function weeks() {
    return absFloor(this.days() / 7);
  }
  var round = Math.round, thresholds = {
    ss: 44,
    // a few seconds to seconds
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month/week
    w: null,
    // weeks to month
    M: 11
    // months to year
  };
  function substituteTimeAgo(string, number2, withoutSuffix, isFuture, locale2) {
    return locale2.relativeTime(number2 || 1, !!withoutSuffix, string, isFuture);
  }
  function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
    var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a2 = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
    if (thresholds2.w != null) {
      a2 = a2 || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
    }
    a2 = a2 || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
    a2[2] = withoutSuffix;
    a2[3] = +posNegDuration > 0;
    a2[4] = locale2;
    return substituteTimeAgo.apply(null, a2);
  }
  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === void 0) {
      return round;
    }
    if (typeof roundingFunction === "function") {
      round = roundingFunction;
      return true;
    }
    return false;
  }
  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === void 0) {
      return false;
    }
    if (limit === void 0) {
      return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === "s") {
      thresholds.ss = limit - 1;
    }
    return true;
  }
  function humanize(argWithSuffix, argThresholds) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }
    var withSuffix = false, th = thresholds, locale2, output;
    if (typeof argWithSuffix === "object") {
      argThresholds = argWithSuffix;
      argWithSuffix = false;
    }
    if (typeof argWithSuffix === "boolean") {
      withSuffix = argWithSuffix;
    }
    if (typeof argThresholds === "object") {
      th = Object.assign({}, thresholds, argThresholds);
      if (argThresholds.s != null && argThresholds.ss == null) {
        th.ss = argThresholds.s - 1;
      }
    }
    locale2 = this.localeData();
    output = relativeTime$1(this, !withSuffix, th, locale2);
    if (withSuffix) {
      output = locale2.pastFuture(+this, output);
    }
    return locale2.postformat(output);
  }
  var abs$1 = Math.abs;
  function sign(x2) {
    return (x2 > 0) - (x2 < 0) || +x2;
  }
  function toISOString$1() {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }
    var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s2, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
    if (!total) {
      return "P0D";
    }
    minutes2 = absFloor(seconds2 / 60);
    hours2 = absFloor(minutes2 / 60);
    seconds2 %= 60;
    minutes2 %= 60;
    years2 = absFloor(months2 / 12);
    months2 %= 12;
    s2 = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
    totalSign = total < 0 ? "-" : "";
    ymSign = sign(this._months) !== sign(total) ? "-" : "";
    daysSign = sign(this._days) !== sign(total) ? "-" : "";
    hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
    return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s2 + "S" : "");
  }
  var proto$2 = Duration.prototype;
  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate(
    "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
    toISOString$1
  );
  proto$2.lang = lang;
  addFormatToken("X", 0, 0, "unix");
  addFormatToken("x", 0, 0, "valueOf");
  addRegexToken("x", matchSigned);
  addRegexToken("X", matchTimestamp);
  addParseToken("X", function(input, array2, config2) {
    config2._d = new Date(parseFloat(input) * 1e3);
  });
  addParseToken("x", function(input, array2, config2) {
    config2._d = new Date(toInt(input));
  });
  //! moment.js
  hooks.version = "2.29.4";
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now$1;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto;
  hooks.HTML5_FMT = {
    DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
    // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
    // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
    // <input type="datetime-local" step="0.001" />
    DATE: "YYYY-MM-DD",
    // <input type="date" />
    TIME: "HH:mm",
    // <input type="time" />
    TIME_SECONDS: "HH:mm:ss",
    // <input type="time" step="1" />
    TIME_MS: "HH:mm:ss.SSS",
    // <input type="time" step="0.001" />
    WEEK: "GGGG-[W]WW",
    // <input type="week" />
    MONTH: "YYYY-MM"
    // <input type="month" />
  };
  const navToIndex = (cb1, cb2) => {
    nav("index", "", cb1, cb2);
  };
  function nav(page_path, type, cb1, cb2) {
    if (!page_path) {
      toast$1("参数异常，请检查");
      return;
    }
    let navType = "";
    let navObj = {
      success() {
        cb1 && cb1();
      },
      fail(err) {
        formatAppLog("log", "at utils/index.js:39", err);
        cb2 && cb2(err);
      }
    };
    if (page_path == "index") {
      navType = "reLaunch";
      navObj.url = "/pages/index/index";
    } else {
      if (page_path === 4 || page_path === "back" || page_path === "Back") {
        navType = "navigateBack";
        const pages2 = getCurrentPages();
        if (!type) {
          if (pages2.length > 1) {
            navObj.delta = 1;
          } else {
            navToIndex();
            return;
          }
        } else {
          if (typeof type === "number") {
            if (pages2.length > type) {
              navObj.delta = type;
            } else {
              navToIndex();
              return;
            }
          } else if (typeof type === "string") {
            if (~type.search("/pages")) {
              let index = pages2.findIndex((v2) => "/" + v2.route === type);
              if (index != -1) {
                navObj.delta = pages2.length - 1 - index;
              } else {
                navType = "redirectTo";
                navObj.url = type;
              }
            } else {
              toast$1("路径异常，请检查");
              return;
            }
          } else {
            toast$1("参数异常，请检查");
            return;
          }
        }
      } else {
        if (!type || type === 1 || type === "nav") {
          navType = "navigateTo";
          navObj.url = page_path;
        } else if (type === 2 || type === "red") {
          navType = "redirectTo";
          navObj.url = page_path;
        } else if (type === 3 || type === "rel" || type === "reL") {
          navType = "reLaunch";
          navObj.url = page_path;
        }
      }
    }
    uni[navType](navObj);
  }
  function toast$1(msg = "提示", duration = 3e3) {
    setTimeout(() => {
      uni.showToast({
        title: msg,
        icon: "none",
        duration
      });
    }, 10);
  }
  function modal(obj, cb_confirm, cb_cancel) {
    const {
      title = "提示",
      content = "",
      showCancel = true,
      cancelText = "取消",
      confirmText = "确定",
      cancelColor = "#848484",
      confirmColor = "007AFF"
    } = obj;
    uni.showModal({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
      cancelColor,
      confirmColor,
      success: function(res) {
        if (res.confirm) {
          cb_confirm && cb_confirm();
        } else if (res.cancel) {
          cb_cancel && cb_cancel();
        }
      }
    });
  }
  function loading(msg = "") {
    uni.showLoading({
      title: msg,
      mask: true
    });
  }
  function loadEnd() {
    uni.hideLoading();
  }
  const colorChangeRgba = (color2, opacity = 1) => {
    if (color2.search("#") > -1) {
      let rgbastr = "";
      if (color2.length == 4) {
        let str = color2.split("");
        rgbastr += "#" + str[1] + str[1] + str[2] + str[2] + str[3] + str[3];
        color2 = rgbastr;
      }
      let rgba = "rgba(" + parseInt("0x" + color2.slice(1, 3)) + "," + parseInt("0x" + color2.slice(3, 5)) + "," + parseInt("0x" + color2.slice(5, 7)) + "," + opacity + ")";
      return rgba;
    } else if (color2.search("rgba") > -1) {
      let str = color2.split(",");
      str.pop();
      str.push(opacity + ")");
      return str.join(",");
    } else if (color2.search("rgb") > -1) {
      return color2.replace(")", "," + opacity + ")");
    } else {
      toast$1("色值有误");
    }
  };
  const set16ToRgb = (str) => {
    var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    if (!reg.test(str)) {
      return;
    }
    let newStr = str.toLowerCase().replace(/\#/g, "");
    let len = newStr.length;
    if (len == 3) {
      let t2 = "";
      for (var i2 = 0; i2 < len; i2++) {
        t2 += newStr.slice(i2, i2 + 1).concat(newStr.slice(i2, i2 + 1));
      }
      newStr = t2;
    }
    let arr = [];
    for (var i2 = 0; i2 < 6; i2 = i2 + 2) {
      let s2 = newStr.slice(i2, i2 + 2);
      arr.push(parseInt("0x" + s2));
    }
    return "rgb(" + arr.join(",") + ")";
  };
  const colorisLight = (rgb, opacity) => {
    if (rgb) {
      if (rgb && rgb.length == 3) {
        let num = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
        if (opacity < 0.3) {
          return true;
        } else {
          return num > 192 ? true : false;
        }
      } else if (rgb.search("#") > -1) {
        let c2 = colorisLight(set16ToRgb(rgb));
        return c2;
      } else if (rgb.search("rgb") > -1) {
        let _rgb = rgb.replace(")", "");
        let opa;
        if (rgb.search("rgba") > -1) {
          _rgb = _rgb.replace("rgba(", "");
          _rgb = _rgb.split(",");
          opa = _rgb.pop();
        } else {
          _rgb = _rgb.replace("rgb(", "");
          _rgb = _rgb.split(",");
        }
        let c2 = colorisLight(_rgb, opa);
        return c2;
      } else if (rgb === "transparent") {
        return true;
      } else {
        formatAppLog("log", "at utils/index.js:493", "色值有误");
      }
    } else {
      formatAppLog("log", "at utils/index.js:496", "请传入色值");
    }
  };
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e2) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e2) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.33
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.getCurrentInstance() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o2) {
    return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url2, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url2);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url2) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url2, false);
    try {
      xhr.send();
    } catch (e2) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e2) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a2 = document.createElement("a");
    a2.download = name;
    a2.rel = "noopener";
    if (typeof blob === "string") {
      a2.href = blob;
      if (a2.origin !== location.origin) {
        if (corsEnabled(a2.href)) {
          download(blob, name, opts);
        } else {
          a2.target = "_blank";
          click(a2);
        }
      } else {
        click(a2);
      }
    } else {
      a2.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a2.href);
      }, 4e4);
      setTimeout(function() {
        click(a2);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a2 = document.createElement("a");
        a2.href = blob;
        a2.target = "_blank";
        setTimeout(function() {
          click(a2);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url2 = reader.result;
        if (typeof url2 !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url2 = isChromeIOS ? url2 : url2.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url2;
        } else {
          location.assign(url2);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url2 = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url2);
      else
        location.href = url2;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url2);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o2) {
    return "_a" in o2 && "install" in o2;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o2) {
    return !!(vue.isRef(o2) && o2.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, assign({ value: store[p2] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v2) => Object.assign(provideCache, v2)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  const useGlobalStore = defineStore("global", {
    state: () => ({
      systemInfo: {},
      //系统信息[安卓平台,ios,版本信息都在这里]
      radio: 1,
      //px-rpx比率
      safeAreaTopHeight: 0,
      // 顶部状态栏(安全区)高度rpx
      pubHeaderHeight: 0,
      //公用顶部标题栏高度rpx[自动获取，不用理会，修改请到pub-header组件]
      safeAreaBottomHeight: 0,
      //底部安全区高度rpx
      pubTabbarHeight: 0,
      //公用底部选项卡高度rpx[自动获取，不用理会，修改请到pub-tabbar组件]
      screenHeight: 0,
      //可用屏幕高度rpx[除去顶部状态栏和底部安全区的高度]
      windowHeight: 0,
      //整个视窗高度rpx
      os: "",
      //操作系统 andriod ios windows等
      os_v: "",
      //系统版本号
      isWxXcx: false
      //是否微信小程序
    }),
    actions: {
      //px换算成rpx
      pxToRpx(px) {
        let __px = (px + "").replace("px", "");
        return Math.round(__px / this.radio);
      },
      //系统信息
      setSystemInfo(obj) {
        this.systemInfo = obj;
        formatAppLog("log", "at store/global.js:26", obj);
      },
      setRadio(num) {
        this.radio = num;
      },
      setSafeAreaTopHeight(height) {
        this.safeAreaTopHeight = height;
      },
      setPubHeaderHeight(height) {
        this.pubHeaderHeight = height;
      },
      setSafeAreaBottomHeight(height) {
        this.safeAreaBottomHeight = height;
      },
      setPubTabbarHeight(height) {
        this.pubTabbarHeight = height;
      },
      setScreenHeight(height) {
        this.screenHeight = height;
      },
      setWindowHeight(height) {
        this.windowHeight = height;
      },
      getSysInfo() {
        let sysInfo = uni.getSystemInfoSync();
        const radio = sysInfo.windowWidth / 750;
        this.setSystemInfo(sysInfo);
        this.setRadio(radio);
        this.setSafeAreaTopHeight(
          this.pxToRpx(sysInfo.safeAreaInsets.top)
        );
        this.setSafeAreaBottomHeight(
          this.pxToRpx(sysInfo.safeAreaInsets.bottom)
        );
        this.setScreenHeight(
          this.pxToRpx(sysInfo.windowHeight) - this.safeAreaTopHeight - this.safeAreaBottomHeight
        );
        this.setWindowHeight(this.pxToRpx(sysInfo.windowHeight));
        this.os = sysInfo.osName;
        this.os_v = sysInfo.osVersion;
        if (sysInfo.hostName === "WeChat") {
          this.isWxXcx = true;
        }
      }
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$t = {
    __name: "pub-header",
    props: {
      //仅顶部安全区[时间，信号，运营商那里]
      headerOnlySafe: {
        type: Boolean,
        default: false
      },
      //顶部无占位
      headerNoPlaceholder: {
        type: Boolean,
        default: false
      },
      //顶部tabbar页，隐藏左按钮
      headerIsTabbar: {
        type: Boolean,
        default: false
      },
      // 顶部背景颜色
      headerBgc: {
        type: String,
        default: "#ffffff"
      },
      //顶部标题
      headerTitle: {
        type: String,
        default: ""
      },
      //顶部标题颜色
      headerTitleColor: {
        type: String,
        default: "#000000"
      },
      //顶部副标题
      headerSubtitle: {
        type: String,
        default: ""
      },
      //顶部副标题颜色
      headerSubtitleColor: {
        type: String,
        default: "#999999"
      },
      //顶部标题栏沉浸式(无补白，无颜色)
      headerImmersive: {
        type: Boolean,
        default: false
      },
      //顶部标题栏沉浸式转有颜色
      headerImmersiveTo: {
        type: Boolean,
        default: false
      },
      //顶部标题栏沉浸式转有颜色的色值
      headerImmersiveToColor: {
        type: String,
        default: ""
      },
      //顶部标题栏沉浸式转有颜色的标题色值
      headerImmersiveToTitleColor: {
        type: String,
        default: ""
      },
      //顶部标题栏沉浸式转有颜色的副标题色值
      headerImmersiveToSubtitleColor: {
        type: String,
        default: ""
      },
      //顶部标题栏沉浸式转冰花窗
      headerImmersiveToIceWindow: {
        type: Boolean,
        default: false
      },
      //顶部标题栏沉浸式转冰花窗透明度
      headerImmersiveToIceWindowOpacity: {
        type: [Number, String],
        default: 0.5
      },
      //顶部标题栏沉浸式所需距离(开转到转变完成[1/3的时候开始变化标题颜色])
      headerImmersiveToDistance: {
        type: Number,
        default: 30
      },
      //顶部标题栏沉浸式开转前的距离(下拉多少距离开始渐变)
      headerImmersiveToSafeDistance: {
        type: Number,
        default: 0
      },
      //顶部标题栏阴影
      headerShadow: {
        type: Boolean,
        default: false
      },
      //顶部冰纱窗（毛玻璃）
      headerIceWindow: {
        type: Boolean,
        default: false
      },
      //顶部返回文字
      headerBackText: {
        type: String,
        default: ""
      },
      //顶部返回按钮颜色
      headerBackColor: {
        type: String,
        default: ""
      },
      //顶部状态栏字体颜色
      headerNavBarType: {
        type: [Number, String]
      },
      //顶部状态栏字体颜色自动适应
      headerNavBarTypeAuto: {
        type: Boolean,
        default: true
      }
    },
    emits: ["immersive", "isImmersive"],
    setup(__props, { emit }) {
      const props = __props;
      const globalStore = useGlobalStore();
      let safeAreaTop = vue.computed(() => {
        if (globalStore.safeAreaTopHeight) {
          return globalStore.safeAreaTopHeight + "rpx";
        } else {
          return "0rpx";
        }
      });
      const bgc = vue.ref(props.headerBgc);
      const titleColor = vue.ref(props.headerTitleColor);
      const subtitleColor = vue.ref(props.headerSubtitleColor);
      const isIceWindow = vue.ref(props.headerIceWindow);
      const backColor = vue.ref(props.headerBackColor);
      const immersive = vue.ref("");
      if (!props.headerOnlySafe) {
        if (props.headerImmersive || props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
          emit("isImmersive", true);
          if (props.headerImmersive) {
            immersive.value = "immersive";
          }
          if (props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
            immersive.value = "immersiveTo";
            bgc.value = "transparent";
          }
        }
      }
      if (props.headerNoPlaceholder) {
        emit("isImmersive", true);
      }
      let emitImmersiveText = "before";
      let colorSafeNum = props.headerImmersiveToSafeDistance;
      const colorChange = (e2) => {
        let opacity = e2.scrollTop <= colorSafeNum ? 0 : (e2.scrollTop - colorSafeNum) / (props.headerImmersiveToDistance * 1);
        if (props.headerImmersiveToIceWindow) {
          isIceWindow.value = true;
          opacity > props.headerImmersiveToIceWindowOpacity ? opacity = props.headerImmersiveToIceWindowOpacity : null;
        }
        opacity > 1 ? opacity = 1 : null;
        if (props.headerImmersiveToColor) {
          bgc.value = colorChangeRgba(
            props.headerImmersiveToColor,
            opacity
          );
        } else {
          bgc.value = "transparent";
        }
        if (e2.scrollTop - colorSafeNum > props.headerImmersiveToDistance * 1 / 3.33) {
          if (props.headerImmersiveToTitleColor) {
            titleColor.value = props.headerImmersiveToTitleColor;
            backColor.value = props.headerImmersiveToTitleColor;
          }
          if (props.headerImmersiveToSubtitleColor) {
            subtitleColor.value = props.headerImmersiveToSubtitleColor;
          }
          if (emitImmersiveText !== "after") {
            emitImmersiveText = "after";
            emit("immersive", "after");
          }
        } else {
          titleColor.value = props.headerTitleColor;
          backColor.value = props.headerBackColor;
          subtitleColor.value = props.headerSubtitleColor;
          if (emitImmersiveText !== "before") {
            emitImmersiveText = "before";
            emit("immersive", "before");
          }
        }
      };
      const instance = vue.getCurrentInstance();
      const getPubHeaderHeight = () => {
        const query = uni.createSelectorQuery().in(instance);
        query.select("#pubheader").boundingClientRect((data) => {
          if (data) {
            globalStore.setPubHeaderHeight(globalStore.pxToRpx(data.height));
          }
        }).exec();
      };
      const navBarColor = (color2) => {
        if (["black", "#000", "#000000", 1].includes(color2)) {
          uni.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
          });
        } else if (["white", "#fff", "#ffffff", 2].includes(color2)) {
          uni.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ffffff"
          });
        }
      };
      vue.onMounted(() => {
        if (props.headerOnlySafe)
          return;
        getPubHeaderHeight();
        if (props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
          uni.$on("uOnPageScroll", (e2) => {
            colorChange(e2);
          });
        }
        if (props.headerNavBarType) {
          navBarColor(props.headerNavBarType);
        } else if (props.headerNavBarTypeAuto) {
          vue.watch(
            () => bgc.value,
            (n2, o2) => {
              if (colorisLight(n2)) {
                navBarColor(1);
              } else {
                navBarColor(2);
              }
            },
            { immediate: true }
          );
        }
      });
      vue.onUnmounted(() => {
        if (props.headerOnlySafe)
          return;
        if (props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
          uni.$off("uOnPageScroll", (e2) => {
            colorChange(e2);
          });
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "pub-header" }, [
          !props.headerNoPlaceholder ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createCommentVNode(" 占位用 仅安全区"),
              props.headerOnlySafe ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "placeholder-only-safe",
                  style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaTop) })
                },
                null,
                4
                /* STYLE */
              )) : !immersive.value && immersive.value !== "immersiveTo" ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  vue.createCommentVNode(" 占位用 非仅安全区"),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "placeholder",
                      style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaTop) })
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true),
          !props.headerOnlySafe ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: vue.normalizeClass(["header-fixed", {
                immersive: immersive.value === "immersive",
                icewindow: isIceWindow.value,
                shadow: props.headerShadow
              }]),
              id: "pubheader",
              style: vue.normalizeStyle({ background: bgc.value, paddingTop: vue.unref(safeAreaTop) })
            },
            [
              !props.headerIsTabbar ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "left"
              }, [
                vue.createElementVNode("view", {
                  class: "back flex",
                  onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(nav)("back"))
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "back-icon",
                      style: vue.normalizeStyle({
                        "border-top-color": backColor.value,
                        "border-left-color": backColor.value
                      })
                    },
                    null,
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "back-text" },
                    vue.toDisplayString(props.headerBackText),
                    1
                    /* TEXT */
                  )
                ])
              ])) : vue.createCommentVNode("v-if", true),
              props.headerTitle ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "center"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["title text-one", { hassubtitle: props.headerSubtitle }]),
                    style: vue.normalizeStyle({ color: titleColor.value })
                  },
                  vue.toDisplayString(props.headerTitle),
                  7
                  /* TEXT, CLASS, STYLE */
                ),
                props.headerSubtitle ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: "subtitle text-one",
                    style: vue.normalizeStyle({ color: subtitleColor.value })
                  },
                  vue.toDisplayString(props.headerSubtitle),
                  5
                  /* TEXT, STYLE */
                )) : vue.createCommentVNode("v-if", true)
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 左插槽 "),
              vue.createElementVNode("view", { class: "left-slot" }, [
                vue.renderSlot(_ctx.$slots, "headerLeft", {}, void 0, true)
              ]),
              vue.createCommentVNode(" 中间插槽 "),
              vue.createElementVNode("view", { class: "center-slot" }, [
                vue.renderSlot(_ctx.$slots, "headerCenter", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "title-slot" }, [
                vue.renderSlot(_ctx.$slots, "headerTitle", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "right-slot" }, [
                vue.createCommentVNode(" 右插槽 "),
                vue.renderSlot(_ctx.$slots, "headerRight", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "header-bottom" }, [
                vue.renderSlot(_ctx.$slots, "headerBottom", {}, void 0, true)
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          props.headerOnlySafe ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: "header-fixed-only-safe",
              style: vue.normalizeStyle({ background: bgc.value, paddingTop: vue.unref(safeAreaTop) })
            },
            null,
            4
            /* STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-9d00f76e"], ["__file", "E:/lwz/lwz/mine/uniapp-base/components/public/pub-header.vue"]]);
  const icon1 = "/static/tabbar/icon1.png";
  const icon1Active = "/static/tabbar/icon1_active.png";
  const icon2 = "/static/tabbar/icon2.png";
  const icon2Active = "/static/tabbar/icon2_active.png";
  const icon3 = "/static/tabbar/icon3.png";
  const icon3Active = "/static/tabbar/icon3_active.png";
  const icon4 = "/static/tabbar/icon4.png";
  const icon4Active = "/static/tabbar/icon4_active.png";
  const _sfc_main$s = {
    __name: "pub-tabbar",
    props: {
      //背景
      tabbarBgc: {
        type: String,
        default: "#ffffff"
      },
      //从1开始[不填则自动匹配 ]
      tabbarActive: {
        type: [Number, String],
        default: ""
      },
      //仅底部安全区
      tabbarOnlySafe: {
        type: Boolean,
        default: false
      }
    },
    setup(__props, { expose }) {
      const props = __props;
      const globalStore = useGlobalStore();
      let safeAreaBottom = vue.computed(() => {
        if (globalStore.safeAreaBottomHeight) {
          return globalStore.safeAreaBottomHeight + "rpx";
        } else {
          return "0rpx";
        }
      });
      const instance = vue.getCurrentInstance();
      const getPubTabbarHeight = () => {
        const query = uni.createSelectorQuery().in(instance);
        query.select("#pubtabbar").boundingClientRect((data) => {
          if (data) {
            globalStore.setPubTabbarHeight(globalStore.pxToRpx(data.height));
          }
        }).exec();
      };
      const menu = vue.ref([
        {
          pagePath: "/pages/index/index",
          title: "首页",
          icon: icon1,
          iconActive: icon1Active
        },
        {
          pagePath: "",
          title: "test2",
          icon: icon2,
          iconActive: icon2Active
        },
        {
          pagePath: "",
          title: "购物车",
          icon: icon3,
          iconActive: icon3Active
        },
        {
          pagePath: "",
          title: "我的",
          icon: icon4,
          iconActive: icon4Active
        }
      ]);
      const isActive = (pagePath) => {
        let pages2 = getCurrentPages();
        let route2 = pages2[pages2.length - 1].route;
        return "/" + route2 === pagePath;
      };
      const routerPush = (link) => {
        let pages2 = getCurrentPages();
        let route2 = pages2[pages2.length - 1].route;
        if (link) {
          if ("/" + route2 != link) {
            nav(link, 3);
          }
        } else {
          toast$1("功能尚未开放");
        }
      };
      vue.onMounted(() => {
        getPubTabbarHeight();
      });
      expose({});
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "pub-tabbar" }, [
          vue.createCommentVNode(" 仅安全区 "),
          props.tabbarOnlySafe ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "placeholder-only-safe",
              style: vue.normalizeStyle({ paddingBottom: vue.unref(safeAreaBottom) })
            },
            null,
            4
            /* STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createCommentVNode(" 非仅安全区 "),
              vue.createElementVNode(
                "view",
                {
                  class: "placeholder",
                  style: vue.normalizeStyle({ paddingBottom: vue.unref(safeAreaBottom) })
                },
                null,
                4
                /* STYLE */
              )
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )),
          !props.tabbarOnlySafe ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: "tabbar-fixed",
              style: vue.normalizeStyle({ background: props.tabbarBgc, paddingBottom: vue.unref(safeAreaBottom) }),
              id: "pubtabbar"
            },
            [
              vue.createElementVNode("view", { class: "top-slot" }, [
                vue.renderSlot(_ctx.$slots, "tabbarTop", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "tabbar-list flex-c" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(menu.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["tabbar-list-item", {
                        active: !props.tabbarActive && index === props.tabbarActive - 1 || isActive(item.pagePath)
                      }]),
                      key: index,
                      onClick: ($event) => routerPush(item.pagePath)
                    }, [
                      vue.createElementVNode("view", { class: "tabbar-list-item-icon" }, [
                        vue.createElementVNode("image", {
                          mode: "aspectFit",
                          src: isActive(item.pagePath) || index === props.tabbarActive - 1 ? item.iconActive : item.icon
                        }, null, 8, ["src"])
                      ]),
                      vue.createElementVNode(
                        "view",
                        { class: "tabbar-list-item-title" },
                        vue.toDisplayString(item.title),
                        1
                        /* TEXT */
                      )
                    ], 10, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ],
            4
            /* STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-9c68f658"], ["__file", "E:/lwz/lwz/mine/uniapp-base/components/public/pub-tabbar.vue"]]);
  const _sfc_main$r = {
    __name: "lay-layout",
    props: {
      //纯净面板(无头部和tabbar )
      clean: {
        type: Boolean,
        default: false
      },
      //页面背景图
      bgi: {},
      //页面背景色(可与bgi叠加 )
      bgc: {
        type: String
      },
      //页面背景图聚焦到中间可滚动区域
      bgFocus: {
        type: Boolean,
        default: false
      },
      //页面背景图锁定不随滚动条滚动
      bgFixed: {
        type: Boolean,
        default: true
      },
      //隐藏顶部
      hideHeader: {
        type: Boolean,
        default: false
      },
      //隐藏tabbar
      hideTabbar: {
        type: Boolean,
        default: false
      },
      //最小横划判断距离
      minDeviationX: {
        type: Number,
        default: 50
      },
      //最小纵划判断距离
      minDeviationY: {
        type: Number,
        default: 50
      }
    },
    emits: ["move", "prev", "next", "up", "down", "immersive"],
    setup(__props, { expose, emit }) {
      const props = __props;
      const globalStore = useGlobalStore();
      const immersive = (e2) => {
        emit("immersive", e2);
      };
      let bgFocusTop = vue.computed(() => {
        let top = 0;
        if (!props.clean) {
          if (props.headerOnlySafe || props.headerOnlySafeFixed) {
            top = globalStore.safeAreaTopHeight;
          } else if (!props.hideHeader) {
            top = globalStore.pubHeaderHeight;
          }
        }
        return top + "rpx";
      });
      let bgFocusBottom = vue.computed(() => {
        let bottom = 0;
        if (!props.clean) {
          if (props.tabbarOnlySafe || props.tabbarOnlySafeFixed) {
            bottom = globalStore.safeAreaBottomHeight;
          } else if (!props.hideTabbar) {
            bottom = globalStore.pubTabbarHeight;
          }
        }
        return bottom + "rpx";
      });
      const touchObj = {
        isTouch: false,
        startX: null,
        endX: null,
        minDeviationX: null,
        //最小横向偏差
        startY: null,
        endY: null,
        minDeviationY: null
        //最小纵向偏差
      };
      const touchstart = (e2) => {
        if (!touchObj.isTouch) {
          touchObj.isTouch = true;
        }
        touchObj.startX = e2.changedTouches[0].clientX;
        touchObj.startY = e2.changedTouches[0].clientY;
      };
      const touchmove = (e2) => {
        if (touchObj.isTouch) {
          let endX = e2.changedTouches[0].clientX;
          let endY = e2.changedTouches[0].clientY;
          let obj = {
            dX: endX - touchObj.startX,
            dY: endY - touchObj.startY
          };
          emit("move", obj);
        }
      };
      const touchend = (e2) => {
        touchObj.endX = e2.changedTouches[0].clientX;
        touchObj.endY = e2.changedTouches[0].clientY;
        const { startX, endX, minDeviationX, startY, endY, minDeviationY } = touchObj;
        let obj;
        if (startX - endX > minDeviationX) {
          obj = { startX, endX, dX: startX - endX };
          emit("next", obj);
        } else if (endX - startX > minDeviationX) {
          obj = { startX, endX, dX: endX - startX };
          emit("prev", obj);
        }
        if (startY - endY > minDeviationY) {
          obj = { startY, endY, dY: startY - endY };
          emit("up", obj);
        } else if (endY - startY > minDeviationY) {
          obj = { startY, endY, dY: endY - startY };
          emit("down", obj);
        }
      };
      const isImmer = vue.ref(false);
      const isImmersive = (bool) => {
        isImmer.value = bool;
      };
      let middleViewHeight = vue.computed(() => {
        let height = globalStore.windowHeight;
        if (!props.clean) {
          if (props.headerOnlySafe) {
            height -= globalStore.safeAreaTopHeight;
          } else if (!props.hideHeader && !isImmer.value) {
            height -= globalStore.pubHeaderHeight;
          }
          if (props.tabbarOnlySafe || props.tabbarOnlySafeFixed) {
            height -= globalStore.safeAreaBottomHeight;
          } else if (!props.hideTabbar) {
            height -= globalStore.pubTabbarHeight;
          }
        }
        return height + "rpx";
      });
      onLoad((option) => {
        if (props.minDeviationX)
          touchObj.minDeviationX = props.minDeviationX;
        if (props.minDeviationY)
          touchObj.minDeviationY = props.minDeviationY;
      });
      expose({});
      return (_ctx, _cache) => {
        const _component_pub_header = resolveEasycom(vue.resolveDynamicComponent("pub-header"), __easycom_0$8);
        const _component_pub_tabbar = resolveEasycom(vue.resolveDynamicComponent("pub-tabbar"), __easycom_1$4);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "lay-layout" }, [
              !props.hideHeader && !props.clean ? (vue.openBlock(), vue.createBlock(
                _component_pub_header,
                vue.mergeProps({ key: 0 }, _ctx.$attrs, {
                  onImmersive: immersive,
                  onIsImmersive: isImmersive
                }),
                {
                  headerLeft: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "headerLeft", {}, void 0, true)
                  ]),
                  headerCenter: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "headerCenter", {}, void 0, true)
                  ]),
                  headerTitle: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "headerTitle", {}, void 0, true)
                  ]),
                  headerRight: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "headerRight", {}, void 0, true)
                  ]),
                  headerBottom: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "headerBottom", {}, void 0, true)
                  ]),
                  _: 3
                  /* FORWARDED */
                },
                16
                /* FULL_PROPS */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "view",
                {
                  style: vue.normalizeStyle({ "min-height": vue.unref(middleViewHeight) }),
                  class: "slot-box z9",
                  onTouchstart: touchstart,
                  onTouchmove: touchmove,
                  onTouchend: touchend
                },
                [
                  vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ],
                36
                /* STYLE, HYDRATE_EVENTS */
              ),
              !props.hideTabbar && !props.clean ? (vue.openBlock(), vue.createBlock(
                _component_pub_tabbar,
                vue.normalizeProps(vue.mergeProps({ key: 1 }, _ctx.$attrs)),
                {
                  tabbarTop: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "tabbarTop", {}, void 0, true)
                  ]),
                  _: 3
                  /* FORWARDED */
                },
                16
                /* FULL_PROPS */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createCommentVNode(" 背景图或颜色 "),
            props.bgc || props.bgi ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["layout-bg", { fixed: props.bgFixed }]),
                style: vue.normalizeStyle({
                  top: props.bgFocus ? vue.unref(bgFocusTop) : "0rpx",
                  bottom: props.bgFocus ? vue.unref(bgFocusBottom) : "0rpx"
                })
              },
              [
                props.bgc ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: "bgc",
                    style: vue.normalizeStyle({ background: props.bgc })
                  },
                  null,
                  4
                  /* STYLE */
                )) : vue.createCommentVNode("v-if", true),
                props.bgi ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "bgi"
                }, [
                  vue.createElementVNode("image", {
                    src: props.bgi
                  }, null, 8, ["src"])
                ])) : vue.createCommentVNode("v-if", true)
              ],
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-63f09916"], ["__file", "E:/lwz/lwz/mine/uniapp-base/components/layout/lay-layout.vue"]]);
  const bgi = "/static/images/temp/bgi.png";
  const testicon = "/static/images/icons/testicon.png";
  const _sfc_main$q = {
    __name: "index",
    setup(__props) {
      const menu = vue.ref([
        {
          title: "登录",
          img: testicon,
          link: "/pages/login/login"
        },
        {
          title: "通用",
          img: testicon,
          badge: 999,
          link: "/pages/test/test"
        },
        {
          title: "仅安全区",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-onlysafe"
        },
        {
          title: "插槽",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-slot"
        },
        {
          title: "沉浸式标题",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-immersive"
        },
        {
          title: "沉浸式滑动变色",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-immersiveTo"
        },
        {
          title: "沉浸式冰纱窗标题",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-immersiveToIcewindow"
        },
        {
          title: "方向",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-fx"
        },
        {
          title: "表单form",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-form"
        },
        {
          title: "无数据",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-nomsg"
        },
        {
          title: "列表测试[需要后端接口]",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-list"
        },
        {
          title: "列表测试[模拟数据]",
          img: testicon,
          badge: 999,
          link: "/pages/test/test-list-m"
        }
      ]);
      const menuTap = (item) => {
        if (item.link) {
          nav(item.link);
        } else if (item.tap) {
          item.tap();
        }
      };
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerIsTabbar: "",
          headerTitle: "是我",
          headerSubtitle: "不是我",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "home" }, [
              vue.createElementVNode("view", { class: "menu-box flex-b" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(menu.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "menu-box-item",
                      key: index,
                      onClick: ($event) => menuTap(item)
                    }, [
                      item.badge ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 0,
                          class: "badge"
                        },
                        vue.toDisplayString(item.badge > 99 ? "99+" : item.badge),
                        1
                        /* TEXT */
                      )) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("view", { class: "img" }, [
                        vue.createElementVNode("image", {
                          src: item.img
                        }, null, 8, ["src"])
                      ]),
                      vue.createElementVNode(
                        "view",
                        { class: "title" },
                        vue.toDisplayString(item.title),
                        1
                        /* TEXT */
                      )
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/index/index.vue"]]);
  const _sfc_main$p = {
    name: "u-mask",
    emits: ["click"],
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 用户自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
      zoom: {
        type: Boolean,
        default: true
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [Number, String],
        default: 300
      },
      // 是否可以通过点击遮罩进行关闭
      maskClickAble: {
        type: Boolean,
        default: true
      },
      // 遮罩的模糊度
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        zoomStyle: {
          transform: ""
        },
        scale: "scale(1.2, 1.2)"
      };
    },
    watch: {
      show(n2) {
        if (n2 && this.zoom) {
          this.zoomStyle.transform = "scale(1, 1)";
        } else if (!n2 && this.zoom) {
          this.zoomStyle.transform = this.scale;
        }
      }
    },
    computed: {
      maskStyle() {
        let style = {};
        style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        if (this.show)
          style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.mask;
        else
          style.zIndex = -1;
        style.transition = `all ${this.duration / 1e3}s ease-in-out`;
        if (Object.keys(this.customStyle).length)
          style = {
            ...style,
            ...this.customStyle
          };
        return style;
      },
      filterStyle() {
        let { blur } = this;
        let style = {};
        if (blur) {
          style.backdropFilter = `blur(${blur}rpx)`;
        }
        return style;
      }
    },
    methods: {
      click() {
        if (!this.maskClickAble)
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-mask", {
          "u-mask-zoom": $props.zoom,
          "u-mask-show": $props.show
        }]),
        "hover-stop-propagation": "",
        style: vue.normalizeStyle([$options.maskStyle, $data.zoomStyle, $options.filterStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
        onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, HYDRATE_EVENTS */
    );
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$8], ["__scopeId", "data-v-b3b508a8"], ["__file", "E:/lwz/lwz/mine/uniapp-base/uni_modules/vk-uview-ui/components/u-mask/u-mask.vue"]]);
  const _sfc_main$o = {
    name: "u-icon",
    emits: ["click", "touchstart"],
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位rpx
      size: {
        type: [Number, String],
        default: "inherit"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [Number, String],
        default: ""
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "28"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离(横向排列)
      marginLeft: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginTop: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginRight: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginBottom: {
        type: [String, Number],
        default: "6"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "widthFix"
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否为DecimalIcon
      showDecimalIcon: {
        type: Boolean,
        default: false
      },
      // 背景颜色，可接受主题色，仅Decimal时有效
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      // 显示的百分比，仅Decimal时有效
      percent: {
        type: [Number, String],
        default: "50"
      }
    },
    computed: {
      customClass() {
        let classes = [];
        let { customPrefix, name } = this;
        let index = name.indexOf("-icon-");
        if (index > -1) {
          customPrefix = name.substring(0, index + 5);
          classes.push(name);
        } else {
          classes.push(`${customPrefix}-${name}`);
        }
        if (customPrefix === "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(customPrefix);
        }
        if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
          classes.push("u-icon__icon--" + this.inactiveColor);
        } else if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top)
        };
        if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
          style.color = this.inactiveColor;
        } else if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
        style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
        return style;
      },
      decimalIconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top),
          width: this.percent + "%"
        };
        if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      decimalIconClass() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        else
          classes.push("u-icon__icon--primary");
        return classes;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      touchstart() {
        this.$emit("touchstart", this.index);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$props.customStyle]),
        class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: $props.name,
          mode: $props.imgMode,
          style: vue.normalizeStyle([$options.imgStyle])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
          style: vue.normalizeStyle([$options.iconStyle]),
          "hover-class": $props.hoverClass,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
        }, [
          $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            style: vue.normalizeStyle([$options.decimalIconStyle]),
            class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
            "hover-class": $props.hoverClass
          }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
        ], 46, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示，微信小程序不传值默认为null，故需要增加null的判断 '),
        $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: $props.labelColor,
              fontSize: _ctx.$u.addUnit($props.labelSize),
              marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
              marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
              marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
              marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
            })
          },
          vue.toDisplayString($props.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$7], ["__scopeId", "data-v-5de67484"], ["__file", "E:/lwz/lwz/mine/uniapp-base/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
  const _sfc_main$n = {
    name: "u-popup",
    emits: ["update:modelValue", "input", "open", "close"],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      /**
       * 显示状态
       */
      show: {
        type: Boolean,
        default: false
      },
      /**
       * 弹出方向，left|right|top|bottom|center
       */
      mode: {
        type: String,
        default: "left"
      },
      /**
       * 是否显示遮罩
       */
      mask: {
        type: Boolean,
        default: true
      },
      // 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度
      length: {
        type: [Number, String],
        default: "auto"
      },
      // 是否开启缩放动画，只在mode=center时有效
      zoom: {
        type: Boolean,
        default: true
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否可以通过点击遮罩进行关闭
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 用户自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
      // 对v-model双向绑定多层调用造成报错不能修改props值的问题
      popup: {
        type: Boolean,
        default: true
      },
      // 显示显示弹窗的圆角，单位rpx
      borderRadius: {
        type: [Number, String],
        default: 0
      },
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 关闭图标的名称，只能uView的内置图标
      closeIcon: {
        type: String,
        default: "close"
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // 关闭图标的颜色
      closeIconColor: {
        type: String,
        default: "#909399"
      },
      // 关闭图标的大小，单位rpx
      closeIconSize: {
        type: [String, Number],
        default: "30"
      },
      // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      width: {
        type: String,
        default: ""
      },
      // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      height: {
        type: String,
        default: ""
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
      negativeTop: {
        type: [String, Number],
        default: 0
      },
      // 遮罩的样式，一般用于修改遮罩的透明度
      maskCustomStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 遮罩打开或收起的动画过渡时间，单位ms
      duration: {
        type: [String, Number],
        default: 250
      },
      // 遮罩的模糊度
      blur: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        visibleSync: false,
        showDrawer: false,
        timer: null,
        closeFromInner: false
        // value的值改变，是发生在内部还是外部
      };
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
      style() {
        let style = {};
        if (this.mode == "left" || this.mode == "right") {
          style = {
            width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
            height: "100%",
            transform: `translate3D(${this.mode == "left" ? "-100%" : "100%"},0px,0px)`
          };
        } else if (this.mode == "top" || this.mode == "bottom") {
          style = {
            width: "100%",
            height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
            transform: `translate3D(0px,${this.mode == "top" ? "-100%" : "100%"},0px)`
          };
        }
        style.zIndex = this.uZindex;
        if (this.borderRadius) {
          switch (this.mode) {
            case "left":
              style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
              break;
            case "top":
              style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
              break;
            case "right":
              style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
              break;
            case "bottom":
              style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
              break;
          }
          style.overflow = "hidden";
        }
        if (this.duration)
          style.transition = `all ${this.duration / 1e3}s linear`;
        return style;
      },
      // 中部弹窗的特有样式
      centerStyle() {
        let style = {};
        style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
        style.height = this.height ? this.getUnitValue(this.height) : "auto";
        style.zIndex = this.uZindex;
        style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`;
        if (this.borderRadius) {
          style.borderRadius = `${this.borderRadius}rpx`;
          style.overflow = "hidden";
        }
        return style;
      },
      // 计算整理后的z-index值
      uZindex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    watch: {
      valueCom: {
        immediate: true,
        handler(val) {
          if (val) {
            this.open();
          } else if (!this.closeFromInner) {
            this.close();
          }
          this.closeFromInner = false;
        }
      }
    },
    mounted() {
      this.valueCom && this.open();
    },
    methods: {
      // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
      getUnitValue(val) {
        if (/(%|px|rpx|auto)$/.test(val))
          return val;
        else
          return val + "rpx";
      },
      // 遮罩被点击
      maskClick() {
        this.close();
      },
      close() {
        this.closeFromInner = true;
        this.change("showDrawer", "visibleSync", false);
      },
      // 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
      // 让其只在mode=center时起作用
      modeCenterClose(mode) {
        if (mode != "center" || !this.maskCloseAble)
          return;
        this.close();
      },
      open() {
        this.change("visibleSync", "showDrawer", true);
      },
      // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
      // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
      change(param1, param2, status) {
        if (this.popup == true) {
          this.$emit("input", status);
          this.$emit("update:modelValue", status);
        }
        this[param1] = status;
        if (status) {
          this.$nextTick(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          });
        } else {
          this.timer = setTimeout(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          }, this.duration);
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_mask = resolveEasycom(vue.resolveDynamicComponent("u-mask"), __easycom_0$6);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_1$3);
    return $data.visibleSync ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        style: vue.normalizeStyle([$props.customStyle, {
          zIndex: $options.uZindex - 1
        }]),
        class: "u-drawer",
        "hover-stop-propagation": ""
      },
      [
        vue.createVNode(_component_u_mask, {
          blur: $props.blur,
          duration: $props.duration,
          "custom-style": $props.maskCustomStyle,
          maskClickAble: $props.maskCloseAble,
          "z-index": $options.uZindex - 2,
          show: $data.showDrawer && $props.mask,
          onClick: $options.maskClick
        }, null, 8, ["blur", "duration", "custom-style", "maskClickAble", "z-index", "show", "onClick"]),
        vue.createCommentVNode(" 移除	@tap.stop.prevent "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-drawer-content", [
              $props.safeAreaInsetBottom ? "safe-area-inset-bottom" : "",
              "u-drawer-" + $props.mode,
              $data.showDrawer ? "u-drawer-content-visible" : "",
              $props.zoom && $props.mode == "center" ? "u-animation-zoom" : ""
            ]]),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.modeCenterClose($props.mode)),
            onTouchmove: _cache[4] || (_cache[4] = vue.withModifiers(() => {
            }, ["stop", "prevent"])),
            style: vue.normalizeStyle([$options.style])
          },
          [
            $props.mode == "center" ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "u-mode-center-box",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                style: vue.normalizeStyle([$options.centerStyle])
              },
              [
                $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  onClick: $options.close,
                  class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]]),
                  name: $props.closeIcon,
                  color: $props.closeIconColor,
                  size: $props.closeIconSize
                }, null, 8, ["onClick", "class", "name", "color", "size"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("scroll-view", {
                  class: "u-drawer__scroll-view",
                  "scroll-y": "true"
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ])
              ],
              36
              /* STYLE, HYDRATE_EVENTS */
            )) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
              key: 1,
              class: "u-drawer__scroll-view",
              "scroll-y": "true"
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])),
            vue.createElementVNode(
              "view",
              {
                onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args)),
                class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]])
              },
              [
                $props.mode != "center" && $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  name: $props.closeIcon,
                  color: $props.closeIconColor,
                  size: $props.closeIconSize
                }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ],
          38
          /* CLASS, STYLE, HYDRATE_EVENTS */
        )
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$6], ["__scopeId", "data-v-c93a8fd2"], ["__file", "E:/lwz/lwz/mine/uniapp-base/uni_modules/vk-uview-ui/components/u-popup/u-popup.vue"]]);
  const _sfc_main$m = {
    emits: ["update:modelValue", "input", "confirm", "close"],
    props: {
      // 通过双向绑定控制组件的弹出与收起
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      // 列数据
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否显示边框
      border: {
        type: Boolean,
        default: true
      },
      // "取消"按钮的颜色
      cancelColor: {
        type: String,
        default: "#606266"
      },
      // "确定"按钮的颜色
      confirmColor: {
        type: String,
        default: "#2979ff"
      },
      // 弹出的z-index值
      zIndex: {
        type: [String, Number],
        default: 0
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否允许通过点击遮罩关闭Picker
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 提供的默认选中的下标
      defaultValue: {
        type: Array,
        default() {
          return [0];
        }
      },
      // 模式选择，single-column-单列，mutil-column-多列，mutil-column-auto-多列联动
      mode: {
        type: String,
        default: "single-column"
      },
      // 自定义value属性名
      valueName: {
        type: String,
        default: "value"
      },
      // 自定义label属性名
      labelName: {
        type: String,
        default: "label"
      },
      // 自定义多列联动模式的children属性名
      childName: {
        type: String,
        default: "children"
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 遮罩的模糊度
      blur: {
        type: [Number, String],
        default: 0
      },
      item: {
        type: Object
      }
    },
    data() {
      return {
        popupValue: false,
        // 用于列改变时，保存当前的索引，下一次变化时比较得出是哪一列发生了变化
        defaultSelector: [0],
        // picker-view的数据
        columnData: [],
        // 每次队列发生变化时，保存选择的结果
        selectValue: [],
        // 上一次列变化时的index
        lastSelectIndex: [],
        // 列数
        columnNum: 0,
        // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
        moving: false,
        isInit: true
      };
    },
    watch: {
      // 在select弹起的时候，重新初始化所有数据
      value: {
        immediate: true,
        handler(val) {
          if (val)
            setTimeout(() => this.init(), 10);
          this.popupValue = val;
        }
      },
      modelValue: {
        immediate: true,
        handler(val) {
          if (val)
            setTimeout(() => this.init(), 10);
          this.popupValue = val;
        }
      }
    },
    computed: {
      uZIndex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    mounted() {
      setTimeout(() => {
        this.isInit = false;
      }, 1e3);
    },
    methods: {
      // 标识滑动开始，只有微信小程序才有这样的事件
      pickstart() {
      },
      // 标识滑动结束
      pickend() {
      },
      init() {
        this.setColumnNum();
        this.setDefaultSelector();
        this.setColumnData();
        this.setSelectValue();
      },
      // 获取默认选中列下标
      setDefaultSelector() {
        this.defaultSelector = this.defaultValue.length == this.columnNum ? this.defaultValue : Array(this.columnNum).fill(0);
        this.lastSelectIndex = this.$u.deepClone(this.defaultSelector);
      },
      // 计算列数
      setColumnNum() {
        if (this.mode == "single-column")
          this.columnNum = 1;
        else if (this.mode == "mutil-column")
          this.columnNum = this.list.length;
        else if (this.mode == "mutil-column-auto") {
          let num = 1;
          let column = this.list;
          while (column[0][this.childName]) {
            column = column[0] ? column[0][this.childName] : {};
            num++;
          }
          this.columnNum = num;
        }
      },
      // 获取需要展示在picker中的列数据
      setColumnData() {
        let data = [];
        this.selectValue = [];
        if (this.mode == "mutil-column-auto") {
          let column = this.list[this.defaultSelector.length ? this.defaultSelector[0] : 0];
          for (let i2 = 0; i2 < this.columnNum; i2++) {
            if (i2 == 0) {
              data[i2] = this.list;
              column = column[this.childName];
            } else {
              data[i2] = column;
              column = column[this.defaultSelector[i2]][this.childName];
            }
          }
        } else if (this.mode == "single-column") {
          data[0] = this.list;
        } else {
          data = this.list;
        }
        this.columnData = data;
      },
      // 获取默认选中的值，如果没有设置defaultValue，就默认选中每列的第一个
      setSelectValue() {
        let tmp = null;
        for (let i2 = 0; i2 < this.columnNum; i2++) {
          tmp = this.columnData[i2][this.defaultSelector[i2]];
          let data = {
            value: tmp ? tmp[this.valueName] : null,
            label: tmp ? tmp[this.labelName] : null
          };
          if (tmp && tmp.extra)
            data.extra = tmp.extra;
          this.selectValue.push(data);
        }
      },
      // 列选项
      columnChange(e2) {
        let index = null;
        let columnIndex = e2.detail.value;
        this.selectValue = [];
        if (this.mode == "mutil-column-auto") {
          this.lastSelectIndex.map((val, idx) => {
            if (val != columnIndex[idx])
              index = idx;
          });
          this.defaultSelector = columnIndex;
          for (let i2 = index + 1; i2 < this.columnNum; i2++) {
            this.columnData[i2] = this.columnData[i2 - 1][i2 - 1 == index ? columnIndex[index] : 0][this.childName];
            this.defaultSelector[i2] = 0;
          }
          columnIndex.map((item, index2) => {
            let data = this.columnData[index2][columnIndex[index2]];
            let tmp = {
              value: data ? data[this.valueName] : null,
              label: data ? data[this.labelName] : null
            };
            if (data && data.extra !== void 0)
              tmp.extra = data.extra;
            this.selectValue.push(tmp);
          });
          this.lastSelectIndex = columnIndex;
        } else if (this.mode == "single-column") {
          let data = this.columnData[0][columnIndex[0]];
          let tmp = {
            value: data ? data[this.valueName] : null,
            label: data ? data[this.labelName] : null
          };
          if (data && data.extra !== void 0)
            tmp.extra = data.extra;
          this.selectValue.push(tmp);
        } else if (this.mode == "mutil-column") {
          columnIndex.map((item, index2) => {
            let data = this.columnData[index2][columnIndex[index2]];
            let tmp = {
              value: data ? data[this.valueName] : null,
              label: data ? data[this.labelName] : null
            };
            if (data && data.extra !== void 0)
              tmp.extra = data.extra;
            this.selectValue.push(tmp);
          });
        }
      },
      close() {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
        if (!this.isInit) {
          this.$emit("close", false, this.item);
        }
      },
      // 点击确定或者取消
      getResult(event = null) {
        if (event)
          this.$emit(event, this.selectValue, this.item);
        this.close();
      },
      selectHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-select" }, [
      vue.createCommentVNode(` <view class="u-select__action" :class="{\r
			'u-select--border': border\r
		}" @tap.stop="selectHandler">\r
			<view class="u-select__action__icon" :class="{\r
				'u-select__action__icon--reverse': value == true\r
			}">\r
				<u-icon name="arrow-down-fill" size="26" color="#c0c4cc"></u-icon>\r
			</view>\r
		</view> `),
      vue.createVNode(_component_u_popup, {
        blur: $props.blur,
        maskCloseAble: $props.maskCloseAble,
        mode: "bottom",
        popup: false,
        modelValue: $data.popupValue,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.popupValue = $event),
        length: "auto",
        safeAreaInsetBottom: $props.safeAreaInsetBottom,
        onClose: $options.close,
        "z-index": $options.uZIndex
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "u-select" }, [
            vue.createElementVNode(
              "view",
              {
                class: "u-select__header",
                onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers(() => {
                }, ["stop", "prevent"]))
              },
              [
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-select__header__cancel u-select__header__btn",
                    style: vue.normalizeStyle({ color: $props.cancelColor }),
                    "hover-class": "u-hover-class",
                    "hover-stay-time": 150,
                    onClick: _cache[0] || (_cache[0] = ($event) => $options.getResult("cancel"))
                  },
                  vue.toDisplayString($props.cancelText),
                  5
                  /* TEXT, STYLE */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "u-select__header__title" },
                  vue.toDisplayString($props.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-select__header__confirm u-select__header__btn",
                    style: vue.normalizeStyle({ color: $data.moving ? $props.cancelColor : $props.confirmColor }),
                    "hover-class": "u-hover-class",
                    "hover-stay-time": 150,
                    onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                    }, ["stop"])),
                    onClick: _cache[2] || (_cache[2] = vue.withModifiers(($event) => $options.getResult("confirm"), ["stop"]))
                  },
                  vue.toDisplayString($props.confirmText),
                  37
                  /* TEXT, STYLE, HYDRATE_EVENTS */
                )
              ],
              32
              /* HYDRATE_EVENTS */
            ),
            vue.createElementVNode("view", { class: "u-select__body" }, [
              vue.createElementVNode("picker-view", {
                onChange: _cache[4] || (_cache[4] = (...args) => $options.columnChange && $options.columnChange(...args)),
                class: "u-select__body__picker-view",
                value: $data.defaultSelector,
                onPickstart: _cache[5] || (_cache[5] = (...args) => $options.pickstart && $options.pickstart(...args)),
                onPickend: _cache[6] || (_cache[6] = (...args) => $options.pickend && $options.pickend(...args))
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.columnData, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("picker-view-column", { key: index }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(item, (item1, index1) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "u-select__body__picker-view__item",
                            key: index1
                          }, [
                            vue.createElementVNode(
                              "view",
                              { class: "u-line-1" },
                              vue.toDisplayString(item1[$props.labelName]),
                              1
                              /* TEXT */
                            )
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 40, ["value"])
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["blur", "maskCloseAble", "modelValue", "safeAreaInsetBottom", "onClose", "z-index"])
    ]);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$5], ["__scopeId", "data-v-94128124"], ["__file", "E:/lwz/lwz/mine/uniapp-base/components/public/pub-select.vue"]]);
  const provinces = [
    {
      code: "110000",
      name: "北京市"
    },
    {
      code: "120000",
      name: "天津市"
    },
    {
      code: "130000",
      name: "河北省"
    },
    {
      code: "140000",
      name: "山西省"
    },
    {
      code: "150000",
      name: "内蒙古自治区"
    },
    {
      code: "210000",
      name: "辽宁省"
    },
    {
      code: "220000",
      name: "吉林省"
    },
    {
      code: "230000",
      name: "黑龙江省"
    },
    {
      code: "310000",
      name: "上海市"
    },
    {
      code: "320000",
      name: "江苏省"
    },
    {
      code: "330000",
      name: "浙江省"
    },
    {
      code: "340000",
      name: "安徽省"
    },
    {
      code: "350000",
      name: "福建省"
    },
    {
      code: "360000",
      name: "江西省"
    },
    {
      code: "370000",
      name: "山东省"
    },
    {
      code: "410000",
      name: "河南省"
    },
    {
      code: "420000",
      name: "湖北省"
    },
    {
      code: "430000",
      name: "湖南省"
    },
    {
      code: "440000",
      name: "广东省"
    },
    {
      code: "450000",
      name: "广西壮族自治区"
    },
    {
      code: "460000",
      name: "海南省"
    },
    {
      code: "500000",
      name: "重庆市"
    },
    {
      code: "510000",
      name: "四川省"
    },
    {
      code: "520000",
      name: "贵州省"
    },
    {
      code: "530000",
      name: "云南省"
    },
    {
      code: "540000",
      name: "西藏自治区"
    },
    {
      code: "610000",
      name: "陕西省"
    },
    {
      code: "620000",
      name: "甘肃省"
    },
    {
      code: "630000",
      name: "青海省"
    },
    {
      code: "640000",
      name: "宁夏回族自治区"
    },
    {
      code: "650000",
      name: "新疆维吾尔自治区"
    },
    {
      code: "710000",
      name: "台湾省"
    },
    {
      code: "810000",
      name: "香港特别行政区"
    },
    {
      code: "820000",
      name: "澳门特别行政区"
    }
  ];
  const citys = [
    [
      {
        code: "110100",
        name: "北京市"
      }
    ],
    [
      {
        code: "120100",
        name: "天津市"
      }
    ],
    [
      {
        code: "130100",
        name: "石家庄市"
      },
      {
        code: "130200",
        name: "唐山市"
      },
      {
        code: "130300",
        name: "秦皇岛市"
      },
      {
        code: "130400",
        name: "邯郸市"
      },
      {
        code: "130500",
        name: "邢台市"
      },
      {
        code: "130600",
        name: "保定市"
      },
      {
        code: "130700",
        name: "张家口市"
      },
      {
        code: "130800",
        name: "承德市"
      },
      {
        code: "130900",
        name: "沧州市"
      },
      {
        code: "131000",
        name: "廊坊市"
      },
      {
        code: "131100",
        name: "衡水市"
      }
    ],
    [
      {
        code: "140100",
        name: "太原市"
      },
      {
        code: "140200",
        name: "大同市"
      },
      {
        code: "140300",
        name: "阳泉市"
      },
      {
        code: "140400",
        name: "长治市"
      },
      {
        code: "140500",
        name: "晋城市"
      },
      {
        code: "140600",
        name: "朔州市"
      },
      {
        code: "140700",
        name: "晋中市"
      },
      {
        code: "140800",
        name: "运城市"
      },
      {
        code: "140900",
        name: "忻州市"
      },
      {
        code: "141000",
        name: "临汾市"
      },
      {
        code: "141100",
        name: "吕梁市"
      }
    ],
    [
      {
        code: "150100",
        name: "呼和浩特市"
      },
      {
        code: "150200",
        name: "包头市"
      },
      {
        code: "150300",
        name: "乌海市"
      },
      {
        code: "150400",
        name: "赤峰市"
      },
      {
        code: "150500",
        name: "通辽市"
      },
      {
        code: "150600",
        name: "鄂尔多斯市"
      },
      {
        code: "150700",
        name: "呼伦贝尔市"
      },
      {
        code: "150800",
        name: "巴彦淖尔市"
      },
      {
        code: "150900",
        name: "乌兰察布市"
      },
      {
        code: "152200",
        name: "兴安盟"
      },
      {
        code: "152500",
        name: "锡林郭勒盟"
      },
      {
        code: "152900",
        name: "阿拉善盟"
      }
    ],
    [
      {
        code: "210100",
        name: "沈阳市"
      },
      {
        code: "210200",
        name: "大连市"
      },
      {
        code: "210300",
        name: "鞍山市"
      },
      {
        code: "210400",
        name: "抚顺市"
      },
      {
        code: "210500",
        name: "本溪市"
      },
      {
        code: "210600",
        name: "丹东市"
      },
      {
        code: "210700",
        name: "锦州市"
      },
      {
        code: "210800",
        name: "营口市"
      },
      {
        code: "210900",
        name: "阜新市"
      },
      {
        code: "211000",
        name: "辽阳市"
      },
      {
        code: "211100",
        name: "盘锦市"
      },
      {
        code: "211200",
        name: "铁岭市"
      },
      {
        code: "211300",
        name: "朝阳市"
      },
      {
        code: "211400",
        name: "葫芦岛市"
      }
    ],
    [
      {
        code: "220100",
        name: "长春市"
      },
      {
        code: "220200",
        name: "吉林市"
      },
      {
        code: "220300",
        name: "四平市"
      },
      {
        code: "220400",
        name: "辽源市"
      },
      {
        code: "220500",
        name: "通化市"
      },
      {
        code: "220600",
        name: "白山市"
      },
      {
        code: "220700",
        name: "松原市"
      },
      {
        code: "220800",
        name: "白城市"
      },
      {
        code: "222400",
        name: "延边朝鲜族自治州"
      }
    ],
    [
      {
        code: "230100",
        name: "哈尔滨市"
      },
      {
        code: "230200",
        name: "齐齐哈尔市"
      },
      {
        code: "230300",
        name: "鸡西市"
      },
      {
        code: "230400",
        name: "鹤岗市"
      },
      {
        code: "230500",
        name: "双鸭山市"
      },
      {
        code: "230600",
        name: "大庆市"
      },
      {
        code: "230700",
        name: "伊春市"
      },
      {
        code: "230800",
        name: "佳木斯市"
      },
      {
        code: "230900",
        name: "七台河市"
      },
      {
        code: "231000",
        name: "牡丹江市"
      },
      {
        code: "231100",
        name: "黑河市"
      },
      {
        code: "231200",
        name: "绥化市"
      },
      {
        code: "232700",
        name: "大兴安岭地区"
      }
    ],
    [
      {
        code: "310100",
        name: "上海市"
      }
    ],
    [
      {
        code: "320100",
        name: "南京市"
      },
      {
        code: "320200",
        name: "无锡市"
      },
      {
        code: "320300",
        name: "徐州市"
      },
      {
        code: "320400",
        name: "常州市"
      },
      {
        code: "320500",
        name: "苏州市"
      },
      {
        code: "320600",
        name: "南通市"
      },
      {
        code: "320700",
        name: "连云港市"
      },
      {
        code: "320800",
        name: "淮安市"
      },
      {
        code: "320900",
        name: "盐城市"
      },
      {
        code: "321000",
        name: "扬州市"
      },
      {
        code: "321100",
        name: "镇江市"
      },
      {
        code: "321200",
        name: "泰州市"
      },
      {
        code: "321300",
        name: "宿迁市"
      }
    ],
    [
      {
        code: "330100",
        name: "杭州市"
      },
      {
        code: "330200",
        name: "宁波市"
      },
      {
        code: "330300",
        name: "温州市"
      },
      {
        code: "330400",
        name: "嘉兴市"
      },
      {
        code: "330500",
        name: "湖州市"
      },
      {
        code: "330600",
        name: "绍兴市"
      },
      {
        code: "330700",
        name: "金华市"
      },
      {
        code: "330800",
        name: "衢州市"
      },
      {
        code: "330900",
        name: "舟山市"
      },
      {
        code: "331000",
        name: "台州市"
      },
      {
        code: "331100",
        name: "丽水市"
      }
    ],
    [
      {
        code: "340100",
        name: "合肥市"
      },
      {
        code: "340200",
        name: "芜湖市"
      },
      {
        code: "340300",
        name: "蚌埠市"
      },
      {
        code: "340400",
        name: "淮南市"
      },
      {
        code: "340500",
        name: "马鞍山市"
      },
      {
        code: "340600",
        name: "淮北市"
      },
      {
        code: "340700",
        name: "铜陵市"
      },
      {
        code: "340800",
        name: "安庆市"
      },
      {
        code: "341000",
        name: "黄山市"
      },
      {
        code: "341100",
        name: "滁州市"
      },
      {
        code: "341200",
        name: "阜阳市"
      },
      {
        code: "341300",
        name: "宿州市"
      },
      {
        code: "341500",
        name: "六安市"
      },
      {
        code: "341600",
        name: "亳州市"
      },
      {
        code: "341700",
        name: "池州市"
      },
      {
        code: "341800",
        name: "宣城市"
      }
    ],
    [
      {
        code: "350100",
        name: "福州市"
      },
      {
        code: "350200",
        name: "厦门市"
      },
      {
        code: "350300",
        name: "莆田市"
      },
      {
        code: "350400",
        name: "三明市"
      },
      {
        code: "350500",
        name: "泉州市"
      },
      {
        code: "350600",
        name: "漳州市"
      },
      {
        code: "350700",
        name: "南平市"
      },
      {
        code: "350800",
        name: "龙岩市"
      },
      {
        code: "350900",
        name: "宁德市"
      }
    ],
    [
      {
        code: "360100",
        name: "南昌市"
      },
      {
        code: "360200",
        name: "景德镇市"
      },
      {
        code: "360300",
        name: "萍乡市"
      },
      {
        code: "360400",
        name: "九江市"
      },
      {
        code: "360500",
        name: "新余市"
      },
      {
        code: "360600",
        name: "鹰潭市"
      },
      {
        code: "360700",
        name: "赣州市"
      },
      {
        code: "360800",
        name: "吉安市"
      },
      {
        code: "360900",
        name: "宜春市"
      },
      {
        code: "361000",
        name: "抚州市"
      },
      {
        code: "361100",
        name: "上饶市"
      }
    ],
    [
      {
        code: "370100",
        name: "济南市"
      },
      {
        code: "370200",
        name: "青岛市"
      },
      {
        code: "370300",
        name: "淄博市"
      },
      {
        code: "370400",
        name: "枣庄市"
      },
      {
        code: "370500",
        name: "东营市"
      },
      {
        code: "370600",
        name: "烟台市"
      },
      {
        code: "370700",
        name: "潍坊市"
      },
      {
        code: "370800",
        name: "济宁市"
      },
      {
        code: "370900",
        name: "泰安市"
      },
      {
        code: "371000",
        name: "威海市"
      },
      {
        code: "371100",
        name: "日照市"
      },
      {
        code: "371200",
        name: "莱芜市"
      },
      {
        code: "371300",
        name: "临沂市"
      },
      {
        code: "371400",
        name: "德州市"
      },
      {
        code: "371500",
        name: "聊城市"
      },
      {
        code: "371600",
        name: "滨州市"
      },
      {
        code: "371700",
        name: "菏泽市"
      }
    ],
    [
      {
        code: "410100",
        name: "郑州市"
      },
      {
        code: "410200",
        name: "开封市"
      },
      {
        code: "410300",
        name: "洛阳市"
      },
      {
        code: "410400",
        name: "平顶山市"
      },
      {
        code: "410500",
        name: "安阳市"
      },
      {
        code: "410600",
        name: "鹤壁市"
      },
      {
        code: "410700",
        name: "新乡市"
      },
      {
        code: "410800",
        name: "焦作市"
      },
      {
        code: "410900",
        name: "濮阳市"
      },
      {
        code: "411000",
        name: "许昌市"
      },
      {
        code: "411100",
        name: "漯河市"
      },
      {
        code: "411200",
        name: "三门峡市"
      },
      {
        code: "411300",
        name: "南阳市"
      },
      {
        code: "411400",
        name: "商丘市"
      },
      {
        code: "411500",
        name: "信阳市"
      },
      {
        code: "411600",
        name: "周口市"
      },
      {
        code: "411700",
        name: "驻马店市"
      },
      {
        code: "419000",
        name: "省直辖县级行政区划"
      }
    ],
    [
      {
        code: "420100",
        name: "武汉市"
      },
      {
        code: "420200",
        name: "黄石市"
      },
      {
        code: "420300",
        name: "十堰市"
      },
      {
        code: "420500",
        name: "宜昌市"
      },
      {
        code: "420600",
        name: "襄阳市"
      },
      {
        code: "420700",
        name: "鄂州市"
      },
      {
        code: "420800",
        name: "荆门市"
      },
      {
        code: "420900",
        name: "孝感市"
      },
      {
        code: "421000",
        name: "荆州市"
      },
      {
        code: "421100",
        name: "黄冈市"
      },
      {
        code: "421200",
        name: "咸宁市"
      },
      {
        code: "421300",
        name: "随州市"
      },
      {
        code: "422800",
        name: "恩施土家族苗族自治州"
      },
      {
        code: "429000",
        name: "省直辖县级行政区划"
      }
    ],
    [
      {
        code: "430100",
        name: "长沙市"
      },
      {
        code: "430200",
        name: "株洲市"
      },
      {
        code: "430300",
        name: "湘潭市"
      },
      {
        code: "430400",
        name: "衡阳市"
      },
      {
        code: "430500",
        name: "邵阳市"
      },
      {
        code: "430600",
        name: "岳阳市"
      },
      {
        code: "430700",
        name: "常德市"
      },
      {
        code: "430800",
        name: "张家界市"
      },
      {
        code: "430900",
        name: "益阳市"
      },
      {
        code: "431000",
        name: "郴州市"
      },
      {
        code: "431100",
        name: "永州市"
      },
      {
        code: "431200",
        name: "怀化市"
      },
      {
        code: "431300",
        name: "娄底市"
      },
      {
        code: "433100",
        name: "湘西土家族苗族自治州"
      }
    ],
    [
      {
        code: "440100",
        name: "广州市"
      },
      {
        code: "440200",
        name: "韶关市"
      },
      {
        code: "440300",
        name: "深圳市"
      },
      {
        code: "440400",
        name: "珠海市"
      },
      {
        code: "440500",
        name: "汕头市"
      },
      {
        code: "440600",
        name: "佛山市"
      },
      {
        code: "440700",
        name: "江门市"
      },
      {
        code: "440800",
        name: "湛江市"
      },
      {
        code: "440900",
        name: "茂名市"
      },
      {
        code: "441200",
        name: "肇庆市"
      },
      {
        code: "441300",
        name: "惠州市"
      },
      {
        code: "441400",
        name: "梅州市"
      },
      {
        code: "441500",
        name: "汕尾市"
      },
      {
        code: "441600",
        name: "河源市"
      },
      {
        code: "441700",
        name: "阳江市"
      },
      {
        code: "441800",
        name: "清远市"
      },
      {
        code: "441900",
        name: "东莞市"
      },
      {
        code: "442000",
        name: "中山市"
      },
      {
        code: "445100",
        name: "潮州市"
      },
      {
        code: "445200",
        name: "揭阳市"
      },
      {
        code: "445300",
        name: "云浮市"
      }
    ],
    [
      {
        code: "450100",
        name: "南宁市"
      },
      {
        code: "450200",
        name: "柳州市"
      },
      {
        code: "450300",
        name: "桂林市"
      },
      {
        code: "450400",
        name: "梧州市"
      },
      {
        code: "450500",
        name: "北海市"
      },
      {
        code: "450600",
        name: "防城港市"
      },
      {
        code: "450700",
        name: "钦州市"
      },
      {
        code: "450800",
        name: "贵港市"
      },
      {
        code: "450900",
        name: "玉林市"
      },
      {
        code: "451000",
        name: "百色市"
      },
      {
        code: "451100",
        name: "贺州市"
      },
      {
        code: "451200",
        name: "河池市"
      },
      {
        code: "451300",
        name: "来宾市"
      },
      {
        code: "451400",
        name: "崇左市"
      }
    ],
    [
      {
        code: "460100",
        name: "海口市"
      },
      {
        code: "460200",
        name: "三亚市"
      },
      {
        code: "460300",
        name: "三沙市"
      },
      {
        code: "460400",
        name: "儋州市"
      },
      {
        code: "469000",
        name: "省直辖县级行政区划"
      }
    ],
    [
      {
        code: "500100",
        name: "重庆市"
      },
      {
        code: "500200",
        name: "县"
      }
    ],
    [
      {
        code: "510100",
        name: "成都市"
      },
      {
        code: "510300",
        name: "自贡市"
      },
      {
        code: "510400",
        name: "攀枝花市"
      },
      {
        code: "510500",
        name: "泸州市"
      },
      {
        code: "510600",
        name: "德阳市"
      },
      {
        code: "510700",
        name: "绵阳市"
      },
      {
        code: "510800",
        name: "广元市"
      },
      {
        code: "510900",
        name: "遂宁市"
      },
      {
        code: "511000",
        name: "内江市"
      },
      {
        code: "511100",
        name: "乐山市"
      },
      {
        code: "511300",
        name: "南充市"
      },
      {
        code: "511400",
        name: "眉山市"
      },
      {
        code: "511500",
        name: "宜宾市"
      },
      {
        code: "511600",
        name: "广安市"
      },
      {
        code: "511700",
        name: "达州市"
      },
      {
        code: "511800",
        name: "雅安市"
      },
      {
        code: "511900",
        name: "巴中市"
      },
      {
        code: "512000",
        name: "资阳市"
      },
      {
        code: "513200",
        name: "阿坝藏族羌族自治州"
      },
      {
        code: "513300",
        name: "甘孜藏族自治州"
      },
      {
        code: "513400",
        name: "凉山彝族自治州"
      }
    ],
    [
      {
        code: "520100",
        name: "贵阳市"
      },
      {
        code: "520200",
        name: "六盘水市"
      },
      {
        code: "520300",
        name: "遵义市"
      },
      {
        code: "520400",
        name: "安顺市"
      },
      {
        code: "520500",
        name: "毕节市"
      },
      {
        code: "520600",
        name: "铜仁市"
      },
      {
        code: "522300",
        name: "黔西南布依族苗族自治州"
      },
      {
        code: "522600",
        name: "黔东南苗族侗族自治州"
      },
      {
        code: "522700",
        name: "黔南布依族苗族自治州"
      }
    ],
    [
      {
        code: "530100",
        name: "昆明市"
      },
      {
        code: "530300",
        name: "曲靖市"
      },
      {
        code: "530400",
        name: "玉溪市"
      },
      {
        code: "530500",
        name: "保山市"
      },
      {
        code: "530600",
        name: "昭通市"
      },
      {
        code: "530700",
        name: "丽江市"
      },
      {
        code: "530800",
        name: "普洱市"
      },
      {
        code: "530900",
        name: "临沧市"
      },
      {
        code: "532300",
        name: "楚雄彝族自治州"
      },
      {
        code: "532500",
        name: "红河哈尼族彝族自治州"
      },
      {
        code: "532600",
        name: "文山壮族苗族自治州"
      },
      {
        code: "532800",
        name: "西双版纳傣族自治州"
      },
      {
        code: "532900",
        name: "大理白族自治州"
      },
      {
        code: "533100",
        name: "德宏傣族景颇族自治州"
      },
      {
        code: "533300",
        name: "怒江傈僳族自治州"
      },
      {
        code: "533400",
        name: "迪庆藏族自治州"
      }
    ],
    [
      {
        code: "540100",
        name: "拉萨市"
      },
      {
        code: "540200",
        name: "日喀则市"
      },
      {
        code: "540300",
        name: "昌都市"
      },
      {
        code: "540400",
        name: "林芝市"
      },
      {
        code: "540500",
        name: "山南市"
      },
      {
        code: "542400",
        name: "那曲地区"
      },
      {
        code: "542500",
        name: "阿里地区"
      }
    ],
    [
      {
        code: "610100",
        name: "西安市"
      },
      {
        code: "610200",
        name: "铜川市"
      },
      {
        code: "610300",
        name: "宝鸡市"
      },
      {
        code: "610400",
        name: "咸阳市"
      },
      {
        code: "610500",
        name: "渭南市"
      },
      {
        code: "610600",
        name: "延安市"
      },
      {
        code: "610700",
        name: "汉中市"
      },
      {
        code: "610800",
        name: "榆林市"
      },
      {
        code: "610900",
        name: "安康市"
      },
      {
        code: "611000",
        name: "商洛市"
      }
    ],
    [
      {
        code: "620100",
        name: "兰州市"
      },
      {
        code: "620200",
        name: "嘉峪关市"
      },
      {
        code: "620300",
        name: "金昌市"
      },
      {
        code: "620400",
        name: "白银市"
      },
      {
        code: "620500",
        name: "天水市"
      },
      {
        code: "620600",
        name: "武威市"
      },
      {
        code: "620700",
        name: "张掖市"
      },
      {
        code: "620800",
        name: "平凉市"
      },
      {
        code: "620900",
        name: "酒泉市"
      },
      {
        code: "621000",
        name: "庆阳市"
      },
      {
        code: "621100",
        name: "定西市"
      },
      {
        code: "621200",
        name: "陇南市"
      },
      {
        code: "622900",
        name: "临夏回族自治州"
      },
      {
        code: "623000",
        name: "甘南藏族自治州"
      }
    ],
    [
      {
        code: "630100",
        name: "西宁市"
      },
      {
        code: "630200",
        name: "海东市"
      },
      {
        code: "632200",
        name: "海北藏族自治州"
      },
      {
        code: "632300",
        name: "黄南藏族自治州"
      },
      {
        code: "632500",
        name: "海南藏族自治州"
      },
      {
        code: "632600",
        name: "果洛藏族自治州"
      },
      {
        code: "632700",
        name: "玉树藏族自治州"
      },
      {
        code: "632800",
        name: "海西蒙古族藏族自治州"
      }
    ],
    [
      {
        code: "640100",
        name: "银川市"
      },
      {
        code: "640200",
        name: "石嘴山市"
      },
      {
        code: "640300",
        name: "吴忠市"
      },
      {
        code: "640400",
        name: "固原市"
      },
      {
        code: "640500",
        name: "中卫市"
      }
    ],
    [
      {
        code: "650100",
        name: "乌鲁木齐市"
      },
      {
        code: "650200",
        name: "克拉玛依市"
      },
      {
        code: "650400",
        name: "吐鲁番市"
      },
      {
        code: "650500",
        name: "哈密市"
      },
      {
        code: "652300",
        name: "昌吉回族自治州"
      },
      {
        code: "652700",
        name: "博尔塔拉蒙古自治州"
      },
      {
        code: "652800",
        name: "巴音郭楞蒙古自治州"
      },
      {
        code: "652900",
        name: "阿克苏地区"
      },
      {
        code: "653000",
        name: "克孜勒苏柯尔克孜自治州"
      },
      {
        code: "653100",
        name: "喀什地区"
      },
      {
        code: "653200",
        name: "和田地区"
      },
      {
        code: "654000",
        name: "伊犁哈萨克自治州"
      },
      {
        code: "654200",
        name: "塔城地区"
      },
      {
        code: "654300",
        name: "阿勒泰地区"
      },
      {
        code: "659000",
        name: "自治区直辖县级行政区划"
      }
    ],
    [
      {
        code: "710100",
        name: "台北市"
      },
      {
        code: "710200",
        name: "高雄市"
      },
      {
        code: "710300",
        name: "台南市"
      },
      {
        code: "710400",
        name: "台中市"
      },
      {
        code: "710600",
        name: "南投县"
      },
      {
        code: "710700",
        name: "基隆市"
      },
      {
        code: "710800",
        name: "新竹市"
      },
      {
        code: "710900",
        name: "嘉义市"
      },
      {
        code: "711100",
        name: "新北市"
      },
      {
        code: "711200",
        name: "宜兰县"
      },
      {
        code: "711300",
        name: "新竹县"
      },
      {
        code: "711400",
        name: "桃园市"
      },
      {
        code: "711500",
        name: "苗栗县"
      },
      {
        code: "711700",
        name: "彰化县"
      },
      {
        code: "711900",
        name: "嘉义县"
      },
      {
        code: "712100",
        name: "云林县"
      },
      {
        code: "712400",
        name: "屏东县"
      },
      {
        code: "712500",
        name: "台东县"
      },
      {
        code: "712600",
        name: "花莲县"
      },
      {
        code: "712700",
        name: "澎湖县"
      }
    ],
    [
      {
        code: "810100",
        name: "香港特别行政区"
      }
    ],
    [
      {
        code: "820100",
        name: "澳门特别行政区"
      }
    ]
  ];
  const areas = [
    [
      [
        {
          code: "110101",
          name: "东城区"
        },
        {
          code: "110102",
          name: "西城区"
        },
        {
          code: "110105",
          name: "朝阳区"
        },
        {
          code: "110106",
          name: "丰台区"
        },
        {
          code: "110107",
          name: "石景山区"
        },
        {
          code: "110108",
          name: "海淀区"
        },
        {
          code: "110109",
          name: "门头沟区"
        },
        {
          code: "110111",
          name: "房山区"
        },
        {
          code: "110112",
          name: "通州区"
        },
        {
          code: "110113",
          name: "顺义区"
        },
        {
          code: "110114",
          name: "昌平区"
        },
        {
          code: "110115",
          name: "大兴区"
        },
        {
          code: "110116",
          name: "怀柔区"
        },
        {
          code: "110117",
          name: "平谷区"
        },
        {
          code: "110118",
          name: "密云区"
        },
        {
          code: "110119",
          name: "延庆区"
        }
      ]
    ],
    [
      [
        {
          code: "120101",
          name: "和平区"
        },
        {
          code: "120102",
          name: "河东区"
        },
        {
          code: "120103",
          name: "河西区"
        },
        {
          code: "120104",
          name: "南开区"
        },
        {
          code: "120105",
          name: "河北区"
        },
        {
          code: "120106",
          name: "红桥区"
        },
        {
          code: "120110",
          name: "东丽区"
        },
        {
          code: "120111",
          name: "西青区"
        },
        {
          code: "120112",
          name: "津南区"
        },
        {
          code: "120113",
          name: "北辰区"
        },
        {
          code: "120114",
          name: "武清区"
        },
        {
          code: "120115",
          name: "宝坻区"
        },
        {
          code: "120116",
          name: "滨海新区"
        },
        {
          code: "120117",
          name: "宁河区"
        },
        {
          code: "120118",
          name: "静海区"
        },
        {
          code: "120119",
          name: "蓟州区"
        }
      ]
    ],
    [
      [
        {
          code: "130102",
          name: "长安区"
        },
        {
          code: "130104",
          name: "桥西区"
        },
        {
          code: "130105",
          name: "新华区"
        },
        {
          code: "130107",
          name: "井陉矿区"
        },
        {
          code: "130108",
          name: "裕华区"
        },
        {
          code: "130109",
          name: "藁城区"
        },
        {
          code: "130110",
          name: "鹿泉区"
        },
        {
          code: "130111",
          name: "栾城区"
        },
        {
          code: "130121",
          name: "井陉县"
        },
        {
          code: "130123",
          name: "正定县"
        },
        {
          code: "130125",
          name: "行唐县"
        },
        {
          code: "130126",
          name: "灵寿县"
        },
        {
          code: "130127",
          name: "高邑县"
        },
        {
          code: "130128",
          name: "深泽县"
        },
        {
          code: "130129",
          name: "赞皇县"
        },
        {
          code: "130130",
          name: "无极县"
        },
        {
          code: "130131",
          name: "平山县"
        },
        {
          code: "130132",
          name: "元氏县"
        },
        {
          code: "130133",
          name: "赵县"
        },
        {
          code: "130181",
          name: "辛集市"
        },
        {
          code: "130183",
          name: "晋州市"
        },
        {
          code: "130184",
          name: "新乐市"
        }
      ],
      [
        {
          code: "130202",
          name: "路南区"
        },
        {
          code: "130203",
          name: "路北区"
        },
        {
          code: "130204",
          name: "古冶区"
        },
        {
          code: "130205",
          name: "开平区"
        },
        {
          code: "130207",
          name: "丰南区"
        },
        {
          code: "130208",
          name: "丰润区"
        },
        {
          code: "130209",
          name: "曹妃甸区"
        },
        {
          code: "130223",
          name: "滦县"
        },
        {
          code: "130224",
          name: "滦南县"
        },
        {
          code: "130225",
          name: "乐亭县"
        },
        {
          code: "130227",
          name: "迁西县"
        },
        {
          code: "130229",
          name: "玉田县"
        },
        {
          code: "130281",
          name: "遵化市"
        },
        {
          code: "130283",
          name: "迁安市"
        }
      ],
      [
        {
          code: "130302",
          name: "海港区"
        },
        {
          code: "130303",
          name: "山海关区"
        },
        {
          code: "130304",
          name: "北戴河区"
        },
        {
          code: "130306",
          name: "抚宁区"
        },
        {
          code: "130321",
          name: "青龙满族自治县"
        },
        {
          code: "130322",
          name: "昌黎县"
        },
        {
          code: "130324",
          name: "卢龙县"
        }
      ],
      [
        {
          code: "130402",
          name: "邯山区"
        },
        {
          code: "130403",
          name: "丛台区"
        },
        {
          code: "130404",
          name: "复兴区"
        },
        {
          code: "130406",
          name: "峰峰矿区"
        },
        {
          code: "130407",
          name: "肥乡区"
        },
        {
          code: "130408",
          name: "永年区"
        },
        {
          code: "130423",
          name: "临漳县"
        },
        {
          code: "130424",
          name: "成安县"
        },
        {
          code: "130425",
          name: "大名县"
        },
        {
          code: "130426",
          name: "涉县"
        },
        {
          code: "130427",
          name: "磁县"
        },
        {
          code: "130430",
          name: "邱县"
        },
        {
          code: "130431",
          name: "鸡泽县"
        },
        {
          code: "130432",
          name: "广平县"
        },
        {
          code: "130433",
          name: "馆陶县"
        },
        {
          code: "130434",
          name: "魏县"
        },
        {
          code: "130435",
          name: "曲周县"
        },
        {
          code: "130481",
          name: "武安市"
        }
      ],
      [
        {
          code: "130502",
          name: "桥东区"
        },
        {
          code: "130503",
          name: "桥西区"
        },
        {
          code: "130521",
          name: "邢台县"
        },
        {
          code: "130522",
          name: "临城县"
        },
        {
          code: "130523",
          name: "内丘县"
        },
        {
          code: "130524",
          name: "柏乡县"
        },
        {
          code: "130525",
          name: "隆尧县"
        },
        {
          code: "130526",
          name: "任县"
        },
        {
          code: "130527",
          name: "南和县"
        },
        {
          code: "130528",
          name: "宁晋县"
        },
        {
          code: "130529",
          name: "巨鹿县"
        },
        {
          code: "130530",
          name: "新河县"
        },
        {
          code: "130531",
          name: "广宗县"
        },
        {
          code: "130532",
          name: "平乡县"
        },
        {
          code: "130533",
          name: "威县"
        },
        {
          code: "130534",
          name: "清河县"
        },
        {
          code: "130535",
          name: "临西县"
        },
        {
          code: "130581",
          name: "南宫市"
        },
        {
          code: "130582",
          name: "沙河市"
        }
      ],
      [
        {
          code: "130602",
          name: "竞秀区"
        },
        {
          code: "130606",
          name: "莲池区"
        },
        {
          code: "130607",
          name: "满城区"
        },
        {
          code: "130608",
          name: "清苑区"
        },
        {
          code: "130609",
          name: "徐水区"
        },
        {
          code: "130623",
          name: "涞水县"
        },
        {
          code: "130624",
          name: "阜平县"
        },
        {
          code: "130626",
          name: "定兴县"
        },
        {
          code: "130627",
          name: "唐县"
        },
        {
          code: "130628",
          name: "高阳县"
        },
        {
          code: "130629",
          name: "容城县"
        },
        {
          code: "130630",
          name: "涞源县"
        },
        {
          code: "130631",
          name: "望都县"
        },
        {
          code: "130632",
          name: "安新县"
        },
        {
          code: "130633",
          name: "易县"
        },
        {
          code: "130634",
          name: "曲阳县"
        },
        {
          code: "130635",
          name: "蠡县"
        },
        {
          code: "130636",
          name: "顺平县"
        },
        {
          code: "130637",
          name: "博野县"
        },
        {
          code: "130638",
          name: "雄县"
        },
        {
          code: "130681",
          name: "涿州市"
        },
        {
          code: "130682",
          name: "定州市"
        },
        {
          code: "130683",
          name: "安国市"
        },
        {
          code: "130684",
          name: "高碑店市"
        }
      ],
      [
        {
          code: "130702",
          name: "桥东区"
        },
        {
          code: "130703",
          name: "桥西区"
        },
        {
          code: "130705",
          name: "宣化区"
        },
        {
          code: "130706",
          name: "下花园区"
        },
        {
          code: "130708",
          name: "万全区"
        },
        {
          code: "130709",
          name: "崇礼区"
        },
        {
          code: "130722",
          name: "张北县"
        },
        {
          code: "130723",
          name: "康保县"
        },
        {
          code: "130724",
          name: "沽源县"
        },
        {
          code: "130725",
          name: "尚义县"
        },
        {
          code: "130726",
          name: "蔚县"
        },
        {
          code: "130727",
          name: "阳原县"
        },
        {
          code: "130728",
          name: "怀安县"
        },
        {
          code: "130730",
          name: "怀来县"
        },
        {
          code: "130731",
          name: "涿鹿县"
        },
        {
          code: "130732",
          name: "赤城县"
        }
      ],
      [
        {
          code: "130802",
          name: "双桥区"
        },
        {
          code: "130803",
          name: "双滦区"
        },
        {
          code: "130804",
          name: "鹰手营子矿区"
        },
        {
          code: "130821",
          name: "承德县"
        },
        {
          code: "130822",
          name: "兴隆县"
        },
        {
          code: "130824",
          name: "滦平县"
        },
        {
          code: "130825",
          name: "隆化县"
        },
        {
          code: "130826",
          name: "丰宁满族自治县"
        },
        {
          code: "130827",
          name: "宽城满族自治县"
        },
        {
          code: "130828",
          name: "围场满族蒙古族自治县"
        },
        {
          code: "130881",
          name: "平泉市"
        }
      ],
      [
        {
          code: "130902",
          name: "新华区"
        },
        {
          code: "130903",
          name: "运河区"
        },
        {
          code: "130921",
          name: "沧县"
        },
        {
          code: "130922",
          name: "青县"
        },
        {
          code: "130923",
          name: "东光县"
        },
        {
          code: "130924",
          name: "海兴县"
        },
        {
          code: "130925",
          name: "盐山县"
        },
        {
          code: "130926",
          name: "肃宁县"
        },
        {
          code: "130927",
          name: "南皮县"
        },
        {
          code: "130928",
          name: "吴桥县"
        },
        {
          code: "130929",
          name: "献县"
        },
        {
          code: "130930",
          name: "孟村回族自治县"
        },
        {
          code: "130981",
          name: "泊头市"
        },
        {
          code: "130982",
          name: "任丘市"
        },
        {
          code: "130983",
          name: "黄骅市"
        },
        {
          code: "130984",
          name: "河间市"
        }
      ],
      [
        {
          code: "131002",
          name: "安次区"
        },
        {
          code: "131003",
          name: "广阳区"
        },
        {
          code: "131022",
          name: "固安县"
        },
        {
          code: "131023",
          name: "永清县"
        },
        {
          code: "131024",
          name: "香河县"
        },
        {
          code: "131025",
          name: "大城县"
        },
        {
          code: "131026",
          name: "文安县"
        },
        {
          code: "131028",
          name: "大厂回族自治县"
        },
        {
          code: "131081",
          name: "霸州市"
        },
        {
          code: "131082",
          name: "三河市"
        }
      ],
      [
        {
          code: "131102",
          name: "桃城区"
        },
        {
          code: "131103",
          name: "冀州区"
        },
        {
          code: "131121",
          name: "枣强县"
        },
        {
          code: "131122",
          name: "武邑县"
        },
        {
          code: "131123",
          name: "武强县"
        },
        {
          code: "131124",
          name: "饶阳县"
        },
        {
          code: "131125",
          name: "安平县"
        },
        {
          code: "131126",
          name: "故城县"
        },
        {
          code: "131127",
          name: "景县"
        },
        {
          code: "131128",
          name: "阜城县"
        },
        {
          code: "131182",
          name: "深州市"
        }
      ]
    ],
    [
      [
        {
          code: "140105",
          name: "小店区"
        },
        {
          code: "140106",
          name: "迎泽区"
        },
        {
          code: "140107",
          name: "杏花岭区"
        },
        {
          code: "140108",
          name: "尖草坪区"
        },
        {
          code: "140109",
          name: "万柏林区"
        },
        {
          code: "140110",
          name: "晋源区"
        },
        {
          code: "140121",
          name: "清徐县"
        },
        {
          code: "140122",
          name: "阳曲县"
        },
        {
          code: "140123",
          name: "娄烦县"
        },
        {
          code: "140181",
          name: "古交市"
        }
      ],
      [
        {
          code: "140202",
          name: "城区"
        },
        {
          code: "140203",
          name: "矿区"
        },
        {
          code: "140211",
          name: "南郊区"
        },
        {
          code: "140212",
          name: "新荣区"
        },
        {
          code: "140221",
          name: "阳高县"
        },
        {
          code: "140222",
          name: "天镇县"
        },
        {
          code: "140223",
          name: "广灵县"
        },
        {
          code: "140224",
          name: "灵丘县"
        },
        {
          code: "140225",
          name: "浑源县"
        },
        {
          code: "140226",
          name: "左云县"
        },
        {
          code: "140227",
          name: "大同县"
        }
      ],
      [
        {
          code: "140302",
          name: "城区"
        },
        {
          code: "140303",
          name: "矿区"
        },
        {
          code: "140311",
          name: "郊区"
        },
        {
          code: "140321",
          name: "平定县"
        },
        {
          code: "140322",
          name: "盂县"
        }
      ],
      [
        {
          code: "140402",
          name: "城区"
        },
        {
          code: "140411",
          name: "郊区"
        },
        {
          code: "140421",
          name: "长治县"
        },
        {
          code: "140423",
          name: "襄垣县"
        },
        {
          code: "140424",
          name: "屯留县"
        },
        {
          code: "140425",
          name: "平顺县"
        },
        {
          code: "140426",
          name: "黎城县"
        },
        {
          code: "140427",
          name: "壶关县"
        },
        {
          code: "140428",
          name: "长子县"
        },
        {
          code: "140429",
          name: "武乡县"
        },
        {
          code: "140430",
          name: "沁县"
        },
        {
          code: "140431",
          name: "沁源县"
        },
        {
          code: "140481",
          name: "潞城市"
        }
      ],
      [
        {
          code: "140502",
          name: "城区"
        },
        {
          code: "140521",
          name: "沁水县"
        },
        {
          code: "140522",
          name: "阳城县"
        },
        {
          code: "140524",
          name: "陵川县"
        },
        {
          code: "140525",
          name: "泽州县"
        },
        {
          code: "140581",
          name: "高平市"
        }
      ],
      [
        {
          code: "140602",
          name: "朔城区"
        },
        {
          code: "140603",
          name: "平鲁区"
        },
        {
          code: "140621",
          name: "山阴县"
        },
        {
          code: "140622",
          name: "应县"
        },
        {
          code: "140623",
          name: "右玉县"
        },
        {
          code: "140624",
          name: "怀仁县"
        }
      ],
      [
        {
          code: "140702",
          name: "榆次区"
        },
        {
          code: "140721",
          name: "榆社县"
        },
        {
          code: "140722",
          name: "左权县"
        },
        {
          code: "140723",
          name: "和顺县"
        },
        {
          code: "140724",
          name: "昔阳县"
        },
        {
          code: "140725",
          name: "寿阳县"
        },
        {
          code: "140726",
          name: "太谷县"
        },
        {
          code: "140727",
          name: "祁县"
        },
        {
          code: "140728",
          name: "平遥县"
        },
        {
          code: "140729",
          name: "灵石县"
        },
        {
          code: "140781",
          name: "介休市"
        }
      ],
      [
        {
          code: "140802",
          name: "盐湖区"
        },
        {
          code: "140821",
          name: "临猗县"
        },
        {
          code: "140822",
          name: "万荣县"
        },
        {
          code: "140823",
          name: "闻喜县"
        },
        {
          code: "140824",
          name: "稷山县"
        },
        {
          code: "140825",
          name: "新绛县"
        },
        {
          code: "140826",
          name: "绛县"
        },
        {
          code: "140827",
          name: "垣曲县"
        },
        {
          code: "140828",
          name: "夏县"
        },
        {
          code: "140829",
          name: "平陆县"
        },
        {
          code: "140830",
          name: "芮城县"
        },
        {
          code: "140881",
          name: "永济市"
        },
        {
          code: "140882",
          name: "河津市"
        }
      ],
      [
        {
          code: "140902",
          name: "忻府区"
        },
        {
          code: "140921",
          name: "定襄县"
        },
        {
          code: "140922",
          name: "五台县"
        },
        {
          code: "140923",
          name: "代县"
        },
        {
          code: "140924",
          name: "繁峙县"
        },
        {
          code: "140925",
          name: "宁武县"
        },
        {
          code: "140926",
          name: "静乐县"
        },
        {
          code: "140927",
          name: "神池县"
        },
        {
          code: "140928",
          name: "五寨县"
        },
        {
          code: "140929",
          name: "岢岚县"
        },
        {
          code: "140930",
          name: "河曲县"
        },
        {
          code: "140931",
          name: "保德县"
        },
        {
          code: "140932",
          name: "偏关县"
        },
        {
          code: "140981",
          name: "原平市"
        }
      ],
      [
        {
          code: "141002",
          name: "尧都区"
        },
        {
          code: "141021",
          name: "曲沃县"
        },
        {
          code: "141022",
          name: "翼城县"
        },
        {
          code: "141023",
          name: "襄汾县"
        },
        {
          code: "141024",
          name: "洪洞县"
        },
        {
          code: "141025",
          name: "古县"
        },
        {
          code: "141026",
          name: "安泽县"
        },
        {
          code: "141027",
          name: "浮山县"
        },
        {
          code: "141028",
          name: "吉县"
        },
        {
          code: "141029",
          name: "乡宁县"
        },
        {
          code: "141030",
          name: "大宁县"
        },
        {
          code: "141031",
          name: "隰县"
        },
        {
          code: "141032",
          name: "永和县"
        },
        {
          code: "141033",
          name: "蒲县"
        },
        {
          code: "141034",
          name: "汾西县"
        },
        {
          code: "141081",
          name: "侯马市"
        },
        {
          code: "141082",
          name: "霍州市"
        }
      ],
      [
        {
          code: "141102",
          name: "离石区"
        },
        {
          code: "141121",
          name: "文水县"
        },
        {
          code: "141122",
          name: "交城县"
        },
        {
          code: "141123",
          name: "兴县"
        },
        {
          code: "141124",
          name: "临县"
        },
        {
          code: "141125",
          name: "柳林县"
        },
        {
          code: "141126",
          name: "石楼县"
        },
        {
          code: "141127",
          name: "岚县"
        },
        {
          code: "141128",
          name: "方山县"
        },
        {
          code: "141129",
          name: "中阳县"
        },
        {
          code: "141130",
          name: "交口县"
        },
        {
          code: "141181",
          name: "孝义市"
        },
        {
          code: "141182",
          name: "汾阳市"
        }
      ]
    ],
    [
      [
        {
          code: "150102",
          name: "新城区"
        },
        {
          code: "150103",
          name: "回民区"
        },
        {
          code: "150104",
          name: "玉泉区"
        },
        {
          code: "150105",
          name: "赛罕区"
        },
        {
          code: "150121",
          name: "土默特左旗"
        },
        {
          code: "150122",
          name: "托克托县"
        },
        {
          code: "150123",
          name: "和林格尔县"
        },
        {
          code: "150124",
          name: "清水河县"
        },
        {
          code: "150125",
          name: "武川县"
        }
      ],
      [
        {
          code: "150202",
          name: "东河区"
        },
        {
          code: "150203",
          name: "昆都仑区"
        },
        {
          code: "150204",
          name: "青山区"
        },
        {
          code: "150205",
          name: "石拐区"
        },
        {
          code: "150206",
          name: "白云鄂博矿区"
        },
        {
          code: "150207",
          name: "九原区"
        },
        {
          code: "150221",
          name: "土默特右旗"
        },
        {
          code: "150222",
          name: "固阳县"
        },
        {
          code: "150223",
          name: "达尔罕茂明安联合旗"
        }
      ],
      [
        {
          code: "150302",
          name: "海勃湾区"
        },
        {
          code: "150303",
          name: "海南区"
        },
        {
          code: "150304",
          name: "乌达区"
        }
      ],
      [
        {
          code: "150402",
          name: "红山区"
        },
        {
          code: "150403",
          name: "元宝山区"
        },
        {
          code: "150404",
          name: "松山区"
        },
        {
          code: "150421",
          name: "阿鲁科尔沁旗"
        },
        {
          code: "150422",
          name: "巴林左旗"
        },
        {
          code: "150423",
          name: "巴林右旗"
        },
        {
          code: "150424",
          name: "林西县"
        },
        {
          code: "150425",
          name: "克什克腾旗"
        },
        {
          code: "150426",
          name: "翁牛特旗"
        },
        {
          code: "150428",
          name: "喀喇沁旗"
        },
        {
          code: "150429",
          name: "宁城县"
        },
        {
          code: "150430",
          name: "敖汉旗"
        }
      ],
      [
        {
          code: "150502",
          name: "科尔沁区"
        },
        {
          code: "150521",
          name: "科尔沁左翼中旗"
        },
        {
          code: "150522",
          name: "科尔沁左翼后旗"
        },
        {
          code: "150523",
          name: "开鲁县"
        },
        {
          code: "150524",
          name: "库伦旗"
        },
        {
          code: "150525",
          name: "奈曼旗"
        },
        {
          code: "150526",
          name: "扎鲁特旗"
        },
        {
          code: "150581",
          name: "霍林郭勒市"
        }
      ],
      [
        {
          code: "150602",
          name: "东胜区"
        },
        {
          code: "150603",
          name: "康巴什区"
        },
        {
          code: "150621",
          name: "达拉特旗"
        },
        {
          code: "150622",
          name: "准格尔旗"
        },
        {
          code: "150623",
          name: "鄂托克前旗"
        },
        {
          code: "150624",
          name: "鄂托克旗"
        },
        {
          code: "150625",
          name: "杭锦旗"
        },
        {
          code: "150626",
          name: "乌审旗"
        },
        {
          code: "150627",
          name: "伊金霍洛旗"
        }
      ],
      [
        {
          code: "150702",
          name: "海拉尔区"
        },
        {
          code: "150703",
          name: "扎赉诺尔区"
        },
        {
          code: "150721",
          name: "阿荣旗"
        },
        {
          code: "150722",
          name: "莫力达瓦达斡尔族自治旗"
        },
        {
          code: "150723",
          name: "鄂伦春自治旗"
        },
        {
          code: "150724",
          name: "鄂温克族自治旗"
        },
        {
          code: "150725",
          name: "陈巴尔虎旗"
        },
        {
          code: "150726",
          name: "新巴尔虎左旗"
        },
        {
          code: "150727",
          name: "新巴尔虎右旗"
        },
        {
          code: "150781",
          name: "满洲里市"
        },
        {
          code: "150782",
          name: "牙克石市"
        },
        {
          code: "150783",
          name: "扎兰屯市"
        },
        {
          code: "150784",
          name: "额尔古纳市"
        },
        {
          code: "150785",
          name: "根河市"
        }
      ],
      [
        {
          code: "150802",
          name: "临河区"
        },
        {
          code: "150821",
          name: "五原县"
        },
        {
          code: "150822",
          name: "磴口县"
        },
        {
          code: "150823",
          name: "乌拉特前旗"
        },
        {
          code: "150824",
          name: "乌拉特中旗"
        },
        {
          code: "150825",
          name: "乌拉特后旗"
        },
        {
          code: "150826",
          name: "杭锦后旗"
        }
      ],
      [
        {
          code: "150902",
          name: "集宁区"
        },
        {
          code: "150921",
          name: "卓资县"
        },
        {
          code: "150922",
          name: "化德县"
        },
        {
          code: "150923",
          name: "商都县"
        },
        {
          code: "150924",
          name: "兴和县"
        },
        {
          code: "150925",
          name: "凉城县"
        },
        {
          code: "150926",
          name: "察哈尔右翼前旗"
        },
        {
          code: "150927",
          name: "察哈尔右翼中旗"
        },
        {
          code: "150928",
          name: "察哈尔右翼后旗"
        },
        {
          code: "150929",
          name: "四子王旗"
        },
        {
          code: "150981",
          name: "丰镇市"
        }
      ],
      [
        {
          code: "152201",
          name: "乌兰浩特市"
        },
        {
          code: "152202",
          name: "阿尔山市"
        },
        {
          code: "152221",
          name: "科尔沁右翼前旗"
        },
        {
          code: "152222",
          name: "科尔沁右翼中旗"
        },
        {
          code: "152223",
          name: "扎赉特旗"
        },
        {
          code: "152224",
          name: "突泉县"
        }
      ],
      [
        {
          code: "152501",
          name: "二连浩特市"
        },
        {
          code: "152502",
          name: "锡林浩特市"
        },
        {
          code: "152522",
          name: "阿巴嘎旗"
        },
        {
          code: "152523",
          name: "苏尼特左旗"
        },
        {
          code: "152524",
          name: "苏尼特右旗"
        },
        {
          code: "152525",
          name: "东乌珠穆沁旗"
        },
        {
          code: "152526",
          name: "西乌珠穆沁旗"
        },
        {
          code: "152527",
          name: "太仆寺旗"
        },
        {
          code: "152528",
          name: "镶黄旗"
        },
        {
          code: "152529",
          name: "正镶白旗"
        },
        {
          code: "152530",
          name: "正蓝旗"
        },
        {
          code: "152531",
          name: "多伦县"
        }
      ],
      [
        {
          code: "152921",
          name: "阿拉善左旗"
        },
        {
          code: "152922",
          name: "阿拉善右旗"
        },
        {
          code: "152923",
          name: "额济纳旗"
        }
      ]
    ],
    [
      [
        {
          code: "210102",
          name: "和平区"
        },
        {
          code: "210103",
          name: "沈河区"
        },
        {
          code: "210104",
          name: "大东区"
        },
        {
          code: "210105",
          name: "皇姑区"
        },
        {
          code: "210106",
          name: "铁西区"
        },
        {
          code: "210111",
          name: "苏家屯区"
        },
        {
          code: "210112",
          name: "浑南区"
        },
        {
          code: "210113",
          name: "沈北新区"
        },
        {
          code: "210114",
          name: "于洪区"
        },
        {
          code: "210115",
          name: "辽中区"
        },
        {
          code: "210123",
          name: "康平县"
        },
        {
          code: "210124",
          name: "法库县"
        },
        {
          code: "210181",
          name: "新民市"
        }
      ],
      [
        {
          code: "210202",
          name: "中山区"
        },
        {
          code: "210203",
          name: "西岗区"
        },
        {
          code: "210204",
          name: "沙河口区"
        },
        {
          code: "210211",
          name: "甘井子区"
        },
        {
          code: "210212",
          name: "旅顺口区"
        },
        {
          code: "210213",
          name: "金州区"
        },
        {
          code: "210214",
          name: "普兰店区"
        },
        {
          code: "210224",
          name: "长海县"
        },
        {
          code: "210281",
          name: "瓦房店市"
        },
        {
          code: "210283",
          name: "庄河市"
        }
      ],
      [
        {
          code: "210302",
          name: "铁东区"
        },
        {
          code: "210303",
          name: "铁西区"
        },
        {
          code: "210304",
          name: "立山区"
        },
        {
          code: "210311",
          name: "千山区"
        },
        {
          code: "210321",
          name: "台安县"
        },
        {
          code: "210323",
          name: "岫岩满族自治县"
        },
        {
          code: "210381",
          name: "海城市"
        }
      ],
      [
        {
          code: "210402",
          name: "新抚区"
        },
        {
          code: "210403",
          name: "东洲区"
        },
        {
          code: "210404",
          name: "望花区"
        },
        {
          code: "210411",
          name: "顺城区"
        },
        {
          code: "210421",
          name: "抚顺县"
        },
        {
          code: "210422",
          name: "新宾满族自治县"
        },
        {
          code: "210423",
          name: "清原满族自治县"
        }
      ],
      [
        {
          code: "210502",
          name: "平山区"
        },
        {
          code: "210503",
          name: "溪湖区"
        },
        {
          code: "210504",
          name: "明山区"
        },
        {
          code: "210505",
          name: "南芬区"
        },
        {
          code: "210521",
          name: "本溪满族自治县"
        },
        {
          code: "210522",
          name: "桓仁满族自治县"
        }
      ],
      [
        {
          code: "210602",
          name: "元宝区"
        },
        {
          code: "210603",
          name: "振兴区"
        },
        {
          code: "210604",
          name: "振安区"
        },
        {
          code: "210624",
          name: "宽甸满族自治县"
        },
        {
          code: "210681",
          name: "东港市"
        },
        {
          code: "210682",
          name: "凤城市"
        }
      ],
      [
        {
          code: "210702",
          name: "古塔区"
        },
        {
          code: "210703",
          name: "凌河区"
        },
        {
          code: "210711",
          name: "太和区"
        },
        {
          code: "210726",
          name: "黑山县"
        },
        {
          code: "210727",
          name: "义县"
        },
        {
          code: "210781",
          name: "凌海市"
        },
        {
          code: "210782",
          name: "北镇市"
        }
      ],
      [
        {
          code: "210802",
          name: "站前区"
        },
        {
          code: "210803",
          name: "西市区"
        },
        {
          code: "210804",
          name: "鲅鱼圈区"
        },
        {
          code: "210811",
          name: "老边区"
        },
        {
          code: "210881",
          name: "盖州市"
        },
        {
          code: "210882",
          name: "大石桥市"
        }
      ],
      [
        {
          code: "210902",
          name: "海州区"
        },
        {
          code: "210903",
          name: "新邱区"
        },
        {
          code: "210904",
          name: "太平区"
        },
        {
          code: "210905",
          name: "清河门区"
        },
        {
          code: "210911",
          name: "细河区"
        },
        {
          code: "210921",
          name: "阜新蒙古族自治县"
        },
        {
          code: "210922",
          name: "彰武县"
        }
      ],
      [
        {
          code: "211002",
          name: "白塔区"
        },
        {
          code: "211003",
          name: "文圣区"
        },
        {
          code: "211004",
          name: "宏伟区"
        },
        {
          code: "211005",
          name: "弓长岭区"
        },
        {
          code: "211011",
          name: "太子河区"
        },
        {
          code: "211021",
          name: "辽阳县"
        },
        {
          code: "211081",
          name: "灯塔市"
        }
      ],
      [
        {
          code: "211102",
          name: "双台子区"
        },
        {
          code: "211103",
          name: "兴隆台区"
        },
        {
          code: "211104",
          name: "大洼区"
        },
        {
          code: "211122",
          name: "盘山县"
        }
      ],
      [
        {
          code: "211202",
          name: "银州区"
        },
        {
          code: "211204",
          name: "清河区"
        },
        {
          code: "211221",
          name: "铁岭县"
        },
        {
          code: "211223",
          name: "西丰县"
        },
        {
          code: "211224",
          name: "昌图县"
        },
        {
          code: "211281",
          name: "调兵山市"
        },
        {
          code: "211282",
          name: "开原市"
        }
      ],
      [
        {
          code: "211302",
          name: "双塔区"
        },
        {
          code: "211303",
          name: "龙城区"
        },
        {
          code: "211321",
          name: "朝阳县"
        },
        {
          code: "211322",
          name: "建平县"
        },
        {
          code: "211324",
          name: "喀喇沁左翼蒙古族自治县"
        },
        {
          code: "211381",
          name: "北票市"
        },
        {
          code: "211382",
          name: "凌源市"
        }
      ],
      [
        {
          code: "211402",
          name: "连山区"
        },
        {
          code: "211403",
          name: "龙港区"
        },
        {
          code: "211404",
          name: "南票区"
        },
        {
          code: "211421",
          name: "绥中县"
        },
        {
          code: "211422",
          name: "建昌县"
        },
        {
          code: "211481",
          name: "兴城市"
        }
      ]
    ],
    [
      [
        {
          code: "220102",
          name: "南关区"
        },
        {
          code: "220103",
          name: "宽城区"
        },
        {
          code: "220104",
          name: "朝阳区"
        },
        {
          code: "220105",
          name: "二道区"
        },
        {
          code: "220106",
          name: "绿园区"
        },
        {
          code: "220112",
          name: "双阳区"
        },
        {
          code: "220113",
          name: "九台区"
        },
        {
          code: "220122",
          name: "农安县"
        },
        {
          code: "220182",
          name: "榆树市"
        },
        {
          code: "220183",
          name: "德惠市"
        }
      ],
      [
        {
          code: "220202",
          name: "昌邑区"
        },
        {
          code: "220203",
          name: "龙潭区"
        },
        {
          code: "220204",
          name: "船营区"
        },
        {
          code: "220211",
          name: "丰满区"
        },
        {
          code: "220221",
          name: "永吉县"
        },
        {
          code: "220281",
          name: "蛟河市"
        },
        {
          code: "220282",
          name: "桦甸市"
        },
        {
          code: "220283",
          name: "舒兰市"
        },
        {
          code: "220284",
          name: "磐石市"
        }
      ],
      [
        {
          code: "220302",
          name: "铁西区"
        },
        {
          code: "220303",
          name: "铁东区"
        },
        {
          code: "220322",
          name: "梨树县"
        },
        {
          code: "220323",
          name: "伊通满族自治县"
        },
        {
          code: "220381",
          name: "公主岭市"
        },
        {
          code: "220382",
          name: "双辽市"
        }
      ],
      [
        {
          code: "220402",
          name: "龙山区"
        },
        {
          code: "220403",
          name: "西安区"
        },
        {
          code: "220421",
          name: "东丰县"
        },
        {
          code: "220422",
          name: "东辽县"
        }
      ],
      [
        {
          code: "220502",
          name: "东昌区"
        },
        {
          code: "220503",
          name: "二道江区"
        },
        {
          code: "220521",
          name: "通化县"
        },
        {
          code: "220523",
          name: "辉南县"
        },
        {
          code: "220524",
          name: "柳河县"
        },
        {
          code: "220581",
          name: "梅河口市"
        },
        {
          code: "220582",
          name: "集安市"
        }
      ],
      [
        {
          code: "220602",
          name: "浑江区"
        },
        {
          code: "220605",
          name: "江源区"
        },
        {
          code: "220621",
          name: "抚松县"
        },
        {
          code: "220622",
          name: "靖宇县"
        },
        {
          code: "220623",
          name: "长白朝鲜族自治县"
        },
        {
          code: "220681",
          name: "临江市"
        }
      ],
      [
        {
          code: "220702",
          name: "宁江区"
        },
        {
          code: "220721",
          name: "前郭尔罗斯蒙古族自治县"
        },
        {
          code: "220722",
          name: "长岭县"
        },
        {
          code: "220723",
          name: "乾安县"
        },
        {
          code: "220781",
          name: "扶余市"
        }
      ],
      [
        {
          code: "220802",
          name: "洮北区"
        },
        {
          code: "220821",
          name: "镇赉县"
        },
        {
          code: "220822",
          name: "通榆县"
        },
        {
          code: "220881",
          name: "洮南市"
        },
        {
          code: "220882",
          name: "大安市"
        }
      ],
      [
        {
          code: "222401",
          name: "延吉市"
        },
        {
          code: "222402",
          name: "图们市"
        },
        {
          code: "222403",
          name: "敦化市"
        },
        {
          code: "222404",
          name: "珲春市"
        },
        {
          code: "222405",
          name: "龙井市"
        },
        {
          code: "222406",
          name: "和龙市"
        },
        {
          code: "222424",
          name: "汪清县"
        },
        {
          code: "222426",
          name: "安图县"
        }
      ]
    ],
    [
      [
        {
          code: "230102",
          name: "道里区"
        },
        {
          code: "230103",
          name: "南岗区"
        },
        {
          code: "230104",
          name: "道外区"
        },
        {
          code: "230108",
          name: "平房区"
        },
        {
          code: "230109",
          name: "松北区"
        },
        {
          code: "230110",
          name: "香坊区"
        },
        {
          code: "230111",
          name: "呼兰区"
        },
        {
          code: "230112",
          name: "阿城区"
        },
        {
          code: "230113",
          name: "双城区"
        },
        {
          code: "230123",
          name: "依兰县"
        },
        {
          code: "230124",
          name: "方正县"
        },
        {
          code: "230125",
          name: "宾县"
        },
        {
          code: "230126",
          name: "巴彦县"
        },
        {
          code: "230127",
          name: "木兰县"
        },
        {
          code: "230128",
          name: "通河县"
        },
        {
          code: "230129",
          name: "延寿县"
        },
        {
          code: "230183",
          name: "尚志市"
        },
        {
          code: "230184",
          name: "五常市"
        }
      ],
      [
        {
          code: "230202",
          name: "龙沙区"
        },
        {
          code: "230203",
          name: "建华区"
        },
        {
          code: "230204",
          name: "铁锋区"
        },
        {
          code: "230205",
          name: "昂昂溪区"
        },
        {
          code: "230206",
          name: "富拉尔基区"
        },
        {
          code: "230207",
          name: "碾子山区"
        },
        {
          code: "230208",
          name: "梅里斯达斡尔族区"
        },
        {
          code: "230221",
          name: "龙江县"
        },
        {
          code: "230223",
          name: "依安县"
        },
        {
          code: "230224",
          name: "泰来县"
        },
        {
          code: "230225",
          name: "甘南县"
        },
        {
          code: "230227",
          name: "富裕县"
        },
        {
          code: "230229",
          name: "克山县"
        },
        {
          code: "230230",
          name: "克东县"
        },
        {
          code: "230231",
          name: "拜泉县"
        },
        {
          code: "230281",
          name: "讷河市"
        }
      ],
      [
        {
          code: "230302",
          name: "鸡冠区"
        },
        {
          code: "230303",
          name: "恒山区"
        },
        {
          code: "230304",
          name: "滴道区"
        },
        {
          code: "230305",
          name: "梨树区"
        },
        {
          code: "230306",
          name: "城子河区"
        },
        {
          code: "230307",
          name: "麻山区"
        },
        {
          code: "230321",
          name: "鸡东县"
        },
        {
          code: "230381",
          name: "虎林市"
        },
        {
          code: "230382",
          name: "密山市"
        }
      ],
      [
        {
          code: "230402",
          name: "向阳区"
        },
        {
          code: "230403",
          name: "工农区"
        },
        {
          code: "230404",
          name: "南山区"
        },
        {
          code: "230405",
          name: "兴安区"
        },
        {
          code: "230406",
          name: "东山区"
        },
        {
          code: "230407",
          name: "兴山区"
        },
        {
          code: "230421",
          name: "萝北县"
        },
        {
          code: "230422",
          name: "绥滨县"
        }
      ],
      [
        {
          code: "230502",
          name: "尖山区"
        },
        {
          code: "230503",
          name: "岭东区"
        },
        {
          code: "230505",
          name: "四方台区"
        },
        {
          code: "230506",
          name: "宝山区"
        },
        {
          code: "230521",
          name: "集贤县"
        },
        {
          code: "230522",
          name: "友谊县"
        },
        {
          code: "230523",
          name: "宝清县"
        },
        {
          code: "230524",
          name: "饶河县"
        }
      ],
      [
        {
          code: "230602",
          name: "萨尔图区"
        },
        {
          code: "230603",
          name: "龙凤区"
        },
        {
          code: "230604",
          name: "让胡路区"
        },
        {
          code: "230605",
          name: "红岗区"
        },
        {
          code: "230606",
          name: "大同区"
        },
        {
          code: "230621",
          name: "肇州县"
        },
        {
          code: "230622",
          name: "肇源县"
        },
        {
          code: "230623",
          name: "林甸县"
        },
        {
          code: "230624",
          name: "杜尔伯特蒙古族自治县"
        }
      ],
      [
        {
          code: "230702",
          name: "伊春区"
        },
        {
          code: "230703",
          name: "南岔区"
        },
        {
          code: "230704",
          name: "友好区"
        },
        {
          code: "230705",
          name: "西林区"
        },
        {
          code: "230706",
          name: "翠峦区"
        },
        {
          code: "230707",
          name: "新青区"
        },
        {
          code: "230708",
          name: "美溪区"
        },
        {
          code: "230709",
          name: "金山屯区"
        },
        {
          code: "230710",
          name: "五营区"
        },
        {
          code: "230711",
          name: "乌马河区"
        },
        {
          code: "230712",
          name: "汤旺河区"
        },
        {
          code: "230713",
          name: "带岭区"
        },
        {
          code: "230714",
          name: "乌伊岭区"
        },
        {
          code: "230715",
          name: "红星区"
        },
        {
          code: "230716",
          name: "上甘岭区"
        },
        {
          code: "230722",
          name: "嘉荫县"
        },
        {
          code: "230781",
          name: "铁力市"
        }
      ],
      [
        {
          code: "230803",
          name: "向阳区"
        },
        {
          code: "230804",
          name: "前进区"
        },
        {
          code: "230805",
          name: "东风区"
        },
        {
          code: "230811",
          name: "郊区"
        },
        {
          code: "230822",
          name: "桦南县"
        },
        {
          code: "230826",
          name: "桦川县"
        },
        {
          code: "230828",
          name: "汤原县"
        },
        {
          code: "230881",
          name: "同江市"
        },
        {
          code: "230882",
          name: "富锦市"
        },
        {
          code: "230883",
          name: "抚远市"
        }
      ],
      [
        {
          code: "230902",
          name: "新兴区"
        },
        {
          code: "230903",
          name: "桃山区"
        },
        {
          code: "230904",
          name: "茄子河区"
        },
        {
          code: "230921",
          name: "勃利县"
        }
      ],
      [
        {
          code: "231002",
          name: "东安区"
        },
        {
          code: "231003",
          name: "阳明区"
        },
        {
          code: "231004",
          name: "爱民区"
        },
        {
          code: "231005",
          name: "西安区"
        },
        {
          code: "231025",
          name: "林口县"
        },
        {
          code: "231081",
          name: "绥芬河市"
        },
        {
          code: "231083",
          name: "海林市"
        },
        {
          code: "231084",
          name: "宁安市"
        },
        {
          code: "231085",
          name: "穆棱市"
        },
        {
          code: "231086",
          name: "东宁市"
        }
      ],
      [
        {
          code: "231102",
          name: "爱辉区"
        },
        {
          code: "231121",
          name: "嫩江县"
        },
        {
          code: "231123",
          name: "逊克县"
        },
        {
          code: "231124",
          name: "孙吴县"
        },
        {
          code: "231181",
          name: "北安市"
        },
        {
          code: "231182",
          name: "五大连池市"
        }
      ],
      [
        {
          code: "231202",
          name: "北林区"
        },
        {
          code: "231221",
          name: "望奎县"
        },
        {
          code: "231222",
          name: "兰西县"
        },
        {
          code: "231223",
          name: "青冈县"
        },
        {
          code: "231224",
          name: "庆安县"
        },
        {
          code: "231225",
          name: "明水县"
        },
        {
          code: "231226",
          name: "绥棱县"
        },
        {
          code: "231281",
          name: "安达市"
        },
        {
          code: "231282",
          name: "肇东市"
        },
        {
          code: "231283",
          name: "海伦市"
        }
      ],
      [
        {
          code: "232701",
          name: "加格达奇区"
        },
        {
          code: "232702",
          name: "松岭区"
        },
        {
          code: "232703",
          name: "新林区"
        },
        {
          code: "232704",
          name: "呼中区"
        },
        {
          code: "232721",
          name: "呼玛县"
        },
        {
          code: "232722",
          name: "塔河县"
        },
        {
          code: "232723",
          name: "漠河县"
        }
      ]
    ],
    [
      [
        {
          code: "310101",
          name: "黄浦区"
        },
        {
          code: "310104",
          name: "徐汇区"
        },
        {
          code: "310105",
          name: "长宁区"
        },
        {
          code: "310106",
          name: "静安区"
        },
        {
          code: "310107",
          name: "普陀区"
        },
        {
          code: "310109",
          name: "虹口区"
        },
        {
          code: "310110",
          name: "杨浦区"
        },
        {
          code: "310112",
          name: "闵行区"
        },
        {
          code: "310113",
          name: "宝山区"
        },
        {
          code: "310114",
          name: "嘉定区"
        },
        {
          code: "310115",
          name: "浦东新区"
        },
        {
          code: "310116",
          name: "金山区"
        },
        {
          code: "310117",
          name: "松江区"
        },
        {
          code: "310118",
          name: "青浦区"
        },
        {
          code: "310120",
          name: "奉贤区"
        },
        {
          code: "310151",
          name: "崇明区"
        }
      ]
    ],
    [
      [
        {
          code: "320102",
          name: "玄武区"
        },
        {
          code: "320104",
          name: "秦淮区"
        },
        {
          code: "320105",
          name: "建邺区"
        },
        {
          code: "320106",
          name: "鼓楼区"
        },
        {
          code: "320111",
          name: "浦口区"
        },
        {
          code: "320113",
          name: "栖霞区"
        },
        {
          code: "320114",
          name: "雨花台区"
        },
        {
          code: "320115",
          name: "江宁区"
        },
        {
          code: "320116",
          name: "六合区"
        },
        {
          code: "320117",
          name: "溧水区"
        },
        {
          code: "320118",
          name: "高淳区"
        }
      ],
      [
        {
          code: "320205",
          name: "锡山区"
        },
        {
          code: "320206",
          name: "惠山区"
        },
        {
          code: "320211",
          name: "滨湖区"
        },
        {
          code: "320213",
          name: "梁溪区"
        },
        {
          code: "320214",
          name: "新吴区"
        },
        {
          code: "320281",
          name: "江阴市"
        },
        {
          code: "320282",
          name: "宜兴市"
        }
      ],
      [
        {
          code: "320302",
          name: "鼓楼区"
        },
        {
          code: "320303",
          name: "云龙区"
        },
        {
          code: "320305",
          name: "贾汪区"
        },
        {
          code: "320311",
          name: "泉山区"
        },
        {
          code: "320312",
          name: "铜山区"
        },
        {
          code: "320321",
          name: "丰县"
        },
        {
          code: "320322",
          name: "沛县"
        },
        {
          code: "320324",
          name: "睢宁县"
        },
        {
          code: "320381",
          name: "新沂市"
        },
        {
          code: "320382",
          name: "邳州市"
        }
      ],
      [
        {
          code: "320402",
          name: "天宁区"
        },
        {
          code: "320404",
          name: "钟楼区"
        },
        {
          code: "320411",
          name: "新北区"
        },
        {
          code: "320412",
          name: "武进区"
        },
        {
          code: "320413",
          name: "金坛区"
        },
        {
          code: "320481",
          name: "溧阳市"
        }
      ],
      [
        {
          code: "320505",
          name: "虎丘区"
        },
        {
          code: "320506",
          name: "吴中区"
        },
        {
          code: "320507",
          name: "相城区"
        },
        {
          code: "320508",
          name: "姑苏区"
        },
        {
          code: "320509",
          name: "吴江区"
        },
        {
          code: "320581",
          name: "常熟市"
        },
        {
          code: "320582",
          name: "张家港市"
        },
        {
          code: "320583",
          name: "昆山市"
        },
        {
          code: "320585",
          name: "太仓市"
        }
      ],
      [
        {
          code: "320602",
          name: "崇川区"
        },
        {
          code: "320611",
          name: "港闸区"
        },
        {
          code: "320612",
          name: "通州区"
        },
        {
          code: "320621",
          name: "海安县"
        },
        {
          code: "320623",
          name: "如东县"
        },
        {
          code: "320681",
          name: "启东市"
        },
        {
          code: "320682",
          name: "如皋市"
        },
        {
          code: "320684",
          name: "海门市"
        }
      ],
      [
        {
          code: "320703",
          name: "连云区"
        },
        {
          code: "320706",
          name: "海州区"
        },
        {
          code: "320707",
          name: "赣榆区"
        },
        {
          code: "320722",
          name: "东海县"
        },
        {
          code: "320723",
          name: "灌云县"
        },
        {
          code: "320724",
          name: "灌南县"
        }
      ],
      [
        {
          code: "320803",
          name: "淮安区"
        },
        {
          code: "320804",
          name: "淮阴区"
        },
        {
          code: "320812",
          name: "清江浦区"
        },
        {
          code: "320813",
          name: "洪泽区"
        },
        {
          code: "320826",
          name: "涟水县"
        },
        {
          code: "320830",
          name: "盱眙县"
        },
        {
          code: "320831",
          name: "金湖县"
        }
      ],
      [
        {
          code: "320902",
          name: "亭湖区"
        },
        {
          code: "320903",
          name: "盐都区"
        },
        {
          code: "320904",
          name: "大丰区"
        },
        {
          code: "320921",
          name: "响水县"
        },
        {
          code: "320922",
          name: "滨海县"
        },
        {
          code: "320923",
          name: "阜宁县"
        },
        {
          code: "320924",
          name: "射阳县"
        },
        {
          code: "320925",
          name: "建湖县"
        },
        {
          code: "320981",
          name: "东台市"
        }
      ],
      [
        {
          code: "321002",
          name: "广陵区"
        },
        {
          code: "321003",
          name: "邗江区"
        },
        {
          code: "321012",
          name: "江都区"
        },
        {
          code: "321023",
          name: "宝应县"
        },
        {
          code: "321081",
          name: "仪征市"
        },
        {
          code: "321084",
          name: "高邮市"
        }
      ],
      [
        {
          code: "321102",
          name: "京口区"
        },
        {
          code: "321111",
          name: "润州区"
        },
        {
          code: "321112",
          name: "丹徒区"
        },
        {
          code: "321181",
          name: "丹阳市"
        },
        {
          code: "321182",
          name: "扬中市"
        },
        {
          code: "321183",
          name: "句容市"
        }
      ],
      [
        {
          code: "321202",
          name: "海陵区"
        },
        {
          code: "321203",
          name: "高港区"
        },
        {
          code: "321204",
          name: "姜堰区"
        },
        {
          code: "321281",
          name: "兴化市"
        },
        {
          code: "321282",
          name: "靖江市"
        },
        {
          code: "321283",
          name: "泰兴市"
        }
      ],
      [
        {
          code: "321302",
          name: "宿城区"
        },
        {
          code: "321311",
          name: "宿豫区"
        },
        {
          code: "321322",
          name: "沭阳县"
        },
        {
          code: "321323",
          name: "泗阳县"
        },
        {
          code: "321324",
          name: "泗洪县"
        }
      ]
    ],
    [
      [
        {
          code: "330102",
          name: "上城区"
        },
        {
          code: "330105",
          name: "拱墅区"
        },
        {
          code: "330106",
          name: "西湖区"
        },
        {
          code: "330108",
          name: "滨江区"
        },
        {
          code: "330109",
          name: "萧山区"
        },
        {
          code: "330110",
          name: "余杭区"
        },
        {
          code: "330111",
          name: "富阳区"
        },
        {
          code: "330112",
          name: "临安区"
        },
        {
          code: "330113",
          name: "临平区"
        },
        {
          code: "330114",
          name: "钱塘区"
        },
        {
          code: "330122",
          name: "桐庐县"
        },
        {
          code: "330127",
          name: "淳安县"
        },
        {
          code: "330182",
          name: "建德市"
        }
      ],
      [
        {
          code: "330203",
          name: "海曙区"
        },
        {
          code: "330205",
          name: "江北区"
        },
        {
          code: "330206",
          name: "北仑区"
        },
        {
          code: "330211",
          name: "镇海区"
        },
        {
          code: "330212",
          name: "鄞州区"
        },
        {
          code: "330213",
          name: "奉化区"
        },
        {
          code: "330225",
          name: "象山县"
        },
        {
          code: "330226",
          name: "宁海县"
        },
        {
          code: "330281",
          name: "余姚市"
        },
        {
          code: "330282",
          name: "慈溪市"
        }
      ],
      [
        {
          code: "330302",
          name: "鹿城区"
        },
        {
          code: "330303",
          name: "龙湾区"
        },
        {
          code: "330304",
          name: "瓯海区"
        },
        {
          code: "330305",
          name: "洞头区"
        },
        {
          code: "330324",
          name: "永嘉县"
        },
        {
          code: "330326",
          name: "平阳县"
        },
        {
          code: "330327",
          name: "苍南县"
        },
        {
          code: "330328",
          name: "文成县"
        },
        {
          code: "330329",
          name: "泰顺县"
        },
        {
          code: "330381",
          name: "瑞安市"
        },
        {
          code: "330382",
          name: "乐清市"
        }
      ],
      [
        {
          code: "330402",
          name: "南湖区"
        },
        {
          code: "330411",
          name: "秀洲区"
        },
        {
          code: "330421",
          name: "嘉善县"
        },
        {
          code: "330424",
          name: "海盐县"
        },
        {
          code: "330481",
          name: "海宁市"
        },
        {
          code: "330482",
          name: "平湖市"
        },
        {
          code: "330483",
          name: "桐乡市"
        }
      ],
      [
        {
          code: "330502",
          name: "吴兴区"
        },
        {
          code: "330503",
          name: "南浔区"
        },
        {
          code: "330521",
          name: "德清县"
        },
        {
          code: "330522",
          name: "长兴县"
        },
        {
          code: "330523",
          name: "安吉县"
        }
      ],
      [
        {
          code: "330602",
          name: "越城区"
        },
        {
          code: "330603",
          name: "柯桥区"
        },
        {
          code: "330604",
          name: "上虞区"
        },
        {
          code: "330624",
          name: "新昌县"
        },
        {
          code: "330681",
          name: "诸暨市"
        },
        {
          code: "330683",
          name: "嵊州市"
        }
      ],
      [
        {
          code: "330702",
          name: "婺城区"
        },
        {
          code: "330703",
          name: "金东区"
        },
        {
          code: "330723",
          name: "武义县"
        },
        {
          code: "330726",
          name: "浦江县"
        },
        {
          code: "330727",
          name: "磐安县"
        },
        {
          code: "330781",
          name: "兰溪市"
        },
        {
          code: "330782",
          name: "义乌市"
        },
        {
          code: "330783",
          name: "东阳市"
        },
        {
          code: "330784",
          name: "永康市"
        }
      ],
      [
        {
          code: "330802",
          name: "柯城区"
        },
        {
          code: "330803",
          name: "衢江区"
        },
        {
          code: "330822",
          name: "常山县"
        },
        {
          code: "330824",
          name: "开化县"
        },
        {
          code: "330825",
          name: "龙游县"
        },
        {
          code: "330881",
          name: "江山市"
        }
      ],
      [
        {
          code: "330902",
          name: "定海区"
        },
        {
          code: "330903",
          name: "普陀区"
        },
        {
          code: "330921",
          name: "岱山县"
        },
        {
          code: "330922",
          name: "嵊泗县"
        }
      ],
      [
        {
          code: "331002",
          name: "椒江区"
        },
        {
          code: "331003",
          name: "黄岩区"
        },
        {
          code: "331004",
          name: "路桥区"
        },
        {
          code: "331022",
          name: "三门县"
        },
        {
          code: "331023",
          name: "天台县"
        },
        {
          code: "331024",
          name: "仙居县"
        },
        {
          code: "331081",
          name: "温岭市"
        },
        {
          code: "331082",
          name: "临海市"
        },
        {
          code: "331083",
          name: "玉环市"
        }
      ],
      [
        {
          code: "331102",
          name: "莲都区"
        },
        {
          code: "331121",
          name: "青田县"
        },
        {
          code: "331122",
          name: "缙云县"
        },
        {
          code: "331123",
          name: "遂昌县"
        },
        {
          code: "331124",
          name: "松阳县"
        },
        {
          code: "331125",
          name: "云和县"
        },
        {
          code: "331126",
          name: "庆元县"
        },
        {
          code: "331127",
          name: "景宁畲族自治县"
        },
        {
          code: "331181",
          name: "龙泉市"
        }
      ]
    ],
    [
      [
        {
          code: "340102",
          name: "瑶海区"
        },
        {
          code: "340103",
          name: "庐阳区"
        },
        {
          code: "340104",
          name: "蜀山区"
        },
        {
          code: "340111",
          name: "包河区"
        },
        {
          code: "340121",
          name: "长丰县"
        },
        {
          code: "340122",
          name: "肥东县"
        },
        {
          code: "340123",
          name: "肥西县"
        },
        {
          code: "340124",
          name: "庐江县"
        },
        {
          code: "340181",
          name: "巢湖市"
        }
      ],
      [
        {
          code: "340202",
          name: "镜湖区"
        },
        {
          code: "340203",
          name: "弋江区"
        },
        {
          code: "340207",
          name: "鸠江区"
        },
        {
          code: "340208",
          name: "三山区"
        },
        {
          code: "340221",
          name: "芜湖县"
        },
        {
          code: "340222",
          name: "繁昌县"
        },
        {
          code: "340223",
          name: "南陵县"
        },
        {
          code: "340225",
          name: "无为县"
        }
      ],
      [
        {
          code: "340302",
          name: "龙子湖区"
        },
        {
          code: "340303",
          name: "蚌山区"
        },
        {
          code: "340304",
          name: "禹会区"
        },
        {
          code: "340311",
          name: "淮上区"
        },
        {
          code: "340321",
          name: "怀远县"
        },
        {
          code: "340322",
          name: "五河县"
        },
        {
          code: "340323",
          name: "固镇县"
        }
      ],
      [
        {
          code: "340402",
          name: "大通区"
        },
        {
          code: "340403",
          name: "田家庵区"
        },
        {
          code: "340404",
          name: "谢家集区"
        },
        {
          code: "340405",
          name: "八公山区"
        },
        {
          code: "340406",
          name: "潘集区"
        },
        {
          code: "340421",
          name: "凤台县"
        },
        {
          code: "340422",
          name: "寿县"
        }
      ],
      [
        {
          code: "340503",
          name: "花山区"
        },
        {
          code: "340504",
          name: "雨山区"
        },
        {
          code: "340506",
          name: "博望区"
        },
        {
          code: "340521",
          name: "当涂县"
        },
        {
          code: "340522",
          name: "含山县"
        },
        {
          code: "340523",
          name: "和县"
        }
      ],
      [
        {
          code: "340602",
          name: "杜集区"
        },
        {
          code: "340603",
          name: "相山区"
        },
        {
          code: "340604",
          name: "烈山区"
        },
        {
          code: "340621",
          name: "濉溪县"
        }
      ],
      [
        {
          code: "340705",
          name: "铜官区"
        },
        {
          code: "340706",
          name: "义安区"
        },
        {
          code: "340711",
          name: "郊区"
        },
        {
          code: "340722",
          name: "枞阳县"
        }
      ],
      [
        {
          code: "340802",
          name: "迎江区"
        },
        {
          code: "340803",
          name: "大观区"
        },
        {
          code: "340811",
          name: "宜秀区"
        },
        {
          code: "340822",
          name: "怀宁县"
        },
        {
          code: "340824",
          name: "潜山县"
        },
        {
          code: "340825",
          name: "太湖县"
        },
        {
          code: "340826",
          name: "宿松县"
        },
        {
          code: "340827",
          name: "望江县"
        },
        {
          code: "340828",
          name: "岳西县"
        },
        {
          code: "340881",
          name: "桐城市"
        }
      ],
      [
        {
          code: "341002",
          name: "屯溪区"
        },
        {
          code: "341003",
          name: "黄山区"
        },
        {
          code: "341004",
          name: "徽州区"
        },
        {
          code: "341021",
          name: "歙县"
        },
        {
          code: "341022",
          name: "休宁县"
        },
        {
          code: "341023",
          name: "黟县"
        },
        {
          code: "341024",
          name: "祁门县"
        }
      ],
      [
        {
          code: "341102",
          name: "琅琊区"
        },
        {
          code: "341103",
          name: "南谯区"
        },
        {
          code: "341122",
          name: "来安县"
        },
        {
          code: "341124",
          name: "全椒县"
        },
        {
          code: "341125",
          name: "定远县"
        },
        {
          code: "341126",
          name: "凤阳县"
        },
        {
          code: "341181",
          name: "天长市"
        },
        {
          code: "341182",
          name: "明光市"
        }
      ],
      [
        {
          code: "341202",
          name: "颍州区"
        },
        {
          code: "341203",
          name: "颍东区"
        },
        {
          code: "341204",
          name: "颍泉区"
        },
        {
          code: "341221",
          name: "临泉县"
        },
        {
          code: "341222",
          name: "太和县"
        },
        {
          code: "341225",
          name: "阜南县"
        },
        {
          code: "341226",
          name: "颍上县"
        },
        {
          code: "341282",
          name: "界首市"
        }
      ],
      [
        {
          code: "341302",
          name: "埇桥区"
        },
        {
          code: "341321",
          name: "砀山县"
        },
        {
          code: "341322",
          name: "萧县"
        },
        {
          code: "341323",
          name: "灵璧县"
        },
        {
          code: "341324",
          name: "泗县"
        }
      ],
      [
        {
          code: "341502",
          name: "金安区"
        },
        {
          code: "341503",
          name: "裕安区"
        },
        {
          code: "341504",
          name: "叶集区"
        },
        {
          code: "341522",
          name: "霍邱县"
        },
        {
          code: "341523",
          name: "舒城县"
        },
        {
          code: "341524",
          name: "金寨县"
        },
        {
          code: "341525",
          name: "霍山县"
        }
      ],
      [
        {
          code: "341602",
          name: "谯城区"
        },
        {
          code: "341621",
          name: "涡阳县"
        },
        {
          code: "341622",
          name: "蒙城县"
        },
        {
          code: "341623",
          name: "利辛县"
        }
      ],
      [
        {
          code: "341702",
          name: "贵池区"
        },
        {
          code: "341721",
          name: "东至县"
        },
        {
          code: "341722",
          name: "石台县"
        },
        {
          code: "341723",
          name: "青阳县"
        }
      ],
      [
        {
          code: "341802",
          name: "宣州区"
        },
        {
          code: "341821",
          name: "郎溪县"
        },
        {
          code: "341822",
          name: "广德县"
        },
        {
          code: "341823",
          name: "泾县"
        },
        {
          code: "341824",
          name: "绩溪县"
        },
        {
          code: "341825",
          name: "旌德县"
        },
        {
          code: "341881",
          name: "宁国市"
        }
      ]
    ],
    [
      [
        {
          code: "350102",
          name: "鼓楼区"
        },
        {
          code: "350103",
          name: "台江区"
        },
        {
          code: "350104",
          name: "仓山区"
        },
        {
          code: "350105",
          name: "马尾区"
        },
        {
          code: "350111",
          name: "晋安区"
        },
        {
          code: "350112",
          name: "长乐区"
        },
        {
          code: "350121",
          name: "闽侯县"
        },
        {
          code: "350122",
          name: "连江县"
        },
        {
          code: "350123",
          name: "罗源县"
        },
        {
          code: "350124",
          name: "闽清县"
        },
        {
          code: "350125",
          name: "永泰县"
        },
        {
          code: "350128",
          name: "平潭县"
        },
        {
          code: "350181",
          name: "福清市"
        }
      ],
      [
        {
          code: "350203",
          name: "思明区"
        },
        {
          code: "350205",
          name: "海沧区"
        },
        {
          code: "350206",
          name: "湖里区"
        },
        {
          code: "350211",
          name: "集美区"
        },
        {
          code: "350212",
          name: "同安区"
        },
        {
          code: "350213",
          name: "翔安区"
        }
      ],
      [
        {
          code: "350302",
          name: "城厢区"
        },
        {
          code: "350303",
          name: "涵江区"
        },
        {
          code: "350304",
          name: "荔城区"
        },
        {
          code: "350305",
          name: "秀屿区"
        },
        {
          code: "350322",
          name: "仙游县"
        }
      ],
      [
        {
          code: "350404",
          name: "三元区"
        },
        {
          code: "350405",
          name: "沙县区"
        },
        {
          code: "350421",
          name: "明溪县"
        },
        {
          code: "350423",
          name: "清流县"
        },
        {
          code: "350424",
          name: "宁化县"
        },
        {
          code: "350425",
          name: "大田县"
        },
        {
          code: "350426",
          name: "尤溪县"
        },
        {
          code: "350428",
          name: "将乐县"
        },
        {
          code: "350429",
          name: "泰宁县"
        },
        {
          code: "350430",
          name: "建宁县"
        },
        {
          code: "350481",
          name: "永安市"
        }
      ],
      [
        {
          code: "350502",
          name: "鲤城区"
        },
        {
          code: "350503",
          name: "丰泽区"
        },
        {
          code: "350504",
          name: "洛江区"
        },
        {
          code: "350505",
          name: "泉港区"
        },
        {
          code: "350521",
          name: "惠安县"
        },
        {
          code: "350524",
          name: "安溪县"
        },
        {
          code: "350525",
          name: "永春县"
        },
        {
          code: "350526",
          name: "德化县"
        },
        {
          code: "350527",
          name: "金门县"
        },
        {
          code: "350581",
          name: "石狮市"
        },
        {
          code: "350582",
          name: "晋江市"
        },
        {
          code: "350583",
          name: "南安市"
        }
      ],
      [
        {
          code: "350602",
          name: "芗城区"
        },
        {
          code: "350603",
          name: "龙文区"
        },
        {
          code: "350604",
          name: "龙海区"
        },
        {
          code: "350605",
          name: "长泰区"
        },
        {
          code: "350622",
          name: "云霄县"
        },
        {
          code: "350623",
          name: "漳浦县"
        },
        {
          code: "350624",
          name: "诏安县"
        },
        {
          code: "350626",
          name: "东山县"
        },
        {
          code: "350627",
          name: "南靖县"
        },
        {
          code: "350628",
          name: "平和县"
        },
        {
          code: "350629",
          name: "华安县"
        }
      ],
      [
        {
          code: "350702",
          name: "延平区"
        },
        {
          code: "350703",
          name: "建阳区"
        },
        {
          code: "350721",
          name: "顺昌县"
        },
        {
          code: "350722",
          name: "浦城县"
        },
        {
          code: "350723",
          name: "光泽县"
        },
        {
          code: "350724",
          name: "松溪县"
        },
        {
          code: "350725",
          name: "政和县"
        },
        {
          code: "350781",
          name: "邵武市"
        },
        {
          code: "350782",
          name: "武夷山市"
        },
        {
          code: "350783",
          name: "建瓯市"
        }
      ],
      [
        {
          code: "350802",
          name: "新罗区"
        },
        {
          code: "350803",
          name: "永定区"
        },
        {
          code: "350821",
          name: "长汀县"
        },
        {
          code: "350823",
          name: "上杭县"
        },
        {
          code: "350824",
          name: "武平县"
        },
        {
          code: "350825",
          name: "连城县"
        },
        {
          code: "350881",
          name: "漳平市"
        }
      ],
      [
        {
          code: "350902",
          name: "蕉城区"
        },
        {
          code: "350921",
          name: "霞浦县"
        },
        {
          code: "350922",
          name: "古田县"
        },
        {
          code: "350923",
          name: "屏南县"
        },
        {
          code: "350924",
          name: "寿宁县"
        },
        {
          code: "350925",
          name: "周宁县"
        },
        {
          code: "350926",
          name: "柘荣县"
        },
        {
          code: "350981",
          name: "福安市"
        },
        {
          code: "350982",
          name: "福鼎市"
        }
      ]
    ],
    [
      [
        {
          code: "360102",
          name: "东湖区"
        },
        {
          code: "360103",
          name: "西湖区"
        },
        {
          code: "360104",
          name: "青云谱区"
        },
        {
          code: "360105",
          name: "湾里区"
        },
        {
          code: "360111",
          name: "青山湖区"
        },
        {
          code: "360112",
          name: "新建区"
        },
        {
          code: "360121",
          name: "南昌县"
        },
        {
          code: "360123",
          name: "安义县"
        },
        {
          code: "360124",
          name: "进贤县"
        }
      ],
      [
        {
          code: "360202",
          name: "昌江区"
        },
        {
          code: "360203",
          name: "珠山区"
        },
        {
          code: "360222",
          name: "浮梁县"
        },
        {
          code: "360281",
          name: "乐平市"
        }
      ],
      [
        {
          code: "360302",
          name: "安源区"
        },
        {
          code: "360313",
          name: "湘东区"
        },
        {
          code: "360321",
          name: "莲花县"
        },
        {
          code: "360322",
          name: "上栗县"
        },
        {
          code: "360323",
          name: "芦溪县"
        }
      ],
      [
        {
          code: "360402",
          name: "濂溪区"
        },
        {
          code: "360403",
          name: "浔阳区"
        },
        {
          code: "360404",
          name: "柴桑区"
        },
        {
          code: "360423",
          name: "武宁县"
        },
        {
          code: "360424",
          name: "修水县"
        },
        {
          code: "360425",
          name: "永修县"
        },
        {
          code: "360426",
          name: "德安县"
        },
        {
          code: "360428",
          name: "都昌县"
        },
        {
          code: "360429",
          name: "湖口县"
        },
        {
          code: "360430",
          name: "彭泽县"
        },
        {
          code: "360481",
          name: "瑞昌市"
        },
        {
          code: "360482",
          name: "共青城市"
        },
        {
          code: "360483",
          name: "庐山市"
        }
      ],
      [
        {
          code: "360502",
          name: "渝水区"
        },
        {
          code: "360521",
          name: "分宜县"
        }
      ],
      [
        {
          code: "360602",
          name: "月湖区"
        },
        {
          code: "360622",
          name: "余江区"
        },
        {
          code: "360681",
          name: "贵溪市"
        }
      ],
      [
        {
          code: "360702",
          name: "章贡区"
        },
        {
          code: "360703",
          name: "南康区"
        },
        {
          code: "360704",
          name: "赣县区"
        },
        {
          code: "360722",
          name: "信丰县"
        },
        {
          code: "360723",
          name: "大余县"
        },
        {
          code: "360724",
          name: "上犹县"
        },
        {
          code: "360725",
          name: "崇义县"
        },
        {
          code: "360726",
          name: "安远县"
        },
        {
          code: "360727",
          name: "龙南县"
        },
        {
          code: "360728",
          name: "定南县"
        },
        {
          code: "360729",
          name: "全南县"
        },
        {
          code: "360730",
          name: "宁都县"
        },
        {
          code: "360731",
          name: "于都县"
        },
        {
          code: "360732",
          name: "兴国县"
        },
        {
          code: "360733",
          name: "会昌县"
        },
        {
          code: "360734",
          name: "寻乌县"
        },
        {
          code: "360735",
          name: "石城县"
        },
        {
          code: "360781",
          name: "瑞金市"
        }
      ],
      [
        {
          code: "360802",
          name: "吉州区"
        },
        {
          code: "360803",
          name: "青原区"
        },
        {
          code: "360821",
          name: "吉安县"
        },
        {
          code: "360822",
          name: "吉水县"
        },
        {
          code: "360823",
          name: "峡江县"
        },
        {
          code: "360824",
          name: "新干县"
        },
        {
          code: "360825",
          name: "永丰县"
        },
        {
          code: "360826",
          name: "泰和县"
        },
        {
          code: "360827",
          name: "遂川县"
        },
        {
          code: "360828",
          name: "万安县"
        },
        {
          code: "360829",
          name: "安福县"
        },
        {
          code: "360830",
          name: "永新县"
        },
        {
          code: "360881",
          name: "井冈山市"
        }
      ],
      [
        {
          code: "360902",
          name: "袁州区"
        },
        {
          code: "360921",
          name: "奉新县"
        },
        {
          code: "360922",
          name: "万载县"
        },
        {
          code: "360923",
          name: "上高县"
        },
        {
          code: "360924",
          name: "宜丰县"
        },
        {
          code: "360925",
          name: "靖安县"
        },
        {
          code: "360926",
          name: "铜鼓县"
        },
        {
          code: "360981",
          name: "丰城市"
        },
        {
          code: "360982",
          name: "樟树市"
        },
        {
          code: "360983",
          name: "高安市"
        }
      ],
      [
        {
          code: "361002",
          name: "临川区"
        },
        {
          code: "361003",
          name: "东乡区"
        },
        {
          code: "361021",
          name: "南城县"
        },
        {
          code: "361022",
          name: "黎川县"
        },
        {
          code: "361023",
          name: "南丰县"
        },
        {
          code: "361024",
          name: "崇仁县"
        },
        {
          code: "361025",
          name: "乐安县"
        },
        {
          code: "361026",
          name: "宜黄县"
        },
        {
          code: "361027",
          name: "金溪县"
        },
        {
          code: "361028",
          name: "资溪县"
        },
        {
          code: "361030",
          name: "广昌县"
        }
      ],
      [
        {
          code: "361102",
          name: "信州区"
        },
        {
          code: "361103",
          name: "广丰区"
        },
        {
          code: "361121",
          name: "上饶县"
        },
        {
          code: "361123",
          name: "玉山县"
        },
        {
          code: "361124",
          name: "铅山县"
        },
        {
          code: "361125",
          name: "横峰县"
        },
        {
          code: "361126",
          name: "弋阳县"
        },
        {
          code: "361127",
          name: "余干县"
        },
        {
          code: "361128",
          name: "鄱阳县"
        },
        {
          code: "361129",
          name: "万年县"
        },
        {
          code: "361130",
          name: "婺源县"
        },
        {
          code: "361181",
          name: "德兴市"
        }
      ]
    ],
    [
      [
        {
          code: "370102",
          name: "历下区"
        },
        {
          code: "370103",
          name: "市中区"
        },
        {
          code: "370104",
          name: "槐荫区"
        },
        {
          code: "370105",
          name: "天桥区"
        },
        {
          code: "370112",
          name: "历城区"
        },
        {
          code: "370113",
          name: "长清区"
        },
        {
          code: "370114",
          name: "章丘区"
        },
        {
          code: "370124",
          name: "平阴县"
        },
        {
          code: "370125",
          name: "济阳县"
        },
        {
          code: "370126",
          name: "商河县"
        }
      ],
      [
        {
          code: "370202",
          name: "市南区"
        },
        {
          code: "370203",
          name: "市北区"
        },
        {
          code: "370211",
          name: "黄岛区"
        },
        {
          code: "370212",
          name: "崂山区"
        },
        {
          code: "370213",
          name: "李沧区"
        },
        {
          code: "370214",
          name: "城阳区"
        },
        {
          code: "370215",
          name: "即墨区"
        },
        {
          code: "370281",
          name: "胶州市"
        },
        {
          code: "370283",
          name: "平度市"
        },
        {
          code: "370285",
          name: "莱西市"
        }
      ],
      [
        {
          code: "370302",
          name: "淄川区"
        },
        {
          code: "370303",
          name: "张店区"
        },
        {
          code: "370304",
          name: "博山区"
        },
        {
          code: "370305",
          name: "临淄区"
        },
        {
          code: "370306",
          name: "周村区"
        },
        {
          code: "370321",
          name: "桓台县"
        },
        {
          code: "370322",
          name: "高青县"
        },
        {
          code: "370323",
          name: "沂源县"
        }
      ],
      [
        {
          code: "370402",
          name: "市中区"
        },
        {
          code: "370403",
          name: "薛城区"
        },
        {
          code: "370404",
          name: "峄城区"
        },
        {
          code: "370405",
          name: "台儿庄区"
        },
        {
          code: "370406",
          name: "山亭区"
        },
        {
          code: "370481",
          name: "滕州市"
        }
      ],
      [
        {
          code: "370502",
          name: "东营区"
        },
        {
          code: "370503",
          name: "河口区"
        },
        {
          code: "370505",
          name: "垦利区"
        },
        {
          code: "370522",
          name: "利津县"
        },
        {
          code: "370523",
          name: "广饶县"
        }
      ],
      [
        {
          code: "370602",
          name: "芝罘区"
        },
        {
          code: "370611",
          name: "福山区"
        },
        {
          code: "370612",
          name: "牟平区"
        },
        {
          code: "370613",
          name: "莱山区"
        },
        {
          code: "370634",
          name: "长岛县"
        },
        {
          code: "370681",
          name: "龙口市"
        },
        {
          code: "370682",
          name: "莱阳市"
        },
        {
          code: "370683",
          name: "莱州市"
        },
        {
          code: "370684",
          name: "蓬莱市"
        },
        {
          code: "370685",
          name: "招远市"
        },
        {
          code: "370686",
          name: "栖霞市"
        },
        {
          code: "370687",
          name: "海阳市"
        }
      ],
      [
        {
          code: "370702",
          name: "潍城区"
        },
        {
          code: "370703",
          name: "寒亭区"
        },
        {
          code: "370704",
          name: "坊子区"
        },
        {
          code: "370705",
          name: "奎文区"
        },
        {
          code: "370724",
          name: "临朐县"
        },
        {
          code: "370725",
          name: "昌乐县"
        },
        {
          code: "370781",
          name: "青州市"
        },
        {
          code: "370782",
          name: "诸城市"
        },
        {
          code: "370783",
          name: "寿光市"
        },
        {
          code: "370784",
          name: "安丘市"
        },
        {
          code: "370785",
          name: "高密市"
        },
        {
          code: "370786",
          name: "昌邑市"
        }
      ],
      [
        {
          code: "370811",
          name: "任城区"
        },
        {
          code: "370812",
          name: "兖州区"
        },
        {
          code: "370826",
          name: "微山县"
        },
        {
          code: "370827",
          name: "鱼台县"
        },
        {
          code: "370828",
          name: "金乡县"
        },
        {
          code: "370829",
          name: "嘉祥县"
        },
        {
          code: "370830",
          name: "汶上县"
        },
        {
          code: "370831",
          name: "泗水县"
        },
        {
          code: "370832",
          name: "梁山县"
        },
        {
          code: "370881",
          name: "曲阜市"
        },
        {
          code: "370883",
          name: "邹城市"
        }
      ],
      [
        {
          code: "370902",
          name: "泰山区"
        },
        {
          code: "370911",
          name: "岱岳区"
        },
        {
          code: "370921",
          name: "宁阳县"
        },
        {
          code: "370923",
          name: "东平县"
        },
        {
          code: "370982",
          name: "新泰市"
        },
        {
          code: "370983",
          name: "肥城市"
        }
      ],
      [
        {
          code: "371002",
          name: "环翠区"
        },
        {
          code: "371003",
          name: "文登区"
        },
        {
          code: "371082",
          name: "荣成市"
        },
        {
          code: "371083",
          name: "乳山市"
        }
      ],
      [
        {
          code: "371102",
          name: "东港区"
        },
        {
          code: "371103",
          name: "岚山区"
        },
        {
          code: "371121",
          name: "五莲县"
        },
        {
          code: "371122",
          name: "莒县"
        }
      ],
      [
        {
          code: "371202",
          name: "莱城区"
        },
        {
          code: "371203",
          name: "钢城区"
        }
      ],
      [
        {
          code: "371302",
          name: "兰山区"
        },
        {
          code: "371311",
          name: "罗庄区"
        },
        {
          code: "371312",
          name: "河东区"
        },
        {
          code: "371321",
          name: "沂南县"
        },
        {
          code: "371322",
          name: "郯城县"
        },
        {
          code: "371323",
          name: "沂水县"
        },
        {
          code: "371324",
          name: "兰陵县"
        },
        {
          code: "371325",
          name: "费县"
        },
        {
          code: "371326",
          name: "平邑县"
        },
        {
          code: "371327",
          name: "莒南县"
        },
        {
          code: "371328",
          name: "蒙阴县"
        },
        {
          code: "371329",
          name: "临沭县"
        }
      ],
      [
        {
          code: "371402",
          name: "德城区"
        },
        {
          code: "371403",
          name: "陵城区"
        },
        {
          code: "371422",
          name: "宁津县"
        },
        {
          code: "371423",
          name: "庆云县"
        },
        {
          code: "371424",
          name: "临邑县"
        },
        {
          code: "371425",
          name: "齐河县"
        },
        {
          code: "371426",
          name: "平原县"
        },
        {
          code: "371427",
          name: "夏津县"
        },
        {
          code: "371428",
          name: "武城县"
        },
        {
          code: "371481",
          name: "乐陵市"
        },
        {
          code: "371482",
          name: "禹城市"
        }
      ],
      [
        {
          code: "371502",
          name: "东昌府区"
        },
        {
          code: "371521",
          name: "阳谷县"
        },
        {
          code: "371522",
          name: "莘县"
        },
        {
          code: "371523",
          name: "茌平县"
        },
        {
          code: "371524",
          name: "东阿县"
        },
        {
          code: "371525",
          name: "冠县"
        },
        {
          code: "371526",
          name: "高唐县"
        },
        {
          code: "371581",
          name: "临清市"
        }
      ],
      [
        {
          code: "371602",
          name: "滨城区"
        },
        {
          code: "371603",
          name: "沾化区"
        },
        {
          code: "371621",
          name: "惠民县"
        },
        {
          code: "371622",
          name: "阳信县"
        },
        {
          code: "371623",
          name: "无棣县"
        },
        {
          code: "371625",
          name: "博兴县"
        },
        {
          code: "371626",
          name: "邹平县"
        }
      ],
      [
        {
          code: "371702",
          name: "牡丹区"
        },
        {
          code: "371703",
          name: "定陶区"
        },
        {
          code: "371721",
          name: "曹县"
        },
        {
          code: "371722",
          name: "单县"
        },
        {
          code: "371723",
          name: "成武县"
        },
        {
          code: "371724",
          name: "巨野县"
        },
        {
          code: "371725",
          name: "郓城县"
        },
        {
          code: "371726",
          name: "鄄城县"
        },
        {
          code: "371728",
          name: "东明县"
        }
      ]
    ],
    [
      [
        {
          code: "410102",
          name: "中原区"
        },
        {
          code: "410103",
          name: "二七区"
        },
        {
          code: "410104",
          name: "管城回族区"
        },
        {
          code: "410105",
          name: "金水区"
        },
        {
          code: "410106",
          name: "上街区"
        },
        {
          code: "410108",
          name: "惠济区"
        },
        {
          code: "410122",
          name: "中牟县"
        },
        {
          code: "410181",
          name: "巩义市"
        },
        {
          code: "410182",
          name: "荥阳市"
        },
        {
          code: "410183",
          name: "新密市"
        },
        {
          code: "410184",
          name: "新郑市"
        },
        {
          code: "410185",
          name: "登封市"
        }
      ],
      [
        {
          code: "410202",
          name: "龙亭区"
        },
        {
          code: "410203",
          name: "顺河回族区"
        },
        {
          code: "410204",
          name: "鼓楼区"
        },
        {
          code: "410205",
          name: "禹王台区"
        },
        {
          code: "410212",
          name: "祥符区"
        },
        {
          code: "410221",
          name: "杞县"
        },
        {
          code: "410222",
          name: "通许县"
        },
        {
          code: "410223",
          name: "尉氏县"
        },
        {
          code: "410225",
          name: "兰考县"
        }
      ],
      [
        {
          code: "410302",
          name: "老城区"
        },
        {
          code: "410303",
          name: "西工区"
        },
        {
          code: "410304",
          name: "瀍河回族区"
        },
        {
          code: "410305",
          name: "涧西区"
        },
        {
          code: "410307",
          name: "偃师区"
        },
        {
          code: "410308",
          name: "孟津区"
        },
        {
          code: "410311",
          name: "洛龙区"
        },
        {
          code: "410323",
          name: "新安县"
        },
        {
          code: "410324",
          name: "栾川县"
        },
        {
          code: "410325",
          name: "嵩县"
        },
        {
          code: "410326",
          name: "汝阳县"
        },
        {
          code: "410327",
          name: "宜阳县"
        },
        {
          code: "410328",
          name: "洛宁县"
        },
        {
          code: "410329",
          name: "伊川县"
        }
      ],
      [
        {
          code: "410402",
          name: "新华区"
        },
        {
          code: "410403",
          name: "卫东区"
        },
        {
          code: "410404",
          name: "石龙区"
        },
        {
          code: "410411",
          name: "湛河区"
        },
        {
          code: "410421",
          name: "宝丰县"
        },
        {
          code: "410422",
          name: "叶县"
        },
        {
          code: "410423",
          name: "鲁山县"
        },
        {
          code: "410425",
          name: "郏县"
        },
        {
          code: "410481",
          name: "舞钢市"
        },
        {
          code: "410482",
          name: "汝州市"
        }
      ],
      [
        {
          code: "410502",
          name: "文峰区"
        },
        {
          code: "410503",
          name: "北关区"
        },
        {
          code: "410505",
          name: "殷都区"
        },
        {
          code: "410506",
          name: "龙安区"
        },
        {
          code: "410522",
          name: "安阳县"
        },
        {
          code: "410523",
          name: "汤阴县"
        },
        {
          code: "410526",
          name: "滑县"
        },
        {
          code: "410527",
          name: "内黄县"
        },
        {
          code: "410581",
          name: "林州市"
        }
      ],
      [
        {
          code: "410602",
          name: "鹤山区"
        },
        {
          code: "410603",
          name: "山城区"
        },
        {
          code: "410611",
          name: "淇滨区"
        },
        {
          code: "410621",
          name: "浚县"
        },
        {
          code: "410622",
          name: "淇县"
        }
      ],
      [
        {
          code: "410702",
          name: "红旗区"
        },
        {
          code: "410703",
          name: "卫滨区"
        },
        {
          code: "410704",
          name: "凤泉区"
        },
        {
          code: "410711",
          name: "牧野区"
        },
        {
          code: "410721",
          name: "新乡县"
        },
        {
          code: "410724",
          name: "获嘉县"
        },
        {
          code: "410725",
          name: "原阳县"
        },
        {
          code: "410726",
          name: "延津县"
        },
        {
          code: "410727",
          name: "封丘县"
        },
        {
          code: "410728",
          name: "长垣县"
        },
        {
          code: "410781",
          name: "卫辉市"
        },
        {
          code: "410782",
          name: "辉县市"
        }
      ],
      [
        {
          code: "410802",
          name: "解放区"
        },
        {
          code: "410803",
          name: "中站区"
        },
        {
          code: "410804",
          name: "马村区"
        },
        {
          code: "410811",
          name: "山阳区"
        },
        {
          code: "410821",
          name: "修武县"
        },
        {
          code: "410822",
          name: "博爱县"
        },
        {
          code: "410823",
          name: "武陟县"
        },
        {
          code: "410825",
          name: "温县"
        },
        {
          code: "410882",
          name: "沁阳市"
        },
        {
          code: "410883",
          name: "孟州市"
        }
      ],
      [
        {
          code: "410902",
          name: "华龙区"
        },
        {
          code: "410922",
          name: "清丰县"
        },
        {
          code: "410923",
          name: "南乐县"
        },
        {
          code: "410926",
          name: "范县"
        },
        {
          code: "410927",
          name: "台前县"
        },
        {
          code: "410928",
          name: "濮阳县"
        }
      ],
      [
        {
          code: "411002",
          name: "魏都区"
        },
        {
          code: "411003",
          name: "建安区"
        },
        {
          code: "411024",
          name: "鄢陵县"
        },
        {
          code: "411025",
          name: "襄城县"
        },
        {
          code: "411081",
          name: "禹州市"
        },
        {
          code: "411082",
          name: "长葛市"
        }
      ],
      [
        {
          code: "411102",
          name: "源汇区"
        },
        {
          code: "411103",
          name: "郾城区"
        },
        {
          code: "411104",
          name: "召陵区"
        },
        {
          code: "411121",
          name: "舞阳县"
        },
        {
          code: "411122",
          name: "临颍县"
        }
      ],
      [
        {
          code: "411202",
          name: "湖滨区"
        },
        {
          code: "411203",
          name: "陕州区"
        },
        {
          code: "411221",
          name: "渑池县"
        },
        {
          code: "411224",
          name: "卢氏县"
        },
        {
          code: "411281",
          name: "义马市"
        },
        {
          code: "411282",
          name: "灵宝市"
        }
      ],
      [
        {
          code: "411302",
          name: "宛城区"
        },
        {
          code: "411303",
          name: "卧龙区"
        },
        {
          code: "411321",
          name: "南召县"
        },
        {
          code: "411322",
          name: "方城县"
        },
        {
          code: "411323",
          name: "西峡县"
        },
        {
          code: "411324",
          name: "镇平县"
        },
        {
          code: "411325",
          name: "内乡县"
        },
        {
          code: "411326",
          name: "淅川县"
        },
        {
          code: "411327",
          name: "社旗县"
        },
        {
          code: "411328",
          name: "唐河县"
        },
        {
          code: "411329",
          name: "新野县"
        },
        {
          code: "411330",
          name: "桐柏县"
        },
        {
          code: "411381",
          name: "邓州市"
        }
      ],
      [
        {
          code: "411402",
          name: "梁园区"
        },
        {
          code: "411403",
          name: "睢阳区"
        },
        {
          code: "411421",
          name: "民权县"
        },
        {
          code: "411422",
          name: "睢县"
        },
        {
          code: "411423",
          name: "宁陵县"
        },
        {
          code: "411424",
          name: "柘城县"
        },
        {
          code: "411425",
          name: "虞城县"
        },
        {
          code: "411426",
          name: "夏邑县"
        },
        {
          code: "411481",
          name: "永城市"
        }
      ],
      [
        {
          code: "411502",
          name: "浉河区"
        },
        {
          code: "411503",
          name: "平桥区"
        },
        {
          code: "411521",
          name: "罗山县"
        },
        {
          code: "411522",
          name: "光山县"
        },
        {
          code: "411523",
          name: "新县"
        },
        {
          code: "411524",
          name: "商城县"
        },
        {
          code: "411525",
          name: "固始县"
        },
        {
          code: "411526",
          name: "潢川县"
        },
        {
          code: "411527",
          name: "淮滨县"
        },
        {
          code: "411528",
          name: "息县"
        }
      ],
      [
        {
          code: "411602",
          name: "川汇区"
        },
        {
          code: "411621",
          name: "扶沟县"
        },
        {
          code: "411622",
          name: "西华县"
        },
        {
          code: "411623",
          name: "商水县"
        },
        {
          code: "411624",
          name: "沈丘县"
        },
        {
          code: "411625",
          name: "郸城县"
        },
        {
          code: "411626",
          name: "淮阳县"
        },
        {
          code: "411627",
          name: "太康县"
        },
        {
          code: "411628",
          name: "鹿邑县"
        },
        {
          code: "411681",
          name: "项城市"
        }
      ],
      [
        {
          code: "411702",
          name: "驿城区"
        },
        {
          code: "411721",
          name: "西平县"
        },
        {
          code: "411722",
          name: "上蔡县"
        },
        {
          code: "411723",
          name: "平舆县"
        },
        {
          code: "411724",
          name: "正阳县"
        },
        {
          code: "411725",
          name: "确山县"
        },
        {
          code: "411726",
          name: "泌阳县"
        },
        {
          code: "411727",
          name: "汝南县"
        },
        {
          code: "411728",
          name: "遂平县"
        },
        {
          code: "411729",
          name: "新蔡县"
        }
      ],
      [
        {
          code: "419001",
          name: "济源市"
        }
      ]
    ],
    [
      [
        {
          code: "420102",
          name: "江岸区"
        },
        {
          code: "420103",
          name: "江汉区"
        },
        {
          code: "420104",
          name: "硚口区"
        },
        {
          code: "420105",
          name: "汉阳区"
        },
        {
          code: "420106",
          name: "武昌区"
        },
        {
          code: "420107",
          name: "青山区"
        },
        {
          code: "420111",
          name: "洪山区"
        },
        {
          code: "420112",
          name: "东西湖区"
        },
        {
          code: "420113",
          name: "汉南区"
        },
        {
          code: "420114",
          name: "蔡甸区"
        },
        {
          code: "420115",
          name: "江夏区"
        },
        {
          code: "420116",
          name: "黄陂区"
        },
        {
          code: "420117",
          name: "新洲区"
        }
      ],
      [
        {
          code: "420202",
          name: "黄石港区"
        },
        {
          code: "420203",
          name: "西塞山区"
        },
        {
          code: "420204",
          name: "下陆区"
        },
        {
          code: "420205",
          name: "铁山区"
        },
        {
          code: "420222",
          name: "阳新县"
        },
        {
          code: "420281",
          name: "大冶市"
        }
      ],
      [
        {
          code: "420302",
          name: "茅箭区"
        },
        {
          code: "420303",
          name: "张湾区"
        },
        {
          code: "420304",
          name: "郧阳区"
        },
        {
          code: "420322",
          name: "郧西县"
        },
        {
          code: "420323",
          name: "竹山县"
        },
        {
          code: "420324",
          name: "竹溪县"
        },
        {
          code: "420325",
          name: "房县"
        },
        {
          code: "420381",
          name: "丹江口市"
        }
      ],
      [
        {
          code: "420502",
          name: "西陵区"
        },
        {
          code: "420503",
          name: "伍家岗区"
        },
        {
          code: "420504",
          name: "点军区"
        },
        {
          code: "420505",
          name: "猇亭区"
        },
        {
          code: "420506",
          name: "夷陵区"
        },
        {
          code: "420525",
          name: "远安县"
        },
        {
          code: "420526",
          name: "兴山县"
        },
        {
          code: "420527",
          name: "秭归县"
        },
        {
          code: "420528",
          name: "长阳土家族自治县"
        },
        {
          code: "420529",
          name: "五峰土家族自治县"
        },
        {
          code: "420581",
          name: "宜都市"
        },
        {
          code: "420582",
          name: "当阳市"
        },
        {
          code: "420583",
          name: "枝江市"
        }
      ],
      [
        {
          code: "420602",
          name: "襄城区"
        },
        {
          code: "420606",
          name: "樊城区"
        },
        {
          code: "420607",
          name: "襄州区"
        },
        {
          code: "420624",
          name: "南漳县"
        },
        {
          code: "420625",
          name: "谷城县"
        },
        {
          code: "420626",
          name: "保康县"
        },
        {
          code: "420682",
          name: "老河口市"
        },
        {
          code: "420683",
          name: "枣阳市"
        },
        {
          code: "420684",
          name: "宜城市"
        }
      ],
      [
        {
          code: "420702",
          name: "梁子湖区"
        },
        {
          code: "420703",
          name: "华容区"
        },
        {
          code: "420704",
          name: "鄂城区"
        }
      ],
      [
        {
          code: "420802",
          name: "东宝区"
        },
        {
          code: "420804",
          name: "掇刀区"
        },
        {
          code: "420821",
          name: "京山县"
        },
        {
          code: "420822",
          name: "沙洋县"
        },
        {
          code: "420881",
          name: "钟祥市"
        }
      ],
      [
        {
          code: "420902",
          name: "孝南区"
        },
        {
          code: "420921",
          name: "孝昌县"
        },
        {
          code: "420922",
          name: "大悟县"
        },
        {
          code: "420923",
          name: "云梦县"
        },
        {
          code: "420981",
          name: "应城市"
        },
        {
          code: "420982",
          name: "安陆市"
        },
        {
          code: "420984",
          name: "汉川市"
        }
      ],
      [
        {
          code: "421002",
          name: "沙市区"
        },
        {
          code: "421003",
          name: "荆州区"
        },
        {
          code: "421022",
          name: "公安县"
        },
        {
          code: "421023",
          name: "监利县"
        },
        {
          code: "421024",
          name: "江陵县"
        },
        {
          code: "421081",
          name: "石首市"
        },
        {
          code: "421083",
          name: "洪湖市"
        },
        {
          code: "421087",
          name: "松滋市"
        }
      ],
      [
        {
          code: "421102",
          name: "黄州区"
        },
        {
          code: "421121",
          name: "团风县"
        },
        {
          code: "421122",
          name: "红安县"
        },
        {
          code: "421123",
          name: "罗田县"
        },
        {
          code: "421124",
          name: "英山县"
        },
        {
          code: "421125",
          name: "浠水县"
        },
        {
          code: "421126",
          name: "蕲春县"
        },
        {
          code: "421127",
          name: "黄梅县"
        },
        {
          code: "421181",
          name: "麻城市"
        },
        {
          code: "421182",
          name: "武穴市"
        }
      ],
      [
        {
          code: "421202",
          name: "咸安区"
        },
        {
          code: "421221",
          name: "嘉鱼县"
        },
        {
          code: "421222",
          name: "通城县"
        },
        {
          code: "421223",
          name: "崇阳县"
        },
        {
          code: "421224",
          name: "通山县"
        },
        {
          code: "421281",
          name: "赤壁市"
        }
      ],
      [
        {
          code: "421303",
          name: "曾都区"
        },
        {
          code: "421321",
          name: "随县"
        },
        {
          code: "421381",
          name: "广水市"
        }
      ],
      [
        {
          code: "422801",
          name: "恩施市"
        },
        {
          code: "422802",
          name: "利川市"
        },
        {
          code: "422822",
          name: "建始县"
        },
        {
          code: "422823",
          name: "巴东县"
        },
        {
          code: "422825",
          name: "宣恩县"
        },
        {
          code: "422826",
          name: "咸丰县"
        },
        {
          code: "422827",
          name: "来凤县"
        },
        {
          code: "422828",
          name: "鹤峰县"
        }
      ],
      [
        {
          code: "429004",
          name: "仙桃市"
        },
        {
          code: "429005",
          name: "潜江市"
        },
        {
          code: "429006",
          name: "天门市"
        },
        {
          code: "429021",
          name: "神农架林区"
        }
      ]
    ],
    [
      [
        {
          code: "430102",
          name: "芙蓉区"
        },
        {
          code: "430103",
          name: "天心区"
        },
        {
          code: "430104",
          name: "岳麓区"
        },
        {
          code: "430105",
          name: "开福区"
        },
        {
          code: "430111",
          name: "雨花区"
        },
        {
          code: "430112",
          name: "望城区"
        },
        {
          code: "430121",
          name: "长沙县"
        },
        {
          code: "430181",
          name: "浏阳市"
        },
        {
          code: "430182",
          name: "宁乡市"
        }
      ],
      [
        {
          code: "430202",
          name: "荷塘区"
        },
        {
          code: "430203",
          name: "芦淞区"
        },
        {
          code: "430204",
          name: "石峰区"
        },
        {
          code: "430211",
          name: "天元区"
        },
        {
          code: "430221",
          name: "株洲县"
        },
        {
          code: "430223",
          name: "攸县"
        },
        {
          code: "430224",
          name: "茶陵县"
        },
        {
          code: "430225",
          name: "炎陵县"
        },
        {
          code: "430281",
          name: "醴陵市"
        }
      ],
      [
        {
          code: "430302",
          name: "雨湖区"
        },
        {
          code: "430304",
          name: "岳塘区"
        },
        {
          code: "430321",
          name: "湘潭县"
        },
        {
          code: "430381",
          name: "湘乡市"
        },
        {
          code: "430382",
          name: "韶山市"
        }
      ],
      [
        {
          code: "430405",
          name: "珠晖区"
        },
        {
          code: "430406",
          name: "雁峰区"
        },
        {
          code: "430407",
          name: "石鼓区"
        },
        {
          code: "430408",
          name: "蒸湘区"
        },
        {
          code: "430412",
          name: "南岳区"
        },
        {
          code: "430421",
          name: "衡阳县"
        },
        {
          code: "430422",
          name: "衡南县"
        },
        {
          code: "430423",
          name: "衡山县"
        },
        {
          code: "430424",
          name: "衡东县"
        },
        {
          code: "430426",
          name: "祁东县"
        },
        {
          code: "430481",
          name: "耒阳市"
        },
        {
          code: "430482",
          name: "常宁市"
        }
      ],
      [
        {
          code: "430502",
          name: "双清区"
        },
        {
          code: "430503",
          name: "大祥区"
        },
        {
          code: "430511",
          name: "北塔区"
        },
        {
          code: "430521",
          name: "邵东县"
        },
        {
          code: "430522",
          name: "新邵县"
        },
        {
          code: "430523",
          name: "邵阳县"
        },
        {
          code: "430524",
          name: "隆回县"
        },
        {
          code: "430525",
          name: "洞口县"
        },
        {
          code: "430527",
          name: "绥宁县"
        },
        {
          code: "430528",
          name: "新宁县"
        },
        {
          code: "430529",
          name: "城步苗族自治县"
        },
        {
          code: "430581",
          name: "武冈市"
        }
      ],
      [
        {
          code: "430602",
          name: "岳阳楼区"
        },
        {
          code: "430603",
          name: "云溪区"
        },
        {
          code: "430611",
          name: "君山区"
        },
        {
          code: "430621",
          name: "岳阳县"
        },
        {
          code: "430623",
          name: "华容县"
        },
        {
          code: "430624",
          name: "湘阴县"
        },
        {
          code: "430626",
          name: "平江县"
        },
        {
          code: "430681",
          name: "汨罗市"
        },
        {
          code: "430682",
          name: "临湘市"
        }
      ],
      [
        {
          code: "430702",
          name: "武陵区"
        },
        {
          code: "430703",
          name: "鼎城区"
        },
        {
          code: "430721",
          name: "安乡县"
        },
        {
          code: "430722",
          name: "汉寿县"
        },
        {
          code: "430723",
          name: "澧县"
        },
        {
          code: "430724",
          name: "临澧县"
        },
        {
          code: "430725",
          name: "桃源县"
        },
        {
          code: "430726",
          name: "石门县"
        },
        {
          code: "430781",
          name: "津市市"
        }
      ],
      [
        {
          code: "430802",
          name: "永定区"
        },
        {
          code: "430811",
          name: "武陵源区"
        },
        {
          code: "430821",
          name: "慈利县"
        },
        {
          code: "430822",
          name: "桑植县"
        }
      ],
      [
        {
          code: "430902",
          name: "资阳区"
        },
        {
          code: "430903",
          name: "赫山区"
        },
        {
          code: "430921",
          name: "南县"
        },
        {
          code: "430922",
          name: "桃江县"
        },
        {
          code: "430923",
          name: "安化县"
        },
        {
          code: "430981",
          name: "沅江市"
        }
      ],
      [
        {
          code: "431002",
          name: "北湖区"
        },
        {
          code: "431003",
          name: "苏仙区"
        },
        {
          code: "431021",
          name: "桂阳县"
        },
        {
          code: "431022",
          name: "宜章县"
        },
        {
          code: "431023",
          name: "永兴县"
        },
        {
          code: "431024",
          name: "嘉禾县"
        },
        {
          code: "431025",
          name: "临武县"
        },
        {
          code: "431026",
          name: "汝城县"
        },
        {
          code: "431027",
          name: "桂东县"
        },
        {
          code: "431028",
          name: "安仁县"
        },
        {
          code: "431081",
          name: "资兴市"
        }
      ],
      [
        {
          code: "431102",
          name: "零陵区"
        },
        {
          code: "431103",
          name: "冷水滩区"
        },
        {
          code: "431122",
          name: "东安县"
        },
        {
          code: "431123",
          name: "双牌县"
        },
        {
          code: "431124",
          name: "道县"
        },
        {
          code: "431125",
          name: "江永县"
        },
        {
          code: "431126",
          name: "宁远县"
        },
        {
          code: "431127",
          name: "蓝山县"
        },
        {
          code: "431128",
          name: "新田县"
        },
        {
          code: "431129",
          name: "江华瑶族自治县"
        },
        {
          code: "431181",
          name: "祁阳市"
        }
      ],
      [
        {
          code: "431202",
          name: "鹤城区"
        },
        {
          code: "431221",
          name: "中方县"
        },
        {
          code: "431222",
          name: "沅陵县"
        },
        {
          code: "431223",
          name: "辰溪县"
        },
        {
          code: "431224",
          name: "溆浦县"
        },
        {
          code: "431225",
          name: "会同县"
        },
        {
          code: "431226",
          name: "麻阳苗族自治县"
        },
        {
          code: "431227",
          name: "新晃侗族自治县"
        },
        {
          code: "431228",
          name: "芷江侗族自治县"
        },
        {
          code: "431229",
          name: "靖州苗族侗族自治县"
        },
        {
          code: "431230",
          name: "通道侗族自治县"
        },
        {
          code: "431281",
          name: "洪江市"
        }
      ],
      [
        {
          code: "431302",
          name: "娄星区"
        },
        {
          code: "431321",
          name: "双峰县"
        },
        {
          code: "431322",
          name: "新化县"
        },
        {
          code: "431381",
          name: "冷水江市"
        },
        {
          code: "431382",
          name: "涟源市"
        }
      ],
      [
        {
          code: "433101",
          name: "吉首市"
        },
        {
          code: "433122",
          name: "泸溪县"
        },
        {
          code: "433123",
          name: "凤凰县"
        },
        {
          code: "433124",
          name: "花垣县"
        },
        {
          code: "433125",
          name: "保靖县"
        },
        {
          code: "433126",
          name: "古丈县"
        },
        {
          code: "433127",
          name: "永顺县"
        },
        {
          code: "433130",
          name: "龙山县"
        }
      ]
    ],
    [
      [
        {
          code: "440103",
          name: "荔湾区"
        },
        {
          code: "440104",
          name: "越秀区"
        },
        {
          code: "440105",
          name: "海珠区"
        },
        {
          code: "440106",
          name: "天河区"
        },
        {
          code: "440111",
          name: "白云区"
        },
        {
          code: "440112",
          name: "黄埔区"
        },
        {
          code: "440113",
          name: "番禺区"
        },
        {
          code: "440114",
          name: "花都区"
        },
        {
          code: "440115",
          name: "南沙区"
        },
        {
          code: "440117",
          name: "从化区"
        },
        {
          code: "440118",
          name: "增城区"
        }
      ],
      [
        {
          code: "440203",
          name: "武江区"
        },
        {
          code: "440204",
          name: "浈江区"
        },
        {
          code: "440205",
          name: "曲江区"
        },
        {
          code: "440222",
          name: "始兴县"
        },
        {
          code: "440224",
          name: "仁化县"
        },
        {
          code: "440229",
          name: "翁源县"
        },
        {
          code: "440232",
          name: "乳源瑶族自治县"
        },
        {
          code: "440233",
          name: "新丰县"
        },
        {
          code: "440281",
          name: "乐昌市"
        },
        {
          code: "440282",
          name: "南雄市"
        }
      ],
      [
        {
          code: "440303",
          name: "罗湖区"
        },
        {
          code: "440304",
          name: "福田区"
        },
        {
          code: "440305",
          name: "南山区"
        },
        {
          code: "440306",
          name: "宝安区"
        },
        {
          code: "440307",
          name: "龙岗区"
        },
        {
          code: "440308",
          name: "盐田区"
        },
        {
          code: "440309",
          name: "龙华区"
        },
        {
          code: "440310",
          name: "坪山区"
        }
      ],
      [
        {
          code: "440402",
          name: "香洲区"
        },
        {
          code: "440403",
          name: "斗门区"
        },
        {
          code: "440404",
          name: "金湾区"
        }
      ],
      [
        {
          code: "440507",
          name: "龙湖区"
        },
        {
          code: "440511",
          name: "金平区"
        },
        {
          code: "440512",
          name: "濠江区"
        },
        {
          code: "440513",
          name: "潮阳区"
        },
        {
          code: "440514",
          name: "潮南区"
        },
        {
          code: "440515",
          name: "澄海区"
        },
        {
          code: "440523",
          name: "南澳县"
        }
      ],
      [
        {
          code: "440604",
          name: "禅城区"
        },
        {
          code: "440605",
          name: "南海区"
        },
        {
          code: "440606",
          name: "顺德区"
        },
        {
          code: "440607",
          name: "三水区"
        },
        {
          code: "440608",
          name: "高明区"
        }
      ],
      [
        {
          code: "440703",
          name: "蓬江区"
        },
        {
          code: "440704",
          name: "江海区"
        },
        {
          code: "440705",
          name: "新会区"
        },
        {
          code: "440781",
          name: "台山市"
        },
        {
          code: "440783",
          name: "开平市"
        },
        {
          code: "440784",
          name: "鹤山市"
        },
        {
          code: "440785",
          name: "恩平市"
        }
      ],
      [
        {
          code: "440802",
          name: "赤坎区"
        },
        {
          code: "440803",
          name: "霞山区"
        },
        {
          code: "440804",
          name: "坡头区"
        },
        {
          code: "440811",
          name: "麻章区"
        },
        {
          code: "440823",
          name: "遂溪县"
        },
        {
          code: "440825",
          name: "徐闻县"
        },
        {
          code: "440881",
          name: "廉江市"
        },
        {
          code: "440882",
          name: "雷州市"
        },
        {
          code: "440883",
          name: "吴川市"
        }
      ],
      [
        {
          code: "440902",
          name: "茂南区"
        },
        {
          code: "440904",
          name: "电白区"
        },
        {
          code: "440981",
          name: "高州市"
        },
        {
          code: "440982",
          name: "化州市"
        },
        {
          code: "440983",
          name: "信宜市"
        }
      ],
      [
        {
          code: "441202",
          name: "端州区"
        },
        {
          code: "441203",
          name: "鼎湖区"
        },
        {
          code: "441204",
          name: "高要区"
        },
        {
          code: "441223",
          name: "广宁县"
        },
        {
          code: "441224",
          name: "怀集县"
        },
        {
          code: "441225",
          name: "封开县"
        },
        {
          code: "441226",
          name: "德庆县"
        },
        {
          code: "441284",
          name: "四会市"
        }
      ],
      [
        {
          code: "441302",
          name: "惠城区"
        },
        {
          code: "441303",
          name: "惠阳区"
        },
        {
          code: "441322",
          name: "博罗县"
        },
        {
          code: "441323",
          name: "惠东县"
        },
        {
          code: "441324",
          name: "龙门县"
        }
      ],
      [
        {
          code: "441402",
          name: "梅江区"
        },
        {
          code: "441403",
          name: "梅县区"
        },
        {
          code: "441422",
          name: "大埔县"
        },
        {
          code: "441423",
          name: "丰顺县"
        },
        {
          code: "441424",
          name: "五华县"
        },
        {
          code: "441426",
          name: "平远县"
        },
        {
          code: "441427",
          name: "蕉岭县"
        },
        {
          code: "441481",
          name: "兴宁市"
        }
      ],
      [
        {
          code: "441502",
          name: "城区"
        },
        {
          code: "441521",
          name: "海丰县"
        },
        {
          code: "441523",
          name: "陆河县"
        },
        {
          code: "441581",
          name: "陆丰市"
        }
      ],
      [
        {
          code: "441602",
          name: "源城区"
        },
        {
          code: "441621",
          name: "紫金县"
        },
        {
          code: "441622",
          name: "龙川县"
        },
        {
          code: "441623",
          name: "连平县"
        },
        {
          code: "441624",
          name: "和平县"
        },
        {
          code: "441625",
          name: "东源县"
        }
      ],
      [
        {
          code: "441702",
          name: "江城区"
        },
        {
          code: "441704",
          name: "阳东区"
        },
        {
          code: "441721",
          name: "阳西县"
        },
        {
          code: "441781",
          name: "阳春市"
        }
      ],
      [
        {
          code: "441802",
          name: "清城区"
        },
        {
          code: "441803",
          name: "清新区"
        },
        {
          code: "441821",
          name: "佛冈县"
        },
        {
          code: "441823",
          name: "阳山县"
        },
        {
          code: "441825",
          name: "连山壮族瑶族自治县"
        },
        {
          code: "441826",
          name: "连南瑶族自治县"
        },
        {
          code: "441881",
          name: "英德市"
        },
        {
          code: "441882",
          name: "连州市"
        }
      ],
      [
        {
          code: "441901",
          name: "东城街道"
        },
        {
          code: "441902",
          name: "南城街道"
        },
        {
          code: "441903",
          name: "万江街道"
        },
        {
          code: "441904",
          name: "莞城街道"
        },
        {
          code: "441905",
          name: "石碣镇"
        },
        {
          code: "441906",
          name: "石龙镇"
        },
        {
          code: "441907",
          name: "茶山镇"
        },
        {
          code: "441908",
          name: "石排镇"
        },
        {
          code: "441909",
          name: "企石镇"
        },
        {
          code: "441910",
          name: "横沥镇"
        },
        {
          code: "441911",
          name: "桥头镇"
        },
        {
          code: "441912",
          name: "谢岗镇"
        },
        {
          code: "441913",
          name: "东坑镇"
        },
        {
          code: "441914",
          name: "常平镇"
        },
        {
          code: "441915",
          name: "寮步镇"
        },
        {
          code: "441916",
          name: "樟木头镇"
        },
        {
          code: "441917",
          name: "大朗镇"
        },
        {
          code: "441918",
          name: "黄江镇"
        },
        {
          code: "441919",
          name: "清溪镇"
        },
        {
          code: "441920",
          name: "塘厦镇"
        },
        {
          code: "441921",
          name: "凤岗镇"
        },
        {
          code: "441922",
          name: "大岭山镇"
        },
        {
          code: "441923",
          name: "长安镇"
        },
        {
          code: "441924",
          name: "虎门镇"
        },
        {
          code: "441925",
          name: "厚街镇"
        },
        {
          code: "441926",
          name: "沙田镇"
        },
        {
          code: "441927",
          name: "道滘镇"
        },
        {
          code: "441928",
          name: "洪梅镇"
        },
        {
          code: "441929",
          name: "麻涌镇"
        },
        {
          code: "441930",
          name: "望牛墩镇"
        },
        {
          code: "441931",
          name: "中堂镇"
        },
        {
          code: "441932",
          name: "高埗镇"
        },
        {
          code: "441933",
          name: "松山湖管委会"
        },
        {
          code: "441934",
          name: "虎门港管委会"
        },
        {
          code: "441935",
          name: "东莞生态园"
        }
      ],
      [
        {
          code: "442001",
          name: "石岐区街道"
        },
        {
          code: "442002",
          name: "东区街道"
        },
        {
          code: "442003",
          name: "火炬开发区"
        },
        {
          code: "442004",
          name: "西区街道"
        },
        {
          code: "442005",
          name: "南区街道"
        },
        {
          code: "442006",
          name: "五桂山街道"
        },
        {
          code: "442007",
          name: "小榄镇"
        },
        {
          code: "442008",
          name: "黄圃镇"
        },
        {
          code: "442009",
          name: "民众镇"
        },
        {
          code: "442010",
          name: "东凤镇"
        },
        {
          code: "442011",
          name: "东升镇"
        },
        {
          code: "442012",
          name: "古镇镇"
        },
        {
          code: "442013",
          name: "沙溪镇"
        },
        {
          code: "442014",
          name: "坦洲镇"
        },
        {
          code: "442015",
          name: "港口镇"
        },
        {
          code: "442016",
          name: "三角镇"
        },
        {
          code: "442017",
          name: "横栏镇"
        },
        {
          code: "442018",
          name: "南头镇"
        },
        {
          code: "442019",
          name: "阜沙镇"
        },
        {
          code: "442020",
          name: "南朗镇"
        },
        {
          code: "442021",
          name: "三乡镇"
        },
        {
          code: "442022",
          name: "板芙镇"
        },
        {
          code: "442023",
          name: "大涌镇"
        },
        {
          code: "442024",
          name: "神湾镇"
        }
      ],
      [
        {
          code: "445102",
          name: "湘桥区"
        },
        {
          code: "445103",
          name: "潮安区"
        },
        {
          code: "445122",
          name: "饶平县"
        }
      ],
      [
        {
          code: "445202",
          name: "榕城区"
        },
        {
          code: "445203",
          name: "揭东区"
        },
        {
          code: "445222",
          name: "揭西县"
        },
        {
          code: "445224",
          name: "惠来县"
        },
        {
          code: "445281",
          name: "普宁市"
        }
      ],
      [
        {
          code: "445302",
          name: "云城区"
        },
        {
          code: "445303",
          name: "云安区"
        },
        {
          code: "445321",
          name: "新兴县"
        },
        {
          code: "445322",
          name: "郁南县"
        },
        {
          code: "445381",
          name: "罗定市"
        }
      ]
    ],
    [
      [
        {
          code: "450102",
          name: "兴宁区"
        },
        {
          code: "450103",
          name: "青秀区"
        },
        {
          code: "450105",
          name: "江南区"
        },
        {
          code: "450107",
          name: "西乡塘区"
        },
        {
          code: "450108",
          name: "良庆区"
        },
        {
          code: "450109",
          name: "邕宁区"
        },
        {
          code: "450110",
          name: "武鸣区"
        },
        {
          code: "450123",
          name: "隆安县"
        },
        {
          code: "450124",
          name: "马山县"
        },
        {
          code: "450125",
          name: "上林县"
        },
        {
          code: "450126",
          name: "宾阳县"
        },
        {
          code: "450181",
          name: "横州市"
        }
      ],
      [
        {
          code: "450202",
          name: "城中区"
        },
        {
          code: "450203",
          name: "鱼峰区"
        },
        {
          code: "450204",
          name: "柳南区"
        },
        {
          code: "450205",
          name: "柳北区"
        },
        {
          code: "450206",
          name: "柳江区"
        },
        {
          code: "450222",
          name: "柳城县"
        },
        {
          code: "450223",
          name: "鹿寨县"
        },
        {
          code: "450224",
          name: "融安县"
        },
        {
          code: "450225",
          name: "融水苗族自治县"
        },
        {
          code: "450226",
          name: "三江侗族自治县"
        }
      ],
      [
        {
          code: "450302",
          name: "秀峰区"
        },
        {
          code: "450303",
          name: "叠彩区"
        },
        {
          code: "450304",
          name: "象山区"
        },
        {
          code: "450305",
          name: "七星区"
        },
        {
          code: "450311",
          name: "雁山区"
        },
        {
          code: "450312",
          name: "临桂区"
        },
        {
          code: "450321",
          name: "阳朔县"
        },
        {
          code: "450323",
          name: "灵川县"
        },
        {
          code: "450324",
          name: "全州县"
        },
        {
          code: "450325",
          name: "兴安县"
        },
        {
          code: "450326",
          name: "永福县"
        },
        {
          code: "450327",
          name: "灌阳县"
        },
        {
          code: "450328",
          name: "龙胜各族自治县"
        },
        {
          code: "450329",
          name: "资源县"
        },
        {
          code: "450330",
          name: "平乐县"
        },
        {
          code: "450331",
          name: "荔浦县"
        },
        {
          code: "450332",
          name: "恭城瑶族自治县"
        }
      ],
      [
        {
          code: "450403",
          name: "万秀区"
        },
        {
          code: "450405",
          name: "长洲区"
        },
        {
          code: "450406",
          name: "龙圩区"
        },
        {
          code: "450421",
          name: "苍梧县"
        },
        {
          code: "450422",
          name: "藤县"
        },
        {
          code: "450423",
          name: "蒙山县"
        },
        {
          code: "450481",
          name: "岑溪市"
        }
      ],
      [
        {
          code: "450502",
          name: "海城区"
        },
        {
          code: "450503",
          name: "银海区"
        },
        {
          code: "450512",
          name: "铁山港区"
        },
        {
          code: "450521",
          name: "合浦县"
        }
      ],
      [
        {
          code: "450602",
          name: "港口区"
        },
        {
          code: "450603",
          name: "防城区"
        },
        {
          code: "450621",
          name: "上思县"
        },
        {
          code: "450681",
          name: "东兴市"
        }
      ],
      [
        {
          code: "450702",
          name: "钦南区"
        },
        {
          code: "450703",
          name: "钦北区"
        },
        {
          code: "450721",
          name: "灵山县"
        },
        {
          code: "450722",
          name: "浦北县"
        }
      ],
      [
        {
          code: "450802",
          name: "港北区"
        },
        {
          code: "450803",
          name: "港南区"
        },
        {
          code: "450804",
          name: "覃塘区"
        },
        {
          code: "450821",
          name: "平南县"
        },
        {
          code: "450881",
          name: "桂平市"
        }
      ],
      [
        {
          code: "450902",
          name: "玉州区"
        },
        {
          code: "450903",
          name: "福绵区"
        },
        {
          code: "450921",
          name: "容县"
        },
        {
          code: "450922",
          name: "陆川县"
        },
        {
          code: "450923",
          name: "博白县"
        },
        {
          code: "450924",
          name: "兴业县"
        },
        {
          code: "450981",
          name: "北流市"
        }
      ],
      [
        {
          code: "451002",
          name: "右江区"
        },
        {
          code: "451021",
          name: "田阳县"
        },
        {
          code: "451022",
          name: "田东县"
        },
        {
          code: "451023",
          name: "平果县"
        },
        {
          code: "451024",
          name: "德保县"
        },
        {
          code: "451026",
          name: "那坡县"
        },
        {
          code: "451027",
          name: "凌云县"
        },
        {
          code: "451028",
          name: "乐业县"
        },
        {
          code: "451029",
          name: "田林县"
        },
        {
          code: "451030",
          name: "西林县"
        },
        {
          code: "451031",
          name: "隆林各族自治县"
        },
        {
          code: "451081",
          name: "靖西市"
        }
      ],
      [
        {
          code: "451102",
          name: "八步区"
        },
        {
          code: "451103",
          name: "平桂区"
        },
        {
          code: "451121",
          name: "昭平县"
        },
        {
          code: "451122",
          name: "钟山县"
        },
        {
          code: "451123",
          name: "富川瑶族自治县"
        }
      ],
      [
        {
          code: "451202",
          name: "金城江区"
        },
        {
          code: "451203",
          name: "宜州区"
        },
        {
          code: "451221",
          name: "南丹县"
        },
        {
          code: "451222",
          name: "天峨县"
        },
        {
          code: "451223",
          name: "凤山县"
        },
        {
          code: "451224",
          name: "东兰县"
        },
        {
          code: "451225",
          name: "罗城仫佬族自治县"
        },
        {
          code: "451226",
          name: "环江毛南族自治县"
        },
        {
          code: "451227",
          name: "巴马瑶族自治县"
        },
        {
          code: "451228",
          name: "都安瑶族自治县"
        },
        {
          code: "451229",
          name: "大化瑶族自治县"
        }
      ],
      [
        {
          code: "451302",
          name: "兴宾区"
        },
        {
          code: "451321",
          name: "忻城县"
        },
        {
          code: "451322",
          name: "象州县"
        },
        {
          code: "451323",
          name: "武宣县"
        },
        {
          code: "451324",
          name: "金秀瑶族自治县"
        },
        {
          code: "451381",
          name: "合山市"
        }
      ],
      [
        {
          code: "451402",
          name: "江州区"
        },
        {
          code: "451421",
          name: "扶绥县"
        },
        {
          code: "451422",
          name: "宁明县"
        },
        {
          code: "451423",
          name: "龙州县"
        },
        {
          code: "451424",
          name: "大新县"
        },
        {
          code: "451425",
          name: "天等县"
        },
        {
          code: "451481",
          name: "凭祥市"
        }
      ]
    ],
    [
      [
        {
          code: "460105",
          name: "秀英区"
        },
        {
          code: "460106",
          name: "龙华区"
        },
        {
          code: "460107",
          name: "琼山区"
        },
        {
          code: "460108",
          name: "美兰区"
        }
      ],
      [
        {
          code: "460202",
          name: "海棠区"
        },
        {
          code: "460203",
          name: "吉阳区"
        },
        {
          code: "460204",
          name: "天涯区"
        },
        {
          code: "460205",
          name: "崖州区"
        }
      ],
      [
        {
          code: "460321",
          name: "西沙群岛"
        },
        {
          code: "460322",
          name: "南沙群岛"
        },
        {
          code: "460323",
          name: "中沙群岛的岛礁及其海域"
        }
      ],
      [
        {
          code: "460401",
          name: "那大镇"
        },
        {
          code: "460402",
          name: "和庆镇"
        },
        {
          code: "460403",
          name: "南丰镇"
        },
        {
          code: "460404",
          name: "大成镇"
        },
        {
          code: "460405",
          name: "雅星镇"
        },
        {
          code: "460406",
          name: "兰洋镇"
        },
        {
          code: "460407",
          name: "光村镇"
        },
        {
          code: "460408",
          name: "木棠镇"
        },
        {
          code: "460409",
          name: "海头镇"
        },
        {
          code: "460410",
          name: "峨蔓镇"
        },
        {
          code: "460411",
          name: "三都镇"
        },
        {
          code: "460412",
          name: "王五镇"
        },
        {
          code: "460413",
          name: "白马井镇"
        },
        {
          code: "460414",
          name: "中和镇"
        },
        {
          code: "460415",
          name: "排浦镇"
        },
        {
          code: "460416",
          name: "东成镇"
        },
        {
          code: "460417",
          name: "新州镇"
        },
        {
          code: "460418",
          name: "国营西培农场"
        },
        {
          code: "460419",
          name: "国营西联农场"
        },
        {
          code: "460420",
          name: "国营蓝洋农场"
        },
        {
          code: "460421",
          name: "国营八一农场"
        },
        {
          code: "460422",
          name: "洋浦经济开发区"
        },
        {
          code: "460423",
          name: "华南热作学院"
        },
        {
          code: "460424",
          name: "红岭农场"
        }
      ],
      [
        {
          code: "469001",
          name: "五指山市"
        },
        {
          code: "469002",
          name: "琼海市"
        },
        {
          code: "469005",
          name: "文昌市"
        },
        {
          code: "469006",
          name: "万宁市"
        },
        {
          code: "469007",
          name: "东方市"
        },
        {
          code: "469021",
          name: "定安县"
        },
        {
          code: "469022",
          name: "屯昌县"
        },
        {
          code: "469023",
          name: "澄迈县"
        },
        {
          code: "469024",
          name: "临高县"
        },
        {
          code: "469025",
          name: "白沙黎族自治县"
        },
        {
          code: "469026",
          name: "昌江黎族自治县"
        },
        {
          code: "469027",
          name: "乐东黎族自治县"
        },
        {
          code: "469028",
          name: "陵水黎族自治县"
        },
        {
          code: "469029",
          name: "保亭黎族苗族自治县"
        },
        {
          code: "469030",
          name: "琼中黎族苗族自治县"
        }
      ]
    ],
    [
      [
        {
          code: "500101",
          name: "万州区"
        },
        {
          code: "500102",
          name: "涪陵区"
        },
        {
          code: "500103",
          name: "渝中区"
        },
        {
          code: "500104",
          name: "大渡口区"
        },
        {
          code: "500105",
          name: "江北区"
        },
        {
          code: "500106",
          name: "沙坪坝区"
        },
        {
          code: "500107",
          name: "九龙坡区"
        },
        {
          code: "500108",
          name: "南岸区"
        },
        {
          code: "500109",
          name: "北碚区"
        },
        {
          code: "500110",
          name: "綦江区"
        },
        {
          code: "500111",
          name: "大足区"
        },
        {
          code: "500112",
          name: "渝北区"
        },
        {
          code: "500113",
          name: "巴南区"
        },
        {
          code: "500114",
          name: "黔江区"
        },
        {
          code: "500115",
          name: "长寿区"
        },
        {
          code: "500116",
          name: "江津区"
        },
        {
          code: "500117",
          name: "合川区"
        },
        {
          code: "500118",
          name: "永川区"
        },
        {
          code: "500119",
          name: "南川区"
        },
        {
          code: "500120",
          name: "璧山区"
        },
        {
          code: "500151",
          name: "铜梁区"
        },
        {
          code: "500152",
          name: "潼南区"
        },
        {
          code: "500153",
          name: "荣昌区"
        },
        {
          code: "500154",
          name: "开州区"
        },
        {
          code: "500155",
          name: "梁平区"
        },
        {
          code: "500156",
          name: "武隆区"
        }
      ],
      [
        {
          code: "500229",
          name: "城口县"
        },
        {
          code: "500230",
          name: "丰都县"
        },
        {
          code: "500231",
          name: "垫江县"
        },
        {
          code: "500233",
          name: "忠县"
        },
        {
          code: "500235",
          name: "云阳县"
        },
        {
          code: "500236",
          name: "奉节县"
        },
        {
          code: "500237",
          name: "巫山县"
        },
        {
          code: "500238",
          name: "巫溪县"
        },
        {
          code: "500240",
          name: "石柱土家族自治县"
        },
        {
          code: "500241",
          name: "秀山土家族苗族自治县"
        },
        {
          code: "500242",
          name: "酉阳土家族苗族自治县"
        },
        {
          code: "500243",
          name: "彭水苗族土家族自治县"
        }
      ]
    ],
    [
      [
        {
          code: "510104",
          name: "锦江区"
        },
        {
          code: "510105",
          name: "青羊区"
        },
        {
          code: "510106",
          name: "金牛区"
        },
        {
          code: "510107",
          name: "武侯区"
        },
        {
          code: "510108",
          name: "成华区"
        },
        {
          code: "510112",
          name: "龙泉驿区"
        },
        {
          code: "510113",
          name: "青白江区"
        },
        {
          code: "510114",
          name: "新都区"
        },
        {
          code: "510115",
          name: "温江区"
        },
        {
          code: "510116",
          name: "双流区"
        },
        {
          code: "510117",
          name: "郫都区"
        },
        {
          code: "510121",
          name: "金堂县"
        },
        {
          code: "510129",
          name: "大邑县"
        },
        {
          code: "510131",
          name: "蒲江县"
        },
        {
          code: "510132",
          name: "新津县"
        },
        {
          code: "510181",
          name: "都江堰市"
        },
        {
          code: "510182",
          name: "彭州市"
        },
        {
          code: "510183",
          name: "邛崃市"
        },
        {
          code: "510184",
          name: "崇州市"
        },
        {
          code: "510185",
          name: "简阳市"
        }
      ],
      [
        {
          code: "510302",
          name: "自流井区"
        },
        {
          code: "510303",
          name: "贡井区"
        },
        {
          code: "510304",
          name: "大安区"
        },
        {
          code: "510311",
          name: "沿滩区"
        },
        {
          code: "510321",
          name: "荣县"
        },
        {
          code: "510322",
          name: "富顺县"
        }
      ],
      [
        {
          code: "510402",
          name: "东区"
        },
        {
          code: "510403",
          name: "西区"
        },
        {
          code: "510411",
          name: "仁和区"
        },
        {
          code: "510421",
          name: "米易县"
        },
        {
          code: "510422",
          name: "盐边县"
        }
      ],
      [
        {
          code: "510502",
          name: "江阳区"
        },
        {
          code: "510503",
          name: "纳溪区"
        },
        {
          code: "510504",
          name: "龙马潭区"
        },
        {
          code: "510521",
          name: "泸县"
        },
        {
          code: "510522",
          name: "合江县"
        },
        {
          code: "510524",
          name: "叙永县"
        },
        {
          code: "510525",
          name: "古蔺县"
        }
      ],
      [
        {
          code: "510603",
          name: "旌阳区"
        },
        {
          code: "510604",
          name: "罗江区"
        },
        {
          code: "510623",
          name: "中江县"
        },
        {
          code: "510681",
          name: "广汉市"
        },
        {
          code: "510682",
          name: "什邡市"
        },
        {
          code: "510683",
          name: "绵竹市"
        }
      ],
      [
        {
          code: "510703",
          name: "涪城区"
        },
        {
          code: "510704",
          name: "游仙区"
        },
        {
          code: "510705",
          name: "安州区"
        },
        {
          code: "510722",
          name: "三台县"
        },
        {
          code: "510723",
          name: "盐亭县"
        },
        {
          code: "510725",
          name: "梓潼县"
        },
        {
          code: "510726",
          name: "北川羌族自治县"
        },
        {
          code: "510727",
          name: "平武县"
        },
        {
          code: "510781",
          name: "江油市"
        }
      ],
      [
        {
          code: "510802",
          name: "利州区"
        },
        {
          code: "510811",
          name: "昭化区"
        },
        {
          code: "510812",
          name: "朝天区"
        },
        {
          code: "510821",
          name: "旺苍县"
        },
        {
          code: "510822",
          name: "青川县"
        },
        {
          code: "510823",
          name: "剑阁县"
        },
        {
          code: "510824",
          name: "苍溪县"
        }
      ],
      [
        {
          code: "510903",
          name: "船山区"
        },
        {
          code: "510904",
          name: "安居区"
        },
        {
          code: "510921",
          name: "蓬溪县"
        },
        {
          code: "510922",
          name: "射洪县"
        },
        {
          code: "510923",
          name: "大英县"
        }
      ],
      [
        {
          code: "511002",
          name: "市中区"
        },
        {
          code: "511011",
          name: "东兴区"
        },
        {
          code: "511024",
          name: "威远县"
        },
        {
          code: "511025",
          name: "资中县"
        },
        {
          code: "511083",
          name: "隆昌市"
        }
      ],
      [
        {
          code: "511102",
          name: "市中区"
        },
        {
          code: "511111",
          name: "沙湾区"
        },
        {
          code: "511112",
          name: "五通桥区"
        },
        {
          code: "511113",
          name: "金口河区"
        },
        {
          code: "511123",
          name: "犍为县"
        },
        {
          code: "511124",
          name: "井研县"
        },
        {
          code: "511126",
          name: "夹江县"
        },
        {
          code: "511129",
          name: "沐川县"
        },
        {
          code: "511132",
          name: "峨边彝族自治县"
        },
        {
          code: "511133",
          name: "马边彝族自治县"
        },
        {
          code: "511181",
          name: "峨眉山市"
        }
      ],
      [
        {
          code: "511302",
          name: "顺庆区"
        },
        {
          code: "511303",
          name: "高坪区"
        },
        {
          code: "511304",
          name: "嘉陵区"
        },
        {
          code: "511321",
          name: "南部县"
        },
        {
          code: "511322",
          name: "营山县"
        },
        {
          code: "511323",
          name: "蓬安县"
        },
        {
          code: "511324",
          name: "仪陇县"
        },
        {
          code: "511325",
          name: "西充县"
        },
        {
          code: "511381",
          name: "阆中市"
        }
      ],
      [
        {
          code: "511402",
          name: "东坡区"
        },
        {
          code: "511403",
          name: "彭山区"
        },
        {
          code: "511421",
          name: "仁寿县"
        },
        {
          code: "511423",
          name: "洪雅县"
        },
        {
          code: "511424",
          name: "丹棱县"
        },
        {
          code: "511425",
          name: "青神县"
        }
      ],
      [
        {
          code: "511502",
          name: "翠屏区"
        },
        {
          code: "511503",
          name: "南溪区"
        },
        {
          code: "511521",
          name: "宜宾县"
        },
        {
          code: "511523",
          name: "江安县"
        },
        {
          code: "511524",
          name: "长宁县"
        },
        {
          code: "511525",
          name: "高县"
        },
        {
          code: "511526",
          name: "珙县"
        },
        {
          code: "511527",
          name: "筠连县"
        },
        {
          code: "511528",
          name: "兴文县"
        },
        {
          code: "511529",
          name: "屏山县"
        }
      ],
      [
        {
          code: "511602",
          name: "广安区"
        },
        {
          code: "511603",
          name: "前锋区"
        },
        {
          code: "511621",
          name: "岳池县"
        },
        {
          code: "511622",
          name: "武胜县"
        },
        {
          code: "511623",
          name: "邻水县"
        },
        {
          code: "511681",
          name: "华蓥市"
        }
      ],
      [
        {
          code: "511702",
          name: "通川区"
        },
        {
          code: "511703",
          name: "达川区"
        },
        {
          code: "511722",
          name: "宣汉县"
        },
        {
          code: "511723",
          name: "开江县"
        },
        {
          code: "511724",
          name: "大竹县"
        },
        {
          code: "511725",
          name: "渠县"
        },
        {
          code: "511781",
          name: "万源市"
        }
      ],
      [
        {
          code: "511802",
          name: "雨城区"
        },
        {
          code: "511803",
          name: "名山区"
        },
        {
          code: "511822",
          name: "荥经县"
        },
        {
          code: "511823",
          name: "汉源县"
        },
        {
          code: "511824",
          name: "石棉县"
        },
        {
          code: "511825",
          name: "天全县"
        },
        {
          code: "511826",
          name: "芦山县"
        },
        {
          code: "511827",
          name: "宝兴县"
        }
      ],
      [
        {
          code: "511902",
          name: "巴州区"
        },
        {
          code: "511903",
          name: "恩阳区"
        },
        {
          code: "511921",
          name: "通江县"
        },
        {
          code: "511922",
          name: "南江县"
        },
        {
          code: "511923",
          name: "平昌县"
        }
      ],
      [
        {
          code: "512002",
          name: "雁江区"
        },
        {
          code: "512021",
          name: "安岳县"
        },
        {
          code: "512022",
          name: "乐至县"
        }
      ],
      [
        {
          code: "513201",
          name: "马尔康市"
        },
        {
          code: "513221",
          name: "汶川县"
        },
        {
          code: "513222",
          name: "理县"
        },
        {
          code: "513223",
          name: "茂县"
        },
        {
          code: "513224",
          name: "松潘县"
        },
        {
          code: "513225",
          name: "九寨沟县"
        },
        {
          code: "513226",
          name: "金川县"
        },
        {
          code: "513227",
          name: "小金县"
        },
        {
          code: "513228",
          name: "黑水县"
        },
        {
          code: "513230",
          name: "壤塘县"
        },
        {
          code: "513231",
          name: "阿坝县"
        },
        {
          code: "513232",
          name: "若尔盖县"
        },
        {
          code: "513233",
          name: "红原县"
        }
      ],
      [
        {
          code: "513301",
          name: "康定市"
        },
        {
          code: "513322",
          name: "泸定县"
        },
        {
          code: "513323",
          name: "丹巴县"
        },
        {
          code: "513324",
          name: "九龙县"
        },
        {
          code: "513325",
          name: "雅江县"
        },
        {
          code: "513326",
          name: "道孚县"
        },
        {
          code: "513327",
          name: "炉霍县"
        },
        {
          code: "513328",
          name: "甘孜县"
        },
        {
          code: "513329",
          name: "新龙县"
        },
        {
          code: "513330",
          name: "德格县"
        },
        {
          code: "513331",
          name: "白玉县"
        },
        {
          code: "513332",
          name: "石渠县"
        },
        {
          code: "513333",
          name: "色达县"
        },
        {
          code: "513334",
          name: "理塘县"
        },
        {
          code: "513335",
          name: "巴塘县"
        },
        {
          code: "513336",
          name: "乡城县"
        },
        {
          code: "513337",
          name: "稻城县"
        },
        {
          code: "513338",
          name: "得荣县"
        }
      ],
      [
        {
          code: "513401",
          name: "西昌市"
        },
        {
          code: "513402",
          name: "会理市"
        },
        {
          code: "513422",
          name: "木里藏族自治县"
        },
        {
          code: "513423",
          name: "盐源县"
        },
        {
          code: "513424",
          name: "德昌县"
        },
        {
          code: "513426",
          name: "会东县"
        },
        {
          code: "513427",
          name: "宁南县"
        },
        {
          code: "513428",
          name: "普格县"
        },
        {
          code: "513429",
          name: "布拖县"
        },
        {
          code: "513430",
          name: "金阳县"
        },
        {
          code: "513431",
          name: "昭觉县"
        },
        {
          code: "513432",
          name: "喜德县"
        },
        {
          code: "513433",
          name: "冕宁县"
        },
        {
          code: "513434",
          name: "越西县"
        },
        {
          code: "513435",
          name: "甘洛县"
        },
        {
          code: "513436",
          name: "美姑县"
        },
        {
          code: "513437",
          name: "雷波县"
        }
      ]
    ],
    [
      [
        {
          code: "520102",
          name: "南明区"
        },
        {
          code: "520103",
          name: "云岩区"
        },
        {
          code: "520111",
          name: "花溪区"
        },
        {
          code: "520112",
          name: "乌当区"
        },
        {
          code: "520113",
          name: "白云区"
        },
        {
          code: "520115",
          name: "观山湖区"
        },
        {
          code: "520121",
          name: "开阳县"
        },
        {
          code: "520122",
          name: "息烽县"
        },
        {
          code: "520123",
          name: "修文县"
        },
        {
          code: "520181",
          name: "清镇市"
        }
      ],
      [
        {
          code: "520201",
          name: "钟山区"
        },
        {
          code: "520203",
          name: "六枝特区"
        },
        {
          code: "520221",
          name: "水城县"
        },
        {
          code: "520281",
          name: "盘州市"
        }
      ],
      [
        {
          code: "520302",
          name: "红花岗区"
        },
        {
          code: "520303",
          name: "汇川区"
        },
        {
          code: "520304",
          name: "播州区"
        },
        {
          code: "520322",
          name: "桐梓县"
        },
        {
          code: "520323",
          name: "绥阳县"
        },
        {
          code: "520324",
          name: "正安县"
        },
        {
          code: "520325",
          name: "道真仡佬族苗族自治县"
        },
        {
          code: "520326",
          name: "务川仡佬族苗族自治县"
        },
        {
          code: "520327",
          name: "凤冈县"
        },
        {
          code: "520328",
          name: "湄潭县"
        },
        {
          code: "520329",
          name: "余庆县"
        },
        {
          code: "520330",
          name: "习水县"
        },
        {
          code: "520381",
          name: "赤水市"
        },
        {
          code: "520382",
          name: "仁怀市"
        }
      ],
      [
        {
          code: "520402",
          name: "西秀区"
        },
        {
          code: "520403",
          name: "平坝区"
        },
        {
          code: "520422",
          name: "普定县"
        },
        {
          code: "520423",
          name: "镇宁布依族苗族自治县"
        },
        {
          code: "520424",
          name: "关岭布依族苗族自治县"
        },
        {
          code: "520425",
          name: "紫云苗族布依族自治县"
        }
      ],
      [
        {
          code: "520502",
          name: "七星关区"
        },
        {
          code: "520521",
          name: "大方县"
        },
        {
          code: "520523",
          name: "金沙县"
        },
        {
          code: "520524",
          name: "织金县"
        },
        {
          code: "520525",
          name: "纳雍县"
        },
        {
          code: "520526",
          name: "威宁彝族回族苗族自治县"
        },
        {
          code: "520527",
          name: "赫章县"
        },
        {
          code: "520581",
          name: "黔西市"
        }
      ],
      [
        {
          code: "520602",
          name: "碧江区"
        },
        {
          code: "520603",
          name: "万山区"
        },
        {
          code: "520621",
          name: "江口县"
        },
        {
          code: "520622",
          name: "玉屏侗族自治县"
        },
        {
          code: "520623",
          name: "石阡县"
        },
        {
          code: "520624",
          name: "思南县"
        },
        {
          code: "520625",
          name: "印江土家族苗族自治县"
        },
        {
          code: "520626",
          name: "德江县"
        },
        {
          code: "520627",
          name: "沿河土家族自治县"
        },
        {
          code: "520628",
          name: "松桃苗族自治县"
        }
      ],
      [
        {
          code: "522301",
          name: "兴义市"
        },
        {
          code: "522322",
          name: "兴仁县"
        },
        {
          code: "522323",
          name: "普安县"
        },
        {
          code: "522324",
          name: "晴隆县"
        },
        {
          code: "522325",
          name: "贞丰县"
        },
        {
          code: "522326",
          name: "望谟县"
        },
        {
          code: "522327",
          name: "册亨县"
        },
        {
          code: "522328",
          name: "安龙县"
        }
      ],
      [
        {
          code: "522601",
          name: "凯里市"
        },
        {
          code: "522622",
          name: "黄平县"
        },
        {
          code: "522623",
          name: "施秉县"
        },
        {
          code: "522624",
          name: "三穗县"
        },
        {
          code: "522625",
          name: "镇远县"
        },
        {
          code: "522626",
          name: "岑巩县"
        },
        {
          code: "522627",
          name: "天柱县"
        },
        {
          code: "522628",
          name: "锦屏县"
        },
        {
          code: "522629",
          name: "剑河县"
        },
        {
          code: "522630",
          name: "台江县"
        },
        {
          code: "522631",
          name: "黎平县"
        },
        {
          code: "522632",
          name: "榕江县"
        },
        {
          code: "522633",
          name: "从江县"
        },
        {
          code: "522634",
          name: "雷山县"
        },
        {
          code: "522635",
          name: "麻江县"
        },
        {
          code: "522636",
          name: "丹寨县"
        }
      ],
      [
        {
          code: "522701",
          name: "都匀市"
        },
        {
          code: "522702",
          name: "福泉市"
        },
        {
          code: "522722",
          name: "荔波县"
        },
        {
          code: "522723",
          name: "贵定县"
        },
        {
          code: "522725",
          name: "瓮安县"
        },
        {
          code: "522726",
          name: "独山县"
        },
        {
          code: "522727",
          name: "平塘县"
        },
        {
          code: "522728",
          name: "罗甸县"
        },
        {
          code: "522729",
          name: "长顺县"
        },
        {
          code: "522730",
          name: "龙里县"
        },
        {
          code: "522731",
          name: "惠水县"
        },
        {
          code: "522732",
          name: "三都水族自治县"
        }
      ]
    ],
    [
      [
        {
          code: "530102",
          name: "五华区"
        },
        {
          code: "530103",
          name: "盘龙区"
        },
        {
          code: "530111",
          name: "官渡区"
        },
        {
          code: "530112",
          name: "西山区"
        },
        {
          code: "530113",
          name: "东川区"
        },
        {
          code: "530114",
          name: "呈贡区"
        },
        {
          code: "530115",
          name: "晋宁区"
        },
        {
          code: "530124",
          name: "富民县"
        },
        {
          code: "530125",
          name: "宜良县"
        },
        {
          code: "530126",
          name: "石林彝族自治县"
        },
        {
          code: "530127",
          name: "嵩明县"
        },
        {
          code: "530128",
          name: "禄劝彝族苗族自治县"
        },
        {
          code: "530129",
          name: "寻甸回族彝族自治县"
        },
        {
          code: "530181",
          name: "安宁市"
        }
      ],
      [
        {
          code: "530302",
          name: "麒麟区"
        },
        {
          code: "530303",
          name: "沾益区"
        },
        {
          code: "530321",
          name: "马龙县"
        },
        {
          code: "530322",
          name: "陆良县"
        },
        {
          code: "530323",
          name: "师宗县"
        },
        {
          code: "530324",
          name: "罗平县"
        },
        {
          code: "530325",
          name: "富源县"
        },
        {
          code: "530326",
          name: "会泽县"
        },
        {
          code: "530381",
          name: "宣威市"
        }
      ],
      [
        {
          code: "530402",
          name: "红塔区"
        },
        {
          code: "530403",
          name: "江川区"
        },
        {
          code: "530422",
          name: "澄江县"
        },
        {
          code: "530423",
          name: "通海县"
        },
        {
          code: "530424",
          name: "华宁县"
        },
        {
          code: "530425",
          name: "易门县"
        },
        {
          code: "530426",
          name: "峨山彝族自治县"
        },
        {
          code: "530427",
          name: "新平彝族傣族自治县"
        },
        {
          code: "530428",
          name: "元江哈尼族彝族傣族自治县"
        }
      ],
      [
        {
          code: "530502",
          name: "隆阳区"
        },
        {
          code: "530521",
          name: "施甸县"
        },
        {
          code: "530523",
          name: "龙陵县"
        },
        {
          code: "530524",
          name: "昌宁县"
        },
        {
          code: "530581",
          name: "腾冲市"
        }
      ],
      [
        {
          code: "530602",
          name: "昭阳区"
        },
        {
          code: "530621",
          name: "鲁甸县"
        },
        {
          code: "530622",
          name: "巧家县"
        },
        {
          code: "530623",
          name: "盐津县"
        },
        {
          code: "530624",
          name: "大关县"
        },
        {
          code: "530625",
          name: "永善县"
        },
        {
          code: "530626",
          name: "绥江县"
        },
        {
          code: "530627",
          name: "镇雄县"
        },
        {
          code: "530628",
          name: "彝良县"
        },
        {
          code: "530629",
          name: "威信县"
        },
        {
          code: "530630",
          name: "水富县"
        }
      ],
      [
        {
          code: "530702",
          name: "古城区"
        },
        {
          code: "530721",
          name: "玉龙纳西族自治县"
        },
        {
          code: "530722",
          name: "永胜县"
        },
        {
          code: "530723",
          name: "华坪县"
        },
        {
          code: "530724",
          name: "宁蒗彝族自治县"
        }
      ],
      [
        {
          code: "530802",
          name: "思茅区"
        },
        {
          code: "530821",
          name: "宁洱哈尼族彝族自治县"
        },
        {
          code: "530822",
          name: "墨江哈尼族自治县"
        },
        {
          code: "530823",
          name: "景东彝族自治县"
        },
        {
          code: "530824",
          name: "景谷傣族彝族自治县"
        },
        {
          code: "530825",
          name: "镇沅彝族哈尼族拉祜族自治县"
        },
        {
          code: "530826",
          name: "江城哈尼族彝族自治县"
        },
        {
          code: "530827",
          name: "孟连傣族拉祜族佤族自治县"
        },
        {
          code: "530828",
          name: "澜沧拉祜族自治县"
        },
        {
          code: "530829",
          name: "西盟佤族自治县"
        }
      ],
      [
        {
          code: "530902",
          name: "临翔区"
        },
        {
          code: "530921",
          name: "凤庆县"
        },
        {
          code: "530922",
          name: "云县"
        },
        {
          code: "530923",
          name: "永德县"
        },
        {
          code: "530924",
          name: "镇康县"
        },
        {
          code: "530925",
          name: "双江拉祜族佤族布朗族傣族自治县"
        },
        {
          code: "530926",
          name: "耿马傣族佤族自治县"
        },
        {
          code: "530927",
          name: "沧源佤族自治县"
        }
      ],
      [
        {
          code: "532301",
          name: "楚雄市"
        },
        {
          code: "532302",
          name: "禄丰市"
        },
        {
          code: "532322",
          name: "双柏县"
        },
        {
          code: "532323",
          name: "牟定县"
        },
        {
          code: "532324",
          name: "南华县"
        },
        {
          code: "532325",
          name: "姚安县"
        },
        {
          code: "532326",
          name: "大姚县"
        },
        {
          code: "532327",
          name: "永仁县"
        },
        {
          code: "532328",
          name: "元谋县"
        },
        {
          code: "532329",
          name: "武定县"
        }
      ],
      [
        {
          code: "532501",
          name: "个旧市"
        },
        {
          code: "532502",
          name: "开远市"
        },
        {
          code: "532503",
          name: "蒙自市"
        },
        {
          code: "532504",
          name: "弥勒市"
        },
        {
          code: "532523",
          name: "屏边苗族自治县"
        },
        {
          code: "532524",
          name: "建水县"
        },
        {
          code: "532525",
          name: "石屏县"
        },
        {
          code: "532527",
          name: "泸西县"
        },
        {
          code: "532528",
          name: "元阳县"
        },
        {
          code: "532529",
          name: "红河县"
        },
        {
          code: "532530",
          name: "金平苗族瑶族傣族自治县"
        },
        {
          code: "532531",
          name: "绿春县"
        },
        {
          code: "532532",
          name: "河口瑶族自治县"
        }
      ],
      [
        {
          code: "532601",
          name: "文山市"
        },
        {
          code: "532622",
          name: "砚山县"
        },
        {
          code: "532623",
          name: "西畴县"
        },
        {
          code: "532624",
          name: "麻栗坡县"
        },
        {
          code: "532625",
          name: "马关县"
        },
        {
          code: "532626",
          name: "丘北县"
        },
        {
          code: "532627",
          name: "广南县"
        },
        {
          code: "532628",
          name: "富宁县"
        }
      ],
      [
        {
          code: "532801",
          name: "景洪市"
        },
        {
          code: "532822",
          name: "勐海县"
        },
        {
          code: "532823",
          name: "勐腊县"
        }
      ],
      [
        {
          code: "532901",
          name: "大理市"
        },
        {
          code: "532922",
          name: "漾濞彝族自治县"
        },
        {
          code: "532923",
          name: "祥云县"
        },
        {
          code: "532924",
          name: "宾川县"
        },
        {
          code: "532925",
          name: "弥渡县"
        },
        {
          code: "532926",
          name: "南涧彝族自治县"
        },
        {
          code: "532927",
          name: "巍山彝族回族自治县"
        },
        {
          code: "532928",
          name: "永平县"
        },
        {
          code: "532929",
          name: "云龙县"
        },
        {
          code: "532930",
          name: "洱源县"
        },
        {
          code: "532931",
          name: "剑川县"
        },
        {
          code: "532932",
          name: "鹤庆县"
        }
      ],
      [
        {
          code: "533102",
          name: "瑞丽市"
        },
        {
          code: "533103",
          name: "芒市"
        },
        {
          code: "533122",
          name: "梁河县"
        },
        {
          code: "533123",
          name: "盈江县"
        },
        {
          code: "533124",
          name: "陇川县"
        }
      ],
      [
        {
          code: "533301",
          name: "泸水市"
        },
        {
          code: "533323",
          name: "福贡县"
        },
        {
          code: "533324",
          name: "贡山独龙族怒族自治县"
        },
        {
          code: "533325",
          name: "兰坪白族普米族自治县"
        }
      ],
      [
        {
          code: "533401",
          name: "香格里拉市"
        },
        {
          code: "533422",
          name: "德钦县"
        },
        {
          code: "533423",
          name: "维西傈僳族自治县"
        }
      ]
    ],
    [
      [
        {
          code: "540102",
          name: "城关区"
        },
        {
          code: "540103",
          name: "堆龙德庆区"
        },
        {
          code: "540104",
          name: "达孜区"
        },
        {
          code: "540121",
          name: "林周县"
        },
        {
          code: "540122",
          name: "当雄县"
        },
        {
          code: "540123",
          name: "尼木县"
        },
        {
          code: "540124",
          name: "曲水县"
        },
        {
          code: "540127",
          name: "墨竹工卡县"
        }
      ],
      [
        {
          code: "540202",
          name: "桑珠孜区"
        },
        {
          code: "540221",
          name: "南木林县"
        },
        {
          code: "540222",
          name: "江孜县"
        },
        {
          code: "540223",
          name: "定日县"
        },
        {
          code: "540224",
          name: "萨迦县"
        },
        {
          code: "540225",
          name: "拉孜县"
        },
        {
          code: "540226",
          name: "昂仁县"
        },
        {
          code: "540227",
          name: "谢通门县"
        },
        {
          code: "540228",
          name: "白朗县"
        },
        {
          code: "540229",
          name: "仁布县"
        },
        {
          code: "540230",
          name: "康马县"
        },
        {
          code: "540231",
          name: "定结县"
        },
        {
          code: "540232",
          name: "仲巴县"
        },
        {
          code: "540233",
          name: "亚东县"
        },
        {
          code: "540234",
          name: "吉隆县"
        },
        {
          code: "540235",
          name: "聂拉木县"
        },
        {
          code: "540236",
          name: "萨嘎县"
        },
        {
          code: "540237",
          name: "岗巴县"
        }
      ],
      [
        {
          code: "540302",
          name: "卡若区"
        },
        {
          code: "540321",
          name: "江达县"
        },
        {
          code: "540322",
          name: "贡觉县"
        },
        {
          code: "540323",
          name: "类乌齐县"
        },
        {
          code: "540324",
          name: "丁青县"
        },
        {
          code: "540325",
          name: "察雅县"
        },
        {
          code: "540326",
          name: "八宿县"
        },
        {
          code: "540327",
          name: "左贡县"
        },
        {
          code: "540328",
          name: "芒康县"
        },
        {
          code: "540329",
          name: "洛隆县"
        },
        {
          code: "540330",
          name: "边坝县"
        }
      ],
      [
        {
          code: "540402",
          name: "巴宜区"
        },
        {
          code: "540421",
          name: "工布江达县"
        },
        {
          code: "540422",
          name: "米林县"
        },
        {
          code: "540423",
          name: "墨脱县"
        },
        {
          code: "540424",
          name: "波密县"
        },
        {
          code: "540425",
          name: "察隅县"
        },
        {
          code: "540426",
          name: "朗县"
        }
      ],
      [
        {
          code: "540502",
          name: "乃东区"
        },
        {
          code: "540521",
          name: "扎囊县"
        },
        {
          code: "540522",
          name: "贡嘎县"
        },
        {
          code: "540523",
          name: "桑日县"
        },
        {
          code: "540524",
          name: "琼结县"
        },
        {
          code: "540525",
          name: "曲松县"
        },
        {
          code: "540526",
          name: "措美县"
        },
        {
          code: "540527",
          name: "洛扎县"
        },
        {
          code: "540528",
          name: "加查县"
        },
        {
          code: "540529",
          name: "隆子县"
        },
        {
          code: "540530",
          name: "错那县"
        },
        {
          code: "540531",
          name: "浪卡子县"
        }
      ],
      [
        {
          code: "542421",
          name: "那曲县"
        },
        {
          code: "542422",
          name: "嘉黎县"
        },
        {
          code: "542423",
          name: "比如县"
        },
        {
          code: "542424",
          name: "聂荣县"
        },
        {
          code: "542425",
          name: "安多县"
        },
        {
          code: "542426",
          name: "申扎县"
        },
        {
          code: "542427",
          name: "索县"
        },
        {
          code: "542428",
          name: "班戈县"
        },
        {
          code: "542429",
          name: "巴青县"
        },
        {
          code: "542430",
          name: "尼玛县"
        },
        {
          code: "542431",
          name: "双湖县"
        }
      ],
      [
        {
          code: "542521",
          name: "普兰县"
        },
        {
          code: "542522",
          name: "札达县"
        },
        {
          code: "542523",
          name: "噶尔县"
        },
        {
          code: "542524",
          name: "日土县"
        },
        {
          code: "542525",
          name: "革吉县"
        },
        {
          code: "542526",
          name: "改则县"
        },
        {
          code: "542527",
          name: "措勤县"
        }
      ]
    ],
    [
      [
        {
          code: "610102",
          name: "新城区"
        },
        {
          code: "610103",
          name: "碑林区"
        },
        {
          code: "610104",
          name: "莲湖区"
        },
        {
          code: "610111",
          name: "灞桥区"
        },
        {
          code: "610112",
          name: "未央区"
        },
        {
          code: "610113",
          name: "雁塔区"
        },
        {
          code: "610114",
          name: "阎良区"
        },
        {
          code: "610115",
          name: "临潼区"
        },
        {
          code: "610116",
          name: "长安区"
        },
        {
          code: "610117",
          name: "高陵区"
        },
        {
          code: "610118",
          name: "鄠邑区"
        },
        {
          code: "610122",
          name: "蓝田县"
        },
        {
          code: "610124",
          name: "周至县"
        }
      ],
      [
        {
          code: "610202",
          name: "王益区"
        },
        {
          code: "610203",
          name: "印台区"
        },
        {
          code: "610204",
          name: "耀州区"
        },
        {
          code: "610222",
          name: "宜君县"
        }
      ],
      [
        {
          code: "610302",
          name: "渭滨区"
        },
        {
          code: "610303",
          name: "金台区"
        },
        {
          code: "610304",
          name: "陈仓区"
        },
        {
          code: "610305",
          name: "凤翔区"
        },
        {
          code: "610323",
          name: "岐山县"
        },
        {
          code: "610324",
          name: "扶风县"
        },
        {
          code: "610326",
          name: "眉县"
        },
        {
          code: "610327",
          name: "陇县"
        },
        {
          code: "610328",
          name: "千阳县"
        },
        {
          code: "610329",
          name: "麟游县"
        },
        {
          code: "610330",
          name: "凤县"
        },
        {
          code: "610331",
          name: "太白县"
        }
      ],
      [
        {
          code: "610402",
          name: "秦都区"
        },
        {
          code: "610403",
          name: "杨陵区"
        },
        {
          code: "610404",
          name: "渭城区"
        },
        {
          code: "610422",
          name: "三原县"
        },
        {
          code: "610423",
          name: "泾阳县"
        },
        {
          code: "610424",
          name: "乾县"
        },
        {
          code: "610425",
          name: "礼泉县"
        },
        {
          code: "610426",
          name: "永寿县"
        },
        {
          code: "610427",
          name: "彬州市"
        },
        {
          code: "610428",
          name: "长武县"
        },
        {
          code: "610429",
          name: "旬邑县"
        },
        {
          code: "610430",
          name: "淳化县"
        },
        {
          code: "610431",
          name: "武功县"
        },
        {
          code: "610481",
          name: "兴平市"
        }
      ],
      [
        {
          code: "610502",
          name: "临渭区"
        },
        {
          code: "610503",
          name: "华州区"
        },
        {
          code: "610522",
          name: "潼关县"
        },
        {
          code: "610523",
          name: "大荔县"
        },
        {
          code: "610524",
          name: "合阳县"
        },
        {
          code: "610525",
          name: "澄城县"
        },
        {
          code: "610526",
          name: "蒲城县"
        },
        {
          code: "610527",
          name: "白水县"
        },
        {
          code: "610528",
          name: "富平县"
        },
        {
          code: "610581",
          name: "韩城市"
        },
        {
          code: "610582",
          name: "华阴市"
        }
      ],
      [
        {
          code: "610602",
          name: "宝塔区"
        },
        {
          code: "610603",
          name: "安塞区"
        },
        {
          code: "610621",
          name: "延长县"
        },
        {
          code: "610622",
          name: "延川县"
        },
        {
          code: "610623",
          name: "子长县"
        },
        {
          code: "610625",
          name: "志丹县"
        },
        {
          code: "610626",
          name: "吴起县"
        },
        {
          code: "610627",
          name: "甘泉县"
        },
        {
          code: "610628",
          name: "富县"
        },
        {
          code: "610629",
          name: "洛川县"
        },
        {
          code: "610630",
          name: "宜川县"
        },
        {
          code: "610631",
          name: "黄龙县"
        },
        {
          code: "610632",
          name: "黄陵县"
        }
      ],
      [
        {
          code: "610702",
          name: "汉台区"
        },
        {
          code: "610703",
          name: "南郑区"
        },
        {
          code: "610722",
          name: "城固县"
        },
        {
          code: "610723",
          name: "洋县"
        },
        {
          code: "610724",
          name: "西乡县"
        },
        {
          code: "610725",
          name: "勉县"
        },
        {
          code: "610726",
          name: "宁强县"
        },
        {
          code: "610727",
          name: "略阳县"
        },
        {
          code: "610728",
          name: "镇巴县"
        },
        {
          code: "610729",
          name: "留坝县"
        },
        {
          code: "610730",
          name: "佛坪县"
        }
      ],
      [
        {
          code: "610802",
          name: "榆阳区"
        },
        {
          code: "610803",
          name: "横山区"
        },
        {
          code: "610822",
          name: "府谷县"
        },
        {
          code: "610824",
          name: "靖边县"
        },
        {
          code: "610825",
          name: "定边县"
        },
        {
          code: "610826",
          name: "绥德县"
        },
        {
          code: "610827",
          name: "米脂县"
        },
        {
          code: "610828",
          name: "佳县"
        },
        {
          code: "610829",
          name: "吴堡县"
        },
        {
          code: "610830",
          name: "清涧县"
        },
        {
          code: "610831",
          name: "子洲县"
        },
        {
          code: "610881",
          name: "神木市"
        }
      ],
      [
        {
          code: "610902",
          name: "汉滨区"
        },
        {
          code: "610921",
          name: "汉阴县"
        },
        {
          code: "610922",
          name: "石泉县"
        },
        {
          code: "610923",
          name: "宁陕县"
        },
        {
          code: "610924",
          name: "紫阳县"
        },
        {
          code: "610925",
          name: "岚皋县"
        },
        {
          code: "610926",
          name: "平利县"
        },
        {
          code: "610927",
          name: "镇坪县"
        },
        {
          code: "610929",
          name: "白河县"
        },
        {
          code: "610981",
          name: "旬阳市"
        }
      ],
      [
        {
          code: "611002",
          name: "商州区"
        },
        {
          code: "611021",
          name: "洛南县"
        },
        {
          code: "611022",
          name: "丹凤县"
        },
        {
          code: "611023",
          name: "商南县"
        },
        {
          code: "611024",
          name: "山阳县"
        },
        {
          code: "611025",
          name: "镇安县"
        },
        {
          code: "611026",
          name: "柞水县"
        }
      ]
    ],
    [
      [
        {
          code: "620102",
          name: "城关区"
        },
        {
          code: "620103",
          name: "七里河区"
        },
        {
          code: "620104",
          name: "西固区"
        },
        {
          code: "620105",
          name: "安宁区"
        },
        {
          code: "620111",
          name: "红古区"
        },
        {
          code: "620121",
          name: "永登县"
        },
        {
          code: "620122",
          name: "皋兰县"
        },
        {
          code: "620123",
          name: "榆中县"
        }
      ],
      [
        {
          code: "620201",
          name: "雄关区"
        },
        {
          code: "620202",
          name: "镜铁区"
        },
        {
          code: "620203",
          name: "长城区"
        }
      ],
      [
        {
          code: "620302",
          name: "金川区"
        },
        {
          code: "620321",
          name: "永昌县"
        }
      ],
      [
        {
          code: "620402",
          name: "白银区"
        },
        {
          code: "620403",
          name: "平川区"
        },
        {
          code: "620421",
          name: "靖远县"
        },
        {
          code: "620422",
          name: "会宁县"
        },
        {
          code: "620423",
          name: "景泰县"
        }
      ],
      [
        {
          code: "620502",
          name: "秦州区"
        },
        {
          code: "620503",
          name: "麦积区"
        },
        {
          code: "620521",
          name: "清水县"
        },
        {
          code: "620522",
          name: "秦安县"
        },
        {
          code: "620523",
          name: "甘谷县"
        },
        {
          code: "620524",
          name: "武山县"
        },
        {
          code: "620525",
          name: "张家川回族自治县"
        }
      ],
      [
        {
          code: "620602",
          name: "凉州区"
        },
        {
          code: "620621",
          name: "民勤县"
        },
        {
          code: "620622",
          name: "古浪县"
        },
        {
          code: "620623",
          name: "天祝藏族自治县"
        }
      ],
      [
        {
          code: "620702",
          name: "甘州区"
        },
        {
          code: "620721",
          name: "肃南裕固族自治县"
        },
        {
          code: "620722",
          name: "民乐县"
        },
        {
          code: "620723",
          name: "临泽县"
        },
        {
          code: "620724",
          name: "高台县"
        },
        {
          code: "620725",
          name: "山丹县"
        }
      ],
      [
        {
          code: "620802",
          name: "崆峒区"
        },
        {
          code: "620821",
          name: "泾川县"
        },
        {
          code: "620822",
          name: "灵台县"
        },
        {
          code: "620823",
          name: "崇信县"
        },
        {
          code: "620824",
          name: "华亭县"
        },
        {
          code: "620825",
          name: "庄浪县"
        },
        {
          code: "620826",
          name: "静宁县"
        }
      ],
      [
        {
          code: "620902",
          name: "肃州区"
        },
        {
          code: "620921",
          name: "金塔县"
        },
        {
          code: "620922",
          name: "瓜州县"
        },
        {
          code: "620923",
          name: "肃北蒙古族自治县"
        },
        {
          code: "620924",
          name: "阿克塞哈萨克族自治县"
        },
        {
          code: "620981",
          name: "玉门市"
        },
        {
          code: "620982",
          name: "敦煌市"
        }
      ],
      [
        {
          code: "621002",
          name: "西峰区"
        },
        {
          code: "621021",
          name: "庆城县"
        },
        {
          code: "621022",
          name: "环县"
        },
        {
          code: "621023",
          name: "华池县"
        },
        {
          code: "621024",
          name: "合水县"
        },
        {
          code: "621025",
          name: "正宁县"
        },
        {
          code: "621026",
          name: "宁县"
        },
        {
          code: "621027",
          name: "镇原县"
        }
      ],
      [
        {
          code: "621102",
          name: "安定区"
        },
        {
          code: "621121",
          name: "通渭县"
        },
        {
          code: "621122",
          name: "陇西县"
        },
        {
          code: "621123",
          name: "渭源县"
        },
        {
          code: "621124",
          name: "临洮县"
        },
        {
          code: "621125",
          name: "漳县"
        },
        {
          code: "621126",
          name: "岷县"
        }
      ],
      [
        {
          code: "621202",
          name: "武都区"
        },
        {
          code: "621221",
          name: "成县"
        },
        {
          code: "621222",
          name: "文县"
        },
        {
          code: "621223",
          name: "宕昌县"
        },
        {
          code: "621224",
          name: "康县"
        },
        {
          code: "621225",
          name: "西和县"
        },
        {
          code: "621226",
          name: "礼县"
        },
        {
          code: "621227",
          name: "徽县"
        },
        {
          code: "621228",
          name: "两当县"
        }
      ],
      [
        {
          code: "622901",
          name: "临夏市"
        },
        {
          code: "622921",
          name: "临夏县"
        },
        {
          code: "622922",
          name: "康乐县"
        },
        {
          code: "622923",
          name: "永靖县"
        },
        {
          code: "622924",
          name: "广河县"
        },
        {
          code: "622925",
          name: "和政县"
        },
        {
          code: "622926",
          name: "东乡族自治县"
        },
        {
          code: "622927",
          name: "积石山保安族东乡族撒拉族自治县"
        }
      ],
      [
        {
          code: "623001",
          name: "合作市"
        },
        {
          code: "623021",
          name: "临潭县"
        },
        {
          code: "623022",
          name: "卓尼县"
        },
        {
          code: "623023",
          name: "舟曲县"
        },
        {
          code: "623024",
          name: "迭部县"
        },
        {
          code: "623025",
          name: "玛曲县"
        },
        {
          code: "623026",
          name: "碌曲县"
        },
        {
          code: "623027",
          name: "夏河县"
        }
      ]
    ],
    [
      [
        {
          code: "630102",
          name: "城东区"
        },
        {
          code: "630103",
          name: "城中区"
        },
        {
          code: "630104",
          name: "城西区"
        },
        {
          code: "630105",
          name: "城北区"
        },
        {
          code: "630121",
          name: "大通回族土族自治县"
        },
        {
          code: "630122",
          name: "湟中县"
        },
        {
          code: "630123",
          name: "湟源县"
        }
      ],
      [
        {
          code: "630202",
          name: "乐都区"
        },
        {
          code: "630203",
          name: "平安区"
        },
        {
          code: "630222",
          name: "民和回族土族自治县"
        },
        {
          code: "630223",
          name: "互助土族自治县"
        },
        {
          code: "630224",
          name: "化隆回族自治县"
        },
        {
          code: "630225",
          name: "循化撒拉族自治县"
        }
      ],
      [
        {
          code: "632221",
          name: "门源回族自治县"
        },
        {
          code: "632222",
          name: "祁连县"
        },
        {
          code: "632223",
          name: "海晏县"
        },
        {
          code: "632224",
          name: "刚察县"
        }
      ],
      [
        {
          code: "632321",
          name: "同仁县"
        },
        {
          code: "632322",
          name: "尖扎县"
        },
        {
          code: "632323",
          name: "泽库县"
        },
        {
          code: "632324",
          name: "河南蒙古族自治县"
        }
      ],
      [
        {
          code: "632521",
          name: "共和县"
        },
        {
          code: "632522",
          name: "同德县"
        },
        {
          code: "632523",
          name: "贵德县"
        },
        {
          code: "632524",
          name: "兴海县"
        },
        {
          code: "632525",
          name: "贵南县"
        }
      ],
      [
        {
          code: "632621",
          name: "玛沁县"
        },
        {
          code: "632622",
          name: "班玛县"
        },
        {
          code: "632623",
          name: "甘德县"
        },
        {
          code: "632624",
          name: "达日县"
        },
        {
          code: "632625",
          name: "久治县"
        },
        {
          code: "632626",
          name: "玛多县"
        }
      ],
      [
        {
          code: "632701",
          name: "玉树市"
        },
        {
          code: "632722",
          name: "杂多县"
        },
        {
          code: "632723",
          name: "称多县"
        },
        {
          code: "632724",
          name: "治多县"
        },
        {
          code: "632725",
          name: "囊谦县"
        },
        {
          code: "632726",
          name: "曲麻莱县"
        }
      ],
      [
        {
          code: "632801",
          name: "格尔木市"
        },
        {
          code: "632802",
          name: "德令哈市"
        },
        {
          code: "632821",
          name: "乌兰县"
        },
        {
          code: "632822",
          name: "都兰县"
        },
        {
          code: "632823",
          name: "天峻县"
        },
        {
          code: "632824",
          name: "冷湖行政委员会"
        },
        {
          code: "632825",
          name: "大柴旦行政委员会"
        },
        {
          code: "632826",
          name: "茫崖行政委员会"
        }
      ]
    ],
    [
      [
        {
          code: "640104",
          name: "兴庆区"
        },
        {
          code: "640105",
          name: "西夏区"
        },
        {
          code: "640106",
          name: "金凤区"
        },
        {
          code: "640121",
          name: "永宁县"
        },
        {
          code: "640122",
          name: "贺兰县"
        },
        {
          code: "640181",
          name: "灵武市"
        }
      ],
      [
        {
          code: "640202",
          name: "大武口区"
        },
        {
          code: "640205",
          name: "惠农区"
        },
        {
          code: "640221",
          name: "平罗县"
        }
      ],
      [
        {
          code: "640302",
          name: "利通区"
        },
        {
          code: "640303",
          name: "红寺堡区"
        },
        {
          code: "640323",
          name: "盐池县"
        },
        {
          code: "640324",
          name: "同心县"
        },
        {
          code: "640381",
          name: "青铜峡市"
        }
      ],
      [
        {
          code: "640402",
          name: "原州区"
        },
        {
          code: "640422",
          name: "西吉县"
        },
        {
          code: "640423",
          name: "隆德县"
        },
        {
          code: "640424",
          name: "泾源县"
        },
        {
          code: "640425",
          name: "彭阳县"
        }
      ],
      [
        {
          code: "640502",
          name: "沙坡头区"
        },
        {
          code: "640521",
          name: "中宁县"
        },
        {
          code: "640522",
          name: "海原县"
        }
      ]
    ],
    [
      [
        {
          code: "650102",
          name: "天山区"
        },
        {
          code: "650103",
          name: "沙依巴克区"
        },
        {
          code: "650104",
          name: "新市区"
        },
        {
          code: "650105",
          name: "水磨沟区"
        },
        {
          code: "650106",
          name: "头屯河区"
        },
        {
          code: "650107",
          name: "达坂城区"
        },
        {
          code: "650109",
          name: "米东区"
        },
        {
          code: "650121",
          name: "乌鲁木齐县"
        }
      ],
      [
        {
          code: "650202",
          name: "独山子区"
        },
        {
          code: "650203",
          name: "克拉玛依区"
        },
        {
          code: "650204",
          name: "白碱滩区"
        },
        {
          code: "650205",
          name: "乌尔禾区"
        }
      ],
      [
        {
          code: "650402",
          name: "高昌区"
        },
        {
          code: "650421",
          name: "鄯善县"
        },
        {
          code: "650422",
          name: "托克逊县"
        }
      ],
      [
        {
          code: "650502",
          name: "伊州区"
        },
        {
          code: "650521",
          name: "巴里坤哈萨克自治县"
        },
        {
          code: "650522",
          name: "伊吾县"
        }
      ],
      [
        {
          code: "652301",
          name: "昌吉市"
        },
        {
          code: "652302",
          name: "阜康市"
        },
        {
          code: "652323",
          name: "呼图壁县"
        },
        {
          code: "652324",
          name: "玛纳斯县"
        },
        {
          code: "652325",
          name: "奇台县"
        },
        {
          code: "652327",
          name: "吉木萨尔县"
        },
        {
          code: "652328",
          name: "木垒哈萨克自治县"
        }
      ],
      [
        {
          code: "652701",
          name: "博乐市"
        },
        {
          code: "652702",
          name: "阿拉山口市"
        },
        {
          code: "652722",
          name: "精河县"
        },
        {
          code: "652723",
          name: "温泉县"
        }
      ],
      [
        {
          code: "652801",
          name: "库尔勒市"
        },
        {
          code: "652822",
          name: "轮台县"
        },
        {
          code: "652823",
          name: "尉犁县"
        },
        {
          code: "652824",
          name: "若羌县"
        },
        {
          code: "652825",
          name: "且末县"
        },
        {
          code: "652826",
          name: "焉耆回族自治县"
        },
        {
          code: "652827",
          name: "和静县"
        },
        {
          code: "652828",
          name: "和硕县"
        },
        {
          code: "652829",
          name: "博湖县"
        }
      ],
      [
        {
          code: "652901",
          name: "阿克苏市"
        },
        {
          code: "652922",
          name: "温宿县"
        },
        {
          code: "652923",
          name: "库车县"
        },
        {
          code: "652924",
          name: "沙雅县"
        },
        {
          code: "652925",
          name: "新和县"
        },
        {
          code: "652926",
          name: "拜城县"
        },
        {
          code: "652927",
          name: "乌什县"
        },
        {
          code: "652928",
          name: "阿瓦提县"
        },
        {
          code: "652929",
          name: "柯坪县"
        }
      ],
      [
        {
          code: "653001",
          name: "阿图什市"
        },
        {
          code: "653022",
          name: "阿克陶县"
        },
        {
          code: "653023",
          name: "阿合奇县"
        },
        {
          code: "653024",
          name: "乌恰县"
        }
      ],
      [
        {
          code: "653101",
          name: "喀什市"
        },
        {
          code: "653121",
          name: "疏附县"
        },
        {
          code: "653122",
          name: "疏勒县"
        },
        {
          code: "653123",
          name: "英吉沙县"
        },
        {
          code: "653124",
          name: "泽普县"
        },
        {
          code: "653125",
          name: "莎车县"
        },
        {
          code: "653126",
          name: "叶城县"
        },
        {
          code: "653127",
          name: "麦盖提县"
        },
        {
          code: "653128",
          name: "岳普湖县"
        },
        {
          code: "653129",
          name: "伽师县"
        },
        {
          code: "653130",
          name: "巴楚县"
        },
        {
          code: "653131",
          name: "塔什库尔干塔吉克自治县"
        }
      ],
      [
        {
          code: "653201",
          name: "和田市"
        },
        {
          code: "653221",
          name: "和田县"
        },
        {
          code: "653222",
          name: "墨玉县"
        },
        {
          code: "653223",
          name: "皮山县"
        },
        {
          code: "653224",
          name: "洛浦县"
        },
        {
          code: "653225",
          name: "策勒县"
        },
        {
          code: "653226",
          name: "于田县"
        },
        {
          code: "653227",
          name: "民丰县"
        }
      ],
      [
        {
          code: "654002",
          name: "伊宁市"
        },
        {
          code: "654003",
          name: "奎屯市"
        },
        {
          code: "654004",
          name: "霍尔果斯市"
        },
        {
          code: "654021",
          name: "伊宁县"
        },
        {
          code: "654022",
          name: "察布查尔锡伯自治县"
        },
        {
          code: "654023",
          name: "霍城县"
        },
        {
          code: "654024",
          name: "巩留县"
        },
        {
          code: "654025",
          name: "新源县"
        },
        {
          code: "654026",
          name: "昭苏县"
        },
        {
          code: "654027",
          name: "特克斯县"
        },
        {
          code: "654028",
          name: "尼勒克县"
        }
      ],
      [
        {
          code: "654201",
          name: "塔城市"
        },
        {
          code: "654202",
          name: "乌苏市"
        },
        {
          code: "654203",
          name: "沙湾市"
        },
        {
          code: "654221",
          name: "额敏县"
        },
        {
          code: "654224",
          name: "托里县"
        },
        {
          code: "654225",
          name: "裕民县"
        },
        {
          code: "654226",
          name: "和布克赛尔蒙古自治县"
        }
      ],
      [
        {
          code: "654301",
          name: "阿勒泰市"
        },
        {
          code: "654321",
          name: "布尔津县"
        },
        {
          code: "654322",
          name: "富蕴县"
        },
        {
          code: "654323",
          name: "福海县"
        },
        {
          code: "654324",
          name: "哈巴河县"
        },
        {
          code: "654325",
          name: "青河县"
        },
        {
          code: "654326",
          name: "吉木乃县"
        }
      ],
      [
        {
          code: "659001",
          name: "石河子市"
        },
        {
          code: "659002",
          name: "阿拉尔市"
        },
        {
          code: "659003",
          name: "图木舒克市"
        },
        {
          code: "659004",
          name: "五家渠市"
        },
        {
          code: "659005",
          name: "北屯市"
        },
        {
          code: "659006",
          name: "铁门关市"
        },
        {
          code: "659007",
          name: "双河市"
        },
        {
          code: "659008",
          name: "可克达拉市"
        },
        {
          code: "659009",
          name: "昆玉市"
        }
      ]
    ],
    [
      [
        {
          code: "710101",
          name: "中正区"
        },
        {
          code: "710102",
          name: "大同区"
        },
        {
          code: "710103",
          name: "中山区"
        },
        {
          code: "710104",
          name: "松山区"
        },
        {
          code: "710105",
          name: "大安区"
        },
        {
          code: "710106",
          name: "万华区"
        },
        {
          code: "710107",
          name: "信义区"
        },
        {
          code: "710108",
          name: "士林区"
        },
        {
          code: "710109",
          name: "北投区"
        },
        {
          code: "710110",
          name: "内湖区"
        },
        {
          code: "710111",
          name: "南港区"
        },
        {
          code: "710112",
          name: "文山区"
        }
      ],
      [
        {
          code: "710201",
          name: "新兴区"
        },
        {
          code: "710202",
          name: "前金区"
        },
        {
          code: "710203",
          name: "苓雅区"
        },
        {
          code: "710204",
          name: "盐埕区"
        },
        {
          code: "710205",
          name: "鼓山区"
        },
        {
          code: "710206",
          name: "旗津区"
        },
        {
          code: "710207",
          name: "前镇区"
        },
        {
          code: "710208",
          name: "三民区"
        },
        {
          code: "710209",
          name: "左营区"
        },
        {
          code: "710210",
          name: "楠梓区"
        },
        {
          code: "710211",
          name: "小港区"
        },
        {
          code: "710242",
          name: "仁武区"
        },
        {
          code: "710243",
          name: "大社区"
        },
        {
          code: "710244",
          name: "冈山区"
        },
        {
          code: "710245",
          name: "路竹区"
        },
        {
          code: "710246",
          name: "阿莲区"
        },
        {
          code: "710247",
          name: "田寮区"
        },
        {
          code: "710248",
          name: "燕巢区"
        },
        {
          code: "710249",
          name: "桥头区"
        },
        {
          code: "710250",
          name: "梓官区"
        },
        {
          code: "710251",
          name: "弥陀区"
        },
        {
          code: "710252",
          name: "永安区"
        },
        {
          code: "710253",
          name: "湖内区"
        },
        {
          code: "710254",
          name: "凤山区"
        },
        {
          code: "710255",
          name: "大寮区"
        },
        {
          code: "710256",
          name: "林园区"
        },
        {
          code: "710257",
          name: "鸟松区"
        },
        {
          code: "710258",
          name: "大树区"
        },
        {
          code: "710259",
          name: "旗山区"
        },
        {
          code: "710260",
          name: "美浓区"
        },
        {
          code: "710261",
          name: "六龟区"
        },
        {
          code: "710262",
          name: "内门区"
        },
        {
          code: "710263",
          name: "杉林区"
        },
        {
          code: "710264",
          name: "甲仙区"
        },
        {
          code: "710265",
          name: "桃源区"
        },
        {
          code: "710266",
          name: "那玛夏区"
        },
        {
          code: "710267",
          name: "茂林区"
        },
        {
          code: "710268",
          name: "茄萣区"
        }
      ],
      [
        {
          code: "710301",
          name: "中西区"
        },
        {
          code: "710302",
          name: "东区"
        },
        {
          code: "710303",
          name: "南区"
        },
        {
          code: "710304",
          name: "北区"
        },
        {
          code: "710305",
          name: "安平区"
        },
        {
          code: "710306",
          name: "安南区"
        },
        {
          code: "710339",
          name: "永康区"
        },
        {
          code: "710340",
          name: "归仁区"
        },
        {
          code: "710341",
          name: "新化区"
        },
        {
          code: "710342",
          name: "左镇区"
        },
        {
          code: "710343",
          name: "玉井区"
        },
        {
          code: "710344",
          name: "楠西区"
        },
        {
          code: "710345",
          name: "南化区"
        },
        {
          code: "710346",
          name: "仁德区"
        },
        {
          code: "710347",
          name: "关庙区"
        },
        {
          code: "710348",
          name: "龙崎区"
        },
        {
          code: "710349",
          name: "官田区"
        },
        {
          code: "710350",
          name: "麻豆区"
        },
        {
          code: "710351",
          name: "佳里区"
        },
        {
          code: "710352",
          name: "西港区"
        },
        {
          code: "710353",
          name: "七股区"
        },
        {
          code: "710354",
          name: "将军区"
        },
        {
          code: "710355",
          name: "学甲区"
        },
        {
          code: "710356",
          name: "北门区"
        },
        {
          code: "710357",
          name: "新营区"
        },
        {
          code: "710358",
          name: "后壁区"
        },
        {
          code: "710359",
          name: "白河区"
        },
        {
          code: "710360",
          name: "东山区"
        },
        {
          code: "710361",
          name: "六甲区"
        },
        {
          code: "710362",
          name: "下营区"
        },
        {
          code: "710363",
          name: "柳营区"
        },
        {
          code: "710364",
          name: "盐水区"
        },
        {
          code: "710365",
          name: "善化区"
        },
        {
          code: "710366",
          name: "大内区"
        },
        {
          code: "710367",
          name: "山上区"
        },
        {
          code: "710368",
          name: "新市区"
        },
        {
          code: "710369",
          name: "安定区"
        }
      ],
      [
        {
          code: "710401",
          name: "中区"
        },
        {
          code: "710402",
          name: "东区"
        },
        {
          code: "710403",
          name: "南区"
        },
        {
          code: "710404",
          name: "西区"
        },
        {
          code: "710405",
          name: "北区"
        },
        {
          code: "710406",
          name: "北屯区"
        },
        {
          code: "710407",
          name: "西屯区"
        },
        {
          code: "710408",
          name: "南屯区"
        },
        {
          code: "710431",
          name: "太平区"
        },
        {
          code: "710432",
          name: "大里区"
        },
        {
          code: "710433",
          name: "雾峰区"
        },
        {
          code: "710434",
          name: "乌日区"
        },
        {
          code: "710435",
          name: "丰原区"
        },
        {
          code: "710436",
          name: "后里区"
        },
        {
          code: "710437",
          name: "石冈区"
        },
        {
          code: "710438",
          name: "东势区"
        },
        {
          code: "710439",
          name: "和平区"
        },
        {
          code: "710440",
          name: "新社区"
        },
        {
          code: "710441",
          name: "潭子区"
        },
        {
          code: "710442",
          name: "大雅区"
        },
        {
          code: "710443",
          name: "神冈区"
        },
        {
          code: "710444",
          name: "大肚区"
        },
        {
          code: "710445",
          name: "沙鹿区"
        },
        {
          code: "710446",
          name: "龙井区"
        },
        {
          code: "710447",
          name: "梧栖区"
        },
        {
          code: "710448",
          name: "清水区"
        },
        {
          code: "710449",
          name: "大甲区"
        },
        {
          code: "710450",
          name: "外埔区"
        },
        {
          code: "710451",
          name: "大安区"
        }
      ],
      [
        {
          code: "710614",
          name: "南投市"
        },
        {
          code: "710615",
          name: "中寮乡"
        },
        {
          code: "710616",
          name: "草屯镇"
        },
        {
          code: "710617",
          name: "国姓乡"
        },
        {
          code: "710618",
          name: "埔里镇"
        },
        {
          code: "710619",
          name: "仁爱乡"
        },
        {
          code: "710620",
          name: "名间乡"
        },
        {
          code: "710621",
          name: "集集镇"
        },
        {
          code: "710622",
          name: "水里乡"
        },
        {
          code: "710623",
          name: "鱼池乡"
        },
        {
          code: "710624",
          name: "信义乡"
        },
        {
          code: "710625",
          name: "竹山镇"
        },
        {
          code: "710626",
          name: "鹿谷乡"
        }
      ],
      [
        {
          code: "710701",
          name: "仁爱区"
        },
        {
          code: "710702",
          name: "信义区"
        },
        {
          code: "710703",
          name: "中正区"
        },
        {
          code: "710704",
          name: "中山区"
        },
        {
          code: "710705",
          name: "安乐区"
        },
        {
          code: "710706",
          name: "暖暖区"
        },
        {
          code: "710707",
          name: "七堵区"
        }
      ],
      [
        {
          code: "710801",
          name: "东区"
        },
        {
          code: "710802",
          name: "北区"
        },
        {
          code: "710803",
          name: "香山区"
        }
      ],
      [
        {
          code: "710901",
          name: "东区"
        },
        {
          code: "710902",
          name: "西区"
        }
      ],
      [
        {
          code: "711130",
          name: "万里区"
        },
        {
          code: "711131",
          name: "金山区"
        },
        {
          code: "711132",
          name: "板桥区"
        },
        {
          code: "711133",
          name: "汐止区"
        },
        {
          code: "711134",
          name: "深坑区"
        },
        {
          code: "711135",
          name: "石碇区"
        },
        {
          code: "711136",
          name: "瑞芳区"
        },
        {
          code: "711137",
          name: "平溪区"
        },
        {
          code: "711138",
          name: "双溪区"
        },
        {
          code: "711139",
          name: "贡寮区"
        },
        {
          code: "711140",
          name: "新店区"
        },
        {
          code: "711141",
          name: "坪林区"
        },
        {
          code: "711142",
          name: "乌来区"
        },
        {
          code: "711143",
          name: "永和区"
        },
        {
          code: "711144",
          name: "中和区"
        },
        {
          code: "711145",
          name: "土城区"
        },
        {
          code: "711146",
          name: "三峡区"
        },
        {
          code: "711147",
          name: "树林区"
        },
        {
          code: "711148",
          name: "莺歌区"
        },
        {
          code: "711149",
          name: "三重区"
        },
        {
          code: "711150",
          name: "新庄区"
        },
        {
          code: "711151",
          name: "泰山区"
        },
        {
          code: "711152",
          name: "林口区"
        },
        {
          code: "711153",
          name: "芦洲区"
        },
        {
          code: "711154",
          name: "五股区"
        },
        {
          code: "711155",
          name: "八里区"
        },
        {
          code: "711156",
          name: "淡水区"
        },
        {
          code: "711157",
          name: "三芝区"
        },
        {
          code: "711158",
          name: "石门区"
        }
      ],
      [
        {
          code: "711214",
          name: "宜兰市"
        },
        {
          code: "711215",
          name: "头城镇"
        },
        {
          code: "711216",
          name: "礁溪乡"
        },
        {
          code: "711217",
          name: "壮围乡"
        },
        {
          code: "711218",
          name: "员山乡"
        },
        {
          code: "711219",
          name: "罗东镇"
        },
        {
          code: "711220",
          name: "三星乡"
        },
        {
          code: "711221",
          name: "大同乡"
        },
        {
          code: "711222",
          name: "五结乡"
        },
        {
          code: "711223",
          name: "冬山乡"
        },
        {
          code: "711224",
          name: "苏澳镇"
        },
        {
          code: "711225",
          name: "南澳乡"
        }
      ],
      [
        {
          code: "711314",
          name: "竹北市"
        },
        {
          code: "711315",
          name: "湖口乡"
        },
        {
          code: "711316",
          name: "新丰乡"
        },
        {
          code: "711317",
          name: "新埔镇"
        },
        {
          code: "711318",
          name: "关西镇"
        },
        {
          code: "711319",
          name: "芎林乡"
        },
        {
          code: "711320",
          name: "宝山乡"
        },
        {
          code: "711321",
          name: "竹东镇"
        },
        {
          code: "711322",
          name: "五峰乡"
        },
        {
          code: "711323",
          name: "横山乡"
        },
        {
          code: "711324",
          name: "尖石乡"
        },
        {
          code: "711325",
          name: "北埔乡"
        },
        {
          code: "711326",
          name: "峨眉乡"
        }
      ],
      [
        {
          code: "711414",
          name: "中坜区"
        },
        {
          code: "711415",
          name: "平镇区"
        },
        {
          code: "711416",
          name: "龙潭区"
        },
        {
          code: "711417",
          name: "杨梅区"
        },
        {
          code: "711418",
          name: "新屋区"
        },
        {
          code: "711419",
          name: "观音区"
        },
        {
          code: "711420",
          name: "桃园区"
        },
        {
          code: "711421",
          name: "龟山区"
        },
        {
          code: "711422",
          name: "八德区"
        },
        {
          code: "711423",
          name: "大溪区"
        },
        {
          code: "711424",
          name: "复兴区"
        },
        {
          code: "711425",
          name: "大园区"
        },
        {
          code: "711426",
          name: "芦竹区"
        }
      ],
      [
        {
          code: "711519",
          name: "竹南镇"
        },
        {
          code: "711520",
          name: "头份市"
        },
        {
          code: "711521",
          name: "三湾乡"
        },
        {
          code: "711522",
          name: "南庄乡"
        },
        {
          code: "711523",
          name: "狮潭乡"
        },
        {
          code: "711524",
          name: "后龙镇"
        },
        {
          code: "711525",
          name: "通霄镇"
        },
        {
          code: "711526",
          name: "苑里镇"
        },
        {
          code: "711527",
          name: "苗栗市"
        },
        {
          code: "711528",
          name: "造桥乡"
        },
        {
          code: "711529",
          name: "头屋乡"
        },
        {
          code: "711530",
          name: "公馆乡"
        },
        {
          code: "711531",
          name: "大湖乡"
        },
        {
          code: "711532",
          name: "泰安乡"
        },
        {
          code: "711533",
          name: "铜锣乡"
        },
        {
          code: "711534",
          name: "三义乡"
        },
        {
          code: "711535",
          name: "西湖乡"
        },
        {
          code: "711536",
          name: "卓兰镇"
        }
      ],
      [
        {
          code: "711727",
          name: "彰化市"
        },
        {
          code: "711728",
          name: "芬园乡"
        },
        {
          code: "711729",
          name: "花坛乡"
        },
        {
          code: "711730",
          name: "秀水乡"
        },
        {
          code: "711731",
          name: "鹿港镇"
        },
        {
          code: "711732",
          name: "福兴乡"
        },
        {
          code: "711733",
          name: "线西乡"
        },
        {
          code: "711734",
          name: "和美镇"
        },
        {
          code: "711735",
          name: "伸港乡"
        },
        {
          code: "711736",
          name: "员林市"
        },
        {
          code: "711737",
          name: "社头乡"
        },
        {
          code: "711738",
          name: "永靖乡"
        },
        {
          code: "711739",
          name: "埔心乡"
        },
        {
          code: "711740",
          name: "溪湖镇"
        },
        {
          code: "711741",
          name: "大村乡"
        },
        {
          code: "711742",
          name: "埔盐乡"
        },
        {
          code: "711743",
          name: "田中镇"
        },
        {
          code: "711744",
          name: "北斗镇"
        },
        {
          code: "711745",
          name: "田尾乡"
        },
        {
          code: "711746",
          name: "埤头乡"
        },
        {
          code: "711747",
          name: "溪州乡"
        },
        {
          code: "711748",
          name: "竹塘乡"
        },
        {
          code: "711749",
          name: "二林镇"
        },
        {
          code: "711750",
          name: "大城乡"
        },
        {
          code: "711751",
          name: "芳苑乡"
        },
        {
          code: "711752",
          name: "二水乡"
        }
      ],
      [
        {
          code: "711919",
          name: "番路乡"
        },
        {
          code: "711920",
          name: "梅山乡"
        },
        {
          code: "711921",
          name: "竹崎乡"
        },
        {
          code: "711922",
          name: "阿里山乡"
        },
        {
          code: "711923",
          name: "中埔乡"
        },
        {
          code: "711924",
          name: "大埔乡"
        },
        {
          code: "711925",
          name: "水上乡"
        },
        {
          code: "711926",
          name: "鹿草乡"
        },
        {
          code: "711927",
          name: "太保市"
        },
        {
          code: "711928",
          name: "朴子市"
        },
        {
          code: "711929",
          name: "东石乡"
        },
        {
          code: "711930",
          name: "六脚乡"
        },
        {
          code: "711931",
          name: "新港乡"
        },
        {
          code: "711932",
          name: "民雄乡"
        },
        {
          code: "711933",
          name: "大林镇"
        },
        {
          code: "711934",
          name: "溪口乡"
        },
        {
          code: "711935",
          name: "义竹乡"
        },
        {
          code: "711936",
          name: "布袋镇"
        }
      ],
      [
        {
          code: "712121",
          name: "斗南镇"
        },
        {
          code: "712122",
          name: "大埤乡"
        },
        {
          code: "712123",
          name: "虎尾镇"
        },
        {
          code: "712124",
          name: "土库镇"
        },
        {
          code: "712125",
          name: "褒忠乡"
        },
        {
          code: "712126",
          name: "东势乡"
        },
        {
          code: "712127",
          name: "台西乡"
        },
        {
          code: "712128",
          name: "仑背乡"
        },
        {
          code: "712129",
          name: "麦寮乡"
        },
        {
          code: "712130",
          name: "斗六市"
        },
        {
          code: "712131",
          name: "林内乡"
        },
        {
          code: "712132",
          name: "古坑乡"
        },
        {
          code: "712133",
          name: "莿桐乡"
        },
        {
          code: "712134",
          name: "西螺镇"
        },
        {
          code: "712135",
          name: "二仑乡"
        },
        {
          code: "712136",
          name: "北港镇"
        },
        {
          code: "712137",
          name: "水林乡"
        },
        {
          code: "712138",
          name: "口湖乡"
        },
        {
          code: "712139",
          name: "四湖乡"
        },
        {
          code: "712140",
          name: "元长乡"
        }
      ],
      [
        {
          code: "712434",
          name: "屏东市"
        },
        {
          code: "712435",
          name: "三地门乡"
        },
        {
          code: "712436",
          name: "雾台乡"
        },
        {
          code: "712437",
          name: "玛家乡"
        },
        {
          code: "712438",
          name: "九如乡"
        },
        {
          code: "712439",
          name: "里港乡"
        },
        {
          code: "712440",
          name: "高树乡"
        },
        {
          code: "712441",
          name: "盐埔乡"
        },
        {
          code: "712442",
          name: "长治乡"
        },
        {
          code: "712443",
          name: "麟洛乡"
        },
        {
          code: "712444",
          name: "竹田乡"
        },
        {
          code: "712445",
          name: "内埔乡"
        },
        {
          code: "712446",
          name: "万丹乡"
        },
        {
          code: "712447",
          name: "潮州镇"
        },
        {
          code: "712448",
          name: "泰武乡"
        },
        {
          code: "712449",
          name: "来义乡"
        },
        {
          code: "712450",
          name: "万峦乡"
        },
        {
          code: "712451",
          name: "崁顶乡"
        },
        {
          code: "712452",
          name: "新埤乡"
        },
        {
          code: "712453",
          name: "南州乡"
        },
        {
          code: "712454",
          name: "林边乡"
        },
        {
          code: "712455",
          name: "东港镇"
        },
        {
          code: "712456",
          name: "琉球乡"
        },
        {
          code: "712457",
          name: "佳冬乡"
        },
        {
          code: "712458",
          name: "新园乡"
        },
        {
          code: "712459",
          name: "枋寮乡"
        },
        {
          code: "712460",
          name: "枋山乡"
        },
        {
          code: "712461",
          name: "春日乡"
        },
        {
          code: "712462",
          name: "狮子乡"
        },
        {
          code: "712463",
          name: "车城乡"
        },
        {
          code: "712464",
          name: "牡丹乡"
        },
        {
          code: "712465",
          name: "恒春镇"
        },
        {
          code: "712466",
          name: "满州乡"
        }
      ],
      [
        {
          code: "712517",
          name: "台东市"
        },
        {
          code: "712518",
          name: "绿岛乡"
        },
        {
          code: "712519",
          name: "兰屿乡"
        },
        {
          code: "712520",
          name: "延平乡"
        },
        {
          code: "712521",
          name: "卑南乡"
        },
        {
          code: "712522",
          name: "鹿野乡"
        },
        {
          code: "712523",
          name: "关山镇"
        },
        {
          code: "712524",
          name: "海端乡"
        },
        {
          code: "712525",
          name: "池上乡"
        },
        {
          code: "712526",
          name: "东河乡"
        },
        {
          code: "712527",
          name: "成功镇"
        },
        {
          code: "712528",
          name: "长滨乡"
        },
        {
          code: "712529",
          name: "金峰乡"
        },
        {
          code: "712530",
          name: "大武乡"
        },
        {
          code: "712531",
          name: "达仁乡"
        },
        {
          code: "712532",
          name: "太麻里乡"
        }
      ],
      [
        {
          code: "712615",
          name: "花莲市"
        },
        {
          code: "712616",
          name: "新城乡"
        },
        {
          code: "712618",
          name: "秀林乡"
        },
        {
          code: "712619",
          name: "吉安乡"
        },
        {
          code: "712620",
          name: "寿丰乡"
        },
        {
          code: "712621",
          name: "凤林镇"
        },
        {
          code: "712622",
          name: "光复乡"
        },
        {
          code: "712623",
          name: "丰滨乡"
        },
        {
          code: "712624",
          name: "瑞穗乡"
        },
        {
          code: "712625",
          name: "万荣乡"
        },
        {
          code: "712626",
          name: "玉里镇"
        },
        {
          code: "712627",
          name: "卓溪乡"
        },
        {
          code: "712628",
          name: "富里乡"
        }
      ],
      [
        {
          code: "712707",
          name: "马公市"
        },
        {
          code: "712708",
          name: "西屿乡"
        },
        {
          code: "712709",
          name: "望安乡"
        },
        {
          code: "712710",
          name: "七美乡"
        },
        {
          code: "712711",
          name: "白沙乡"
        },
        {
          code: "712712",
          name: "湖西乡"
        }
      ]
    ],
    [
      [
        {
          code: "810101",
          name: "中西区"
        },
        {
          code: "810102",
          name: "东区"
        },
        {
          code: "810103",
          name: "九龙城区"
        },
        {
          code: "810104",
          name: "观塘区"
        },
        {
          code: "810105",
          name: "南区"
        },
        {
          code: "810106",
          name: "深水埗区"
        },
        {
          code: "810107",
          name: "湾仔区"
        },
        {
          code: "810108",
          name: "黄大仙区"
        },
        {
          code: "810109",
          name: "油尖旺区"
        },
        {
          code: "810110",
          name: "离岛区"
        },
        {
          code: "810111",
          name: "葵青区"
        },
        {
          code: "810112",
          name: "北区"
        },
        {
          code: "810113",
          name: "西贡区"
        },
        {
          code: "810114",
          name: "沙田区"
        },
        {
          code: "810115",
          name: "屯门区"
        },
        {
          code: "810116",
          name: "大埔区"
        },
        {
          code: "810117",
          name: "荃湾区"
        },
        {
          code: "810118",
          name: "元朗区"
        }
      ]
    ],
    [
      [
        {
          code: "820101",
          name: "澳门半岛"
        },
        {
          code: "820102",
          name: "凼仔"
        },
        {
          code: "820103",
          name: "路凼城"
        },
        {
          code: "820104",
          name: "路环"
        }
      ]
    ]
  ];
  const _sfc_main$l = {
    name: "u-picker",
    emits: ["update:modelValue", "input", "confirm", "cancel", "close"],
    props: {
      // 通过双向绑定控制组件的弹出与收起
      value: {
        type: Boolean,
        default: false
      },
      item: {
        type: Object
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      // picker中需要显示的参数
      params: {
        type: Object,
        default() {
          return {
            year: true,
            month: true,
            day: true,
            hour: false,
            minute: false,
            second: false,
            province: true,
            city: true,
            area: true,
            timestamp: true
          };
        }
      },
      // 当mode=selector或者mode=multiSelector时，提供的数组
      range: {
        type: Array,
        default() {
          return [];
        }
      },
      // 当mode=selector或者mode=multiSelector时，提供的默认选中的下标
      defaultSelector: {
        type: Array,
        default() {
          return [0];
        }
      },
      // 当 range 是一个 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
      rangeKey: {
        type: String,
        default: ""
      },
      // 模式选择，region-地区类型，time-时间类型，selector-单列模式，multiSelector-多列模式
      mode: {
        type: String,
        default: "time"
      },
      // 年份开始时间
      startYear: {
        type: [String, Number],
        default: 1950
      },
      // 年份结束时间
      endYear: {
        type: [String, Number],
        default: 2050
      },
      // "取消"按钮的颜色
      cancelColor: {
        type: String,
        default: "#606266"
      },
      // "确定"按钮的颜色
      confirmColor: {
        type: String,
        default: "#2979ff"
      },
      // 默认显示的时间，2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02
      defaultTime: {
        type: String,
        default: ""
      },
      // 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
      defaultRegion: {
        type: Array,
        default() {
          return [];
        }
      },
      // 时间模式时，是否显示后面的年月日中文提示
      showTimeTag: {
        type: Boolean,
        default: true
      },
      // 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
      areaCode: {
        type: Array,
        default() {
          return [];
        }
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否允许通过点击遮罩关闭Picker
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 弹出的z-index值
      zIndex: {
        type: [String, Number],
        default: 0
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 遮罩的模糊度
      blur: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        popupValue: false,
        years: [],
        months: [],
        days: [],
        hours: [],
        minutes: [],
        seconds: [],
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        reset: false,
        startDate: "",
        endDate: "",
        valueArr: [],
        provinces,
        citys: citys[0],
        areas: areas[0][0],
        province: 0,
        city: 0,
        area: 0,
        moving: false,
        // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
        isInit: true
      };
    },
    mounted() {
      this.init();
      setTimeout(() => {
        this.isInit = false;
      }, 1e3);
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      propsChange() {
        let {
          mode,
          defaultTime,
          startYear,
          endYear,
          defaultRegion,
          areaCode,
          defaultSelector
        } = this;
        return JSON.stringify({
          mode,
          defaultTime,
          startYear,
          endYear,
          defaultRegion,
          areaCode,
          defaultSelector
        });
      },
      regionChange() {
        return `${this.province}-${this.city}`;
      },
      yearAndMonth() {
        return `${this.year}-${this.month}`;
      },
      uZIndex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      },
      // 用来兼容小程序、App、h5
      showColumnCom() {
        return true;
      }
    },
    watch: {
      propsChange() {
        this.reset = true;
        setTimeout(() => this.init(), 10);
      },
      // 如果地区发生变化，为了让picker联动起来，必须重置this.citys和this.areas
      regionChange(val) {
        this.citys = citys[this.province];
        this.areas = areas[this.province][this.city];
      },
      // watch监听月份的变化，实时变更日的天数，因为不同月份，天数不一样
      // 一个月可能有30，31天，甚至闰年2月的29天，平年2月28天
      yearAndMonth(val) {
        if (this.params.year)
          this.setDays();
      },
      // 微信和QQ小程序由于一些奇怪的原因(故同时对所有平台均初始化一遍)，需要重新初始化才能显示正确的值
      valueCom: {
        immediate: true,
        handler(n2) {
          if (n2) {
            this.reset = true;
            setTimeout(() => this.init(), 10);
          }
          this.popupValue = n2;
        }
      }
    },
    methods: {
      // 标识滑动开始，只有微信小程序才有这样的事件
      pickstart() {
      },
      // 标识滑动结束
      pickend() {
      },
      // 对单列和多列形式的判断是否有传入变量的情况
      getItemValue(item, mode) {
        if (this.mode == mode) {
          return typeof item == "object" ? item[this.rangeKey] : item;
        }
      },
      // 小于10前面补0，用于月份，日期，时分秒等
      formatNumber(num) {
        return +num < 10 ? "0" + num : String(num);
      },
      // 生成递进的数组
      generateArray: function(start, end) {
        start = Number(start);
        end = Number(end);
        end = end > start ? end : start;
        return [...Array(end + 1).keys()].slice(start);
      },
      getIndex: function(arr, val) {
        let index = arr.indexOf(val);
        return ~index ? index : 0;
      },
      //日期时间处理
      initTimeValue() {
        let fdate = this.defaultTime.replace(/\-/g, "/");
        fdate = fdate && fdate.indexOf("/") == -1 ? `2020/01/01 ${fdate}` : fdate;
        let time = null;
        if (fdate)
          time = new Date(fdate);
        else
          time = /* @__PURE__ */ new Date();
        this.year = time.getFullYear();
        this.month = Number(time.getMonth()) + 1;
        this.day = time.getDate();
        this.hour = time.getHours();
        this.minute = time.getMinutes();
        this.second = time.getSeconds();
      },
      init() {
        this.valueArr = [];
        this.reset = false;
        if (this.mode == "time") {
          this.initTimeValue();
          if (this.params.year) {
            this.valueArr.push(0);
            this.setYears();
          }
          if (this.params.month) {
            this.valueArr.push(0);
            this.setMonths();
          }
          if (this.params.day) {
            this.valueArr.push(0);
            this.setDays();
          }
          if (this.params.hour) {
            this.valueArr.push(0);
            this.setHours();
          }
          if (this.params.minute) {
            this.valueArr.push(0);
            this.setMinutes();
          }
          if (this.params.second) {
            this.valueArr.push(0);
            this.setSeconds();
          }
        } else if (this.mode == "region") {
          if (this.params.province) {
            this.valueArr.push(0);
            this.setProvinces();
          }
          if (this.params.city) {
            this.valueArr.push(0);
            this.setCitys();
          }
          if (this.params.area) {
            this.valueArr.push(0);
            this.setAreas();
          }
        } else if (this.mode == "selector") {
          this.valueArr = this.defaultSelector;
        } else if (this.mode == "multiSelector") {
          this.valueArr = this.defaultSelector;
          this.multiSelectorValue = this.defaultSelector;
        }
        this.$forceUpdate();
      },
      // 设置picker的某一列值
      setYears() {
        this.years = this.generateArray(this.startYear, this.endYear);
        this.valueArr.splice(
          this.valueArr.length - 1,
          1,
          this.getIndex(this.years, this.year)
        );
      },
      setMonths() {
        this.months = this.generateArray(1, 12);
        this.valueArr.splice(
          this.valueArr.length - 1,
          1,
          this.getIndex(this.months, this.month)
        );
      },
      setDays() {
        let totalDays = new Date(this.year, this.month, 0).getDate();
        this.days = this.generateArray(1, totalDays);
        let index = 0;
        if (this.params.year && this.params.month)
          index = 2;
        else if (this.params.month)
          index = 1;
        else if (this.params.year)
          index = 1;
        else
          index = 0;
        if (this.day > this.days.length)
          this.day = this.days.length;
        this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
      },
      setHours() {
        this.hours = this.generateArray(0, 23);
        this.valueArr.splice(
          this.valueArr.length - 1,
          1,
          this.getIndex(this.hours, this.hour)
        );
      },
      setMinutes() {
        this.minutes = this.generateArray(0, 59);
        this.valueArr.splice(
          this.valueArr.length - 1,
          1,
          this.getIndex(this.minutes, this.minute)
        );
      },
      setSeconds() {
        this.seconds = this.generateArray(0, 59);
        this.valueArr.splice(
          this.valueArr.length - 1,
          1,
          this.getIndex(this.seconds, this.second)
        );
      },
      setProvinces() {
        if (!this.params.province)
          return;
        let tmp = "";
        let useCode = false;
        if (this.areaCode.length) {
          tmp = this.areaCode[0];
          useCode = true;
        } else if (this.defaultRegion.length)
          tmp = this.defaultRegion[0];
        else
          tmp = 0;
        provinces.map((v2, k2) => {
          if (useCode ? v2.code == tmp : v2.name == tmp) {
            tmp = k2;
          }
        });
        this.province = tmp;
        this.provinces = provinces;
        this.valueArr.splice(0, 1, this.province);
      },
      setCitys() {
        if (!this.params.city)
          return;
        let tmp = "";
        let useCode = false;
        if (this.areaCode.length) {
          tmp = this.areaCode[1];
          useCode = true;
        } else if (this.defaultRegion.length)
          tmp = this.defaultRegion[1];
        else
          tmp = 0;
        citys[this.province].map((v2, k2) => {
          if (useCode ? v2.code == tmp : v2.name == tmp) {
            tmp = k2;
          }
        });
        this.city = tmp;
        this.citys = citys[this.province];
        this.valueArr.splice(1, 1, this.city);
      },
      setAreas() {
        if (!this.params.area)
          return;
        let tmp = "";
        let useCode = false;
        if (this.areaCode.length) {
          tmp = this.areaCode[2];
          useCode = true;
        } else if (this.defaultRegion.length)
          tmp = this.defaultRegion[2];
        else
          tmp = 0;
        areas[this.province][this.city].map((v2, k2) => {
          if (useCode ? v2.code == tmp : v2.name == tmp) {
            tmp = k2;
          }
        });
        this.area = tmp;
        this.areas = areas[this.province][this.city];
        this.valueArr.splice(2, 1, this.area);
      },
      close() {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
        if (!this.isInit) {
          this.$emit("close", false, this.item);
        }
      },
      // 用户更改picker的列选项
      change(e2) {
        this.valueArr = e2.detail.value;
        let i2 = 0;
        if (this.mode == "time") {
          if (this.params.year)
            this.year = this.years[this.valueArr[i2++]];
          if (this.params.month)
            this.month = this.months[this.valueArr[i2++]];
          if (this.params.day)
            this.day = this.days[this.valueArr[i2++]];
          if (this.params.hour)
            this.hour = this.hours[this.valueArr[i2++]];
          if (this.params.minute)
            this.minute = this.minutes[this.valueArr[i2++]];
          if (this.params.second)
            this.second = this.seconds[this.valueArr[i2++]];
        } else if (this.mode == "region") {
          if (this.params.province)
            this.province = this.valueArr[i2++];
          if (this.params.city)
            this.city = this.valueArr[i2++];
          if (this.params.area)
            this.area = this.valueArr[i2++];
        } else if (this.mode == "multiSelector") {
          let index = null;
          this.defaultSelector.map((val, idx) => {
            if (val != e2.detail.value[idx])
              index = idx;
          });
          if (index != null) {
            this.$emit("columnchange", {
              column: index,
              index: e2.detail.value[index]
            });
          }
        }
      },
      // 用户点击确定按钮
      getResult(event = null) {
        let result = {};
        if (this.mode == "time") {
          if (this.params.year)
            result.year = this.formatNumber(this.year || 0);
          if (this.params.month)
            result.month = this.formatNumber(this.month || 0);
          if (this.params.day)
            result.day = this.formatNumber(this.day || 0);
          if (this.params.hour)
            result.hour = this.formatNumber(this.hour || 0);
          if (this.params.minute)
            result.minute = this.formatNumber(this.minute || 0);
          if (this.params.second)
            result.second = this.formatNumber(this.second || 0);
          if (this.params.timestamp)
            result.timestamp = this.getTimestamp();
        } else if (this.mode == "region") {
          if (this.params.province)
            result.province = provinces[this.province];
          if (this.params.city)
            result.city = citys[this.province][this.city];
          if (this.params.area)
            result.area = areas[this.province][this.city][this.area];
        } else if (this.mode == "selector") {
          result = this.valueArr;
        } else if (this.mode == "multiSelector") {
          result = this.valueArr;
        }
        if (event)
          this.$emit(event, result, this.item);
        this.close();
      },
      // 获取时间戳
      getTimestamp() {
        let time = this.year + "/" + this.month + "/" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
        return new Date(time).getTime() / 1e3;
      },
      // 获得数据源
      getDateSource() {
        return {
          provinces,
          citys,
          areas
        };
      },
      // 智能识别省市区
      regionDiscern(addressText) {
        let address = "";
        let province = {};
        let city = {};
        let area = {};
        if (!addressText)
          return { code: -1, msg: "地址文本不能为空" };
        addressText.trim();
        let firstTwoKey = addressText.substring(0, 2);
        let provinceIndex = -1;
        for (let i2 = 0; i2 < provinces.length; i2++) {
          let { code: code2, name } = provinces[i2];
          if (name.indexOf(firstTwoKey) == 0) {
            province = { code: code2, name };
            provinceIndex = i2;
            break;
          }
        }
        if (provinceIndex == -1)
          return {
            code: -1,
            msg: `省份【${firstTwoKey}】没有找到，请输入正确的地址`
          };
        let citysArr = citys[provinceIndex];
        let cityIndex = -1;
        for (let i2 = 0; i2 < citysArr.length; i2++) {
          let { name, code: code2 } = citysArr[i2];
          let cityName = name.substr(0, name.length - 1);
          if (addressText.indexOf(cityName) > -1) {
            city = { code: code2, name };
            cityIndex = i2;
            break;
          }
        }
        if (cityIndex == -1)
          return { code: -1, msg: `地级市没有找到，请输入正确的地址` };
        let areasArr = areas[provinceIndex][cityIndex];
        let areaIndex = -1;
        for (let i2 = 0; i2 < areasArr.length; i2++) {
          let { code: code2, name } = areasArr[i2];
          let reg = name;
          if (name.length > 2)
            reg += `|${name.substr(0, name.length - 1)}`;
          let areaRegExp = new RegExp(reg);
          if (addressText.search(areaRegExp) > -1) {
            area = { code: code2, name };
            address = addressText.replace(new RegExp(reg), "{{~}}").split("{{~}}")[1];
            areaIndex = i2;
            break;
          }
        }
        if (areaIndex == -1)
          return { code: -1, msg: "县级市没有找到，请输入正确的地址" };
        let formatted_address = `${province.name}${city.name}${area.name}${address}`;
        let res = {
          code: 0,
          msg: "ok",
          data: {
            province,
            // 省
            city,
            // 市
            area,
            // 区
            address,
            // 街道地址
            formatted_address
            // 完整格式化地址
          }
        };
        return res;
      },
      // 智能识别收货信息
      addressDiscern(text) {
        let name = "";
        let mobile2 = "";
        if (!text)
          return { code: -1, msg: "地址文本不能为空" };
        let textArr = text.split(/[^\u4e00-\u9fa5a-zA-Z0-9+-（）()]+/g).filter((v2) => v2.length);
        if (textArr.length != 3)
          return {
            code: -1,
            msg: "地址格式不正确，请按姓名 手机号 收货地址格式。"
          };
        let temp;
        let addressText;
        for (let [k2, v2] of textArr.entries()) {
          if (/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(v2)) {
            mobile2 = v2;
            continue;
          }
          if (!temp) {
            temp = v2;
            continue;
          }
          temp.length > v2.length ? (addressText = temp, name = v2) : (addressText = v2, name = temp);
        }
        let positionRes = this.regionDiscern(addressText);
        if (positionRes.code !== 0)
          return positionRes;
        let res = {
          code: 0,
          msg: "ok",
          data: {
            name,
            // 姓名
            mobile: mobile2,
            // 手机号
            position: positionRes.data
            // 省市区街道信息
          }
        };
        return res;
      },
      stop() {
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      maskCloseAble: $props.maskCloseAble,
      mode: "bottom",
      popup: false,
      modelValue: $data.popupValue,
      "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $data.popupValue = $event),
      length: "auto",
      safeAreaInsetBottom: $props.safeAreaInsetBottom,
      onClose: $options.close,
      "z-index": $options.uZIndex,
      blur: $props.blur
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "u-datetime-picker" }, [
          vue.createElementVNode(
            "view",
            {
              class: "u-picker-header",
              onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop", "prevent"]))
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: "u-btn-picker u-btn-picker--tips",
                  style: vue.normalizeStyle({ color: $props.cancelColor }),
                  "hover-class": "u-opacity",
                  "hover-stay-time": 150,
                  onClick: _cache[0] || (_cache[0] = ($event) => $options.getResult("cancel"))
                },
                vue.toDisplayString($props.cancelText),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode(
                "view",
                { class: "u-picker__title" },
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "u-btn-picker u-btn-picker--primary",
                  style: vue.normalizeStyle({ color: $data.moving ? $props.cancelColor : $props.confirmColor }),
                  "hover-class": "u-opacity",
                  "hover-stay-time": 150,
                  onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"])),
                  onClick: _cache[2] || (_cache[2] = vue.withModifiers(($event) => $options.getResult("confirm"), ["stop"]))
                },
                vue.toDisplayString($props.confirmText),
                37
                /* TEXT, STYLE, HYDRATE_EVENTS */
              )
            ],
            32
            /* HYDRATE_EVENTS */
          ),
          vue.createElementVNode("view", { class: "u-picker-body" }, [
            $props.mode == "region" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 0,
              value: $data.valueArr,
              onChange: _cache[4] || (_cache[4] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[5] || (_cache[5] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[6] || (_cache[6] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              $options.showColumnCom && $props.params.province ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.provinces, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "u-line-1" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params.city ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.citys, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "u-line-1" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params.area ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 2 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.areas, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "u-line-1" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "time" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 1,
              value: $data.valueArr,
              onChange: _cache[7] || (_cache[7] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[8] || (_cache[8] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[9] || (_cache[9] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              $options.showColumnCom && $props.params.year ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.years, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString(item) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "年")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params.month ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.months, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "月")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params.day ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 2 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.days, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "日")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params.hour ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 3 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.hours, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "时")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params.minute ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 4 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.minutes, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "分")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params.second ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 5 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.seconds, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "秒")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "selector" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 2,
              value: $data.valueArr,
              onChange: _cache[10] || (_cache[10] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[11] || (_cache[11] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[12] || (_cache[12] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              $options.showColumnCom ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.range, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "u-line-1" },
                        vue.toDisplayString($options.getItemValue(item, "selector")),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "multiSelector" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 3,
              value: $data.valueArr,
              onChange: _cache[13] || (_cache[13] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[14] || (_cache[14] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[15] || (_cache[15] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              $options.showColumnCom ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($props.range, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("picker-view-column", { key: index }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(item, (item1, index1) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "u-column-item",
                          key: index1
                        }, [
                          vue.createElementVNode(
                            "view",
                            { class: "u-line-1" },
                            vue.toDisplayString($options.getItemValue(item1, "multiSelector")),
                            1
                            /* TEXT */
                          )
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["maskCloseAble", "modelValue", "safeAreaInsetBottom", "onClose", "z-index", "blur"]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$4], ["__scopeId", "data-v-59e880aa"], ["__file", "E:/lwz/lwz/mine/uniapp-base/components/public/pub-picker.vue"]]);
  const _imports_0 = "/static/images/icons/right-arrow.png";
  const formcheck = {
    // 空验证
    check_null: function(value) {
      if (!value) {
        return false;
      } else {
        var r2 = new RegExp(/^[ ]+$/);
        var result = r2.test(value);
        return !result;
      }
    },
    // 手机验证
    check_phone: function(txt) {
      return /^(1[3456789]\d{9})$/g.test(txt);
    },
    // 检测固话号码
    check_tele: function(txt) {
      return /^((0\d{2,3}-\d{7,8}))$/g.test(txt);
    },
    // 检测手机和固话
    check_telephone: function(txt) {
      return /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/g.test(txt);
    },
    // 邮箱验证
    check_email: function(txt) {
      return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/g.test(txt);
    },
    // 检测身份证
    check_idcard: function(txt) {
      return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/g.test(txt);
    },
    // 检测姓名
    check_name: function(txt) {
      return /^[a-zA-Z\u4e00-\u9fa5\_\-\.\·]*$/g.test(txt);
    },
    // 检测姓名(中文)
    check_cn_name: function(txt) {
      return /^[\u4e00-\u9fa5\.\·]*$/g.test(txt);
    },
    // 检测姓名(英文)
    check_en_name: function(txt) {
      return /^[a-zA-Z\_\-\.\·]*$/g.test(txt);
    },
    // 检测用户名(长度在3~16之间，只能包含英文、数字和下划线，区分大小写)
    check_username: function(txt) {
      return /^[a-zA-Z0-9_-]{3,16}$/g.test(txt);
    },
    // 密码验证(至少含1小写字母，1大写字母，1数字，长度在8~16之间)
    check_password: function(txt) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(txt);
    },
    // 检测url
    check_url: function(txt) {
      return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g.test(txt);
    },
    // 检测ip地址
    check_ip: function(txt) {
      return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/g.test(txt);
    },
    // 金钱验证（两位小数）
    check_money: function(txt) {
      return /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/g.test(txt);
    },
    // 整数
    check_int: function(txt) {
      return /(^[0-9]\d*$)/g.test(txt);
    },
    // 正整数
    check_int2: function(txt) {
      return /(^[1-9]\d*$)/g.test(txt);
    },
    // emoji表情验证
    check_emoji: function(txt) {
      return /^([\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])$/g.test(txt);
    },
    // 隐藏手机号
    phoneChang: function(txt) {
      return txt.toString().replace(/^(\d{3})(\d{4})(\d{4})$/, "$1****$3");
    },
    // 替换表单的前后空格
    trim: function(txt) {
      return txt.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 身份证位数
    idcardNumTest: function(txt) {
      return txt.toString().length == 15 || txt.toString().length == 18 ? true : false;
    },
    // /n替换成br
    NToBr: function(txt) {
      return txt.replace(/\n/g, "<br>");
    },
    // br替换成/n
    BrToN: function(txt) {
      return txt.replace(/<br>/g, "\n");
    },
    // 验证码
    setTime: function(that) {
      if (that.phonecode.phoneFlag === 0) {
        that.phonecode.time = 60;
        that.phonecode.phoneFlag = 1;
        that.phonecode.phoneText = that.phonecode.time + "s后重新获取";
        var times = setInterval(function() {
          if (--that.phonecode.time !== 0) {
            that.phonecode.phoneText = that.phonecode.time + "s后重新获取";
          } else {
            clearInterval(times);
            that.phonecode.phoneText = "重新发送";
            that.phonecode.phoneFlag = 0;
          }
        }, 1e3);
        that.phonecode.oldPhone = that.phone;
      }
    }
  };
  const validateItem = (data) => {
    if (data) {
      let rule = data.rule;
      if (rule) {
        for (let rulekey in rule) {
          if (!formcheck[rulekey](data.value)) {
            data.tip = data.rule[rulekey];
            data.callback && data.callback(data.rule[rulekey]);
            return false;
          }
        }
        return true;
      } else {
        return true;
      }
    } else {
      formatAppLog("error", "at utils/validate.js:20", "请传入数据");
      return false;
    }
  };
  const validate = (data, order) => {
    let state = true;
    let dataObj = {};
    if (data) {
      for (let key in data) {
        dataObj[key] = data[key].value;
        if (!validateItem(data[key])) {
          if (!order) {
            state = false;
          } else {
            return false;
          }
        }
      }
    } else {
      formatAppLog("error", "at utils/validate.js:40", "请传入数据");
      return false;
    }
    if (!order) {
      if (state) {
        return dataObj;
      } else {
        return false;
      }
    } else {
      return dataObj;
    }
  };
  const codeImg = "/static/images/temp/code.png";
  const pswHide = "/static/images/icons/psw-hide.png";
  const pswShow = "/static/images/icons/psw-show.png";
  const _sfc_main$k = {
    __name: "pub-form",
    props: {
      //数据源
      objData: {
        type: Object
      },
      //输入时，光标距离键盘高度
      cursorSpacing: {
        type: Number,
        default: 10
      },
      //全局设置边框
      border: {
        type: [Boolean, String],
        default: true
      },
      //失去焦点时验证
      blurValidate: {
        type: Boolean,
        default: true
      }
    },
    emits: [
      "input",
      "blur",
      "focus",
      "confirm",
      "keyboardheightchange",
      "selectConfirm"
    ],
    setup(__props, { expose, emit }) {
      const props = __props;
      const cloneData = vue.ref(null);
      const reset = () => {
        return JSON.parse(JSON.stringify(cloneData.value));
      };
      vue.onMounted(() => {
        for (let key in props.objData) {
          if (props.objData[key].type === "password") {
            props.objData[key].isPsw = true;
          }
          if (["time", "date", "date-time", "region"].includes(props.objData[key].type)) {
            let params;
            if (["region"].includes(props.objData[key].type)) {
              if (!props.objData[key].params || JSON.stringify(props.objData[key].params) === "{}") {
                params = {
                  province: true,
                  city: true,
                  area: true
                };
              } else {
                params = {
                  province: false,
                  city: false,
                  area: false,
                  ...props.objData[key].params
                };
              }
            } else {
              if (!props.objData[key].params || JSON.stringify(props.objData[key].params) === "{}") {
                if (["time"].includes(props.objData[key].type)) {
                  params = {
                    year: false,
                    month: false,
                    day: false,
                    hour: true,
                    minute: true,
                    second: true
                  };
                } else if (["date"].includes(props.objData[key].type)) {
                  params = {
                    year: true,
                    month: true,
                    day: true,
                    hour: false,
                    minute: false,
                    second: false
                  };
                } else {
                  params = {
                    year: true,
                    month: true,
                    day: true,
                    hour: true,
                    minute: true,
                    second: true
                  };
                }
              } else {
                params = {
                  year: false,
                  month: false,
                  day: false,
                  hour: false,
                  minute: false,
                  second: false,
                  ...props.objData[key].params
                };
              }
            }
            props.objData[key].params = params;
          }
        }
        cloneData.value = JSON.parse(JSON.stringify(props.objData));
      });
      const input = (k2, item) => {
        emit("input", k2, item.value);
      };
      const blur = (k2, item) => {
        if (item.blurValidate || props.blurValidate) {
          validateItem(item);
        }
        emit("blur", k2, item.value);
      };
      const focus = (k2, item) => {
        item.tip = "";
        emit("focus", k2, item.value);
      };
      const confirm = (k2, item) => {
        emit("confirm", k2, item.value);
      };
      const keyboardheightchange = (e2) => {
        formatAppLog("log", "at components/public/pub-form.vue:359", e2.detail);
        emit("keyboardheightchange", e2.detail);
      };
      const selectFocus = (item) => {
        item.tip = "";
        item.show = true;
      };
      const selectConfirm = (e2, item) => {
        item.value = e2;
        let str = "";
        if (!item.onlyShowLast) {
          e2.map((_item, _index) => {
            if (_index)
              str += item.connect || "-";
            str += _item.label;
          });
        } else {
          str += e2[e2.length - 1].label;
        }
        item.showValue = str;
        emit("selectConfirm", e2, item);
        item.confirm && item.confirm(e2, item);
      };
      const selectClose = (bool, item) => {
        if (item.blurValidate || props.blurValidate) {
          validateItem(item);
        }
      };
      const pickerConfirm = (e2, item) => {
        formatAppLog("log", "at components/public/pub-form.vue:387", e2);
        item.value = e2;
        let arr = [];
        e2.year ? arr.push(e2.year) : null;
        e2.month ? arr.push(e2.month) : null;
        e2.day ? arr.push(e2.day) : null;
        e2.hour ? arr.push(e2.hour) : null;
        e2.minute ? arr.push(e2.minute) : null;
        e2.second ? arr.push(e2.second) : null;
        item.showValue = arr.join(item.connect || "-");
        emit("selectConfirm", e2, item);
        item.confirm && item.confirm(e2, item);
      };
      const pickerClose = (bool, item) => {
        if (item.blurValidate || props.blurValidate) {
          validateItem(item);
        }
      };
      expose({ reset });
      return (_ctx, _cache) => {
        const _component_pub_select = resolveEasycom(vue.resolveDynamicComponent("pub-select"), __easycom_0$4);
        const _component_pub_picker = resolveEasycom(vue.resolveDynamicComponent("pub-picker"), __easycom_1$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "pub-form" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(props.objData, (item, key) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["input-item-box", [item.cln]]),
                  key
                },
                [
                  vue.createCommentVNode(" input text "),
                  item.tit ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "topTitle"
                  }, [
                    item.isMust ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      style: { "color": "red" }
                    }, "*")) : vue.createCommentVNode("v-if", true),
                    vue.createTextVNode(
                      vue.toDisplayString(item.tit),
                      1
                      /* TEXT */
                    )
                  ])) : vue.createCommentVNode("v-if", true),
                  item.slot ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 1,
                      class: vue.normalizeClass(["input-box flex", {
                        "border-none": item.border !== void 0 && !item.border || !props.border,
                        underline: item.border === "underline" || props.border === "underline"
                      }])
                    },
                    [
                      vue.renderSlot(_ctx.$slots, item.slot, { data: item }, void 0, true)
                    ],
                    2
                    /* CLASS */
                  )) : (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 2,
                      class: vue.normalizeClass(["input-box flex", {
                        "border-none": item.border !== void 0 && !item.border || !props.border,
                        underline: item.border === "underline" || props.border === "underline"
                      }])
                    },
                    [
                      item.icon ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "icon-box"
                      }, [
                        vue.createElementVNode("image", {
                          src: item.icon
                        }, null, 8, ["src"])
                      ])) : vue.createCommentVNode("v-if", true),
                      item.type === "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
                        key: 1,
                        class: "textarea",
                        "onUpdate:modelValue": ($event) => item.value = $event,
                        style: vue.normalizeStyle([item.style]),
                        placeholder: item.placeholder,
                        disabled: item.disabled,
                        maxlength: item.maxlength || 200,
                        "cursor-spacing": item.cursorSpacing || props.cursorSpacing,
                        focus: item.isFocus,
                        "confirm-type": item.confirmType,
                        "confirm-hold": item.confirmHold,
                        "hold-keyboard": item.holdKeyboard,
                        onInput: ($event) => input(key, item),
                        onBlur: ($event) => blur(key, item),
                        onFocus: ($event) => focus(key, item),
                        onConfirm: ($event) => confirm(key, item),
                        onKeyboardheightchange: keyboardheightchange
                      }, null, 44, ["onUpdate:modelValue", "placeholder", "disabled", "maxlength", "cursor-spacing", "focus", "confirm-type", "confirm-hold", "hold-keyboard", "onInput", "onBlur", "onFocus", "onConfirm"])), [
                        [vue.vModelText, item.value]
                      ]) : item.type == "select" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 2,
                        class: vue.normalizeClass(["select", { gray: !item.value }]),
                        onClick: ($event) => selectFocus(item)
                      }, [
                        vue.createTextVNode(
                          vue.toDisplayString(item.showValue || item.placeholder) + " ",
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "icon" }, [
                          vue.createElementVNode("image", { src: _imports_0 })
                        ])
                      ], 10, ["onClick"])) : [
                        "time",
                        "date",
                        "date-time",
                        "region",
                        "region-1",
                        "region-1-1"
                      ].includes(item.type) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 3,
                        class: vue.normalizeClass(["select", { gray: !item.value }]),
                        onClick: ($event) => selectFocus(item)
                      }, [
                        vue.createTextVNode(
                          vue.toDisplayString(item.showValue || item.placeholder) + " ",
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "icon" }, [
                          vue.createElementVNode("image", { src: _imports_0 })
                        ])
                      ], 10, ["onClick"])) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                        key: 4,
                        class: "input",
                        style: vue.normalizeStyle([item.style]),
                        "onUpdate:modelValue": ($event) => item.value = $event,
                        type: item.type,
                        placeholder: item.placeholder,
                        disabled: item.disabled,
                        maxlength: item.maxlength || 200,
                        "cursor-spacing": item.cursorSpacing || props.cursorSpacing,
                        focus: item.isFocus,
                        "confirm-type": item.confirmType,
                        "confirm-hold": item.confirmHold,
                        "hold-keyboard": item.holdKeyboard,
                        onInput: ($event) => input(key, item),
                        onBlur: ($event) => blur(key, item),
                        onFocus: ($event) => focus(key, item),
                        onConfirm: ($event) => confirm(key, item),
                        onKeyboardheightchange: keyboardheightchange
                      }, null, 44, ["onUpdate:modelValue", "type", "placeholder", "disabled", "maxlength", "cursor-spacing", "focus", "confirm-type", "confirm-hold", "hold-keyboard", "onInput", "onBlur", "onFocus", "onConfirm"])), [
                        [vue.vModelDynamic, item.value]
                      ]),
                      (item.showEye || item.showEye === void 0) && item.isPsw && item.type == "password" ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 5,
                        class: "psw-icon",
                        onClick: ($event) => item.type = "text",
                        src: vue.unref(pswHide)
                      }, null, 8, ["onClick", "src"])) : vue.createCommentVNode("v-if", true),
                      (item.showEye || item.showEye === void 0) && item.isPsw && item.type == "text" ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 6,
                        class: "psw-icon",
                        onClick: ($event) => item.type = "password",
                        src: vue.unref(pswShow)
                      }, null, 8, ["onClick", "src"])) : vue.createCommentVNode("v-if", true),
                      item.isCode ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 7,
                        class: "code",
                        src: vue.unref(codeImg)
                      }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )),
                  item.tip && (item.showPageTip || item.showPageTip === void 0) ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 3,
                      class: "error-tip"
                    },
                    vue.toDisplayString(item.tip),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true),
                  item.type === "select" ? (vue.openBlock(), vue.createBlock(_component_pub_select, {
                    key: 4,
                    modelValue: item.show,
                    "onUpdate:modelValue": ($event) => item.show = $event,
                    mode: item.options[0].children ? "mutil-column-auto" : item.options[0].value ? "single-column" : item.options[0][0].value ? "mutil-column" : null,
                    "mask-close-able": item["mask-close-able"],
                    "default-value": item["default-value"],
                    list: item.options,
                    item,
                    onConfirm: selectConfirm,
                    onClose: selectClose
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "mode", "mask-close-able", "default-value", "list", "item"])) : vue.createCommentVNode("v-if", true),
                  ["time", "date", "date-time", "region"].includes(item.type) ? (vue.openBlock(), vue.createBlock(_component_pub_picker, {
                    key: 5,
                    modelValue: item.show,
                    "onUpdate:modelValue": ($event) => item.show = $event,
                    mode: ["region"].includes(item.type) ? "region" : "time",
                    params: item.params,
                    item,
                    "default-region": item["default-region"],
                    onConfirm: pickerConfirm,
                    onClose: pickerClose
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "mode", "params", "item", "default-region"])) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-2f4af43a"], ["__file", "E:/lwz/lwz/mine/uniapp-base/components/public/pub-form.vue"]]);
  const usernameIcon = "/static/images/icons/phone.png";
  const lockIcon = "/static/images/icons/lock.png";
  const defenseIcon = "/static/images/icons/defense.png";
  const useUserStore = defineStore("user", {
    state: () => ({
      token: "",
      userInfo: {}
    }),
    getters: {
      isLogin() {
        return !!this.token;
      }
    },
    actions: {
      logout() {
        this.token = "";
        this.userInfo = {};
      },
      getUserInfo() {
        this.userInfo.name = "是我呀";
        formatAppLog("log", "at store/user.js:21", "用户信息");
      }
    }
  });
  const _sfc_main$j = {
    __name: "login",
    setup(__props) {
      const userStore = useUserStore();
      const submit = () => {
        let vali = validate(data.value);
        formatAppLog("log", "at pages/login/login.vue:40", vali);
        if (vali) {
          setToken();
        }
      };
      const submit2 = () => {
        setToken();
      };
      const setToken = () => {
        userStore.token = "qqqqeqweqwe";
        nav("index");
      };
      const data = vue.ref({
        username: {
          type: "number",
          //input类型
          placeholder: "请输入手机号",
          //占位
          maxlength: 11,
          //最大能输入长度
          isMust: true,
          //是否必填（显示顶部名称或左边名称前面的星号）
          icon: usernameIcon,
          //图标
          rule: {
            //验证规则，配置则为必填，去掉则为选填
            check_null: "手机号不能为空",
            check_phone: "请填写正确的手机号码"
          }
        },
        password: {
          type: "password",
          placeholder: "请输入密码",
          isMust: true,
          icon: lockIcon,
          maxlength: 20,
          rule: {
            check_null: "密码不能为空",
            check_password: "密码有误，须包含大小写字母和数字"
          }
        },
        code: {
          tit: "验证码",
          type: "text",
          isMust: true,
          placeholder: "请输入验证码",
          isCode: true,
          maxlength: 6,
          icon: defenseIcon,
          rule: {
            check_null: "验证码不能为空"
          }
        }
      });
      return (_ctx, _cache) => {
        const _component_pub_form = resolveEasycom(vue.resolveDynamicComponent("pub-form"), __easycom_0$3);
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerTitle: "登录",
          bgc: "#ffffff",
          hideTabbar: "",
          headerIsTabbar: ""
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "login" }, [
              vue.createElementVNode("view", { class: "login-box" }, [
                vue.createVNode(_component_pub_form, { objData: data.value }, {
                  abc: vue.withCtx(({ data: data2 }) => [
                    vue.createElementVNode("view", null, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        style: { "padding": "20rpx", "box-sizing": "content-box" },
                        placeholder: "请输入",
                        "onUpdate:modelValue": ($event) => data2.value = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vue.vModelText, data2.value]
                      ])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["objData"])
              ]),
              vue.createElementVNode("view", { class: "btn-box" }, [
                vue.createElementVNode("button", {
                  class: "btn",
                  onClick: submit
                }, "登录")
              ]),
              vue.createElementVNode("view", { class: "btn-box" }, [
                vue.createElementVNode("button", {
                  class: "btn",
                  onClick: submit2
                }, "首页")
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  };
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-e4e4508d"], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/login/login.vue"]]);
  const _sfc_main$i = {
    __name: "test",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerTitle: "test",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "padding": "20rpx" } }, [
              vue.createElementVNode("view", {
                onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(nav)("/pages/test/test-onlysafe"))
              }, "uni.navigateTo"),
              vue.createElementVNode("view", null, "----"),
              vue.createElementVNode("view", null, "----"),
              vue.createElementVNode("view", {
                onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(nav)("/pages/test/test-onlysafe", 2))
              }, "uni.redirectTo"),
              vue.createElementVNode("view", null, "----"),
              vue.createElementVNode("view", null, "----"),
              vue.createElementVNode("view", {
                onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(nav)("/pages/test/test-onlysafe", 3))
              }, "uni.reLaunch"),
              vue.createElementVNode("view", null, "----"),
              vue.createElementVNode("view", null, "----"),
              vue.createElementVNode("view", {
                onClick: _cache[3] || (_cache[3] = ($event) => vue.unref(nav)("back"))
              }, "uni.navigateBack"),
              vue.createElementVNode("view", null, "详见@/utils/index.js里nav注释")
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTest = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-727d09f0"], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test.vue"]]);
  const _sfc_main$h = {};
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { style: { "line-height": "3" } }, "先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。 宫中府中，俱为一体，陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。 侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。 将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。 亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。 臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。 先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明，故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。 愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏，臣不胜受恩感激。 今当远离，临表涕零，不知所言。 ");
  }
  const csb = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$3], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/com/csb.vue"]]);
  const _sfc_main$g = {
    __name: "test-immersive",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerImmersive: "",
          headerTitle: "出师表",
          headerSubtitle: "猪葛亮",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(csb)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestImmersive = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-immersive.vue"]]);
  const _sfc_main$f = {
    __name: "test-immersiveTo",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerImmersiveTo: "",
          headerImmersiveToColor: "#007AFF",
          headerImmersiveToTitleColor: "#ffffff",
          headerImmersiveToSubtitleColor: "#ffffff",
          headerTitle: "出师表",
          headerSubtitle: "猪葛亮",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "height": "500rpx" } }),
            vue.createVNode(csb)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestImmersiveTo = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-immersiveTo.vue"]]);
  const _sfc_main$e = {
    __name: "test-immersiveToIcewindow",
    setup(__props) {
      const immersive = (res) => {
        formatAppLog("log", "at pages/test/test-immersiveToIcewindow.vue:22", res);
      };
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerImmersiveToIceWindow: "",
          headerImmersiveToColor: "#007AFF",
          headerImmersiveToTitleColor: "#ffffff",
          headerImmersiveToSubtitleColor: "#ffffff",
          headerTitle: "冰纱窗",
          bgi: vue.unref(bgi),
          onImmersive: immersive
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "height": "500rpx" } }),
            vue.createVNode(csb)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestImmersiveToIcewindow = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-immersiveToIcewindow.vue"]]);
  const _sfc_main$d = {
    __name: "test-onlysafe",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9",
          headerBgc: "#fff",
          tabbarBgc: "#f90",
          headerOnlySafe: "",
          tabbarOnlySafe: ""
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(nav)("back"))
            }, "back"),
            vue.createVNode(csb)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestOnlysafe = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-9cddede1"], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-onlysafe.vue"]]);
  const nomsg = "/static/images/icons/nomsg.png";
  const _sfc_main$c = {
    __name: "pub-nomsg",
    props: {
      nomsgObj: {
        type: Object,
        default: () => {
          return {
            tip: "当前无相关数据~",
            img: nomsg
          };
        }
      },
      tip: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "no-msg" }, [
          vue.createElementVNode("view", { class: "img" }, [
            vue.createElementVNode("image", {
              src: __props.nomsgObj.img
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode(
            "view",
            { class: "tip" },
            vue.toDisplayString(__props.tip ? __props.tip : __props.nomsgObj.tip),
            1
            /* TEXT */
          ),
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]);
      };
    }
  };
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-ac2d3e43"], ["__file", "E:/lwz/lwz/mine/uniapp-base/components/public/pub-nomsg.vue"]]);
  const _sfc_main$b = {
    name: "u-line",
    props: {
      color: {
        type: String,
        default: "#e4e7ed"
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带rpx单位的值等
      length: {
        type: String,
        default: "100%"
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: "row"
      },
      // 是否显示细边框
      hairLine: {
        type: Boolean,
        default: true
      },
      // 线条与上下左右元素的间距，字符串形式，如"30rpx"、"20rpx 30rpx"
      margin: {
        type: String,
        default: "0"
      },
      // 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线
      borderStyle: {
        type: String,
        default: "solid"
      }
    },
    computed: {
      lineStyle() {
        let style = {};
        style.margin = this.margin;
        if (this.direction == "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.borderStyle;
          style.width = this.$u.addUnit(this.length);
          if (this.hairLine)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.borderStyle;
          style.height = this.$u.addUnit(this.length);
          if (this.hairLine)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return style;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$2], ["__scopeId", "data-v-3e1cc47b"], ["__file", "E:/lwz/lwz/mine/uniapp-base/uni_modules/vk-uview-ui/components/u-line/u-line.vue"]]);
  const _sfc_main$a = {
    name: "u-loading",
    props: {
      // 动画的类型
      mode: {
        type: String,
        default: "circle"
      },
      // 动画的颜色
      color: {
        type: String,
        default: "#c7c7c7"
      },
      // 加载图标的大小，单位rpx
      size: {
        type: [String, Number],
        default: "34"
      },
      // 是否显示动画
      show: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // 加载中圆圈动画的样式
      cricleStyle() {
        let style = {};
        style.width = this.size + "rpx";
        style.height = this.size + "rpx";
        if (this.mode == "circle")
          style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : "#c7c7c7"}`;
        return style;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-loading", $props.mode == "circle" ? "u-loading-circle" : "u-loading-flower"]),
        style: vue.normalizeStyle([$options.cricleStyle])
      },
      null,
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$1], ["__scopeId", "data-v-32db0ed8"], ["__file", "E:/lwz/lwz/mine/uniapp-base/uni_modules/vk-uview-ui/components/u-loading/u-loading.vue"]]);
  const _sfc_main$9 = {
    name: "u-loadmore",
    emits: ["loadmore"],
    props: {
      // 组件背景色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 是否显示加载中的图标
      icon: {
        type: Boolean,
        default: true
      },
      // 字体大小
      fontSize: {
        type: String,
        default: "28"
      },
      // 字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
      status: {
        type: String,
        default: "loadmore"
      },
      // 加载中状态的图标，flower-花朵状图标，circle-圆圈状图标
      iconType: {
        type: String,
        default: "circle"
      },
      // 显示的文字
      loadText: {
        type: Object,
        default() {
          return {
            loadmore: "加载更多",
            loading: "正在加载...",
            nomore: "没有更多了"
          };
        }
      },
      // 在“没有更多”状态下，是否显示粗点
      isDot: {
        type: Boolean,
        default: false
      },
      // 加载中显示圆圈动画时，动画的颜色
      iconColor: {
        type: String,
        default: "#b7b7b7"
      },
      // 上边距
      marginTop: {
        type: [String, Number],
        default: 0
      },
      // 下边距
      marginBottom: {
        type: [String, Number],
        default: 0
      },
      // 高度，单位rpx
      height: {
        type: [String, Number],
        default: "auto"
      }
    },
    data() {
      return {
        // 粗点
        dotText: "●"
      };
    },
    computed: {
      // 加载的文字显示的样式
      loadTextStyle() {
        return {
          color: this.color,
          fontSize: this.fontSize + "rpx",
          position: "relative",
          zIndex: 1,
          backgroundColor: this.bgColor
          // 如果是加载中状态，动画和文字需要距离近一点
        };
      },
      // 加载中圆圈动画的样式
      cricleStyle() {
        return {
          borderColor: `#e5e5e5 #e5e5e5 #e5e5e5 ${this.circleColor}`
        };
      },
      // 加载中花朵动画形式
      // 动画由base64图片生成，暂不支持修改
      flowerStyle() {
        return {};
      },
      // 显示的提示文字
      showText() {
        let text = "";
        if (this.status == "loadmore")
          text = this.loadText.loadmore;
        else if (this.status == "loading")
          text = this.loadText.loading;
        else if (this.status == "nomore" && this.isDot)
          text = this.dotText;
        else
          text = this.loadText.nomore;
        return text;
      }
    },
    methods: {
      loadMore() {
        if (this.status == "loadmore")
          this.$emit("loadmore");
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$1);
    const _component_u_loading = resolveEasycom(vue.resolveDynamicComponent("u-loading"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-load-more-wrap",
        style: vue.normalizeStyle({
          backgroundColor: $props.bgColor,
          marginBottom: $props.marginBottom + "rpx",
          marginTop: $props.marginTop + "rpx",
          height: _ctx.$u.addUnit($props.height)
        })
      },
      [
        vue.createVNode(_component_u_line, {
          color: "#d4d4d4",
          length: "50"
        }),
        vue.createCommentVNode(" 加载中和没有更多的状态才显示两边的横线 "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([$props.status == "loadmore" || $props.status == "nomore" ? "u-more" : "", "u-load-more-inner"])
          },
          [
            vue.createElementVNode("view", { class: "u-loadmore-icon-wrap" }, [
              vue.createVNode(_component_u_loading, {
                class: "u-loadmore-icon",
                color: $props.iconColor,
                mode: $props.iconType == "circle" ? "circle" : "flower",
                show: $props.status == "loading" && $props.icon
              }, null, 8, ["color", "mode", "show"])
            ]),
            vue.createCommentVNode(" 如果没有更多的状态下，显示内容为dot（粗点），加载特定样式 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["u-line-1", [$props.status == "nomore" && $props.isDot == true ? "u-dot-text" : "u-more-text"]]),
                style: vue.normalizeStyle([$options.loadTextStyle]),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.loadMore && $options.loadMore(...args))
              },
              vue.toDisplayString($options.showText),
              7
              /* TEXT, CLASS, STYLE */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createVNode(_component_u_line, {
          color: "#d4d4d4",
          length: "50"
        })
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render], ["__scopeId", "data-v-e9906cfb"], ["__file", "E:/lwz/lwz/mine/uniapp-base/uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.vue"]]);
  function codeCheck(data, success, fail) {
    let code2 = parseInt(data.code);
    let err_code = parseInt(data.err_code);
    switch (err_code || code2) {
      case 0:
        success && success(data);
        break;
      case 50001:
      case 50002:
      case 50003:
      case 50004:
        fail && fail(data);
        let txt = "";
        if (uni.getStorageSync("token")) {
          txt = "登录已过期，请重新登录";
        } else {
          txt = "请先登录";
        }
        uni.setStorageSync("token", "");
        modal({ title: "提示", content: txt, showCancel: false }, () => {
          nav("/pages/login/login");
        });
        break;
      default:
        fail && fail(data);
        modal({ title: "提示", content: data.msg || "系统出错" });
        break;
    }
  }
  const request = function(url2, data, method, hideLoad, success, fail) {
    !hideLoad && loading();
    let dataType = "json";
    let responseType = "text";
    let apiUrl;
    apiUrl = "http://scjava.mrxdtech.com/api" + url2;
    let token2 = useUserStore().token;
    uni.request({
      url: apiUrl,
      data,
      method,
      dataType,
      responseType,
      header: {
        "content-type": "application/json",
        "X-Token": token2
      },
      success: function(res) {
        !hideLoad && loadEnd();
        codeCheck(res.data, success, fail);
      },
      fail: function(err) {
        !hideLoad && loadEnd();
      }
    });
  };
  function $get(url2, data = {}, hideLoad) {
    return new Promise((resolve, reject) => {
      request(url2, data, "GET", hideLoad, (res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  const _sfc_main$8 = {
    __name: "pub-list",
    props: {
      // 接口地址
      api: {
        type: String,
        required: true
      },
      // 每页条数
      rownum: {
        type: Number,
        default: 10
      },
      // 接口参数
      params: {
        type: Object,
        default: () => ({})
      },
      // 底部文字
      loadText: {
        type: Object,
        default: () => {
          return {
            loadmore: "上拉加载更多",
            loading: "正在加载",
            nomore: "没有更多了"
          };
        },
        validator(val) {
          return Object.keys(val).every(
            (key) => ["loadmore", "loading", "nomore"].includes(key)
          );
        }
      },
      // 处理数据
      handleList: {
        type: Function,
        default: null
      }
    },
    emits: ["change", "loading", "finished", "error"],
    setup(__props, { expose, emit }) {
      const props = __props;
      const status = vue.ref("loadmore");
      const list = vue.ref([]);
      let pagination = vue.reactive({
        page: 1,
        rownum: props.rownum,
        total_page: 2,
        total: 1
      });
      const getListData = () => {
        if (!props.api)
          throw "请传入接口地址";
        status.value = "loading";
        emit("loading");
        $get(
          props.api,
          {
            page: pagination.page,
            rownum: pagination.rownum,
            ...props.params
          },
          true
        ).then(({ data }) => {
          if (props.handleList)
            data.list = props.handleList(data.list);
          list.value = list.value.concat(data.list);
          emit("change", { list: list.value, pagination });
          pagination = vue.reactive(data.pagination);
          pagination.page++;
          state.status = "normal";
          state.distance = 0;
          if (pagination.page > pagination.total_page) {
            emit("finished");
            status.value = "nomore";
            return;
          }
          status.value = "loadmore";
        }).catch((err) => {
          emit("error");
          state.status = "normal";
          state.distance = 0;
          status.value = "loadmore";
        });
      };
      const onRefresh = () => {
        list.value = [];
        pagination = vue.reactive({
          page: 1,
          rownum: props.rownum,
          total_page: 2,
          total: 1
        });
        emit("change", { list: list.value, pagination });
        getListData();
      };
      vue.watch(
        () => props.params,
        (newVal, oldVal) => {
          onRefresh();
        },
        {
          immediate: true,
          deep: true
        }
      );
      vue.onMounted(() => {
        formatAppLog("log", "at components/public/pub-list.vue:163", "onMounted");
        uni.$on("uOnReachBottom", () => {
          if (pagination.page > pagination.total_page) {
            emit("finished");
            status.value = "nomore";
            return;
          }
          getListData();
          status.value = "loading";
        });
      });
      vue.onUnmounted(() => {
        formatAppLog("log", "at components/public/pub-list.vue:177", "onUnmounted");
        uni.$off("uOnReachBottom");
      });
      const state = vue.reactive({
        status: "normal",
        // normal | pulling | loading
        distance: 0
      });
      vue.reactive({
        normal: "下拉即可刷新",
        pulling: "释放即可刷新",
        loading: "正在加载"
      });
      vue.ref(100);
      vue.ref(false);
      vue.ref(0);
      vue.ref(0);
      const listStyle = vue.computed(() => {
        return {
          transitionDuration: state.status === "pulling" ? `0ms` : `300ms`,
          transform: state.distance ? `translateY(${state.distance}px)` : ""
        };
      });
      expose({
        list,
        pagination,
        status,
        onRefresh
      });
      return (_ctx, _cache) => {
        const _component_pub_nomsg = resolveEasycom(vue.resolveDynamicComponent("pub-nomsg"), __easycom_0$2);
        const _component_u_loadmore = resolveEasycom(vue.resolveDynamicComponent("u-loadmore"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "pub-list",
            style: vue.normalizeStyle(vue.unref(listStyle))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", { list: list.value }, void 0, true),
            vue.unref(pagination).total === 0 ? vue.renderSlot(_ctx.$slots, "empty", { key: 0 }, () => [
              vue.createVNode(_component_pub_nomsg)
            ], true) : vue.unref(pagination).total >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "list__footer"
            }, [
              vue.createVNode(_component_u_loadmore, {
                status: status.value,
                "load-text": __props.loadText
              }, null, 8, ["status", "load-text"])
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-05e3efde"], ["__file", "E:/lwz/lwz/mine/uniapp-base/components/public/pub-list.vue"]]);
  const _sfc_main$7 = {
    __name: "test-list",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_pub_list = resolveEasycom(vue.resolveDynamicComponent("pub-list"), __easycom_0);
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerTitle: "列表模板",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_pub_list, {
              api: "api",
              params: {}
            }, {
              default: vue.withCtx(({ list }) => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(list, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(item),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestList = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-list.vue"]]);
  const _sfc_main$6 = {
    __name: "pub-listm",
    props: {
      // 接口地址
      api: {
        type: String,
        required: true
      },
      // 每页条数
      rownum: {
        type: Number,
        default: 10
      },
      // 接口参数
      params: {
        type: Object,
        default: () => ({})
      },
      // 底部文字
      loadText: {
        type: Object,
        default: () => {
          return {
            loadmore: "上拉加载更多",
            loading: "正在加载",
            nomore: "没有更多了"
          };
        },
        validator(val) {
          return Object.keys(val).every(
            (key) => ["loadmore", "loading", "nomore"].includes(key)
          );
        }
      },
      // 处理数据
      handleList: {
        type: Function,
        default: null
      }
    },
    emits: ["change", "loading", "finished", "error"],
    setup(__props, { expose, emit }) {
      const props = __props;
      const status = vue.ref("loadmore");
      const list = vue.ref([]);
      let pagination = vue.reactive({
        page: 1,
        rownum: props.rownum,
        total_page: 10,
        total: 1
      });
      const state = vue.reactive({
        status: "normal",
        // normal | pulling | loading
        distance: 0
      });
      vue.reactive({
        normal: "下拉即可刷新",
        pulling: "释放即可刷新",
        loading: "正在加载"
      });
      const getListData = () => {
        if (props.api !== "test") {
          if (!props.api)
            throw "请传入接口地址";
          status.value = "loading";
          emit("loading");
          $get(
            props.api,
            {
              page: pagination.page,
              rownum: pagination.rownum,
              ...props.params
            },
            true
          ).then(({ data }) => {
            if (props.handleList)
              data.list = props.handleList(data.list);
            list.value = list.value.concat(data.list);
            emit("change", { list: list.value, pagination });
            pagination = vue.reactive(data.pagination);
            pagination.page++;
            state.status = "normal";
            state.distance = 0;
            if (pagination.page > pagination.total_page) {
              emit("finished");
              status.value = "nomore";
              return;
            }
            status.value = "loadmore";
          }).catch((err) => {
            emit("error");
            state.status = "normal";
            state.distance = 0;
            status.value = "loadmore";
          });
        } else {
          status.value = "loading";
          emit("loading");
          let data = {
            list: []
          };
          for (let i2 = 0; i2 < pagination.rownum; i2++) {
            data.list.push({ name: "数据" + i2 });
          }
          if (props.handleList)
            data.list = props.handleList(data.list);
          list.value = list.value.concat(data.list);
          emit("change", { list: list.value, pagination });
          pagination.page++;
          state.status = "normal";
          state.distance = 0;
          if (pagination.page > pagination.total_page) {
            emit("finished");
            status.value = "nomore";
            return;
          }
          status.value = "loadmore";
        }
      };
      const onRefresh = () => {
        list.value = [];
        pagination = vue.reactive({
          page: 1,
          rownum: props.rownum,
          total_page: 2,
          total: 1
        });
        emit("change", { list: list.value, pagination });
        getListData();
      };
      vue.watch(
        () => props.params,
        (newVal, oldVal) => {
          onRefresh();
        },
        {
          immediate: true,
          deep: true
        }
      );
      vue.onMounted(() => {
        formatAppLog("log", "at pages/test/com/pub-listm.vue:194", "onMounted");
        uni.$on("uOnReachBottom", () => {
          if (pagination.page > pagination.total_page) {
            emit("finished");
            status.value = "nomore";
            return;
          }
          getListData();
          status.value = "loading";
        });
      });
      vue.onUnmounted(() => {
        formatAppLog("log", "at pages/test/com/pub-listm.vue:208", "onUnmounted");
        uni.$off("uOnReachBottom");
      });
      vue.ref(100);
      vue.ref(false);
      vue.ref(0);
      vue.ref(0);
      const listStyle = vue.computed(() => {
        return {
          transitionDuration: state.status === "pulling" ? `0ms` : `300ms`,
          transform: state.distance ? `translateY(${state.distance}px)` : ""
        };
      });
      expose({
        list,
        pagination,
        status,
        onRefresh
      });
      return (_ctx, _cache) => {
        const _component_pub_nomsg = resolveEasycom(vue.resolveDynamicComponent("pub-nomsg"), __easycom_0$2);
        const _component_u_loadmore = resolveEasycom(vue.resolveDynamicComponent("u-loadmore"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "pub-list",
            style: vue.normalizeStyle(vue.unref(listStyle))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", { list: list.value }, void 0, true),
            vue.unref(pagination).total === 0 ? vue.renderSlot(_ctx.$slots, "empty", { key: 0 }, () => [
              vue.createVNode(_component_pub_nomsg)
            ], true) : vue.unref(pagination).total >= 1 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "list__footer"
            }, [
              vue.createVNode(_component_u_loadmore, {
                status: status.value,
                "load-text": __props.loadText
              }, null, 8, ["status", "load-text"])
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const pubListm = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-2be2a0b1"], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/com/pub-listm.vue"]]);
  const _sfc_main$5 = {
    __name: "test-list-m",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerTitle: "列表模板",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(pubListm, {
              api: "test",
              params: {}
            }, {
              default: vue.withCtx(({ list }) => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(list, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                      vue.createElementVNode(
                        "view",
                        { style: { "height": "200rpx" } },
                        vue.toDisplayString(item),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestListM = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-list-m.vue"]]);
  const _sfc_main$4 = {
    __name: "test-slot",
    setup(__props) {
      const showBottom = vue.ref(false);
      const showBottomFn = () => {
        showBottom.value = !showBottom.value;
      };
      const showTop = vue.ref(false);
      const showTopFn = () => {
        showTop.value = !showTop.value;
      };
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerIsTabbar: "",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9"
        }, {
          headerLeft: vue.withCtx(() => [
            vue.createElementVNode("view", { onClick: showBottomFn }, "打开下方插槽")
          ]),
          headerCenter: vue.withCtx(() => [
            vue.createElementVNode("view", null, "headerCenter")
          ]),
          headerTitle: vue.withCtx(() => [
            vue.createElementVNode("view", null, "这个才是标题")
          ]),
          headerRight: vue.withCtx(() => [
            vue.createElementVNode("view", { onClick: showTopFn }, "打开下方插槽")
          ]),
          headerBottom: vue.withCtx(() => [
            showBottom.value ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              style: { "height": "300rpx" },
              class: "bgw"
            }, "这是下方插槽")) : vue.createCommentVNode("v-if", true)
          ]),
          tabbarTop: vue.withCtx(() => [
            showTop.value ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              style: { "height": "300rpx" },
              class: "bgw"
            }, "这是上方插槽")) : vue.createCommentVNode("v-if", true)
          ]),
          default: vue.withCtx(() => [
            showBottom.value ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              style: { "height": "300rpx" },
              class: "placeholder"
            })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", {
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(nav)("back"))
            }, "back"),
            vue.createVNode(csb),
            showTop.value ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              style: { "height": "300rpx" },
              class: "placeholder"
            })) : vue.createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestSlot = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-slot.vue"]]);
  const _sfc_main$3 = {
    __name: "test-nomsg",
    setup(__props) {
      const down = (e2) => {
        formatAppLog("log", "at pages/test/test-nomsg.vue:22", "down", e2);
      };
      return (_ctx, _cache) => {
        const _component_pub_nomsg = resolveEasycom(vue.resolveDynamicComponent("pub-nomsg"), __easycom_0$2);
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerTitle: "无数据模板",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9",
          onDown: down
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_pub_nomsg)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestNomsg = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-63f7cc65"], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-nomsg.vue"]]);
  const _sfc_main$2 = {
    __name: "test-form",
    setup(__props) {
      const pub_form = vue.ref();
      const moren = () => {
        form_data.value = pub_form.value.reset();
      };
      const submit = () => {
        let vali = validate(form_data.value);
        formatAppLog("log", "at pages/test/test-form.vue:46", vali);
      };
      const form_data = vue.ref({
        username: {
          tit: "手机号",
          //顶部名称
          type: "number",
          //input类型
          value: "",
          //值
          tip: "",
          //验证失败的提示
          showPageTip: true,
          //验证失败的提示在输入框下方显示
          placeholder: "请输入手机号",
          //占位
          maxlength: 11,
          //最大能输入长度
          disabled: false,
          //是否禁用
          isMust: true,
          //是否必填（显示顶部名称或左边名称前面的星号）
          cursorSpacing: 10,
          //输入时，光标距离键盘高度
          isFocus: false,
          //焦点
          border: "underline",
          confirmType: "",
          //设置键盘右下角按钮的文字，仅在 type="text" 时生效。
          confirmHold: false,
          //点击键盘右下角按钮时是否保持键盘不收起
          holdKeyboard: false,
          //focus时，点击页面的时候不收起键盘
          style: {},
          //附加样式
          icon: usernameIcon,
          //图标
          cln: "123",
          //额外类名
          rule: {
            //验证规则，配置则为必填，去掉则为选填
            check_null: "手机号不能为空",
            check_phone: "请填写正确的手机号码"
          },
          callback(tip) {
            formatAppLog("log", "at pages/test/test-form.vue:75", tip);
            formatAppLog("log", "at pages/test/test-form.vue:76", form_data.value.username.tip);
            toast$1(tip);
          }
        },
        password: {
          tit: "密码",
          type: "password",
          value: "",
          placeholder: "请输入密码",
          tip: "",
          isMust: true,
          icon: lockIcon,
          maxlength: 20,
          rule: {
            check_null: "密码不能为空",
            check_password: "密码有误，须包含大小写字母和数字"
          }
        },
        code: {
          tit: "验证码",
          type: "text",
          value: "",
          isMust: true,
          placeholder: "请输入验证码",
          tip: "",
          isCode: true,
          maxlength: 6,
          icon: defenseIcon,
          rule: {
            check_null: "验证码不能为空"
          }
        },
        textarea: {
          tit: "验证码",
          type: "textarea",
          value: "",
          isMust: true,
          placeholder: "请输入",
          tip: "",
          rule: {
            check_null: "不能为空"
          }
        },
        select: {
          tit: "选择框单列",
          type: "select",
          value: "",
          show: false,
          showValue: "",
          connect: "-",
          isMust: true,
          placeholder: "请选择",
          options: [
            {
              value: "1",
              label: "河"
            },
            {
              value: "2",
              label: "湖"
            }
          ],
          tip: "",
          rule: {
            check_null: "不能为空"
          }
        },
        select1: {
          tit: "选择框多列",
          type: "select",
          value: "",
          show: false,
          showValue: "",
          connect: "-",
          isMust: true,
          placeholder: "请选择",
          options: [
            [
              {
                value: "1",
                label: "河"
              },
              {
                value: "2",
                label: "湖"
              }
            ],
            [
              {
                value: "1",
                label: "河"
              },
              {
                value: "2",
                label: "湖"
              }
            ]
          ],
          tip: "",
          rule: {
            check_null: "不能为空"
          }
        },
        select2: {
          tit: "选择框多列联动",
          type: "select",
          value: "",
          show: false,
          showValue: "",
          connect: "&",
          isMust: true,
          placeholder: "请选择",
          options: [
            {
              value: "1",
              label: "河1",
              children: [
                {
                  value: "1",
                  label: "河1"
                },
                {
                  value: "2",
                  label: "湖1"
                }
              ]
            },
            {
              value: "2",
              label: "湖2",
              children: [
                {
                  value: "1",
                  label: "河2"
                },
                {
                  value: "2",
                  label: "湖2"
                }
              ]
            }
          ],
          tip: "",
          rule: {
            check_null: "不能为空"
          }
        },
        textSlot: {
          tit: "我是插槽呀",
          value: "",
          tip: "",
          slot: "abc",
          //插槽名，不要和其它的相同
          rule: {
            check_null: "不能为空"
          }
        },
        textSlot2: {
          tit: "巧了，我也是插槽",
          value: "我好帅",
          border: false,
          tip: "",
          isMust: true,
          slot: "bcd"
          //插槽名，不要和其它的相同
        },
        select3: {
          tit: "选择框多列联动[仅显示最后一级]",
          type: "select",
          value: "",
          onlyShowLast: true,
          show: false,
          showValue: "",
          connect: "&",
          isMust: true,
          placeholder: "请选择",
          options: [
            {
              value: "1",
              label: "河1",
              children: [
                {
                  value: "1",
                  label: "河1"
                },
                {
                  value: "2",
                  label: "湖1"
                }
              ]
            },
            {
              value: "2",
              label: "湖2",
              children: [
                {
                  value: "1",
                  label: "河2"
                },
                {
                  value: "2",
                  label: "湖2"
                }
              ]
            }
          ],
          tip: "",
          rule: {
            check_null: "不能为空"
          }
        },
        picker1: {
          tit: "日期时间",
          type: "date-time",
          isMust: true,
          placeholder: "请选择",
          rule: {
            check_null: "不能为空"
          }
        },
        picker11: {
          tit: "日期时间",
          type: "date-time",
          isMust: true,
          placeholder: "请选择",
          params: {
            year: true,
            month: true,
            day: true,
            hour: true,
            minute: true,
            second: false
          },
          rule: {
            check_null: "不能为空"
          }
        },
        picker2: {
          tit: "日期",
          type: "date",
          isMust: true,
          placeholder: "请选择",
          rule: {
            check_null: "不能为空"
          }
        },
        picker21: {
          tit: "日期",
          type: "date",
          isMust: true,
          placeholder: "请选择",
          params: {
            year: true,
            month: true,
            second: false
          },
          rule: {
            check_null: "不能为空"
          }
        },
        picker3: {
          tit: "时间",
          type: "time",
          isMust: true,
          placeholder: "请选择",
          rule: {
            check_null: "不能为空"
          }
        },
        picker3: {
          tit: "时间",
          type: "time",
          isMust: true,
          placeholder: "请选择",
          params: {
            hour: true,
            minute: true,
            second: false
          },
          rule: {
            check_null: "不能为空"
          }
        },
        picker4: {
          tit: "地区",
          type: "region",
          isMust: true,
          placeholder: "请选择",
          rule: {
            check_null: "不能为空"
          }
        },
        picker41: {
          tit: "地区",
          type: "region-1",
          isMust: true,
          params: {
            province: true,
            city: true,
            area: false
          },
          placeholder: "请选择",
          rule: {
            check_null: "不能为空"
          }
        }
      });
      return (_ctx, _cache) => {
        const _component_pub_form = resolveEasycom(vue.resolveDynamicComponent("pub-form"), __easycom_0$3);
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerTitle: "表单",
          bgc: "#ffffff",
          hideTabbar: ""
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "login" }, [
              vue.createElementVNode("view", { class: "login-box" }, [
                vue.createVNode(_component_pub_form, {
                  objData: form_data.value,
                  ref_key: "pub_form",
                  ref: pub_form
                }, {
                  abc: vue.withCtx(({ data }) => [
                    vue.createElementVNode("view", null, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        style: { "padding": "20rpx", "box-sizing": "content-box" },
                        placeholder: "请输入",
                        "onUpdate:modelValue": ($event) => data.value = $event,
                        onFocus: ($event) => data.tip = ""
                      }, null, 40, ["onUpdate:modelValue", "onFocus"]), [
                        [vue.vModelText, data.value]
                      ])
                    ])
                  ]),
                  bcd: vue.withCtx(({ data }) => [
                    vue.createTextVNode(
                      vue.toDisplayString(`------我是插槽bcd，我是选填的，我的默认值是：${data.value}`),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["objData"])
              ]),
              vue.createElementVNode("view", { class: "btn-box" }, [
                vue.createElementVNode("button", {
                  class: "btn",
                  onClick: submit
                }, "验证")
              ]),
              vue.createElementVNode("view", { class: "btn-box" }, [
                vue.createElementVNode("button", {
                  class: "btn",
                  onClick: moren
                }, "默认")
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  };
  const PagesTestTestForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2239ca1b"], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-form.vue"]]);
  const _sfc_main$1 = {
    __name: "test-fx",
    setup(__props) {
      const prev = (e2) => {
        formatAppLog("log", "at pages/test/test-fx.vue:15", "prev", e2);
        toast$1("prev");
      };
      const next = (e2) => {
        formatAppLog("log", "at pages/test/test-fx.vue:19", "next", e2);
        toast$1("next");
      };
      const up = (e2) => {
        formatAppLog("log", "at pages/test/test-fx.vue:23", "up", e2);
        toast$1("up");
      };
      const down = (e2) => {
        formatAppLog("log", "at pages/test/test-fx.vue:27", "down", e2);
        toast$1("down");
      };
      const m2 = vue.ref({ dX: 0, dY: 0 });
      const move = (e2) => {
        m2.value = e2;
      };
      return (_ctx, _cache) => {
        const _component_lay_layout = resolveEasycom(vue.resolveDynamicComponent("lay-layout"), __easycom_0$7);
        return vue.openBlock(), vue.createBlock(_component_lay_layout, {
          headerTitle: "方向",
          bgi: vue.unref(bgi),
          bgc: "#F4F6F9",
          onNext: next,
          onPrev: prev,
          onUp: up,
          onDown: down,
          onMove: move,
          minDeviationX: "30",
          minDeviationY: "30"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              null,
              "dx:" + vue.toDisplayString(m2.value.dX),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              null,
              "dy:" + vue.toDisplayString(m2.value.dY),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["bgi"]);
      };
    }
  };
  const PagesTestTestFx = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1a92075d"], ["__file", "E:/lwz/lwz/mine/uniapp-base/pages/test/test-fx.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/test/test", PagesTestTest);
  __definePage("pages/test/test-immersive", PagesTestTestImmersive);
  __definePage("pages/test/test-immersiveTo", PagesTestTestImmersiveTo);
  __definePage("pages/test/test-immersiveToIcewindow", PagesTestTestImmersiveToIcewindow);
  __definePage("pages/test/test-onlysafe", PagesTestTestOnlysafe);
  __definePage("pages/test/test-list", PagesTestTestList);
  __definePage("pages/test/test-list-m", PagesTestTestListM);
  __definePage("pages/test/test-slot", PagesTestTestSlot);
  __definePage("pages/test/test-nomsg", PagesTestTestNomsg);
  __definePage("pages/test/test-form", PagesTestTestForm);
  __definePage("pages/test/test-fx", PagesTestTestFx);
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      const globalStore = useGlobalStore();
      const userStore = useUserStore();
      onLaunch(async () => {
        globalStore.getSysInfo();
        if (!userStore.token) {
          const _token = uni.getStorageSync("token");
          if (_token) {
            userStore.token = _token;
            await userStore.getUserInfo();
          } else {
            toast$1("请先登录");
            nav("/pages/login/login", 3);
          }
        }
      });
      onShow(() => {
        formatAppLog("log", "at App.vue:25", "App Show");
      });
      onHide(() => {
        formatAppLog("log", "at App.vue:28", "App Hide");
      });
      return () => {
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/lwz/lwz/mine/uniapp-base/App.vue"]]);
  const mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    methods: {
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = false;
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      // 阻止事件冒泡
      preventEvent(e2) {
        e2 && e2.stopPropagation && e2.stopPropagation();
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    onPageScroll(e2) {
      uni.$emit("uOnPageScroll", e2);
    },
    onHide() {
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o2 = isArray(obj) ? [] : {};
    for (let i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        o2[i2] = typeof obj[i2] === "object" ? deepClone(obj[i2]) : obj[i2];
      }
    }
    return o2;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
  }
  function date(value) {
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (0 === value || isNaN(value))
          return true;
        break;
      case "object":
        if (null === value || value.length === 0)
          return true;
        for (var i2 in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value == "string") {
      try {
        var obj = JSON.parse(value);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e2) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code
  };
  class Request {
    // 设置全局默认配置
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    // 主要请求部分
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        // 请求的根域名
        // 默认的请求头
        header: {},
        method: "POST",
        // 设置为json，返回后uni.request会对数据进行一次JSON.parse
        dataType: "json",
        // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
        responseType: "text",
        showLoading: true,
        // 是否显示请求中的loading
        loadingText: "请求中...",
        loadingTime: 800,
        // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        timer: null,
        // 定时器
        originalData: false,
        // 是否在拦截器中返回服务端的原始数据，见文档说明
        loadingMask: true
        // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      };
      this.interceptor = {
        // 请求前的拦截
        request: null,
        // 请求后的拦截
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  const http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i2 = 0; i2 < value.length; i2++) {
              _result.push(key + "[" + i2 + "]=" + value[i2]);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params);
        return url2 += query;
      }
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni.$u.deepClone(options, this.config);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date2 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date2.getFullYear().toString(),
      // 年
      "m+": (date2.getMonth() + 1).toString(),
      // 月
      "d+": date2.getDate().toString(),
      // 日
      "h+": date2.getHours().toString(),
      // 时
      "M+": date2.getMinutes().toString(),
      // 分
      "s+": date2.getSeconds().toString()
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k2 in opt) {
      ret = new RegExp("(" + k2 + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k2] : opt[k2].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  function timeFrom(dateTime = null, format2 = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(/* @__PURE__ */ new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "分钟前";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "小时前";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "天前";
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "个月前";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "年前";
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i2 = 0; i2 < step; i2++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i2 + startR) + "," + Math.round(sG * i2 + startG) + "," + Math.round(sB * i2 + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i2, i2 + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i2 = 0; i2 < aColor.length; i2++) {
        let hex = Number(aColor[i2]).toString(16);
        hex = String(hex).length == 1 ? "0" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i2 = 0; i2 < aNum.length; i2 += 1) {
          numHex += aNum[i2] + aNum[i2];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i2, i2 + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i2 = 0; i2 < len; i2++)
        uuid[i2] = chars[0 | Math.random() * radix];
    } else {
      let r2;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i2 = 0; i2 < 36; i2++) {
        if (!uuid[i2]) {
          r2 = 0 | Math.random() * 16;
          uuid[i2] = chars[i2 == 19 ? r2 & 3 | 8 : r2];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#2979ff",
    primaryDark: "#2b85e4",
    primaryDisabled: "#a0cfff",
    primaryLight: "#ecf5ff",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  function addUnit(value = "auto", unit = "rpx") {
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  }
  function random(min2, max2) {
    if (min2 >= 0 && max2 > 0 && max2 >= min2) {
      let gab = max2 - min2 + 1;
      return Math.floor(Math.random() * gab + min2);
    } else {
      return 0;
    }
  }
  function trim(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function toast(title, duration = 1500) {
    uni.showToast({
      title,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys2) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys2)) {
          keys2.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i2 in keys2) {
            if (Array.isArray(keys2[i2])) {
              if (keys2[i2].length) {
                data[i2] = keys2[i2];
              } else {
                data[i2] = parent[i2];
              }
            } else if (keys2[i2].constructor === Object) {
              if (Object.keys(keys2[i2]).length) {
                data[i2] = keys2[i2];
              } else {
                data[i2] = parent[i2];
              }
            } else {
              data[i2] = keys2[i2] || keys2[i2] === false ? keys2[i2] : parent[i2];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function os() {
    return uni.getSystemInfoSync().platform;
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func === "function" && func();
    } else {
      timeout = setTimeout(function() {
        typeof func === "function" && func();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  let version = "1.10.1";
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/vk-uview-ui/index.js:13", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    // 另名date
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  const uView = {
    install
  };
  var runtimeExports = {};
  var runtime = {
    get exports() {
      return runtimeExports;
    },
    set exports(v2) {
      runtimeExports = v2;
    }
  };
  (function(module2) {
    var runtime2 = function(exports) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
      };
      var undefined$1;
      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }
      try {
        define({}, "");
      } catch (err) {
        define = function(obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self2, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self2, context) });
        return generator;
      }
      exports.wrap = wrap;
      function tryCatch(fn, obj, arg) {
        try {
          return { type: "normal", arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: "throw", arg: err };
        }
      }
      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";
      var ContinueSentinel = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function() {
        return this;
      });
      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        IteratorPrototype = NativeIteratorPrototype;
      }
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
      defineProperty(
        GeneratorFunctionPrototype,
        "constructor",
        { value: GeneratorFunction, configurable: true }
      );
      GeneratorFunction.displayName = define(
        GeneratorFunctionPrototype,
        toStringTagSymbol,
        "GeneratorFunction"
      );
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
          define(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }
      exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };
      exports.mark = function(genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };
      exports.awrap = function(arg) {
        return { __await: arg };
      };
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function(value2) {
                invoke("next", value2, resolve, reject);
              }, function(err) {
                invoke("throw", err, resolve, reject);
              });
            }
            return PromiseImpl.resolve(value).then(function(unwrapped) {
              result.value = unwrapped;
              resolve(result);
            }, function(error) {
              return invoke("throw", error, resolve, reject);
            });
          }
        }
        var previousPromise;
        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
        }
        defineProperty(this, "_invoke", { value: enqueue });
      }
      defineIteratorMethods(AsyncIterator.prototype);
      define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
      });
      exports.AsyncIterator = AsyncIterator;
      exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0)
          PromiseImpl = Promise;
        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self2, tryLocsList),
          PromiseImpl
        );
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
      };
      function makeInvokeMethod(innerFn, self2, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }
          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }
            return doneResult();
          }
          context.method = method;
          context.arg = arg;
          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel)
                  continue;
                return delegateResult;
              }
            }
            if (context.method === "next") {
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }
              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }
            state = GenStateExecuting;
            var record = tryCatch(innerFn, self2, context);
            if (record.type === "normal") {
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;
              if (record.arg === ContinueSentinel) {
                continue;
              }
              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted;
              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined$1) {
          context.delegate = null;
          if (methodName === "throw" && delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          if (methodName !== "return") {
            context.method = "throw";
            context.arg = new TypeError(
              "The iterator does not provide a '" + methodName + "' method"
            );
          }
          return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }
        if (info.done) {
          context[delegate.resultName] = info.value;
          context.next = delegate.nextLoc;
          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          return info;
        }
        context.delegate = null;
        return ContinueSentinel;
      }
      defineIteratorMethods(Gp);
      define(Gp, toStringTagSymbol, "Generator");
      define(Gp, iteratorSymbol, function() {
        return this;
      });
      define(Gp, "toString", function() {
        return "[object Generator]";
      });
      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };
        if (1 in locs) {
          entry.catchLoc = locs[1];
        }
        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [{ tryLoc: "root" }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }
      exports.keys = function(val) {
        var object2 = Object(val);
        var keys2 = [];
        for (var key in object2) {
          keys2.push(key);
        }
        keys2.reverse();
        return function next() {
          while (keys2.length) {
            var key2 = keys2.pop();
            if (key2 in object2) {
              next.value = key2;
              next.done = false;
              return next;
            }
          }
          next.done = true;
          return next;
        };
      };
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }
          if (typeof iterable.next === "function") {
            return iterable;
          }
          if (!isNaN(iterable.length)) {
            var i2 = -1, next = function next2() {
              while (++i2 < iterable.length) {
                if (hasOwn.call(iterable, i2)) {
                  next2.value = iterable[i2];
                  next2.done = false;
                  return next2;
                }
              }
              next2.value = undefined$1;
              next2.done = true;
              return next2;
            };
            return next.next = next;
          }
        }
        return { next: doneResult };
      }
      exports.values = values;
      function doneResult() {
        return { value: undefined$1, done: true };
      }
      Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);
          if (!skipTempReset) {
            for (var name in this) {
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }
          return this.rval;
        },
        dispatchException: function(exception) {
          if (this.done) {
            throw exception;
          }
          var context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;
            if (caught) {
              context.method = "next";
              context.arg = undefined$1;
            }
            return !!caught;
          }
          for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
            var entry = this.tryEntries[i2];
            var record = entry.completion;
            if (entry.tryLoc === "root") {
              return handle("end");
            }
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function(type, arg) {
          for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
            var entry = this.tryEntries[i2];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            finallyEntry = null;
          }
          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;
          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }
          return this.complete(record);
        },
        complete: function(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }
          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }
          return ContinueSentinel;
        },
        finish: function(finallyLoc) {
          for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
            var entry = this.tryEntries[i2];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function(tryLoc) {
          for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
            var entry = this.tryEntries[i2];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName,
            nextLoc
          };
          if (this.method === "next") {
            this.arg = undefined$1;
          }
          return ContinueSentinel;
        }
      };
      return exports;
    }(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module2.exports
    );
    try {
      regeneratorRuntime = runtime2;
    } catch (accidentalStrictMode) {
      if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime2;
      } else {
        Function("r", "regeneratorRuntime = r")(runtime2);
      }
    }
  })(runtime);
  const regeneratorRuntime$1 = runtimeExports;
  function t(t2, e2) {
    var r2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var n2 = Object.getOwnPropertySymbols(t2);
      e2 && (n2 = n2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), r2.push.apply(r2, n2);
    }
    return r2;
  }
  function e(e2) {
    for (var r2 = 1; arguments.length > r2; r2++) {
      var n2 = null != arguments[r2] ? arguments[r2] : {};
      r2 % 2 ? t(Object(n2), true).forEach(function(t2) {
        s(e2, t2, n2[t2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : t(Object(n2)).forEach(function(t2) {
        Object.defineProperty(e2, t2, Object.getOwnPropertyDescriptor(n2, t2));
      });
    }
    return e2;
  }
  function r(t2) {
    return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
      return typeof t3;
    } : function(t3) {
      return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
    }, r(t2);
  }
  function n(t2, e2, r2, n2, a2, o2, s2) {
    try {
      var u2 = t2[o2](s2), i2 = u2.value;
    } catch (t3) {
      return void r2(t3);
    }
    u2.done ? e2(i2) : Promise.resolve(i2).then(n2, a2);
  }
  function a(t2) {
    return function() {
      var e2 = this, r2 = arguments;
      return new Promise(function(a2, o2) {
        var s2 = t2.apply(e2, r2);
        function u2(t3) {
          n(s2, a2, o2, u2, i2, "next", t3);
        }
        function i2(t3) {
          n(s2, a2, o2, u2, i2, "throw", t3);
        }
        u2(void 0);
      });
    };
  }
  function o(t2, e2) {
    for (var r2 = 0; e2.length > r2; r2++) {
      var n2 = e2[r2];
      n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t2, n2.key, n2);
    }
  }
  function s(t2, e2, r2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: r2, enumerable: true, configurable: true, writable: true }) : t2[e2] = r2, t2;
  }
  function u(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var r2 = 0, n2 = Array(e2); e2 > r2; r2++)
      n2[r2] = t2[r2];
    return n2;
  }
  function i(t2, e2) {
    var r2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
    if (!r2) {
      if (Array.isArray(t2) || (r2 = function(t3, e3) {
        if (t3) {
          if ("string" == typeof t3)
            return u(t3, e3);
          var r3 = Object.prototype.toString.call(t3).slice(8, -1);
          return "Object" === r3 && t3.constructor && (r3 = t3.constructor.name), "Map" === r3 || "Set" === r3 ? Array.from(t3) : "Arguments" === r3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3) ? u(t3, e3) : void 0;
        }
      }(t2)) || e2 && t2 && "number" == typeof t2.length) {
        r2 && (t2 = r2);
        var n2 = 0, a2 = function() {
        };
        return { s: a2, n: function() {
          return t2.length > n2 ? { done: false, value: t2[n2++] } : { done: true };
        }, e: function(t3) {
          throw t3;
        }, f: a2 };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o2, s2 = true, i2 = false;
    return { s: function() {
      r2 = r2.call(t2);
    }, n: function() {
      var t3 = r2.next();
      return s2 = t3.done, t3;
    }, e: function(t3) {
      i2 = true, o2 = t3;
    }, f: function() {
      try {
        s2 || null == r2.return || r2.return();
      } finally {
        if (i2)
          throw o2;
      }
    } };
  }
  var c = [], h = [], l = [], f = { allowAction: true, routerParams: null, passedParams: null, current: {}, afterNotNext: null, actionInfo: { navigateBack: null, switchTab: null }, actionType: null }, p = /[^\x20-\x7E]/, m = /[\x2E\u3002\uFF0E\uFF61]/g, v = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, g = Math.floor, y = String.fromCharCode;
  function d(t2) {
    throw new RangeError(v[t2]);
  }
  function b(t2, e2) {
    return t2 + 22 + 75 * (26 > t2) - ((0 != e2) << 5);
  }
  function x(t2, e2, r2) {
    var n2 = 0;
    for (t2 = r2 ? g(t2 / 700) : t2 >> 1, t2 += g(t2 / e2); t2 > 455; n2 += 36)
      t2 = g(t2 / 35);
    return g(n2 + 36 * t2 / (t2 + 38));
  }
  function w(t2) {
    return function(t3, e2) {
      var r2 = t3.split("@"), n2 = "";
      r2.length > 1 && (n2 = r2[0] + "@", t3 = r2[1]);
      var a2 = function(t4, e3) {
        for (var r3 = t4.length, n3 = []; r3--; )
          n3[r3] = e3(t4[r3]);
        return n3;
      }((t3 = t3.replace(m, ".")).split("."), e2).join(".");
      return n2 + a2;
    }(t2, function(t3) {
      return p.test(t3) ? "xn--" + function(t4) {
        var e2, r2, n2, a2, o2, s2, u2, i2, c2, h2, l2, f2, p2, m2, v2, w2 = [];
        for (f2 = (t4 = function(t5) {
          for (var e3, r3, n3 = [], a3 = 0, o3 = t5.length; o3 > a3; )
            55296 > (e3 = t5.charCodeAt(a3++)) || e3 > 56319 || a3 >= o3 ? n3.push(e3) : 56320 == (64512 & (r3 = t5.charCodeAt(a3++))) ? n3.push(((1023 & e3) << 10) + (1023 & r3) + 65536) : (n3.push(e3), a3--);
          return n3;
        }(t4)).length, e2 = 128, r2 = 0, o2 = 72, s2 = 0; f2 > s2; ++s2)
          128 > (l2 = t4[s2]) && w2.push(y(l2));
        for (n2 = a2 = w2.length, a2 && w2.push("-"); f2 > n2; ) {
          for (u2 = 2147483647, s2 = 0; f2 > s2; ++s2)
            (l2 = t4[s2]) >= e2 && u2 > l2 && (u2 = l2);
          for (u2 - e2 > g((2147483647 - r2) / (p2 = n2 + 1)) && d("overflow"), r2 += (u2 - e2) * p2, e2 = u2, s2 = 0; f2 > s2; ++s2)
            if (e2 > (l2 = t4[s2]) && ++r2 > 2147483647 && d("overflow"), l2 == e2) {
              for (i2 = r2, c2 = 36; (h2 = c2 > o2 ? o2 + 26 > c2 ? c2 - o2 : 26 : 1) <= i2; c2 += 36)
                w2.push(y(b(h2 + (v2 = i2 - h2) % (m2 = 36 - h2), 0))), i2 = g(v2 / m2);
              w2.push(y(b(i2, 0))), o2 = x(r2, p2, n2 == a2), r2 = 0, ++n2;
            }
          ++r2, ++e2;
        }
        return w2.join("");
      }(t3) : t3;
    });
  }
  function P(t2) {
    return null === t2;
  }
  function O(t2) {
    return "string" == typeof t2;
  }
  function j(t2) {
    return "object" == r(t2) && null !== t2;
  }
  function $(t2, e2) {
    return Object.prototype.hasOwnProperty.call(t2, e2);
  }
  var k = Array.isArray || function(t2) {
    return "[object Array]" === Object.prototype.toString.call(t2);
  };
  function A(t2) {
    switch (r(t2)) {
      case "string":
        return t2;
      case "boolean":
        return t2 ? "true" : "false";
      case "number":
        return isFinite(t2) ? t2 : "";
      default:
        return "";
    }
  }
  function C(t2, e2) {
    if (t2.map)
      return t2.map(e2);
    for (var r2 = [], n2 = 0; t2.length > n2; n2++)
      r2.push(e2(t2[n2], n2));
    return r2;
  }
  var E = Object.keys || function(t2) {
    var e2 = [];
    for (var r2 in t2)
      Object.prototype.hasOwnProperty.call(t2, r2) && e2.push(r2);
    return e2;
  };
  function S(t2, e2, r2, n2) {
    r2 = r2 || "=";
    var a2 = {};
    if ("string" != typeof t2 || 0 === t2.length)
      return a2;
    var o2 = /\+/g;
    t2 = t2.split(e2 = e2 || "&");
    var s2 = 1e3;
    n2 && "number" == typeof n2.maxKeys && (s2 = n2.maxKeys);
    var u2 = t2.length;
    s2 > 0 && u2 > s2 && (u2 = s2);
    for (var i2 = 0; u2 > i2; ++i2) {
      var c2, h2, l2, f2, p2 = t2[i2].replace(o2, "%20"), m2 = p2.indexOf(r2);
      0 > m2 ? (c2 = p2, h2 = "") : (c2 = p2.substr(0, m2), h2 = p2.substr(m2 + 1)), l2 = decodeURIComponent(c2), f2 = decodeURIComponent(h2), $(a2, l2) ? k(a2[l2]) ? a2[l2].push(f2) : a2[l2] = [a2[l2], f2] : a2[l2] = f2;
    }
    return a2;
  }
  var I = function(t2, e2) {
    return K(t2, false, true).resolve(e2);
  };
  function R() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
  }
  var q = /^([a-z0-9.+-]+:)/i, U = /:[0-9]*$/, T = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, N = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "	"]), L = ["'"].concat(N), _ = ["%", "/", "?", ";", "#"].concat(L), V = ["/", "?", "#"], B = /^[+a-z0-9A-Z_-]{0,63}$/, F = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, M = { javascript: true, "javascript:": true }, D = { javascript: true, "javascript:": true }, z = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true };
  function K(t2, e2, r2) {
    if (t2 && j(t2) && t2 instanceof R)
      return t2;
    var n2 = new R();
    return n2.parse(t2, e2, r2), n2;
  }
  function Z(t2, e2, n2, a2) {
    if (!O(e2))
      throw new TypeError("Parameter 'url' must be a string, not " + r(e2));
    var o2 = e2.indexOf("?"), s2 = -1 !== o2 && o2 < e2.indexOf("#") ? "?" : "#", u2 = e2.split(s2);
    u2[0] = u2[0].replace(/\\/g, "/");
    var i2 = e2 = u2.join(s2);
    if (i2 = i2.trim(), !a2 && 1 === e2.split("#").length) {
      var c2 = T.exec(i2);
      if (c2)
        return t2.path = i2, t2.href = i2, t2.pathname = c2[1], c2[2] ? (t2.search = c2[2], t2.query = n2 ? S(t2.search.substr(1)) : t2.search.substr(1)) : n2 && (t2.search = "", t2.query = {}), t2;
    }
    var h2, l2, f2, p2 = q.exec(i2);
    if (p2) {
      var m2 = (p2 = p2[0]).toLowerCase();
      t2.protocol = m2, i2 = i2.substr(p2.length);
    }
    if (a2 || p2 || i2.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var v2 = "//" === i2.substr(0, 2);
      !v2 || p2 && D[p2] || (i2 = i2.substr(2), t2.slashes = true);
    }
    if (!D[p2] && (v2 || p2 && !z[p2])) {
      var g2, y2, d2 = -1;
      for (h2 = 0; V.length > h2; h2++)
        -1 === (l2 = i2.indexOf(V[h2])) || -1 !== d2 && l2 >= d2 || (d2 = l2);
      for (-1 !== (y2 = -1 === d2 ? i2.lastIndexOf("@") : i2.lastIndexOf("@", d2)) && (g2 = i2.slice(0, y2), i2 = i2.slice(y2 + 1), t2.auth = decodeURIComponent(g2)), d2 = -1, h2 = 0; _.length > h2; h2++)
        -1 === (l2 = i2.indexOf(_[h2])) || -1 !== d2 && l2 >= d2 || (d2 = l2);
      -1 === d2 && (d2 = i2.length), t2.host = i2.slice(0, d2), i2 = i2.slice(d2), G(t2), t2.hostname = t2.hostname || "";
      var b2 = "[" === t2.hostname[0] && "]" === t2.hostname[t2.hostname.length - 1];
      if (!b2) {
        var x2 = t2.hostname.split(/\./);
        for (h2 = 0, f2 = x2.length; f2 > h2; h2++) {
          var P2 = x2[h2];
          if (P2 && !P2.match(B)) {
            for (var j2 = "", $2 = 0, k2 = P2.length; k2 > $2; $2++)
              P2.charCodeAt($2) > 127 ? j2 += "x" : j2 += P2[$2];
            if (!j2.match(B)) {
              var A2 = x2.slice(0, h2), C2 = x2.slice(h2 + 1), E2 = P2.match(F);
              E2 && (A2.push(E2[1]), C2.unshift(E2[2])), C2.length && (i2 = "/" + C2.join(".") + i2), t2.hostname = A2.join(".");
              break;
            }
          }
        }
      }
      t2.hostname = t2.hostname.length > 255 ? "" : t2.hostname.toLowerCase(), b2 || (t2.hostname = w(t2.hostname)), t2.host = (t2.hostname || "") + (t2.port ? ":" + t2.port : ""), t2.href += t2.host, b2 && (t2.hostname = t2.hostname.substr(1, t2.hostname.length - 2), "/" !== i2[0] && (i2 = "/" + i2));
    }
    if (!M[m2])
      for (h2 = 0, f2 = L.length; f2 > h2; h2++) {
        var I2 = L[h2];
        if (-1 !== i2.indexOf(I2)) {
          var R2 = encodeURIComponent(I2);
          R2 === I2 && (R2 = escape(I2)), i2 = i2.split(I2).join(R2);
        }
      }
    var U2 = i2.indexOf("#");
    -1 !== U2 && (t2.hash = i2.substr(U2), i2 = i2.slice(0, U2));
    var N2 = i2.indexOf("?");
    return -1 !== N2 ? (t2.search = i2.substr(N2), t2.query = i2.substr(N2 + 1), n2 && (t2.query = S(t2.query)), i2 = i2.slice(0, N2)) : n2 && (t2.search = "", t2.query = {}), i2 && (t2.pathname = i2), z[m2] && t2.hostname && !t2.pathname && (t2.pathname = "/"), (t2.pathname || t2.search) && (t2.path = (t2.pathname || "") + (t2.search || "")), t2.href = H(t2), t2;
  }
  function H(t2) {
    var e2 = t2.auth || "";
    e2 && (e2 = (e2 = encodeURIComponent(e2)).replace(/%3A/i, ":"), e2 += "@");
    var n2, a2, o2, s2 = t2.protocol || "", u2 = t2.pathname || "", i2 = t2.hash || "", c2 = false, h2 = "";
    t2.host ? c2 = e2 + t2.host : t2.hostname && (c2 = e2 + (-1 === t2.hostname.indexOf(":") ? t2.hostname : "[" + this.hostname + "]"), t2.port && (c2 += ":" + t2.port)), t2.query && j(t2.query) && Object.keys(t2.query).length && (a2 = a2 || "&", o2 = o2 || "=", null === (n2 = t2.query) && (n2 = void 0), h2 = "object" == r(n2) ? C(E(n2), function(t3) {
      var e3 = encodeURIComponent(A(t3)) + o2;
      return k(n2[t3]) ? C(n2[t3], function(t4) {
        return e3 + encodeURIComponent(A(t4));
      }).join(a2) : e3 + encodeURIComponent(A(n2[t3]));
    }).join(a2) : "");
    var l2 = t2.search || h2 && "?" + h2 || "";
    return s2 && ":" !== s2.substr(-1) && (s2 += ":"), t2.slashes || (!s2 || z[s2]) && false !== c2 ? (c2 = "//" + (c2 || ""), u2 && "/" !== u2.charAt(0) && (u2 = "/" + u2)) : c2 || (c2 = ""), i2 && "#" !== i2.charAt(0) && (i2 = "#" + i2), l2 && "?" !== l2.charAt(0) && (l2 = "?" + l2), s2 + c2 + (u2 = u2.replace(/[?#]/g, function(t3) {
      return encodeURIComponent(t3);
    })) + (l2 = l2.replace("#", "%23")) + i2;
  }
  function G(t2) {
    var e2 = t2.host, r2 = U.exec(e2);
    r2 && (":" !== (r2 = r2[0]) && (t2.port = r2.substr(1)), e2 = e2.substr(0, e2.length - r2.length)), e2 && (t2.hostname = e2);
  }
  R.prototype.parse = function(t2, e2, r2) {
    return Z(this, t2, e2, r2);
  }, R.prototype.format = function() {
    return H(this);
  }, R.prototype.resolve = function(t2) {
    return this.resolveObject(K(t2, false, true)).format();
  }, R.prototype.resolveObject = function(t2) {
    if (O(t2)) {
      var e2 = new R();
      e2.parse(t2, false, true), t2 = e2;
    }
    for (var r2, n2 = new R(), a2 = Object.keys(this), o2 = 0; a2.length > o2; o2++) {
      var s2 = a2[o2];
      n2[s2] = this[s2];
    }
    if (n2.hash = t2.hash, "" === t2.href)
      return n2.href = n2.format(), n2;
    if (t2.slashes && !t2.protocol) {
      for (var u2 = Object.keys(t2), i2 = 0; u2.length > i2; i2++) {
        var c2 = u2[i2];
        "protocol" !== c2 && (n2[c2] = t2[c2]);
      }
      return z[n2.protocol] && n2.hostname && !n2.pathname && (n2.path = n2.pathname = "/"), n2.href = n2.format(), n2;
    }
    if (t2.protocol && t2.protocol !== n2.protocol) {
      if (!z[t2.protocol]) {
        for (var h2 = Object.keys(t2), l2 = 0; h2.length > l2; l2++) {
          var f2 = h2[l2];
          n2[f2] = t2[f2];
        }
        return n2.href = n2.format(), n2;
      }
      if (n2.protocol = t2.protocol, t2.host || D[t2.protocol])
        n2.pathname = t2.pathname;
      else {
        for (r2 = (t2.pathname || "").split("/"); r2.length && !(t2.host = r2.shift()); )
          ;
        t2.host || (t2.host = ""), t2.hostname || (t2.hostname = ""), "" !== r2[0] && r2.unshift(""), 2 > r2.length && r2.unshift(""), n2.pathname = r2.join("/");
      }
      return n2.search = t2.search, n2.query = t2.query, n2.host = t2.host || "", n2.auth = t2.auth, n2.hostname = t2.hostname || t2.host, n2.port = t2.port, (n2.pathname || n2.search) && (n2.path = (n2.pathname || "") + (n2.search || "")), n2.slashes = n2.slashes || t2.slashes, n2.href = n2.format(), n2;
    }
    var p2, m2 = n2.pathname && "/" === n2.pathname.charAt(0), v2 = t2.host || t2.pathname && "/" === t2.pathname.charAt(0), g2 = v2 || m2 || n2.host && t2.pathname, y2 = g2, d2 = n2.pathname && n2.pathname.split("/") || [], b2 = n2.protocol && !z[n2.protocol];
    if (r2 = t2.pathname && t2.pathname.split("/") || [], b2 && (n2.hostname = "", n2.port = null, n2.host && ("" === d2[0] ? d2[0] = n2.host : d2.unshift(n2.host)), n2.host = "", t2.protocol && (t2.hostname = null, t2.port = null, t2.host && ("" === r2[0] ? r2[0] = t2.host : r2.unshift(t2.host)), t2.host = null), g2 = g2 && ("" === r2[0] || "" === d2[0])), v2)
      n2.host = t2.host || "" === t2.host ? t2.host : n2.host, n2.hostname = t2.hostname || "" === t2.hostname ? t2.hostname : n2.hostname, n2.search = t2.search, n2.query = t2.query, d2 = r2;
    else if (r2.length)
      d2 || (d2 = []), d2.pop(), d2 = d2.concat(r2), n2.search = t2.search, n2.query = t2.query;
    else if (null != t2.search)
      return b2 && (n2.hostname = n2.host = d2.shift(), (p2 = !(!n2.host || 0 >= n2.host.indexOf("@")) && n2.host.split("@")) && (n2.auth = p2.shift(), n2.host = n2.hostname = p2.shift())), n2.search = t2.search, n2.query = t2.query, P(n2.pathname) && P(n2.search) || (n2.path = (n2.pathname ? n2.pathname : "") + (n2.search ? n2.search : "")), n2.href = n2.format(), n2;
    if (!d2.length)
      return n2.pathname = null, n2.path = n2.search ? "/" + n2.search : null, n2.href = n2.format(), n2;
    for (var x2 = d2.slice(-1)[0], w2 = (n2.host || t2.host || d2.length > 1) && ("." === x2 || ".." === x2) || "" === x2, j2 = 0, $2 = d2.length; $2 >= 0; $2--)
      "." === (x2 = d2[$2]) ? d2.splice($2, 1) : ".." === x2 ? (d2.splice($2, 1), j2++) : j2 && (d2.splice($2, 1), j2--);
    if (!g2 && !y2)
      for (; j2--; j2)
        d2.unshift("..");
    !g2 || "" === d2[0] || d2[0] && "/" === d2[0].charAt(0) || d2.unshift(""), w2 && "/" !== d2.join("/").substr(-1) && d2.push("");
    var k2 = "" === d2[0] || d2[0] && "/" === d2[0].charAt(0);
    return b2 && (n2.hostname = n2.host = k2 ? "" : d2.length ? d2.shift() : "", (p2 = !(!n2.host || 0 >= n2.host.indexOf("@")) && n2.host.split("@")) && (n2.auth = p2.shift(), n2.host = n2.hostname = p2.shift())), (g2 = g2 || n2.host && d2.length) && !k2 && d2.unshift(""), d2.length ? n2.pathname = d2.join("/") : (n2.pathname = null, n2.path = null), P(n2.pathname) && P(n2.search) || (n2.path = (n2.pathname ? n2.pathname : "") + (n2.search ? n2.search : "")), n2.auth = t2.auth || n2.auth, n2.slashes = n2.slashes || t2.slashes, n2.href = n2.format(), n2;
  }, R.prototype.parseHost = function() {
    return G(this);
  };
  var J = "app";
  function tt(t2) {
    var e2 = t2.$options;
    f.VUE3 && t2.$ && (e2 = t2.$), e2.onLoad || (e2.onLoad = []), "function" == typeof e2.onLoad && (e2.onLoad = [e2.onShow]), 0 > e2.onLoad.indexOf(kt) && e2.onLoad.unshift(kt), e2.onShow || (e2.onShow = []), "function" == typeof e2.onShow && (e2.onShow = [e2.onShow]), 0 > e2.onShow.indexOf(At) && e2.onShow.unshift(At);
  }
  function et() {
    var t2 = void 0;
    Object.defineProperty(xt(), "$vm", { get: function() {
      return t2;
    }, set: function(e2) {
      tt(e2);
      var r2 = getCurrentPages(), n2 = r2[r2.length - 2];
      n2 && tt(n2.$vm), t2 = e2;
    } });
  }
  function rt(t2) {
    ft(t2, "passedParams"), ft(t2, "routeParams");
  }
  function nt(t2) {
    var e2 = this, r2 = function() {
      for (var r3 = arguments.length, n2 = Array(r3), a2 = 0; r3 > a2; a2++)
        n2[a2] = arguments[a2];
      tt(n2[0]), t2.apply(e2, n2);
    };
    return r2.isInjected = true, r2;
  }
  function at(t2) {
    return ot.apply(this, arguments);
  }
  function ot() {
    return ot = a(regeneratorRuntime$1.mark(function t2(e2) {
      var r2, n2, a2, o2, s2, u2, i2, c2, h2, l2, p2, m2, v2, g2 = arguments;
      return regeneratorRuntime$1.wrap(function(t3) {
        for (; ; )
          switch (t3.prev = t3.next) {
            case 0:
              if (c2 = function() {
                f.passedParams = s2, f.routeParams = u2;
              }, r2 = g2.length > 1 && void 0 !== g2[1] ? g2[1] : {}, n2 = g2.length > 2 ? g2[2] : void 0, a2 = xt(), o2 = false, s2 = f.passedParams, u2 = f.routeParams, rt(r2), "navigateBack" !== n2) {
                t3.next = 30;
                break;
              }
              if (h2 = getCurrentPages().length, (i2 = 1 === h2 ? a2 : getCurrentPages()[h2 - 2]).$vm && i2.$vm._$weex && (o2 = true), l2 = e2.call(uni, r2), !(o2 && l2 instanceof Promise)) {
                t3.next = 28;
                break;
              }
              return f.allowAction = true, t3.prev = 15, t3.next = 18, l2;
            case 18:
              if (t3.t0 = t3.sent.length, 1 !== t3.t0) {
                t3.next = 21;
                break;
              }
              c2();
            case 21:
              t3.next = 26;
              break;
            case 23:
              t3.prev = 23, t3.t1 = t3.catch(15), c2();
            case 26:
              t3.next = 29;
              break;
            case 28:
              return t3.abrupt("return", c2);
            case 29:
              return t3.abrupt("return", l2);
            case 30:
              return p2 = e2.call(uni, r2), m2 = xt(), ["app-plus", "app"].indexOf(J) > -1 && (f.VUE3 ? (v2 = m2.__setup) && (v2.isInjected || (m2.__setup = nt(v2))) : m2.$vm || et()), t3.abrupt("return", p2);
            case 34:
            case "end":
              return t3.stop();
          }
      }, t2, null, [[15, 23]]);
    })), ot.apply(this, arguments);
  }
  var st = false;
  function ut(t2, e2) {
    var r2 = t2.indexOf(e2);
    t2.splice(r2, 1);
  }
  function it(t2, e2, r2) {
    return ct.apply(this, arguments);
  }
  function ct() {
    return (ct = a(regeneratorRuntime$1.mark(function t2(e2, r2, n2) {
      var a2, o2, s2, u2, c2;
      return regeneratorRuntime$1.wrap(function(t3) {
        for (; ; )
          switch (t3.prev = t3.next) {
            case 0:
              o2 = function() {
                f.afterNotNext = null, a2 = false;
              }, a2 = true, s2 = i(e2), t3.prev = 3, s2.s();
            case 5:
              if ((u2 = s2.n()).done) {
                t3.next = 14;
                break;
              }
              return c2 = u2.value, t3.next = 9, c2(r2, n2, o2);
            case 9:
              if (!a2) {
                t3.next = 11;
                break;
              }
              return t3.abrupt("return", false);
            case 11:
              a2 = true;
            case 12:
              t3.next = 5;
              break;
            case 14:
              t3.next = 19;
              break;
            case 16:
              t3.prev = 16, t3.t0 = t3.catch(3), s2.e(t3.t0);
            case 19:
              return t3.prev = 19, s2.f(), t3.finish(19);
            case 22:
              return t3.abrupt("return", true);
            case 23:
            case "end":
              return t3.stop();
          }
      }, t2, null, [[3, 16, 19, 22]]);
    }))).apply(this, arguments);
  }
  function ht(t2, e2, r2) {
    t2.forEach(function(t3) {
      t3(e2, r2);
    });
  }
  function lt(t2) {
    var e2 = f[t2];
    return f[t2] = null, e2;
  }
  function ft(t2, n2) {
    return "object" === r(t2[n2]) && (f[n2] = e({}, t2[n2])), t2;
  }
  function pt() {
    var t2 = f.afterNotNext;
    f.afterNotNext = null, "function" == typeof t2 && t2();
  }
  function mt(t2, e2, r2, n2) {
    return vt.apply(this, arguments);
  }
  function vt() {
    return (vt = a(regeneratorRuntime$1.mark(function t2(e2, r2, n2, a2) {
      var o2;
      return regeneratorRuntime$1.wrap(function(t3) {
        for (; ; )
          switch (t3.prev = t3.next) {
            case 0:
              return $t.called = null, t3.prev = 1, t3.next = 4, e2;
            case 4:
              if (1 !== (o2 = t3.sent).length) {
                t3.next = 10;
                break;
              }
              f.allowAction = true, ht(l, r2, n2), t3.next = 14;
              break;
            case 10:
              if ("reLaunch" !== a2 || 1 !== getCurrentPages().length || bt() !== r2.url || "h5" !== J) {
                t3.next = 13;
                break;
              }
              return Pt(), t3.abrupt("return", o2);
            case 13:
              ("navigateBack" === a2 && 1 === getCurrentPages().length || ["app-plus", "app"].indexOf(J) > -1) && (Pt(), f.current = wt());
            case 14:
              return t3.abrupt("return", o2);
            case 17:
              return t3.prev = 17, t3.t0 = t3.catch(1), f.allowAction = true, ht(l, r2, n2), t3.abrupt("return", Error(t3.t0));
            case 22:
            case "end":
              return t3.stop();
          }
      }, t2, null, [[1, 17]]);
    }))).apply(this, arguments);
  }
  function gt(t2) {
    var r2 = e({}, t2);
    return Object.keys(r2).forEach(function(t3) {
      r2[t3] = decodeURIComponent(r2[t3]);
    }), r2;
  }
  function yt(t2) {
    var e2 = [];
    return Object.keys(t2).forEach(function(r2) {
      e2.push("".concat(r2, "=").concat(encodeURIComponent(t2[r2])));
    }), e2.join("&");
  }
  function dt(t2) {
    var e2;
    if (t2) {
      return t2.options || (null === (e2 = t2.$page) || void 0 === e2 ? void 0 : e2.options) || {};
    }
  }
  function bt() {
    var t2 = getCurrentPages();
    return t2[t2.length - 1].route;
  }
  function xt() {
    var t2 = getCurrentPages();
    return t2[t2.length - 1];
  }
  function wt() {
    var t2 = xt(), e2 = dt(t2);
    return e2 = gt(e2), { url: bt(), routeParams: t2.$routeParams, passedParams: t2.$passedParams, query: e2, search: yt(e2) };
  }
  function Pt(t2) {
    st && (f.allowAction = true, t2 && t2()), st = false;
  }
  function Ot(t2) {
    var e2 = uni[t2];
    uni[t2] = function(r2) {
      return function(t3) {
        var e3 = this, r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = arguments.length > 2 ? arguments[2] : void 0;
        try {
          bt();
        } catch (e4) {
          return t3.call(uni, r3);
        }
        var o2 = wt(), s2 = r3.fail, u2 = r3.success, i2 = r3.complete;
        if (!f.allowAction) {
          var h2 = "动作被拦截，因为已经有一个正在执行的路由动作";
          return s2 || u2 || i2 ? r3.fail && r3.fail({ errMsg: h2 }) : [{ errMsg: h2 }];
        }
        f.allowAction = false, st = false;
        var p2, m2 = bt(), v2 = {}, g2 = "";
        if ("navigateBack" === n2) {
          var y2 = r3.delta, d2 = void 0 === y2 ? 1 : y2, b2 = getCurrentPages().length - 1 - d2;
          0 > b2 && (b2 = 0), f.actionInfo.navigateBack = b2, p2 = getCurrentPages()[b2].route, g2 = yt(v2 = dt(getCurrentPages()[b2])), v2 = gt(v2);
        } else {
          var x2 = (p2 = I(m2, r3.url || "").replace(/^\/([^\/])/, "$1")).match(/([^?]+)\?([\s\S]*)/);
          p2 = x2 && x2[1] || p2, x2 && x2[2] && (g2 = x2[2], x2[2].split("&").forEach(function(t4) {
            if (t4) {
              var e4 = t4.match(/^([^=]+)=([\s\S]*)$/);
              e4 && e4[2] ? v2[e4[1]] = e4[2] : v2[t4] = "";
            }
          })), v2 = gt(v2);
        }
        "switchTab" === n2 && (f.actionInfo.switchTab = p2), f.actionType = n2;
        var w2, P2 = { url: p2, routeParams: r3.routeParams, passedParams: r3.passedParams, query: v2, jumpType: n2, search: g2 };
        return s2 || u2 || i2 ? (r3.fail = function() {
          var t4;
          w2 instanceof Function && w2(), f.allowAction = true;
          for (var r4 = arguments.length, n3 = Array(r4), a2 = 0; r4 > a2; a2++)
            n3[a2] = arguments[a2];
          if (null != n3 && null !== (t4 = n3[0]) && void 0 !== t4 && t4.innerError || ht(l, P2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : f.current), s2)
            return s2.apply(e3, n3);
        }, "reLaunch" === n2 && 1 === getCurrentPages().length && bt() === P2.url && "h5" === J && (r3.success = function() {
          if (Pt(), u2) {
            for (var t4 = arguments.length, r4 = Array(t4), n3 = 0; t4 > n3; n3++)
              r4[n3] = arguments[n3];
            return u2.apply(e3, r4);
          }
        }), ("navigateBack" === n2 && 1 === getCurrentPages().length || ["app-plus", "app"].indexOf(J) > -1) && (r3.success = function() {
          if (Pt(), f.current = wt(), u2) {
            for (var t4 = arguments.length, r4 = Array(t4), n3 = 0; t4 > n3; n3++)
              r4[n3] = arguments[n3];
            return u2.apply(e3, r4);
          }
        }), void a(regeneratorRuntime$1.mark(function e4() {
          return regeneratorRuntime$1.wrap(function(e5) {
            for (; ; )
              switch (e5.prev = e5.next) {
                case 0:
                  return e5.next = 2, it(c, P2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : f.current);
                case 2:
                  if (e5.sent) {
                    e5.next = 6;
                    break;
                  }
                  return r3.fail({ errMsg: "beforeEach中没有使用next", innerError: 1 }), pt(), e5.abrupt("return");
                case 6:
                  st = true, w2 = at(t3, r3, n2);
                case 10:
                case "end":
                  return e5.stop();
              }
          }, e4);
        }))()) : a(regeneratorRuntime$1.mark(function e4() {
          var a2;
          return regeneratorRuntime$1.wrap(function(e5) {
            for (; ; )
              switch (e5.prev = e5.next) {
                case 0:
                  return e5.next = 2, it(c, P2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : f.current);
                case 2:
                  if (e5.sent) {
                    e5.next = 6;
                    break;
                  }
                  return f.allowAction = true, pt(), e5.abrupt("return", [{ errMsg: "beforeEach中没有使用next", innerError: 1 }]);
                case 6:
                  return st = true, a2 = at(t3, r3, n2), e5.abrupt("return", mt(a2, P2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : f.current, n2));
                case 11:
                case "end":
                  return e5.stop();
              }
          }, e4);
        }))();
      }(e2, r2, t2);
    };
  }
  function jt(t2) {
    try {
      xt(), t2 && t2();
    } catch (e2) {
      setTimeout(function() {
        jt(t2);
      }, 13);
    }
  }
  function $t() {
    var t2 = function() {
      Pt(function() {
        !function() {
          var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : xt();
          "$routeParams" in t4 || (t4.$routeParams = lt("routeParams")), t4.$passedParams = lt("passedParams"), f.VUE3 && ["app-plus", "app"].indexOf(J) > -1 && (t4.$page.$passedParams = t4.$passedParams, "$routeParams" in t4.$page || (t4.$page.$routeParams = t4.$routeParams)), t4.$vm && (t4.$vm.$passedParams = t4.$passedParams, "$routeParams" in t4.$vm || (t4.$vm.$routeParams = t4.$routeParams));
        }();
      });
      var t3 = wt();
      ht(h, t3, f.current), f.current = t3;
    };
    if (-1 < ["app-plus", "app"].indexOf(J))
      jt(t2);
    else {
      try {
        bt();
      } catch (t3) {
        return;
      }
      this.globalData || t2();
    }
  }
  function kt() {
    $t.called || ($t.call(this), $t.called = true, setTimeout(function() {
      $t.called = null;
    }));
  }
  function At() {
    $t.called || ($t.call(this), $t.called = true, setTimeout(function() {
      $t.called = null;
    }));
  }
  var Ct = new (function() {
    function t2() {
      !function(t3, e3) {
        if (!(t3 instanceof e3))
          throw new TypeError("Cannot call a class as a function");
      }(this, t2);
    }
    var e2, r2;
    return e2 = t2, (r2 = [{ key: "beforeEach", value: function(t3) {
      return c.push(t3), function() {
        ut(c, t3);
      };
    } }, { key: "afterEach", value: function(t3) {
      return h.push(t3), function() {
        ut(h, t3);
      };
    } }, { key: "onError", value: function(t3) {
      return l.push(t3), function() {
        ut(l, t3);
      };
    } }, { key: "afterNotNext", value: function(t3) {
      return f.afterNotNext = t3, this;
    } }, { key: "install", value: function(t3, e3) {
      return f.VUE3 = 3 === parseInt(t3.version), function(t4, e4) {
        t4.mixin({ onLoad: kt, onShow: function() {
          ["app-plus", "app"].indexOf(J) > -1 && setTimeout(function() {
            var t5 = getCurrentPages()[0];
            f.VUE3 ? t5 && t5.$page && t5.$page.meta.isNVue && tt(t5) : t5 && t5.$vm && t5.$vm._$weex && tt(t5.$vm);
          }), At.apply(this);
        } }), Ot("navigateTo"), Ot("redirectTo"), Ot("reLaunch"), Ot("switchTab"), Ot("navigateBack");
      }(t3), this;
    } }]) && o(e2.prototype, r2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }())(), Et = Ct.beforeEach, St = Ct.afterEach, It = Ct.onError, Rt = Ct.afterNotNext;
  const pages = [
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "首页"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/login/login",
      style: {
        navigationBarTitleText: "登录"
      },
      meta: {
        checkLogin: false
      }
    },
    {
      path: "pages/test/test",
      style: {
        navigationBarTitleText: "test",
        onReachBottomDistance: 50
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-immersive",
      style: {
        navigationBarTitleText: "test-immersive"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-immersiveTo",
      style: {
        navigationBarTitleText: "test-immersiveTo"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-immersiveToIcewindow",
      style: {
        navigationBarTitleText: "test-immersiveToIcewindow"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-onlysafe",
      style: {
        navigationBarTitleText: "test-onlysafe"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-list",
      style: {
        navigationBarTitleText: "test-list"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-list-m",
      style: {
        navigationBarTitleText: "test-list-m"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-slot",
      style: {
        navigationBarTitleText: "test-slot"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-nomsg",
      style: {
        navigationBarTitleText: "test-nomsg"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-form",
      style: {
        navigationBarTitleText: "test-form"
      },
      meta: {
        checkLogin: true
      }
    },
    {
      path: "pages/test/test-fx",
      style: {
        navigationBarTitleText: "test-fx"
      },
      meta: {
        checkLogin: true
      }
    }
  ];
  function setupRouter(app) {
    app.use(Ct);
    const userStore = useUserStore();
    Et(async (to2, from2, next) => {
      var _a;
      const nowPage = pages.find((item) => item.path == to2.url);
      if (nowPage && ((_a = nowPage.meta) == null ? void 0 : _a.checkLogin) === true && !userStore.token) {
        const _token = uni.getStorageSync("token");
        if (_token) {
          userStore.token = _token;
          await userStore.getUserInfo();
        } else {
          toast$1("请先登录");
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/login/login"
            });
          }, 100);
          Rt(() => {
          });
        }
      }
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      next();
    });
    St((to2, from2) => {
    });
    It((to2, from2) => {
    });
  }
  function createApp() {
    const app = vue.createVueApp(App);
    const store = createPinia();
    app.use(store);
    app.use(uView);
    setupRouter(app);
    return {
      app,
      Pinia
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
