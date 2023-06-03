'use strict';
var module = module || {};
module.exports = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/mersenne-twister/src/mersenne-twister.js
  var require_mersenne_twister = __commonJS({
    "node_modules/mersenne-twister/src/mersenne-twister.js"(exports, module) {
      init_crypto_shim();
      var MersenneTwister2 = /* @__PURE__ */ __name(function(seed) {
        if (seed == void 0) {
          seed = (/* @__PURE__ */ new Date()).getTime();
        }
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 2567483615;
        this.UPPER_MASK = 2147483648;
        this.LOWER_MASK = 2147483647;
        this.mt = new Array(this.N);
        this.mti = this.N + 1;
        if (seed.constructor == Array) {
          this.init_by_array(seed, seed.length);
        } else {
          this.init_seed(seed);
        }
      }, "MersenneTwister");
      MersenneTwister2.prototype.init_seed = function(s) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
          var s = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
          this.mt[this.mti] = (((s & 4294901760) >>> 16) * 1812433253 << 16) + (s & 65535) * 1812433253 + this.mti;
          this.mt[this.mti] >>>= 0;
        }
      };
      MersenneTwister2.prototype.init_by_array = function(init_key, key_length) {
        var i, j, k;
        this.init_seed(19650218);
        i = 1;
        j = 0;
        k = this.N > key_length ? this.N : key_length;
        for (; k; k--) {
          var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
          this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1664525 << 16) + (s & 65535) * 1664525) + init_key[j] + j;
          this.mt[i] >>>= 0;
          i++;
          j++;
          if (i >= this.N) {
            this.mt[0] = this.mt[this.N - 1];
            i = 1;
          }
          if (j >= key_length)
            j = 0;
        }
        for (k = this.N - 1; k; k--) {
          var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
          this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1566083941 << 16) + (s & 65535) * 1566083941) - i;
          this.mt[i] >>>= 0;
          i++;
          if (i >= this.N) {
            this.mt[0] = this.mt[this.N - 1];
            i = 1;
          }
        }
        this.mt[0] = 2147483648;
      };
      MersenneTwister2.prototype.random_int = function() {
        var y;
        var mag01 = new Array(0, this.MATRIX_A);
        if (this.mti >= this.N) {
          var kk;
          if (this.mti == this.N + 1)
            this.init_seed(5489);
          for (kk = 0; kk < this.N - this.M; kk++) {
            y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
            this.mt[kk] = this.mt[kk + this.M] ^ y >>> 1 ^ mag01[y & 1];
          }
          for (; kk < this.N - 1; kk++) {
            y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
            this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y >>> 1 ^ mag01[y & 1];
          }
          y = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
          this.mt[this.N - 1] = this.mt[this.M - 1] ^ y >>> 1 ^ mag01[y & 1];
          this.mti = 0;
        }
        y = this.mt[this.mti++];
        y ^= y >>> 11;
        y ^= y << 7 & 2636928640;
        y ^= y << 15 & 4022730752;
        y ^= y >>> 18;
        return y >>> 0;
      };
      MersenneTwister2.prototype.random_int31 = function() {
        return this.random_int() >>> 1;
      };
      MersenneTwister2.prototype.random_incl = function() {
        return this.random_int() * (1 / 4294967295);
      };
      MersenneTwister2.prototype.random = function() {
        return this.random_int() * (1 / 4294967296);
      };
      MersenneTwister2.prototype.random_excl = function() {
        return (this.random_int() + 0.5) * (1 / 4294967296);
      };
      MersenneTwister2.prototype.random_long = function() {
        var a = this.random_int() >>> 5, b = this.random_int() >>> 6;
        return (a * 67108864 + b) * (1 / 9007199254740992);
      };
      module.exports = MersenneTwister2;
    }
  });

  // node_modules/@codahq/packs-sdk/dist/testing/injections/crypto_shim.js
  function getRandomValues(abv) {
    var l = abv.length;
    while (l--) {
      abv[l] = Math.floor(randomFloat() * 256);
    }
    return abv;
  }
  function randomFloat() {
    return twister.random();
  }
  var MersenneTwister, twister, crypto;
  var init_crypto_shim = __esm({
    "node_modules/@codahq/packs-sdk/dist/testing/injections/crypto_shim.js"() {
      MersenneTwister = require_mersenne_twister();
      twister = new MersenneTwister(Math.random() * Number.MAX_SAFE_INTEGER);
      __name(getRandomValues, "getRandomValues");
      __name(randomFloat, "randomFloat");
      crypto = {
        getRandomValues
      };
      if (!global.crypto?.getRandomValues) {
        global.crypto = crypto;
      }
    }
  });

  // _upload_build/browserify-bundle.js
  var require_browserify_bundle = __commonJS({
    "_upload_build/browserify-bundle.js"(exports, module) {
      init_crypto_shim();
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          g.exports = f();
        }
      })(function() {
        var define2, module2, exports2;
        return function() {
          function r(e, n, t) {
            function o(i2, f) {
              if (!n[i2]) {
                if (!e[i2]) {
                  var c = "function" == typeof __require && __require;
                  if (!f && c)
                    return c(i2, true);
                  if (u)
                    return u(i2, true);
                  var a = new Error("Cannot find module '" + i2 + "'");
                  throw a.code = "MODULE_NOT_FOUND", a;
                }
                var p = n[i2] = { exports: {} };
                e[i2][0].call(p.exports, function(r2) {
                  var n2 = e[i2][1][r2];
                  return o(n2 || r2);
                }, p, p.exports, r, e, n, t);
              }
              return n[i2].exports;
            }
            __name(o, "o");
            for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++)
              o(t[i]);
            return o;
          }
          __name(r, "r");
          return r;
        }()({ 1: [function(require2, module3, exports3) {
          (function(global2, Buffer2) {
            (function() {
              "use strict";
              var __create = Object.create;
              var __defProp2 = Object.defineProperty;
              var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
              var __getOwnPropNames2 = Object.getOwnPropertyNames;
              var __getProtoOf = Object.getPrototypeOf;
              var __hasOwnProp = Object.prototype.hasOwnProperty;
              var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
              var __esm2 = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
                return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
              }, "__init"), "__esm");
              var __commonJS2 = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require2() {
                return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
              }, "__require"), "__commonJS");
              var __export = /* @__PURE__ */ __name((target, all) => {
                for (var name in all)
                  __defProp2(target, name, { get: all[name], enumerable: true });
              }, "__export");
              var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
                if (from && typeof from === "object" || typeof from === "function") {
                  for (let key of __getOwnPropNames2(from))
                    if (!__hasOwnProp.call(to, key) && key !== except)
                      __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
                }
                return to;
              }, "__copyProps");
              var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
                // If the importer is in node compatibility mode or this is not an ESM
                // file that has been converted to a CommonJS file using a Babel-
                // compatible transform (i.e. "__esModule" has not been set), then set
                // "default" to the CommonJS "module.exports" for node compatibility.
                isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
                mod
              )), "__toESM");
              var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
              var require_mersenne_twister2 = __commonJS2({
                "node_modules/mersenne-twister/src/mersenne-twister.js"(exports4, module22) {
                  init_crypto_shim2();
                  var MersenneTwister22 = /* @__PURE__ */ __name2(function(seed) {
                    if (seed == void 0) {
                      seed = (/* @__PURE__ */ new Date()).getTime();
                    }
                    this.N = 624;
                    this.M = 397;
                    this.MATRIX_A = 2567483615;
                    this.UPPER_MASK = 2147483648;
                    this.LOWER_MASK = 2147483647;
                    this.mt = new Array(this.N);
                    this.mti = this.N + 1;
                    if (seed.constructor == Array) {
                      this.init_by_array(seed, seed.length);
                    } else {
                      this.init_seed(seed);
                    }
                  }, "MersenneTwister");
                  MersenneTwister22.prototype.init_seed = function(s) {
                    this.mt[0] = s >>> 0;
                    for (this.mti = 1; this.mti < this.N; this.mti++) {
                      var s = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
                      this.mt[this.mti] = (((s & 4294901760) >>> 16) * 1812433253 << 16) + (s & 65535) * 1812433253 + this.mti;
                      this.mt[this.mti] >>>= 0;
                    }
                  };
                  MersenneTwister22.prototype.init_by_array = function(init_key, key_length) {
                    var i, j, k;
                    this.init_seed(19650218);
                    i = 1;
                    j = 0;
                    k = this.N > key_length ? this.N : key_length;
                    for (; k; k--) {
                      var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
                      this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1664525 << 16) + (s & 65535) * 1664525) + init_key[j] + j;
                      this.mt[i] >>>= 0;
                      i++;
                      j++;
                      if (i >= this.N) {
                        this.mt[0] = this.mt[this.N - 1];
                        i = 1;
                      }
                      if (j >= key_length)
                        j = 0;
                    }
                    for (k = this.N - 1; k; k--) {
                      var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
                      this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1566083941 << 16) + (s & 65535) * 1566083941) - i;
                      this.mt[i] >>>= 0;
                      i++;
                      if (i >= this.N) {
                        this.mt[0] = this.mt[this.N - 1];
                        i = 1;
                      }
                    }
                    this.mt[0] = 2147483648;
                  };
                  MersenneTwister22.prototype.random_int = function() {
                    var y;
                    var mag01 = new Array(0, this.MATRIX_A);
                    if (this.mti >= this.N) {
                      var kk;
                      if (this.mti == this.N + 1)
                        this.init_seed(5489);
                      for (kk = 0; kk < this.N - this.M; kk++) {
                        y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
                        this.mt[kk] = this.mt[kk + this.M] ^ y >>> 1 ^ mag01[y & 1];
                      }
                      for (; kk < this.N - 1; kk++) {
                        y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
                        this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y >>> 1 ^ mag01[y & 1];
                      }
                      y = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
                      this.mt[this.N - 1] = this.mt[this.M - 1] ^ y >>> 1 ^ mag01[y & 1];
                      this.mti = 0;
                    }
                    y = this.mt[this.mti++];
                    y ^= y >>> 11;
                    y ^= y << 7 & 2636928640;
                    y ^= y << 15 & 4022730752;
                    y ^= y >>> 18;
                    return y >>> 0;
                  };
                  MersenneTwister22.prototype.random_int31 = function() {
                    return this.random_int() >>> 1;
                  };
                  MersenneTwister22.prototype.random_incl = function() {
                    return this.random_int() * (1 / 4294967295);
                  };
                  MersenneTwister22.prototype.random = function() {
                    return this.random_int() * (1 / 4294967296);
                  };
                  MersenneTwister22.prototype.random_excl = function() {
                    return (this.random_int() + 0.5) * (1 / 4294967296);
                  };
                  MersenneTwister22.prototype.random_long = function() {
                    var a = this.random_int() >>> 5, b = this.random_int() >>> 6;
                    return (a * 67108864 + b) * (1 / 9007199254740992);
                  };
                  module22.exports = MersenneTwister22;
                }
              });
              function getRandomValues2(abv) {
                var l = abv.length;
                while (l--) {
                  abv[l] = Math.floor(randomFloat2() * 256);
                }
                return abv;
              }
              __name(getRandomValues2, "getRandomValues");
              function randomFloat2() {
                return twister2.random();
              }
              __name(randomFloat2, "randomFloat");
              var MersenneTwister2, twister2, crypto2;
              var init_crypto_shim2 = __esm2({
                "node_modules/@codahq/packs-sdk/dist/testing/injections/crypto_shim.js"() {
                  MersenneTwister2 = require_mersenne_twister2();
                  twister2 = new MersenneTwister2(Math.random() * Number.MAX_SAFE_INTEGER);
                  __name2(getRandomValues2, "getRandomValues");
                  __name2(randomFloat2, "randomFloat");
                  crypto2 = {
                    getRandomValues: getRandomValues2
                  };
                  if (!global2.crypto?.getRandomValues) {
                    global2.crypto = crypto2;
                  }
                }
              });
              var require_types = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/types.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.SyncInterval = exports4.QuotaLimitType = exports4.FeatureSet = exports4.TokenExchangeCredentialsLocation = exports4.PostSetupType = exports4.AuthenticationType = exports4.PackCategory = void 0;
                  var PackCategory;
                  (function(PackCategory2) {
                    PackCategory2["CRM"] = "CRM";
                    PackCategory2["Calendar"] = "Calendar";
                    PackCategory2["Communication"] = "Communication";
                    PackCategory2["DataStorage"] = "DataStorage";
                    PackCategory2["Design"] = "Design";
                    PackCategory2["Financial"] = "Financial";
                    PackCategory2["Fun"] = "Fun";
                    PackCategory2["Geo"] = "Geo";
                    PackCategory2["IT"] = "IT";
                    PackCategory2["Mathematics"] = "Mathematics";
                    PackCategory2["Organization"] = "Organization";
                    PackCategory2["Recruiting"] = "Recruiting";
                    PackCategory2["Shopping"] = "Shopping";
                    PackCategory2["Social"] = "Social";
                    PackCategory2["Sports"] = "Sports";
                    PackCategory2["Travel"] = "Travel";
                    PackCategory2["Weather"] = "Weather";
                  })(PackCategory = exports4.PackCategory || (exports4.PackCategory = {}));
                  var AuthenticationType;
                  (function(AuthenticationType2) {
                    AuthenticationType2["None"] = "None";
                    AuthenticationType2["HeaderBearerToken"] = "HeaderBearerToken";
                    AuthenticationType2["CustomHeaderToken"] = "CustomHeaderToken";
                    AuthenticationType2["QueryParamToken"] = "QueryParamToken";
                    AuthenticationType2["MultiQueryParamToken"] = "MultiQueryParamToken";
                    AuthenticationType2["OAuth2"] = "OAuth2";
                    AuthenticationType2["WebBasic"] = "WebBasic";
                    AuthenticationType2["Custom"] = "Custom";
                    AuthenticationType2["AWSAccessKey"] = "AWSAccessKey";
                    AuthenticationType2["AWSAssumeRole"] = "AWSAssumeRole";
                    AuthenticationType2["CodaApiHeaderBearerToken"] = "CodaApiHeaderBearerToken";
                    AuthenticationType2["Various"] = "Various";
                  })(AuthenticationType = exports4.AuthenticationType || (exports4.AuthenticationType = {}));
                  var PostSetupType;
                  (function(PostSetupType2) {
                    PostSetupType2["SetEndpoint"] = "SetEndPoint";
                  })(PostSetupType = exports4.PostSetupType || (exports4.PostSetupType = {}));
                  var TokenExchangeCredentialsLocation;
                  (function(TokenExchangeCredentialsLocation2) {
                    TokenExchangeCredentialsLocation2["Automatic"] = "Automatic";
                    TokenExchangeCredentialsLocation2["Body"] = "Body";
                    TokenExchangeCredentialsLocation2["AuthorizationHeader"] = "AuthorizationHeader";
                  })(TokenExchangeCredentialsLocation = exports4.TokenExchangeCredentialsLocation || (exports4.TokenExchangeCredentialsLocation = {}));
                  var FeatureSet;
                  (function(FeatureSet2) {
                    FeatureSet2["Basic"] = "Basic";
                    FeatureSet2["Pro"] = "Pro";
                    FeatureSet2["Team"] = "Team";
                    FeatureSet2["Enterprise"] = "Enterprise";
                  })(FeatureSet = exports4.FeatureSet || (exports4.FeatureSet = {}));
                  var QuotaLimitType;
                  (function(QuotaLimitType2) {
                    QuotaLimitType2["Action"] = "Action";
                    QuotaLimitType2["Getter"] = "Getter";
                    QuotaLimitType2["Sync"] = "Sync";
                    QuotaLimitType2["Metadata"] = "Metadata";
                  })(QuotaLimitType = exports4.QuotaLimitType || (exports4.QuotaLimitType = {}));
                  var SyncInterval;
                  (function(SyncInterval2) {
                    SyncInterval2["Manual"] = "Manual";
                    SyncInterval2["Daily"] = "Daily";
                    SyncInterval2["Hourly"] = "Hourly";
                    SyncInterval2["EveryTenMinutes"] = "EveryTenMinutes";
                  })(SyncInterval = exports4.SyncInterval || (exports4.SyncInterval = {}));
                }
              });
              var require_api_types = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/api_types.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.PrecannedDateRange = exports4.ValidFetchMethods = exports4.NetworkConnection = exports4.ConnectionRequirement = exports4.ParameterTypeInputMap = exports4.ParameterType = exports4.fileArray = exports4.imageArray = exports4.htmlArray = exports4.dateArray = exports4.booleanArray = exports4.numberArray = exports4.stringArray = exports4.isArrayType = exports4.Type = void 0;
                  var Type;
                  (function(Type2) {
                    Type2[Type2["string"] = 0] = "string";
                    Type2[Type2["number"] = 1] = "number";
                    Type2[Type2["object"] = 2] = "object";
                    Type2[Type2["boolean"] = 3] = "boolean";
                    Type2[Type2["date"] = 4] = "date";
                    Type2[Type2["html"] = 5] = "html";
                    Type2[Type2["image"] = 6] = "image";
                    Type2[Type2["file"] = 7] = "file";
                    Type2[Type2["markdown"] = 8] = "markdown";
                  })(Type = exports4.Type || (exports4.Type = {}));
                  function isArrayType(obj) {
                    return obj && obj.type === "array" && typeof obj.items === "number";
                  }
                  __name(isArrayType, "isArrayType");
                  __name2(isArrayType, "isArrayType");
                  exports4.isArrayType = isArrayType;
                  exports4.stringArray = {
                    type: "array",
                    items: Type.string
                  };
                  exports4.numberArray = {
                    type: "array",
                    items: Type.number
                  };
                  exports4.booleanArray = {
                    type: "array",
                    items: Type.boolean
                  };
                  exports4.dateArray = {
                    type: "array",
                    items: Type.date
                  };
                  exports4.htmlArray = {
                    type: "array",
                    items: Type.html
                  };
                  exports4.imageArray = {
                    type: "array",
                    items: Type.image
                  };
                  exports4.fileArray = {
                    type: "array",
                    items: Type.file
                  };
                  var ParameterType2;
                  (function(ParameterType3) {
                    ParameterType3["String"] = "string";
                    ParameterType3["Number"] = "number";
                    ParameterType3["Boolean"] = "boolean";
                    ParameterType3["Date"] = "date";
                    ParameterType3["Html"] = "html";
                    ParameterType3["Image"] = "image";
                    ParameterType3["File"] = "file";
                    ParameterType3["Markdown"] = "markdown";
                    ParameterType3["StringArray"] = "stringArray";
                    ParameterType3["SparseStringArray"] = "sparseStringArray";
                    ParameterType3["NumberArray"] = "numberArray";
                    ParameterType3["SparseNumberArray"] = "sparseNumberArray";
                    ParameterType3["BooleanArray"] = "booleanArray";
                    ParameterType3["SparseBooleanArray"] = "sparseBooleanArray";
                    ParameterType3["DateArray"] = "dateArray";
                    ParameterType3["SparseDateArray"] = "sparseDateArray";
                    ParameterType3["HtmlArray"] = "htmlArray`";
                    ParameterType3["SparseHtmlArray"] = "sparseHtmlArray";
                    ParameterType3["ImageArray"] = "imageArray";
                    ParameterType3["SparseImageArray"] = "sparseImageArray";
                    ParameterType3["FileArray"] = "fileArray";
                    ParameterType3["SparseFileArray"] = "sparseFileArray";
                    ParameterType3["MarkdownArray"] = "markdownArray`";
                    ParameterType3["SparseMarkdownArray"] = "sparseMarkdownArray";
                  })(ParameterType2 = exports4.ParameterType || (exports4.ParameterType = {}));
                  exports4.ParameterTypeInputMap = {
                    [ParameterType2.String]: Type.string,
                    [ParameterType2.Number]: Type.number,
                    [ParameterType2.Boolean]: Type.boolean,
                    [ParameterType2.Date]: Type.date,
                    [ParameterType2.Html]: Type.html,
                    [ParameterType2.Image]: Type.image,
                    [ParameterType2.File]: Type.file,
                    [ParameterType2.Markdown]: Type.markdown,
                    [ParameterType2.StringArray]: { type: "array", items: Type.string },
                    [ParameterType2.NumberArray]: { type: "array", items: Type.number },
                    [ParameterType2.BooleanArray]: { type: "array", items: Type.boolean },
                    [ParameterType2.DateArray]: { type: "array", items: Type.date },
                    [ParameterType2.HtmlArray]: { type: "array", items: Type.html },
                    [ParameterType2.ImageArray]: { type: "array", items: Type.image },
                    [ParameterType2.FileArray]: { type: "array", items: Type.file },
                    [ParameterType2.MarkdownArray]: { type: "array", items: Type.markdown },
                    [ParameterType2.SparseStringArray]: { type: "array", items: Type.string, allowEmpty: true },
                    [ParameterType2.SparseNumberArray]: { type: "array", items: Type.number, allowEmpty: true },
                    [ParameterType2.SparseBooleanArray]: { type: "array", items: Type.boolean, allowEmpty: true },
                    [ParameterType2.SparseDateArray]: { type: "array", items: Type.date, allowEmpty: true },
                    [ParameterType2.SparseHtmlArray]: { type: "array", items: Type.html, allowEmpty: true },
                    [ParameterType2.SparseImageArray]: { type: "array", items: Type.image, allowEmpty: true },
                    [ParameterType2.SparseFileArray]: { type: "array", items: Type.file, allowEmpty: true },
                    [ParameterType2.SparseMarkdownArray]: { type: "array", items: Type.markdown, allowEmpty: true }
                  };
                  var ConnectionRequirement;
                  (function(ConnectionRequirement2) {
                    ConnectionRequirement2["None"] = "none";
                    ConnectionRequirement2["Optional"] = "optional";
                    ConnectionRequirement2["Required"] = "required";
                  })(ConnectionRequirement = exports4.ConnectionRequirement || (exports4.ConnectionRequirement = {}));
                  var NetworkConnection;
                  (function(NetworkConnection2) {
                    NetworkConnection2["None"] = "none";
                    NetworkConnection2["Optional"] = "optional";
                    NetworkConnection2["Required"] = "required";
                  })(NetworkConnection = exports4.NetworkConnection || (exports4.NetworkConnection = {}));
                  exports4.ValidFetchMethods = ["GET", "PATCH", "POST", "PUT", "DELETE", "HEAD"];
                  var PrecannedDateRange;
                  (function(PrecannedDateRange2) {
                    PrecannedDateRange2["Yesterday"] = "yesterday";
                    PrecannedDateRange2["Last7Days"] = "last_7_days";
                    PrecannedDateRange2["Last30Days"] = "last_30_days";
                    PrecannedDateRange2["Last90Days"] = "last_90_days";
                    PrecannedDateRange2["Last180Days"] = "last_180_days";
                    PrecannedDateRange2["Last365Days"] = "last_365_days";
                    PrecannedDateRange2["LastWeek"] = "last_week";
                    PrecannedDateRange2["LastMonth"] = "last_month";
                    PrecannedDateRange2["Last3Months"] = "last_3_months";
                    PrecannedDateRange2["Last6Months"] = "last_6_months";
                    PrecannedDateRange2["LastYear"] = "last_year";
                    PrecannedDateRange2["Today"] = "today";
                    PrecannedDateRange2["ThisWeek"] = "this_week";
                    PrecannedDateRange2["ThisMonth"] = "this_month";
                    PrecannedDateRange2["YearToDate"] = "year_to_date";
                    PrecannedDateRange2["ThisYear"] = "this_year";
                    PrecannedDateRange2["Last7AndNext7Days"] = "last_7_and_next_7_days";
                    PrecannedDateRange2["Last30AndNext30Days"] = "last_30_and_next_30_days";
                    PrecannedDateRange2["Tomorrow"] = "tomorrow";
                    PrecannedDateRange2["Next7Days"] = "next_7_days";
                    PrecannedDateRange2["Next30Days"] = "next_30_days";
                    PrecannedDateRange2["Next90Days"] = "next_90_days";
                    PrecannedDateRange2["Next180Days"] = "next_180_days";
                    PrecannedDateRange2["Next365Days"] = "next_365_days";
                    PrecannedDateRange2["NextWeek"] = "next_week";
                    PrecannedDateRange2["NextMonth"] = "next_month";
                    PrecannedDateRange2["Next3Months"] = "next_3_months";
                    PrecannedDateRange2["Next6Months"] = "next_6_months";
                    PrecannedDateRange2["NextYear"] = "next_year";
                    PrecannedDateRange2["Everything"] = "everything";
                  })(PrecannedDateRange = exports4.PrecannedDateRange || (exports4.PrecannedDateRange = {}));
                }
              });
              var require_ensure = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/helpers/ensure.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.assertCondition = exports4.ensureExists = exports4.ensureNonEmptyString = exports4.ensureUnreachable = void 0;
                  var api_1 = require_api();
                  function ensureUnreachable(value, message) {
                    throw new Error(message || `Unreachable code hit with value ${String(value)}`);
                  }
                  __name(ensureUnreachable, "ensureUnreachable");
                  __name2(ensureUnreachable, "ensureUnreachable");
                  exports4.ensureUnreachable = ensureUnreachable;
                  function ensureNonEmptyString(value, message) {
                    if (typeof value !== "string" || value.length === 0) {
                      throw new (getErrorConstructor(message))(message || `Expected non-empty string for ${String(value)}`);
                    }
                    return value;
                  }
                  __name(ensureNonEmptyString, "ensureNonEmptyString");
                  __name2(ensureNonEmptyString, "ensureNonEmptyString");
                  exports4.ensureNonEmptyString = ensureNonEmptyString;
                  function ensureExists(value, message) {
                    if (typeof value === "undefined" || value === null) {
                      throw new (getErrorConstructor(message))(message || `Expected value for ${String(value)}`);
                    }
                    return value;
                  }
                  __name(ensureExists, "ensureExists");
                  __name2(ensureExists, "ensureExists");
                  exports4.ensureExists = ensureExists;
                  function getErrorConstructor(message) {
                    return message ? api_1.UserVisibleError : Error;
                  }
                  __name(getErrorConstructor, "getErrorConstructor");
                  __name2(getErrorConstructor, "getErrorConstructor");
                  function assertCondition(condition, message) {
                    if (!condition) {
                      throw new (getErrorConstructor(message))(message || "Assertion failed");
                    }
                  }
                  __name(assertCondition, "assertCondition");
                  __name2(assertCondition, "assertCondition");
                  exports4.assertCondition = assertCondition;
                }
              });
              var require_object_utils = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/helpers/object_utils.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.isPromise = exports4.deepCopy = exports4.isNil = exports4.isDefined = exports4.deepFreeze = void 0;
                  function deepFreeze(obj) {
                    Object.freeze(obj);
                    for (const k of Object.keys(obj)) {
                      const key = k;
                      const value = obj[key];
                      if (value !== null && (typeof value === "object" || typeof value === "function") && !Object.isFrozen(value)) {
                        deepFreeze(value);
                      }
                    }
                    return obj;
                  }
                  __name(deepFreeze, "deepFreeze");
                  __name2(deepFreeze, "deepFreeze");
                  exports4.deepFreeze = deepFreeze;
                  function isDefined(obj) {
                    return !isNil(obj);
                  }
                  __name(isDefined, "isDefined");
                  __name2(isDefined, "isDefined");
                  exports4.isDefined = isDefined;
                  function isNil(obj) {
                    return typeof obj === "undefined" || obj === null;
                  }
                  __name(isNil, "isNil");
                  __name2(isNil, "isNil");
                  exports4.isNil = isNil;
                  function deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                  }
                  __name(deepCopy, "deepCopy");
                  __name2(deepCopy, "deepCopy");
                  exports4.deepCopy = deepCopy;
                  function isPromise(obj) {
                    return obj && typeof obj === "object" && "then" in obj;
                  }
                  __name(isPromise, "isPromise");
                  __name2(isPromise, "isPromise");
                  exports4.isPromise = isPromise;
                }
              });
              var require_migration = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/helpers/migration.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.postSetupMetadataHelper = exports4.setEndpointDefHelper = exports4.setEndpointHelper = exports4.paramDefHelper = exports4.objectSchemaHelper = void 0;
                  var ensure_1 = require_ensure();
                  function objectSchemaHelper(schema) {
                    return new ObjectSchemaHelper(schema);
                  }
                  __name(objectSchemaHelper, "objectSchemaHelper");
                  __name2(objectSchemaHelper, "objectSchemaHelper");
                  exports4.objectSchemaHelper = objectSchemaHelper;
                  var ObjectSchemaHelper = /* @__PURE__ */ __name(class {
                    constructor(schema) {
                      this._schema = schema;
                    }
                    get id() {
                      var _a;
                      return (_a = this._schema.idProperty) !== null && _a !== void 0 ? _a : this._schema.id;
                    }
                    get primary() {
                      var _a;
                      return (_a = this._schema.displayProperty) !== null && _a !== void 0 ? _a : this._schema.primary;
                    }
                    get featured() {
                      var _a;
                      return (_a = this._schema.featuredProperties) !== null && _a !== void 0 ? _a : this._schema.featured;
                    }
                    get identity() {
                      return this._schema.identity;
                    }
                    get mutable() {
                      return this._schema.mutable;
                    }
                    get autocomplete() {
                      return this._schema.autocomplete;
                    }
                    get properties() {
                      return this._schema.properties;
                    }
                    get type() {
                      return this._schema.type;
                    }
                    get attribution() {
                      var _a, _b;
                      return (_a = this._schema.attribution) !== null && _a !== void 0 ? _a : (_b = this._schema.identity) === null || _b === void 0 ? void 0 : _b.attribution;
                    }
                  }, "ObjectSchemaHelper");
                  __name2(ObjectSchemaHelper, "ObjectSchemaHelper");
                  function paramDefHelper(def) {
                    return new ParamDefHelper(def);
                  }
                  __name(paramDefHelper, "paramDefHelper");
                  __name2(paramDefHelper, "paramDefHelper");
                  exports4.paramDefHelper = paramDefHelper;
                  var ParamDefHelper = /* @__PURE__ */ __name(class {
                    constructor(def) {
                      this._def = def;
                    }
                    get defaultValue() {
                      var _a;
                      return (_a = this._def.suggestedValue) !== null && _a !== void 0 ? _a : this._def.defaultValue;
                    }
                  }, "ParamDefHelper");
                  __name2(ParamDefHelper, "ParamDefHelper");
                  function setEndpointHelper(step) {
                    return new SetEndpointHelper(step);
                  }
                  __name(setEndpointHelper, "setEndpointHelper");
                  __name2(setEndpointHelper, "setEndpointHelper");
                  exports4.setEndpointHelper = setEndpointHelper;
                  var SetEndpointHelper = /* @__PURE__ */ __name(class {
                    constructor(step) {
                      this._step = step;
                    }
                    get getOptions() {
                      var _a;
                      return (0, ensure_1.ensureExists)((_a = this._step.getOptions) !== null && _a !== void 0 ? _a : this._step.getOptionsFormula);
                    }
                  }, "SetEndpointHelper");
                  __name2(SetEndpointHelper, "SetEndpointHelper");
                  function setEndpointDefHelper(step) {
                    return new SetEndpointDefHelper(step);
                  }
                  __name(setEndpointDefHelper, "setEndpointDefHelper");
                  __name2(setEndpointDefHelper, "setEndpointDefHelper");
                  exports4.setEndpointDefHelper = setEndpointDefHelper;
                  var SetEndpointDefHelper = /* @__PURE__ */ __name(class {
                    constructor(step) {
                      this._step = step;
                    }
                    get getOptions() {
                      var _a;
                      return (0, ensure_1.ensureExists)((_a = this._step.getOptions) !== null && _a !== void 0 ? _a : this._step.getOptionsFormula);
                    }
                  }, "SetEndpointDefHelper");
                  __name2(SetEndpointDefHelper, "SetEndpointDefHelper");
                  function postSetupMetadataHelper(metadata) {
                    return new PostSetupMetadataHelper(metadata);
                  }
                  __name(postSetupMetadataHelper, "postSetupMetadataHelper");
                  __name2(postSetupMetadataHelper, "postSetupMetadataHelper");
                  exports4.postSetupMetadataHelper = postSetupMetadataHelper;
                  var PostSetupMetadataHelper = /* @__PURE__ */ __name(class {
                    constructor(metadata) {
                      this._metadata = metadata;
                    }
                    get getOptions() {
                      var _a;
                      return (0, ensure_1.ensureExists)((_a = this._metadata.getOptions) !== null && _a !== void 0 ? _a : this._metadata.getOptionsFormula);
                    }
                  }, "PostSetupMetadataHelper");
                  __name2(PostSetupMetadataHelper, "PostSetupMetadataHelper");
                }
              });
              var require_pascalcase = __commonJS2({
                "node_modules/pascalcase/index.js"(exports4, module22) {
                  init_crypto_shim2();
                  var titlecase = /* @__PURE__ */ __name2((input) => input[0].toLocaleUpperCase() + input.slice(1), "titlecase");
                  module22.exports = (value) => {
                    if (value === null || value === void 0)
                      return "";
                    if (typeof value.toString !== "function")
                      return "";
                    let input = value.toString().trim();
                    if (input === "")
                      return "";
                    if (input.length === 1)
                      return input.toLocaleUpperCase();
                    let match = input.match(/[a-zA-Z0-9]+/g);
                    if (match) {
                      return match.map((m) => titlecase(m)).join("");
                    }
                    return input;
                  };
                }
              });
              var require_schema = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/schema.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  var __importDefault = exports4 && exports4.__importDefault || function(mod) {
                    return mod && mod.__esModule ? mod : { "default": mod };
                  };
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.withIdentity = exports4.makeReferenceSchemaFromObjectSchema = exports4.normalizeSchema = exports4.normalizePropertyValuePathIntoSchemaPath = exports4.normalizeSchemaKeyPath = exports4.normalizeSchemaKey = exports4.makeObjectSchema = exports4.makeSchema = exports4.generateSchema = exports4.isArray = exports4.isObject = exports4.makeAttributionNode = exports4.AttributionNodeType = exports4.PropertyLabelValueTemplate = exports4.SimpleStringHintValueTypes = exports4.DurationUnit = exports4.ImageCornerStyle = exports4.ImageOutline = exports4.LinkDisplayType = exports4.EmailDisplayType = exports4.ScaleIconSet = exports4.CurrencyFormat = exports4.ObjectHintValueTypes = exports4.BooleanHintValueTypes = exports4.NumberHintValueTypes = exports4.StringHintValueTypes = exports4.ValueHintType = exports4.ValueType = void 0;
                  var ensure_1 = require_ensure();
                  var object_utils_1 = require_object_utils();
                  var ensure_2 = require_ensure();
                  var ensure_3 = require_ensure();
                  var ensure_4 = require_ensure();
                  var migration_1 = require_migration();
                  var pascalcase_1 = __importDefault(require_pascalcase());
                  var ValueType2;
                  (function(ValueType3) {
                    ValueType3["Boolean"] = "boolean";
                    ValueType3["Number"] = "number";
                    ValueType3["String"] = "string";
                    ValueType3["Array"] = "array";
                    ValueType3["Object"] = "object";
                  })(ValueType2 = exports4.ValueType || (exports4.ValueType = {}));
                  var ValueHintType;
                  (function(ValueHintType2) {
                    ValueHintType2["Date"] = "date";
                    ValueHintType2["Time"] = "time";
                    ValueHintType2["DateTime"] = "datetime";
                    ValueHintType2["Duration"] = "duration";
                    ValueHintType2["Email"] = "email";
                    ValueHintType2["Person"] = "person";
                    ValueHintType2["Percent"] = "percent";
                    ValueHintType2["Currency"] = "currency";
                    ValueHintType2["ImageReference"] = "image";
                    ValueHintType2["ImageAttachment"] = "imageAttachment";
                    ValueHintType2["Url"] = "url";
                    ValueHintType2["Markdown"] = "markdown";
                    ValueHintType2["Html"] = "html";
                    ValueHintType2["Embed"] = "embed";
                    ValueHintType2["Reference"] = "reference";
                    ValueHintType2["Attachment"] = "attachment";
                    ValueHintType2["Slider"] = "slider";
                    ValueHintType2["Scale"] = "scale";
                    ValueHintType2["ProgressBar"] = "progressBar";
                    ValueHintType2["Toggle"] = "toggle";
                  })(ValueHintType = exports4.ValueHintType || (exports4.ValueHintType = {}));
                  exports4.StringHintValueTypes = [
                    ValueHintType.Attachment,
                    ValueHintType.Date,
                    ValueHintType.Time,
                    ValueHintType.DateTime,
                    ValueHintType.Duration,
                    ValueHintType.Email,
                    ValueHintType.Embed,
                    ValueHintType.Html,
                    ValueHintType.ImageReference,
                    ValueHintType.ImageAttachment,
                    ValueHintType.Markdown,
                    ValueHintType.Url
                  ];
                  exports4.NumberHintValueTypes = [
                    ValueHintType.Date,
                    ValueHintType.Time,
                    ValueHintType.DateTime,
                    ValueHintType.Duration,
                    ValueHintType.Percent,
                    ValueHintType.Currency,
                    ValueHintType.Slider,
                    ValueHintType.ProgressBar,
                    ValueHintType.Scale
                  ];
                  exports4.BooleanHintValueTypes = [ValueHintType.Toggle];
                  exports4.ObjectHintValueTypes = [ValueHintType.Person, ValueHintType.Reference];
                  var CurrencyFormat;
                  (function(CurrencyFormat2) {
                    CurrencyFormat2["Currency"] = "currency";
                    CurrencyFormat2["Accounting"] = "accounting";
                    CurrencyFormat2["Financial"] = "financial";
                  })(CurrencyFormat = exports4.CurrencyFormat || (exports4.CurrencyFormat = {}));
                  var ScaleIconSet;
                  (function(ScaleIconSet2) {
                    ScaleIconSet2["Star"] = "star";
                    ScaleIconSet2["Circle"] = "circle";
                    ScaleIconSet2["Fire"] = "fire";
                    ScaleIconSet2["Bug"] = "bug";
                    ScaleIconSet2["Diamond"] = "diamond";
                    ScaleIconSet2["Bell"] = "bell";
                    ScaleIconSet2["ThumbsUp"] = "thumbsup";
                    ScaleIconSet2["Heart"] = "heart";
                    ScaleIconSet2["Chili"] = "chili";
                    ScaleIconSet2["Smiley"] = "smiley";
                    ScaleIconSet2["Lightning"] = "lightning";
                    ScaleIconSet2["Currency"] = "currency";
                    ScaleIconSet2["Coffee"] = "coffee";
                    ScaleIconSet2["Person"] = "person";
                    ScaleIconSet2["Battery"] = "battery";
                    ScaleIconSet2["Cocktail"] = "cocktail";
                    ScaleIconSet2["Cloud"] = "cloud";
                    ScaleIconSet2["Sun"] = "sun";
                    ScaleIconSet2["Checkmark"] = "checkmark";
                    ScaleIconSet2["LightBulb"] = "lightbulb";
                  })(ScaleIconSet = exports4.ScaleIconSet || (exports4.ScaleIconSet = {}));
                  var EmailDisplayType;
                  (function(EmailDisplayType2) {
                    EmailDisplayType2["IconAndEmail"] = "iconAndEmail";
                    EmailDisplayType2["IconOnly"] = "iconOnly";
                    EmailDisplayType2["EmailOnly"] = "emailOnly";
                  })(EmailDisplayType = exports4.EmailDisplayType || (exports4.EmailDisplayType = {}));
                  var LinkDisplayType;
                  (function(LinkDisplayType2) {
                    LinkDisplayType2["IconOnly"] = "iconOnly";
                    LinkDisplayType2["Url"] = "url";
                    LinkDisplayType2["Title"] = "title";
                    LinkDisplayType2["Card"] = "card";
                    LinkDisplayType2["Embed"] = "embed";
                  })(LinkDisplayType = exports4.LinkDisplayType || (exports4.LinkDisplayType = {}));
                  var ImageOutline;
                  (function(ImageOutline2) {
                    ImageOutline2["Disabled"] = "disabled";
                    ImageOutline2["Solid"] = "solid";
                  })(ImageOutline = exports4.ImageOutline || (exports4.ImageOutline = {}));
                  var ImageCornerStyle;
                  (function(ImageCornerStyle2) {
                    ImageCornerStyle2["Rounded"] = "rounded";
                    ImageCornerStyle2["Square"] = "square";
                  })(ImageCornerStyle = exports4.ImageCornerStyle || (exports4.ImageCornerStyle = {}));
                  var DurationUnit;
                  (function(DurationUnit2) {
                    DurationUnit2["Days"] = "days";
                    DurationUnit2["Hours"] = "hours";
                    DurationUnit2["Minutes"] = "minutes";
                    DurationUnit2["Seconds"] = "seconds";
                  })(DurationUnit = exports4.DurationUnit || (exports4.DurationUnit = {}));
                  exports4.SimpleStringHintValueTypes = [
                    ValueHintType.Attachment,
                    ValueHintType.Html,
                    ValueHintType.Markdown,
                    ValueHintType.Url,
                    ValueHintType.Email
                  ];
                  exports4.PropertyLabelValueTemplate = "{VALUE}";
                  var AttributionNodeType;
                  (function(AttributionNodeType2) {
                    AttributionNodeType2[AttributionNodeType2["Text"] = 1] = "Text";
                    AttributionNodeType2[AttributionNodeType2["Link"] = 2] = "Link";
                    AttributionNodeType2[AttributionNodeType2["Image"] = 3] = "Image";
                  })(AttributionNodeType = exports4.AttributionNodeType || (exports4.AttributionNodeType = {}));
                  function makeAttributionNode(node) {
                    return node;
                  }
                  __name(makeAttributionNode, "makeAttributionNode");
                  __name2(makeAttributionNode, "makeAttributionNode");
                  exports4.makeAttributionNode = makeAttributionNode;
                  function isObject(val) {
                    return Boolean(val && val.type === ValueType2.Object);
                  }
                  __name(isObject, "isObject");
                  __name2(isObject, "isObject");
                  exports4.isObject = isObject;
                  function isArray(val) {
                    return Boolean(val && val.type === ValueType2.Array);
                  }
                  __name(isArray, "isArray");
                  __name2(isArray, "isArray");
                  exports4.isArray = isArray;
                  function generateSchema(obj) {
                    if (Array.isArray(obj)) {
                      if (obj.length === 0) {
                        throw new Error("Must have representative value.");
                      }
                      return { type: ValueType2.Array, items: generateSchema(obj[0]) };
                    }
                    if (typeof obj === "object") {
                      const properties = {};
                      if (obj === null) {
                        return { type: ValueType2.String };
                      }
                      for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                          properties[key] = generateSchema(obj[key]);
                        }
                      }
                      return { type: ValueType2.Object, properties };
                    } else if (typeof obj === "string") {
                      return { type: ValueType2.String };
                    } else if (typeof obj === "boolean") {
                      return { type: ValueType2.Boolean };
                    } else if (typeof obj === "number") {
                      return { type: ValueType2.Number };
                    }
                    return (0, ensure_4.ensureUnreachable)(obj);
                  }
                  __name(generateSchema, "generateSchema");
                  __name2(generateSchema, "generateSchema");
                  exports4.generateSchema = generateSchema;
                  function makeSchema(schema) {
                    return schema;
                  }
                  __name(makeSchema, "makeSchema");
                  __name2(makeSchema, "makeSchema");
                  exports4.makeSchema = makeSchema;
                  function makeObjectSchema2(schemaDef) {
                    const schema = { ...schemaDef, type: ValueType2.Object };
                    for (const key of Object.keys(schema.properties)) {
                      if (key !== "type") {
                        const typedKey = key;
                        schema.properties[typedKey] = (0, object_utils_1.deepCopy)(schema.properties[key]);
                      }
                    }
                    validateObjectSchema(schema);
                    return schema;
                  }
                  __name(makeObjectSchema2, "makeObjectSchema2");
                  __name2(makeObjectSchema2, "makeObjectSchema");
                  exports4.makeObjectSchema = makeObjectSchema2;
                  function validateObjectSchema(schema) {
                    if (schema.codaType === ValueHintType.Reference) {
                      const { id, identity, primary } = (0, migration_1.objectSchemaHelper)(schema);
                      checkRequiredFieldInObjectSchema(id, "idProperty", schema.codaType);
                      checkRequiredFieldInObjectSchema(identity, "identity", schema.codaType);
                      checkRequiredFieldInObjectSchema(primary, "displayProperty", schema.codaType);
                      checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(id), schema, "idProperty");
                      checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(primary), schema, "displayProperty");
                    }
                    if (schema.codaType === ValueHintType.Person) {
                      const { id } = (0, migration_1.objectSchemaHelper)(schema);
                      checkRequiredFieldInObjectSchema(id, "idProperty", schema.codaType);
                      checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(id), schema, "idProperty");
                    }
                    for (const [_propertyKey, propertySchema] of Object.entries(schema.properties)) {
                      if (propertySchema.type === ValueType2.Object) {
                        validateObjectSchema(propertySchema);
                      }
                    }
                  }
                  __name(validateObjectSchema, "validateObjectSchema");
                  __name2(validateObjectSchema, "validateObjectSchema");
                  function checkRequiredFieldInObjectSchema(field, fieldName, codaType) {
                    (0, ensure_2.ensureExists)(field, `Objects with codaType "${codaType}" require a "${fieldName}" property in the schema definition.`);
                  }
                  __name(checkRequiredFieldInObjectSchema, "checkRequiredFieldInObjectSchema");
                  __name2(checkRequiredFieldInObjectSchema, "checkRequiredFieldInObjectSchema");
                  function checkSchemaPropertyIsRequired(field, schema, referencedByPropertyName) {
                    const { properties, codaType } = schema;
                    (0, ensure_1.assertCondition)(properties[field], `${referencedByPropertyName} set to undefined field "${field}"`);
                    (0, ensure_1.assertCondition)(properties[field].required, `Field "${field}" must be marked as required in schema with codaType "${codaType}".`);
                  }
                  __name(checkSchemaPropertyIsRequired, "checkSchemaPropertyIsRequired");
                  __name2(checkSchemaPropertyIsRequired, "checkSchemaPropertyIsRequired");
                  function normalizeSchemaKey(key) {
                    return (0, pascalcase_1.default)(key).replace(/:/g, "_");
                  }
                  __name(normalizeSchemaKey, "normalizeSchemaKey");
                  __name2(normalizeSchemaKey, "normalizeSchemaKey");
                  exports4.normalizeSchemaKey = normalizeSchemaKey;
                  function normalizeSchemaKeyPath(key, normalizedProperties) {
                    if (normalizedProperties.hasOwnProperty(normalizeSchemaKey(key))) {
                      return normalizeSchemaKey(key);
                    }
                    return key.split(".").map((val) => {
                      let partToNormalize = val;
                      let partToIgnoreNormalization = "";
                      if (val.includes("[")) {
                        partToNormalize = val.substring(0, val.indexOf("["));
                        partToIgnoreNormalization = val.substring(val.indexOf("["));
                      }
                      return normalizeSchemaKey(partToNormalize) + partToIgnoreNormalization;
                    }).join(".");
                  }
                  __name(normalizeSchemaKeyPath, "normalizeSchemaKeyPath");
                  __name2(normalizeSchemaKeyPath, "normalizeSchemaKeyPath");
                  exports4.normalizeSchemaKeyPath = normalizeSchemaKeyPath;
                  function normalizeSchemaPropertyIdentifier(key, normalizedProperties) {
                    if (typeof key === "string") {
                      return normalizeSchemaKeyPath(key, normalizedProperties);
                    }
                    const { label, property: value, placeholder } = key;
                    return {
                      property: normalizeSchemaKeyPath(value, normalizedProperties),
                      label,
                      placeholder
                    };
                  }
                  __name(normalizeSchemaPropertyIdentifier, "normalizeSchemaPropertyIdentifier");
                  __name2(normalizeSchemaPropertyIdentifier, "normalizeSchemaPropertyIdentifier");
                  function normalizePropertyValuePathIntoSchemaPath(propertyValue) {
                    const normalizedValue = propertyValue.split(".").map((val) => {
                      return val.replace(/\[(.*?)\]/, ".items");
                    }).join(".properties.");
                    return normalizedValue;
                  }
                  __name(normalizePropertyValuePathIntoSchemaPath, "normalizePropertyValuePathIntoSchemaPath");
                  __name2(normalizePropertyValuePathIntoSchemaPath, "normalizePropertyValuePathIntoSchemaPath");
                  exports4.normalizePropertyValuePathIntoSchemaPath = normalizePropertyValuePathIntoSchemaPath;
                  function normalizeSchema(schema) {
                    if (isArray(schema)) {
                      return {
                        ...schema,
                        type: ValueType2.Array,
                        items: normalizeSchema(schema.items)
                      };
                    } else if (isObject(schema)) {
                      const normalized = {};
                      const { id, primary, featured, idProperty, displayProperty, featuredProperties, titleProperty, subtitleProperties, imageProperty, snippetProperty, linkProperty } = schema;
                      for (const key of Object.keys(schema.properties)) {
                        const normalizedKey = normalizeSchemaKey(key);
                        const props = schema.properties[key];
                        const { required, fromKey } = props;
                        normalized[normalizedKey] = Object.assign(normalizeSchema(props), {
                          required,
                          fromKey: fromKey || (normalizedKey !== key ? key : void 0)
                        });
                      }
                      const normalizedSchema = {
                        type: ValueType2.Object,
                        id: id ? normalizeSchemaKey(id) : void 0,
                        featured: featured ? featured.map(normalizeSchemaKey) : void 0,
                        primary: primary ? normalizeSchemaKey(primary) : void 0,
                        idProperty: idProperty ? normalizeSchemaKey(idProperty) : void 0,
                        featuredProperties: featuredProperties ? featuredProperties.map(normalizeSchemaKey) : void 0,
                        displayProperty: displayProperty ? normalizeSchemaKey(displayProperty) : void 0,
                        properties: normalized,
                        identity: schema.identity,
                        codaType: schema.codaType,
                        description: schema.description,
                        attribution: schema.attribution,
                        includeUnknownProperties: schema.includeUnknownProperties,
                        titleProperty: titleProperty ? normalizeSchemaPropertyIdentifier(titleProperty, normalized) : void 0,
                        subtitleProperties: subtitleProperties ? subtitleProperties.map((subProp) => normalizeSchemaPropertyIdentifier(subProp, normalized)) : void 0,
                        imageProperty: imageProperty ? normalizeSchemaPropertyIdentifier(imageProperty, normalized) : void 0,
                        snippetProperty: snippetProperty ? normalizeSchemaPropertyIdentifier(snippetProperty, normalized) : void 0,
                        linkProperty: linkProperty ? normalizeSchemaPropertyIdentifier(linkProperty, normalized) : void 0,
                        mutable: schema.mutable,
                        autocomplete: schema.autocomplete
                      };
                      return normalizedSchema;
                    }
                    return schema;
                  }
                  __name(normalizeSchema, "normalizeSchema");
                  __name2(normalizeSchema, "normalizeSchema");
                  exports4.normalizeSchema = normalizeSchema;
                  function makeReferenceSchemaFromObjectSchema(schema, identityName) {
                    const { type, id, primary, identity, properties, mutable, autocomplete } = (0, migration_1.objectSchemaHelper)(schema);
                    (0, ensure_2.ensureExists)(identity || identityName, "Source schema must have an identity field, or you must provide an identity name for the reference.");
                    const validId = (0, ensure_2.ensureExists)(id);
                    const referenceProperties = { [validId]: properties[validId] };
                    if (primary && primary !== id) {
                      referenceProperties[primary] = properties[primary];
                    }
                    return makeObjectSchema2({
                      codaType: ValueHintType.Reference,
                      type,
                      idProperty: id,
                      identity: identity || { name: (0, ensure_2.ensureExists)(identityName) },
                      displayProperty: primary,
                      properties: referenceProperties,
                      mutable,
                      autocomplete
                    });
                  }
                  __name(makeReferenceSchemaFromObjectSchema, "makeReferenceSchemaFromObjectSchema");
                  __name2(makeReferenceSchemaFromObjectSchema, "makeReferenceSchemaFromObjectSchema");
                  exports4.makeReferenceSchemaFromObjectSchema = makeReferenceSchemaFromObjectSchema;
                  function withIdentity(schema, identityName) {
                    return makeObjectSchema2({
                      ...(0, object_utils_1.deepCopy)(schema),
                      identity: { name: (0, ensure_3.ensureNonEmptyString)(identityName) }
                    });
                  }
                  __name(withIdentity, "withIdentity");
                  __name2(withIdentity, "withIdentity");
                  exports4.withIdentity = withIdentity;
                }
              });
              var require_clone = __commonJS2({
                "node_modules/clone/clone.js"(exports4, module22) {
                  init_crypto_shim2();
                  var clone = function() {
                    "use strict";
                    function _instanceof(obj, type) {
                      return type != null && obj instanceof type;
                    }
                    __name(_instanceof, "_instanceof");
                    __name2(_instanceof, "_instanceof");
                    var nativeMap;
                    try {
                      nativeMap = Map;
                    } catch (_) {
                      nativeMap = /* @__PURE__ */ __name2(function() {
                      }, "nativeMap");
                    }
                    var nativeSet;
                    try {
                      nativeSet = Set;
                    } catch (_) {
                      nativeSet = /* @__PURE__ */ __name2(function() {
                      }, "nativeSet");
                    }
                    var nativePromise;
                    try {
                      nativePromise = Promise;
                    } catch (_) {
                      nativePromise = /* @__PURE__ */ __name2(function() {
                      }, "nativePromise");
                    }
                    function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
                      if (typeof circular === "object") {
                        depth = circular.depth;
                        prototype = circular.prototype;
                        includeNonEnumerable = circular.includeNonEnumerable;
                        circular = circular.circular;
                      }
                      var allParents = [];
                      var allChildren = [];
                      var useBuffer = typeof Buffer2 != "undefined";
                      if (typeof circular == "undefined")
                        circular = true;
                      if (typeof depth == "undefined")
                        depth = Infinity;
                      function _clone(parent2, depth2) {
                        if (parent2 === null)
                          return null;
                        if (depth2 === 0)
                          return parent2;
                        var child;
                        var proto;
                        if (typeof parent2 != "object") {
                          return parent2;
                        }
                        if (_instanceof(parent2, nativeMap)) {
                          child = new nativeMap();
                        } else if (_instanceof(parent2, nativeSet)) {
                          child = new nativeSet();
                        } else if (_instanceof(parent2, nativePromise)) {
                          child = new nativePromise(function(resolve, reject) {
                            parent2.then(function(value) {
                              resolve(_clone(value, depth2 - 1));
                            }, function(err) {
                              reject(_clone(err, depth2 - 1));
                            });
                          });
                        } else if (clone2.__isArray(parent2)) {
                          child = [];
                        } else if (clone2.__isRegExp(parent2)) {
                          child = new RegExp(parent2.source, __getRegExpFlags(parent2));
                          if (parent2.lastIndex)
                            child.lastIndex = parent2.lastIndex;
                        } else if (clone2.__isDate(parent2)) {
                          child = new Date(parent2.getTime());
                        } else if (useBuffer && Buffer2.isBuffer(parent2)) {
                          if (Buffer2.allocUnsafe) {
                            child = Buffer2.allocUnsafe(parent2.length);
                          } else {
                            child = new Buffer2(parent2.length);
                          }
                          parent2.copy(child);
                          return child;
                        } else if (_instanceof(parent2, Error)) {
                          child = Object.create(parent2);
                        } else {
                          if (typeof prototype == "undefined") {
                            proto = Object.getPrototypeOf(parent2);
                            child = Object.create(proto);
                          } else {
                            child = Object.create(prototype);
                            proto = prototype;
                          }
                        }
                        if (circular) {
                          var index = allParents.indexOf(parent2);
                          if (index != -1) {
                            return allChildren[index];
                          }
                          allParents.push(parent2);
                          allChildren.push(child);
                        }
                        if (_instanceof(parent2, nativeMap)) {
                          parent2.forEach(function(value, key) {
                            var keyChild = _clone(key, depth2 - 1);
                            var valueChild = _clone(value, depth2 - 1);
                            child.set(keyChild, valueChild);
                          });
                        }
                        if (_instanceof(parent2, nativeSet)) {
                          parent2.forEach(function(value) {
                            var entryChild = _clone(value, depth2 - 1);
                            child.add(entryChild);
                          });
                        }
                        for (var i in parent2) {
                          var attrs;
                          if (proto) {
                            attrs = Object.getOwnPropertyDescriptor(proto, i);
                          }
                          if (attrs && attrs.set == null) {
                            continue;
                          }
                          child[i] = _clone(parent2[i], depth2 - 1);
                        }
                        if (Object.getOwnPropertySymbols) {
                          var symbols = Object.getOwnPropertySymbols(parent2);
                          for (var i = 0; i < symbols.length; i++) {
                            var symbol = symbols[i];
                            var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
                            if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                              continue;
                            }
                            child[symbol] = _clone(parent2[symbol], depth2 - 1);
                            if (!descriptor.enumerable) {
                              Object.defineProperty(child, symbol, {
                                enumerable: false
                              });
                            }
                          }
                        }
                        if (includeNonEnumerable) {
                          var allPropertyNames = Object.getOwnPropertyNames(parent2);
                          for (var i = 0; i < allPropertyNames.length; i++) {
                            var propertyName = allPropertyNames[i];
                            var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
                            if (descriptor && descriptor.enumerable) {
                              continue;
                            }
                            child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
                            Object.defineProperty(child, propertyName, {
                              enumerable: false
                            });
                          }
                        }
                        return child;
                      }
                      __name(_clone, "_clone");
                      __name2(_clone, "_clone");
                      return _clone(parent, depth);
                    }
                    __name(clone2, "clone2");
                    __name2(clone2, "clone");
                    clone2.clonePrototype = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function clonePrototype(parent) {
                      if (parent === null)
                        return null;
                      var c = /* @__PURE__ */ __name2(function() {
                      }, "c");
                      c.prototype = parent;
                      return new c();
                    }, "clonePrototype"), "clonePrototype");
                    function __objToStr(o) {
                      return Object.prototype.toString.call(o);
                    }
                    __name(__objToStr, "__objToStr");
                    __name2(__objToStr, "__objToStr");
                    clone2.__objToStr = __objToStr;
                    function __isDate(o) {
                      return typeof o === "object" && __objToStr(o) === "[object Date]";
                    }
                    __name(__isDate, "__isDate");
                    __name2(__isDate, "__isDate");
                    clone2.__isDate = __isDate;
                    function __isArray(o) {
                      return typeof o === "object" && __objToStr(o) === "[object Array]";
                    }
                    __name(__isArray, "__isArray");
                    __name2(__isArray, "__isArray");
                    clone2.__isArray = __isArray;
                    function __isRegExp(o) {
                      return typeof o === "object" && __objToStr(o) === "[object RegExp]";
                    }
                    __name(__isRegExp, "__isRegExp");
                    __name2(__isRegExp, "__isRegExp");
                    clone2.__isRegExp = __isRegExp;
                    function __getRegExpFlags(re) {
                      var flags = "";
                      if (re.global)
                        flags += "g";
                      if (re.ignoreCase)
                        flags += "i";
                      if (re.multiline)
                        flags += "m";
                      return flags;
                    }
                    __name(__getRegExpFlags, "__getRegExpFlags");
                    __name2(__getRegExpFlags, "__getRegExpFlags");
                    clone2.__getRegExpFlags = __getRegExpFlags;
                    return clone2;
                  }();
                  if (typeof module22 === "object" && module22.exports) {
                    module22.exports = clone;
                  }
                }
              });
              var require_shams = __commonJS2({
                "node_modules/has-symbols/shams.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hasSymbols() {
                    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
                      return false;
                    }
                    if (typeof Symbol.iterator === "symbol") {
                      return true;
                    }
                    var obj = {};
                    var sym = Symbol("test");
                    var symObj = Object(sym);
                    if (typeof sym === "string") {
                      return false;
                    }
                    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
                      return false;
                    }
                    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
                      return false;
                    }
                    var symVal = 42;
                    obj[sym] = symVal;
                    for (sym in obj) {
                      return false;
                    }
                    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
                      return false;
                    }
                    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
                      return false;
                    }
                    var syms = Object.getOwnPropertySymbols(obj);
                    if (syms.length !== 1 || syms[0] !== sym) {
                      return false;
                    }
                    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
                      return false;
                    }
                    if (typeof Object.getOwnPropertyDescriptor === "function") {
                      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
                      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
                        return false;
                      }
                    }
                    return true;
                  }, "hasSymbols"), "hasSymbols");
                }
              });
              var require_has_symbols = __commonJS2({
                "node_modules/has-symbols/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var origSymbol = typeof Symbol !== "undefined" && Symbol;
                  var hasSymbolSham = require_shams();
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hasNativeSymbols() {
                    if (typeof origSymbol !== "function") {
                      return false;
                    }
                    if (typeof Symbol !== "function") {
                      return false;
                    }
                    if (typeof origSymbol("foo") !== "symbol") {
                      return false;
                    }
                    if (typeof Symbol("bar") !== "symbol") {
                      return false;
                    }
                    return hasSymbolSham();
                  }, "hasNativeSymbols"), "hasNativeSymbols");
                }
              });
              var require_has_proto = __commonJS2({
                "node_modules/has-proto/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var test = {
                    foo: {}
                  };
                  var $Object = Object;
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hasProto() {
                    return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
                  }, "hasProto"), "hasProto");
                }
              });
              var require_implementation = __commonJS2({
                "node_modules/function-bind/implementation.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
                  var slice = Array.prototype.slice;
                  var toStr = Object.prototype.toString;
                  var funcType = "[object Function]";
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bind(that) {
                    var target = this;
                    if (typeof target !== "function" || toStr.call(target) !== funcType) {
                      throw new TypeError(ERROR_MESSAGE + target);
                    }
                    var args = slice.call(arguments, 1);
                    var bound;
                    var binder = /* @__PURE__ */ __name2(function() {
                      if (this instanceof bound) {
                        var result = target.apply(
                          this,
                          args.concat(slice.call(arguments))
                        );
                        if (Object(result) === result) {
                          return result;
                        }
                        return this;
                      } else {
                        return target.apply(
                          that,
                          args.concat(slice.call(arguments))
                        );
                      }
                    }, "binder");
                    var boundLength = Math.max(0, target.length - args.length);
                    var boundArgs = [];
                    for (var i = 0; i < boundLength; i++) {
                      boundArgs.push("$" + i);
                    }
                    bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
                    if (target.prototype) {
                      var Empty = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function Empty2() {
                      }, "Empty2"), "Empty");
                      Empty.prototype = target.prototype;
                      bound.prototype = new Empty();
                      Empty.prototype = null;
                    }
                    return bound;
                  }, "bind"), "bind");
                }
              });
              var require_function_bind = __commonJS2({
                "node_modules/function-bind/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var implementation = require_implementation();
                  module22.exports = Function.prototype.bind || implementation;
                }
              });
              var require_src = __commonJS2({
                "node_modules/has/src/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var bind = require_function_bind();
                  module22.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
                }
              });
              var require_get_intrinsic = __commonJS2({
                "node_modules/get-intrinsic/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var undefined2;
                  var $SyntaxError = SyntaxError;
                  var $Function = Function;
                  var $TypeError = TypeError;
                  var getEvalledConstructor = /* @__PURE__ */ __name2(function(expressionSyntax) {
                    try {
                      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
                    } catch (e) {
                    }
                  }, "getEvalledConstructor");
                  var $gOPD = Object.getOwnPropertyDescriptor;
                  if ($gOPD) {
                    try {
                      $gOPD({}, "");
                    } catch (e) {
                      $gOPD = null;
                    }
                  }
                  var throwTypeError = /* @__PURE__ */ __name2(function() {
                    throw new $TypeError();
                  }, "throwTypeError");
                  var ThrowTypeError = $gOPD ? function() {
                    try {
                      arguments.callee;
                      return throwTypeError;
                    } catch (calleeThrows) {
                      try {
                        return $gOPD(arguments, "callee").get;
                      } catch (gOPDthrows) {
                        return throwTypeError;
                      }
                    }
                  }() : throwTypeError;
                  var hasSymbols = require_has_symbols()();
                  var hasProto = require_has_proto()();
                  var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
                    return x.__proto__;
                  } : null);
                  var needsEval = {};
                  var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
                  var INTRINSICS = {
                    "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
                    "%Array%": Array,
                    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
                    "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
                    "%AsyncFromSyncIteratorPrototype%": undefined2,
                    "%AsyncFunction%": needsEval,
                    "%AsyncGenerator%": needsEval,
                    "%AsyncGeneratorFunction%": needsEval,
                    "%AsyncIteratorPrototype%": needsEval,
                    "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
                    "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
                    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
                    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
                    "%Boolean%": Boolean,
                    "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
                    "%Date%": Date,
                    "%decodeURI%": decodeURI,
                    "%decodeURIComponent%": decodeURIComponent,
                    "%encodeURI%": encodeURI,
                    "%encodeURIComponent%": encodeURIComponent,
                    "%Error%": Error,
                    "%eval%": eval,
                    // eslint-disable-line no-eval
                    "%EvalError%": EvalError,
                    "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
                    "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
                    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
                    "%Function%": $Function,
                    "%GeneratorFunction%": needsEval,
                    "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
                    "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
                    "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
                    "%isFinite%": isFinite,
                    "%isNaN%": isNaN,
                    "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
                    "%JSON%": typeof JSON === "object" ? JSON : undefined2,
                    "%Map%": typeof Map === "undefined" ? undefined2 : Map,
                    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
                    "%Math%": Math,
                    "%Number%": Number,
                    "%Object%": Object,
                    "%parseFloat%": parseFloat,
                    "%parseInt%": parseInt,
                    "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
                    "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
                    "%RangeError%": RangeError,
                    "%ReferenceError%": ReferenceError,
                    "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
                    "%RegExp%": RegExp,
                    "%Set%": typeof Set === "undefined" ? undefined2 : Set,
                    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
                    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
                    "%String%": String,
                    "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
                    "%Symbol%": hasSymbols ? Symbol : undefined2,
                    "%SyntaxError%": $SyntaxError,
                    "%ThrowTypeError%": ThrowTypeError,
                    "%TypedArray%": TypedArray,
                    "%TypeError%": $TypeError,
                    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
                    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
                    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
                    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
                    "%URIError%": URIError,
                    "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
                    "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
                    "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
                  };
                  if (getProto) {
                    try {
                      null.error;
                    } catch (e) {
                      errorProto = getProto(getProto(e));
                      INTRINSICS["%Error.prototype%"] = errorProto;
                    }
                  }
                  var errorProto;
                  var doEval = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function doEval2(name) {
                    var value;
                    if (name === "%AsyncFunction%") {
                      value = getEvalledConstructor("async function () {}");
                    } else if (name === "%GeneratorFunction%") {
                      value = getEvalledConstructor("function* () {}");
                    } else if (name === "%AsyncGeneratorFunction%") {
                      value = getEvalledConstructor("async function* () {}");
                    } else if (name === "%AsyncGenerator%") {
                      var fn = doEval2("%AsyncGeneratorFunction%");
                      if (fn) {
                        value = fn.prototype;
                      }
                    } else if (name === "%AsyncIteratorPrototype%") {
                      var gen = doEval2("%AsyncGenerator%");
                      if (gen && getProto) {
                        value = getProto(gen.prototype);
                      }
                    }
                    INTRINSICS[name] = value;
                    return value;
                  }, "doEval2"), "doEval");
                  var LEGACY_ALIASES = {
                    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
                    "%ArrayPrototype%": ["Array", "prototype"],
                    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
                    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
                    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
                    "%ArrayProto_values%": ["Array", "prototype", "values"],
                    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
                    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
                    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
                    "%BooleanPrototype%": ["Boolean", "prototype"],
                    "%DataViewPrototype%": ["DataView", "prototype"],
                    "%DatePrototype%": ["Date", "prototype"],
                    "%ErrorPrototype%": ["Error", "prototype"],
                    "%EvalErrorPrototype%": ["EvalError", "prototype"],
                    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
                    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
                    "%FunctionPrototype%": ["Function", "prototype"],
                    "%Generator%": ["GeneratorFunction", "prototype"],
                    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
                    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
                    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
                    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
                    "%JSONParse%": ["JSON", "parse"],
                    "%JSONStringify%": ["JSON", "stringify"],
                    "%MapPrototype%": ["Map", "prototype"],
                    "%NumberPrototype%": ["Number", "prototype"],
                    "%ObjectPrototype%": ["Object", "prototype"],
                    "%ObjProto_toString%": ["Object", "prototype", "toString"],
                    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
                    "%PromisePrototype%": ["Promise", "prototype"],
                    "%PromiseProto_then%": ["Promise", "prototype", "then"],
                    "%Promise_all%": ["Promise", "all"],
                    "%Promise_reject%": ["Promise", "reject"],
                    "%Promise_resolve%": ["Promise", "resolve"],
                    "%RangeErrorPrototype%": ["RangeError", "prototype"],
                    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
                    "%RegExpPrototype%": ["RegExp", "prototype"],
                    "%SetPrototype%": ["Set", "prototype"],
                    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
                    "%StringPrototype%": ["String", "prototype"],
                    "%SymbolPrototype%": ["Symbol", "prototype"],
                    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
                    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
                    "%TypeErrorPrototype%": ["TypeError", "prototype"],
                    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
                    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
                    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
                    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
                    "%URIErrorPrototype%": ["URIError", "prototype"],
                    "%WeakMapPrototype%": ["WeakMap", "prototype"],
                    "%WeakSetPrototype%": ["WeakSet", "prototype"]
                  };
                  var bind = require_function_bind();
                  var hasOwn = require_src();
                  var $concat = bind.call(Function.call, Array.prototype.concat);
                  var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
                  var $replace = bind.call(Function.call, String.prototype.replace);
                  var $strSlice = bind.call(Function.call, String.prototype.slice);
                  var $exec = bind.call(Function.call, RegExp.prototype.exec);
                  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
                  var reEscapeChar = /\\(\\)?/g;
                  var stringToPath = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function stringToPath2(string) {
                    var first = $strSlice(string, 0, 1);
                    var last = $strSlice(string, -1);
                    if (first === "%" && last !== "%") {
                      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
                    } else if (last === "%" && first !== "%") {
                      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
                    }
                    var result = [];
                    $replace(string, rePropName, function(match, number, quote, subString) {
                      result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
                    });
                    return result;
                  }, "stringToPath2"), "stringToPath");
                  var getBaseIntrinsic = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getBaseIntrinsic2(name, allowMissing) {
                    var intrinsicName = name;
                    var alias;
                    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
                      alias = LEGACY_ALIASES[intrinsicName];
                      intrinsicName = "%" + alias[0] + "%";
                    }
                    if (hasOwn(INTRINSICS, intrinsicName)) {
                      var value = INTRINSICS[intrinsicName];
                      if (value === needsEval) {
                        value = doEval(intrinsicName);
                      }
                      if (typeof value === "undefined" && !allowMissing) {
                        throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
                      }
                      return {
                        alias,
                        name: intrinsicName,
                        value
                      };
                    }
                    throw new $SyntaxError("intrinsic " + name + " does not exist!");
                  }, "getBaseIntrinsic2"), "getBaseIntrinsic");
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function GetIntrinsic(name, allowMissing) {
                    if (typeof name !== "string" || name.length === 0) {
                      throw new $TypeError("intrinsic name must be a non-empty string");
                    }
                    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
                      throw new $TypeError('"allowMissing" argument must be a boolean');
                    }
                    if ($exec(/^%?[^%]*%?$/, name) === null) {
                      throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
                    }
                    var parts = stringToPath(name);
                    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
                    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
                    var intrinsicRealName = intrinsic.name;
                    var value = intrinsic.value;
                    var skipFurtherCaching = false;
                    var alias = intrinsic.alias;
                    if (alias) {
                      intrinsicBaseName = alias[0];
                      $spliceApply(parts, $concat([0, 1], alias));
                    }
                    for (var i = 1, isOwn = true; i < parts.length; i += 1) {
                      var part = parts[i];
                      var first = $strSlice(part, 0, 1);
                      var last = $strSlice(part, -1);
                      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
                        throw new $SyntaxError("property names with quotes must have matching quotes");
                      }
                      if (part === "constructor" || !isOwn) {
                        skipFurtherCaching = true;
                      }
                      intrinsicBaseName += "." + part;
                      intrinsicRealName = "%" + intrinsicBaseName + "%";
                      if (hasOwn(INTRINSICS, intrinsicRealName)) {
                        value = INTRINSICS[intrinsicRealName];
                      } else if (value != null) {
                        if (!(part in value)) {
                          if (!allowMissing) {
                            throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
                          }
                          return void 0;
                        }
                        if ($gOPD && i + 1 >= parts.length) {
                          var desc = $gOPD(value, part);
                          isOwn = !!desc;
                          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                            value = desc.get;
                          } else {
                            value = value[part];
                          }
                        } else {
                          isOwn = hasOwn(value, part);
                          value = value[part];
                        }
                        if (isOwn && !skipFurtherCaching) {
                          INTRINSICS[intrinsicRealName] = value;
                        }
                      }
                    }
                    return value;
                  }, "GetIntrinsic"), "GetIntrinsic");
                }
              });
              var require_call_bind = __commonJS2({
                "node_modules/call-bind/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var bind = require_function_bind();
                  var GetIntrinsic = require_get_intrinsic();
                  var $apply = GetIntrinsic("%Function.prototype.apply%");
                  var $call = GetIntrinsic("%Function.prototype.call%");
                  var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
                  var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
                  var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
                  var $max = GetIntrinsic("%Math.max%");
                  if ($defineProperty) {
                    try {
                      $defineProperty({}, "a", { value: 1 });
                    } catch (e) {
                      $defineProperty = null;
                    }
                  }
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function callBind(originalFunction) {
                    var func = $reflectApply(bind, $call, arguments);
                    if ($gOPD && $defineProperty) {
                      var desc = $gOPD(func, "length");
                      if (desc.configurable) {
                        $defineProperty(
                          func,
                          "length",
                          { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
                        );
                      }
                    }
                    return func;
                  }, "callBind"), "callBind");
                  var applyBind = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function applyBind2() {
                    return $reflectApply(bind, $apply, arguments);
                  }, "applyBind2"), "applyBind");
                  if ($defineProperty) {
                    $defineProperty(module22.exports, "apply", { value: applyBind });
                  } else {
                    module22.exports.apply = applyBind;
                  }
                }
              });
              var require_callBound = __commonJS2({
                "node_modules/call-bind/callBound.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var GetIntrinsic = require_get_intrinsic();
                  var callBind = require_call_bind();
                  var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function callBoundIntrinsic(name, allowMissing) {
                    var intrinsic = GetIntrinsic(name, !!allowMissing);
                    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
                      return callBind(intrinsic);
                    }
                    return intrinsic;
                  }, "callBoundIntrinsic"), "callBoundIntrinsic");
                }
              });
              var require_util_inspect = __commonJS2({
                "node_modules/object-inspect/util.inspect.js"(exports4, module22) {
                  init_crypto_shim2();
                  module22.exports = require2("util").inspect;
                }
              });
              var require_object_inspect = __commonJS2({
                "node_modules/object-inspect/index.js"(exports4, module22) {
                  init_crypto_shim2();
                  var hasMap = typeof Map === "function" && Map.prototype;
                  var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
                  var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
                  var mapForEach = hasMap && Map.prototype.forEach;
                  var hasSet = typeof Set === "function" && Set.prototype;
                  var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
                  var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
                  var setForEach = hasSet && Set.prototype.forEach;
                  var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
                  var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
                  var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
                  var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
                  var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
                  var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
                  var booleanValueOf = Boolean.prototype.valueOf;
                  var objectToString = Object.prototype.toString;
                  var functionToString = Function.prototype.toString;
                  var $match = String.prototype.match;
                  var $slice = String.prototype.slice;
                  var $replace = String.prototype.replace;
                  var $toUpperCase = String.prototype.toUpperCase;
                  var $toLowerCase = String.prototype.toLowerCase;
                  var $test = RegExp.prototype.test;
                  var $concat = Array.prototype.concat;
                  var $join = Array.prototype.join;
                  var $arrSlice = Array.prototype.slice;
                  var $floor = Math.floor;
                  var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
                  var gOPS = Object.getOwnPropertySymbols;
                  var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
                  var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
                  var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
                  var isEnumerable = Object.prototype.propertyIsEnumerable;
                  var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
                    return O.__proto__;
                  } : null);
                  function addNumericSeparator(num, str) {
                    if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
                      return str;
                    }
                    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
                    if (typeof num === "number") {
                      var int = num < 0 ? -$floor(-num) : $floor(num);
                      if (int !== num) {
                        var intStr = String(int);
                        var dec = $slice.call(str, intStr.length + 1);
                        return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
                      }
                    }
                    return $replace.call(str, sepRegex, "$&_");
                  }
                  __name(addNumericSeparator, "addNumericSeparator");
                  __name2(addNumericSeparator, "addNumericSeparator");
                  var utilInspect = require_util_inspect();
                  var inspectCustom = utilInspect.custom;
                  var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function inspect_(obj, options, depth, seen) {
                    var opts = options || {};
                    if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
                      throw new TypeError('option "quoteStyle" must be "single" or "double"');
                    }
                    if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
                      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
                    }
                    var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
                    if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
                      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
                    }
                    if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
                      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
                    }
                    if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
                      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
                    }
                    var numericSeparator = opts.numericSeparator;
                    if (typeof obj === "undefined") {
                      return "undefined";
                    }
                    if (obj === null) {
                      return "null";
                    }
                    if (typeof obj === "boolean") {
                      return obj ? "true" : "false";
                    }
                    if (typeof obj === "string") {
                      return inspectString(obj, opts);
                    }
                    if (typeof obj === "number") {
                      if (obj === 0) {
                        return Infinity / obj > 0 ? "0" : "-0";
                      }
                      var str = String(obj);
                      return numericSeparator ? addNumericSeparator(obj, str) : str;
                    }
                    if (typeof obj === "bigint") {
                      var bigIntStr = String(obj) + "n";
                      return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
                    }
                    var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
                    if (typeof depth === "undefined") {
                      depth = 0;
                    }
                    if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
                      return isArray(obj) ? "[Array]" : "[Object]";
                    }
                    var indent = getIndent(opts, depth);
                    if (typeof seen === "undefined") {
                      seen = [];
                    } else if (indexOf(seen, obj) >= 0) {
                      return "[Circular]";
                    }
                    function inspect(value, from, noIndent) {
                      if (from) {
                        seen = $arrSlice.call(seen);
                        seen.push(from);
                      }
                      if (noIndent) {
                        var newOpts = {
                          depth: opts.depth
                        };
                        if (has(opts, "quoteStyle")) {
                          newOpts.quoteStyle = opts.quoteStyle;
                        }
                        return inspect_(value, newOpts, depth + 1, seen);
                      }
                      return inspect_(value, opts, depth + 1, seen);
                    }
                    __name(inspect, "inspect");
                    __name2(inspect, "inspect");
                    if (typeof obj === "function" && !isRegExp(obj)) {
                      var name = nameOf(obj);
                      var keys = arrObjKeys(obj, inspect);
                      return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
                    }
                    if (isSymbol(obj)) {
                      var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
                      return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
                    }
                    if (isElement(obj)) {
                      var s = "<" + $toLowerCase.call(String(obj.nodeName));
                      var attrs = obj.attributes || [];
                      for (var i = 0; i < attrs.length; i++) {
                        s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
                      }
                      s += ">";
                      if (obj.childNodes && obj.childNodes.length) {
                        s += "...";
                      }
                      s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
                      return s;
                    }
                    if (isArray(obj)) {
                      if (obj.length === 0) {
                        return "[]";
                      }
                      var xs = arrObjKeys(obj, inspect);
                      if (indent && !singleLineValues(xs)) {
                        return "[" + indentedJoin(xs, indent) + "]";
                      }
                      return "[ " + $join.call(xs, ", ") + " ]";
                    }
                    if (isError(obj)) {
                      var parts = arrObjKeys(obj, inspect);
                      if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
                        return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
                      }
                      if (parts.length === 0) {
                        return "[" + String(obj) + "]";
                      }
                      return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
                    }
                    if (typeof obj === "object" && customInspect) {
                      if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
                        return utilInspect(obj, { depth: maxDepth - depth });
                      } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
                        return obj.inspect();
                      }
                    }
                    if (isMap(obj)) {
                      var mapParts = [];
                      if (mapForEach) {
                        mapForEach.call(obj, function(value, key) {
                          mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
                        });
                      }
                      return collectionOf("Map", mapSize.call(obj), mapParts, indent);
                    }
                    if (isSet(obj)) {
                      var setParts = [];
                      if (setForEach) {
                        setForEach.call(obj, function(value) {
                          setParts.push(inspect(value, obj));
                        });
                      }
                      return collectionOf("Set", setSize.call(obj), setParts, indent);
                    }
                    if (isWeakMap(obj)) {
                      return weakCollectionOf("WeakMap");
                    }
                    if (isWeakSet(obj)) {
                      return weakCollectionOf("WeakSet");
                    }
                    if (isWeakRef(obj)) {
                      return weakCollectionOf("WeakRef");
                    }
                    if (isNumber(obj)) {
                      return markBoxed(inspect(Number(obj)));
                    }
                    if (isBigInt(obj)) {
                      return markBoxed(inspect(bigIntValueOf.call(obj)));
                    }
                    if (isBoolean(obj)) {
                      return markBoxed(booleanValueOf.call(obj));
                    }
                    if (isString(obj)) {
                      return markBoxed(inspect(String(obj)));
                    }
                    if (!isDate(obj) && !isRegExp(obj)) {
                      var ys = arrObjKeys(obj, inspect);
                      var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
                      var protoTag = obj instanceof Object ? "" : "null prototype";
                      var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
                      var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
                      var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
                      if (ys.length === 0) {
                        return tag + "{}";
                      }
                      if (indent) {
                        return tag + "{" + indentedJoin(ys, indent) + "}";
                      }
                      return tag + "{ " + $join.call(ys, ", ") + " }";
                    }
                    return String(obj);
                  }, "inspect_"), "inspect_");
                  function wrapQuotes(s, defaultStyle, opts) {
                    var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
                    return quoteChar + s + quoteChar;
                  }
                  __name(wrapQuotes, "wrapQuotes");
                  __name2(wrapQuotes, "wrapQuotes");
                  function quote(s) {
                    return $replace.call(String(s), /"/g, "&quot;");
                  }
                  __name(quote, "quote");
                  __name2(quote, "quote");
                  function isArray(obj) {
                    return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
                  }
                  __name(isArray, "isArray");
                  __name2(isArray, "isArray");
                  function isDate(obj) {
                    return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
                  }
                  __name(isDate, "isDate");
                  __name2(isDate, "isDate");
                  function isRegExp(obj) {
                    return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
                  }
                  __name(isRegExp, "isRegExp");
                  __name2(isRegExp, "isRegExp");
                  function isError(obj) {
                    return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
                  }
                  __name(isError, "isError");
                  __name2(isError, "isError");
                  function isString(obj) {
                    return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
                  }
                  __name(isString, "isString");
                  __name2(isString, "isString");
                  function isNumber(obj) {
                    return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
                  }
                  __name(isNumber, "isNumber");
                  __name2(isNumber, "isNumber");
                  function isBoolean(obj) {
                    return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
                  }
                  __name(isBoolean, "isBoolean");
                  __name2(isBoolean, "isBoolean");
                  function isSymbol(obj) {
                    if (hasShammedSymbols) {
                      return obj && typeof obj === "object" && obj instanceof Symbol;
                    }
                    if (typeof obj === "symbol") {
                      return true;
                    }
                    if (!obj || typeof obj !== "object" || !symToString) {
                      return false;
                    }
                    try {
                      symToString.call(obj);
                      return true;
                    } catch (e) {
                    }
                    return false;
                  }
                  __name(isSymbol, "isSymbol");
                  __name2(isSymbol, "isSymbol");
                  function isBigInt(obj) {
                    if (!obj || typeof obj !== "object" || !bigIntValueOf) {
                      return false;
                    }
                    try {
                      bigIntValueOf.call(obj);
                      return true;
                    } catch (e) {
                    }
                    return false;
                  }
                  __name(isBigInt, "isBigInt");
                  __name2(isBigInt, "isBigInt");
                  var hasOwn = Object.prototype.hasOwnProperty || function(key) {
                    return key in this;
                  };
                  function has(obj, key) {
                    return hasOwn.call(obj, key);
                  }
                  __name(has, "has");
                  __name2(has, "has");
                  function toStr(obj) {
                    return objectToString.call(obj);
                  }
                  __name(toStr, "toStr");
                  __name2(toStr, "toStr");
                  function nameOf(f) {
                    if (f.name) {
                      return f.name;
                    }
                    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
                    if (m) {
                      return m[1];
                    }
                    return null;
                  }
                  __name(nameOf, "nameOf");
                  __name2(nameOf, "nameOf");
                  function indexOf(xs, x) {
                    if (xs.indexOf) {
                      return xs.indexOf(x);
                    }
                    for (var i = 0, l = xs.length; i < l; i++) {
                      if (xs[i] === x) {
                        return i;
                      }
                    }
                    return -1;
                  }
                  __name(indexOf, "indexOf");
                  __name2(indexOf, "indexOf");
                  function isMap(x) {
                    if (!mapSize || !x || typeof x !== "object") {
                      return false;
                    }
                    try {
                      mapSize.call(x);
                      try {
                        setSize.call(x);
                      } catch (s) {
                        return true;
                      }
                      return x instanceof Map;
                    } catch (e) {
                    }
                    return false;
                  }
                  __name(isMap, "isMap");
                  __name2(isMap, "isMap");
                  function isWeakMap(x) {
                    if (!weakMapHas || !x || typeof x !== "object") {
                      return false;
                    }
                    try {
                      weakMapHas.call(x, weakMapHas);
                      try {
                        weakSetHas.call(x, weakSetHas);
                      } catch (s) {
                        return true;
                      }
                      return x instanceof WeakMap;
                    } catch (e) {
                    }
                    return false;
                  }
                  __name(isWeakMap, "isWeakMap");
                  __name2(isWeakMap, "isWeakMap");
                  function isWeakRef(x) {
                    if (!weakRefDeref || !x || typeof x !== "object") {
                      return false;
                    }
                    try {
                      weakRefDeref.call(x);
                      return true;
                    } catch (e) {
                    }
                    return false;
                  }
                  __name(isWeakRef, "isWeakRef");
                  __name2(isWeakRef, "isWeakRef");
                  function isSet(x) {
                    if (!setSize || !x || typeof x !== "object") {
                      return false;
                    }
                    try {
                      setSize.call(x);
                      try {
                        mapSize.call(x);
                      } catch (m) {
                        return true;
                      }
                      return x instanceof Set;
                    } catch (e) {
                    }
                    return false;
                  }
                  __name(isSet, "isSet");
                  __name2(isSet, "isSet");
                  function isWeakSet(x) {
                    if (!weakSetHas || !x || typeof x !== "object") {
                      return false;
                    }
                    try {
                      weakSetHas.call(x, weakSetHas);
                      try {
                        weakMapHas.call(x, weakMapHas);
                      } catch (s) {
                        return true;
                      }
                      return x instanceof WeakSet;
                    } catch (e) {
                    }
                    return false;
                  }
                  __name(isWeakSet, "isWeakSet");
                  __name2(isWeakSet, "isWeakSet");
                  function isElement(x) {
                    if (!x || typeof x !== "object") {
                      return false;
                    }
                    if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
                      return true;
                    }
                    return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
                  }
                  __name(isElement, "isElement");
                  __name2(isElement, "isElement");
                  function inspectString(str, opts) {
                    if (str.length > opts.maxStringLength) {
                      var remaining = str.length - opts.maxStringLength;
                      var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
                      return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
                    }
                    var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
                    return wrapQuotes(s, "single", opts);
                  }
                  __name(inspectString, "inspectString");
                  __name2(inspectString, "inspectString");
                  function lowbyte(c) {
                    var n = c.charCodeAt(0);
                    var x = {
                      8: "b",
                      9: "t",
                      10: "n",
                      12: "f",
                      13: "r"
                    }[n];
                    if (x) {
                      return "\\" + x;
                    }
                    return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
                  }
                  __name(lowbyte, "lowbyte");
                  __name2(lowbyte, "lowbyte");
                  function markBoxed(str) {
                    return "Object(" + str + ")";
                  }
                  __name(markBoxed, "markBoxed");
                  __name2(markBoxed, "markBoxed");
                  function weakCollectionOf(type) {
                    return type + " { ? }";
                  }
                  __name(weakCollectionOf, "weakCollectionOf");
                  __name2(weakCollectionOf, "weakCollectionOf");
                  function collectionOf(type, size, entries, indent) {
                    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
                    return type + " (" + size + ") {" + joinedEntries + "}";
                  }
                  __name(collectionOf, "collectionOf");
                  __name2(collectionOf, "collectionOf");
                  function singleLineValues(xs) {
                    for (var i = 0; i < xs.length; i++) {
                      if (indexOf(xs[i], "\n") >= 0) {
                        return false;
                      }
                    }
                    return true;
                  }
                  __name(singleLineValues, "singleLineValues");
                  __name2(singleLineValues, "singleLineValues");
                  function getIndent(opts, depth) {
                    var baseIndent;
                    if (opts.indent === "	") {
                      baseIndent = "	";
                    } else if (typeof opts.indent === "number" && opts.indent > 0) {
                      baseIndent = $join.call(Array(opts.indent + 1), " ");
                    } else {
                      return null;
                    }
                    return {
                      base: baseIndent,
                      prev: $join.call(Array(depth + 1), baseIndent)
                    };
                  }
                  __name(getIndent, "getIndent");
                  __name2(getIndent, "getIndent");
                  function indentedJoin(xs, indent) {
                    if (xs.length === 0) {
                      return "";
                    }
                    var lineJoiner = "\n" + indent.prev + indent.base;
                    return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
                  }
                  __name(indentedJoin, "indentedJoin");
                  __name2(indentedJoin, "indentedJoin");
                  function arrObjKeys(obj, inspect) {
                    var isArr = isArray(obj);
                    var xs = [];
                    if (isArr) {
                      xs.length = obj.length;
                      for (var i = 0; i < obj.length; i++) {
                        xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
                      }
                    }
                    var syms = typeof gOPS === "function" ? gOPS(obj) : [];
                    var symMap;
                    if (hasShammedSymbols) {
                      symMap = {};
                      for (var k = 0; k < syms.length; k++) {
                        symMap["$" + syms[k]] = syms[k];
                      }
                    }
                    for (var key in obj) {
                      if (!has(obj, key)) {
                        continue;
                      }
                      if (isArr && String(Number(key)) === key && key < obj.length) {
                        continue;
                      }
                      if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
                        continue;
                      } else if ($test.call(/[^\w$]/, key)) {
                        xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
                      } else {
                        xs.push(key + ": " + inspect(obj[key], obj));
                      }
                    }
                    if (typeof gOPS === "function") {
                      for (var j = 0; j < syms.length; j++) {
                        if (isEnumerable.call(obj, syms[j])) {
                          xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
                        }
                      }
                    }
                    return xs;
                  }
                  __name(arrObjKeys, "arrObjKeys");
                  __name2(arrObjKeys, "arrObjKeys");
                }
              });
              var require_side_channel = __commonJS2({
                "node_modules/side-channel/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var GetIntrinsic = require_get_intrinsic();
                  var callBound = require_callBound();
                  var inspect = require_object_inspect();
                  var $TypeError = GetIntrinsic("%TypeError%");
                  var $WeakMap = GetIntrinsic("%WeakMap%", true);
                  var $Map = GetIntrinsic("%Map%", true);
                  var $weakMapGet = callBound("WeakMap.prototype.get", true);
                  var $weakMapSet = callBound("WeakMap.prototype.set", true);
                  var $weakMapHas = callBound("WeakMap.prototype.has", true);
                  var $mapGet = callBound("Map.prototype.get", true);
                  var $mapSet = callBound("Map.prototype.set", true);
                  var $mapHas = callBound("Map.prototype.has", true);
                  var listGetNode = /* @__PURE__ */ __name2(function(list, key) {
                    for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
                      if (curr.key === key) {
                        prev.next = curr.next;
                        curr.next = list.next;
                        list.next = curr;
                        return curr;
                      }
                    }
                  }, "listGetNode");
                  var listGet = /* @__PURE__ */ __name2(function(objects, key) {
                    var node = listGetNode(objects, key);
                    return node && node.value;
                  }, "listGet");
                  var listSet = /* @__PURE__ */ __name2(function(objects, key, value) {
                    var node = listGetNode(objects, key);
                    if (node) {
                      node.value = value;
                    } else {
                      objects.next = {
                        // eslint-disable-line no-param-reassign
                        key,
                        next: objects.next,
                        value
                      };
                    }
                  }, "listSet");
                  var listHas = /* @__PURE__ */ __name2(function(objects, key) {
                    return !!listGetNode(objects, key);
                  }, "listHas");
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getSideChannel() {
                    var $wm;
                    var $m;
                    var $o;
                    var channel = {
                      assert: function(key) {
                        if (!channel.has(key)) {
                          throw new $TypeError("Side channel does not contain " + inspect(key));
                        }
                      },
                      get: function(key) {
                        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                          if ($wm) {
                            return $weakMapGet($wm, key);
                          }
                        } else if ($Map) {
                          if ($m) {
                            return $mapGet($m, key);
                          }
                        } else {
                          if ($o) {
                            return listGet($o, key);
                          }
                        }
                      },
                      has: function(key) {
                        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                          if ($wm) {
                            return $weakMapHas($wm, key);
                          }
                        } else if ($Map) {
                          if ($m) {
                            return $mapHas($m, key);
                          }
                        } else {
                          if ($o) {
                            return listHas($o, key);
                          }
                        }
                        return false;
                      },
                      set: function(key, value) {
                        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                          if (!$wm) {
                            $wm = new $WeakMap();
                          }
                          $weakMapSet($wm, key, value);
                        } else if ($Map) {
                          if (!$m) {
                            $m = new $Map();
                          }
                          $mapSet($m, key, value);
                        } else {
                          if (!$o) {
                            $o = { key: {}, next: null };
                          }
                          listSet($o, key, value);
                        }
                      }
                    };
                    return channel;
                  }, "getSideChannel"), "getSideChannel");
                }
              });
              var require_formats = __commonJS2({
                "node_modules/qs/lib/formats.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var replace = String.prototype.replace;
                  var percentTwenties = /%20/g;
                  var Format = {
                    RFC1738: "RFC1738",
                    RFC3986: "RFC3986"
                  };
                  module22.exports = {
                    "default": Format.RFC3986,
                    formatters: {
                      RFC1738: function(value) {
                        return replace.call(value, percentTwenties, "+");
                      },
                      RFC3986: function(value) {
                        return String(value);
                      }
                    },
                    RFC1738: Format.RFC1738,
                    RFC3986: Format.RFC3986
                  };
                }
              });
              var require_utils = __commonJS2({
                "node_modules/qs/lib/utils.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var formats = require_formats();
                  var has = Object.prototype.hasOwnProperty;
                  var isArray = Array.isArray;
                  var hexTable = function() {
                    var array = [];
                    for (var i = 0; i < 256; ++i) {
                      array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
                    }
                    return array;
                  }();
                  var compactQueue = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function compactQueue2(queue) {
                    while (queue.length > 1) {
                      var item = queue.pop();
                      var obj = item.obj[item.prop];
                      if (isArray(obj)) {
                        var compacted = [];
                        for (var j = 0; j < obj.length; ++j) {
                          if (typeof obj[j] !== "undefined") {
                            compacted.push(obj[j]);
                          }
                        }
                        item.obj[item.prop] = compacted;
                      }
                    }
                  }, "compactQueue2"), "compactQueue");
                  var arrayToObject = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function arrayToObject2(source, options) {
                    var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
                    for (var i = 0; i < source.length; ++i) {
                      if (typeof source[i] !== "undefined") {
                        obj[i] = source[i];
                      }
                    }
                    return obj;
                  }, "arrayToObject2"), "arrayToObject");
                  var merge = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function merge2(target, source, options) {
                    if (!source) {
                      return target;
                    }
                    if (typeof source !== "object") {
                      if (isArray(target)) {
                        target.push(source);
                      } else if (target && typeof target === "object") {
                        if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
                          target[source] = true;
                        }
                      } else {
                        return [target, source];
                      }
                      return target;
                    }
                    if (!target || typeof target !== "object") {
                      return [target].concat(source);
                    }
                    var mergeTarget = target;
                    if (isArray(target) && !isArray(source)) {
                      mergeTarget = arrayToObject(target, options);
                    }
                    if (isArray(target) && isArray(source)) {
                      source.forEach(function(item, i) {
                        if (has.call(target, i)) {
                          var targetItem = target[i];
                          if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
                            target[i] = merge2(targetItem, item, options);
                          } else {
                            target.push(item);
                          }
                        } else {
                          target[i] = item;
                        }
                      });
                      return target;
                    }
                    return Object.keys(source).reduce(function(acc, key) {
                      var value = source[key];
                      if (has.call(acc, key)) {
                        acc[key] = merge2(acc[key], value, options);
                      } else {
                        acc[key] = value;
                      }
                      return acc;
                    }, mergeTarget);
                  }, "merge2"), "merge");
                  var assign = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function assignSingleSource(target, source) {
                    return Object.keys(source).reduce(function(acc, key) {
                      acc[key] = source[key];
                      return acc;
                    }, target);
                  }, "assignSingleSource"), "assignSingleSource");
                  var decode = /* @__PURE__ */ __name2(function(str, decoder, charset) {
                    var strWithoutPlus = str.replace(/\+/g, " ");
                    if (charset === "iso-8859-1") {
                      return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
                    }
                    try {
                      return decodeURIComponent(strWithoutPlus);
                    } catch (e) {
                      return strWithoutPlus;
                    }
                  }, "decode");
                  var encode = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function encode2(str, defaultEncoder, charset, kind, format) {
                    if (str.length === 0) {
                      return str;
                    }
                    var string = str;
                    if (typeof str === "symbol") {
                      string = Symbol.prototype.toString.call(str);
                    } else if (typeof str !== "string") {
                      string = String(str);
                    }
                    if (charset === "iso-8859-1") {
                      return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
                        return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
                      });
                    }
                    var out = "";
                    for (var i = 0; i < string.length; ++i) {
                      var c = string.charCodeAt(i);
                      if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
                        out += string.charAt(i);
                        continue;
                      }
                      if (c < 128) {
                        out = out + hexTable[c];
                        continue;
                      }
                      if (c < 2048) {
                        out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
                        continue;
                      }
                      if (c < 55296 || c >= 57344) {
                        out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
                        continue;
                      }
                      i += 1;
                      c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
                      out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
                    }
                    return out;
                  }, "encode2"), "encode");
                  var compact = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function compact2(value) {
                    var queue = [{ obj: { o: value }, prop: "o" }];
                    var refs = [];
                    for (var i = 0; i < queue.length; ++i) {
                      var item = queue[i];
                      var obj = item.obj[item.prop];
                      var keys = Object.keys(obj);
                      for (var j = 0; j < keys.length; ++j) {
                        var key = keys[j];
                        var val = obj[key];
                        if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
                          queue.push({ obj, prop: key });
                          refs.push(val);
                        }
                      }
                    }
                    compactQueue(queue);
                    return value;
                  }, "compact2"), "compact");
                  var isRegExp = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function isRegExp2(obj) {
                    return Object.prototype.toString.call(obj) === "[object RegExp]";
                  }, "isRegExp2"), "isRegExp");
                  var isBuffer = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function isBuffer2(obj) {
                    if (!obj || typeof obj !== "object") {
                      return false;
                    }
                    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
                  }, "isBuffer2"), "isBuffer");
                  var combine = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function combine2(a, b) {
                    return [].concat(a, b);
                  }, "combine2"), "combine");
                  var maybeMap = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function maybeMap2(val, fn) {
                    if (isArray(val)) {
                      var mapped = [];
                      for (var i = 0; i < val.length; i += 1) {
                        mapped.push(fn(val[i]));
                      }
                      return mapped;
                    }
                    return fn(val);
                  }, "maybeMap2"), "maybeMap");
                  module22.exports = {
                    arrayToObject,
                    assign,
                    combine,
                    compact,
                    decode,
                    encode,
                    isBuffer,
                    isRegExp,
                    maybeMap,
                    merge
                  };
                }
              });
              var require_stringify = __commonJS2({
                "node_modules/qs/lib/stringify.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var getSideChannel = require_side_channel();
                  var utils = require_utils();
                  var formats = require_formats();
                  var has = Object.prototype.hasOwnProperty;
                  var arrayPrefixGenerators = {
                    brackets: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function brackets(prefix) {
                      return prefix + "[]";
                    }, "brackets"), "brackets"),
                    comma: "comma",
                    indices: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function indices(prefix, key) {
                      return prefix + "[" + key + "]";
                    }, "indices"), "indices"),
                    repeat: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function repeat(prefix) {
                      return prefix;
                    }, "repeat"), "repeat")
                  };
                  var isArray = Array.isArray;
                  var push = Array.prototype.push;
                  var pushToArray = /* @__PURE__ */ __name2(function(arr, valueOrArray) {
                    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
                  }, "pushToArray");
                  var toISO = Date.prototype.toISOString;
                  var defaultFormat = formats["default"];
                  var defaults = {
                    addQueryPrefix: false,
                    allowDots: false,
                    charset: "utf-8",
                    charsetSentinel: false,
                    delimiter: "&",
                    encode: true,
                    encoder: utils.encode,
                    encodeValuesOnly: false,
                    format: defaultFormat,
                    formatter: formats.formatters[defaultFormat],
                    // deprecated
                    indices: false,
                    serializeDate: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function serializeDate(date) {
                      return toISO.call(date);
                    }, "serializeDate"), "serializeDate"),
                    skipNulls: false,
                    strictNullHandling: false
                  };
                  var isNonNullishPrimitive = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function isNonNullishPrimitive2(v) {
                    return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
                  }, "isNonNullishPrimitive2"), "isNonNullishPrimitive");
                  var sentinel = {};
                  var stringify = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
                    var obj = object;
                    var tmpSc = sideChannel;
                    var step = 0;
                    var findFlag = false;
                    while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
                      var pos = tmpSc.get(object);
                      step += 1;
                      if (typeof pos !== "undefined") {
                        if (pos === step) {
                          throw new RangeError("Cyclic object value");
                        } else {
                          findFlag = true;
                        }
                      }
                      if (typeof tmpSc.get(sentinel) === "undefined") {
                        step = 0;
                      }
                    }
                    if (typeof filter === "function") {
                      obj = filter(prefix, obj);
                    } else if (obj instanceof Date) {
                      obj = serializeDate(obj);
                    } else if (generateArrayPrefix === "comma" && isArray(obj)) {
                      obj = utils.maybeMap(obj, function(value2) {
                        if (value2 instanceof Date) {
                          return serializeDate(value2);
                        }
                        return value2;
                      });
                    }
                    if (obj === null) {
                      if (strictNullHandling) {
                        return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
                      }
                      obj = "";
                    }
                    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
                      if (encoder) {
                        var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
                        return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
                      }
                      return [formatter(prefix) + "=" + formatter(String(obj))];
                    }
                    var values = [];
                    if (typeof obj === "undefined") {
                      return values;
                    }
                    var objKeys;
                    if (generateArrayPrefix === "comma" && isArray(obj)) {
                      if (encodeValuesOnly && encoder) {
                        obj = utils.maybeMap(obj, encoder);
                      }
                      objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
                    } else if (isArray(filter)) {
                      objKeys = filter;
                    } else {
                      var keys = Object.keys(obj);
                      objKeys = sort ? keys.sort(sort) : keys;
                    }
                    var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + "[]" : prefix;
                    for (var j = 0; j < objKeys.length; ++j) {
                      var key = objKeys[j];
                      var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
                      if (skipNulls && value === null) {
                        continue;
                      }
                      var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
                      sideChannel.set(object, step);
                      var valueSideChannel = getSideChannel();
                      valueSideChannel.set(sentinel, sideChannel);
                      pushToArray(values, stringify2(
                        value,
                        keyPrefix,
                        generateArrayPrefix,
                        commaRoundTrip,
                        strictNullHandling,
                        skipNulls,
                        generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
                        filter,
                        sort,
                        allowDots,
                        serializeDate,
                        format,
                        formatter,
                        encodeValuesOnly,
                        charset,
                        valueSideChannel
                      ));
                    }
                    return values;
                  }, "stringify2"), "stringify");
                  var normalizeStringifyOptions = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function normalizeStringifyOptions2(opts) {
                    if (!opts) {
                      return defaults;
                    }
                    if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
                      throw new TypeError("Encoder has to be a function.");
                    }
                    var charset = opts.charset || defaults.charset;
                    if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
                      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
                    }
                    var format = formats["default"];
                    if (typeof opts.format !== "undefined") {
                      if (!has.call(formats.formatters, opts.format)) {
                        throw new TypeError("Unknown format option provided.");
                      }
                      format = opts.format;
                    }
                    var formatter = formats.formatters[format];
                    var filter = defaults.filter;
                    if (typeof opts.filter === "function" || isArray(opts.filter)) {
                      filter = opts.filter;
                    }
                    return {
                      addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
                      allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
                      charset,
                      charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
                      delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
                      encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
                      encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
                      encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
                      filter,
                      format,
                      formatter,
                      serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
                      skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
                      sort: typeof opts.sort === "function" ? opts.sort : null,
                      strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
                    };
                  }, "normalizeStringifyOptions2"), "normalizeStringifyOptions");
                  module22.exports = function(object, opts) {
                    var obj = object;
                    var options = normalizeStringifyOptions(opts);
                    var objKeys;
                    var filter;
                    if (typeof options.filter === "function") {
                      filter = options.filter;
                      obj = filter("", obj);
                    } else if (isArray(options.filter)) {
                      filter = options.filter;
                      objKeys = filter;
                    }
                    var keys = [];
                    if (typeof obj !== "object" || obj === null) {
                      return "";
                    }
                    var arrayFormat;
                    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
                      arrayFormat = opts.arrayFormat;
                    } else if (opts && "indices" in opts) {
                      arrayFormat = opts.indices ? "indices" : "repeat";
                    } else {
                      arrayFormat = "indices";
                    }
                    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
                    if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
                      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
                    }
                    var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
                    if (!objKeys) {
                      objKeys = Object.keys(obj);
                    }
                    if (options.sort) {
                      objKeys.sort(options.sort);
                    }
                    var sideChannel = getSideChannel();
                    for (var i = 0; i < objKeys.length; ++i) {
                      var key = objKeys[i];
                      if (options.skipNulls && obj[key] === null) {
                        continue;
                      }
                      pushToArray(keys, stringify(
                        obj[key],
                        key,
                        generateArrayPrefix,
                        commaRoundTrip,
                        options.strictNullHandling,
                        options.skipNulls,
                        options.encode ? options.encoder : null,
                        options.filter,
                        options.sort,
                        options.allowDots,
                        options.serializeDate,
                        options.format,
                        options.formatter,
                        options.encodeValuesOnly,
                        options.charset,
                        sideChannel
                      ));
                    }
                    var joined = keys.join(options.delimiter);
                    var prefix = options.addQueryPrefix === true ? "?" : "";
                    if (options.charsetSentinel) {
                      if (options.charset === "iso-8859-1") {
                        prefix += "utf8=%26%2310003%3B&";
                      } else {
                        prefix += "utf8=%E2%9C%93&";
                      }
                    }
                    return joined.length > 0 ? prefix + joined : "";
                  };
                }
              });
              var require_parse = __commonJS2({
                "node_modules/qs/lib/parse.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var utils = require_utils();
                  var has = Object.prototype.hasOwnProperty;
                  var isArray = Array.isArray;
                  var defaults = {
                    allowDots: false,
                    allowPrototypes: false,
                    allowSparse: false,
                    arrayLimit: 20,
                    charset: "utf-8",
                    charsetSentinel: false,
                    comma: false,
                    decoder: utils.decode,
                    delimiter: "&",
                    depth: 5,
                    ignoreQueryPrefix: false,
                    interpretNumericEntities: false,
                    parameterLimit: 1e3,
                    parseArrays: true,
                    plainObjects: false,
                    strictNullHandling: false
                  };
                  var interpretNumericEntities = /* @__PURE__ */ __name2(function(str) {
                    return str.replace(/&#(\d+);/g, function($0, numberStr) {
                      return String.fromCharCode(parseInt(numberStr, 10));
                    });
                  }, "interpretNumericEntities");
                  var parseArrayValue = /* @__PURE__ */ __name2(function(val, options) {
                    if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
                      return val.split(",");
                    }
                    return val;
                  }, "parseArrayValue");
                  var isoSentinel = "utf8=%26%2310003%3B";
                  var charsetSentinel = "utf8=%E2%9C%93";
                  var parseValues = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseQueryStringValues(str, options) {
                    var obj = {};
                    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
                    var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
                    var parts = cleanStr.split(options.delimiter, limit);
                    var skipIndex = -1;
                    var i;
                    var charset = options.charset;
                    if (options.charsetSentinel) {
                      for (i = 0; i < parts.length; ++i) {
                        if (parts[i].indexOf("utf8=") === 0) {
                          if (parts[i] === charsetSentinel) {
                            charset = "utf-8";
                          } else if (parts[i] === isoSentinel) {
                            charset = "iso-8859-1";
                          }
                          skipIndex = i;
                          i = parts.length;
                        }
                      }
                    }
                    for (i = 0; i < parts.length; ++i) {
                      if (i === skipIndex) {
                        continue;
                      }
                      var part = parts[i];
                      var bracketEqualsPos = part.indexOf("]=");
                      var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
                      var key, val;
                      if (pos === -1) {
                        key = options.decoder(part, defaults.decoder, charset, "key");
                        val = options.strictNullHandling ? null : "";
                      } else {
                        key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
                        val = utils.maybeMap(
                          parseArrayValue(part.slice(pos + 1), options),
                          function(encodedVal) {
                            return options.decoder(encodedVal, defaults.decoder, charset, "value");
                          }
                        );
                      }
                      if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
                        val = interpretNumericEntities(val);
                      }
                      if (part.indexOf("[]=") > -1) {
                        val = isArray(val) ? [val] : val;
                      }
                      if (has.call(obj, key)) {
                        obj[key] = utils.combine(obj[key], val);
                      } else {
                        obj[key] = val;
                      }
                    }
                    return obj;
                  }, "parseQueryStringValues"), "parseQueryStringValues");
                  var parseObject = /* @__PURE__ */ __name2(function(chain, val, options, valuesParsed) {
                    var leaf = valuesParsed ? val : parseArrayValue(val, options);
                    for (var i = chain.length - 1; i >= 0; --i) {
                      var obj;
                      var root = chain[i];
                      if (root === "[]" && options.parseArrays) {
                        obj = [].concat(leaf);
                      } else {
                        obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
                        var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
                        var index = parseInt(cleanRoot, 10);
                        if (!options.parseArrays && cleanRoot === "") {
                          obj = { 0: leaf };
                        } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
                          obj = [];
                          obj[index] = leaf;
                        } else if (cleanRoot !== "__proto__") {
                          obj[cleanRoot] = leaf;
                        }
                      }
                      leaf = obj;
                    }
                    return leaf;
                  }, "parseObject");
                  var parseKeys = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
                    if (!givenKey) {
                      return;
                    }
                    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
                    var brackets = /(\[[^[\]]*])/;
                    var child = /(\[[^[\]]*])/g;
                    var segment = options.depth > 0 && brackets.exec(key);
                    var parent = segment ? key.slice(0, segment.index) : key;
                    var keys = [];
                    if (parent) {
                      if (!options.plainObjects && has.call(Object.prototype, parent)) {
                        if (!options.allowPrototypes) {
                          return;
                        }
                      }
                      keys.push(parent);
                    }
                    var i = 0;
                    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
                      i += 1;
                      if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
                        if (!options.allowPrototypes) {
                          return;
                        }
                      }
                      keys.push(segment[1]);
                    }
                    if (segment) {
                      keys.push("[" + key.slice(segment.index) + "]");
                    }
                    return parseObject(keys, val, options, valuesParsed);
                  }, "parseQueryStringKeys"), "parseQueryStringKeys");
                  var normalizeParseOptions = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function normalizeParseOptions2(opts) {
                    if (!opts) {
                      return defaults;
                    }
                    if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
                      throw new TypeError("Decoder has to be a function.");
                    }
                    if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
                      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
                    }
                    var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
                    return {
                      allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
                      allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
                      allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
                      arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
                      charset,
                      charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
                      comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
                      decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
                      delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
                      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
                      depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
                      ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
                      interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
                      parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
                      parseArrays: opts.parseArrays !== false,
                      plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
                      strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
                    };
                  }, "normalizeParseOptions2"), "normalizeParseOptions");
                  module22.exports = function(str, opts) {
                    var options = normalizeParseOptions(opts);
                    if (str === "" || str === null || typeof str === "undefined") {
                      return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
                    }
                    var tempObj = typeof str === "string" ? parseValues(str, options) : str;
                    var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
                    var keys = Object.keys(tempObj);
                    for (var i = 0; i < keys.length; ++i) {
                      var key = keys[i];
                      var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
                      obj = utils.merge(obj, newObj, options);
                    }
                    if (options.allowSparse === true) {
                      return obj;
                    }
                    return utils.compact(obj);
                  };
                }
              });
              var require_lib = __commonJS2({
                "node_modules/qs/lib/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var stringify = require_stringify();
                  var parse = require_parse();
                  var formats = require_formats();
                  module22.exports = {
                    formats,
                    parse,
                    stringify
                  };
                }
              });
              var require_requires_port = __commonJS2({
                "node_modules/requires-port/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  module22.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function required(port, protocol) {
                    protocol = protocol.split(":")[0];
                    port = +port;
                    if (!port)
                      return false;
                    switch (protocol) {
                      case "http":
                      case "ws":
                        return port !== 80;
                      case "https":
                      case "wss":
                        return port !== 443;
                      case "ftp":
                        return port !== 21;
                      case "gopher":
                        return port !== 70;
                      case "file":
                        return false;
                    }
                    return port !== 0;
                  }, "required"), "required");
                }
              });
              var require_querystringify = __commonJS2({
                "node_modules/querystringify/index.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  var has = Object.prototype.hasOwnProperty;
                  var undef;
                  function decode(input) {
                    try {
                      return decodeURIComponent(input.replace(/\+/g, " "));
                    } catch (e) {
                      return null;
                    }
                  }
                  __name(decode, "decode");
                  __name2(decode, "decode");
                  function encode(input) {
                    try {
                      return encodeURIComponent(input);
                    } catch (e) {
                      return null;
                    }
                  }
                  __name(encode, "encode");
                  __name2(encode, "encode");
                  function querystring(query) {
                    var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
                    while (part = parser.exec(query)) {
                      var key = decode(part[1]), value = decode(part[2]);
                      if (key === null || value === null || key in result)
                        continue;
                      result[key] = value;
                    }
                    return result;
                  }
                  __name(querystring, "querystring");
                  __name2(querystring, "querystring");
                  function querystringify(obj, prefix) {
                    prefix = prefix || "";
                    var pairs = [], value, key;
                    if ("string" !== typeof prefix)
                      prefix = "?";
                    for (key in obj) {
                      if (has.call(obj, key)) {
                        value = obj[key];
                        if (!value && (value === null || value === undef || isNaN(value))) {
                          value = "";
                        }
                        key = encode(key);
                        value = encode(value);
                        if (key === null || value === null)
                          continue;
                        pairs.push(key + "=" + value);
                      }
                    }
                    return pairs.length ? prefix + pairs.join("&") : "";
                  }
                  __name(querystringify, "querystringify");
                  __name2(querystringify, "querystringify");
                  exports4.stringify = querystringify;
                  exports4.parse = querystring;
                }
              });
              var require_url_parse = __commonJS2({
                "node_modules/url-parse/index.js"(exports4, module22) {
                  "use strict";
                  init_crypto_shim2();
                  var required = require_requires_port();
                  var qs = require_querystringify();
                  var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
                  var CRHTLF = /[\n\r\t]/g;
                  var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
                  var port = /:\d+$/;
                  var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
                  var windowsDriveLetter = /^[a-zA-Z]:/;
                  function trimLeft(str) {
                    return (str ? str : "").toString().replace(controlOrWhitespace, "");
                  }
                  __name(trimLeft, "trimLeft");
                  __name2(trimLeft, "trimLeft");
                  var rules = [
                    ["#", "hash"],
                    // Extract from the back.
                    ["?", "query"],
                    // Extract from the back.
                    /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function sanitize(address, url) {
                      return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
                    }, "sanitize"), "sanitize"),
                    ["/", "pathname"],
                    // Extract from the back.
                    ["@", "auth", 1],
                    // Extract from the front.
                    [NaN, "host", void 0, 1, 1],
                    // Set left over value.
                    [/:(\d*)$/, "port", void 0, 1],
                    // RegExp the back.
                    [NaN, "hostname", void 0, 1, 1]
                    // Set left over.
                  ];
                  var ignore = { hash: 1, query: 1 };
                  function lolcation(loc) {
                    var globalVar;
                    if (typeof window !== "undefined")
                      globalVar = window;
                    else if (typeof global2 !== "undefined")
                      globalVar = global2;
                    else if (typeof self !== "undefined")
                      globalVar = self;
                    else
                      globalVar = {};
                    var location = globalVar.location || {};
                    loc = loc || location;
                    var finaldestination = {}, type = typeof loc, key;
                    if ("blob:" === loc.protocol) {
                      finaldestination = new Url(unescape(loc.pathname), {});
                    } else if ("string" === type) {
                      finaldestination = new Url(loc, {});
                      for (key in ignore)
                        delete finaldestination[key];
                    } else if ("object" === type) {
                      for (key in loc) {
                        if (key in ignore)
                          continue;
                        finaldestination[key] = loc[key];
                      }
                      if (finaldestination.slashes === void 0) {
                        finaldestination.slashes = slashes.test(loc.href);
                      }
                    }
                    return finaldestination;
                  }
                  __name(lolcation, "lolcation");
                  __name2(lolcation, "lolcation");
                  function isSpecial(scheme) {
                    return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
                  }
                  __name(isSpecial, "isSpecial");
                  __name2(isSpecial, "isSpecial");
                  function extractProtocol(address, location) {
                    address = trimLeft(address);
                    address = address.replace(CRHTLF, "");
                    location = location || {};
                    var match = protocolre.exec(address);
                    var protocol = match[1] ? match[1].toLowerCase() : "";
                    var forwardSlashes = !!match[2];
                    var otherSlashes = !!match[3];
                    var slashesCount = 0;
                    var rest;
                    if (forwardSlashes) {
                      if (otherSlashes) {
                        rest = match[2] + match[3] + match[4];
                        slashesCount = match[2].length + match[3].length;
                      } else {
                        rest = match[2] + match[4];
                        slashesCount = match[2].length;
                      }
                    } else {
                      if (otherSlashes) {
                        rest = match[3] + match[4];
                        slashesCount = match[3].length;
                      } else {
                        rest = match[4];
                      }
                    }
                    if (protocol === "file:") {
                      if (slashesCount >= 2) {
                        rest = rest.slice(2);
                      }
                    } else if (isSpecial(protocol)) {
                      rest = match[4];
                    } else if (protocol) {
                      if (forwardSlashes) {
                        rest = rest.slice(2);
                      }
                    } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
                      rest = match[4];
                    }
                    return {
                      protocol,
                      slashes: forwardSlashes || isSpecial(protocol),
                      slashesCount,
                      rest
                    };
                  }
                  __name(extractProtocol, "extractProtocol");
                  __name2(extractProtocol, "extractProtocol");
                  function resolve(relative, base) {
                    if (relative === "")
                      return base;
                    var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
                    while (i--) {
                      if (path[i] === ".") {
                        path.splice(i, 1);
                      } else if (path[i] === "..") {
                        path.splice(i, 1);
                        up++;
                      } else if (up) {
                        if (i === 0)
                          unshift = true;
                        path.splice(i, 1);
                        up--;
                      }
                    }
                    if (unshift)
                      path.unshift("");
                    if (last === "." || last === "..")
                      path.push("");
                    return path.join("/");
                  }
                  __name(resolve, "resolve");
                  __name2(resolve, "resolve");
                  function Url(address, location, parser) {
                    address = trimLeft(address);
                    address = address.replace(CRHTLF, "");
                    if (!(this instanceof Url)) {
                      return new Url(address, location, parser);
                    }
                    var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
                    if ("object" !== type && "string" !== type) {
                      parser = location;
                      location = null;
                    }
                    if (parser && "function" !== typeof parser)
                      parser = qs.parse;
                    location = lolcation(location);
                    extracted = extractProtocol(address || "", location);
                    relative = !extracted.protocol && !extracted.slashes;
                    url.slashes = extracted.slashes || relative && location.slashes;
                    url.protocol = extracted.protocol || location.protocol || "";
                    address = extracted.rest;
                    if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
                      instructions[3] = [/(.*)/, "pathname"];
                    }
                    for (; i < instructions.length; i++) {
                      instruction = instructions[i];
                      if (typeof instruction === "function") {
                        address = instruction(address, url);
                        continue;
                      }
                      parse = instruction[0];
                      key = instruction[1];
                      if (parse !== parse) {
                        url[key] = address;
                      } else if ("string" === typeof parse) {
                        index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
                        if (~index) {
                          if ("number" === typeof instruction[2]) {
                            url[key] = address.slice(0, index);
                            address = address.slice(index + instruction[2]);
                          } else {
                            url[key] = address.slice(index);
                            address = address.slice(0, index);
                          }
                        }
                      } else if (index = parse.exec(address)) {
                        url[key] = index[1];
                        address = address.slice(0, index.index);
                      }
                      url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
                      if (instruction[4])
                        url[key] = url[key].toLowerCase();
                    }
                    if (parser)
                      url.query = parser(url.query);
                    if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
                      url.pathname = resolve(url.pathname, location.pathname);
                    }
                    if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
                      url.pathname = "/" + url.pathname;
                    }
                    if (!required(url.port, url.protocol)) {
                      url.host = url.hostname;
                      url.port = "";
                    }
                    url.username = url.password = "";
                    if (url.auth) {
                      index = url.auth.indexOf(":");
                      if (~index) {
                        url.username = url.auth.slice(0, index);
                        url.username = encodeURIComponent(decodeURIComponent(url.username));
                        url.password = url.auth.slice(index + 1);
                        url.password = encodeURIComponent(decodeURIComponent(url.password));
                      } else {
                        url.username = encodeURIComponent(decodeURIComponent(url.auth));
                      }
                      url.auth = url.password ? url.username + ":" + url.password : url.username;
                    }
                    url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
                    url.href = url.toString();
                  }
                  __name(Url, "Url");
                  __name2(Url, "Url");
                  function set(part, value, fn) {
                    var url = this;
                    switch (part) {
                      case "query":
                        if ("string" === typeof value && value.length) {
                          value = (fn || qs.parse)(value);
                        }
                        url[part] = value;
                        break;
                      case "port":
                        url[part] = value;
                        if (!required(value, url.protocol)) {
                          url.host = url.hostname;
                          url[part] = "";
                        } else if (value) {
                          url.host = url.hostname + ":" + value;
                        }
                        break;
                      case "hostname":
                        url[part] = value;
                        if (url.port)
                          value += ":" + url.port;
                        url.host = value;
                        break;
                      case "host":
                        url[part] = value;
                        if (port.test(value)) {
                          value = value.split(":");
                          url.port = value.pop();
                          url.hostname = value.join(":");
                        } else {
                          url.hostname = value;
                          url.port = "";
                        }
                        break;
                      case "protocol":
                        url.protocol = value.toLowerCase();
                        url.slashes = !fn;
                        break;
                      case "pathname":
                      case "hash":
                        if (value) {
                          var char = part === "pathname" ? "/" : "#";
                          url[part] = value.charAt(0) !== char ? char + value : value;
                        } else {
                          url[part] = value;
                        }
                        break;
                      case "username":
                      case "password":
                        url[part] = encodeURIComponent(value);
                        break;
                      case "auth":
                        var index = value.indexOf(":");
                        if (~index) {
                          url.username = value.slice(0, index);
                          url.username = encodeURIComponent(decodeURIComponent(url.username));
                          url.password = value.slice(index + 1);
                          url.password = encodeURIComponent(decodeURIComponent(url.password));
                        } else {
                          url.username = encodeURIComponent(decodeURIComponent(value));
                        }
                    }
                    for (var i = 0; i < rules.length; i++) {
                      var ins = rules[i];
                      if (ins[4])
                        url[ins[1]] = url[ins[1]].toLowerCase();
                    }
                    url.auth = url.password ? url.username + ":" + url.password : url.username;
                    url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
                    url.href = url.toString();
                    return url;
                  }
                  __name(set, "set");
                  __name2(set, "set");
                  function toString(stringify) {
                    if (!stringify || "function" !== typeof stringify)
                      stringify = qs.stringify;
                    var query, url = this, host = url.host, protocol = url.protocol;
                    if (protocol && protocol.charAt(protocol.length - 1) !== ":")
                      protocol += ":";
                    var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
                    if (url.username) {
                      result += url.username;
                      if (url.password)
                        result += ":" + url.password;
                      result += "@";
                    } else if (url.password) {
                      result += ":" + url.password;
                      result += "@";
                    } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
                      result += "@";
                    }
                    if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
                      host += ":";
                    }
                    result += host + url.pathname;
                    query = "object" === typeof url.query ? stringify(url.query) : url.query;
                    if (query)
                      result += "?" !== query.charAt(0) ? "?" + query : query;
                    if (url.hash)
                      result += url.hash;
                    return result;
                  }
                  __name(toString, "toString");
                  __name2(toString, "toString");
                  Url.prototype = { set, toString };
                  Url.extractProtocol = extractProtocol;
                  Url.location = lolcation;
                  Url.trimLeft = trimLeft;
                  Url.qs = qs;
                  module22.exports = Url;
                }
              });
              var require_url = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/helpers/url.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  var __importDefault = exports4 && exports4.__importDefault || function(mod) {
                    return mod && mod.__esModule ? mod : { "default": mod };
                  };
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.join = exports4.getQueryParams = exports4.withQueryParams = void 0;
                  var ensure_1 = require_ensure();
                  var qs_1 = __importDefault(require_lib());
                  var url_parse_1 = __importDefault(require_url_parse());
                  function withQueryParams(url, params) {
                    if (!params) {
                      return url;
                    }
                    const parsedUrl = (0, url_parse_1.default)(url);
                    const updatedParams = Object.assign({}, qs_1.default.parse(parsedUrl.query, { ignoreQueryPrefix: true }), params);
                    parsedUrl.set("query", qs_1.default.stringify(JSON.parse(JSON.stringify(updatedParams)), { addQueryPrefix: true }));
                    return parsedUrl.toString();
                  }
                  __name(withQueryParams, "withQueryParams");
                  __name2(withQueryParams, "withQueryParams");
                  exports4.withQueryParams = withQueryParams;
                  function getQueryParams(url) {
                    const parsedUrl = (0, url_parse_1.default)(url);
                    return qs_1.default.parse(parsedUrl.query, { ignoreQueryPrefix: true });
                  }
                  __name(getQueryParams, "getQueryParams");
                  __name2(getQueryParams, "getQueryParams");
                  exports4.getQueryParams = getQueryParams;
                  function join(...tokens) {
                    if (!tokens || !tokens.length) {
                      return "";
                    }
                    const combinedTokens = [];
                    for (const token of tokens) {
                      (0, ensure_1.ensureNonEmptyString)(token);
                      if (combinedTokens.length === 0) {
                        combinedTokens.push(token);
                      } else {
                        combinedTokens.push(token.replace(/^\/+/, ""));
                      }
                      if (!token.endsWith("/")) {
                        combinedTokens.push("/");
                      }
                    }
                    const combined = combinedTokens.join("");
                    if (!tokens[tokens.length - 1].endsWith("/")) {
                      return combined.slice(0, combined.length - 1);
                    }
                    return combined;
                  }
                  __name(join, "join");
                  __name2(join, "join");
                  exports4.join = join;
                }
              });
              var require_handler_templates = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/handler_templates.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  var __importDefault = exports4 && exports4.__importDefault || function(mod) {
                    return mod && mod.__esModule ? mod : { "default": mod };
                  };
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.generateObjectResponseHandler = exports4.untransformKeys = exports4.untransformBody = exports4.transformBody = exports4.generateRequestHandler = void 0;
                  var clone_1 = __importDefault(require_clone());
                  var object_utils_1 = require_object_utils();
                  var ensure_1 = require_ensure();
                  var schema_1 = require_schema();
                  var schema_2 = require_schema();
                  var url_1 = require_url();
                  function generateParamMap(keys, nameToValueMap, optionalNames) {
                    const map = {};
                    keys.forEach((key) => {
                      let val = nameToValueMap[key];
                      if (typeof val === "undefined") {
                        if (optionalNames && optionalNames.has(key)) {
                          return;
                        }
                        val = "";
                      }
                      map[key] = val;
                    });
                    return map;
                  }
                  __name(generateParamMap, "generateParamMap");
                  __name2(generateParamMap, "generateParamMap");
                  function generateQueryParamMap(keys, nameToValueMap, optionalNames) {
                    const map = {};
                    keys.forEach((key) => {
                      let val = nameToValueMap[key];
                      if (typeof val === "undefined") {
                        if (optionalNames && optionalNames.has(key)) {
                          return;
                        }
                        val = "";
                      }
                      map[key] = encodeURIComponent(String(val));
                    });
                    return map;
                  }
                  __name(generateQueryParamMap, "generateQueryParamMap");
                  __name2(generateQueryParamMap, "generateQueryParamMap");
                  function formatString(template, params) {
                    let result = template;
                    for (const [key, value] of Object.entries(params)) {
                      result = result.replace(`{${key}}`, value);
                    }
                    return result;
                  }
                  __name(formatString, "formatString");
                  __name2(formatString, "formatString");
                  function generateRequestHandler(request, parameters) {
                    const { url, queryParams, nameMapping: paramNameMapping, bodyTemplate, bodyParams, method, headers, transforms } = request;
                    const indexToNameMap = /* @__PURE__ */ new Map();
                    const names = /* @__PURE__ */ new Set();
                    const optionalNames = /* @__PURE__ */ new Set();
                    parameters.forEach((arg, index) => {
                      const name = paramNameMapping && paramNameMapping[arg.name] || arg.name;
                      if (names.has(name)) {
                        throw new Error(`Duplicate name ${name} detected`);
                      }
                      names.add(name);
                      if (arg.optional) {
                        optionalNames.add(name);
                      }
                      indexToNameMap.set(index, name);
                    });
                    const hasQueryParams = Boolean(queryParams && queryParams.length);
                    const hasBodyParams = Boolean(bodyParams && bodyParams.length);
                    return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function requestHandler(params) {
                      const nameMapping = {};
                      params.forEach((param, index) => {
                        const paramName = (0, ensure_1.ensureExists)(indexToNameMap.get(index));
                        const paramTransform = transforms ? transforms[paramName] : void 0;
                        if (paramTransform) {
                          const transformResult = paramTransform(param);
                          if (transformResult && typeof transformResult === "object") {
                            Object.assign(nameMapping, transformResult);
                          } else {
                            nameMapping[paramName] = transformResult;
                          }
                        } else {
                          nameMapping[paramName] = param;
                        }
                      });
                      const baseUrl = formatString(url, generateQueryParamMap(Object.keys(nameMapping), nameMapping));
                      const fullUrl = hasQueryParams ? (0, url_1.withQueryParams)(baseUrl, generateQueryParamMap((0, ensure_1.ensureExists)(queryParams), nameMapping, optionalNames)) : baseUrl;
                      let body;
                      if (bodyTemplate) {
                        body = (0, clone_1.default)(bodyTemplate);
                      }
                      if (hasBodyParams) {
                        const currentBodyParams = generateParamMap((0, ensure_1.ensureExists)(bodyParams), nameMapping, optionalNames);
                        body = body ? { ...body, ...currentBodyParams } : currentBodyParams;
                      }
                      return {
                        url: fullUrl,
                        method,
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                          ...headers
                        },
                        body: body ? JSON.stringify(body) : void 0
                      };
                    }, "requestHandler"), "requestHandler");
                  }
                  __name(generateRequestHandler, "generateRequestHandler");
                  __name2(generateRequestHandler, "generateRequestHandler");
                  exports4.generateRequestHandler = generateRequestHandler;
                  function mapKeys(obj, schema) {
                    if (!(schema && (0, schema_2.isObject)(schema))) {
                      return obj;
                    }
                    const { properties } = schema;
                    const remappedKeys = /* @__PURE__ */ new Map();
                    for (const key in properties) {
                      if (properties.hasOwnProperty(key) && properties[key].fromKey) {
                        const fromKey = (0, ensure_1.ensureExists)(properties[key].fromKey);
                        remappedKeys.set(fromKey, [...remappedKeys.get(fromKey) || [], key]);
                      }
                    }
                    const remappedObject = {};
                    for (const key in obj) {
                      if (!obj.hasOwnProperty(key)) {
                        continue;
                      }
                      const mappedKeys = remappedKeys.get(key) || [key];
                      for (const newKey of mappedKeys) {
                        if (!schema.properties[newKey] && !schema.includeUnknownProperties) {
                          continue;
                        }
                        remappedObject[newKey] = mappedKeys.length > 1 ? (0, object_utils_1.deepCopy)(obj[key]) : obj[key];
                        const keySchema = schema.properties[newKey];
                        const currentValue = remappedObject[newKey];
                        if (Array.isArray(currentValue) && (0, schema_1.isArray)(keySchema) && (0, schema_2.isObject)(keySchema.items)) {
                          remappedObject[newKey] = currentValue.map((val) => mapKeys(val, keySchema.items));
                        } else if (typeof currentValue === "object" && (0, schema_2.isObject)(keySchema)) {
                          remappedObject[newKey] = mapKeys(currentValue, keySchema);
                        }
                      }
                    }
                    return remappedObject;
                  }
                  __name(mapKeys, "mapKeys");
                  __name2(mapKeys, "mapKeys");
                  function transformBody(body, schema) {
                    if ((0, schema_1.isArray)(schema) && (0, schema_2.isObject)(schema.items)) {
                      const objects = body;
                      const mappedObjs = objects.map((obj) => mapKeys(obj, schema.items));
                      return mappedObjs;
                    }
                    if ((0, schema_2.isObject)(schema)) {
                      return mapKeys(body, schema);
                    }
                    return body;
                  }
                  __name(transformBody, "transformBody");
                  __name2(transformBody, "transformBody");
                  exports4.transformBody = transformBody;
                  function getUnmapKeyLookup(schema) {
                    const remappedKeys = /* @__PURE__ */ new Map();
                    if (!(schema && (0, schema_2.isObject)(schema))) {
                      return remappedKeys;
                    }
                    const { properties } = schema;
                    for (const key in properties) {
                      if (properties.hasOwnProperty(key) && properties[key].fromKey) {
                        const fromKey = (0, ensure_1.ensureExists)(properties[key].fromKey);
                        remappedKeys.set(key, fromKey);
                      }
                    }
                    return remappedKeys;
                  }
                  __name(getUnmapKeyLookup, "getUnmapKeyLookup");
                  __name2(getUnmapKeyLookup, "getUnmapKeyLookup");
                  function unmapKeys(obj, schema) {
                    if (!(schema && (0, schema_2.isObject)(schema))) {
                      return obj;
                    }
                    const remappedKeys = getUnmapKeyLookup(schema);
                    const remappedObject = {};
                    for (const key in obj) {
                      if (!obj.hasOwnProperty(key)) {
                        continue;
                      }
                      const newKey = remappedKeys.get(key) || key;
                      if (!schema.properties[key] && !schema.includeUnknownProperties) {
                        continue;
                      }
                      remappedObject[newKey] = (0, object_utils_1.deepCopy)(obj[key]);
                      const keySchema = schema.properties[key];
                      const currentValue = remappedObject[newKey];
                      if (Array.isArray(currentValue) && (0, schema_1.isArray)(keySchema) && (0, schema_2.isObject)(keySchema.items)) {
                        remappedObject[newKey] = currentValue.map((val) => unmapKeys(val, keySchema.items));
                      } else if (typeof currentValue === "object" && (0, schema_2.isObject)(keySchema)) {
                        remappedObject[newKey] = unmapKeys(currentValue, keySchema);
                      }
                    }
                    return remappedObject;
                  }
                  __name(unmapKeys, "unmapKeys");
                  __name2(unmapKeys, "unmapKeys");
                  function untransformBody(body, schema) {
                    if ((0, schema_1.isArray)(schema) && (0, schema_2.isObject)(schema.items)) {
                      const objectBody = body;
                      const mappedObjs = unmapKeys(objectBody, schema.items);
                      return mappedObjs;
                    }
                    if ((0, schema_2.isObject)(schema)) {
                      return unmapKeys(body, schema);
                    }
                    return body;
                  }
                  __name(untransformBody, "untransformBody");
                  __name2(untransformBody, "untransformBody");
                  exports4.untransformBody = untransformBody;
                  function untransformKeys(keys, schema) {
                    const schemaObject = (0, schema_1.isArray)(schema) && (0, schema_2.isObject)(schema.items) ? schema.items : schema;
                    const remappedKeys = getUnmapKeyLookup(schemaObject);
                    return keys.map((key) => remappedKeys.get(key) || key);
                  }
                  __name(untransformKeys, "untransformKeys");
                  __name2(untransformKeys, "untransformKeys");
                  exports4.untransformKeys = untransformKeys;
                  function generateObjectResponseHandler(response) {
                    const { projectKey } = response;
                    return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function objectResponseHandler(resp) {
                      const { body } = resp;
                      if (typeof body !== "object") {
                        return body;
                      }
                      const projectedBody = projectKey ? body[projectKey] : body;
                      return projectedBody;
                    }, "objectResponseHandler"), "objectResponseHandler");
                  }
                  __name(generateObjectResponseHandler, "generateObjectResponseHandler");
                  __name2(generateObjectResponseHandler, "generateObjectResponseHandler");
                  exports4.generateObjectResponseHandler = generateObjectResponseHandler;
                }
              });
              var require_api = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/api.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.maybeRewriteConnectionForFormula = exports4.makeEmptyFormula = exports4.makeTranslateObjectFormula = exports4.makeDynamicSyncTable = exports4.makeSyncTableLegacy = exports4.makeSyncTable = exports4.makeObjectFormula = exports4.makeSimpleAutocompleteMetadataFormula = exports4.autocompleteSearchObjects = exports4.simpleAutocomplete = exports4.makeMetadataFormula = exports4.normalizePropertyAutocompleteResults = exports4.makeFormula = exports4.makeStringFormula = exports4.makeNumericFormula = exports4.UpdateOutcome = exports4.isSyncPackFormula = exports4.isStringPackFormula = exports4.isObjectPackFormula = exports4.check = exports4.makeUserVisibleError = exports4.makeFileArrayParameter = exports4.makeFileParameter = exports4.makeImageArrayParameter = exports4.makeImageParameter = exports4.makeHtmlArrayParameter = exports4.makeHtmlParameter = exports4.makeDateArrayParameter = exports4.makeDateParameter = exports4.makeBooleanArrayParameter = exports4.makeBooleanParameter = exports4.makeNumericArrayParameter = exports4.makeNumericParameter = exports4.makeStringArrayParameter = exports4.makeStringParameter = exports4.makeParameter = exports4.wrapGetSchema = exports4.wrapMetadataFunction = exports4.isDynamicSyncTable = exports4.isUserVisibleError = exports4.MissingScopesError = exports4.StatusCodeError = exports4.UserVisibleError = void 0;
                  var api_types_1 = require_api_types();
                  var api_types_2 = require_api_types();
                  var api_types_3 = require_api_types();
                  var schema_1 = require_schema();
                  var api_types_4 = require_api_types();
                  var api_types_5 = require_api_types();
                  var object_utils_1 = require_object_utils();
                  var ensure_1 = require_ensure();
                  var api_types_6 = require_api_types();
                  var handler_templates_1 = require_handler_templates();
                  var handler_templates_2 = require_handler_templates();
                  var api_types_7 = require_api_types();
                  var api_types_8 = require_api_types();
                  var object_utils_2 = require_object_utils();
                  var schema_2 = require_schema();
                  var schema_3 = require_schema();
                  var api_types_9 = require_api_types();
                  var migration_1 = require_migration();
                  var api_types_10 = require_api_types();
                  var UserVisibleError = /* @__PURE__ */ __name(class extends Error {
                    /**
                     * Use to construct a user-visible error.
                     */
                    constructor(message, internalError) {
                      super(message);
                      this.isUserVisible = true;
                      this.internalError = internalError;
                    }
                  }, "UserVisibleError");
                  __name2(UserVisibleError, "UserVisibleError");
                  exports4.UserVisibleError = UserVisibleError;
                  var StatusCodeError = /* @__PURE__ */ __name(class extends Error {
                    /** @hidden */
                    constructor(statusCode, body, options, response) {
                      super(`${statusCode} - ${JSON.stringify(body)}`);
                      this.name = "StatusCodeError";
                      this.statusCode = statusCode;
                      this.body = body;
                      this.error = body;
                      this.options = options;
                      let responseBody = response === null || response === void 0 ? void 0 : response.body;
                      if (typeof responseBody === "object") {
                        responseBody = JSON.stringify(responseBody);
                      }
                      this.response = { ...response, body: responseBody };
                    }
                    /** Returns if the error is an instance of StatusCodeError. Note that `instanceof` may not work. */
                    static isStatusCodeError(err) {
                      return "name" in err && err.name === StatusCodeError.name;
                    }
                  }, "StatusCodeError");
                  __name2(StatusCodeError, "StatusCodeError");
                  exports4.StatusCodeError = StatusCodeError;
                  var MissingScopesError = /* @__PURE__ */ __name(class extends Error {
                    /** @hidden */
                    constructor(message) {
                      super(message || "Additional permissions are required");
                      this.name = "MissingScopesError";
                    }
                    /** Returns if the error is an instance of MissingScopesError. Note that `instanceof` may not work. */
                    static isMissingScopesError(err) {
                      return "name" in err && err.name === MissingScopesError.name;
                    }
                  }, "MissingScopesError");
                  __name2(MissingScopesError, "MissingScopesError");
                  exports4.MissingScopesError = MissingScopesError;
                  function isUserVisibleError(error) {
                    return "isUserVisible" in error && error.isUserVisible;
                  }
                  __name(isUserVisibleError, "isUserVisibleError");
                  __name2(isUserVisibleError, "isUserVisibleError");
                  exports4.isUserVisibleError = isUserVisibleError;
                  function isDynamicSyncTable(syncTable) {
                    return "isDynamic" in syncTable;
                  }
                  __name(isDynamicSyncTable, "isDynamicSyncTable");
                  __name2(isDynamicSyncTable, "isDynamicSyncTable");
                  exports4.isDynamicSyncTable = isDynamicSyncTable;
                  function wrapMetadataFunction(fnOrFormula) {
                    return typeof fnOrFormula === "function" ? makeMetadataFormula(fnOrFormula) : fnOrFormula;
                  }
                  __name(wrapMetadataFunction, "wrapMetadataFunction");
                  __name2(wrapMetadataFunction, "wrapMetadataFunction");
                  exports4.wrapMetadataFunction = wrapMetadataFunction;
                  function transformToArraySchema(schema) {
                    if ((schema === null || schema === void 0 ? void 0 : schema.type) === schema_1.ValueType.Array) {
                      return schema;
                    } else {
                      return {
                        type: schema_1.ValueType.Array,
                        items: schema
                      };
                    }
                  }
                  __name(transformToArraySchema, "transformToArraySchema");
                  __name2(transformToArraySchema, "transformToArraySchema");
                  function wrapGetSchema(getSchema) {
                    if (!getSchema) {
                      return;
                    }
                    return {
                      ...getSchema,
                      execute(params, context) {
                        const schema = getSchema.execute(params, context);
                        if ((0, object_utils_2.isPromise)(schema)) {
                          return schema.then((value) => transformToArraySchema(value));
                        } else {
                          return transformToArraySchema(schema);
                        }
                      }
                    };
                  }
                  __name(wrapGetSchema, "wrapGetSchema");
                  __name2(wrapGetSchema, "wrapGetSchema");
                  exports4.wrapGetSchema = wrapGetSchema;
                  function makeParameter2(paramDefinition) {
                    const { type, autocomplete: autocompleteDefOrItems, ...rest } = paramDefinition;
                    const actualType = api_types_2.ParameterTypeInputMap[type];
                    let autocomplete;
                    if (Array.isArray(autocompleteDefOrItems)) {
                      const autocompleteDef = makeSimpleAutocompleteMetadataFormula(autocompleteDefOrItems);
                      autocomplete = wrapMetadataFunction(autocompleteDef);
                    } else {
                      autocomplete = wrapMetadataFunction(autocompleteDefOrItems);
                    }
                    return Object.freeze({ ...rest, autocomplete, type: actualType });
                  }
                  __name(makeParameter2, "makeParameter2");
                  __name2(makeParameter2, "makeParameter");
                  exports4.makeParameter = makeParameter2;
                  function makeStringParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_3.Type.string });
                  }
                  __name(makeStringParameter, "makeStringParameter");
                  __name2(makeStringParameter, "makeStringParameter");
                  exports4.makeStringParameter = makeStringParameter;
                  function makeStringArrayParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_10.stringArray });
                  }
                  __name(makeStringArrayParameter, "makeStringArrayParameter");
                  __name2(makeStringArrayParameter, "makeStringArrayParameter");
                  exports4.makeStringArrayParameter = makeStringArrayParameter;
                  function makeNumericParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_3.Type.number });
                  }
                  __name(makeNumericParameter, "makeNumericParameter");
                  __name2(makeNumericParameter, "makeNumericParameter");
                  exports4.makeNumericParameter = makeNumericParameter;
                  function makeNumericArrayParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_9.numberArray });
                  }
                  __name(makeNumericArrayParameter, "makeNumericArrayParameter");
                  __name2(makeNumericArrayParameter, "makeNumericArrayParameter");
                  exports4.makeNumericArrayParameter = makeNumericArrayParameter;
                  function makeBooleanParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_3.Type.boolean });
                  }
                  __name(makeBooleanParameter, "makeBooleanParameter");
                  __name2(makeBooleanParameter, "makeBooleanParameter");
                  exports4.makeBooleanParameter = makeBooleanParameter;
                  function makeBooleanArrayParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_4.booleanArray });
                  }
                  __name(makeBooleanArrayParameter, "makeBooleanArrayParameter");
                  __name2(makeBooleanArrayParameter, "makeBooleanArrayParameter");
                  exports4.makeBooleanArrayParameter = makeBooleanArrayParameter;
                  function makeDateParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_3.Type.date });
                  }
                  __name(makeDateParameter, "makeDateParameter");
                  __name2(makeDateParameter, "makeDateParameter");
                  exports4.makeDateParameter = makeDateParameter;
                  function makeDateArrayParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_5.dateArray });
                  }
                  __name(makeDateArrayParameter, "makeDateArrayParameter");
                  __name2(makeDateArrayParameter, "makeDateArrayParameter");
                  exports4.makeDateArrayParameter = makeDateArrayParameter;
                  function makeHtmlParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_3.Type.html });
                  }
                  __name(makeHtmlParameter, "makeHtmlParameter");
                  __name2(makeHtmlParameter, "makeHtmlParameter");
                  exports4.makeHtmlParameter = makeHtmlParameter;
                  function makeHtmlArrayParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_7.htmlArray });
                  }
                  __name(makeHtmlArrayParameter, "makeHtmlArrayParameter");
                  __name2(makeHtmlArrayParameter, "makeHtmlArrayParameter");
                  exports4.makeHtmlArrayParameter = makeHtmlArrayParameter;
                  function makeImageParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_3.Type.image });
                  }
                  __name(makeImageParameter, "makeImageParameter");
                  __name2(makeImageParameter, "makeImageParameter");
                  exports4.makeImageParameter = makeImageParameter;
                  function makeImageArrayParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_8.imageArray });
                  }
                  __name(makeImageArrayParameter, "makeImageArrayParameter");
                  __name2(makeImageArrayParameter, "makeImageArrayParameter");
                  exports4.makeImageArrayParameter = makeImageArrayParameter;
                  function makeFileParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_3.Type.file });
                  }
                  __name(makeFileParameter, "makeFileParameter");
                  __name2(makeFileParameter, "makeFileParameter");
                  exports4.makeFileParameter = makeFileParameter;
                  function makeFileArrayParameter(name, description, args = {}) {
                    return Object.freeze({ ...args, name, description, type: api_types_6.fileArray });
                  }
                  __name(makeFileArrayParameter, "makeFileArrayParameter");
                  __name2(makeFileArrayParameter, "makeFileArrayParameter");
                  exports4.makeFileArrayParameter = makeFileArrayParameter;
                  function makeUserVisibleError(msg) {
                    return new UserVisibleError(msg);
                  }
                  __name(makeUserVisibleError, "makeUserVisibleError");
                  __name2(makeUserVisibleError, "makeUserVisibleError");
                  exports4.makeUserVisibleError = makeUserVisibleError;
                  function check(condition, msg) {
                    if (!condition) {
                      throw makeUserVisibleError(msg);
                    }
                  }
                  __name(check, "check");
                  __name2(check, "check");
                  exports4.check = check;
                  function isObjectPackFormula(fn) {
                    return fn.resultType === api_types_3.Type.object;
                  }
                  __name(isObjectPackFormula, "isObjectPackFormula");
                  __name2(isObjectPackFormula, "isObjectPackFormula");
                  exports4.isObjectPackFormula = isObjectPackFormula;
                  function isStringPackFormula(fn) {
                    return fn.resultType === api_types_3.Type.string;
                  }
                  __name(isStringPackFormula, "isStringPackFormula");
                  __name2(isStringPackFormula, "isStringPackFormula");
                  exports4.isStringPackFormula = isStringPackFormula;
                  function isSyncPackFormula(fn) {
                    return Boolean(fn.isSyncFormula);
                  }
                  __name(isSyncPackFormula, "isSyncPackFormula");
                  __name2(isSyncPackFormula, "isSyncPackFormula");
                  exports4.isSyncPackFormula = isSyncPackFormula;
                  var UpdateOutcome;
                  (function(UpdateOutcome2) {
                    UpdateOutcome2["Success"] = "success";
                    UpdateOutcome2["Error"] = "error";
                  })(UpdateOutcome = exports4.UpdateOutcome || (exports4.UpdateOutcome = {}));
                  function makeNumericFormula(definition) {
                    return Object.assign({}, definition, { resultType: api_types_3.Type.number });
                  }
                  __name(makeNumericFormula, "makeNumericFormula");
                  __name2(makeNumericFormula, "makeNumericFormula");
                  exports4.makeNumericFormula = makeNumericFormula;
                  function makeStringFormula(definition) {
                    const { response } = definition;
                    return Object.assign({}, definition, {
                      resultType: api_types_3.Type.string,
                      ...response && { schema: response.schema }
                    });
                  }
                  __name(makeStringFormula, "makeStringFormula");
                  __name2(makeStringFormula, "makeStringFormula");
                  exports4.makeStringFormula = makeStringFormula;
                  function makeFormula(fullDefinition) {
                    let formula;
                    switch (fullDefinition.resultType) {
                      case schema_1.ValueType.String: {
                        const def = {
                          ...fullDefinition,
                          codaType: "codaType" in fullDefinition ? fullDefinition.codaType : void 0,
                          formulaSchema: "schema" in fullDefinition ? fullDefinition.schema : void 0
                        };
                        const { onError: _, resultType: unused, codaType, formulaSchema, ...rest } = def;
                        const stringFormula = {
                          ...rest,
                          resultType: api_types_3.Type.string,
                          schema: formulaSchema || (codaType ? { type: schema_1.ValueType.String, codaType } : void 0)
                        };
                        formula = stringFormula;
                        break;
                      }
                      case schema_1.ValueType.Number: {
                        const def = {
                          ...fullDefinition,
                          codaType: "codaType" in fullDefinition ? fullDefinition.codaType : void 0,
                          formulaSchema: "schema" in fullDefinition ? fullDefinition.schema : void 0
                        };
                        const { onError: _, resultType: unused, codaType, formulaSchema, ...rest } = def;
                        const numericFormula = {
                          ...rest,
                          resultType: api_types_3.Type.number,
                          schema: formulaSchema || (codaType ? { type: schema_1.ValueType.Number, codaType } : void 0)
                        };
                        formula = numericFormula;
                        break;
                      }
                      case schema_1.ValueType.Boolean: {
                        const { onError: _, resultType: unused, ...rest } = fullDefinition;
                        const booleanFormula = {
                          ...rest,
                          resultType: api_types_3.Type.boolean
                        };
                        formula = booleanFormula;
                        break;
                      }
                      case schema_1.ValueType.Array: {
                        const { onError: _, resultType: unused, items, ...rest } = fullDefinition;
                        const arrayFormula = {
                          ...rest,
                          // TypeOf<SchemaType<ArraySchema<SchemaT>>> is always Type.object but TS can't infer this.
                          resultType: api_types_3.Type.object,
                          schema: (0, schema_3.normalizeSchema)({ type: schema_1.ValueType.Array, items })
                        };
                        formula = arrayFormula;
                        break;
                      }
                      case schema_1.ValueType.Object: {
                        const { onError: _, resultType: unused, schema, ...rest } = fullDefinition;
                        const objectFormula = {
                          ...rest,
                          resultType: api_types_3.Type.object,
                          schema: (0, schema_3.normalizeSchema)(schema)
                        };
                        formula = objectFormula;
                        break;
                      }
                      default:
                        return (0, ensure_1.ensureUnreachable)(fullDefinition);
                    }
                    const onError = fullDefinition.onError;
                    if (onError) {
                      const wrappedExecute = formula.execute;
                      formula.execute = async function(params, context) {
                        try {
                          return await wrappedExecute(params, context);
                        } catch (err) {
                          return onError(err);
                        }
                      };
                    }
                    return maybeRewriteConnectionForFormula(formula, fullDefinition.connectionRequirement);
                  }
                  __name(makeFormula, "makeFormula");
                  __name2(makeFormula, "makeFormula");
                  exports4.makeFormula = makeFormula;
                  function normalizePropertyAutocompleteResultsArray(results) {
                    return results.map((r) => {
                      if (typeof r === "object" && Object.keys(r).length === 2 && "display" in r && "value" in r) {
                        return { display: r.display, value: r.value };
                      }
                      return { display: void 0, value: r };
                    });
                  }
                  __name(normalizePropertyAutocompleteResultsArray, "normalizePropertyAutocompleteResultsArray");
                  __name2(normalizePropertyAutocompleteResultsArray, "normalizePropertyAutocompleteResultsArray");
                  function normalizePropertyAutocompleteResults(results) {
                    if (Array.isArray(results)) {
                      return {
                        results: normalizePropertyAutocompleteResultsArray(results)
                      };
                    }
                    const { results: resultsArray, ...otherProps } = results;
                    return {
                      results: normalizePropertyAutocompleteResultsArray(resultsArray),
                      ...otherProps
                    };
                  }
                  __name(normalizePropertyAutocompleteResults, "normalizePropertyAutocompleteResults");
                  __name2(normalizePropertyAutocompleteResults, "normalizePropertyAutocompleteResults");
                  exports4.normalizePropertyAutocompleteResults = normalizePropertyAutocompleteResults;
                  function makeMetadataFormula(execute, options) {
                    return makeObjectFormula({
                      name: "getMetadata",
                      description: "Gets metadata",
                      // Formula context is serialized here because we do not want to pass objects into
                      // regular pack functions (which this is)
                      execute([search, serializedFormulaContext], context) {
                        let formulaContext = {};
                        try {
                          formulaContext = JSON.parse(serializedFormulaContext);
                        } catch (err) {
                        }
                        return execute(context, search, formulaContext);
                      },
                      parameters: [
                        makeStringParameter("search", "Metadata to search for", { optional: true }),
                        makeStringParameter("formulaContext", "Serialized JSON for metadata", { optional: true })
                      ],
                      examples: [],
                      connectionRequirement: (options === null || options === void 0 ? void 0 : options.connectionRequirement) || api_types_1.ConnectionRequirement.Optional
                    });
                  }
                  __name(makeMetadataFormula, "makeMetadataFormula");
                  __name2(makeMetadataFormula, "makeMetadataFormula");
                  exports4.makeMetadataFormula = makeMetadataFormula;
                  function makePropertyAutocompleteFormula(execute, options) {
                    if (!(execute instanceof Function)) {
                      throw new Error(`Value for propertyAutocomplete must be a function`);
                    }
                    return makeObjectFormula({
                      name: "getPropertyAutocompleteMetadata",
                      description: "Gets property autocomplete",
                      execute([], context) {
                        return execute(context);
                      },
                      parameters: [],
                      examples: [],
                      connectionRequirement: (options === null || options === void 0 ? void 0 : options.connectionRequirement) || api_types_1.ConnectionRequirement.Optional
                    });
                  }
                  __name(makePropertyAutocompleteFormula, "makePropertyAutocompleteFormula");
                  __name2(makePropertyAutocompleteFormula, "makePropertyAutocompleteFormula");
                  function simpleAutocomplete(search, options) {
                    const normalizedSearch = (search || "").toLowerCase();
                    const filtered = options.filter((option) => {
                      const display = typeof option === "string" || typeof option === "number" ? option : option.display;
                      return display.toString().toLowerCase().includes(normalizedSearch);
                    });
                    const metadataResults = [];
                    for (const option of filtered) {
                      if (typeof option === "string") {
                        metadataResults.push({
                          value: option,
                          display: option
                        });
                      } else if (typeof option === "number") {
                        metadataResults.push({
                          value: option,
                          display: option.toString()
                        });
                      } else {
                        metadataResults.push(option);
                      }
                    }
                    return Promise.resolve(metadataResults);
                  }
                  __name(simpleAutocomplete, "simpleAutocomplete");
                  __name2(simpleAutocomplete, "simpleAutocomplete");
                  exports4.simpleAutocomplete = simpleAutocomplete;
                  function autocompleteSearchObjects(search, objs, displayKey, valueKey) {
                    if (typeof search !== "string") {
                      throw new TypeError(`Expecting a string for "search" parameter but received ${search}`);
                    }
                    const normalizedSearch = search.toLowerCase();
                    const filtered = objs.filter((o) => o[displayKey].toLowerCase().includes(normalizedSearch));
                    const metadataResults = filtered.map((o) => {
                      return {
                        value: o[valueKey],
                        display: o[displayKey]
                      };
                    });
                    return Promise.resolve(metadataResults);
                  }
                  __name(autocompleteSearchObjects, "autocompleteSearchObjects");
                  __name2(autocompleteSearchObjects, "autocompleteSearchObjects");
                  exports4.autocompleteSearchObjects = autocompleteSearchObjects;
                  function makeSimpleAutocompleteMetadataFormula(options) {
                    return makeMetadataFormula((context, [search]) => simpleAutocomplete(search, options), {
                      // A connection won't be used here, but if the parent formula uses a connection
                      // the execution code is going to try to pass it here. We should fix that.
                      connectionRequirement: api_types_1.ConnectionRequirement.Optional
                    });
                  }
                  __name(makeSimpleAutocompleteMetadataFormula, "makeSimpleAutocompleteMetadataFormula");
                  __name2(makeSimpleAutocompleteMetadataFormula, "makeSimpleAutocompleteMetadataFormula");
                  exports4.makeSimpleAutocompleteMetadataFormula = makeSimpleAutocompleteMetadataFormula;
                  function isResponseHandlerTemplate(obj) {
                    return obj && obj.schema;
                  }
                  __name(isResponseHandlerTemplate, "isResponseHandlerTemplate");
                  __name2(isResponseHandlerTemplate, "isResponseHandlerTemplate");
                  function isResponseExampleTemplate(obj) {
                    return obj && obj.example;
                  }
                  __name(isResponseExampleTemplate, "isResponseExampleTemplate");
                  __name2(isResponseExampleTemplate, "isResponseExampleTemplate");
                  function makeObjectFormula({ response, ...definition }) {
                    let schema;
                    if (response) {
                      if (isResponseHandlerTemplate(response) && response.schema) {
                        response.schema = (0, schema_3.normalizeSchema)(response.schema);
                        schema = response.schema;
                      } else if (isResponseExampleTemplate(response)) {
                      }
                    }
                    let execute = definition.execute;
                    if (isResponseHandlerTemplate(response)) {
                      const { onError } = response;
                      const wrappedExecute = execute;
                      const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)(response);
                      execute = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(async function exec(params, context) {
                        let result;
                        try {
                          result = await wrappedExecute(params, context);
                        } catch (err) {
                          if (onError) {
                            result = onError(err);
                          } else {
                            throw err;
                          }
                        }
                        return responseHandler({ body: result || {}, status: 200, headers: {} });
                      }, "exec"), "exec");
                    }
                    return Object.assign({}, definition, {
                      resultType: api_types_3.Type.object,
                      execute,
                      schema
                    });
                  }
                  __name(makeObjectFormula, "makeObjectFormula");
                  __name2(makeObjectFormula, "makeObjectFormula");
                  exports4.makeObjectFormula = makeObjectFormula;
                  function makeSyncTable({ name, description, identityName, schema: inputSchema, formula, propertyAutocomplete, connectionRequirement, dynamicOptions = {} }) {
                    const { getSchema: getSchemaDef, entityName, defaultAddDynamicColumns } = dynamicOptions;
                    const { execute: wrappedExecute, executeUpdate: wrappedExecuteUpdate, ...definition } = maybeRewriteConnectionForFormula(formula, connectionRequirement);
                    const wrappedAutocomplete = propertyAutocomplete ? makePropertyAutocompleteFormula(propertyAutocomplete) : void 0;
                    const schemaDef = (0, object_utils_1.deepCopy)(inputSchema);
                    if (!identityName) {
                      throw new Error(`Sync table schemas must set an identityName`);
                    }
                    if (schemaDef.identity) {
                      if (schemaDef.identity.name && schemaDef.identity.name !== identityName) {
                        throw new Error(`Identity name mismatch for sync table ${name}. Either remove the schema's identity.name (${schemaDef.identity.name}) or ensure it matches the table's identityName (${identityName}).`);
                      }
                      schemaDef.identity = { ...schemaDef.identity, name: identityName };
                    } else {
                      schemaDef.identity = { name: identityName };
                    }
                    const getSchema = wrapGetSchema(wrapMetadataFunction(getSchemaDef));
                    const schema = (0, schema_2.makeObjectSchema)(schemaDef);
                    const formulaSchema = getSchema ? void 0 : (0, schema_3.normalizeSchema)({ type: schema_1.ValueType.Array, items: schema });
                    const { identity, id, primary } = (0, migration_1.objectSchemaHelper)(schema);
                    if (!(primary && id)) {
                      throw new Error(`Sync table schemas should have defined properties for idProperty and displayProperty`);
                    }
                    if (!identity) {
                      throw new Error(`Unknown error creating sync table identity`);
                    }
                    if (name.includes(" ")) {
                      throw new Error("Sync table name should not include spaces");
                    }
                    const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)({ schema: formulaSchema });
                    const execute = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(async function exec(params, context) {
                      const { result, continuation } = await wrappedExecute(params, context) || {};
                      const appliedSchema = context.sync.schema;
                      return {
                        result: responseHandler({ body: result || [], status: 200, headers: {} }, appliedSchema),
                        continuation
                      };
                    }, "exec"), "exec");
                    const executeUpdate = wrappedExecuteUpdate ? /* @__PURE__ */ __name2(/* @__PURE__ */ __name(async function execUpdate(params, updates, context) {
                      const { result } = await wrappedExecuteUpdate(params, updates, context) || {};
                      const appliedSchema = context.sync.schema;
                      return {
                        result: responseHandler({ body: result || [], status: 200, headers: {} }, appliedSchema)
                      };
                    }, "execUpdate"), "execUpdate") : void 0;
                    return {
                      name,
                      description,
                      schema: (0, schema_3.normalizeSchema)(schema),
                      identityName,
                      getter: {
                        ...definition,
                        cacheTtlSecs: 0,
                        execute,
                        executeUpdate,
                        schema: formulaSchema,
                        isSyncFormula: true,
                        supportsUpdates: Boolean(executeUpdate),
                        connectionRequirement: definition.connectionRequirement || connectionRequirement,
                        resultType: api_types_3.Type.object
                      },
                      propertyAutocomplete: maybeRewriteConnectionForFormula(wrappedAutocomplete, connectionRequirement),
                      getSchema: maybeRewriteConnectionForFormula(getSchema, connectionRequirement),
                      entityName,
                      defaultAddDynamicColumns
                    };
                  }
                  __name(makeSyncTable, "makeSyncTable");
                  __name2(makeSyncTable, "makeSyncTable");
                  exports4.makeSyncTable = makeSyncTable;
                  function makeSyncTableLegacy(name, schema, formula, connectionRequirement, dynamicOptions = {}) {
                    var _a;
                    if (!((_a = schema.identity) === null || _a === void 0 ? void 0 : _a.name)) {
                      throw new Error("Legacy sync tables must specify identity.name");
                    }
                    if (schema.__packId) {
                      throw new Error("Do not use the __packId field, it is only for internal Coda use.");
                    }
                    return makeSyncTable({
                      name,
                      identityName: schema.identity.name,
                      schema,
                      formula,
                      connectionRequirement,
                      dynamicOptions
                    });
                  }
                  __name(makeSyncTableLegacy, "makeSyncTableLegacy");
                  __name2(makeSyncTableLegacy, "makeSyncTableLegacy");
                  exports4.makeSyncTableLegacy = makeSyncTableLegacy;
                  function makeDynamicSyncTable({ name, description, getName: getNameDef, getSchema: getSchemaDef, identityName, getDisplayUrl: getDisplayUrlDef, formula, listDynamicUrls: listDynamicUrlsDef, searchDynamicUrls: searchDynamicUrlsDef, entityName, connectionRequirement, defaultAddDynamicColumns, placeholderSchema: placeholderSchemaInput, propertyAutocomplete }) {
                    const placeholderSchema = placeholderSchemaInput || // default placeholder only shows a column of id, which will be replaced later by the dynamic schema.
                    (0, schema_2.makeObjectSchema)({
                      type: schema_1.ValueType.Object,
                      idProperty: "id",
                      displayProperty: "id",
                      identity: { name: identityName },
                      properties: {
                        id: { type: schema_1.ValueType.String }
                      }
                    });
                    const getName = wrapMetadataFunction(getNameDef);
                    const getSchema = wrapMetadataFunction(getSchemaDef);
                    const getDisplayUrl = wrapMetadataFunction(getDisplayUrlDef);
                    const listDynamicUrls = wrapMetadataFunction(listDynamicUrlsDef);
                    const searchDynamicUrls = wrapMetadataFunction(searchDynamicUrlsDef);
                    const table = makeSyncTable({
                      name,
                      description,
                      identityName,
                      schema: placeholderSchema,
                      formula,
                      connectionRequirement,
                      dynamicOptions: { getSchema, entityName, defaultAddDynamicColumns },
                      propertyAutocomplete
                    });
                    return {
                      ...table,
                      isDynamic: true,
                      getDisplayUrl: maybeRewriteConnectionForFormula(getDisplayUrl, connectionRequirement),
                      listDynamicUrls: maybeRewriteConnectionForFormula(listDynamicUrls, connectionRequirement),
                      searchDynamicUrls: maybeRewriteConnectionForFormula(searchDynamicUrls, connectionRequirement),
                      getName: maybeRewriteConnectionForFormula(getName, connectionRequirement)
                    };
                  }
                  __name(makeDynamicSyncTable, "makeDynamicSyncTable");
                  __name2(makeDynamicSyncTable, "makeDynamicSyncTable");
                  exports4.makeDynamicSyncTable = makeDynamicSyncTable;
                  function makeTranslateObjectFormula({ response, ...definition }) {
                    const { request, ...rest } = definition;
                    const { parameters } = rest;
                    response.schema = response.schema ? (0, schema_3.normalizeSchema)(response.schema) : void 0;
                    const { onError } = response;
                    const requestHandler = (0, handler_templates_2.generateRequestHandler)(request, parameters);
                    const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)(response);
                    function execute(params, context) {
                      return context.fetcher.fetch(requestHandler(params)).catch((err) => {
                        if (onError) {
                          return onError(err);
                        }
                        throw err;
                      }).then(responseHandler);
                    }
                    __name(execute, "execute");
                    __name2(execute, "execute");
                    return Object.assign({}, rest, {
                      execute,
                      resultType: api_types_3.Type.object,
                      schema: response.schema
                    });
                  }
                  __name(makeTranslateObjectFormula, "makeTranslateObjectFormula");
                  __name2(makeTranslateObjectFormula, "makeTranslateObjectFormula");
                  exports4.makeTranslateObjectFormula = makeTranslateObjectFormula;
                  function makeEmptyFormula(definition) {
                    const { request, ...rest } = definition;
                    const { parameters } = rest;
                    const requestHandler = (0, handler_templates_2.generateRequestHandler)(request, parameters);
                    function execute(params, context) {
                      return context.fetcher.fetch(requestHandler(params)).then(() => "");
                    }
                    __name(execute, "execute");
                    __name2(execute, "execute");
                    return Object.assign({}, rest, {
                      execute,
                      resultType: api_types_3.Type.string
                    });
                  }
                  __name(makeEmptyFormula, "makeEmptyFormula");
                  __name2(makeEmptyFormula, "makeEmptyFormula");
                  exports4.makeEmptyFormula = makeEmptyFormula;
                  function maybeRewriteConnectionForFormula(formula, connectionRequirement) {
                    var _a;
                    if (formula && connectionRequirement) {
                      return {
                        ...formula,
                        parameters: formula.parameters.map((param) => {
                          return {
                            ...param,
                            autocomplete: param.autocomplete ? maybeRewriteConnectionForFormula(param.autocomplete, connectionRequirement) : void 0
                          };
                        }),
                        varargParameters: (_a = formula.varargParameters) === null || _a === void 0 ? void 0 : _a.map((param) => {
                          return {
                            ...param,
                            autocomplete: param.autocomplete ? maybeRewriteConnectionForFormula(param.autocomplete, connectionRequirement) : void 0
                          };
                        }),
                        connectionRequirement
                      };
                    }
                    return formula;
                  }
                  __name(maybeRewriteConnectionForFormula, "maybeRewriteConnectionForFormula");
                  __name2(maybeRewriteConnectionForFormula, "maybeRewriteConnectionForFormula");
                  exports4.maybeRewriteConnectionForFormula = maybeRewriteConnectionForFormula;
                }
              });
              var require_builder = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/builder.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.PackDefinitionBuilder = exports4.newPack = void 0;
                  var types_1 = require_types();
                  var api_types_1 = require_api_types();
                  var api_1 = require_api();
                  var api_2 = require_api();
                  var api_3 = require_api();
                  var api_4 = require_api();
                  var api_5 = require_api();
                  var migration_1 = require_migration();
                  var api_6 = require_api();
                  function newPack2(definition) {
                    return new PackDefinitionBuilder(definition);
                  }
                  __name(newPack2, "newPack2");
                  __name2(newPack2, "newPack");
                  exports4.newPack = newPack2;
                  var PackDefinitionBuilder = /* @__PURE__ */ __name(class {
                    /**
                     * Constructs a {@link PackDefinitionBuilder}. However, `coda.newPack()` should be used instead
                     * rather than constructing a builder directly.
                     */
                    constructor(definition) {
                      const { formulas, formats, syncTables, networkDomains, defaultAuthentication, systemConnectionAuthentication, version, formulaNamespace } = definition || {};
                      this.formulas = formulas || [];
                      this.formats = formats || [];
                      this.syncTables = syncTables || [];
                      this.networkDomains = networkDomains || [];
                      this.defaultAuthentication = defaultAuthentication;
                      this.systemConnectionAuthentication = systemConnectionAuthentication;
                      this.version = version;
                      this.formulaNamespace = formulaNamespace || "Deprecated";
                    }
                    /**
                     * Adds a formula definition to this pack.
                     *
                     * In the web editor, the `/Formula` shortcut will insert a snippet of a skeleton formula.
                     *
                     * @example
                     * ```
                     * pack.addFormula({
                     *   resultType: ValueType.String,
                     *    name: 'MyFormula',
                     *    description: 'My description.',
                     *    parameters: [
                     *      makeParameter({
                     *        type: ParameterType.String,
                     *        name: 'myParam',
                     *        description: 'My param description.',
                     *      }),
                     *    ],
                     *    execute: async ([param]) => {
                     *      return `Hello ${param}`;
                     *    },
                     * });
                     * ```
                     */
                    addFormula(definition) {
                      const formula = (0, api_3.makeFormula)({
                        ...definition,
                        connectionRequirement: definition.connectionRequirement || this._defaultConnectionRequirement
                      });
                      this.formulas.push(formula);
                      return this;
                    }
                    /**
                     * Adds a sync table definition to this pack.
                     *
                     * In the web editor, the `/SyncTable` shortcut will insert a snippet of a skeleton sync table.
                     *
                     * @example
                     * ```
                     * pack.addSyncTable({
                     *   name: 'MySyncTable',
                     *   identityName: 'EntityName',
                     *   schema: coda.makeObjectSchema({
                     *     ...
                     *   }),
                     *   formula: {
                     *     ...
                     *   },
                     * });
                     * ```
                     */
                    addSyncTable({ name, description, identityName, schema, formula, connectionRequirement, propertyAutocomplete, dynamicOptions = {} }) {
                      const connectionRequirementToUse = connectionRequirement || this._defaultConnectionRequirement;
                      const syncTable = (0, api_4.makeSyncTable)({
                        name,
                        description,
                        identityName,
                        schema,
                        formula,
                        connectionRequirement: connectionRequirementToUse,
                        propertyAutocomplete,
                        dynamicOptions
                      });
                      this.syncTables.push(syncTable);
                      return this;
                    }
                    /**
                     * Adds a dynamic sync table definition to this pack.
                     *
                     * In the web editor, the `/DynamicSyncTable` shortcut will insert a snippet of a skeleton sync table.
                     *
                     * @example
                     * ```
                     * pack.addDynamicSyncTable({
                     *   name: "MySyncTable",
                     *   getName: async funciton (context) => {
                     *     const response = await context.fetcher.fetch({method: "GET", url: context.sync.dynamicUrl});
                     *     return response.body.name;
                     *   },
                     *   getName: async function (context) => {
                     *     const response = await context.fetcher.fetch({method: "GET", url: context.sync.dynamicUrl});
                     *     return response.body.browserLink;
                     *   },
                     *   ...
                     * });
                     * ```
                     */
                    addDynamicSyncTable(definition) {
                      const dynamicSyncTable = (0, api_2.makeDynamicSyncTable)({
                        ...definition,
                        connectionRequirement: definition.connectionRequirement || this._defaultConnectionRequirement
                      });
                      this.syncTables.push(dynamicSyncTable);
                      return this;
                    }
                    /**
                     * Adds a column format definition to this pack.
                     *
                     * In the web editor, the `/ColumnFormat` shortcut will insert a snippet of a skeleton format.
                     *
                     * @example
                     * ```
                     * pack.addColumnFormat({
                     *   name: 'MyColumn',
                     *   formulaName: 'MyFormula',
                     * });
                     * ```
                     */
                    addColumnFormat(format) {
                      this.formats.push(format);
                      return this;
                    }
                    /**
                     * Sets this pack to use authentication for individual users, using the
                     * authentication method is the given definition.
                     *
                     * Each user will need to register an account in order to use this pack.
                     *
                     * In the web editor, the `/UserAuthentication` shortcut will insert a snippet of a skeleton
                     * authentication definition.
                     *
                     * By default, this will set a default connection (account) requirement, making a user account
                     * required to invoke all formulas in this pack unless you specify differently on a particular
                     * formula. To change the default, you can pass a `defaultConnectionRequirement` option into
                     * this method.
                     *
                     * @example
                     * ```
                     * pack.setUserAuthentication({
                     *   type: AuthenticationType.HeaderBearerToken,
                     * });
                     * ```
                     */
                    setUserAuthentication(authDef) {
                      const { defaultConnectionRequirement = api_types_1.ConnectionRequirement.Required, ...authentication } = authDef;
                      if (authentication.type === types_1.AuthenticationType.None || authentication.type === types_1.AuthenticationType.Various) {
                        this.defaultAuthentication = authentication;
                      } else {
                        const { getConnectionName: getConnectionNameDef, getConnectionUserId: getConnectionUserIdDef, postSetup: postSetupDef, ...rest } = authentication;
                        const getConnectionName = (0, api_6.wrapMetadataFunction)(getConnectionNameDef);
                        const getConnectionUserId = (0, api_6.wrapMetadataFunction)(getConnectionUserIdDef);
                        const postSetup = postSetupDef === null || postSetupDef === void 0 ? void 0 : postSetupDef.map((step) => {
                          return { ...step, getOptions: (0, api_6.wrapMetadataFunction)((0, migration_1.setEndpointDefHelper)(step).getOptions) };
                        });
                        this.defaultAuthentication = { ...rest, getConnectionName, getConnectionUserId, postSetup };
                      }
                      if (authentication.type !== types_1.AuthenticationType.None) {
                        this._setDefaultConnectionRequirement(defaultConnectionRequirement);
                      }
                      return this;
                    }
                    /**
                     * Sets this pack to use authentication provided by you as the maker of this pack.
                     *
                     * You will need to register credentials to use with this pack. When users use the
                     * pack, their requests will be authenticated with those system credentials, they need
                     * not register their own account.
                     *
                     * In the web editor, the `/SystemAuthentication` shortcut will insert a snippet of a skeleton
                     * authentication definition.
                     *
                     * @example
                     * ```
                     * pack.setSystemAuthentication({
                     *   type: AuthenticationType.HeaderBearerToken,
                     * });
                     * ```
                     */
                    setSystemAuthentication(systemAuthentication) {
                      const { getConnectionName: getConnectionNameDef, getConnectionUserId: getConnectionUserIdDef, postSetup: postSetupDef, ...rest } = systemAuthentication;
                      const getConnectionName = (0, api_6.wrapMetadataFunction)(getConnectionNameDef);
                      const getConnectionUserId = (0, api_6.wrapMetadataFunction)(getConnectionUserIdDef);
                      const postSetup = postSetupDef === null || postSetupDef === void 0 ? void 0 : postSetupDef.map((step) => {
                        return { ...step, getOptions: (0, api_6.wrapMetadataFunction)((0, migration_1.setEndpointDefHelper)(step).getOptions) };
                      });
                      this.systemConnectionAuthentication = {
                        ...rest,
                        getConnectionName,
                        getConnectionUserId,
                        postSetup
                      };
                      return this;
                    }
                    /**
                     * Adds the domain that this pack makes HTTP requests to.
                     * For example, if your pack makes HTTP requests to "api.example.com",
                     * use "example.com" as your network domain.
                     *
                     * If your pack make HTTP requests, it must declare a network domain,
                     * for security purposes. Coda enforces that your pack cannot make requests to
                     * any undeclared domains.
                     *
                     * You are allowed one network domain per pack by default. If your pack needs
                     * to connect to multiple domains, contact Coda Support for approval.
                     *
                     * @example
                     * ```
                     * pack.addNetworkDomain('example.com');
                     * ```
                     */
                    addNetworkDomain(...domain) {
                      this.networkDomains.push(...domain);
                      return this;
                    }
                    /**
                     * Sets the semantic version of this pack version, e.g. `'1.2.3'`.
                     *
                     * This is optional, and you only need to provide a version if you are manually doing
                     * semantic versioning, or using the CLI. If using the web editor, you can omit this
                     * and the web editor will automatically provide an appropriate semantic version
                     * each time you build a version.
                     *
                     * @example
                     * ```
                     * pack.setVersion('1.2.3');
                     * ```
                     */
                    setVersion(version) {
                      this.version = version;
                      return this;
                    }
                    _setDefaultConnectionRequirement(connectionRequirement) {
                      this._defaultConnectionRequirement = connectionRequirement;
                      this.formulas = this.formulas.map((formula) => {
                        return formula.connectionRequirement ? formula : (0, api_5.maybeRewriteConnectionForFormula)(formula, connectionRequirement);
                      });
                      this.syncTables = this.syncTables.map((syncTable) => {
                        if (syncTable.getter.connectionRequirement) {
                          return syncTable;
                        } else if ((0, api_1.isDynamicSyncTable)(syncTable)) {
                          return {
                            ...syncTable,
                            getter: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getter, connectionRequirement),
                            // These 4 are metadata formulas, so they use ConnectionRequirement.Required
                            // by default if you don't specify a connection requirement (a legacy behavior
                            // that is confusing and perhaps undesirable now that we have better builders).
                            // We don't know if the maker set Required explicitly or if was just the default,
                            // so we don't know if we should overwrite the connection requirement. For lack
                            // of a better option, we'll override it here regardless. This ensure that these
                            // dynamic sync table metadata formulas have the same connetion requirement as the
                            // sync table itself, which seems desirable basically 100% of the time and should
                            // always work, but it does give rise to confusing behavior that calling
                            // setDefaultConnectionRequirement() can wipe away an explicit connection
                            // requirement override set on one of these 4 metadata formulas.
                            getName: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getName, connectionRequirement),
                            getDisplayUrl: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getDisplayUrl, connectionRequirement),
                            getSchema: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getSchema, connectionRequirement),
                            listDynamicUrls: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.listDynamicUrls, connectionRequirement),
                            searchDynamicUrls: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.searchDynamicUrls, connectionRequirement),
                            propertyAutocomplete: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.propertyAutocomplete, connectionRequirement)
                          };
                        } else {
                          return {
                            ...syncTable,
                            getter: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getter, connectionRequirement),
                            propertyAutocomplete: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.propertyAutocomplete, connectionRequirement),
                            getSchema: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getSchema, connectionRequirement)
                          };
                        }
                      });
                      return this;
                    }
                  }, "PackDefinitionBuilder");
                  __name2(PackDefinitionBuilder, "PackDefinitionBuilder");
                  exports4.PackDefinitionBuilder = PackDefinitionBuilder;
                }
              });
              var require_schema2 = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/helpers/schema.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.getEffectivePropertyKeysFromSchema = void 0;
                  var schema_1 = require_schema();
                  function getEffectivePropertyKeysFromSchema(schema) {
                    if (schema.type === schema_1.ValueType.Array) {
                      schema = schema.items;
                    }
                    if (schema.type !== schema_1.ValueType.Object) {
                      return;
                    }
                    return [...new Set(Object.entries(schema.properties).map(([key, property]) => property.fromKey || key))];
                  }
                  __name(getEffectivePropertyKeysFromSchema, "getEffectivePropertyKeysFromSchema");
                  __name2(getEffectivePropertyKeysFromSchema, "getEffectivePropertyKeysFromSchema");
                  exports4.getEffectivePropertyKeysFromSchema = getEffectivePropertyKeysFromSchema;
                }
              });
              var require_svg = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/helpers/svg.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.SvgConstants = void 0;
                  var SvgConstants;
                  (function(SvgConstants2) {
                    SvgConstants2.DarkModeFragmentId = "DarkMode";
                    SvgConstants2.DataUrlPrefix = "data:image/svg+xml;base64,";
                    SvgConstants2.DataUrlPrefixWithDarkModeSupport = "data:image/svg+xml;supportsDarkMode=1;base64,";
                  })(SvgConstants = exports4.SvgConstants || (exports4.SvgConstants = {}));
                }
              });
              var require_dist = __commonJS2({
                "node_modules/@codahq/packs-sdk/dist/index.js"(exports4) {
                  "use strict";
                  init_crypto_shim2();
                  Object.defineProperty(exports4, "__esModule", { value: true });
                  exports4.ValidFetchMethods = exports4.withIdentity = exports4.makeSchema = exports4.makeReferenceSchemaFromObjectSchema = exports4.makeObjectSchema = exports4.makeAttributionNode = exports4.generateSchema = exports4.ValueType = exports4.ValueHintType = exports4.ScaleIconSet = exports4.PropertyLabelValueTemplate = exports4.LinkDisplayType = exports4.ImageOutline = exports4.ImageCornerStyle = exports4.EmailDisplayType = exports4.DurationUnit = exports4.CurrencyFormat = exports4.AttributionNodeType = exports4.ensureUnreachable = exports4.ensureNonEmptyString = exports4.ensureExists = exports4.assertCondition = exports4.SvgConstants = exports4.getEffectivePropertyKeysFromSchema = exports4.withQueryParams = exports4.joinUrl = exports4.getQueryParams = exports4.simpleAutocomplete = exports4.makeSimpleAutocompleteMetadataFormula = exports4.autocompleteSearchObjects = exports4.makeParameter = exports4.makeTranslateObjectFormula = exports4.makeSyncTable = exports4.makeFormula = exports4.makeEmptyFormula = exports4.makeDynamicSyncTable = exports4.makeMetadataFormula = exports4.UserVisibleError = exports4.Type = exports4.MissingScopesError = exports4.StatusCodeError = exports4.PrecannedDateRange = exports4.ParameterType = exports4.NetworkConnection = exports4.UpdateOutcome = exports4.ConnectionRequirement = exports4.PackDefinitionBuilder = exports4.newPack = exports4.PostSetupType = exports4.AuthenticationType = void 0;
                  exports4.TokenExchangeCredentialsLocation = void 0;
                  var types_1 = require_types();
                  Object.defineProperty(exports4, "AuthenticationType", { enumerable: true, get: function() {
                    return types_1.AuthenticationType;
                  } });
                  var types_2 = require_types();
                  Object.defineProperty(exports4, "PostSetupType", { enumerable: true, get: function() {
                    return types_2.PostSetupType;
                  } });
                  var builder_1 = require_builder();
                  Object.defineProperty(exports4, "newPack", { enumerable: true, get: function() {
                    return builder_1.newPack;
                  } });
                  var builder_2 = require_builder();
                  Object.defineProperty(exports4, "PackDefinitionBuilder", { enumerable: true, get: function() {
                    return builder_2.PackDefinitionBuilder;
                  } });
                  var api_types_1 = require_api_types();
                  Object.defineProperty(exports4, "ConnectionRequirement", { enumerable: true, get: function() {
                    return api_types_1.ConnectionRequirement;
                  } });
                  var api_1 = require_api();
                  Object.defineProperty(exports4, "UpdateOutcome", { enumerable: true, get: function() {
                    return api_1.UpdateOutcome;
                  } });
                  var api_types_2 = require_api_types();
                  Object.defineProperty(exports4, "NetworkConnection", { enumerable: true, get: function() {
                    return api_types_2.NetworkConnection;
                  } });
                  var api_types_3 = require_api_types();
                  Object.defineProperty(exports4, "ParameterType", { enumerable: true, get: function() {
                    return api_types_3.ParameterType;
                  } });
                  var api_types_4 = require_api_types();
                  Object.defineProperty(exports4, "PrecannedDateRange", { enumerable: true, get: function() {
                    return api_types_4.PrecannedDateRange;
                  } });
                  var api_2 = require_api();
                  Object.defineProperty(exports4, "StatusCodeError", { enumerable: true, get: function() {
                    return api_2.StatusCodeError;
                  } });
                  var api_3 = require_api();
                  Object.defineProperty(exports4, "MissingScopesError", { enumerable: true, get: function() {
                    return api_3.MissingScopesError;
                  } });
                  var api_types_5 = require_api_types();
                  Object.defineProperty(exports4, "Type", { enumerable: true, get: function() {
                    return api_types_5.Type;
                  } });
                  var api_4 = require_api();
                  Object.defineProperty(exports4, "UserVisibleError", { enumerable: true, get: function() {
                    return api_4.UserVisibleError;
                  } });
                  var api_5 = require_api();
                  Object.defineProperty(exports4, "makeMetadataFormula", { enumerable: true, get: function() {
                    return api_5.makeMetadataFormula;
                  } });
                  var api_6 = require_api();
                  Object.defineProperty(exports4, "makeDynamicSyncTable", { enumerable: true, get: function() {
                    return api_6.makeDynamicSyncTable;
                  } });
                  var api_7 = require_api();
                  Object.defineProperty(exports4, "makeEmptyFormula", { enumerable: true, get: function() {
                    return api_7.makeEmptyFormula;
                  } });
                  var api_8 = require_api();
                  Object.defineProperty(exports4, "makeFormula", { enumerable: true, get: function() {
                    return api_8.makeFormula;
                  } });
                  var api_9 = require_api();
                  Object.defineProperty(exports4, "makeSyncTable", { enumerable: true, get: function() {
                    return api_9.makeSyncTable;
                  } });
                  var api_10 = require_api();
                  Object.defineProperty(exports4, "makeTranslateObjectFormula", { enumerable: true, get: function() {
                    return api_10.makeTranslateObjectFormula;
                  } });
                  var api_11 = require_api();
                  Object.defineProperty(exports4, "makeParameter", { enumerable: true, get: function() {
                    return api_11.makeParameter;
                  } });
                  var api_12 = require_api();
                  Object.defineProperty(exports4, "autocompleteSearchObjects", { enumerable: true, get: function() {
                    return api_12.autocompleteSearchObjects;
                  } });
                  var api_13 = require_api();
                  Object.defineProperty(exports4, "makeSimpleAutocompleteMetadataFormula", { enumerable: true, get: function() {
                    return api_13.makeSimpleAutocompleteMetadataFormula;
                  } });
                  var api_14 = require_api();
                  Object.defineProperty(exports4, "simpleAutocomplete", { enumerable: true, get: function() {
                    return api_14.simpleAutocomplete;
                  } });
                  var url_1 = require_url();
                  Object.defineProperty(exports4, "getQueryParams", { enumerable: true, get: function() {
                    return url_1.getQueryParams;
                  } });
                  var url_2 = require_url();
                  Object.defineProperty(exports4, "joinUrl", { enumerable: true, get: function() {
                    return url_2.join;
                  } });
                  var url_3 = require_url();
                  Object.defineProperty(exports4, "withQueryParams", { enumerable: true, get: function() {
                    return url_3.withQueryParams;
                  } });
                  var schema_1 = require_schema2();
                  Object.defineProperty(exports4, "getEffectivePropertyKeysFromSchema", { enumerable: true, get: function() {
                    return schema_1.getEffectivePropertyKeysFromSchema;
                  } });
                  var svg_1 = require_svg();
                  Object.defineProperty(exports4, "SvgConstants", { enumerable: true, get: function() {
                    return svg_1.SvgConstants;
                  } });
                  var ensure_1 = require_ensure();
                  Object.defineProperty(exports4, "assertCondition", { enumerable: true, get: function() {
                    return ensure_1.assertCondition;
                  } });
                  var ensure_2 = require_ensure();
                  Object.defineProperty(exports4, "ensureExists", { enumerable: true, get: function() {
                    return ensure_2.ensureExists;
                  } });
                  var ensure_3 = require_ensure();
                  Object.defineProperty(exports4, "ensureNonEmptyString", { enumerable: true, get: function() {
                    return ensure_3.ensureNonEmptyString;
                  } });
                  var ensure_4 = require_ensure();
                  Object.defineProperty(exports4, "ensureUnreachable", { enumerable: true, get: function() {
                    return ensure_4.ensureUnreachable;
                  } });
                  var schema_2 = require_schema();
                  Object.defineProperty(exports4, "AttributionNodeType", { enumerable: true, get: function() {
                    return schema_2.AttributionNodeType;
                  } });
                  var schema_3 = require_schema();
                  Object.defineProperty(exports4, "CurrencyFormat", { enumerable: true, get: function() {
                    return schema_3.CurrencyFormat;
                  } });
                  var schema_4 = require_schema();
                  Object.defineProperty(exports4, "DurationUnit", { enumerable: true, get: function() {
                    return schema_4.DurationUnit;
                  } });
                  var schema_5 = require_schema();
                  Object.defineProperty(exports4, "EmailDisplayType", { enumerable: true, get: function() {
                    return schema_5.EmailDisplayType;
                  } });
                  var schema_6 = require_schema();
                  Object.defineProperty(exports4, "ImageCornerStyle", { enumerable: true, get: function() {
                    return schema_6.ImageCornerStyle;
                  } });
                  var schema_7 = require_schema();
                  Object.defineProperty(exports4, "ImageOutline", { enumerable: true, get: function() {
                    return schema_7.ImageOutline;
                  } });
                  var schema_8 = require_schema();
                  Object.defineProperty(exports4, "LinkDisplayType", { enumerable: true, get: function() {
                    return schema_8.LinkDisplayType;
                  } });
                  var schema_9 = require_schema();
                  Object.defineProperty(exports4, "PropertyLabelValueTemplate", { enumerable: true, get: function() {
                    return schema_9.PropertyLabelValueTemplate;
                  } });
                  var schema_10 = require_schema();
                  Object.defineProperty(exports4, "ScaleIconSet", { enumerable: true, get: function() {
                    return schema_10.ScaleIconSet;
                  } });
                  var schema_11 = require_schema();
                  Object.defineProperty(exports4, "ValueHintType", { enumerable: true, get: function() {
                    return schema_11.ValueHintType;
                  } });
                  var schema_12 = require_schema();
                  Object.defineProperty(exports4, "ValueType", { enumerable: true, get: function() {
                    return schema_12.ValueType;
                  } });
                  var schema_13 = require_schema();
                  Object.defineProperty(exports4, "generateSchema", { enumerable: true, get: function() {
                    return schema_13.generateSchema;
                  } });
                  var schema_14 = require_schema();
                  Object.defineProperty(exports4, "makeAttributionNode", { enumerable: true, get: function() {
                    return schema_14.makeAttributionNode;
                  } });
                  var schema_15 = require_schema();
                  Object.defineProperty(exports4, "makeObjectSchema", { enumerable: true, get: function() {
                    return schema_15.makeObjectSchema;
                  } });
                  var schema_16 = require_schema();
                  Object.defineProperty(exports4, "makeReferenceSchemaFromObjectSchema", { enumerable: true, get: function() {
                    return schema_16.makeReferenceSchemaFromObjectSchema;
                  } });
                  var schema_17 = require_schema();
                  Object.defineProperty(exports4, "makeSchema", { enumerable: true, get: function() {
                    return schema_17.makeSchema;
                  } });
                  var schema_18 = require_schema();
                  Object.defineProperty(exports4, "withIdentity", { enumerable: true, get: function() {
                    return schema_18.withIdentity;
                  } });
                  var api_types_6 = require_api_types();
                  Object.defineProperty(exports4, "ValidFetchMethods", { enumerable: true, get: function() {
                    return api_types_6.ValidFetchMethods;
                  } });
                  var types_3 = require_types();
                  Object.defineProperty(exports4, "TokenExchangeCredentialsLocation", { enumerable: true, get: function() {
                    return types_3.TokenExchangeCredentialsLocation;
                  } });
                }
              });
              var pack_exports = {};
              __export(pack_exports, {
                pack: () => pack
              });
              module3.exports = __toCommonJS(pack_exports);
              init_crypto_shim2();
              var coda = __toESM(require_dist());
              var pack = coda.newPack();
              pack.addNetworkDomain("https://cobudget.com/api");
              var bucketQuery = `
    query Buckets($groupSlug: String, $roundSlug: String!, $offset: Int, $limit: Int, $status: [StatusType!]) {
        bucketsPage(
        groupSlug: $groupSlug
        roundSlug: $roundSlug
        offset: $offset
        limit: $limit
        status: $status
        ) {
        moreExist
        buckets {
            id
            description
            summary
            title
            minGoal
            maxGoal
            flags {
            type
            __typename
            }
            noOfFunders
            income
            totalContributions
            totalContributionsFromCurrentMember
            noOfComments
            published
            approved
            canceled
            status
            percentageFunded
            round {
            canCocreatorStartFunding
            __typename
            }
            customFields {
            value
            customField {
                id
                name
                type
                limit
                description
                isRequired
                position
                createdAt
                __typename
            }
            __typename
            }
            images {
            id
            small
            large
            __typename
            }
            __typename
        }
        __typename
        }
    }
`;
              var BucketSchema = coda.makeObjectSchema({
                properties: {
                  id: {
                    type: coda.ValueType.String,
                    description: "The id of the bucket."
                  },
                  description: {
                    type: coda.ValueType.String,
                    description: "The description of the bucket."
                  },
                  summary: {
                    type: coda.ValueType.String,
                    description: "The summary of the bucket."
                  },
                  title: {
                    type: coda.ValueType.String,
                    description: "The title of the bucket."
                  },
                  minGoal: {
                    type: coda.ValueType.Number,
                    description: "The minimum goal of the bucket."
                  },
                  maxGoal: {
                    type: coda.ValueType.Number,
                    description: "The maximum goal of the bucket."
                  },
                  noOfFunders: {
                    type: coda.ValueType.Number,
                    description: "The number of funders of the bucket."
                  },
                  income: {
                    type: coda.ValueType.Number,
                    description: "The income of the bucket."
                  },
                  totalContributions: {
                    type: coda.ValueType.Number,
                    description: "The total contributions of the bucket."
                  },
                  totalContributionsFromCurrentMember: {
                    type: coda.ValueType.Number,
                    description: "The total contributions from the current member of the bucket."
                  },
                  noOfComments: {
                    type: coda.ValueType.Number,
                    description: "The number of comments of the bucket."
                  },
                  published: {
                    type: coda.ValueType.Boolean,
                    description: "The published status of the bucket."
                  },
                  approved: {
                    type: coda.ValueType.Boolean,
                    description: "The approved status of the bucket."
                  },
                  canceled: {
                    type: coda.ValueType.Boolean,
                    description: "The canceled status of the bucket."
                  },
                  status: {
                    type: coda.ValueType.String,
                    description: "The status of the bucket."
                  },
                  percentageFunded: {
                    type: coda.ValueType.Number,
                    description: "The percentage funded of the bucket."
                  }
                },
                displayProperty: "title",
                idProperty: "id"
              });
              pack.addSyncTable({
                schema: BucketSchema,
                name: "Buckets",
                description: "Get a list of buckets.",
                identityName: "Bucket",
                formula: {
                  name: "syncBuckets",
                  description: "Get a list of buckets.",
                  parameters: [
                    coda.makeParameter({
                      type: coda.ParameterType.String,
                      name: "groupSlug",
                      description: "The slug of the group."
                    }),
                    coda.makeParameter({
                      type: coda.ParameterType.String,
                      name: "roundSlug",
                      description: "The slug of the round."
                    })
                  ],
                  execute: async function(args, context) {
                    const [groupSlug, roundSlug] = args;
                    const variables = {
                      "groupSlug": groupSlug,
                      "roundSlug": roundSlug,
                      "offset": 0,
                      "limit": 1e3,
                      "status": ["PENDING_APPROVAL", "OPEN_FOR_FUNDING", "FUNDED", "COMPLETED", "CANCELED"]
                    };
                    const response = await context.fetcher.fetch({
                      method: "POST",
                      url: "https://cobudget.com/api",
                      body: JSON.stringify({ query: bucketQuery, variables })
                    });
                    const buckets = response.body.data.bucketsPage.buckets;
                    return {
                      result: buckets
                    };
                  }
                }
              });
            }).call(this);
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require2("buffer").Buffer);
        }, { "buffer": 4, "util": 26 }], 2: [function(require2, module3, exports3) {
          (function(global2) {
            (function() {
              "use strict";
              var possibleNames = [
                "BigInt64Array",
                "BigUint64Array",
                "Float32Array",
                "Float64Array",
                "Int16Array",
                "Int32Array",
                "Int8Array",
                "Uint16Array",
                "Uint32Array",
                "Uint8Array",
                "Uint8ClampedArray"
              ];
              var g = typeof globalThis === "undefined" ? global2 : globalThis;
              module3.exports = /* @__PURE__ */ __name(function availableTypedArrays() {
                var out = [];
                for (var i = 0; i < possibleNames.length; i++) {
                  if (typeof g[possibleNames[i]] === "function") {
                    out[out.length] = possibleNames[i];
                  }
                }
                return out;
              }, "availableTypedArrays");
            }).call(this);
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}], 3: [function(require2, module3, exports3) {
          "use strict";
          exports3.byteLength = byteLength;
          exports3.toByteArray = toByteArray;
          exports3.fromByteArray = fromByteArray;
          var lookup = [];
          var revLookup = [];
          var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
          var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          for (var i = 0, len = code.length; i < len; ++i) {
            lookup[i] = code[i];
            revLookup[code.charCodeAt(i)] = i;
          }
          revLookup["-".charCodeAt(0)] = 62;
          revLookup["_".charCodeAt(0)] = 63;
          function getLens(b64) {
            var len2 = b64.length;
            if (len2 % 4 > 0) {
              throw new Error("Invalid string. Length must be a multiple of 4");
            }
            var validLen = b64.indexOf("=");
            if (validLen === -1)
              validLen = len2;
            var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
            return [validLen, placeHoldersLen];
          }
          __name(getLens, "getLens");
          function byteLength(b64) {
            var lens = getLens(b64);
            var validLen = lens[0];
            var placeHoldersLen = lens[1];
            return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
          }
          __name(byteLength, "byteLength");
          function _byteLength(b64, validLen, placeHoldersLen) {
            return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
          }
          __name(_byteLength, "_byteLength");
          function toByteArray(b64) {
            var tmp;
            var lens = getLens(b64);
            var validLen = lens[0];
            var placeHoldersLen = lens[1];
            var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
            var curByte = 0;
            var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
            var i2;
            for (i2 = 0; i2 < len2; i2 += 4) {
              tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
              arr[curByte++] = tmp >> 16 & 255;
              arr[curByte++] = tmp >> 8 & 255;
              arr[curByte++] = tmp & 255;
            }
            if (placeHoldersLen === 2) {
              tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
              arr[curByte++] = tmp & 255;
            }
            if (placeHoldersLen === 1) {
              tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
              arr[curByte++] = tmp >> 8 & 255;
              arr[curByte++] = tmp & 255;
            }
            return arr;
          }
          __name(toByteArray, "toByteArray");
          function tripletToBase64(num) {
            return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
          }
          __name(tripletToBase64, "tripletToBase64");
          function encodeChunk(uint8, start, end) {
            var tmp;
            var output = [];
            for (var i2 = start; i2 < end; i2 += 3) {
              tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
              output.push(tripletToBase64(tmp));
            }
            return output.join("");
          }
          __name(encodeChunk, "encodeChunk");
          function fromByteArray(uint8) {
            var tmp;
            var len2 = uint8.length;
            var extraBytes = len2 % 3;
            var parts = [];
            var maxChunkLength = 16383;
            for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
              parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
            }
            if (extraBytes === 1) {
              tmp = uint8[len2 - 1];
              parts.push(
                lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
              );
            } else if (extraBytes === 2) {
              tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
              parts.push(
                lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
              );
            }
            return parts.join("");
          }
          __name(fromByteArray, "fromByteArray");
        }, {}], 4: [function(require2, module3, exports3) {
          (function(Buffer2) {
            (function() {
              "use strict";
              var base64 = require2("base64-js");
              var ieee754 = require2("ieee754");
              exports3.Buffer = Buffer3;
              exports3.SlowBuffer = SlowBuffer;
              exports3.INSPECT_MAX_BYTES = 50;
              var K_MAX_LENGTH = 2147483647;
              exports3.kMaxLength = K_MAX_LENGTH;
              Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
              if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
                console.error(
                  "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
                );
              }
              function typedArraySupport() {
                try {
                  var arr = new Uint8Array(1);
                  arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
                    return 42;
                  } };
                  return arr.foo() === 42;
                } catch (e) {
                  return false;
                }
              }
              __name(typedArraySupport, "typedArraySupport");
              Object.defineProperty(Buffer3.prototype, "parent", {
                enumerable: true,
                get: function() {
                  if (!Buffer3.isBuffer(this))
                    return void 0;
                  return this.buffer;
                }
              });
              Object.defineProperty(Buffer3.prototype, "offset", {
                enumerable: true,
                get: function() {
                  if (!Buffer3.isBuffer(this))
                    return void 0;
                  return this.byteOffset;
                }
              });
              function createBuffer(length) {
                if (length > K_MAX_LENGTH) {
                  throw new RangeError('The value "' + length + '" is invalid for option "size"');
                }
                var buf = new Uint8Array(length);
                buf.__proto__ = Buffer3.prototype;
                return buf;
              }
              __name(createBuffer, "createBuffer");
              function Buffer3(arg, encodingOrOffset, length) {
                if (typeof arg === "number") {
                  if (typeof encodingOrOffset === "string") {
                    throw new TypeError(
                      'The "string" argument must be of type string. Received type number'
                    );
                  }
                  return allocUnsafe(arg);
                }
                return from(arg, encodingOrOffset, length);
              }
              __name(Buffer3, "Buffer");
              if (typeof Symbol !== "undefined" && Symbol.species != null && Buffer3[Symbol.species] === Buffer3) {
                Object.defineProperty(Buffer3, Symbol.species, {
                  value: null,
                  configurable: true,
                  enumerable: false,
                  writable: false
                });
              }
              Buffer3.poolSize = 8192;
              function from(value, encodingOrOffset, length) {
                if (typeof value === "string") {
                  return fromString(value, encodingOrOffset);
                }
                if (ArrayBuffer.isView(value)) {
                  return fromArrayLike(value);
                }
                if (value == null) {
                  throw TypeError(
                    "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
                  );
                }
                if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
                  return fromArrayBuffer(value, encodingOrOffset, length);
                }
                if (typeof value === "number") {
                  throw new TypeError(
                    'The "value" argument must not be of type number. Received type number'
                  );
                }
                var valueOf = value.valueOf && value.valueOf();
                if (valueOf != null && valueOf !== value) {
                  return Buffer3.from(valueOf, encodingOrOffset, length);
                }
                var b = fromObject(value);
                if (b)
                  return b;
                if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
                  return Buffer3.from(
                    value[Symbol.toPrimitive]("string"),
                    encodingOrOffset,
                    length
                  );
                }
                throw new TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
                );
              }
              __name(from, "from");
              Buffer3.from = function(value, encodingOrOffset, length) {
                return from(value, encodingOrOffset, length);
              };
              Buffer3.prototype.__proto__ = Uint8Array.prototype;
              Buffer3.__proto__ = Uint8Array;
              function assertSize(size) {
                if (typeof size !== "number") {
                  throw new TypeError('"size" argument must be of type number');
                } else if (size < 0) {
                  throw new RangeError('The value "' + size + '" is invalid for option "size"');
                }
              }
              __name(assertSize, "assertSize");
              function alloc(size, fill, encoding) {
                assertSize(size);
                if (size <= 0) {
                  return createBuffer(size);
                }
                if (fill !== void 0) {
                  return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
                }
                return createBuffer(size);
              }
              __name(alloc, "alloc");
              Buffer3.alloc = function(size, fill, encoding) {
                return alloc(size, fill, encoding);
              };
              function allocUnsafe(size) {
                assertSize(size);
                return createBuffer(size < 0 ? 0 : checked(size) | 0);
              }
              __name(allocUnsafe, "allocUnsafe");
              Buffer3.allocUnsafe = function(size) {
                return allocUnsafe(size);
              };
              Buffer3.allocUnsafeSlow = function(size) {
                return allocUnsafe(size);
              };
              function fromString(string, encoding) {
                if (typeof encoding !== "string" || encoding === "") {
                  encoding = "utf8";
                }
                if (!Buffer3.isEncoding(encoding)) {
                  throw new TypeError("Unknown encoding: " + encoding);
                }
                var length = byteLength(string, encoding) | 0;
                var buf = createBuffer(length);
                var actual = buf.write(string, encoding);
                if (actual !== length) {
                  buf = buf.slice(0, actual);
                }
                return buf;
              }
              __name(fromString, "fromString");
              function fromArrayLike(array) {
                var length = array.length < 0 ? 0 : checked(array.length) | 0;
                var buf = createBuffer(length);
                for (var i = 0; i < length; i += 1) {
                  buf[i] = array[i] & 255;
                }
                return buf;
              }
              __name(fromArrayLike, "fromArrayLike");
              function fromArrayBuffer(array, byteOffset, length) {
                if (byteOffset < 0 || array.byteLength < byteOffset) {
                  throw new RangeError('"offset" is outside of buffer bounds');
                }
                if (array.byteLength < byteOffset + (length || 0)) {
                  throw new RangeError('"length" is outside of buffer bounds');
                }
                var buf;
                if (byteOffset === void 0 && length === void 0) {
                  buf = new Uint8Array(array);
                } else if (length === void 0) {
                  buf = new Uint8Array(array, byteOffset);
                } else {
                  buf = new Uint8Array(array, byteOffset, length);
                }
                buf.__proto__ = Buffer3.prototype;
                return buf;
              }
              __name(fromArrayBuffer, "fromArrayBuffer");
              function fromObject(obj) {
                if (Buffer3.isBuffer(obj)) {
                  var len = checked(obj.length) | 0;
                  var buf = createBuffer(len);
                  if (buf.length === 0) {
                    return buf;
                  }
                  obj.copy(buf, 0, 0, len);
                  return buf;
                }
                if (obj.length !== void 0) {
                  if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
                    return createBuffer(0);
                  }
                  return fromArrayLike(obj);
                }
                if (obj.type === "Buffer" && Array.isArray(obj.data)) {
                  return fromArrayLike(obj.data);
                }
              }
              __name(fromObject, "fromObject");
              function checked(length) {
                if (length >= K_MAX_LENGTH) {
                  throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
                }
                return length | 0;
              }
              __name(checked, "checked");
              function SlowBuffer(length) {
                if (+length != length) {
                  length = 0;
                }
                return Buffer3.alloc(+length);
              }
              __name(SlowBuffer, "SlowBuffer");
              Buffer3.isBuffer = /* @__PURE__ */ __name(function isBuffer(b) {
                return b != null && b._isBuffer === true && b !== Buffer3.prototype;
              }, "isBuffer");
              Buffer3.compare = /* @__PURE__ */ __name(function compare(a, b) {
                if (isInstance(a, Uint8Array))
                  a = Buffer3.from(a, a.offset, a.byteLength);
                if (isInstance(b, Uint8Array))
                  b = Buffer3.from(b, b.offset, b.byteLength);
                if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
                  throw new TypeError(
                    'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                  );
                }
                if (a === b)
                  return 0;
                var x = a.length;
                var y = b.length;
                for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                  if (a[i] !== b[i]) {
                    x = a[i];
                    y = b[i];
                    break;
                  }
                }
                if (x < y)
                  return -1;
                if (y < x)
                  return 1;
                return 0;
              }, "compare");
              Buffer3.isEncoding = /* @__PURE__ */ __name(function isEncoding(encoding) {
                switch (String(encoding).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return true;
                  default:
                    return false;
                }
              }, "isEncoding");
              Buffer3.concat = /* @__PURE__ */ __name(function concat(list, length) {
                if (!Array.isArray(list)) {
                  throw new TypeError('"list" argument must be an Array of Buffers');
                }
                if (list.length === 0) {
                  return Buffer3.alloc(0);
                }
                var i;
                if (length === void 0) {
                  length = 0;
                  for (i = 0; i < list.length; ++i) {
                    length += list[i].length;
                  }
                }
                var buffer = Buffer3.allocUnsafe(length);
                var pos = 0;
                for (i = 0; i < list.length; ++i) {
                  var buf = list[i];
                  if (isInstance(buf, Uint8Array)) {
                    buf = Buffer3.from(buf);
                  }
                  if (!Buffer3.isBuffer(buf)) {
                    throw new TypeError('"list" argument must be an Array of Buffers');
                  }
                  buf.copy(buffer, pos);
                  pos += buf.length;
                }
                return buffer;
              }, "concat");
              function byteLength(string, encoding) {
                if (Buffer3.isBuffer(string)) {
                  return string.length;
                }
                if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
                  return string.byteLength;
                }
                if (typeof string !== "string") {
                  throw new TypeError(
                    'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
                  );
                }
                var len = string.length;
                var mustMatch = arguments.length > 2 && arguments[2] === true;
                if (!mustMatch && len === 0)
                  return 0;
                var loweredCase = false;
                for (; ; ) {
                  switch (encoding) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                      return len;
                    case "utf8":
                    case "utf-8":
                      return utf8ToBytes(string).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return len * 2;
                    case "hex":
                      return len >>> 1;
                    case "base64":
                      return base64ToBytes(string).length;
                    default:
                      if (loweredCase) {
                        return mustMatch ? -1 : utf8ToBytes(string).length;
                      }
                      encoding = ("" + encoding).toLowerCase();
                      loweredCase = true;
                  }
                }
              }
              __name(byteLength, "byteLength");
              Buffer3.byteLength = byteLength;
              function slowToString(encoding, start, end) {
                var loweredCase = false;
                if (start === void 0 || start < 0) {
                  start = 0;
                }
                if (start > this.length) {
                  return "";
                }
                if (end === void 0 || end > this.length) {
                  end = this.length;
                }
                if (end <= 0) {
                  return "";
                }
                end >>>= 0;
                start >>>= 0;
                if (end <= start) {
                  return "";
                }
                if (!encoding)
                  encoding = "utf8";
                while (true) {
                  switch (encoding) {
                    case "hex":
                      return hexSlice(this, start, end);
                    case "utf8":
                    case "utf-8":
                      return utf8Slice(this, start, end);
                    case "ascii":
                      return asciiSlice(this, start, end);
                    case "latin1":
                    case "binary":
                      return latin1Slice(this, start, end);
                    case "base64":
                      return base64Slice(this, start, end);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return utf16leSlice(this, start, end);
                    default:
                      if (loweredCase)
                        throw new TypeError("Unknown encoding: " + encoding);
                      encoding = (encoding + "").toLowerCase();
                      loweredCase = true;
                  }
                }
              }
              __name(slowToString, "slowToString");
              Buffer3.prototype._isBuffer = true;
              function swap(b, n, m) {
                var i = b[n];
                b[n] = b[m];
                b[m] = i;
              }
              __name(swap, "swap");
              Buffer3.prototype.swap16 = /* @__PURE__ */ __name(function swap16() {
                var len = this.length;
                if (len % 2 !== 0) {
                  throw new RangeError("Buffer size must be a multiple of 16-bits");
                }
                for (var i = 0; i < len; i += 2) {
                  swap(this, i, i + 1);
                }
                return this;
              }, "swap16");
              Buffer3.prototype.swap32 = /* @__PURE__ */ __name(function swap32() {
                var len = this.length;
                if (len % 4 !== 0) {
                  throw new RangeError("Buffer size must be a multiple of 32-bits");
                }
                for (var i = 0; i < len; i += 4) {
                  swap(this, i, i + 3);
                  swap(this, i + 1, i + 2);
                }
                return this;
              }, "swap32");
              Buffer3.prototype.swap64 = /* @__PURE__ */ __name(function swap64() {
                var len = this.length;
                if (len % 8 !== 0) {
                  throw new RangeError("Buffer size must be a multiple of 64-bits");
                }
                for (var i = 0; i < len; i += 8) {
                  swap(this, i, i + 7);
                  swap(this, i + 1, i + 6);
                  swap(this, i + 2, i + 5);
                  swap(this, i + 3, i + 4);
                }
                return this;
              }, "swap64");
              Buffer3.prototype.toString = /* @__PURE__ */ __name(function toString() {
                var length = this.length;
                if (length === 0)
                  return "";
                if (arguments.length === 0)
                  return utf8Slice(this, 0, length);
                return slowToString.apply(this, arguments);
              }, "toString");
              Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
              Buffer3.prototype.equals = /* @__PURE__ */ __name(function equals(b) {
                if (!Buffer3.isBuffer(b))
                  throw new TypeError("Argument must be a Buffer");
                if (this === b)
                  return true;
                return Buffer3.compare(this, b) === 0;
              }, "equals");
              Buffer3.prototype.inspect = /* @__PURE__ */ __name(function inspect() {
                var str = "";
                var max = exports3.INSPECT_MAX_BYTES;
                str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
                if (this.length > max)
                  str += " ... ";
                return "<Buffer " + str + ">";
              }, "inspect");
              Buffer3.prototype.compare = /* @__PURE__ */ __name(function compare(target, start, end, thisStart, thisEnd) {
                if (isInstance(target, Uint8Array)) {
                  target = Buffer3.from(target, target.offset, target.byteLength);
                }
                if (!Buffer3.isBuffer(target)) {
                  throw new TypeError(
                    'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
                  );
                }
                if (start === void 0) {
                  start = 0;
                }
                if (end === void 0) {
                  end = target ? target.length : 0;
                }
                if (thisStart === void 0) {
                  thisStart = 0;
                }
                if (thisEnd === void 0) {
                  thisEnd = this.length;
                }
                if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
                  throw new RangeError("out of range index");
                }
                if (thisStart >= thisEnd && start >= end) {
                  return 0;
                }
                if (thisStart >= thisEnd) {
                  return -1;
                }
                if (start >= end) {
                  return 1;
                }
                start >>>= 0;
                end >>>= 0;
                thisStart >>>= 0;
                thisEnd >>>= 0;
                if (this === target)
                  return 0;
                var x = thisEnd - thisStart;
                var y = end - start;
                var len = Math.min(x, y);
                var thisCopy = this.slice(thisStart, thisEnd);
                var targetCopy = target.slice(start, end);
                for (var i = 0; i < len; ++i) {
                  if (thisCopy[i] !== targetCopy[i]) {
                    x = thisCopy[i];
                    y = targetCopy[i];
                    break;
                  }
                }
                if (x < y)
                  return -1;
                if (y < x)
                  return 1;
                return 0;
              }, "compare");
              function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
                if (buffer.length === 0)
                  return -1;
                if (typeof byteOffset === "string") {
                  encoding = byteOffset;
                  byteOffset = 0;
                } else if (byteOffset > 2147483647) {
                  byteOffset = 2147483647;
                } else if (byteOffset < -2147483648) {
                  byteOffset = -2147483648;
                }
                byteOffset = +byteOffset;
                if (numberIsNaN(byteOffset)) {
                  byteOffset = dir ? 0 : buffer.length - 1;
                }
                if (byteOffset < 0)
                  byteOffset = buffer.length + byteOffset;
                if (byteOffset >= buffer.length) {
                  if (dir)
                    return -1;
                  else
                    byteOffset = buffer.length - 1;
                } else if (byteOffset < 0) {
                  if (dir)
                    byteOffset = 0;
                  else
                    return -1;
                }
                if (typeof val === "string") {
                  val = Buffer3.from(val, encoding);
                }
                if (Buffer3.isBuffer(val)) {
                  if (val.length === 0) {
                    return -1;
                  }
                  return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
                } else if (typeof val === "number") {
                  val = val & 255;
                  if (typeof Uint8Array.prototype.indexOf === "function") {
                    if (dir) {
                      return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                    } else {
                      return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                    }
                  }
                  return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
                }
                throw new TypeError("val must be string, number or Buffer");
              }
              __name(bidirectionalIndexOf, "bidirectionalIndexOf");
              function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
                var indexSize = 1;
                var arrLength = arr.length;
                var valLength = val.length;
                if (encoding !== void 0) {
                  encoding = String(encoding).toLowerCase();
                  if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
                    if (arr.length < 2 || val.length < 2) {
                      return -1;
                    }
                    indexSize = 2;
                    arrLength /= 2;
                    valLength /= 2;
                    byteOffset /= 2;
                  }
                }
                function read(buf, i2) {
                  if (indexSize === 1) {
                    return buf[i2];
                  } else {
                    return buf.readUInt16BE(i2 * indexSize);
                  }
                }
                __name(read, "read");
                var i;
                if (dir) {
                  var foundIndex = -1;
                  for (i = byteOffset; i < arrLength; i++) {
                    if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                      if (foundIndex === -1)
                        foundIndex = i;
                      if (i - foundIndex + 1 === valLength)
                        return foundIndex * indexSize;
                    } else {
                      if (foundIndex !== -1)
                        i -= i - foundIndex;
                      foundIndex = -1;
                    }
                  }
                } else {
                  if (byteOffset + valLength > arrLength)
                    byteOffset = arrLength - valLength;
                  for (i = byteOffset; i >= 0; i--) {
                    var found = true;
                    for (var j = 0; j < valLength; j++) {
                      if (read(arr, i + j) !== read(val, j)) {
                        found = false;
                        break;
                      }
                    }
                    if (found)
                      return i;
                  }
                }
                return -1;
              }
              __name(arrayIndexOf, "arrayIndexOf");
              Buffer3.prototype.includes = /* @__PURE__ */ __name(function includes(val, byteOffset, encoding) {
                return this.indexOf(val, byteOffset, encoding) !== -1;
              }, "includes");
              Buffer3.prototype.indexOf = /* @__PURE__ */ __name(function indexOf(val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
              }, "indexOf");
              Buffer3.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf(val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
              }, "lastIndexOf");
              function hexWrite(buf, string, offset, length) {
                offset = Number(offset) || 0;
                var remaining = buf.length - offset;
                if (!length) {
                  length = remaining;
                } else {
                  length = Number(length);
                  if (length > remaining) {
                    length = remaining;
                  }
                }
                var strLen = string.length;
                if (length > strLen / 2) {
                  length = strLen / 2;
                }
                for (var i = 0; i < length; ++i) {
                  var parsed = parseInt(string.substr(i * 2, 2), 16);
                  if (numberIsNaN(parsed))
                    return i;
                  buf[offset + i] = parsed;
                }
                return i;
              }
              __name(hexWrite, "hexWrite");
              function utf8Write(buf, string, offset, length) {
                return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
              }
              __name(utf8Write, "utf8Write");
              function asciiWrite(buf, string, offset, length) {
                return blitBuffer(asciiToBytes(string), buf, offset, length);
              }
              __name(asciiWrite, "asciiWrite");
              function latin1Write(buf, string, offset, length) {
                return asciiWrite(buf, string, offset, length);
              }
              __name(latin1Write, "latin1Write");
              function base64Write(buf, string, offset, length) {
                return blitBuffer(base64ToBytes(string), buf, offset, length);
              }
              __name(base64Write, "base64Write");
              function ucs2Write(buf, string, offset, length) {
                return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
              }
              __name(ucs2Write, "ucs2Write");
              Buffer3.prototype.write = /* @__PURE__ */ __name(function write(string, offset, length, encoding) {
                if (offset === void 0) {
                  encoding = "utf8";
                  length = this.length;
                  offset = 0;
                } else if (length === void 0 && typeof offset === "string") {
                  encoding = offset;
                  length = this.length;
                  offset = 0;
                } else if (isFinite(offset)) {
                  offset = offset >>> 0;
                  if (isFinite(length)) {
                    length = length >>> 0;
                    if (encoding === void 0)
                      encoding = "utf8";
                  } else {
                    encoding = length;
                    length = void 0;
                  }
                } else {
                  throw new Error(
                    "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                  );
                }
                var remaining = this.length - offset;
                if (length === void 0 || length > remaining)
                  length = remaining;
                if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
                  throw new RangeError("Attempt to write outside buffer bounds");
                }
                if (!encoding)
                  encoding = "utf8";
                var loweredCase = false;
                for (; ; ) {
                  switch (encoding) {
                    case "hex":
                      return hexWrite(this, string, offset, length);
                    case "utf8":
                    case "utf-8":
                      return utf8Write(this, string, offset, length);
                    case "ascii":
                      return asciiWrite(this, string, offset, length);
                    case "latin1":
                    case "binary":
                      return latin1Write(this, string, offset, length);
                    case "base64":
                      return base64Write(this, string, offset, length);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return ucs2Write(this, string, offset, length);
                    default:
                      if (loweredCase)
                        throw new TypeError("Unknown encoding: " + encoding);
                      encoding = ("" + encoding).toLowerCase();
                      loweredCase = true;
                  }
                }
              }, "write");
              Buffer3.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return {
                  type: "Buffer",
                  data: Array.prototype.slice.call(this._arr || this, 0)
                };
              }, "toJSON");
              function base64Slice(buf, start, end) {
                if (start === 0 && end === buf.length) {
                  return base64.fromByteArray(buf);
                } else {
                  return base64.fromByteArray(buf.slice(start, end));
                }
              }
              __name(base64Slice, "base64Slice");
              function utf8Slice(buf, start, end) {
                end = Math.min(buf.length, end);
                var res = [];
                var i = start;
                while (i < end) {
                  var firstByte = buf[i];
                  var codePoint = null;
                  var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                  if (i + bytesPerSequence <= end) {
                    var secondByte, thirdByte, fourthByte, tempCodePoint;
                    switch (bytesPerSequence) {
                      case 1:
                        if (firstByte < 128) {
                          codePoint = firstByte;
                        }
                        break;
                      case 2:
                        secondByte = buf[i + 1];
                        if ((secondByte & 192) === 128) {
                          tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                          if (tempCodePoint > 127) {
                            codePoint = tempCodePoint;
                          }
                        }
                        break;
                      case 3:
                        secondByte = buf[i + 1];
                        thirdByte = buf[i + 2];
                        if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                          tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                          if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                            codePoint = tempCodePoint;
                          }
                        }
                        break;
                      case 4:
                        secondByte = buf[i + 1];
                        thirdByte = buf[i + 2];
                        fourthByte = buf[i + 3];
                        if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                          tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                          if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                            codePoint = tempCodePoint;
                          }
                        }
                    }
                  }
                  if (codePoint === null) {
                    codePoint = 65533;
                    bytesPerSequence = 1;
                  } else if (codePoint > 65535) {
                    codePoint -= 65536;
                    res.push(codePoint >>> 10 & 1023 | 55296);
                    codePoint = 56320 | codePoint & 1023;
                  }
                  res.push(codePoint);
                  i += bytesPerSequence;
                }
                return decodeCodePointsArray(res);
              }
              __name(utf8Slice, "utf8Slice");
              var MAX_ARGUMENTS_LENGTH = 4096;
              function decodeCodePointsArray(codePoints) {
                var len = codePoints.length;
                if (len <= MAX_ARGUMENTS_LENGTH) {
                  return String.fromCharCode.apply(String, codePoints);
                }
                var res = "";
                var i = 0;
                while (i < len) {
                  res += String.fromCharCode.apply(
                    String,
                    codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
                  );
                }
                return res;
              }
              __name(decodeCodePointsArray, "decodeCodePointsArray");
              function asciiSlice(buf, start, end) {
                var ret = "";
                end = Math.min(buf.length, end);
                for (var i = start; i < end; ++i) {
                  ret += String.fromCharCode(buf[i] & 127);
                }
                return ret;
              }
              __name(asciiSlice, "asciiSlice");
              function latin1Slice(buf, start, end) {
                var ret = "";
                end = Math.min(buf.length, end);
                for (var i = start; i < end; ++i) {
                  ret += String.fromCharCode(buf[i]);
                }
                return ret;
              }
              __name(latin1Slice, "latin1Slice");
              function hexSlice(buf, start, end) {
                var len = buf.length;
                if (!start || start < 0)
                  start = 0;
                if (!end || end < 0 || end > len)
                  end = len;
                var out = "";
                for (var i = start; i < end; ++i) {
                  out += toHex(buf[i]);
                }
                return out;
              }
              __name(hexSlice, "hexSlice");
              function utf16leSlice(buf, start, end) {
                var bytes = buf.slice(start, end);
                var res = "";
                for (var i = 0; i < bytes.length; i += 2) {
                  res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
                }
                return res;
              }
              __name(utf16leSlice, "utf16leSlice");
              Buffer3.prototype.slice = /* @__PURE__ */ __name(function slice(start, end) {
                var len = this.length;
                start = ~~start;
                end = end === void 0 ? len : ~~end;
                if (start < 0) {
                  start += len;
                  if (start < 0)
                    start = 0;
                } else if (start > len) {
                  start = len;
                }
                if (end < 0) {
                  end += len;
                  if (end < 0)
                    end = 0;
                } else if (end > len) {
                  end = len;
                }
                if (end < start)
                  end = start;
                var newBuf = this.subarray(start, end);
                newBuf.__proto__ = Buffer3.prototype;
                return newBuf;
              }, "slice");
              function checkOffset(offset, ext, length) {
                if (offset % 1 !== 0 || offset < 0)
                  throw new RangeError("offset is not uint");
                if (offset + ext > length)
                  throw new RangeError("Trying to access beyond buffer length");
              }
              __name(checkOffset, "checkOffset");
              Buffer3.prototype.readUIntLE = /* @__PURE__ */ __name(function readUIntLE(offset, byteLength2, noAssert) {
                offset = offset >>> 0;
                byteLength2 = byteLength2 >>> 0;
                if (!noAssert)
                  checkOffset(offset, byteLength2, this.length);
                var val = this[offset];
                var mul = 1;
                var i = 0;
                while (++i < byteLength2 && (mul *= 256)) {
                  val += this[offset + i] * mul;
                }
                return val;
              }, "readUIntLE");
              Buffer3.prototype.readUIntBE = /* @__PURE__ */ __name(function readUIntBE(offset, byteLength2, noAssert) {
                offset = offset >>> 0;
                byteLength2 = byteLength2 >>> 0;
                if (!noAssert) {
                  checkOffset(offset, byteLength2, this.length);
                }
                var val = this[offset + --byteLength2];
                var mul = 1;
                while (byteLength2 > 0 && (mul *= 256)) {
                  val += this[offset + --byteLength2] * mul;
                }
                return val;
              }, "readUIntBE");
              Buffer3.prototype.readUInt8 = /* @__PURE__ */ __name(function readUInt8(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 1, this.length);
                return this[offset];
              }, "readUInt8");
              Buffer3.prototype.readUInt16LE = /* @__PURE__ */ __name(function readUInt16LE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 2, this.length);
                return this[offset] | this[offset + 1] << 8;
              }, "readUInt16LE");
              Buffer3.prototype.readUInt16BE = /* @__PURE__ */ __name(function readUInt16BE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 2, this.length);
                return this[offset] << 8 | this[offset + 1];
              }, "readUInt16BE");
              Buffer3.prototype.readUInt32LE = /* @__PURE__ */ __name(function readUInt32LE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 4, this.length);
                return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
              }, "readUInt32LE");
              Buffer3.prototype.readUInt32BE = /* @__PURE__ */ __name(function readUInt32BE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 4, this.length);
                return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
              }, "readUInt32BE");
              Buffer3.prototype.readIntLE = /* @__PURE__ */ __name(function readIntLE(offset, byteLength2, noAssert) {
                offset = offset >>> 0;
                byteLength2 = byteLength2 >>> 0;
                if (!noAssert)
                  checkOffset(offset, byteLength2, this.length);
                var val = this[offset];
                var mul = 1;
                var i = 0;
                while (++i < byteLength2 && (mul *= 256)) {
                  val += this[offset + i] * mul;
                }
                mul *= 128;
                if (val >= mul)
                  val -= Math.pow(2, 8 * byteLength2);
                return val;
              }, "readIntLE");
              Buffer3.prototype.readIntBE = /* @__PURE__ */ __name(function readIntBE(offset, byteLength2, noAssert) {
                offset = offset >>> 0;
                byteLength2 = byteLength2 >>> 0;
                if (!noAssert)
                  checkOffset(offset, byteLength2, this.length);
                var i = byteLength2;
                var mul = 1;
                var val = this[offset + --i];
                while (i > 0 && (mul *= 256)) {
                  val += this[offset + --i] * mul;
                }
                mul *= 128;
                if (val >= mul)
                  val -= Math.pow(2, 8 * byteLength2);
                return val;
              }, "readIntBE");
              Buffer3.prototype.readInt8 = /* @__PURE__ */ __name(function readInt8(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 1, this.length);
                if (!(this[offset] & 128))
                  return this[offset];
                return (255 - this[offset] + 1) * -1;
              }, "readInt8");
              Buffer3.prototype.readInt16LE = /* @__PURE__ */ __name(function readInt16LE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 2, this.length);
                var val = this[offset] | this[offset + 1] << 8;
                return val & 32768 ? val | 4294901760 : val;
              }, "readInt16LE");
              Buffer3.prototype.readInt16BE = /* @__PURE__ */ __name(function readInt16BE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 2, this.length);
                var val = this[offset + 1] | this[offset] << 8;
                return val & 32768 ? val | 4294901760 : val;
              }, "readInt16BE");
              Buffer3.prototype.readInt32LE = /* @__PURE__ */ __name(function readInt32LE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 4, this.length);
                return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
              }, "readInt32LE");
              Buffer3.prototype.readInt32BE = /* @__PURE__ */ __name(function readInt32BE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 4, this.length);
                return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
              }, "readInt32BE");
              Buffer3.prototype.readFloatLE = /* @__PURE__ */ __name(function readFloatLE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 4, this.length);
                return ieee754.read(this, offset, true, 23, 4);
              }, "readFloatLE");
              Buffer3.prototype.readFloatBE = /* @__PURE__ */ __name(function readFloatBE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 4, this.length);
                return ieee754.read(this, offset, false, 23, 4);
              }, "readFloatBE");
              Buffer3.prototype.readDoubleLE = /* @__PURE__ */ __name(function readDoubleLE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 8, this.length);
                return ieee754.read(this, offset, true, 52, 8);
              }, "readDoubleLE");
              Buffer3.prototype.readDoubleBE = /* @__PURE__ */ __name(function readDoubleBE(offset, noAssert) {
                offset = offset >>> 0;
                if (!noAssert)
                  checkOffset(offset, 8, this.length);
                return ieee754.read(this, offset, false, 52, 8);
              }, "readDoubleBE");
              function checkInt(buf, value, offset, ext, max, min) {
                if (!Buffer3.isBuffer(buf))
                  throw new TypeError('"buffer" argument must be a Buffer instance');
                if (value > max || value < min)
                  throw new RangeError('"value" argument is out of bounds');
                if (offset + ext > buf.length)
                  throw new RangeError("Index out of range");
              }
              __name(checkInt, "checkInt");
              Buffer3.prototype.writeUIntLE = /* @__PURE__ */ __name(function writeUIntLE(value, offset, byteLength2, noAssert) {
                value = +value;
                offset = offset >>> 0;
                byteLength2 = byteLength2 >>> 0;
                if (!noAssert) {
                  var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
                  checkInt(this, value, offset, byteLength2, maxBytes, 0);
                }
                var mul = 1;
                var i = 0;
                this[offset] = value & 255;
                while (++i < byteLength2 && (mul *= 256)) {
                  this[offset + i] = value / mul & 255;
                }
                return offset + byteLength2;
              }, "writeUIntLE");
              Buffer3.prototype.writeUIntBE = /* @__PURE__ */ __name(function writeUIntBE(value, offset, byteLength2, noAssert) {
                value = +value;
                offset = offset >>> 0;
                byteLength2 = byteLength2 >>> 0;
                if (!noAssert) {
                  var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
                  checkInt(this, value, offset, byteLength2, maxBytes, 0);
                }
                var i = byteLength2 - 1;
                var mul = 1;
                this[offset + i] = value & 255;
                while (--i >= 0 && (mul *= 256)) {
                  this[offset + i] = value / mul & 255;
                }
                return offset + byteLength2;
              }, "writeUIntBE");
              Buffer3.prototype.writeUInt8 = /* @__PURE__ */ __name(function writeUInt8(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 1, 255, 0);
                this[offset] = value & 255;
                return offset + 1;
              }, "writeUInt8");
              Buffer3.prototype.writeUInt16LE = /* @__PURE__ */ __name(function writeUInt16LE(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 2, 65535, 0);
                this[offset] = value & 255;
                this[offset + 1] = value >>> 8;
                return offset + 2;
              }, "writeUInt16LE");
              Buffer3.prototype.writeUInt16BE = /* @__PURE__ */ __name(function writeUInt16BE(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 2, 65535, 0);
                this[offset] = value >>> 8;
                this[offset + 1] = value & 255;
                return offset + 2;
              }, "writeUInt16BE");
              Buffer3.prototype.writeUInt32LE = /* @__PURE__ */ __name(function writeUInt32LE(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 4, 4294967295, 0);
                this[offset + 3] = value >>> 24;
                this[offset + 2] = value >>> 16;
                this[offset + 1] = value >>> 8;
                this[offset] = value & 255;
                return offset + 4;
              }, "writeUInt32LE");
              Buffer3.prototype.writeUInt32BE = /* @__PURE__ */ __name(function writeUInt32BE(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 4, 4294967295, 0);
                this[offset] = value >>> 24;
                this[offset + 1] = value >>> 16;
                this[offset + 2] = value >>> 8;
                this[offset + 3] = value & 255;
                return offset + 4;
              }, "writeUInt32BE");
              Buffer3.prototype.writeIntLE = /* @__PURE__ */ __name(function writeIntLE(value, offset, byteLength2, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert) {
                  var limit = Math.pow(2, 8 * byteLength2 - 1);
                  checkInt(this, value, offset, byteLength2, limit - 1, -limit);
                }
                var i = 0;
                var mul = 1;
                var sub = 0;
                this[offset] = value & 255;
                while (++i < byteLength2 && (mul *= 256)) {
                  if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                    sub = 1;
                  }
                  this[offset + i] = (value / mul >> 0) - sub & 255;
                }
                return offset + byteLength2;
              }, "writeIntLE");
              Buffer3.prototype.writeIntBE = /* @__PURE__ */ __name(function writeIntBE(value, offset, byteLength2, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert) {
                  var limit = Math.pow(2, 8 * byteLength2 - 1);
                  checkInt(this, value, offset, byteLength2, limit - 1, -limit);
                }
                var i = byteLength2 - 1;
                var mul = 1;
                var sub = 0;
                this[offset + i] = value & 255;
                while (--i >= 0 && (mul *= 256)) {
                  if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                    sub = 1;
                  }
                  this[offset + i] = (value / mul >> 0) - sub & 255;
                }
                return offset + byteLength2;
              }, "writeIntBE");
              Buffer3.prototype.writeInt8 = /* @__PURE__ */ __name(function writeInt8(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 1, 127, -128);
                if (value < 0)
                  value = 255 + value + 1;
                this[offset] = value & 255;
                return offset + 1;
              }, "writeInt8");
              Buffer3.prototype.writeInt16LE = /* @__PURE__ */ __name(function writeInt16LE(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 2, 32767, -32768);
                this[offset] = value & 255;
                this[offset + 1] = value >>> 8;
                return offset + 2;
              }, "writeInt16LE");
              Buffer3.prototype.writeInt16BE = /* @__PURE__ */ __name(function writeInt16BE(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 2, 32767, -32768);
                this[offset] = value >>> 8;
                this[offset + 1] = value & 255;
                return offset + 2;
              }, "writeInt16BE");
              Buffer3.prototype.writeInt32LE = /* @__PURE__ */ __name(function writeInt32LE(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 4, 2147483647, -2147483648);
                this[offset] = value & 255;
                this[offset + 1] = value >>> 8;
                this[offset + 2] = value >>> 16;
                this[offset + 3] = value >>> 24;
                return offset + 4;
              }, "writeInt32LE");
              Buffer3.prototype.writeInt32BE = /* @__PURE__ */ __name(function writeInt32BE(value, offset, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert)
                  checkInt(this, value, offset, 4, 2147483647, -2147483648);
                if (value < 0)
                  value = 4294967295 + value + 1;
                this[offset] = value >>> 24;
                this[offset + 1] = value >>> 16;
                this[offset + 2] = value >>> 8;
                this[offset + 3] = value & 255;
                return offset + 4;
              }, "writeInt32BE");
              function checkIEEE754(buf, value, offset, ext, max, min) {
                if (offset + ext > buf.length)
                  throw new RangeError("Index out of range");
                if (offset < 0)
                  throw new RangeError("Index out of range");
              }
              __name(checkIEEE754, "checkIEEE754");
              function writeFloat(buf, value, offset, littleEndian, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert) {
                  checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
                }
                ieee754.write(buf, value, offset, littleEndian, 23, 4);
                return offset + 4;
              }
              __name(writeFloat, "writeFloat");
              Buffer3.prototype.writeFloatLE = /* @__PURE__ */ __name(function writeFloatLE(value, offset, noAssert) {
                return writeFloat(this, value, offset, true, noAssert);
              }, "writeFloatLE");
              Buffer3.prototype.writeFloatBE = /* @__PURE__ */ __name(function writeFloatBE(value, offset, noAssert) {
                return writeFloat(this, value, offset, false, noAssert);
              }, "writeFloatBE");
              function writeDouble(buf, value, offset, littleEndian, noAssert) {
                value = +value;
                offset = offset >>> 0;
                if (!noAssert) {
                  checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
                }
                ieee754.write(buf, value, offset, littleEndian, 52, 8);
                return offset + 8;
              }
              __name(writeDouble, "writeDouble");
              Buffer3.prototype.writeDoubleLE = /* @__PURE__ */ __name(function writeDoubleLE(value, offset, noAssert) {
                return writeDouble(this, value, offset, true, noAssert);
              }, "writeDoubleLE");
              Buffer3.prototype.writeDoubleBE = /* @__PURE__ */ __name(function writeDoubleBE(value, offset, noAssert) {
                return writeDouble(this, value, offset, false, noAssert);
              }, "writeDoubleBE");
              Buffer3.prototype.copy = /* @__PURE__ */ __name(function copy(target, targetStart, start, end) {
                if (!Buffer3.isBuffer(target))
                  throw new TypeError("argument should be a Buffer");
                if (!start)
                  start = 0;
                if (!end && end !== 0)
                  end = this.length;
                if (targetStart >= target.length)
                  targetStart = target.length;
                if (!targetStart)
                  targetStart = 0;
                if (end > 0 && end < start)
                  end = start;
                if (end === start)
                  return 0;
                if (target.length === 0 || this.length === 0)
                  return 0;
                if (targetStart < 0) {
                  throw new RangeError("targetStart out of bounds");
                }
                if (start < 0 || start >= this.length)
                  throw new RangeError("Index out of range");
                if (end < 0)
                  throw new RangeError("sourceEnd out of bounds");
                if (end > this.length)
                  end = this.length;
                if (target.length - targetStart < end - start) {
                  end = target.length - targetStart + start;
                }
                var len = end - start;
                if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
                  this.copyWithin(targetStart, start, end);
                } else if (this === target && start < targetStart && targetStart < end) {
                  for (var i = len - 1; i >= 0; --i) {
                    target[i + targetStart] = this[i + start];
                  }
                } else {
                  Uint8Array.prototype.set.call(
                    target,
                    this.subarray(start, end),
                    targetStart
                  );
                }
                return len;
              }, "copy");
              Buffer3.prototype.fill = /* @__PURE__ */ __name(function fill(val, start, end, encoding) {
                if (typeof val === "string") {
                  if (typeof start === "string") {
                    encoding = start;
                    start = 0;
                    end = this.length;
                  } else if (typeof end === "string") {
                    encoding = end;
                    end = this.length;
                  }
                  if (encoding !== void 0 && typeof encoding !== "string") {
                    throw new TypeError("encoding must be a string");
                  }
                  if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
                    throw new TypeError("Unknown encoding: " + encoding);
                  }
                  if (val.length === 1) {
                    var code = val.charCodeAt(0);
                    if (encoding === "utf8" && code < 128 || encoding === "latin1") {
                      val = code;
                    }
                  }
                } else if (typeof val === "number") {
                  val = val & 255;
                }
                if (start < 0 || this.length < start || this.length < end) {
                  throw new RangeError("Out of range index");
                }
                if (end <= start) {
                  return this;
                }
                start = start >>> 0;
                end = end === void 0 ? this.length : end >>> 0;
                if (!val)
                  val = 0;
                var i;
                if (typeof val === "number") {
                  for (i = start; i < end; ++i) {
                    this[i] = val;
                  }
                } else {
                  var bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
                  var len = bytes.length;
                  if (len === 0) {
                    throw new TypeError('The value "' + val + '" is invalid for argument "value"');
                  }
                  for (i = 0; i < end - start; ++i) {
                    this[i + start] = bytes[i % len];
                  }
                }
                return this;
              }, "fill");
              var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
              function base64clean(str) {
                str = str.split("=")[0];
                str = str.trim().replace(INVALID_BASE64_RE, "");
                if (str.length < 2)
                  return "";
                while (str.length % 4 !== 0) {
                  str = str + "=";
                }
                return str;
              }
              __name(base64clean, "base64clean");
              function toHex(n) {
                if (n < 16)
                  return "0" + n.toString(16);
                return n.toString(16);
              }
              __name(toHex, "toHex");
              function utf8ToBytes(string, units) {
                units = units || Infinity;
                var codePoint;
                var length = string.length;
                var leadSurrogate = null;
                var bytes = [];
                for (var i = 0; i < length; ++i) {
                  codePoint = string.charCodeAt(i);
                  if (codePoint > 55295 && codePoint < 57344) {
                    if (!leadSurrogate) {
                      if (codePoint > 56319) {
                        if ((units -= 3) > -1)
                          bytes.push(239, 191, 189);
                        continue;
                      } else if (i + 1 === length) {
                        if ((units -= 3) > -1)
                          bytes.push(239, 191, 189);
                        continue;
                      }
                      leadSurrogate = codePoint;
                      continue;
                    }
                    if (codePoint < 56320) {
                      if ((units -= 3) > -1)
                        bytes.push(239, 191, 189);
                      leadSurrogate = codePoint;
                      continue;
                    }
                    codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
                  } else if (leadSurrogate) {
                    if ((units -= 3) > -1)
                      bytes.push(239, 191, 189);
                  }
                  leadSurrogate = null;
                  if (codePoint < 128) {
                    if ((units -= 1) < 0)
                      break;
                    bytes.push(codePoint);
                  } else if (codePoint < 2048) {
                    if ((units -= 2) < 0)
                      break;
                    bytes.push(
                      codePoint >> 6 | 192,
                      codePoint & 63 | 128
                    );
                  } else if (codePoint < 65536) {
                    if ((units -= 3) < 0)
                      break;
                    bytes.push(
                      codePoint >> 12 | 224,
                      codePoint >> 6 & 63 | 128,
                      codePoint & 63 | 128
                    );
                  } else if (codePoint < 1114112) {
                    if ((units -= 4) < 0)
                      break;
                    bytes.push(
                      codePoint >> 18 | 240,
                      codePoint >> 12 & 63 | 128,
                      codePoint >> 6 & 63 | 128,
                      codePoint & 63 | 128
                    );
                  } else {
                    throw new Error("Invalid code point");
                  }
                }
                return bytes;
              }
              __name(utf8ToBytes, "utf8ToBytes");
              function asciiToBytes(str) {
                var byteArray = [];
                for (var i = 0; i < str.length; ++i) {
                  byteArray.push(str.charCodeAt(i) & 255);
                }
                return byteArray;
              }
              __name(asciiToBytes, "asciiToBytes");
              function utf16leToBytes(str, units) {
                var c, hi, lo;
                var byteArray = [];
                for (var i = 0; i < str.length; ++i) {
                  if ((units -= 2) < 0)
                    break;
                  c = str.charCodeAt(i);
                  hi = c >> 8;
                  lo = c % 256;
                  byteArray.push(lo);
                  byteArray.push(hi);
                }
                return byteArray;
              }
              __name(utf16leToBytes, "utf16leToBytes");
              function base64ToBytes(str) {
                return base64.toByteArray(base64clean(str));
              }
              __name(base64ToBytes, "base64ToBytes");
              function blitBuffer(src, dst, offset, length) {
                for (var i = 0; i < length; ++i) {
                  if (i + offset >= dst.length || i >= src.length)
                    break;
                  dst[i + offset] = src[i];
                }
                return i;
              }
              __name(blitBuffer, "blitBuffer");
              function isInstance(obj, type) {
                return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
              }
              __name(isInstance, "isInstance");
              function numberIsNaN(obj) {
                return obj !== obj;
              }
              __name(numberIsNaN, "numberIsNaN");
            }).call(this);
          }).call(this, require2("buffer").Buffer);
        }, { "base64-js": 3, "buffer": 4, "ieee754": 17 }], 5: [function(require2, module3, exports3) {
          "use strict";
          var GetIntrinsic = require2("get-intrinsic");
          var callBind = require2("./");
          var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
          module3.exports = /* @__PURE__ */ __name(function callBoundIntrinsic(name, allowMissing) {
            var intrinsic = GetIntrinsic(name, !!allowMissing);
            if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
              return callBind(intrinsic);
            }
            return intrinsic;
          }, "callBoundIntrinsic");
        }, { "./": 6, "get-intrinsic": 10 }], 6: [function(require2, module3, exports3) {
          "use strict";
          var bind = require2("function-bind");
          var GetIntrinsic = require2("get-intrinsic");
          var $apply = GetIntrinsic("%Function.prototype.apply%");
          var $call = GetIntrinsic("%Function.prototype.call%");
          var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
          var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
          var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
          var $max = GetIntrinsic("%Math.max%");
          if ($defineProperty) {
            try {
              $defineProperty({}, "a", { value: 1 });
            } catch (e) {
              $defineProperty = null;
            }
          }
          module3.exports = /* @__PURE__ */ __name(function callBind(originalFunction) {
            var func = $reflectApply(bind, $call, arguments);
            if ($gOPD && $defineProperty) {
              var desc = $gOPD(func, "length");
              if (desc.configurable) {
                $defineProperty(
                  func,
                  "length",
                  { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
                );
              }
            }
            return func;
          }, "callBind");
          var applyBind = /* @__PURE__ */ __name(function applyBind2() {
            return $reflectApply(bind, $apply, arguments);
          }, "applyBind");
          if ($defineProperty) {
            $defineProperty(module3.exports, "apply", { value: applyBind });
          } else {
            module3.exports.apply = applyBind;
          }
        }, { "function-bind": 9, "get-intrinsic": 10 }], 7: [function(require2, module3, exports3) {
          "use strict";
          var isCallable = require2("is-callable");
          var toStr = Object.prototype.toString;
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var forEachArray = /* @__PURE__ */ __name(function forEachArray2(array, iterator, receiver) {
            for (var i = 0, len = array.length; i < len; i++) {
              if (hasOwnProperty.call(array, i)) {
                if (receiver == null) {
                  iterator(array[i], i, array);
                } else {
                  iterator.call(receiver, array[i], i, array);
                }
              }
            }
          }, "forEachArray");
          var forEachString = /* @__PURE__ */ __name(function forEachString2(string, iterator, receiver) {
            for (var i = 0, len = string.length; i < len; i++) {
              if (receiver == null) {
                iterator(string.charAt(i), i, string);
              } else {
                iterator.call(receiver, string.charAt(i), i, string);
              }
            }
          }, "forEachString");
          var forEachObject = /* @__PURE__ */ __name(function forEachObject2(object, iterator, receiver) {
            for (var k in object) {
              if (hasOwnProperty.call(object, k)) {
                if (receiver == null) {
                  iterator(object[k], k, object);
                } else {
                  iterator.call(receiver, object[k], k, object);
                }
              }
            }
          }, "forEachObject");
          var forEach = /* @__PURE__ */ __name(function forEach2(list, iterator, thisArg) {
            if (!isCallable(iterator)) {
              throw new TypeError("iterator must be a function");
            }
            var receiver;
            if (arguments.length >= 3) {
              receiver = thisArg;
            }
            if (toStr.call(list) === "[object Array]") {
              forEachArray(list, iterator, receiver);
            } else if (typeof list === "string") {
              forEachString(list, iterator, receiver);
            } else {
              forEachObject(list, iterator, receiver);
            }
          }, "forEach");
          module3.exports = forEach;
        }, { "is-callable": 20 }], 8: [function(require2, module3, exports3) {
          "use strict";
          var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
          var slice = Array.prototype.slice;
          var toStr = Object.prototype.toString;
          var funcType = "[object Function]";
          module3.exports = /* @__PURE__ */ __name(function bind(that) {
            var target = this;
            if (typeof target !== "function" || toStr.call(target) !== funcType) {
              throw new TypeError(ERROR_MESSAGE + target);
            }
            var args = slice.call(arguments, 1);
            var bound;
            var binder = /* @__PURE__ */ __name(function() {
              if (this instanceof bound) {
                var result = target.apply(
                  this,
                  args.concat(slice.call(arguments))
                );
                if (Object(result) === result) {
                  return result;
                }
                return this;
              } else {
                return target.apply(
                  that,
                  args.concat(slice.call(arguments))
                );
              }
            }, "binder");
            var boundLength = Math.max(0, target.length - args.length);
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) {
              boundArgs.push("$" + i);
            }
            bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
            if (target.prototype) {
              var Empty = /* @__PURE__ */ __name(function Empty2() {
              }, "Empty");
              Empty.prototype = target.prototype;
              bound.prototype = new Empty();
              Empty.prototype = null;
            }
            return bound;
          }, "bind");
        }, {}], 9: [function(require2, module3, exports3) {
          "use strict";
          var implementation = require2("./implementation");
          module3.exports = Function.prototype.bind || implementation;
        }, { "./implementation": 8 }], 10: [function(require2, module3, exports3) {
          "use strict";
          var undefined2;
          var $SyntaxError = SyntaxError;
          var $Function = Function;
          var $TypeError = TypeError;
          var getEvalledConstructor = /* @__PURE__ */ __name(function(expressionSyntax) {
            try {
              return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
            } catch (e) {
            }
          }, "getEvalledConstructor");
          var $gOPD = Object.getOwnPropertyDescriptor;
          if ($gOPD) {
            try {
              $gOPD({}, "");
            } catch (e) {
              $gOPD = null;
            }
          }
          var throwTypeError = /* @__PURE__ */ __name(function() {
            throw new $TypeError();
          }, "throwTypeError");
          var ThrowTypeError = $gOPD ? function() {
            try {
              arguments.callee;
              return throwTypeError;
            } catch (calleeThrows) {
              try {
                return $gOPD(arguments, "callee").get;
              } catch (gOPDthrows) {
                return throwTypeError;
              }
            }
          }() : throwTypeError;
          var hasSymbols = require2("has-symbols")();
          var hasProto = require2("has-proto")();
          var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
            return x.__proto__;
          } : null);
          var needsEval = {};
          var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
          var INTRINSICS = {
            "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
            "%Array%": Array,
            "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
            "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
            "%AsyncFromSyncIteratorPrototype%": undefined2,
            "%AsyncFunction%": needsEval,
            "%AsyncGenerator%": needsEval,
            "%AsyncGeneratorFunction%": needsEval,
            "%AsyncIteratorPrototype%": needsEval,
            "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
            "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
            "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
            "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
            "%Boolean%": Boolean,
            "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
            "%Date%": Date,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": Error,
            "%eval%": eval,
            // eslint-disable-line no-eval
            "%EvalError%": EvalError,
            "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
            "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
            "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
            "%Function%": $Function,
            "%GeneratorFunction%": needsEval,
            "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
            "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
            "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
            "%JSON%": typeof JSON === "object" ? JSON : undefined2,
            "%Map%": typeof Map === "undefined" ? undefined2 : Map,
            "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
            "%Math%": Math,
            "%Number%": Number,
            "%Object%": Object,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
            "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
            "%RangeError%": RangeError,
            "%ReferenceError%": ReferenceError,
            "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
            "%RegExp%": RegExp,
            "%Set%": typeof Set === "undefined" ? undefined2 : Set,
            "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
            "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
            "%String%": String,
            "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
            "%Symbol%": hasSymbols ? Symbol : undefined2,
            "%SyntaxError%": $SyntaxError,
            "%ThrowTypeError%": ThrowTypeError,
            "%TypedArray%": TypedArray,
            "%TypeError%": $TypeError,
            "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
            "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
            "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
            "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
            "%URIError%": URIError,
            "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
            "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
            "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
          };
          if (getProto) {
            try {
              null.error;
            } catch (e) {
              var errorProto = getProto(getProto(e));
              INTRINSICS["%Error.prototype%"] = errorProto;
            }
          }
          var doEval = /* @__PURE__ */ __name(function doEval2(name) {
            var value;
            if (name === "%AsyncFunction%") {
              value = getEvalledConstructor("async function () {}");
            } else if (name === "%GeneratorFunction%") {
              value = getEvalledConstructor("function* () {}");
            } else if (name === "%AsyncGeneratorFunction%") {
              value = getEvalledConstructor("async function* () {}");
            } else if (name === "%AsyncGenerator%") {
              var fn = doEval2("%AsyncGeneratorFunction%");
              if (fn) {
                value = fn.prototype;
              }
            } else if (name === "%AsyncIteratorPrototype%") {
              var gen = doEval2("%AsyncGenerator%");
              if (gen && getProto) {
                value = getProto(gen.prototype);
              }
            }
            INTRINSICS[name] = value;
            return value;
          }, "doEval");
          var LEGACY_ALIASES = {
            "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
            "%ArrayPrototype%": ["Array", "prototype"],
            "%ArrayProto_entries%": ["Array", "prototype", "entries"],
            "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
            "%ArrayProto_keys%": ["Array", "prototype", "keys"],
            "%ArrayProto_values%": ["Array", "prototype", "values"],
            "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
            "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
            "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
            "%BooleanPrototype%": ["Boolean", "prototype"],
            "%DataViewPrototype%": ["DataView", "prototype"],
            "%DatePrototype%": ["Date", "prototype"],
            "%ErrorPrototype%": ["Error", "prototype"],
            "%EvalErrorPrototype%": ["EvalError", "prototype"],
            "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
            "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
            "%FunctionPrototype%": ["Function", "prototype"],
            "%Generator%": ["GeneratorFunction", "prototype"],
            "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
            "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
            "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
            "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
            "%JSONParse%": ["JSON", "parse"],
            "%JSONStringify%": ["JSON", "stringify"],
            "%MapPrototype%": ["Map", "prototype"],
            "%NumberPrototype%": ["Number", "prototype"],
            "%ObjectPrototype%": ["Object", "prototype"],
            "%ObjProto_toString%": ["Object", "prototype", "toString"],
            "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
            "%PromisePrototype%": ["Promise", "prototype"],
            "%PromiseProto_then%": ["Promise", "prototype", "then"],
            "%Promise_all%": ["Promise", "all"],
            "%Promise_reject%": ["Promise", "reject"],
            "%Promise_resolve%": ["Promise", "resolve"],
            "%RangeErrorPrototype%": ["RangeError", "prototype"],
            "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
            "%RegExpPrototype%": ["RegExp", "prototype"],
            "%SetPrototype%": ["Set", "prototype"],
            "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
            "%StringPrototype%": ["String", "prototype"],
            "%SymbolPrototype%": ["Symbol", "prototype"],
            "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
            "%TypedArrayPrototype%": ["TypedArray", "prototype"],
            "%TypeErrorPrototype%": ["TypeError", "prototype"],
            "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
            "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
            "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
            "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
            "%URIErrorPrototype%": ["URIError", "prototype"],
            "%WeakMapPrototype%": ["WeakMap", "prototype"],
            "%WeakSetPrototype%": ["WeakSet", "prototype"]
          };
          var bind = require2("function-bind");
          var hasOwn = require2("has");
          var $concat = bind.call(Function.call, Array.prototype.concat);
          var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
          var $replace = bind.call(Function.call, String.prototype.replace);
          var $strSlice = bind.call(Function.call, String.prototype.slice);
          var $exec = bind.call(Function.call, RegExp.prototype.exec);
          var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
          var reEscapeChar = /\\(\\)?/g;
          var stringToPath = /* @__PURE__ */ __name(function stringToPath2(string) {
            var first = $strSlice(string, 0, 1);
            var last = $strSlice(string, -1);
            if (first === "%" && last !== "%") {
              throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
            } else if (last === "%" && first !== "%") {
              throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
            }
            var result = [];
            $replace(string, rePropName, function(match, number, quote, subString) {
              result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
            });
            return result;
          }, "stringToPath");
          var getBaseIntrinsic = /* @__PURE__ */ __name(function getBaseIntrinsic2(name, allowMissing) {
            var intrinsicName = name;
            var alias;
            if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
              alias = LEGACY_ALIASES[intrinsicName];
              intrinsicName = "%" + alias[0] + "%";
            }
            if (hasOwn(INTRINSICS, intrinsicName)) {
              var value = INTRINSICS[intrinsicName];
              if (value === needsEval) {
                value = doEval(intrinsicName);
              }
              if (typeof value === "undefined" && !allowMissing) {
                throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
              }
              return {
                alias,
                name: intrinsicName,
                value
              };
            }
            throw new $SyntaxError("intrinsic " + name + " does not exist!");
          }, "getBaseIntrinsic");
          module3.exports = /* @__PURE__ */ __name(function GetIntrinsic(name, allowMissing) {
            if (typeof name !== "string" || name.length === 0) {
              throw new $TypeError("intrinsic name must be a non-empty string");
            }
            if (arguments.length > 1 && typeof allowMissing !== "boolean") {
              throw new $TypeError('"allowMissing" argument must be a boolean');
            }
            if ($exec(/^%?[^%]*%?$/, name) === null) {
              throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
            }
            var parts = stringToPath(name);
            var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
            var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
            var intrinsicRealName = intrinsic.name;
            var value = intrinsic.value;
            var skipFurtherCaching = false;
            var alias = intrinsic.alias;
            if (alias) {
              intrinsicBaseName = alias[0];
              $spliceApply(parts, $concat([0, 1], alias));
            }
            for (var i = 1, isOwn = true; i < parts.length; i += 1) {
              var part = parts[i];
              var first = $strSlice(part, 0, 1);
              var last = $strSlice(part, -1);
              if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
                throw new $SyntaxError("property names with quotes must have matching quotes");
              }
              if (part === "constructor" || !isOwn) {
                skipFurtherCaching = true;
              }
              intrinsicBaseName += "." + part;
              intrinsicRealName = "%" + intrinsicBaseName + "%";
              if (hasOwn(INTRINSICS, intrinsicRealName)) {
                value = INTRINSICS[intrinsicRealName];
              } else if (value != null) {
                if (!(part in value)) {
                  if (!allowMissing) {
                    throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
                  }
                  return void 0;
                }
                if ($gOPD && i + 1 >= parts.length) {
                  var desc = $gOPD(value, part);
                  isOwn = !!desc;
                  if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                    value = desc.get;
                  } else {
                    value = value[part];
                  }
                } else {
                  isOwn = hasOwn(value, part);
                  value = value[part];
                }
                if (isOwn && !skipFurtherCaching) {
                  INTRINSICS[intrinsicRealName] = value;
                }
              }
            }
            return value;
          }, "GetIntrinsic");
        }, { "function-bind": 9, "has": 16, "has-proto": 12, "has-symbols": 13 }], 11: [function(require2, module3, exports3) {
          "use strict";
          var GetIntrinsic = require2("get-intrinsic");
          var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
          if ($gOPD) {
            try {
              $gOPD([], "length");
            } catch (e) {
              $gOPD = null;
            }
          }
          module3.exports = $gOPD;
        }, { "get-intrinsic": 10 }], 12: [function(require2, module3, exports3) {
          "use strict";
          var test = {
            foo: {}
          };
          var $Object = Object;
          module3.exports = /* @__PURE__ */ __name(function hasProto() {
            return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
          }, "hasProto");
        }, {}], 13: [function(require2, module3, exports3) {
          "use strict";
          var origSymbol = typeof Symbol !== "undefined" && Symbol;
          var hasSymbolSham = require2("./shams");
          module3.exports = /* @__PURE__ */ __name(function hasNativeSymbols() {
            if (typeof origSymbol !== "function") {
              return false;
            }
            if (typeof Symbol !== "function") {
              return false;
            }
            if (typeof origSymbol("foo") !== "symbol") {
              return false;
            }
            if (typeof Symbol("bar") !== "symbol") {
              return false;
            }
            return hasSymbolSham();
          }, "hasNativeSymbols");
        }, { "./shams": 14 }], 14: [function(require2, module3, exports3) {
          "use strict";
          module3.exports = /* @__PURE__ */ __name(function hasSymbols() {
            if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
              return false;
            }
            if (typeof Symbol.iterator === "symbol") {
              return true;
            }
            var obj = {};
            var sym = Symbol("test");
            var symObj = Object(sym);
            if (typeof sym === "string") {
              return false;
            }
            if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
              return false;
            }
            if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
              return false;
            }
            var symVal = 42;
            obj[sym] = symVal;
            for (sym in obj) {
              return false;
            }
            if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
              return false;
            }
            if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
              return false;
            }
            var syms = Object.getOwnPropertySymbols(obj);
            if (syms.length !== 1 || syms[0] !== sym) {
              return false;
            }
            if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
              return false;
            }
            if (typeof Object.getOwnPropertyDescriptor === "function") {
              var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
              if (descriptor.value !== symVal || descriptor.enumerable !== true) {
                return false;
              }
            }
            return true;
          }, "hasSymbols");
        }, {}], 15: [function(require2, module3, exports3) {
          "use strict";
          var hasSymbols = require2("has-symbols/shams");
          module3.exports = /* @__PURE__ */ __name(function hasToStringTagShams() {
            return hasSymbols() && !!Symbol.toStringTag;
          }, "hasToStringTagShams");
        }, { "has-symbols/shams": 14 }], 16: [function(require2, module3, exports3) {
          "use strict";
          var bind = require2("function-bind");
          module3.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
        }, { "function-bind": 9 }], 17: [function(require2, module3, exports3) {
          exports3.read = function(buffer, offset, isLE, mLen, nBytes) {
            var e, m;
            var eLen = nBytes * 8 - mLen - 1;
            var eMax = (1 << eLen) - 1;
            var eBias = eMax >> 1;
            var nBits = -7;
            var i = isLE ? nBytes - 1 : 0;
            var d = isLE ? -1 : 1;
            var s = buffer[offset + i];
            i += d;
            e = s & (1 << -nBits) - 1;
            s >>= -nBits;
            nBits += eLen;
            for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
            }
            m = e & (1 << -nBits) - 1;
            e >>= -nBits;
            nBits += mLen;
            for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
            }
            if (e === 0) {
              e = 1 - eBias;
            } else if (e === eMax) {
              return m ? NaN : (s ? -1 : 1) * Infinity;
            } else {
              m = m + Math.pow(2, mLen);
              e = e - eBias;
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
          };
          exports3.write = function(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c;
            var eLen = nBytes * 8 - mLen - 1;
            var eMax = (1 << eLen) - 1;
            var eBias = eMax >> 1;
            var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
            var i = isLE ? 0 : nBytes - 1;
            var d = isLE ? 1 : -1;
            var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
            value = Math.abs(value);
            if (isNaN(value) || value === Infinity) {
              m = isNaN(value) ? 1 : 0;
              e = eMax;
            } else {
              e = Math.floor(Math.log(value) / Math.LN2);
              if (value * (c = Math.pow(2, -e)) < 1) {
                e--;
                c *= 2;
              }
              if (e + eBias >= 1) {
                value += rt / c;
              } else {
                value += rt * Math.pow(2, 1 - eBias);
              }
              if (value * c >= 2) {
                e++;
                c /= 2;
              }
              if (e + eBias >= eMax) {
                m = 0;
                e = eMax;
              } else if (e + eBias >= 1) {
                m = (value * c - 1) * Math.pow(2, mLen);
                e = e + eBias;
              } else {
                m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                e = 0;
              }
            }
            for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
            }
            e = e << mLen | m;
            eLen += mLen;
            for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
            }
            buffer[offset + i - d] |= s * 128;
          };
        }, {}], 18: [function(require2, module3, exports3) {
          if (typeof Object.create === "function") {
            module3.exports = /* @__PURE__ */ __name(function inherits(ctor, superCtor) {
              if (superCtor) {
                ctor.super_ = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                  constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                  }
                });
              }
            }, "inherits");
          } else {
            module3.exports = /* @__PURE__ */ __name(function inherits(ctor, superCtor) {
              if (superCtor) {
                ctor.super_ = superCtor;
                var TempCtor = /* @__PURE__ */ __name(function() {
                }, "TempCtor");
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor();
                ctor.prototype.constructor = ctor;
              }
            }, "inherits");
          }
        }, {}], 19: [function(require2, module3, exports3) {
          "use strict";
          var hasToStringTag = require2("has-tostringtag/shams")();
          var callBound = require2("call-bind/callBound");
          var $toString = callBound("Object.prototype.toString");
          var isStandardArguments = /* @__PURE__ */ __name(function isArguments(value) {
            if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
              return false;
            }
            return $toString(value) === "[object Arguments]";
          }, "isArguments");
          var isLegacyArguments = /* @__PURE__ */ __name(function isArguments(value) {
            if (isStandardArguments(value)) {
              return true;
            }
            return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
          }, "isArguments");
          var supportsStandardArguments = function() {
            return isStandardArguments(arguments);
          }();
          isStandardArguments.isLegacyArguments = isLegacyArguments;
          module3.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
        }, { "call-bind/callBound": 5, "has-tostringtag/shams": 15 }], 20: [function(require2, module3, exports3) {
          "use strict";
          var fnToStr = Function.prototype.toString;
          var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
          var badArrayLike;
          var isCallableMarker;
          if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
            try {
              badArrayLike = Object.defineProperty({}, "length", {
                get: function() {
                  throw isCallableMarker;
                }
              });
              isCallableMarker = {};
              reflectApply(function() {
                throw 42;
              }, null, badArrayLike);
            } catch (_) {
              if (_ !== isCallableMarker) {
                reflectApply = null;
              }
            }
          } else {
            reflectApply = null;
          }
          var constructorRegex = /^\s*class\b/;
          var isES6ClassFn = /* @__PURE__ */ __name(function isES6ClassFunction(value) {
            try {
              var fnStr = fnToStr.call(value);
              return constructorRegex.test(fnStr);
            } catch (e) {
              return false;
            }
          }, "isES6ClassFunction");
          var tryFunctionObject = /* @__PURE__ */ __name(function tryFunctionToStr(value) {
            try {
              if (isES6ClassFn(value)) {
                return false;
              }
              fnToStr.call(value);
              return true;
            } catch (e) {
              return false;
            }
          }, "tryFunctionToStr");
          var toStr = Object.prototype.toString;
          var objectClass = "[object Object]";
          var fnClass = "[object Function]";
          var genClass = "[object GeneratorFunction]";
          var ddaClass = "[object HTMLAllCollection]";
          var ddaClass2 = "[object HTML document.all class]";
          var ddaClass3 = "[object HTMLCollection]";
          var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
          var isIE68 = !(0 in [,]);
          var isDDA = /* @__PURE__ */ __name(function isDocumentDotAll() {
            return false;
          }, "isDocumentDotAll");
          if (typeof document === "object") {
            var all = document.all;
            if (toStr.call(all) === toStr.call(document.all)) {
              isDDA = /* @__PURE__ */ __name(function isDocumentDotAll(value) {
                if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
                  try {
                    var str = toStr.call(value);
                    return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
                  } catch (e) {
                  }
                }
                return false;
              }, "isDocumentDotAll");
            }
          }
          module3.exports = reflectApply ? /* @__PURE__ */ __name(function isCallable(value) {
            if (isDDA(value)) {
              return true;
            }
            if (!value) {
              return false;
            }
            if (typeof value !== "function" && typeof value !== "object") {
              return false;
            }
            try {
              reflectApply(value, null, badArrayLike);
            } catch (e) {
              if (e !== isCallableMarker) {
                return false;
              }
            }
            return !isES6ClassFn(value) && tryFunctionObject(value);
          }, "isCallable") : /* @__PURE__ */ __name(function isCallable(value) {
            if (isDDA(value)) {
              return true;
            }
            if (!value) {
              return false;
            }
            if (typeof value !== "function" && typeof value !== "object") {
              return false;
            }
            if (hasToStringTag) {
              return tryFunctionObject(value);
            }
            if (isES6ClassFn(value)) {
              return false;
            }
            var strClass = toStr.call(value);
            if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
              return false;
            }
            return tryFunctionObject(value);
          }, "isCallable");
        }, {}], 21: [function(require2, module3, exports3) {
          "use strict";
          var toStr = Object.prototype.toString;
          var fnToStr = Function.prototype.toString;
          var isFnRegex = /^\s*(?:function)?\*/;
          var hasToStringTag = require2("has-tostringtag/shams")();
          var getProto = Object.getPrototypeOf;
          var getGeneratorFunc = /* @__PURE__ */ __name(function() {
            if (!hasToStringTag) {
              return false;
            }
            try {
              return Function("return function*() {}")();
            } catch (e) {
            }
          }, "getGeneratorFunc");
          var GeneratorFunction;
          module3.exports = /* @__PURE__ */ __name(function isGeneratorFunction(fn) {
            if (typeof fn !== "function") {
              return false;
            }
            if (isFnRegex.test(fnToStr.call(fn))) {
              return true;
            }
            if (!hasToStringTag) {
              var str = toStr.call(fn);
              return str === "[object GeneratorFunction]";
            }
            if (!getProto) {
              return false;
            }
            if (typeof GeneratorFunction === "undefined") {
              var generatorFunc = getGeneratorFunc();
              GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
            }
            return getProto(fn) === GeneratorFunction;
          }, "isGeneratorFunction");
        }, { "has-tostringtag/shams": 15 }], 22: [function(require2, module3, exports3) {
          (function(global2) {
            (function() {
              "use strict";
              var forEach = require2("for-each");
              var availableTypedArrays = require2("available-typed-arrays");
              var callBound = require2("call-bind/callBound");
              var $toString = callBound("Object.prototype.toString");
              var hasToStringTag = require2("has-tostringtag/shams")();
              var gOPD = require2("gopd");
              var g = typeof globalThis === "undefined" ? global2 : globalThis;
              var typedArrays = availableTypedArrays();
              var $indexOf = callBound("Array.prototype.indexOf", true) || /* @__PURE__ */ __name(function indexOf(array, value) {
                for (var i = 0; i < array.length; i += 1) {
                  if (array[i] === value) {
                    return i;
                  }
                }
                return -1;
              }, "indexOf");
              var $slice = callBound("String.prototype.slice");
              var toStrTags = {};
              var getPrototypeOf = Object.getPrototypeOf;
              if (hasToStringTag && gOPD && getPrototypeOf) {
                forEach(typedArrays, function(typedArray) {
                  var arr = new g[typedArray]();
                  if (Symbol.toStringTag in arr) {
                    var proto = getPrototypeOf(arr);
                    var descriptor = gOPD(proto, Symbol.toStringTag);
                    if (!descriptor) {
                      var superProto = getPrototypeOf(proto);
                      descriptor = gOPD(superProto, Symbol.toStringTag);
                    }
                    toStrTags[typedArray] = descriptor.get;
                  }
                });
              }
              var tryTypedArrays = /* @__PURE__ */ __name(function tryAllTypedArrays(value) {
                var anyTrue = false;
                forEach(toStrTags, function(getter, typedArray) {
                  if (!anyTrue) {
                    try {
                      anyTrue = getter.call(value) === typedArray;
                    } catch (e) {
                    }
                  }
                });
                return anyTrue;
              }, "tryAllTypedArrays");
              module3.exports = /* @__PURE__ */ __name(function isTypedArray(value) {
                if (!value || typeof value !== "object") {
                  return false;
                }
                if (!hasToStringTag || !(Symbol.toStringTag in value)) {
                  var tag = $slice($toString(value), 8, -1);
                  return $indexOf(typedArrays, tag) > -1;
                }
                if (!gOPD) {
                  return false;
                }
                return tryTypedArrays(value);
              }, "isTypedArray");
            }).call(this);
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, { "available-typed-arrays": 2, "call-bind/callBound": 5, "for-each": 7, "gopd": 11, "has-tostringtag/shams": 15 }], 23: [function(require2, module3, exports3) {
          var process = module3.exports = {};
          var cachedSetTimeout;
          var cachedClearTimeout;
          function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
          }
          __name(defaultSetTimout, "defaultSetTimout");
          function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
          }
          __name(defaultClearTimeout, "defaultClearTimeout");
          (function() {
            try {
              if (typeof setTimeout === "function") {
                cachedSetTimeout = setTimeout;
              } else {
                cachedSetTimeout = defaultSetTimout;
              }
            } catch (e) {
              cachedSetTimeout = defaultSetTimout;
            }
            try {
              if (typeof clearTimeout === "function") {
                cachedClearTimeout = clearTimeout;
              } else {
                cachedClearTimeout = defaultClearTimeout;
              }
            } catch (e) {
              cachedClearTimeout = defaultClearTimeout;
            }
          })();
          function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
              return setTimeout(fun, 0);
            }
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
              cachedSetTimeout = setTimeout;
              return setTimeout(fun, 0);
            }
            try {
              return cachedSetTimeout(fun, 0);
            } catch (e) {
              try {
                return cachedSetTimeout.call(null, fun, 0);
              } catch (e2) {
                return cachedSetTimeout.call(this, fun, 0);
              }
            }
          }
          __name(runTimeout, "runTimeout");
          function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
              return clearTimeout(marker);
            }
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
              cachedClearTimeout = clearTimeout;
              return clearTimeout(marker);
            }
            try {
              return cachedClearTimeout(marker);
            } catch (e) {
              try {
                return cachedClearTimeout.call(null, marker);
              } catch (e2) {
                return cachedClearTimeout.call(this, marker);
              }
            }
          }
          __name(runClearTimeout, "runClearTimeout");
          var queue = [];
          var draining = false;
          var currentQueue;
          var queueIndex = -1;
          function cleanUpNextTick() {
            if (!draining || !currentQueue) {
              return;
            }
            draining = false;
            if (currentQueue.length) {
              queue = currentQueue.concat(queue);
            } else {
              queueIndex = -1;
            }
            if (queue.length) {
              drainQueue();
            }
          }
          __name(cleanUpNextTick, "cleanUpNextTick");
          function drainQueue() {
            if (draining) {
              return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
              currentQueue = queue;
              queue = [];
              while (++queueIndex < len) {
                if (currentQueue) {
                  currentQueue[queueIndex].run();
                }
              }
              queueIndex = -1;
              len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
          }
          __name(drainQueue, "drainQueue");
          process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
              for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
              }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
              runTimeout(drainQueue);
            }
          };
          function Item(fun, array) {
            this.fun = fun;
            this.array = array;
          }
          __name(Item, "Item");
          Item.prototype.run = function() {
            this.fun.apply(null, this.array);
          };
          process.title = "browser";
          process.browser = true;
          process.env = {};
          process.argv = [];
          process.version = "";
          process.versions = {};
          function noop() {
          }
          __name(noop, "noop");
          process.on = noop;
          process.addListener = noop;
          process.once = noop;
          process.off = noop;
          process.removeListener = noop;
          process.removeAllListeners = noop;
          process.emit = noop;
          process.prependListener = noop;
          process.prependOnceListener = noop;
          process.listeners = function(name) {
            return [];
          };
          process.binding = function(name) {
            throw new Error("process.binding is not supported");
          };
          process.cwd = function() {
            return "/";
          };
          process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
          };
          process.umask = function() {
            return 0;
          };
        }, {}], 24: [function(require2, module3, exports3) {
          module3.exports = /* @__PURE__ */ __name(function isBuffer(arg) {
            return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
          }, "isBuffer");
        }, {}], 25: [function(require2, module3, exports3) {
          "use strict";
          var isArgumentsObject = require2("is-arguments");
          var isGeneratorFunction = require2("is-generator-function");
          var whichTypedArray = require2("which-typed-array");
          var isTypedArray = require2("is-typed-array");
          function uncurryThis(f) {
            return f.call.bind(f);
          }
          __name(uncurryThis, "uncurryThis");
          var BigIntSupported = typeof BigInt !== "undefined";
          var SymbolSupported = typeof Symbol !== "undefined";
          var ObjectToString = uncurryThis(Object.prototype.toString);
          var numberValue = uncurryThis(Number.prototype.valueOf);
          var stringValue = uncurryThis(String.prototype.valueOf);
          var booleanValue = uncurryThis(Boolean.prototype.valueOf);
          if (BigIntSupported) {
            var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
          }
          if (SymbolSupported) {
            var symbolValue = uncurryThis(Symbol.prototype.valueOf);
          }
          function checkBoxedPrimitive(value, prototypeValueOf) {
            if (typeof value !== "object") {
              return false;
            }
            try {
              prototypeValueOf(value);
              return true;
            } catch (e) {
              return false;
            }
          }
          __name(checkBoxedPrimitive, "checkBoxedPrimitive");
          exports3.isArgumentsObject = isArgumentsObject;
          exports3.isGeneratorFunction = isGeneratorFunction;
          exports3.isTypedArray = isTypedArray;
          function isPromise(input) {
            return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
          }
          __name(isPromise, "isPromise");
          exports3.isPromise = isPromise;
          function isArrayBufferView(value) {
            if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
              return ArrayBuffer.isView(value);
            }
            return isTypedArray(value) || isDataView(value);
          }
          __name(isArrayBufferView, "isArrayBufferView");
          exports3.isArrayBufferView = isArrayBufferView;
          function isUint8Array(value) {
            return whichTypedArray(value) === "Uint8Array";
          }
          __name(isUint8Array, "isUint8Array");
          exports3.isUint8Array = isUint8Array;
          function isUint8ClampedArray(value) {
            return whichTypedArray(value) === "Uint8ClampedArray";
          }
          __name(isUint8ClampedArray, "isUint8ClampedArray");
          exports3.isUint8ClampedArray = isUint8ClampedArray;
          function isUint16Array(value) {
            return whichTypedArray(value) === "Uint16Array";
          }
          __name(isUint16Array, "isUint16Array");
          exports3.isUint16Array = isUint16Array;
          function isUint32Array(value) {
            return whichTypedArray(value) === "Uint32Array";
          }
          __name(isUint32Array, "isUint32Array");
          exports3.isUint32Array = isUint32Array;
          function isInt8Array(value) {
            return whichTypedArray(value) === "Int8Array";
          }
          __name(isInt8Array, "isInt8Array");
          exports3.isInt8Array = isInt8Array;
          function isInt16Array(value) {
            return whichTypedArray(value) === "Int16Array";
          }
          __name(isInt16Array, "isInt16Array");
          exports3.isInt16Array = isInt16Array;
          function isInt32Array(value) {
            return whichTypedArray(value) === "Int32Array";
          }
          __name(isInt32Array, "isInt32Array");
          exports3.isInt32Array = isInt32Array;
          function isFloat32Array(value) {
            return whichTypedArray(value) === "Float32Array";
          }
          __name(isFloat32Array, "isFloat32Array");
          exports3.isFloat32Array = isFloat32Array;
          function isFloat64Array(value) {
            return whichTypedArray(value) === "Float64Array";
          }
          __name(isFloat64Array, "isFloat64Array");
          exports3.isFloat64Array = isFloat64Array;
          function isBigInt64Array(value) {
            return whichTypedArray(value) === "BigInt64Array";
          }
          __name(isBigInt64Array, "isBigInt64Array");
          exports3.isBigInt64Array = isBigInt64Array;
          function isBigUint64Array(value) {
            return whichTypedArray(value) === "BigUint64Array";
          }
          __name(isBigUint64Array, "isBigUint64Array");
          exports3.isBigUint64Array = isBigUint64Array;
          function isMapToString(value) {
            return ObjectToString(value) === "[object Map]";
          }
          __name(isMapToString, "isMapToString");
          isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
          function isMap(value) {
            if (typeof Map === "undefined") {
              return false;
            }
            return isMapToString.working ? isMapToString(value) : value instanceof Map;
          }
          __name(isMap, "isMap");
          exports3.isMap = isMap;
          function isSetToString(value) {
            return ObjectToString(value) === "[object Set]";
          }
          __name(isSetToString, "isSetToString");
          isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
          function isSet(value) {
            if (typeof Set === "undefined") {
              return false;
            }
            return isSetToString.working ? isSetToString(value) : value instanceof Set;
          }
          __name(isSet, "isSet");
          exports3.isSet = isSet;
          function isWeakMapToString(value) {
            return ObjectToString(value) === "[object WeakMap]";
          }
          __name(isWeakMapToString, "isWeakMapToString");
          isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
          function isWeakMap(value) {
            if (typeof WeakMap === "undefined") {
              return false;
            }
            return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
          }
          __name(isWeakMap, "isWeakMap");
          exports3.isWeakMap = isWeakMap;
          function isWeakSetToString(value) {
            return ObjectToString(value) === "[object WeakSet]";
          }
          __name(isWeakSetToString, "isWeakSetToString");
          isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
          function isWeakSet(value) {
            return isWeakSetToString(value);
          }
          __name(isWeakSet, "isWeakSet");
          exports3.isWeakSet = isWeakSet;
          function isArrayBufferToString(value) {
            return ObjectToString(value) === "[object ArrayBuffer]";
          }
          __name(isArrayBufferToString, "isArrayBufferToString");
          isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
          function isArrayBuffer(value) {
            if (typeof ArrayBuffer === "undefined") {
              return false;
            }
            return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
          }
          __name(isArrayBuffer, "isArrayBuffer");
          exports3.isArrayBuffer = isArrayBuffer;
          function isDataViewToString(value) {
            return ObjectToString(value) === "[object DataView]";
          }
          __name(isDataViewToString, "isDataViewToString");
          isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
          function isDataView(value) {
            if (typeof DataView === "undefined") {
              return false;
            }
            return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
          }
          __name(isDataView, "isDataView");
          exports3.isDataView = isDataView;
          var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
          function isSharedArrayBufferToString(value) {
            return ObjectToString(value) === "[object SharedArrayBuffer]";
          }
          __name(isSharedArrayBufferToString, "isSharedArrayBufferToString");
          function isSharedArrayBuffer(value) {
            if (typeof SharedArrayBufferCopy === "undefined") {
              return false;
            }
            if (typeof isSharedArrayBufferToString.working === "undefined") {
              isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
            }
            return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
          }
          __name(isSharedArrayBuffer, "isSharedArrayBuffer");
          exports3.isSharedArrayBuffer = isSharedArrayBuffer;
          function isAsyncFunction(value) {
            return ObjectToString(value) === "[object AsyncFunction]";
          }
          __name(isAsyncFunction, "isAsyncFunction");
          exports3.isAsyncFunction = isAsyncFunction;
          function isMapIterator(value) {
            return ObjectToString(value) === "[object Map Iterator]";
          }
          __name(isMapIterator, "isMapIterator");
          exports3.isMapIterator = isMapIterator;
          function isSetIterator(value) {
            return ObjectToString(value) === "[object Set Iterator]";
          }
          __name(isSetIterator, "isSetIterator");
          exports3.isSetIterator = isSetIterator;
          function isGeneratorObject(value) {
            return ObjectToString(value) === "[object Generator]";
          }
          __name(isGeneratorObject, "isGeneratorObject");
          exports3.isGeneratorObject = isGeneratorObject;
          function isWebAssemblyCompiledModule(value) {
            return ObjectToString(value) === "[object WebAssembly.Module]";
          }
          __name(isWebAssemblyCompiledModule, "isWebAssemblyCompiledModule");
          exports3.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
          function isNumberObject(value) {
            return checkBoxedPrimitive(value, numberValue);
          }
          __name(isNumberObject, "isNumberObject");
          exports3.isNumberObject = isNumberObject;
          function isStringObject(value) {
            return checkBoxedPrimitive(value, stringValue);
          }
          __name(isStringObject, "isStringObject");
          exports3.isStringObject = isStringObject;
          function isBooleanObject(value) {
            return checkBoxedPrimitive(value, booleanValue);
          }
          __name(isBooleanObject, "isBooleanObject");
          exports3.isBooleanObject = isBooleanObject;
          function isBigIntObject(value) {
            return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
          }
          __name(isBigIntObject, "isBigIntObject");
          exports3.isBigIntObject = isBigIntObject;
          function isSymbolObject(value) {
            return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
          }
          __name(isSymbolObject, "isSymbolObject");
          exports3.isSymbolObject = isSymbolObject;
          function isBoxedPrimitive(value) {
            return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
          }
          __name(isBoxedPrimitive, "isBoxedPrimitive");
          exports3.isBoxedPrimitive = isBoxedPrimitive;
          function isAnyArrayBuffer(value) {
            return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
          }
          __name(isAnyArrayBuffer, "isAnyArrayBuffer");
          exports3.isAnyArrayBuffer = isAnyArrayBuffer;
          ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
            Object.defineProperty(exports3, method, {
              enumerable: false,
              value: function() {
                throw new Error(method + " is not supported in userland");
              }
            });
          });
        }, { "is-arguments": 19, "is-generator-function": 21, "is-typed-array": 22, "which-typed-array": 27 }], 26: [function(require2, module3, exports3) {
          (function(process) {
            (function() {
              var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || /* @__PURE__ */ __name(function getOwnPropertyDescriptors2(obj) {
                var keys = Object.keys(obj);
                var descriptors = {};
                for (var i = 0; i < keys.length; i++) {
                  descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
                }
                return descriptors;
              }, "getOwnPropertyDescriptors");
              var formatRegExp = /%[sdj%]/g;
              exports3.format = function(f) {
                if (!isString(f)) {
                  var objects = [];
                  for (var i = 0; i < arguments.length; i++) {
                    objects.push(inspect(arguments[i]));
                  }
                  return objects.join(" ");
                }
                var i = 1;
                var args = arguments;
                var len = args.length;
                var str = String(f).replace(formatRegExp, function(x2) {
                  if (x2 === "%%")
                    return "%";
                  if (i >= len)
                    return x2;
                  switch (x2) {
                    case "%s":
                      return String(args[i++]);
                    case "%d":
                      return Number(args[i++]);
                    case "%j":
                      try {
                        return JSON.stringify(args[i++]);
                      } catch (_) {
                        return "[Circular]";
                      }
                    default:
                      return x2;
                  }
                });
                for (var x = args[i]; i < len; x = args[++i]) {
                  if (isNull(x) || !isObject(x)) {
                    str += " " + x;
                  } else {
                    str += " " + inspect(x);
                  }
                }
                return str;
              };
              exports3.deprecate = function(fn, msg) {
                if (typeof process !== "undefined" && process.noDeprecation === true) {
                  return fn;
                }
                if (typeof process === "undefined") {
                  return function() {
                    return exports3.deprecate(fn, msg).apply(this, arguments);
                  };
                }
                var warned = false;
                function deprecated() {
                  if (!warned) {
                    if (process.throwDeprecation) {
                      throw new Error(msg);
                    } else if (process.traceDeprecation) {
                      console.trace(msg);
                    } else {
                      console.error(msg);
                    }
                    warned = true;
                  }
                  return fn.apply(this, arguments);
                }
                __name(deprecated, "deprecated");
                return deprecated;
              };
              var debugs = {};
              var debugEnvRegex = /^$/;
              if (process.env.NODE_DEBUG) {
                var debugEnv = process.env.NODE_DEBUG;
                debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
                debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
              }
              exports3.debuglog = function(set) {
                set = set.toUpperCase();
                if (!debugs[set]) {
                  if (debugEnvRegex.test(set)) {
                    var pid = process.pid;
                    debugs[set] = function() {
                      var msg = exports3.format.apply(exports3, arguments);
                      console.error("%s %d: %s", set, pid, msg);
                    };
                  } else {
                    debugs[set] = function() {
                    };
                  }
                }
                return debugs[set];
              };
              function inspect(obj, opts) {
                var ctx = {
                  seen: [],
                  stylize: stylizeNoColor
                };
                if (arguments.length >= 3)
                  ctx.depth = arguments[2];
                if (arguments.length >= 4)
                  ctx.colors = arguments[3];
                if (isBoolean(opts)) {
                  ctx.showHidden = opts;
                } else if (opts) {
                  exports3._extend(ctx, opts);
                }
                if (isUndefined(ctx.showHidden))
                  ctx.showHidden = false;
                if (isUndefined(ctx.depth))
                  ctx.depth = 2;
                if (isUndefined(ctx.colors))
                  ctx.colors = false;
                if (isUndefined(ctx.customInspect))
                  ctx.customInspect = true;
                if (ctx.colors)
                  ctx.stylize = stylizeWithColor;
                return formatValue(ctx, obj, ctx.depth);
              }
              __name(inspect, "inspect");
              exports3.inspect = inspect;
              inspect.colors = {
                "bold": [1, 22],
                "italic": [3, 23],
                "underline": [4, 24],
                "inverse": [7, 27],
                "white": [37, 39],
                "grey": [90, 39],
                "black": [30, 39],
                "blue": [34, 39],
                "cyan": [36, 39],
                "green": [32, 39],
                "magenta": [35, 39],
                "red": [31, 39],
                "yellow": [33, 39]
              };
              inspect.styles = {
                "special": "cyan",
                "number": "yellow",
                "boolean": "yellow",
                "undefined": "grey",
                "null": "bold",
                "string": "green",
                "date": "magenta",
                // "name": intentionally not styling
                "regexp": "red"
              };
              function stylizeWithColor(str, styleType) {
                var style = inspect.styles[styleType];
                if (style) {
                  return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
                } else {
                  return str;
                }
              }
              __name(stylizeWithColor, "stylizeWithColor");
              function stylizeNoColor(str, styleType) {
                return str;
              }
              __name(stylizeNoColor, "stylizeNoColor");
              function arrayToHash(array) {
                var hash = {};
                array.forEach(function(val, idx) {
                  hash[val] = true;
                });
                return hash;
              }
              __name(arrayToHash, "arrayToHash");
              function formatValue(ctx, value, recurseTimes) {
                if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
                value.inspect !== exports3.inspect && // Also filter out any prototype objects using the circular check.
                !(value.constructor && value.constructor.prototype === value)) {
                  var ret = value.inspect(recurseTimes, ctx);
                  if (!isString(ret)) {
                    ret = formatValue(ctx, ret, recurseTimes);
                  }
                  return ret;
                }
                var primitive = formatPrimitive(ctx, value);
                if (primitive) {
                  return primitive;
                }
                var keys = Object.keys(value);
                var visibleKeys = arrayToHash(keys);
                if (ctx.showHidden) {
                  keys = Object.getOwnPropertyNames(value);
                }
                if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
                  return formatError(value);
                }
                if (keys.length === 0) {
                  if (isFunction(value)) {
                    var name = value.name ? ": " + value.name : "";
                    return ctx.stylize("[Function" + name + "]", "special");
                  }
                  if (isRegExp(value)) {
                    return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                  }
                  if (isDate(value)) {
                    return ctx.stylize(Date.prototype.toString.call(value), "date");
                  }
                  if (isError(value)) {
                    return formatError(value);
                  }
                }
                var base = "", array = false, braces = ["{", "}"];
                if (isArray(value)) {
                  array = true;
                  braces = ["[", "]"];
                }
                if (isFunction(value)) {
                  var n = value.name ? ": " + value.name : "";
                  base = " [Function" + n + "]";
                }
                if (isRegExp(value)) {
                  base = " " + RegExp.prototype.toString.call(value);
                }
                if (isDate(value)) {
                  base = " " + Date.prototype.toUTCString.call(value);
                }
                if (isError(value)) {
                  base = " " + formatError(value);
                }
                if (keys.length === 0 && (!array || value.length == 0)) {
                  return braces[0] + base + braces[1];
                }
                if (recurseTimes < 0) {
                  if (isRegExp(value)) {
                    return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                  } else {
                    return ctx.stylize("[Object]", "special");
                  }
                }
                ctx.seen.push(value);
                var output;
                if (array) {
                  output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
                } else {
                  output = keys.map(function(key) {
                    return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                  });
                }
                ctx.seen.pop();
                return reduceToSingleString(output, base, braces);
              }
              __name(formatValue, "formatValue");
              function formatPrimitive(ctx, value) {
                if (isUndefined(value))
                  return ctx.stylize("undefined", "undefined");
                if (isString(value)) {
                  var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                  return ctx.stylize(simple, "string");
                }
                if (isNumber(value))
                  return ctx.stylize("" + value, "number");
                if (isBoolean(value))
                  return ctx.stylize("" + value, "boolean");
                if (isNull(value))
                  return ctx.stylize("null", "null");
              }
              __name(formatPrimitive, "formatPrimitive");
              function formatError(value) {
                return "[" + Error.prototype.toString.call(value) + "]";
              }
              __name(formatError, "formatError");
              function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                var output = [];
                for (var i = 0, l = value.length; i < l; ++i) {
                  if (hasOwnProperty(value, String(i))) {
                    output.push(formatProperty(
                      ctx,
                      value,
                      recurseTimes,
                      visibleKeys,
                      String(i),
                      true
                    ));
                  } else {
                    output.push("");
                  }
                }
                keys.forEach(function(key) {
                  if (!key.match(/^\d+$/)) {
                    output.push(formatProperty(
                      ctx,
                      value,
                      recurseTimes,
                      visibleKeys,
                      key,
                      true
                    ));
                  }
                });
                return output;
              }
              __name(formatArray, "formatArray");
              function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                var name, str, desc;
                desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
                if (desc.get) {
                  if (desc.set) {
                    str = ctx.stylize("[Getter/Setter]", "special");
                  } else {
                    str = ctx.stylize("[Getter]", "special");
                  }
                } else {
                  if (desc.set) {
                    str = ctx.stylize("[Setter]", "special");
                  }
                }
                if (!hasOwnProperty(visibleKeys, key)) {
                  name = "[" + key + "]";
                }
                if (!str) {
                  if (ctx.seen.indexOf(desc.value) < 0) {
                    if (isNull(recurseTimes)) {
                      str = formatValue(ctx, desc.value, null);
                    } else {
                      str = formatValue(ctx, desc.value, recurseTimes - 1);
                    }
                    if (str.indexOf("\n") > -1) {
                      if (array) {
                        str = str.split("\n").map(function(line) {
                          return "  " + line;
                        }).join("\n").slice(2);
                      } else {
                        str = "\n" + str.split("\n").map(function(line) {
                          return "   " + line;
                        }).join("\n");
                      }
                    }
                  } else {
                    str = ctx.stylize("[Circular]", "special");
                  }
                }
                if (isUndefined(name)) {
                  if (array && key.match(/^\d+$/)) {
                    return str;
                  }
                  name = JSON.stringify("" + key);
                  if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                    name = name.slice(1, -1);
                    name = ctx.stylize(name, "name");
                  } else {
                    name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                    name = ctx.stylize(name, "string");
                  }
                }
                return name + ": " + str;
              }
              __name(formatProperty, "formatProperty");
              function reduceToSingleString(output, base, braces) {
                var numLinesEst = 0;
                var length = output.reduce(function(prev, cur) {
                  numLinesEst++;
                  if (cur.indexOf("\n") >= 0)
                    numLinesEst++;
                  return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
                }, 0);
                if (length > 60) {
                  return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
                }
                return braces[0] + base + " " + output.join(", ") + " " + braces[1];
              }
              __name(reduceToSingleString, "reduceToSingleString");
              exports3.types = require2("./support/types");
              function isArray(ar) {
                return Array.isArray(ar);
              }
              __name(isArray, "isArray");
              exports3.isArray = isArray;
              function isBoolean(arg) {
                return typeof arg === "boolean";
              }
              __name(isBoolean, "isBoolean");
              exports3.isBoolean = isBoolean;
              function isNull(arg) {
                return arg === null;
              }
              __name(isNull, "isNull");
              exports3.isNull = isNull;
              function isNullOrUndefined(arg) {
                return arg == null;
              }
              __name(isNullOrUndefined, "isNullOrUndefined");
              exports3.isNullOrUndefined = isNullOrUndefined;
              function isNumber(arg) {
                return typeof arg === "number";
              }
              __name(isNumber, "isNumber");
              exports3.isNumber = isNumber;
              function isString(arg) {
                return typeof arg === "string";
              }
              __name(isString, "isString");
              exports3.isString = isString;
              function isSymbol(arg) {
                return typeof arg === "symbol";
              }
              __name(isSymbol, "isSymbol");
              exports3.isSymbol = isSymbol;
              function isUndefined(arg) {
                return arg === void 0;
              }
              __name(isUndefined, "isUndefined");
              exports3.isUndefined = isUndefined;
              function isRegExp(re) {
                return isObject(re) && objectToString(re) === "[object RegExp]";
              }
              __name(isRegExp, "isRegExp");
              exports3.isRegExp = isRegExp;
              exports3.types.isRegExp = isRegExp;
              function isObject(arg) {
                return typeof arg === "object" && arg !== null;
              }
              __name(isObject, "isObject");
              exports3.isObject = isObject;
              function isDate(d) {
                return isObject(d) && objectToString(d) === "[object Date]";
              }
              __name(isDate, "isDate");
              exports3.isDate = isDate;
              exports3.types.isDate = isDate;
              function isError(e) {
                return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
              }
              __name(isError, "isError");
              exports3.isError = isError;
              exports3.types.isNativeError = isError;
              function isFunction(arg) {
                return typeof arg === "function";
              }
              __name(isFunction, "isFunction");
              exports3.isFunction = isFunction;
              function isPrimitive(arg) {
                return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
                typeof arg === "undefined";
              }
              __name(isPrimitive, "isPrimitive");
              exports3.isPrimitive = isPrimitive;
              exports3.isBuffer = require2("./support/isBuffer");
              function objectToString(o) {
                return Object.prototype.toString.call(o);
              }
              __name(objectToString, "objectToString");
              function pad(n) {
                return n < 10 ? "0" + n.toString(10) : n.toString(10);
              }
              __name(pad, "pad");
              var months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ];
              function timestamp() {
                var d = /* @__PURE__ */ new Date();
                var time = [
                  pad(d.getHours()),
                  pad(d.getMinutes()),
                  pad(d.getSeconds())
                ].join(":");
                return [d.getDate(), months[d.getMonth()], time].join(" ");
              }
              __name(timestamp, "timestamp");
              exports3.log = function() {
                console.log("%s - %s", timestamp(), exports3.format.apply(exports3, arguments));
              };
              exports3.inherits = require2("inherits");
              exports3._extend = function(origin, add) {
                if (!add || !isObject(add))
                  return origin;
                var keys = Object.keys(add);
                var i = keys.length;
                while (i--) {
                  origin[keys[i]] = add[keys[i]];
                }
                return origin;
              };
              function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
              }
              __name(hasOwnProperty, "hasOwnProperty");
              var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
              exports3.promisify = /* @__PURE__ */ __name(function promisify(original) {
                if (typeof original !== "function")
                  throw new TypeError('The "original" argument must be of type Function');
                if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
                  var fn = original[kCustomPromisifiedSymbol];
                  if (typeof fn !== "function") {
                    throw new TypeError('The "util.promisify.custom" argument must be of type Function');
                  }
                  Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                    value: fn,
                    enumerable: false,
                    writable: false,
                    configurable: true
                  });
                  return fn;
                }
                function fn() {
                  var promiseResolve, promiseReject;
                  var promise = new Promise(function(resolve, reject) {
                    promiseResolve = resolve;
                    promiseReject = reject;
                  });
                  var args = [];
                  for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                  }
                  args.push(function(err, value) {
                    if (err) {
                      promiseReject(err);
                    } else {
                      promiseResolve(value);
                    }
                  });
                  try {
                    original.apply(this, args);
                  } catch (err) {
                    promiseReject(err);
                  }
                  return promise;
                }
                __name(fn, "fn");
                Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
                if (kCustomPromisifiedSymbol)
                  Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                    value: fn,
                    enumerable: false,
                    writable: false,
                    configurable: true
                  });
                return Object.defineProperties(
                  fn,
                  getOwnPropertyDescriptors(original)
                );
              }, "promisify");
              exports3.promisify.custom = kCustomPromisifiedSymbol;
              function callbackifyOnRejected(reason, cb) {
                if (!reason) {
                  var newReason = new Error("Promise was rejected with a falsy value");
                  newReason.reason = reason;
                  reason = newReason;
                }
                return cb(reason);
              }
              __name(callbackifyOnRejected, "callbackifyOnRejected");
              function callbackify(original) {
                if (typeof original !== "function") {
                  throw new TypeError('The "original" argument must be of type Function');
                }
                function callbackified() {
                  var args = [];
                  for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                  }
                  var maybeCb = args.pop();
                  if (typeof maybeCb !== "function") {
                    throw new TypeError("The last argument must be of type Function");
                  }
                  var self2 = this;
                  var cb = /* @__PURE__ */ __name(function() {
                    return maybeCb.apply(self2, arguments);
                  }, "cb");
                  original.apply(this, args).then(
                    function(ret) {
                      process.nextTick(cb.bind(null, null, ret));
                    },
                    function(rej) {
                      process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
                    }
                  );
                }
                __name(callbackified, "callbackified");
                Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
                Object.defineProperties(
                  callbackified,
                  getOwnPropertyDescriptors(original)
                );
                return callbackified;
              }
              __name(callbackify, "callbackify");
              exports3.callbackify = callbackify;
            }).call(this);
          }).call(this, require2("_process"));
        }, { "./support/isBuffer": 24, "./support/types": 25, "_process": 23, "inherits": 18 }], 27: [function(require2, module3, exports3) {
          (function(global2) {
            (function() {
              "use strict";
              var forEach = require2("for-each");
              var availableTypedArrays = require2("available-typed-arrays");
              var callBound = require2("call-bind/callBound");
              var gOPD = require2("gopd");
              var $toString = callBound("Object.prototype.toString");
              var hasToStringTag = require2("has-tostringtag/shams")();
              var g = typeof globalThis === "undefined" ? global2 : globalThis;
              var typedArrays = availableTypedArrays();
              var $slice = callBound("String.prototype.slice");
              var toStrTags = {};
              var getPrototypeOf = Object.getPrototypeOf;
              if (hasToStringTag && gOPD && getPrototypeOf) {
                forEach(typedArrays, function(typedArray) {
                  if (typeof g[typedArray] === "function") {
                    var arr = new g[typedArray]();
                    if (Symbol.toStringTag in arr) {
                      var proto = getPrototypeOf(arr);
                      var descriptor = gOPD(proto, Symbol.toStringTag);
                      if (!descriptor) {
                        var superProto = getPrototypeOf(proto);
                        descriptor = gOPD(superProto, Symbol.toStringTag);
                      }
                      toStrTags[typedArray] = descriptor.get;
                    }
                  }
                });
              }
              var tryTypedArrays = /* @__PURE__ */ __name(function tryAllTypedArrays(value) {
                var foundName = false;
                forEach(toStrTags, function(getter, typedArray) {
                  if (!foundName) {
                    try {
                      var name = getter.call(value);
                      if (name === typedArray) {
                        foundName = name;
                      }
                    } catch (e) {
                    }
                  }
                });
                return foundName;
              }, "tryAllTypedArrays");
              var isTypedArray = require2("is-typed-array");
              module3.exports = /* @__PURE__ */ __name(function whichTypedArray(value) {
                if (!isTypedArray(value)) {
                  return false;
                }
                if (!hasToStringTag || !(Symbol.toStringTag in value)) {
                  return $slice($toString(value), 8, -1);
                }
                return tryTypedArrays(value);
              }, "whichTypedArray");
            }).call(this);
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, { "available-typed-arrays": 2, "call-bind/callBound": 5, "for-each": 7, "gopd": 11, "has-tostringtag/shams": 15, "is-typed-array": 22 }] }, {}, [1])(1);
      });
    }
  });
  return require_browserify_bundle();
})();
/*! Bundled license information:

pascalcase/index.js:
  (*!
   * pascalcase <https://github.com/jonschlinkert/pascalcase>
   *
   * Copyright (c) 2015-present, Jon ("Schlink") Schlinkert.
   * Licensed under the MIT License.
   *)
*/
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */