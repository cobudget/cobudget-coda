'use strict';
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/mersenne-twister/src/mersenne-twister.js
var require_mersenne_twister = __commonJS({
  "node_modules/mersenne-twister/src/mersenne-twister.js"(exports, module2) {
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
    module2.exports = MersenneTwister2;
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

// node_modules/@codahq/packs-sdk/dist/types.js
var require_types = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/types.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SyncInterval = exports.QuotaLimitType = exports.FeatureSet = exports.TokenExchangeCredentialsLocation = exports.PostSetupType = exports.AuthenticationType = exports.PackCategory = void 0;
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
    })(PackCategory = exports.PackCategory || (exports.PackCategory = {}));
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
    })(AuthenticationType = exports.AuthenticationType || (exports.AuthenticationType = {}));
    var PostSetupType;
    (function(PostSetupType2) {
      PostSetupType2["SetEndpoint"] = "SetEndPoint";
    })(PostSetupType = exports.PostSetupType || (exports.PostSetupType = {}));
    var TokenExchangeCredentialsLocation;
    (function(TokenExchangeCredentialsLocation2) {
      TokenExchangeCredentialsLocation2["Automatic"] = "Automatic";
      TokenExchangeCredentialsLocation2["Body"] = "Body";
      TokenExchangeCredentialsLocation2["AuthorizationHeader"] = "AuthorizationHeader";
    })(TokenExchangeCredentialsLocation = exports.TokenExchangeCredentialsLocation || (exports.TokenExchangeCredentialsLocation = {}));
    var FeatureSet;
    (function(FeatureSet2) {
      FeatureSet2["Basic"] = "Basic";
      FeatureSet2["Pro"] = "Pro";
      FeatureSet2["Team"] = "Team";
      FeatureSet2["Enterprise"] = "Enterprise";
    })(FeatureSet = exports.FeatureSet || (exports.FeatureSet = {}));
    var QuotaLimitType;
    (function(QuotaLimitType2) {
      QuotaLimitType2["Action"] = "Action";
      QuotaLimitType2["Getter"] = "Getter";
      QuotaLimitType2["Sync"] = "Sync";
      QuotaLimitType2["Metadata"] = "Metadata";
    })(QuotaLimitType = exports.QuotaLimitType || (exports.QuotaLimitType = {}));
    var SyncInterval;
    (function(SyncInterval2) {
      SyncInterval2["Manual"] = "Manual";
      SyncInterval2["Daily"] = "Daily";
      SyncInterval2["Hourly"] = "Hourly";
      SyncInterval2["EveryTenMinutes"] = "EveryTenMinutes";
    })(SyncInterval = exports.SyncInterval || (exports.SyncInterval = {}));
  }
});

// node_modules/@codahq/packs-sdk/dist/api_types.js
var require_api_types = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/api_types.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrecannedDateRange = exports.ValidFetchMethods = exports.NetworkConnection = exports.ConnectionRequirement = exports.ParameterTypeInputMap = exports.ParameterType = exports.fileArray = exports.imageArray = exports.htmlArray = exports.dateArray = exports.booleanArray = exports.numberArray = exports.stringArray = exports.isArrayType = exports.Type = void 0;
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
    })(Type = exports.Type || (exports.Type = {}));
    function isArrayType(obj) {
      return obj && obj.type === "array" && typeof obj.items === "number";
    }
    __name(isArrayType, "isArrayType");
    exports.isArrayType = isArrayType;
    exports.stringArray = {
      type: "array",
      items: Type.string
    };
    exports.numberArray = {
      type: "array",
      items: Type.number
    };
    exports.booleanArray = {
      type: "array",
      items: Type.boolean
    };
    exports.dateArray = {
      type: "array",
      items: Type.date
    };
    exports.htmlArray = {
      type: "array",
      items: Type.html
    };
    exports.imageArray = {
      type: "array",
      items: Type.image
    };
    exports.fileArray = {
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
    })(ParameterType2 = exports.ParameterType || (exports.ParameterType = {}));
    exports.ParameterTypeInputMap = {
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
    })(ConnectionRequirement = exports.ConnectionRequirement || (exports.ConnectionRequirement = {}));
    var NetworkConnection;
    (function(NetworkConnection2) {
      NetworkConnection2["None"] = "none";
      NetworkConnection2["Optional"] = "optional";
      NetworkConnection2["Required"] = "required";
    })(NetworkConnection = exports.NetworkConnection || (exports.NetworkConnection = {}));
    exports.ValidFetchMethods = ["GET", "PATCH", "POST", "PUT", "DELETE", "HEAD"];
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
    })(PrecannedDateRange = exports.PrecannedDateRange || (exports.PrecannedDateRange = {}));
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/ensure.js
var require_ensure = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/ensure.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertCondition = exports.ensureExists = exports.ensureNonEmptyString = exports.ensureUnreachable = void 0;
    var api_1 = require_api();
    function ensureUnreachable(value, message) {
      throw new Error(message || `Unreachable code hit with value ${String(value)}`);
    }
    __name(ensureUnreachable, "ensureUnreachable");
    exports.ensureUnreachable = ensureUnreachable;
    function ensureNonEmptyString(value, message) {
      if (typeof value !== "string" || value.length === 0) {
        throw new (getErrorConstructor(message))(message || `Expected non-empty string for ${String(value)}`);
      }
      return value;
    }
    __name(ensureNonEmptyString, "ensureNonEmptyString");
    exports.ensureNonEmptyString = ensureNonEmptyString;
    function ensureExists(value, message) {
      if (typeof value === "undefined" || value === null) {
        throw new (getErrorConstructor(message))(message || `Expected value for ${String(value)}`);
      }
      return value;
    }
    __name(ensureExists, "ensureExists");
    exports.ensureExists = ensureExists;
    function getErrorConstructor(message) {
      return message ? api_1.UserVisibleError : Error;
    }
    __name(getErrorConstructor, "getErrorConstructor");
    function assertCondition(condition, message) {
      if (!condition) {
        throw new (getErrorConstructor(message))(message || "Assertion failed");
      }
    }
    __name(assertCondition, "assertCondition");
    exports.assertCondition = assertCondition;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/object_utils.js
var require_object_utils = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/object_utils.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPromise = exports.deepCopy = exports.isNil = exports.isDefined = exports.deepFreeze = void 0;
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
    exports.deepFreeze = deepFreeze;
    function isDefined(obj) {
      return !isNil(obj);
    }
    __name(isDefined, "isDefined");
    exports.isDefined = isDefined;
    function isNil(obj) {
      return typeof obj === "undefined" || obj === null;
    }
    __name(isNil, "isNil");
    exports.isNil = isNil;
    function deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    __name(deepCopy, "deepCopy");
    exports.deepCopy = deepCopy;
    function isPromise(obj) {
      return obj && typeof obj === "object" && "then" in obj;
    }
    __name(isPromise, "isPromise");
    exports.isPromise = isPromise;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/migration.js
var require_migration = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/migration.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.postSetupMetadataHelper = exports.setEndpointDefHelper = exports.setEndpointHelper = exports.paramDefHelper = exports.objectSchemaHelper = void 0;
    var ensure_1 = require_ensure();
    function objectSchemaHelper(schema) {
      return new ObjectSchemaHelper(schema);
    }
    __name(objectSchemaHelper, "objectSchemaHelper");
    exports.objectSchemaHelper = objectSchemaHelper;
    var ObjectSchemaHelper = class {
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
    };
    __name(ObjectSchemaHelper, "ObjectSchemaHelper");
    function paramDefHelper(def) {
      return new ParamDefHelper(def);
    }
    __name(paramDefHelper, "paramDefHelper");
    exports.paramDefHelper = paramDefHelper;
    var ParamDefHelper = class {
      constructor(def) {
        this._def = def;
      }
      get defaultValue() {
        var _a;
        return (_a = this._def.suggestedValue) !== null && _a !== void 0 ? _a : this._def.defaultValue;
      }
    };
    __name(ParamDefHelper, "ParamDefHelper");
    function setEndpointHelper(step) {
      return new SetEndpointHelper(step);
    }
    __name(setEndpointHelper, "setEndpointHelper");
    exports.setEndpointHelper = setEndpointHelper;
    var SetEndpointHelper = class {
      constructor(step) {
        this._step = step;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._step.getOptions) !== null && _a !== void 0 ? _a : this._step.getOptionsFormula);
      }
    };
    __name(SetEndpointHelper, "SetEndpointHelper");
    function setEndpointDefHelper(step) {
      return new SetEndpointDefHelper(step);
    }
    __name(setEndpointDefHelper, "setEndpointDefHelper");
    exports.setEndpointDefHelper = setEndpointDefHelper;
    var SetEndpointDefHelper = class {
      constructor(step) {
        this._step = step;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._step.getOptions) !== null && _a !== void 0 ? _a : this._step.getOptionsFormula);
      }
    };
    __name(SetEndpointDefHelper, "SetEndpointDefHelper");
    function postSetupMetadataHelper(metadata) {
      return new PostSetupMetadataHelper(metadata);
    }
    __name(postSetupMetadataHelper, "postSetupMetadataHelper");
    exports.postSetupMetadataHelper = postSetupMetadataHelper;
    var PostSetupMetadataHelper = class {
      constructor(metadata) {
        this._metadata = metadata;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._metadata.getOptions) !== null && _a !== void 0 ? _a : this._metadata.getOptionsFormula);
      }
    };
    __name(PostSetupMetadataHelper, "PostSetupMetadataHelper");
  }
});

// node_modules/pascalcase/index.js
var require_pascalcase = __commonJS({
  "node_modules/pascalcase/index.js"(exports, module2) {
    init_crypto_shim();
    var titlecase = /* @__PURE__ */ __name((input) => input[0].toLocaleUpperCase() + input.slice(1), "titlecase");
    module2.exports = (value) => {
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

// node_modules/@codahq/packs-sdk/dist/schema.js
var require_schema = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/schema.js"(exports) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withIdentity = exports.makeReferenceSchemaFromObjectSchema = exports.normalizeSchema = exports.normalizePropertyValuePathIntoSchemaPath = exports.normalizeSchemaKeyPath = exports.normalizeSchemaKey = exports.makeObjectSchema = exports.makeSchema = exports.generateSchema = exports.isArray = exports.isObject = exports.makeAttributionNode = exports.AttributionNodeType = exports.PropertyLabelValueTemplate = exports.SimpleStringHintValueTypes = exports.DurationUnit = exports.ImageCornerStyle = exports.ImageOutline = exports.LinkDisplayType = exports.EmailDisplayType = exports.ScaleIconSet = exports.CurrencyFormat = exports.ObjectHintValueTypes = exports.BooleanHintValueTypes = exports.NumberHintValueTypes = exports.StringHintValueTypes = exports.ValueHintType = exports.ValueType = void 0;
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
    })(ValueType2 = exports.ValueType || (exports.ValueType = {}));
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
    })(ValueHintType = exports.ValueHintType || (exports.ValueHintType = {}));
    exports.StringHintValueTypes = [
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
    exports.NumberHintValueTypes = [
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
    exports.BooleanHintValueTypes = [ValueHintType.Toggle];
    exports.ObjectHintValueTypes = [ValueHintType.Person, ValueHintType.Reference];
    var CurrencyFormat;
    (function(CurrencyFormat2) {
      CurrencyFormat2["Currency"] = "currency";
      CurrencyFormat2["Accounting"] = "accounting";
      CurrencyFormat2["Financial"] = "financial";
    })(CurrencyFormat = exports.CurrencyFormat || (exports.CurrencyFormat = {}));
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
    })(ScaleIconSet = exports.ScaleIconSet || (exports.ScaleIconSet = {}));
    var EmailDisplayType;
    (function(EmailDisplayType2) {
      EmailDisplayType2["IconAndEmail"] = "iconAndEmail";
      EmailDisplayType2["IconOnly"] = "iconOnly";
      EmailDisplayType2["EmailOnly"] = "emailOnly";
    })(EmailDisplayType = exports.EmailDisplayType || (exports.EmailDisplayType = {}));
    var LinkDisplayType;
    (function(LinkDisplayType2) {
      LinkDisplayType2["IconOnly"] = "iconOnly";
      LinkDisplayType2["Url"] = "url";
      LinkDisplayType2["Title"] = "title";
      LinkDisplayType2["Card"] = "card";
      LinkDisplayType2["Embed"] = "embed";
    })(LinkDisplayType = exports.LinkDisplayType || (exports.LinkDisplayType = {}));
    var ImageOutline;
    (function(ImageOutline2) {
      ImageOutline2["Disabled"] = "disabled";
      ImageOutline2["Solid"] = "solid";
    })(ImageOutline = exports.ImageOutline || (exports.ImageOutline = {}));
    var ImageCornerStyle;
    (function(ImageCornerStyle2) {
      ImageCornerStyle2["Rounded"] = "rounded";
      ImageCornerStyle2["Square"] = "square";
    })(ImageCornerStyle = exports.ImageCornerStyle || (exports.ImageCornerStyle = {}));
    var DurationUnit;
    (function(DurationUnit2) {
      DurationUnit2["Days"] = "days";
      DurationUnit2["Hours"] = "hours";
      DurationUnit2["Minutes"] = "minutes";
      DurationUnit2["Seconds"] = "seconds";
    })(DurationUnit = exports.DurationUnit || (exports.DurationUnit = {}));
    exports.SimpleStringHintValueTypes = [
      ValueHintType.Attachment,
      ValueHintType.Html,
      ValueHintType.Markdown,
      ValueHintType.Url,
      ValueHintType.Email
    ];
    exports.PropertyLabelValueTemplate = "{VALUE}";
    var AttributionNodeType;
    (function(AttributionNodeType2) {
      AttributionNodeType2[AttributionNodeType2["Text"] = 1] = "Text";
      AttributionNodeType2[AttributionNodeType2["Link"] = 2] = "Link";
      AttributionNodeType2[AttributionNodeType2["Image"] = 3] = "Image";
    })(AttributionNodeType = exports.AttributionNodeType || (exports.AttributionNodeType = {}));
    function makeAttributionNode(node) {
      return node;
    }
    __name(makeAttributionNode, "makeAttributionNode");
    exports.makeAttributionNode = makeAttributionNode;
    function isObject(val) {
      return Boolean(val && val.type === ValueType2.Object);
    }
    __name(isObject, "isObject");
    exports.isObject = isObject;
    function isArray(val) {
      return Boolean(val && val.type === ValueType2.Array);
    }
    __name(isArray, "isArray");
    exports.isArray = isArray;
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
    exports.generateSchema = generateSchema;
    function makeSchema(schema) {
      return schema;
    }
    __name(makeSchema, "makeSchema");
    exports.makeSchema = makeSchema;
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
    __name(makeObjectSchema2, "makeObjectSchema");
    exports.makeObjectSchema = makeObjectSchema2;
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
    function checkRequiredFieldInObjectSchema(field, fieldName, codaType) {
      (0, ensure_2.ensureExists)(field, `Objects with codaType "${codaType}" require a "${fieldName}" property in the schema definition.`);
    }
    __name(checkRequiredFieldInObjectSchema, "checkRequiredFieldInObjectSchema");
    function checkSchemaPropertyIsRequired(field, schema, referencedByPropertyName) {
      const { properties, codaType } = schema;
      (0, ensure_1.assertCondition)(properties[field], `${referencedByPropertyName} set to undefined field "${field}"`);
      (0, ensure_1.assertCondition)(properties[field].required, `Field "${field}" must be marked as required in schema with codaType "${codaType}".`);
    }
    __name(checkSchemaPropertyIsRequired, "checkSchemaPropertyIsRequired");
    function normalizeSchemaKey(key) {
      return (0, pascalcase_1.default)(key).replace(/:/g, "_");
    }
    __name(normalizeSchemaKey, "normalizeSchemaKey");
    exports.normalizeSchemaKey = normalizeSchemaKey;
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
    exports.normalizeSchemaKeyPath = normalizeSchemaKeyPath;
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
    function normalizePropertyValuePathIntoSchemaPath(propertyValue) {
      const normalizedValue = propertyValue.split(".").map((val) => {
        return val.replace(/\[(.*?)\]/, ".items");
      }).join(".properties.");
      return normalizedValue;
    }
    __name(normalizePropertyValuePathIntoSchemaPath, "normalizePropertyValuePathIntoSchemaPath");
    exports.normalizePropertyValuePathIntoSchemaPath = normalizePropertyValuePathIntoSchemaPath;
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
    exports.normalizeSchema = normalizeSchema;
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
    exports.makeReferenceSchemaFromObjectSchema = makeReferenceSchemaFromObjectSchema;
    function withIdentity(schema, identityName) {
      return makeObjectSchema2({
        ...(0, object_utils_1.deepCopy)(schema),
        identity: { name: (0, ensure_3.ensureNonEmptyString)(identityName) }
      });
    }
    __name(withIdentity, "withIdentity");
    exports.withIdentity = withIdentity;
  }
});

// node_modules/clone/clone.js
var require_clone = __commonJS({
  "node_modules/clone/clone.js"(exports, module2) {
    init_crypto_shim();
    var clone = function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      __name(_instanceof, "_instanceof");
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = /* @__PURE__ */ __name(function() {
        }, "nativeMap");
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = /* @__PURE__ */ __name(function() {
        }, "nativeSet");
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = /* @__PURE__ */ __name(function() {
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
        var useBuffer = typeof Buffer != "undefined";
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
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
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
        return _clone(parent, depth);
      }
      __name(clone2, "clone");
      clone2.clonePrototype = /* @__PURE__ */ __name(function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = /* @__PURE__ */ __name(function() {
        }, "c");
        c.prototype = parent;
        return new c();
      }, "clonePrototype");
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      __name(__objToStr, "__objToStr");
      clone2.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      __name(__isDate, "__isDate");
      clone2.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      __name(__isArray, "__isArray");
      clone2.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      __name(__isRegExp, "__isRegExp");
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
      clone2.__getRegExpFlags = __getRegExpFlags;
      return clone2;
    }();
    if (typeof module2 === "object" && module2.exports) {
      module2.exports = clone;
    }
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = /* @__PURE__ */ __name(function hasSymbols() {
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
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = /* @__PURE__ */ __name(function hasNativeSymbols() {
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
  }
});

// node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "node_modules/has-proto/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var test = {
      foo: {}
    };
    var $Object = Object;
    module2.exports = /* @__PURE__ */ __name(function hasProto() {
      return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
    }, "hasProto");
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = /* @__PURE__ */ __name(function bind(that) {
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
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
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
    var bind = require_function_bind();
    var hasOwn = require_src();
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
    module2.exports = /* @__PURE__ */ __name(function GetIntrinsic(name, allowMissing) {
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
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
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
    module2.exports = /* @__PURE__ */ __name(function callBind(originalFunction) {
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
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = /* @__PURE__ */ __name(function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    }, "callBoundIntrinsic");
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports, module2) {
    init_crypto_shim();
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports, module2) {
    init_crypto_shim();
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
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    module2.exports = /* @__PURE__ */ __name(function inspect_(obj, options, depth, seen) {
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
    }, "inspect_");
    function wrapQuotes(s, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s + quoteChar;
    }
    __name(wrapQuotes, "wrapQuotes");
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    __name(quote, "quote");
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isArray, "isArray");
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isDate, "isDate");
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isRegExp, "isRegExp");
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isError, "isError");
    function isString(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isString, "isString");
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isNumber, "isNumber");
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isBoolean, "isBoolean");
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
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    __name(has, "has");
    function toStr(obj) {
      return objectToString.call(obj);
    }
    __name(toStr, "toStr");
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
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    __name(markBoxed, "markBoxed");
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    __name(weakCollectionOf, "weakCollectionOf");
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    __name(collectionOf, "collectionOf");
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    __name(singleLineValues, "singleLineValues");
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
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    __name(indentedJoin, "indentedJoin");
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
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
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
    var listGetNode = /* @__PURE__ */ __name(function(list, key) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    }, "listGetNode");
    var listGet = /* @__PURE__ */ __name(function(objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    }, "listGet");
    var listSet = /* @__PURE__ */ __name(function(objects, key, value) {
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
    var listHas = /* @__PURE__ */ __name(function(objects, key) {
      return !!listGetNode(objects, key);
    }, "listHas");
    module2.exports = /* @__PURE__ */ __name(function getSideChannel() {
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
    }, "getSideChannel");
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
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

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
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
    var compactQueue = /* @__PURE__ */ __name(function compactQueue2(queue) {
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
    }, "compactQueue");
    var arrayToObject = /* @__PURE__ */ __name(function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    }, "arrayToObject");
    var merge = /* @__PURE__ */ __name(function merge2(target, source, options) {
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
    }, "merge");
    var assign = /* @__PURE__ */ __name(function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    }, "assignSingleSource");
    var decode = /* @__PURE__ */ __name(function(str, decoder, charset) {
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
    var encode = /* @__PURE__ */ __name(function encode2(str, defaultEncoder, charset, kind, format) {
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
    }, "encode");
    var compact = /* @__PURE__ */ __name(function compact2(value) {
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
    }, "compact");
    var isRegExp = /* @__PURE__ */ __name(function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    }, "isRegExp");
    var isBuffer = /* @__PURE__ */ __name(function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    }, "isBuffer");
    var combine = /* @__PURE__ */ __name(function combine2(a, b) {
      return [].concat(a, b);
    }, "combine");
    var maybeMap = /* @__PURE__ */ __name(function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    }, "maybeMap");
    module2.exports = {
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

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: /* @__PURE__ */ __name(function brackets(prefix) {
        return prefix + "[]";
      }, "brackets"),
      comma: "comma",
      indices: /* @__PURE__ */ __name(function indices(prefix, key) {
        return prefix + "[" + key + "]";
      }, "indices"),
      repeat: /* @__PURE__ */ __name(function repeat(prefix) {
        return prefix;
      }, "repeat")
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = /* @__PURE__ */ __name(function(arr, valueOrArray) {
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
      serializeDate: /* @__PURE__ */ __name(function serializeDate(date) {
        return toISO.call(date);
      }, "serializeDate"),
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = /* @__PURE__ */ __name(function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    }, "isNonNullishPrimitive");
    var sentinel = {};
    var stringify = /* @__PURE__ */ __name(function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
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
    }, "stringify");
    var normalizeStringifyOptions = /* @__PURE__ */ __name(function normalizeStringifyOptions2(opts) {
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
    }, "normalizeStringifyOptions");
    module2.exports = function(object, opts) {
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

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
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
    var interpretNumericEntities = /* @__PURE__ */ __name(function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    }, "interpretNumericEntities");
    var parseArrayValue = /* @__PURE__ */ __name(function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    }, "parseArrayValue");
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = /* @__PURE__ */ __name(function parseQueryStringValues(str, options) {
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
    }, "parseQueryStringValues");
    var parseObject = /* @__PURE__ */ __name(function(chain, val, options, valuesParsed) {
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
    var parseKeys = /* @__PURE__ */ __name(function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
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
    }, "parseQueryStringKeys");
    var normalizeParseOptions = /* @__PURE__ */ __name(function normalizeParseOptions2(opts) {
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
    }, "normalizeParseOptions");
    module2.exports = function(str, opts) {
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

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = /* @__PURE__ */ __name(function required(port, protocol) {
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
    }, "required");
  }
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports) {
    "use strict";
    init_crypto_shim();
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
    function encode(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    __name(encode, "encode");
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
    exports.stringify = querystringify;
    exports.parse = querystring;
  }
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports, module2) {
    "use strict";
    init_crypto_shim();
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
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      /* @__PURE__ */ __name(function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      }, "sanitize"),
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
      else if (typeof global !== "undefined")
        globalVar = global;
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
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    __name(isSpecial, "isSpecial");
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
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/url.js
var require_url = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/url.js"(exports) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.join = exports.getQueryParams = exports.withQueryParams = void 0;
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
    exports.withQueryParams = withQueryParams;
    function getQueryParams(url) {
      const parsedUrl = (0, url_parse_1.default)(url);
      return qs_1.default.parse(parsedUrl.query, { ignoreQueryPrefix: true });
    }
    __name(getQueryParams, "getQueryParams");
    exports.getQueryParams = getQueryParams;
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
    exports.join = join;
  }
});

// node_modules/@codahq/packs-sdk/dist/handler_templates.js
var require_handler_templates = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/handler_templates.js"(exports) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateObjectResponseHandler = exports.untransformKeys = exports.untransformBody = exports.transformBody = exports.generateRequestHandler = void 0;
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
    function formatString(template, params) {
      let result = template;
      for (const [key, value] of Object.entries(params)) {
        result = result.replace(`{${key}}`, value);
      }
      return result;
    }
    __name(formatString, "formatString");
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
      return /* @__PURE__ */ __name(function requestHandler(params) {
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
      }, "requestHandler");
    }
    __name(generateRequestHandler, "generateRequestHandler");
    exports.generateRequestHandler = generateRequestHandler;
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
    exports.transformBody = transformBody;
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
    exports.untransformBody = untransformBody;
    function untransformKeys(keys, schema) {
      const schemaObject = (0, schema_1.isArray)(schema) && (0, schema_2.isObject)(schema.items) ? schema.items : schema;
      const remappedKeys = getUnmapKeyLookup(schemaObject);
      return keys.map((key) => remappedKeys.get(key) || key);
    }
    __name(untransformKeys, "untransformKeys");
    exports.untransformKeys = untransformKeys;
    function generateObjectResponseHandler(response) {
      const { projectKey } = response;
      return /* @__PURE__ */ __name(function objectResponseHandler(resp) {
        const { body } = resp;
        if (typeof body !== "object") {
          return body;
        }
        const projectedBody = projectKey ? body[projectKey] : body;
        return projectedBody;
      }, "objectResponseHandler");
    }
    __name(generateObjectResponseHandler, "generateObjectResponseHandler");
    exports.generateObjectResponseHandler = generateObjectResponseHandler;
  }
});

// node_modules/@codahq/packs-sdk/dist/api.js
var require_api = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/api.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.maybeRewriteConnectionForFormula = exports.makeEmptyFormula = exports.makeTranslateObjectFormula = exports.makeDynamicSyncTable = exports.makeSyncTableLegacy = exports.makeSyncTable = exports.makeObjectFormula = exports.makeSimpleAutocompleteMetadataFormula = exports.autocompleteSearchObjects = exports.simpleAutocomplete = exports.makeMetadataFormula = exports.normalizePropertyAutocompleteResults = exports.makeFormula = exports.makeStringFormula = exports.makeNumericFormula = exports.UpdateOutcome = exports.isSyncPackFormula = exports.isStringPackFormula = exports.isObjectPackFormula = exports.check = exports.makeUserVisibleError = exports.makeFileArrayParameter = exports.makeFileParameter = exports.makeImageArrayParameter = exports.makeImageParameter = exports.makeHtmlArrayParameter = exports.makeHtmlParameter = exports.makeDateArrayParameter = exports.makeDateParameter = exports.makeBooleanArrayParameter = exports.makeBooleanParameter = exports.makeNumericArrayParameter = exports.makeNumericParameter = exports.makeStringArrayParameter = exports.makeStringParameter = exports.makeParameter = exports.wrapGetSchema = exports.wrapMetadataFunction = exports.isDynamicSyncTable = exports.isUserVisibleError = exports.MissingScopesError = exports.StatusCodeError = exports.UserVisibleError = void 0;
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
    var UserVisibleError = class extends Error {
      /**
       * Use to construct a user-visible error.
       */
      constructor(message, internalError) {
        super(message);
        this.isUserVisible = true;
        this.internalError = internalError;
      }
    };
    __name(UserVisibleError, "UserVisibleError");
    exports.UserVisibleError = UserVisibleError;
    var StatusCodeError = class extends Error {
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
    };
    __name(StatusCodeError, "StatusCodeError");
    exports.StatusCodeError = StatusCodeError;
    var MissingScopesError = class extends Error {
      /** @hidden */
      constructor(message) {
        super(message || "Additional permissions are required");
        this.name = "MissingScopesError";
      }
      /** Returns if the error is an instance of MissingScopesError. Note that `instanceof` may not work. */
      static isMissingScopesError(err) {
        return "name" in err && err.name === MissingScopesError.name;
      }
    };
    __name(MissingScopesError, "MissingScopesError");
    exports.MissingScopesError = MissingScopesError;
    function isUserVisibleError(error) {
      return "isUserVisible" in error && error.isUserVisible;
    }
    __name(isUserVisibleError, "isUserVisibleError");
    exports.isUserVisibleError = isUserVisibleError;
    function isDynamicSyncTable(syncTable) {
      return "isDynamic" in syncTable;
    }
    __name(isDynamicSyncTable, "isDynamicSyncTable");
    exports.isDynamicSyncTable = isDynamicSyncTable;
    function wrapMetadataFunction(fnOrFormula) {
      return typeof fnOrFormula === "function" ? makeMetadataFormula(fnOrFormula) : fnOrFormula;
    }
    __name(wrapMetadataFunction, "wrapMetadataFunction");
    exports.wrapMetadataFunction = wrapMetadataFunction;
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
    exports.wrapGetSchema = wrapGetSchema;
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
    __name(makeParameter2, "makeParameter");
    exports.makeParameter = makeParameter2;
    function makeStringParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.string });
    }
    __name(makeStringParameter, "makeStringParameter");
    exports.makeStringParameter = makeStringParameter;
    function makeStringArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_10.stringArray });
    }
    __name(makeStringArrayParameter, "makeStringArrayParameter");
    exports.makeStringArrayParameter = makeStringArrayParameter;
    function makeNumericParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.number });
    }
    __name(makeNumericParameter, "makeNumericParameter");
    exports.makeNumericParameter = makeNumericParameter;
    function makeNumericArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_9.numberArray });
    }
    __name(makeNumericArrayParameter, "makeNumericArrayParameter");
    exports.makeNumericArrayParameter = makeNumericArrayParameter;
    function makeBooleanParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.boolean });
    }
    __name(makeBooleanParameter, "makeBooleanParameter");
    exports.makeBooleanParameter = makeBooleanParameter;
    function makeBooleanArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_4.booleanArray });
    }
    __name(makeBooleanArrayParameter, "makeBooleanArrayParameter");
    exports.makeBooleanArrayParameter = makeBooleanArrayParameter;
    function makeDateParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.date });
    }
    __name(makeDateParameter, "makeDateParameter");
    exports.makeDateParameter = makeDateParameter;
    function makeDateArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_5.dateArray });
    }
    __name(makeDateArrayParameter, "makeDateArrayParameter");
    exports.makeDateArrayParameter = makeDateArrayParameter;
    function makeHtmlParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.html });
    }
    __name(makeHtmlParameter, "makeHtmlParameter");
    exports.makeHtmlParameter = makeHtmlParameter;
    function makeHtmlArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_7.htmlArray });
    }
    __name(makeHtmlArrayParameter, "makeHtmlArrayParameter");
    exports.makeHtmlArrayParameter = makeHtmlArrayParameter;
    function makeImageParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.image });
    }
    __name(makeImageParameter, "makeImageParameter");
    exports.makeImageParameter = makeImageParameter;
    function makeImageArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_8.imageArray });
    }
    __name(makeImageArrayParameter, "makeImageArrayParameter");
    exports.makeImageArrayParameter = makeImageArrayParameter;
    function makeFileParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.file });
    }
    __name(makeFileParameter, "makeFileParameter");
    exports.makeFileParameter = makeFileParameter;
    function makeFileArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.fileArray });
    }
    __name(makeFileArrayParameter, "makeFileArrayParameter");
    exports.makeFileArrayParameter = makeFileArrayParameter;
    function makeUserVisibleError(msg) {
      return new UserVisibleError(msg);
    }
    __name(makeUserVisibleError, "makeUserVisibleError");
    exports.makeUserVisibleError = makeUserVisibleError;
    function check(condition, msg) {
      if (!condition) {
        throw makeUserVisibleError(msg);
      }
    }
    __name(check, "check");
    exports.check = check;
    function isObjectPackFormula(fn) {
      return fn.resultType === api_types_3.Type.object;
    }
    __name(isObjectPackFormula, "isObjectPackFormula");
    exports.isObjectPackFormula = isObjectPackFormula;
    function isStringPackFormula(fn) {
      return fn.resultType === api_types_3.Type.string;
    }
    __name(isStringPackFormula, "isStringPackFormula");
    exports.isStringPackFormula = isStringPackFormula;
    function isSyncPackFormula(fn) {
      return Boolean(fn.isSyncFormula);
    }
    __name(isSyncPackFormula, "isSyncPackFormula");
    exports.isSyncPackFormula = isSyncPackFormula;
    var UpdateOutcome;
    (function(UpdateOutcome2) {
      UpdateOutcome2["Success"] = "success";
      UpdateOutcome2["Error"] = "error";
    })(UpdateOutcome = exports.UpdateOutcome || (exports.UpdateOutcome = {}));
    function makeNumericFormula(definition) {
      return Object.assign({}, definition, { resultType: api_types_3.Type.number });
    }
    __name(makeNumericFormula, "makeNumericFormula");
    exports.makeNumericFormula = makeNumericFormula;
    function makeStringFormula(definition) {
      const { response } = definition;
      return Object.assign({}, definition, {
        resultType: api_types_3.Type.string,
        ...response && { schema: response.schema }
      });
    }
    __name(makeStringFormula, "makeStringFormula");
    exports.makeStringFormula = makeStringFormula;
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
    exports.makeFormula = makeFormula;
    function normalizePropertyAutocompleteResultsArray(results) {
      return results.map((r) => {
        if (typeof r === "object" && Object.keys(r).length === 2 && "display" in r && "value" in r) {
          return { display: r.display, value: r.value };
        }
        return { display: void 0, value: r };
      });
    }
    __name(normalizePropertyAutocompleteResultsArray, "normalizePropertyAutocompleteResultsArray");
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
    exports.normalizePropertyAutocompleteResults = normalizePropertyAutocompleteResults;
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
    exports.makeMetadataFormula = makeMetadataFormula;
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
    exports.simpleAutocomplete = simpleAutocomplete;
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
    exports.autocompleteSearchObjects = autocompleteSearchObjects;
    function makeSimpleAutocompleteMetadataFormula(options) {
      return makeMetadataFormula((context, [search]) => simpleAutocomplete(search, options), {
        // A connection won't be used here, but if the parent formula uses a connection
        // the execution code is going to try to pass it here. We should fix that.
        connectionRequirement: api_types_1.ConnectionRequirement.Optional
      });
    }
    __name(makeSimpleAutocompleteMetadataFormula, "makeSimpleAutocompleteMetadataFormula");
    exports.makeSimpleAutocompleteMetadataFormula = makeSimpleAutocompleteMetadataFormula;
    function isResponseHandlerTemplate(obj) {
      return obj && obj.schema;
    }
    __name(isResponseHandlerTemplate, "isResponseHandlerTemplate");
    function isResponseExampleTemplate(obj) {
      return obj && obj.example;
    }
    __name(isResponseExampleTemplate, "isResponseExampleTemplate");
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
        execute = /* @__PURE__ */ __name(async function exec(params, context) {
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
        }, "exec");
      }
      return Object.assign({}, definition, {
        resultType: api_types_3.Type.object,
        execute,
        schema
      });
    }
    __name(makeObjectFormula, "makeObjectFormula");
    exports.makeObjectFormula = makeObjectFormula;
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
      const execute = /* @__PURE__ */ __name(async function exec(params, context) {
        const { result, continuation } = await wrappedExecute(params, context) || {};
        const appliedSchema = context.sync.schema;
        return {
          result: responseHandler({ body: result || [], status: 200, headers: {} }, appliedSchema),
          continuation
        };
      }, "exec");
      const executeUpdate = wrappedExecuteUpdate ? /* @__PURE__ */ __name(async function execUpdate(params, updates, context) {
        const { result } = await wrappedExecuteUpdate(params, updates, context) || {};
        const appliedSchema = context.sync.schema;
        return {
          result: responseHandler({ body: result || [], status: 200, headers: {} }, appliedSchema)
        };
      }, "execUpdate") : void 0;
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
    exports.makeSyncTable = makeSyncTable;
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
    exports.makeSyncTableLegacy = makeSyncTableLegacy;
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
    exports.makeDynamicSyncTable = makeDynamicSyncTable;
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
      return Object.assign({}, rest, {
        execute,
        resultType: api_types_3.Type.object,
        schema: response.schema
      });
    }
    __name(makeTranslateObjectFormula, "makeTranslateObjectFormula");
    exports.makeTranslateObjectFormula = makeTranslateObjectFormula;
    function makeEmptyFormula(definition) {
      const { request, ...rest } = definition;
      const { parameters } = rest;
      const requestHandler = (0, handler_templates_2.generateRequestHandler)(request, parameters);
      function execute(params, context) {
        return context.fetcher.fetch(requestHandler(params)).then(() => "");
      }
      __name(execute, "execute");
      return Object.assign({}, rest, {
        execute,
        resultType: api_types_3.Type.string
      });
    }
    __name(makeEmptyFormula, "makeEmptyFormula");
    exports.makeEmptyFormula = makeEmptyFormula;
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
    exports.maybeRewriteConnectionForFormula = maybeRewriteConnectionForFormula;
  }
});

// node_modules/@codahq/packs-sdk/dist/builder.js
var require_builder = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/builder.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PackDefinitionBuilder = exports.newPack = void 0;
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
    __name(newPack2, "newPack");
    exports.newPack = newPack2;
    var PackDefinitionBuilder = class {
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
    };
    __name(PackDefinitionBuilder, "PackDefinitionBuilder");
    exports.PackDefinitionBuilder = PackDefinitionBuilder;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/schema.js
var require_schema2 = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/schema.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEffectivePropertyKeysFromSchema = void 0;
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
    exports.getEffectivePropertyKeysFromSchema = getEffectivePropertyKeysFromSchema;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/svg.js
var require_svg = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/svg.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SvgConstants = void 0;
    var SvgConstants;
    (function(SvgConstants2) {
      SvgConstants2.DarkModeFragmentId = "DarkMode";
      SvgConstants2.DataUrlPrefix = "data:image/svg+xml;base64,";
      SvgConstants2.DataUrlPrefixWithDarkModeSupport = "data:image/svg+xml;supportsDarkMode=1;base64,";
    })(SvgConstants = exports.SvgConstants || (exports.SvgConstants = {}));
  }
});

// node_modules/@codahq/packs-sdk/dist/index.js
var require_dist = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/index.js"(exports) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValidFetchMethods = exports.withIdentity = exports.makeSchema = exports.makeReferenceSchemaFromObjectSchema = exports.makeObjectSchema = exports.makeAttributionNode = exports.generateSchema = exports.ValueType = exports.ValueHintType = exports.ScaleIconSet = exports.PropertyLabelValueTemplate = exports.LinkDisplayType = exports.ImageOutline = exports.ImageCornerStyle = exports.EmailDisplayType = exports.DurationUnit = exports.CurrencyFormat = exports.AttributionNodeType = exports.ensureUnreachable = exports.ensureNonEmptyString = exports.ensureExists = exports.assertCondition = exports.SvgConstants = exports.getEffectivePropertyKeysFromSchema = exports.withQueryParams = exports.joinUrl = exports.getQueryParams = exports.simpleAutocomplete = exports.makeSimpleAutocompleteMetadataFormula = exports.autocompleteSearchObjects = exports.makeParameter = exports.makeTranslateObjectFormula = exports.makeSyncTable = exports.makeFormula = exports.makeEmptyFormula = exports.makeDynamicSyncTable = exports.makeMetadataFormula = exports.UserVisibleError = exports.Type = exports.MissingScopesError = exports.StatusCodeError = exports.PrecannedDateRange = exports.ParameterType = exports.NetworkConnection = exports.UpdateOutcome = exports.ConnectionRequirement = exports.PackDefinitionBuilder = exports.newPack = exports.PostSetupType = exports.AuthenticationType = void 0;
    exports.TokenExchangeCredentialsLocation = void 0;
    var types_1 = require_types();
    Object.defineProperty(exports, "AuthenticationType", { enumerable: true, get: function() {
      return types_1.AuthenticationType;
    } });
    var types_2 = require_types();
    Object.defineProperty(exports, "PostSetupType", { enumerable: true, get: function() {
      return types_2.PostSetupType;
    } });
    var builder_1 = require_builder();
    Object.defineProperty(exports, "newPack", { enumerable: true, get: function() {
      return builder_1.newPack;
    } });
    var builder_2 = require_builder();
    Object.defineProperty(exports, "PackDefinitionBuilder", { enumerable: true, get: function() {
      return builder_2.PackDefinitionBuilder;
    } });
    var api_types_1 = require_api_types();
    Object.defineProperty(exports, "ConnectionRequirement", { enumerable: true, get: function() {
      return api_types_1.ConnectionRequirement;
    } });
    var api_1 = require_api();
    Object.defineProperty(exports, "UpdateOutcome", { enumerable: true, get: function() {
      return api_1.UpdateOutcome;
    } });
    var api_types_2 = require_api_types();
    Object.defineProperty(exports, "NetworkConnection", { enumerable: true, get: function() {
      return api_types_2.NetworkConnection;
    } });
    var api_types_3 = require_api_types();
    Object.defineProperty(exports, "ParameterType", { enumerable: true, get: function() {
      return api_types_3.ParameterType;
    } });
    var api_types_4 = require_api_types();
    Object.defineProperty(exports, "PrecannedDateRange", { enumerable: true, get: function() {
      return api_types_4.PrecannedDateRange;
    } });
    var api_2 = require_api();
    Object.defineProperty(exports, "StatusCodeError", { enumerable: true, get: function() {
      return api_2.StatusCodeError;
    } });
    var api_3 = require_api();
    Object.defineProperty(exports, "MissingScopesError", { enumerable: true, get: function() {
      return api_3.MissingScopesError;
    } });
    var api_types_5 = require_api_types();
    Object.defineProperty(exports, "Type", { enumerable: true, get: function() {
      return api_types_5.Type;
    } });
    var api_4 = require_api();
    Object.defineProperty(exports, "UserVisibleError", { enumerable: true, get: function() {
      return api_4.UserVisibleError;
    } });
    var api_5 = require_api();
    Object.defineProperty(exports, "makeMetadataFormula", { enumerable: true, get: function() {
      return api_5.makeMetadataFormula;
    } });
    var api_6 = require_api();
    Object.defineProperty(exports, "makeDynamicSyncTable", { enumerable: true, get: function() {
      return api_6.makeDynamicSyncTable;
    } });
    var api_7 = require_api();
    Object.defineProperty(exports, "makeEmptyFormula", { enumerable: true, get: function() {
      return api_7.makeEmptyFormula;
    } });
    var api_8 = require_api();
    Object.defineProperty(exports, "makeFormula", { enumerable: true, get: function() {
      return api_8.makeFormula;
    } });
    var api_9 = require_api();
    Object.defineProperty(exports, "makeSyncTable", { enumerable: true, get: function() {
      return api_9.makeSyncTable;
    } });
    var api_10 = require_api();
    Object.defineProperty(exports, "makeTranslateObjectFormula", { enumerable: true, get: function() {
      return api_10.makeTranslateObjectFormula;
    } });
    var api_11 = require_api();
    Object.defineProperty(exports, "makeParameter", { enumerable: true, get: function() {
      return api_11.makeParameter;
    } });
    var api_12 = require_api();
    Object.defineProperty(exports, "autocompleteSearchObjects", { enumerable: true, get: function() {
      return api_12.autocompleteSearchObjects;
    } });
    var api_13 = require_api();
    Object.defineProperty(exports, "makeSimpleAutocompleteMetadataFormula", { enumerable: true, get: function() {
      return api_13.makeSimpleAutocompleteMetadataFormula;
    } });
    var api_14 = require_api();
    Object.defineProperty(exports, "simpleAutocomplete", { enumerable: true, get: function() {
      return api_14.simpleAutocomplete;
    } });
    var url_1 = require_url();
    Object.defineProperty(exports, "getQueryParams", { enumerable: true, get: function() {
      return url_1.getQueryParams;
    } });
    var url_2 = require_url();
    Object.defineProperty(exports, "joinUrl", { enumerable: true, get: function() {
      return url_2.join;
    } });
    var url_3 = require_url();
    Object.defineProperty(exports, "withQueryParams", { enumerable: true, get: function() {
      return url_3.withQueryParams;
    } });
    var schema_1 = require_schema2();
    Object.defineProperty(exports, "getEffectivePropertyKeysFromSchema", { enumerable: true, get: function() {
      return schema_1.getEffectivePropertyKeysFromSchema;
    } });
    var svg_1 = require_svg();
    Object.defineProperty(exports, "SvgConstants", { enumerable: true, get: function() {
      return svg_1.SvgConstants;
    } });
    var ensure_1 = require_ensure();
    Object.defineProperty(exports, "assertCondition", { enumerable: true, get: function() {
      return ensure_1.assertCondition;
    } });
    var ensure_2 = require_ensure();
    Object.defineProperty(exports, "ensureExists", { enumerable: true, get: function() {
      return ensure_2.ensureExists;
    } });
    var ensure_3 = require_ensure();
    Object.defineProperty(exports, "ensureNonEmptyString", { enumerable: true, get: function() {
      return ensure_3.ensureNonEmptyString;
    } });
    var ensure_4 = require_ensure();
    Object.defineProperty(exports, "ensureUnreachable", { enumerable: true, get: function() {
      return ensure_4.ensureUnreachable;
    } });
    var schema_2 = require_schema();
    Object.defineProperty(exports, "AttributionNodeType", { enumerable: true, get: function() {
      return schema_2.AttributionNodeType;
    } });
    var schema_3 = require_schema();
    Object.defineProperty(exports, "CurrencyFormat", { enumerable: true, get: function() {
      return schema_3.CurrencyFormat;
    } });
    var schema_4 = require_schema();
    Object.defineProperty(exports, "DurationUnit", { enumerable: true, get: function() {
      return schema_4.DurationUnit;
    } });
    var schema_5 = require_schema();
    Object.defineProperty(exports, "EmailDisplayType", { enumerable: true, get: function() {
      return schema_5.EmailDisplayType;
    } });
    var schema_6 = require_schema();
    Object.defineProperty(exports, "ImageCornerStyle", { enumerable: true, get: function() {
      return schema_6.ImageCornerStyle;
    } });
    var schema_7 = require_schema();
    Object.defineProperty(exports, "ImageOutline", { enumerable: true, get: function() {
      return schema_7.ImageOutline;
    } });
    var schema_8 = require_schema();
    Object.defineProperty(exports, "LinkDisplayType", { enumerable: true, get: function() {
      return schema_8.LinkDisplayType;
    } });
    var schema_9 = require_schema();
    Object.defineProperty(exports, "PropertyLabelValueTemplate", { enumerable: true, get: function() {
      return schema_9.PropertyLabelValueTemplate;
    } });
    var schema_10 = require_schema();
    Object.defineProperty(exports, "ScaleIconSet", { enumerable: true, get: function() {
      return schema_10.ScaleIconSet;
    } });
    var schema_11 = require_schema();
    Object.defineProperty(exports, "ValueHintType", { enumerable: true, get: function() {
      return schema_11.ValueHintType;
    } });
    var schema_12 = require_schema();
    Object.defineProperty(exports, "ValueType", { enumerable: true, get: function() {
      return schema_12.ValueType;
    } });
    var schema_13 = require_schema();
    Object.defineProperty(exports, "generateSchema", { enumerable: true, get: function() {
      return schema_13.generateSchema;
    } });
    var schema_14 = require_schema();
    Object.defineProperty(exports, "makeAttributionNode", { enumerable: true, get: function() {
      return schema_14.makeAttributionNode;
    } });
    var schema_15 = require_schema();
    Object.defineProperty(exports, "makeObjectSchema", { enumerable: true, get: function() {
      return schema_15.makeObjectSchema;
    } });
    var schema_16 = require_schema();
    Object.defineProperty(exports, "makeReferenceSchemaFromObjectSchema", { enumerable: true, get: function() {
      return schema_16.makeReferenceSchemaFromObjectSchema;
    } });
    var schema_17 = require_schema();
    Object.defineProperty(exports, "makeSchema", { enumerable: true, get: function() {
      return schema_17.makeSchema;
    } });
    var schema_18 = require_schema();
    Object.defineProperty(exports, "withIdentity", { enumerable: true, get: function() {
      return schema_18.withIdentity;
    } });
    var api_types_6 = require_api_types();
    Object.defineProperty(exports, "ValidFetchMethods", { enumerable: true, get: function() {
      return api_types_6.ValidFetchMethods;
    } });
    var types_3 = require_types();
    Object.defineProperty(exports, "TokenExchangeCredentialsLocation", { enumerable: true, get: function() {
      return types_3.TokenExchangeCredentialsLocation;
    } });
  }
});

// pack.ts
var pack_exports = {};
__export(pack_exports, {
  pack: () => pack
});
module.exports = __toCommonJS(pack_exports);
init_crypto_shim();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pack
});
/*! Bundled license information:

pascalcase/index.js:
  (*!
   * pascalcase <https://github.com/jonschlinkert/pascalcase>
   *
   * Copyright (c) 2015-present, Jon ("Schlink") Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL21lcnNlbm5lLXR3aXN0ZXIvc3JjL21lcnNlbm5lLXR3aXN0ZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bjb2RhaHEvcGFja3Mtc2RrL2Rpc3QvdGVzdGluZy9pbmplY3Rpb25zL2NyeXB0b19zaGltLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L3R5cGVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2FwaV90eXBlcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC9oZWxwZXJzL2Vuc3VyZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC9oZWxwZXJzL29iamVjdF91dGlscy5qcyIsICIuLi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC9oZWxwZXJzL21pZ3JhdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvcGFzY2FsY2FzZS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC9zY2hlbWEuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nsb25lL2Nsb25lLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9oYXMtc3ltYm9scy9zaGFtcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2hhcy1wcm90by9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbXBsZW1lbnRhdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvaGFzL3NyYy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZ2V0LWludHJpbnNpYy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdC91dGlsLmluc3BlY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zaWRlLWNoYW5uZWwvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yZXF1aXJlcy1wb3J0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZ2lmeS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXJsLXBhcnNlL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvdXJsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hhbmRsZXJfdGVtcGxhdGVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2FwaS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC9idWlsZGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvc2NoZW1hLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvc3ZnLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2luZGV4LmpzIiwgIi4uL3BhY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9iYW5rc2VhbiB3cmFwcGVkIE1ha290byBNYXRzdW1vdG8gYW5kIFRha3VqaSBOaXNoaW11cmEncyBjb2RlIGluIGEgbmFtZXNwYWNlXG4gIHNvIGl0J3MgYmV0dGVyIGVuY2Fwc3VsYXRlZC4gTm93IHlvdSBjYW4gaGF2ZSBtdWx0aXBsZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvcnNcbiAgYW5kIHRoZXkgd29uJ3Qgc3RvbXAgYWxsIG92ZXIgZWFjaG90aGVyJ3Mgc3RhdGUuXG5cbiAgSWYgeW91IHdhbnQgdG8gdXNlIHRoaXMgYXMgYSBzdWJzdGl0dXRlIGZvciBNYXRoLnJhbmRvbSgpLCB1c2UgdGhlIHJhbmRvbSgpXG4gIG1ldGhvZCBsaWtlIHNvOlxuXG4gIHZhciBtID0gbmV3IE1lcnNlbm5lVHdpc3RlcigpO1xuICB2YXIgcmFuZG9tTnVtYmVyID0gbS5yYW5kb20oKTtcblxuICBZb3UgY2FuIGFsc28gY2FsbCB0aGUgb3RoZXIgZ2VucmFuZF97Zm9vfSgpIG1ldGhvZHMgb24gdGhlIGluc3RhbmNlLlxuXG4gIElmIHlvdSB3YW50IHRvIHVzZSBhIHNwZWNpZmljIHNlZWQgaW4gb3JkZXIgdG8gZ2V0IGEgcmVwZWF0YWJsZSByYW5kb21cbiAgc2VxdWVuY2UsIHBhc3MgYW4gaW50ZWdlciBpbnRvIHRoZSBjb25zdHJ1Y3RvcjpcblxuICB2YXIgbSA9IG5ldyBNZXJzZW5uZVR3aXN0ZXIoMTIzKTtcblxuICBhbmQgdGhhdCB3aWxsIGFsd2F5cyBwcm9kdWNlIHRoZSBzYW1lIHJhbmRvbSBzZXF1ZW5jZS5cblxuICBTZWFuIE1jQ3VsbG91Z2ggKGJhbmtzZWFuQGdtYWlsLmNvbSlcbiovXG5cbi8qXG4gICBBIEMtcHJvZ3JhbSBmb3IgTVQxOTkzNywgd2l0aCBpbml0aWFsaXphdGlvbiBpbXByb3ZlZCAyMDAyLzEvMjYuXG4gICBDb2RlZCBieSBUYWt1amkgTmlzaGltdXJhIGFuZCBNYWtvdG8gTWF0c3Vtb3RvLlxuXG4gICBCZWZvcmUgdXNpbmcsIGluaXRpYWxpemUgdGhlIHN0YXRlIGJ5IHVzaW5nIGluaXRfc2VlZChzZWVkKVxuICAgb3IgaW5pdF9ieV9hcnJheShpbml0X2tleSwga2V5X2xlbmd0aCkuXG5cbiAgIENvcHlyaWdodCAoQykgMTk5NyAtIDIwMDIsIE1ha290byBNYXRzdW1vdG8gYW5kIFRha3VqaSBOaXNoaW11cmEsXG4gICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG4gICBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAgIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uc1xuICAgYXJlIG1ldDpcblxuICAgICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbiAgICAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAgICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICAgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4gICAgIDMuIFRoZSBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBub3QgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGVcbiAgICAgICAgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuXG4gICAgICAgIHBlcm1pc3Npb24uXG5cbiAgIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlNcbiAgIFwiQVMgSVNcIiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1RcbiAgIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUlxuICAgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SXG4gICBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCxcbiAgIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTyxcbiAgIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRlxuICAgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkdcbiAgIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuICAgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG5cblxuICAgQW55IGZlZWRiYWNrIGlzIHZlcnkgd2VsY29tZS5cbiAgIGh0dHA6Ly93d3cubWF0aC5zY2kuaGlyb3NoaW1hLXUuYWMuanAvfm0tbWF0L01UL2VtdC5odG1sXG4gICBlbWFpbDogbS1tYXQgQCBtYXRoLnNjaS5oaXJvc2hpbWEtdS5hYy5qcCAocmVtb3ZlIHNwYWNlKVxuKi9cblxudmFyIE1lcnNlbm5lVHdpc3RlciA9IGZ1bmN0aW9uKHNlZWQpIHtcblx0aWYgKHNlZWQgPT0gdW5kZWZpbmVkKSB7XG5cdFx0c2VlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHR9XG5cblx0LyogUGVyaW9kIHBhcmFtZXRlcnMgKi9cblx0dGhpcy5OID0gNjI0O1xuXHR0aGlzLk0gPSAzOTc7XG5cdHRoaXMuTUFUUklYX0EgPSAweDk5MDhiMGRmOyAgIC8qIGNvbnN0YW50IHZlY3RvciBhICovXG5cdHRoaXMuVVBQRVJfTUFTSyA9IDB4ODAwMDAwMDA7IC8qIG1vc3Qgc2lnbmlmaWNhbnQgdy1yIGJpdHMgKi9cblx0dGhpcy5MT1dFUl9NQVNLID0gMHg3ZmZmZmZmZjsgLyogbGVhc3Qgc2lnbmlmaWNhbnQgciBiaXRzICovXG5cblx0dGhpcy5tdCA9IG5ldyBBcnJheSh0aGlzLk4pOyAvKiB0aGUgYXJyYXkgZm9yIHRoZSBzdGF0ZSB2ZWN0b3IgKi9cblx0dGhpcy5tdGk9dGhpcy5OKzE7IC8qIG10aT09TisxIG1lYW5zIG10W05dIGlzIG5vdCBpbml0aWFsaXplZCAqL1xuXG5cdGlmIChzZWVkLmNvbnN0cnVjdG9yID09IEFycmF5KSB7XG5cdFx0dGhpcy5pbml0X2J5X2FycmF5KHNlZWQsIHNlZWQubGVuZ3RoKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0aGlzLmluaXRfc2VlZChzZWVkKTtcblx0fVxufVxuXG4vKiBpbml0aWFsaXplcyBtdFtOXSB3aXRoIGEgc2VlZCAqL1xuLyogb3JpZ2luIG5hbWUgaW5pdF9nZW5yYW5kICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmluaXRfc2VlZCA9IGZ1bmN0aW9uKHMpIHtcblx0dGhpcy5tdFswXSA9IHMgPj4+IDA7XG5cdGZvciAodGhpcy5tdGk9MTsgdGhpcy5tdGk8dGhpcy5OOyB0aGlzLm10aSsrKSB7XG5cdFx0dmFyIHMgPSB0aGlzLm10W3RoaXMubXRpLTFdIF4gKHRoaXMubXRbdGhpcy5tdGktMV0gPj4+IDMwKTtcblx0XHR0aGlzLm10W3RoaXMubXRpXSA9ICgoKCgocyAmIDB4ZmZmZjAwMDApID4+PiAxNikgKiAxODEyNDMzMjUzKSA8PCAxNikgKyAocyAmIDB4MDAwMGZmZmYpICogMTgxMjQzMzI1Mylcblx0XHQrIHRoaXMubXRpO1xuXHRcdC8qIFNlZSBLbnV0aCBUQU9DUCBWb2wyLiAzcmQgRWQuIFAuMTA2IGZvciBtdWx0aXBsaWVyLiAqL1xuXHRcdC8qIEluIHRoZSBwcmV2aW91cyB2ZXJzaW9ucywgTVNCcyBvZiB0aGUgc2VlZCBhZmZlY3QgICAqL1xuXHRcdC8qIG9ubHkgTVNCcyBvZiB0aGUgYXJyYXkgbXRbXS4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qIDIwMDIvMDEvMDkgbW9kaWZpZWQgYnkgTWFrb3RvIE1hdHN1bW90byAgICAgICAgICAgICAqL1xuXHRcdHRoaXMubXRbdGhpcy5tdGldID4+Pj0gMDtcblx0XHQvKiBmb3IgPjMyIGJpdCBtYWNoaW5lcyAqL1xuXHR9XG59XG5cbi8qIGluaXRpYWxpemUgYnkgYW4gYXJyYXkgd2l0aCBhcnJheS1sZW5ndGggKi9cbi8qIGluaXRfa2V5IGlzIHRoZSBhcnJheSBmb3IgaW5pdGlhbGl6aW5nIGtleXMgKi9cbi8qIGtleV9sZW5ndGggaXMgaXRzIGxlbmd0aCAqL1xuLyogc2xpZ2h0IGNoYW5nZSBmb3IgQysrLCAyMDA0LzIvMjYgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUuaW5pdF9ieV9hcnJheSA9IGZ1bmN0aW9uKGluaXRfa2V5LCBrZXlfbGVuZ3RoKSB7XG5cdHZhciBpLCBqLCBrO1xuXHR0aGlzLmluaXRfc2VlZCgxOTY1MDIxOCk7XG5cdGk9MTsgaj0wO1xuXHRrID0gKHRoaXMuTj5rZXlfbGVuZ3RoID8gdGhpcy5OIDoga2V5X2xlbmd0aCk7XG5cdGZvciAoOyBrOyBrLS0pIHtcblx0XHR2YXIgcyA9IHRoaXMubXRbaS0xXSBeICh0aGlzLm10W2ktMV0gPj4+IDMwKVxuXHRcdHRoaXMubXRbaV0gPSAodGhpcy5tdFtpXSBeICgoKCgocyAmIDB4ZmZmZjAwMDApID4+PiAxNikgKiAxNjY0NTI1KSA8PCAxNikgKyAoKHMgJiAweDAwMDBmZmZmKSAqIDE2NjQ1MjUpKSlcblx0XHQrIGluaXRfa2V5W2pdICsgajsgLyogbm9uIGxpbmVhciAqL1xuXHRcdHRoaXMubXRbaV0gPj4+PSAwOyAvKiBmb3IgV09SRFNJWkUgPiAzMiBtYWNoaW5lcyAqL1xuXHRcdGkrKzsgaisrO1xuXHRcdGlmIChpPj10aGlzLk4pIHsgdGhpcy5tdFswXSA9IHRoaXMubXRbdGhpcy5OLTFdOyBpPTE7IH1cblx0XHRpZiAoaj49a2V5X2xlbmd0aCkgaj0wO1xuXHR9XG5cdGZvciAoaz10aGlzLk4tMTsgazsgay0tKSB7XG5cdFx0dmFyIHMgPSB0aGlzLm10W2ktMV0gXiAodGhpcy5tdFtpLTFdID4+PiAzMCk7XG5cdFx0dGhpcy5tdFtpXSA9ICh0aGlzLm10W2ldIF4gKCgoKChzICYgMHhmZmZmMDAwMCkgPj4+IDE2KSAqIDE1NjYwODM5NDEpIDw8IDE2KSArIChzICYgMHgwMDAwZmZmZikgKiAxNTY2MDgzOTQxKSlcblx0XHQtIGk7IC8qIG5vbiBsaW5lYXIgKi9cblx0XHR0aGlzLm10W2ldID4+Pj0gMDsgLyogZm9yIFdPUkRTSVpFID4gMzIgbWFjaGluZXMgKi9cblx0XHRpKys7XG5cdFx0aWYgKGk+PXRoaXMuTikgeyB0aGlzLm10WzBdID0gdGhpcy5tdFt0aGlzLk4tMV07IGk9MTsgfVxuXHR9XG5cblx0dGhpcy5tdFswXSA9IDB4ODAwMDAwMDA7IC8qIE1TQiBpcyAxOyBhc3N1cmluZyBub24temVybyBpbml0aWFsIGFycmF5ICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMHhmZmZmZmZmZl0taW50ZXJ2YWwgKi9cbi8qIG9yaWdpbiBuYW1lIGdlbnJhbmRfaW50MzIgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUucmFuZG9tX2ludCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgeTtcblx0dmFyIG1hZzAxID0gbmV3IEFycmF5KDB4MCwgdGhpcy5NQVRSSVhfQSk7XG5cdC8qIG1hZzAxW3hdID0geCAqIE1BVFJJWF9BICBmb3IgeD0wLDEgKi9cblxuXHRpZiAodGhpcy5tdGkgPj0gdGhpcy5OKSB7IC8qIGdlbmVyYXRlIE4gd29yZHMgYXQgb25lIHRpbWUgKi9cblx0XHR2YXIga2s7XG5cblx0XHRpZiAodGhpcy5tdGkgPT0gdGhpcy5OKzEpICAvKiBpZiBpbml0X3NlZWQoKSBoYXMgbm90IGJlZW4gY2FsbGVkLCAqL1xuXHRcdFx0dGhpcy5pbml0X3NlZWQoNTQ4OSk7ICAvKiBhIGRlZmF1bHQgaW5pdGlhbCBzZWVkIGlzIHVzZWQgKi9cblxuXHRcdGZvciAoa2s9MDtrazx0aGlzLk4tdGhpcy5NO2trKyspIHtcblx0XHRcdHkgPSAodGhpcy5tdFtra10mdGhpcy5VUFBFUl9NQVNLKXwodGhpcy5tdFtraysxXSZ0aGlzLkxPV0VSX01BU0spO1xuXHRcdFx0dGhpcy5tdFtra10gPSB0aGlzLm10W2trK3RoaXMuTV0gXiAoeSA+Pj4gMSkgXiBtYWcwMVt5ICYgMHgxXTtcblx0XHR9XG5cdFx0Zm9yICg7a2s8dGhpcy5OLTE7a2srKykge1xuXHRcdFx0eSA9ICh0aGlzLm10W2trXSZ0aGlzLlVQUEVSX01BU0spfCh0aGlzLm10W2trKzFdJnRoaXMuTE9XRVJfTUFTSyk7XG5cdFx0XHR0aGlzLm10W2trXSA9IHRoaXMubXRba2srKHRoaXMuTS10aGlzLk4pXSBeICh5ID4+PiAxKSBeIG1hZzAxW3kgJiAweDFdO1xuXHRcdH1cblx0XHR5ID0gKHRoaXMubXRbdGhpcy5OLTFdJnRoaXMuVVBQRVJfTUFTSyl8KHRoaXMubXRbMF0mdGhpcy5MT1dFUl9NQVNLKTtcblx0XHR0aGlzLm10W3RoaXMuTi0xXSA9IHRoaXMubXRbdGhpcy5NLTFdIF4gKHkgPj4+IDEpIF4gbWFnMDFbeSAmIDB4MV07XG5cblx0XHR0aGlzLm10aSA9IDA7XG5cdH1cblxuXHR5ID0gdGhpcy5tdFt0aGlzLm10aSsrXTtcblxuXHQvKiBUZW1wZXJpbmcgKi9cblx0eSBePSAoeSA+Pj4gMTEpO1xuXHR5IF49ICh5IDw8IDcpICYgMHg5ZDJjNTY4MDtcblx0eSBePSAoeSA8PCAxNSkgJiAweGVmYzYwMDAwO1xuXHR5IF49ICh5ID4+PiAxOCk7XG5cblx0cmV0dXJuIHkgPj4+IDA7XG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMHg3ZmZmZmZmZl0taW50ZXJ2YWwgKi9cbi8qIG9yaWdpbiBuYW1lIGdlbnJhbmRfaW50MzEgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUucmFuZG9tX2ludDMxID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiAodGhpcy5yYW5kb21faW50KCk+Pj4xKTtcbn1cblxuLyogZ2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBvbiBbMCwxXS1yZWFsLWludGVydmFsICovXG4vKiBvcmlnaW4gbmFtZSBnZW5yYW5kX3JlYWwxICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLnJhbmRvbV9pbmNsID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnJhbmRvbV9pbnQoKSooMS4wLzQyOTQ5NjcyOTUuMCk7XG5cdC8qIGRpdmlkZWQgYnkgMl4zMi0xICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMSktcmVhbC1pbnRlcnZhbCAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb20gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMucmFuZG9tX2ludCgpKigxLjAvNDI5NDk2NzI5Ni4wKTtcblx0LyogZGl2aWRlZCBieSAyXjMyICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gKDAsMSktcmVhbC1pbnRlcnZhbCAqL1xuLyogb3JpZ2luIG5hbWUgZ2VucmFuZF9yZWFsMyAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb21fZXhjbCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gKHRoaXMucmFuZG9tX2ludCgpICsgMC41KSooMS4wLzQyOTQ5NjcyOTYuMCk7XG5cdC8qIGRpdmlkZWQgYnkgMl4zMiAqL1xufVxuXG4vKiBnZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIG9uIFswLDEpIHdpdGggNTMtYml0IHJlc29sdXRpb24qL1xuLyogb3JpZ2luIG5hbWUgZ2VucmFuZF9yZXM1MyAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb21fbG9uZyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgYT10aGlzLnJhbmRvbV9pbnQoKT4+PjUsIGI9dGhpcy5yYW5kb21faW50KCk+Pj42O1xuXHRyZXR1cm4oYSo2NzEwODg2NC4wK2IpKigxLjAvOTAwNzE5OTI1NDc0MDk5Mi4wKTtcbn1cblxuLyogVGhlc2UgcmVhbCB2ZXJzaW9ucyBhcmUgZHVlIHRvIElzYWt1IFdhZGEsIDIwMDIvMDEvMDkgYWRkZWQgKi9cblxubW9kdWxlLmV4cG9ydHMgPSBNZXJzZW5uZVR3aXN0ZXI7XG4iLCAiLy8gaXZtIGRvZW5zJ3QgaGF2ZSBhIGNyeXB0byBpbXBsZW1lbnRhdGlvbi4gc2luY2Ugd2UgYnJvd3NlcmlmeSBtb2R1bGVzIGFscmVhZHksIHRoaXMgc2hpbSBpbXBsZW1lbnRzIHRoZSBicm93c2VyIGNyeXB0byBpbnRlcmZhY2UuXG4vLyBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20va3VtYXZpcy9wb2x5ZmlsbC1jcnlwdG8uZ2V0cmFuZG9tdmFsdWVzL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5cbnZhciBNZXJzZW5uZVR3aXN0ZXIgPSByZXF1aXJlKCdtZXJzZW5uZS10d2lzdGVyJyk7XG5cbnZhciB0d2lzdGVyID0gbmV3IE1lcnNlbm5lVHdpc3RlcihNYXRoLnJhbmRvbSgpICogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21WYWx1ZXMoYWJ2KSB7XG4gIHZhciBsID0gYWJ2Lmxlbmd0aDtcbiAgd2hpbGUgKGwtLSkge1xuICAgIGFidltsXSA9IE1hdGguZmxvb3IocmFuZG9tRmxvYXQoKSAqIDI1Nik7XG4gIH1cbiAgcmV0dXJuIGFidjtcbn1cblxuZnVuY3Rpb24gcmFuZG9tRmxvYXQoKSB7XG4gIHJldHVybiB0d2lzdGVyLnJhbmRvbSgpO1xufVxuXG5leHBvcnQgY29uc3QgY3J5cHRvID0ge1xuICBnZXRSYW5kb21WYWx1ZXMsXG59O1xuXG4vLyBlc2J1aWxkIGlzbid0IGluamVjdGluZyB0aGUgc2hpbSBleHBvcnRzIGludG8gZ2xvYmFsLiBpbiB0aGlzIHBhcnRpY3VsYXIgY2FzZSwgY3J5cHRvXG4vLyBsaWJyYXJ5IGlzIHVzdWFsbHkgdXNlZCBhcyBnbG9iYWwuY3J5cHRvIHdoaWNoIHJldHVybnMgdW5kZWZpbmVkIG90aGVyd2lzZS5cbi8vXG4vLyBhbHRlcm5hdGl2ZWx5IGEgZmV3IG90aGVyIGFwcHJvYWNoZXMgYXJlIHRyaWVkOlxuLy8gLSBzaGltIGdsb2JhbDogd2hpY2ggZG9lc24ndCB3b3JrIHdpdGggVk0gc29tZWhvdyBzaW5jZSB0aGUgVk0gbWFuYWdlcyBjb250ZXh0Lmdsb2JhbCB3aGljaFxuLy8gICBzZWVtcyBhIGRpZmZlcmVudCBvYmplY3QgZnJvbSB0aGUgZ2xvYmFsIGhlcmUuIGNhdXNpbmcgbWFuaWZlc3QgdG8gYmUgdW5kZWZpbmVkLlxuLy8gLSB1c2UgZXNidWlsZCBkZWZpbmUgZ2xvYmFsLmNyeXB0bzogY3J5cHRvLiBkaWRuJ3Qgd29yay5cbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2V2YW53L2VzYnVpbGQvaXNzdWVzLzI5NiBEaWRuJ3Qgd29yayBzaW5jZSB3ZSBiYW5uZWQgZXZhbCBpbiBWTS5cbi8vXG4vLyBMYXN0bHksIHdlIGNhbiBtb3ZlIHRoaXMgc2hpbSB0byB0aHVuayBidW5kbGUgYW5kIHJlZ2lzdGVyIGl0IGludG8gZ2xvYmFsIGZyb20gdGhlIHRodW5rIGJ1bmRsZS5cbi8vIEl0IGhhcyB0aGUgc2FtZSBzaWRlIGVmZmVjdCBvZiB0aGUgc2hpbSB0aG91Z2guXG4vL1xuLy8gcGxlYXNlIG5vdGUgdGhhdCB0aGlzIGNhdXNlcyBhIGdsb2JhbCBsZWFrIGFuZCBuZWVkcyBiZSBpZ25vcmVkIGluIHNvbWUgY29uZmlncy5cbi8vIE5vZGUgMTkgaGFzIG5hdGl2ZSBzdXBwb3J0IGZvciB0aGUgY3J5cHRvIG1vZHVsZS5cbmlmICghZ2xvYmFsLmNyeXB0bz8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIGdsb2JhbC5jcnlwdG8gPSBjcnlwdG87XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlN5bmNJbnRlcnZhbCA9IGV4cG9ydHMuUXVvdGFMaW1pdFR5cGUgPSBleHBvcnRzLkZlYXR1cmVTZXQgPSBleHBvcnRzLlRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uID0gZXhwb3J0cy5Qb3N0U2V0dXBUeXBlID0gZXhwb3J0cy5BdXRoZW50aWNhdGlvblR5cGUgPSBleHBvcnRzLlBhY2tDYXRlZ29yeSA9IHZvaWQgMDtcbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xudmFyIFBhY2tDYXRlZ29yeTtcbihmdW5jdGlvbiAoUGFja0NhdGVnb3J5KSB7XG4gICAgUGFja0NhdGVnb3J5W1wiQ1JNXCJdID0gXCJDUk1cIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJDYWxlbmRhclwiXSA9IFwiQ2FsZW5kYXJcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJDb21tdW5pY2F0aW9uXCJdID0gXCJDb21tdW5pY2F0aW9uXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiRGF0YVN0b3JhZ2VcIl0gPSBcIkRhdGFTdG9yYWdlXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiRGVzaWduXCJdID0gXCJEZXNpZ25cIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJGaW5hbmNpYWxcIl0gPSBcIkZpbmFuY2lhbFwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIkZ1blwiXSA9IFwiRnVuXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiR2VvXCJdID0gXCJHZW9cIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJJVFwiXSA9IFwiSVRcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJNYXRoZW1hdGljc1wiXSA9IFwiTWF0aGVtYXRpY3NcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJPcmdhbml6YXRpb25cIl0gPSBcIk9yZ2FuaXphdGlvblwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIlJlY3J1aXRpbmdcIl0gPSBcIlJlY3J1aXRpbmdcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJTaG9wcGluZ1wiXSA9IFwiU2hvcHBpbmdcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJTb2NpYWxcIl0gPSBcIlNvY2lhbFwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIlNwb3J0c1wiXSA9IFwiU3BvcnRzXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiVHJhdmVsXCJdID0gXCJUcmF2ZWxcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJXZWF0aGVyXCJdID0gXCJXZWF0aGVyXCI7XG59KShQYWNrQ2F0ZWdvcnkgPSBleHBvcnRzLlBhY2tDYXRlZ29yeSB8fCAoZXhwb3J0cy5QYWNrQ2F0ZWdvcnkgPSB7fSkpO1xuLyoqXG4gKiBBdXRoZW50aWNhdGlvbiB0eXBlcyBzdXBwb3J0ZWQgYnkgQ29kYSBQYWNrcy5cbiAqXG4gKiBAc2VlIFtBdXRoZW50aWNhdGluZyB3aXRoIG90aGVyIHNlcnZpY2VzXShodHRwczovL2NvZGEuaW8vcGFja3MvYnVpbGQvbGF0ZXN0L2d1aWRlcy9iYXNpY3MvYXV0aGVudGljYXRpb24vKVxuICogQHNlZSBbQXV0aGVudGljYXRpb24gc2FtcGxlc10oaHR0cHM6Ly9jb2RhLmlvL3BhY2tzL2J1aWxkL2xhdGVzdC9zYW1wbGVzL3RvcGljL2F1dGhlbnRpY2F0aW9uLylcbiAqL1xudmFyIEF1dGhlbnRpY2F0aW9uVHlwZTtcbihmdW5jdGlvbiAoQXV0aGVudGljYXRpb25UeXBlKSB7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoaXMgcGFjayBkb2VzIG5vdCB1c2UgYXV0aGVudGljYXRpb24uIFlvdSBtYXkgYWxzbyBvbWl0IGFuIGF1dGhlbnRpY2F0aW9uIGRlY2xhcmF0aW9uIGVudGlyZWx5LlxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIk5vbmVcIl0gPSBcIk5vbmVcIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdXNpbmcgYW4gSFRUUCBoZWFkZXIgb2YgdGhlIGZvcm0gYEF1dGhvcml6YXRpb246IEJlYXJlciA8dG9rZW4+YC5cbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIEhlYWRlckJlYXJlclRva2VuQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiSGVhZGVyQmVhcmVyVG9rZW5cIl0gPSBcIkhlYWRlckJlYXJlclRva2VuXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIGFuIEhUVFAgaGVhZGVyIHdpdGggYSBjdXN0b20gbmFtZSBhbmQgdG9rZW4gcHJlZml4IHRoYXQgeW91IHNwZWNpZnkuXG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBDdXN0b21IZWFkZXJUb2tlbkF1dGhlbnRpY2F0aW9ufVxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIkN1c3RvbUhlYWRlclRva2VuXCJdID0gXCJDdXN0b21IZWFkZXJUb2tlblwiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB1c2luZyBhIHRva2VuIHRoYXQgaXMgcGFzc2VkIGFzIGEgVVJMIHBhcmFtZXRlciB3aXRoIGVhY2ggcmVxdWVzdCwgZS5nLlxuICAgICAqIGBodHRwczovL2V4YW1wbGUuY29tL2FwaT9wYXJhbU5hbWU9dG9rZW5gLlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgUXVlcnlQYXJhbVRva2VuQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiUXVlcnlQYXJhbVRva2VuXCJdID0gXCJRdWVyeVBhcmFtVG9rZW5cIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdXNpbmcgbXVsdGlwbGUgdG9rZW5zLCBlYWNoIHBhc3NlZCBhcyBhIGRpZmZlcmVudCBVUkwgcGFyYW1ldGVyLCBlLmcuXG4gICAgICogYGh0dHBzOi8vZXhhbXBsZS5jb20vYXBpP3BhcmFtMT10b2tlbjEmcGFyYW0yPXRva2VuMmBcbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIE11bHRpUXVlcnlQYXJhbVRva2VuQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiTXVsdGlRdWVyeVBhcmFtVG9rZW5cIl0gPSBcIk11bHRpUXVlcnlQYXJhbVRva2VuXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIE9BdXRoMi4gVGhlIEFQSSBtdXN0IHVzZSBhIChsYXJnZWx5KSBzdGFuZGFyZHMtY29tcGxpYW50IGltcGxlbWVudGF0aW9uIG9mIE9BdXRoMi5cbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIE9BdXRoMkF1dGhlbnRpY2F0aW9ufVxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIk9BdXRoMlwiXSA9IFwiT0F1dGgyXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIEhUVFAgQmFzaWMgYXV0aG9yaXphdGlvbi4gVGhlIHVzZXIgcHJvdmlkZXMgYSB1c2VybmFtZSBhbmQgcGFzc3dvcmRcbiAgICAgKiAoc29tZXRpbWVzIG9wdGlvbmFsKSB3aGljaCBhcmUgaW5jbHVkZWQgYXMgYW4gSFRUUCBoZWFkZXIgYWNjb3JkaW5nIHRvIHRoZSBCYXNpYyBhdXRoIHN0YW5kYXJkLlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgV2ViQmFzaWNBdXRoZW50aWNhdGlvbn1cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJXZWJCYXNpY1wiXSA9IFwiV2ViQmFzaWNcIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgaW4gYSBjdXN0b20gd2F5IGJ5IGhhdmluZyBvbmUgb3IgbW9yZSBhcmJpdHJhcnkgc2VjcmV0IHZhbHVlcyBpbnNlcnRlZCBpbnRvIHRoZSByZXF1ZXN0IFVSTCwgYm9keSxcbiAgICAgKiBoZWFkZXJzLCBvciB0aGUgZm9ybSBkYXRhIHVzaW5nIHRlbXBsYXRlIHJlcGxhY2VtZW50LlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgQ3VzdG9tQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiQ3VzdG9tXCJdID0gXCJDdXN0b21cIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdG8gQW1hem9uIFdlYiBTZXJ2aWNlcyB1c2luZyBhbiBJQU0gYWNjZXNzIGtleSBpZCAmIHNlY3JldCBhY2Nlc3Mga2V5IHBhaXIuXG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBBV1NBY2Nlc3NLZXlBdXRoZW50aWNhdGlvbn1cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJBV1NBY2Nlc3NLZXlcIl0gPSBcIkFXU0FjY2Vzc0tleVwiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB0byBBbWF6b24gV2ViIFNlcnZpY2VzIGJ5IGFzc3VtaW5nIGFuIElBTSByb2xlLiBUaGlzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkLlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgQVdTQXNzdW1lUm9sZUF1dGhlbnRpY2F0aW9ufVxuICAgICAqIEBoaWRkZW5cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJBV1NBc3N1bWVSb2xlXCJdID0gXCJBV1NBc3N1bWVSb2xlXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIGEgQ29kYSBSRVNUIEFQSSB0b2tlbiwgc2VudCBhcyBhbiBIVFRQIGhlYWRlci5cbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIENvZGFBcGlCZWFyZXJUb2tlbkF1dGhlbnRpY2F0aW9ufVxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIkNvZGFBcGlIZWFkZXJCZWFyZXJUb2tlblwiXSA9IFwiQ29kYUFwaUhlYWRlckJlYXJlclRva2VuXCI7XG4gICAgLyoqXG4gICAgICogT25seSBmb3IgdXNlIGJ5IENvZGEtYXV0aG9yZWQgcGFja3MuXG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBWYXJpb3VzQXV0aGVudGljYXRpb259XG4gICAgICogQGhpZGRlblxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIlZhcmlvdXNcIl0gPSBcIlZhcmlvdXNcIjtcbn0pKEF1dGhlbnRpY2F0aW9uVHlwZSA9IGV4cG9ydHMuQXV0aGVudGljYXRpb25UeXBlIHx8IChleHBvcnRzLkF1dGhlbnRpY2F0aW9uVHlwZSA9IHt9KSk7XG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIHBvc3QtYWNjb3VudC1zZXR1cCBzdGVwIHR5cGVzLiBTZWUge0BsaW5rIFBvc3RTZXR1cH0uXG4gKi9cbnZhciBQb3N0U2V0dXBUeXBlO1xuKGZ1bmN0aW9uIChQb3N0U2V0dXBUeXBlKSB7XG4gICAgLyoqXG4gICAgICogU2VlIHtAbGluayBTZXRFbmRwb2ludH0uXG4gICAgICovXG4gICAgUG9zdFNldHVwVHlwZVtcIlNldEVuZHBvaW50XCJdID0gXCJTZXRFbmRQb2ludFwiO1xufSkoUG9zdFNldHVwVHlwZSA9IGV4cG9ydHMuUG9zdFNldHVwVHlwZSB8fCAoZXhwb3J0cy5Qb3N0U2V0dXBUeXBlID0ge30pKTtcbi8qKlxuICogV2hlcmUgdG8gcGFzcyB0aGUgY2xpZW50IGNyZWRlbnRpYWxzIChjbGllbnQgSUQgYW5kIGNsaWVudCBzZWNyZXQpIHdoZW4gbWFraW5nIHRoZSBPQXV0aDIgdG9rZW5cbiAqIGV4Y2hhbmdlIHJlcXVlc3QuIFVzZWQgaW4ge0BsaW5rIE9BdXRoMkF1dGhlbnRpY2F0aW9uLmNyZWRlbnRpYWxzTG9jYXRpb259LlxuICovXG52YXIgVG9rZW5FeGNoYW5nZUNyZWRlbnRpYWxzTG9jYXRpb247XG4oZnVuY3Rpb24gKFRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQWxsb3cgQ29kYSB0byBkZXRlcm1pbmUgdGhpcyBhdXRvbWF0aWNhbGx5LiBDdXJyZW50bHkgdGhhdCBtZWFucyBDb2RhIHRyaWVzIHBhc3NpbmcgdGhlXG4gICAgICogY3JlZGVudGlhbHMgaW4gdGhlIGJvZHkgZmlyc3QsIGFuZCBpZiB0aGF0IGZhaWxzIHRoZW4gdHJpZXMgcGFzc2luZyB0aGVtIGluIHRoZSBBdXRob3JpemF0aW9uXG4gICAgICogaGVhZGVyLlxuICAgICAqL1xuICAgIFRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uW1wiQXV0b21hdGljXCJdID0gXCJBdXRvbWF0aWNcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgY3JlZGVudGlhbHMgYXJlIHBhc3NlZCBpbiB0aGUgYm9keSBvZiB0aGUgcmVxdWVzdCwgZW5jb2RlZCBhc1xuICAgICAqIGBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRgIGFsb25nIHdpdGggdGhlIG90aGVyIHBhcmFtZXRlcnMuXG4gICAgICovXG4gICAgVG9rZW5FeGNoYW5nZUNyZWRlbnRpYWxzTG9jYXRpb25bXCJCb2R5XCJdID0gXCJCb2R5XCI7XG4gICAgLyoqXG4gICAgICogVGhlIGNyZWRlbnRpYWxzIGFyZSBwYXNzZWQgaW4gdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyIHVzaW5nIHRoZSBgQmFzaWNgIHNjaGVtZS5cbiAgICAgKi9cbiAgICBUb2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbltcIkF1dGhvcml6YXRpb25IZWFkZXJcIl0gPSBcIkF1dGhvcml6YXRpb25IZWFkZXJcIjtcbn0pKFRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uID0gZXhwb3J0cy5Ub2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbiB8fCAoZXhwb3J0cy5Ub2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbiA9IHt9KSk7XG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBAaWdub3JlXG4gKi9cbnZhciBGZWF0dXJlU2V0O1xuKGZ1bmN0aW9uIChGZWF0dXJlU2V0KSB7XG4gICAgRmVhdHVyZVNldFtcIkJhc2ljXCJdID0gXCJCYXNpY1wiO1xuICAgIEZlYXR1cmVTZXRbXCJQcm9cIl0gPSBcIlByb1wiO1xuICAgIEZlYXR1cmVTZXRbXCJUZWFtXCJdID0gXCJUZWFtXCI7XG4gICAgRmVhdHVyZVNldFtcIkVudGVycHJpc2VcIl0gPSBcIkVudGVycHJpc2VcIjtcbn0pKEZlYXR1cmVTZXQgPSBleHBvcnRzLkZlYXR1cmVTZXQgfHwgKGV4cG9ydHMuRmVhdHVyZVNldCA9IHt9KSk7XG4vKipcbiAqIEBpZ25vcmVcbiAqIEBkZXByZWNhdGVkXG4gKi9cbnZhciBRdW90YUxpbWl0VHlwZTtcbihmdW5jdGlvbiAoUXVvdGFMaW1pdFR5cGUpIHtcbiAgICBRdW90YUxpbWl0VHlwZVtcIkFjdGlvblwiXSA9IFwiQWN0aW9uXCI7XG4gICAgUXVvdGFMaW1pdFR5cGVbXCJHZXR0ZXJcIl0gPSBcIkdldHRlclwiO1xuICAgIFF1b3RhTGltaXRUeXBlW1wiU3luY1wiXSA9IFwiU3luY1wiO1xuICAgIFF1b3RhTGltaXRUeXBlW1wiTWV0YWRhdGFcIl0gPSBcIk1ldGFkYXRhXCI7XG59KShRdW90YUxpbWl0VHlwZSA9IGV4cG9ydHMuUXVvdGFMaW1pdFR5cGUgfHwgKGV4cG9ydHMuUXVvdGFMaW1pdFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBAaWdub3JlXG4gKiBAZGVwcmVjYXRlZFxuICovXG52YXIgU3luY0ludGVydmFsO1xuKGZ1bmN0aW9uIChTeW5jSW50ZXJ2YWwpIHtcbiAgICBTeW5jSW50ZXJ2YWxbXCJNYW51YWxcIl0gPSBcIk1hbnVhbFwiO1xuICAgIFN5bmNJbnRlcnZhbFtcIkRhaWx5XCJdID0gXCJEYWlseVwiO1xuICAgIFN5bmNJbnRlcnZhbFtcIkhvdXJseVwiXSA9IFwiSG91cmx5XCI7XG4gICAgU3luY0ludGVydmFsW1wiRXZlcnlUZW5NaW51dGVzXCJdID0gXCJFdmVyeVRlbk1pbnV0ZXNcIjtcbn0pKFN5bmNJbnRlcnZhbCA9IGV4cG9ydHMuU3luY0ludGVydmFsIHx8IChleHBvcnRzLlN5bmNJbnRlcnZhbCA9IHt9KSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlByZWNhbm5lZERhdGVSYW5nZSA9IGV4cG9ydHMuVmFsaWRGZXRjaE1ldGhvZHMgPSBleHBvcnRzLk5ldHdvcmtDb25uZWN0aW9uID0gZXhwb3J0cy5Db25uZWN0aW9uUmVxdWlyZW1lbnQgPSBleHBvcnRzLlBhcmFtZXRlclR5cGVJbnB1dE1hcCA9IGV4cG9ydHMuUGFyYW1ldGVyVHlwZSA9IGV4cG9ydHMuZmlsZUFycmF5ID0gZXhwb3J0cy5pbWFnZUFycmF5ID0gZXhwb3J0cy5odG1sQXJyYXkgPSBleHBvcnRzLmRhdGVBcnJheSA9IGV4cG9ydHMuYm9vbGVhbkFycmF5ID0gZXhwb3J0cy5udW1iZXJBcnJheSA9IGV4cG9ydHMuc3RyaW5nQXJyYXkgPSBleHBvcnRzLmlzQXJyYXlUeXBlID0gZXhwb3J0cy5UeXBlID0gdm9pZCAwO1xuLyoqXG4gKiBNYXJrZXJzIHVzZWQgaW50ZXJuYWxseSB0byByZXByZXNlbnQgZGF0YSB0eXBlcyBmb3IgcGFyYW1ldGVycyBhbmQgcmV0dXJuIHZhbHVlcy5cbiAqIEl0IHNob3VsZCBub3QgYmUgbmVjZXNzYXJ5IHRvIGV2ZXIgdXNlIHRoZXNlIHZhbHVlcyBkaXJlY3RseS5cbiAqXG4gKiBXaGVuIGRlZmluaW5nIGEgcGFyYW1ldGVyLCB1c2Uge0BsaW5rIFBhcmFtZXRlclR5cGV9LiBXaGVuIGRlZmluaW5nXG4gKiBhIGZvcm11bGEgcmV0dXJuIHZhbHVlLCBvciBwcm9wZXJ0aWVzIHdpdGhpbiBhbiBvYmplY3QgcmV0dXJuIHZhbHVlLFxuICogdXNlIHtAbGluayBWYWx1ZVR5cGV9LlxuICovXG52YXIgVHlwZTtcbihmdW5jdGlvbiAoVHlwZSkge1xuICAgIFR5cGVbVHlwZVtcInN0cmluZ1wiXSA9IDBdID0gXCJzdHJpbmdcIjtcbiAgICBUeXBlW1R5cGVbXCJudW1iZXJcIl0gPSAxXSA9IFwibnVtYmVyXCI7XG4gICAgVHlwZVtUeXBlW1wib2JqZWN0XCJdID0gMl0gPSBcIm9iamVjdFwiO1xuICAgIFR5cGVbVHlwZVtcImJvb2xlYW5cIl0gPSAzXSA9IFwiYm9vbGVhblwiO1xuICAgIFR5cGVbVHlwZVtcImRhdGVcIl0gPSA0XSA9IFwiZGF0ZVwiO1xuICAgIFR5cGVbVHlwZVtcImh0bWxcIl0gPSA1XSA9IFwiaHRtbFwiO1xuICAgIFR5cGVbVHlwZVtcImltYWdlXCJdID0gNl0gPSBcImltYWdlXCI7XG4gICAgVHlwZVtUeXBlW1wiZmlsZVwiXSA9IDddID0gXCJmaWxlXCI7XG4gICAgVHlwZVtUeXBlW1wibWFya2Rvd25cIl0gPSA4XSA9IFwibWFya2Rvd25cIjtcbn0pKFR5cGUgPSBleHBvcnRzLlR5cGUgfHwgKGV4cG9ydHMuVHlwZSA9IHt9KSk7XG5mdW5jdGlvbiBpc0FycmF5VHlwZShvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai50eXBlID09PSAnYXJyYXknICYmIHR5cGVvZiBvYmouaXRlbXMgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc0FycmF5VHlwZSA9IGlzQXJyYXlUeXBlO1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLnN0cmluZ0FycmF5ID0ge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgaXRlbXM6IFR5cGUuc3RyaW5nLFxufTtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0cy5udW1iZXJBcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLm51bWJlcixcbn07XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydHMuYm9vbGVhbkFycmF5ID0ge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgaXRlbXM6IFR5cGUuYm9vbGVhbixcbn07XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydHMuZGF0ZUFycmF5ID0ge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgaXRlbXM6IFR5cGUuZGF0ZSxcbn07XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydHMuaHRtbEFycmF5ID0ge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgaXRlbXM6IFR5cGUuaHRtbCxcbn07XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydHMuaW1hZ2VBcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLmltYWdlLFxufTtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0cy5maWxlQXJyYXkgPSB7XG4gICAgdHlwZTogJ2FycmF5JyxcbiAgICBpdGVtczogVHlwZS5maWxlLFxufTtcbi8qKlxuICogRW51bWVyYXRpb24gb2YgdHlwZXMgb2YgZm9ybXVsYSBwYXJhbWV0ZXJzLiBUaGVzZSBkZXNjcmliZSBDb2RhIHZhbHVlIHR5cGVzIChhcyBvcHBvc2VkIHRvIEphdmFTY3JpcHQgdmFsdWUgdHlwZXMpLlxuICovXG52YXIgUGFyYW1ldGVyVHlwZTtcbihmdW5jdGlvbiAoUGFyYW1ldGVyVHlwZSkge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgQ29kYSB0ZXh0IHZhbHVlLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTdHJpbmdcIl0gPSBcInN0cmluZ1wiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgQ29kYSBudW1iZXIgdmFsdWUuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIk51bWJlclwiXSA9IFwibnVtYmVyXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBDb2RhIGJvb2xlYW4gdmFsdWUuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkJvb2xlYW5cIl0gPSBcImJvb2xlYW5cIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgZGF0ZSB2YWx1ZSAod2hpY2ggaW5jbHVkZXMgdGltZSBhbmQgZGF0ZXRpbWUgdmFsdWVzKS5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiRGF0ZVwiXSA9IFwiZGF0ZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgQ29kYSByaWNoIHRleHQgdmFsdWUgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBwYWNrIGFzIEhUTUwuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkh0bWxcIl0gPSBcImh0bWxcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgaW1hZ2UuIFRoZSBwYWNrIGlzIHBhc3NlZCBhbiBpbWFnZSBVUkwuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkltYWdlXCJdID0gXCJpbWFnZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgQ29kYSBmaWxlLiBUaGUgcGFjayBpcyBwYXNzZWQgYSBmaWxlIFVSTC5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiRmlsZVwiXSA9IFwiZmlsZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgQ29kYSByaWNoIHRleHQgdmFsdWUgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBwYWNrIGFzIE1hcmtkb3duLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJNYXJrZG93blwiXSA9IFwibWFya2Rvd25cIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSB0ZXh0IHZhbHVlcy5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3RyaW5nQXJyYXlcIl0gPSBcInN0cmluZ0FycmF5XCI7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIFN0cmluZ0FycmF5fSB0aGF0IGFjY2VwdHMgdW5wYXJzYWJsZSB2YWx1ZXMgYXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlNwYXJzZVN0cmluZ0FycmF5XCJdID0gXCJzcGFyc2VTdHJpbmdBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgbGlzdCBvZiBDb2RhIG51bWJlciB2YWx1ZXMuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIk51bWJlckFycmF5XCJdID0gXCJudW1iZXJBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBOdW1iZXJBcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VOdW1iZXJBcnJheVwiXSA9IFwic3BhcnNlTnVtYmVyQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSBib29sZWFuIHZhbHVlcy5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiQm9vbGVhbkFycmF5XCJdID0gXCJib29sZWFuQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgQm9vbGVhbkFycmF5fSB0aGF0IGFjY2VwdHMgdW5wYXJzYWJsZSB2YWx1ZXMgYXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlNwYXJzZUJvb2xlYW5BcnJheVwiXSA9IFwic3BhcnNlQm9vbGVhbkFycmF5XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBsaXN0IG9mIENvZGEgZGF0ZSB2YWx1ZXMgKHdoaWNoIGluY2x1ZGVzIHRpbWUgYW5kIGRhdGV0aW1lIHZhbHVlcykuXG4gICAgICpcbiAgICAgKiBDdXJyZW50bHksIHdoZW4gc3VjaCBhIHBhcmFtZXRlciBpcyB1c2VkIHdpdGggYSBzeW5jIHRhYmxlIGZvcm11bGEgb3IgYW4gYWN0aW9uIGZvcm11bGFcbiAgICAgKiAoe0BsaW5rIEJhc2VGb3JtdWxhRGVmLmlzQWN0aW9ufSksIHdoaWNoIHdpbGwgZ2VuZXJhdGUgYSBidWlsZGVyIFVJIGZvciBzZWxlY3RpbmcgcGFyYW1ldGVycywgYSBkYXRlIGFycmF5XG4gICAgICogcGFyYW1ldGVyIHdpbGwgYWx3YXlzIHJlbmRlciBhcyBhIGRhdGUgcmFuZ2Ugc2VsZWN0b3IuIEEgZGF0ZSByYW5nZSB3aWxsIGFsd2F5cyBiZSBwYXNzZWQgdG8gYSBwYWNrIGZvcm11bGFcbiAgICAgKiBhcyBhIGxpc3Qgb2YgdHdvIGVsZW1lbnRzLCB0aGUgYmVnaW5uaW5nIG9mIHRoZSByYW5nZSBhbmQgdGhlIGVuZCBvZiB0aGUgcmFuZ2UuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkRhdGVBcnJheVwiXSA9IFwiZGF0ZUFycmF5XCI7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIERhdGVBcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VEYXRlQXJyYXlcIl0gPSBcInNwYXJzZURhdGVBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgbGlzdCBvZiBDb2RhIHJpY2ggdGV4dCB2YWx1ZXMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBwYWNrIGFzIEhUTUwuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkh0bWxBcnJheVwiXSA9IFwiaHRtbEFycmF5YFwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBIdG1sQXJyYXl9IHRoYXQgYWNjZXB0cyB1bnBhcnNhYmxlIHZhbHVlcyBhcyBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3BhcnNlSHRtbEFycmF5XCJdID0gXCJzcGFyc2VIdG1sQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSBpbWFnZSB2YWx1ZXMuIFRoZSBwYWNrIGlzIHBhc3NlZCBhIGxpc3Qgb2YgaW1hZ2UgVVJMcy5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiSW1hZ2VBcnJheVwiXSA9IFwiaW1hZ2VBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBJbWFnZUFycmF5fSB0aGF0IGFjY2VwdHMgdW5wYXJzYWJsZSB2YWx1ZXMgYXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlNwYXJzZUltYWdlQXJyYXlcIl0gPSBcInNwYXJzZUltYWdlQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSBmaWxlIHZhbHVlcy4gVGhlIHBhY2sgaXMgcGFzc2VkIGEgbGlzdCBvZiBmaWxlIFVSTHMuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkZpbGVBcnJheVwiXSA9IFwiZmlsZUFycmF5XCI7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIEZpbGVBcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VGaWxlQXJyYXlcIl0gPSBcInNwYXJzZUZpbGVBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgbGlzdCBvZiBDb2RhIHJpY2ggdGV4dCB2YWx1ZXMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBwYWNrIGFzIE1hcmtkb3duLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJNYXJrZG93bkFycmF5XCJdID0gXCJtYXJrZG93bkFycmF5YFwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBNYXJrZG93bkFycmF5fSB0aGF0IGFjY2VwdHMgdW5wYXJzYWJsZSB2YWx1ZXMgYXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlNwYXJzZU1hcmtkb3duQXJyYXlcIl0gPSBcInNwYXJzZU1hcmtkb3duQXJyYXlcIjtcbn0pKFBhcmFtZXRlclR5cGUgPSBleHBvcnRzLlBhcmFtZXRlclR5cGUgfHwgKGV4cG9ydHMuUGFyYW1ldGVyVHlwZSA9IHt9KSk7XG5leHBvcnRzLlBhcmFtZXRlclR5cGVJbnB1dE1hcCA9IHtcbiAgICBbUGFyYW1ldGVyVHlwZS5TdHJpbmddOiBUeXBlLnN0cmluZyxcbiAgICBbUGFyYW1ldGVyVHlwZS5OdW1iZXJdOiBUeXBlLm51bWJlcixcbiAgICBbUGFyYW1ldGVyVHlwZS5Cb29sZWFuXTogVHlwZS5ib29sZWFuLFxuICAgIFtQYXJhbWV0ZXJUeXBlLkRhdGVdOiBUeXBlLmRhdGUsXG4gICAgW1BhcmFtZXRlclR5cGUuSHRtbF06IFR5cGUuaHRtbCxcbiAgICBbUGFyYW1ldGVyVHlwZS5JbWFnZV06IFR5cGUuaW1hZ2UsXG4gICAgW1BhcmFtZXRlclR5cGUuRmlsZV06IFR5cGUuZmlsZSxcbiAgICBbUGFyYW1ldGVyVHlwZS5NYXJrZG93bl06IFR5cGUubWFya2Rvd24sXG4gICAgW1BhcmFtZXRlclR5cGUuU3RyaW5nQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLnN0cmluZyB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLk51bWJlckFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5udW1iZXIgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5Cb29sZWFuQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmJvb2xlYW4gfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5EYXRlQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmRhdGUgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5IdG1sQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmh0bWwgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5JbWFnZUFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5pbWFnZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLkZpbGVBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuZmlsZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLk1hcmtkb3duQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLm1hcmtkb3duIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuU3BhcnNlU3RyaW5nQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLnN0cmluZywgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZU51bWJlckFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5udW1iZXIsIGFsbG93RW1wdHk6IHRydWUgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5TcGFyc2VCb29sZWFuQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmJvb2xlYW4sIGFsbG93RW1wdHk6IHRydWUgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5TcGFyc2VEYXRlQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmRhdGUsIGFsbG93RW1wdHk6IHRydWUgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5TcGFyc2VIdG1sQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmh0bWwsIGFsbG93RW1wdHk6IHRydWUgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5TcGFyc2VJbWFnZUFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5pbWFnZSwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZUZpbGVBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuZmlsZSwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZU1hcmtkb3duQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLm1hcmtkb3duLCBhbGxvd0VtcHR5OiB0cnVlIH0sXG59O1xuLyoqXG4gKiBFbnVtZXJhdGlvbiBvZiByZXF1aXJlbWVudCBzdGF0ZXMgZm9yIHdoZXRoZXIgYSBnaXZlbiBmb3JtdWxhIG9yIHN5bmMgdGFibGUgcmVxdWlyZXNcbiAqIGEgY29ubmVjdGlvbiAoYWNjb3VudCkgdG8gdXNlLlxuICovXG52YXIgQ29ubmVjdGlvblJlcXVpcmVtZW50O1xuKGZ1bmN0aW9uIChDb25uZWN0aW9uUmVxdWlyZW1lbnQpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhpcyBidWlsZGluZyBibG9jayBkb2VzIG5vdCBtYWtlIHVzZSBvZiBhbiBhY2NvdW50LlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25SZXF1aXJlbWVudFtcIk5vbmVcIl0gPSBcIm5vbmVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGlzIGJ1aWxkaW5nIGJsb2NrIGNhbiBiZSB1c2VkIHdpdGggb3Igd2l0aG91dCBhbiBhY2NvdW50LlxuICAgICAqXG4gICAgICogQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGZvcm11bGEgKG9yIHN5bmMgZm9ybXVsYSkgZm9yIHRoZSBjYWxsaW5nIHVzZXJcbiAgICAgKiB0byBzcGVjaWZ5IGFuIGFjY291bnQgdG8gdXNlLlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25SZXF1aXJlbWVudFtcIk9wdGlvbmFsXCJdID0gXCJvcHRpb25hbFwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoaXMgYnVpbGRpbmcgYmxvY2sgbXVzdCBiZSB1c2VkIHdpdGggYW4gYWNjb3VudC5cbiAgICAgKlxuICAgICAqIEEgcmVxdWlyZWQgcGFyYW1ldGVyIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGZvcm11bGEgKG9yIHN5bmMgZm9ybXVsYSkgZm9yIHRoZSBjYWxsaW5nIHVzZXJcbiAgICAgKiB0byBzcGVjaWZ5IGFuIGFjY291bnQgdG8gdXNlLlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25SZXF1aXJlbWVudFtcIlJlcXVpcmVkXCJdID0gXCJyZXF1aXJlZFwiO1xufSkoQ29ubmVjdGlvblJlcXVpcmVtZW50ID0gZXhwb3J0cy5Db25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgKGV4cG9ydHMuQ29ubmVjdGlvblJlcXVpcmVtZW50ID0ge30pKTtcbi8qKiBAZGVwcmVjYXRlZCB1c2UgYENvbm5lY3Rpb25SZXF1aXJlbWVudGAgaW5zdGVhZCAqL1xudmFyIE5ldHdvcmtDb25uZWN0aW9uO1xuKGZ1bmN0aW9uIChOZXR3b3JrQ29ubmVjdGlvbikge1xuICAgIE5ldHdvcmtDb25uZWN0aW9uW1wiTm9uZVwiXSA9IFwibm9uZVwiO1xuICAgIE5ldHdvcmtDb25uZWN0aW9uW1wiT3B0aW9uYWxcIl0gPSBcIm9wdGlvbmFsXCI7XG4gICAgTmV0d29ya0Nvbm5lY3Rpb25bXCJSZXF1aXJlZFwiXSA9IFwicmVxdWlyZWRcIjtcbn0pKE5ldHdvcmtDb25uZWN0aW9uID0gZXhwb3J0cy5OZXR3b3JrQ29ubmVjdGlvbiB8fCAoZXhwb3J0cy5OZXR3b3JrQ29ubmVjdGlvbiA9IHt9KSk7XG4vKiogVGhlIEhUVFAgbWV0aG9kcyAodmVyYnMpIHN1cHBvcnRlZCBieSB0aGUgZmV0Y2hlci4gKi9cbmV4cG9ydHMuVmFsaWRGZXRjaE1ldGhvZHMgPSBbJ0dFVCcsICdQQVRDSCcsICdQT1NUJywgJ1BVVCcsICdERUxFVEUnLCAnSEVBRCddO1xuLy8gQSBtYXBwaW5nIGV4aXN0cyBpbiBjb2RhIHRoYXQgYWxsb3dzIHRoZXNlIHRvIHNob3cgdXAgaW4gdGhlIFVJLlxuLy8gSWYgYWRkaW5nIG5ldyB2YWx1ZXMgaGVyZSwgYWRkIHRoZW0gdG8gdGhhdCBtYXBwaW5nIGFuZCB2aWNlIHZlcnNhLlxuLyoqXG4gKiBTcGVjaWFsIFwibGl2ZVwiIGRhdGUgcmFuZ2UgdmFsdWVzIHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIHtAbGluayBQYXJhbURlZi5zdWdnZXN0ZWRWYWx1ZX1cbiAqIGZvciBhIGRhdGUgYXJyYXkgcGFyYW1ldGVyLlxuICpcbiAqIERhdGUgYXJyYXkgcGFyYW1ldGVycyBhcmUgbWVhbnQgdG8gcmVwcmVzZW50IGRhdGUgcmFuZ2VzLiBBIGRhdGUgcmFuZ2UgY2FuXG4gKiBiZSBhIGZpeGVkIHJhbmdlLCBlLmcuIEFwcmlsIDEsIDIwMjAgLSBNYXkgMTUsIDIwMjAsIG9yIGl0IGNhbiBiZSBhIFwibGl2ZVwiXG4gKiByYW5nZSwgbGlrZSBcImxhc3QgMzAgZGF5c1wiLlxuICpcbiAqIEF0IGV4ZWN1dGlvbiB0aW1lLCBhIGRhdGUgcmFuZ2Ugd2lsbCBhbHdheXMgYmUgcGFzc2VkIHRvIGEgcGFjayBhcyBhblxuICogYXJyYXkgb2YgdHdvIHNwZWNpZmljIGRhdGVzLCBidXQgZm9yIG1hbnkgdXNlIGNhc2VzLCBpdCBpcyBuZWNlc3NhcnlcbiAqIHRvIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIHRoYXQgaXMgYSBcImxpdmVcIiByYW5nZSByYXRoZXIgdGhhbiBoYXJkY29kZWRcbiAqIG9uZS4gRm9yIGV4YW1wbGUsIGlmIHlvdXIgcGFjayBoYXMgYSB0YWJsZSB0aGF0IHN5bmNzIHJlY2VudCBlbWFpbHMsXG4gKiB5b3UgbWlnaHQgd2FudCB0byBoYXZlIGEgZGF0ZSByYW5nZSBwYXJhbWV0ZXIgdGhhdCBkZWZhdWx0IHRvXG4gKiBcImxhc3QgNyBkYXlzXCIuIERlZmF1bHRpbmcgdG8gYSBoYXJkY29kZWQgZGF0ZSByYW5nZSB3b3VsZCBub3QgYmUgdXNlZnVsXG4gKiBhbmQgcmVxdWlyaW5nIHRoZSB1c2VyIHRvIGFsd2F5cyBzcGVjaWZ5IGEgZGF0ZSByYW5nZSBtYXkgYmUgaW5jb252ZW5pZW50LlxuICovXG52YXIgUHJlY2FubmVkRGF0ZVJhbmdlO1xuKGZ1bmN0aW9uIChQcmVjYW5uZWREYXRlUmFuZ2UpIHtcbiAgICAvLyBQYXN0XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiWWVzdGVyZGF5XCJdID0gXCJ5ZXN0ZXJkYXlcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0N0RheXNcIl0gPSBcImxhc3RfN19kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDMwRGF5c1wiXSA9IFwibGFzdF8zMF9kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDkwRGF5c1wiXSA9IFwibGFzdF85MF9kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDE4MERheXNcIl0gPSBcImxhc3RfMTgwX2RheXNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0MzY1RGF5c1wiXSA9IFwibGFzdF8zNjVfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3RXZWVrXCJdID0gXCJsYXN0X3dlZWtcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0TW9udGhcIl0gPSBcImxhc3RfbW9udGhcIjtcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0M01vbnRoc1wiXSA9IFwibGFzdF8zX21vbnRoc1wiO1xuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3Q2TW9udGhzXCJdID0gXCJsYXN0XzZfbW9udGhzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdFllYXJcIl0gPSBcImxhc3RfeWVhclwiO1xuICAgIC8vIFByZXNlbnRcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJUb2RheVwiXSA9IFwidG9kYXlcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJUaGlzV2Vla1wiXSA9IFwidGhpc193ZWVrXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiVGhpc01vbnRoXCJdID0gXCJ0aGlzX21vbnRoXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiWWVhclRvRGF0ZVwiXSA9IFwieWVhcl90b19kYXRlXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiVGhpc1llYXJcIl0gPSBcInRoaXNfeWVhclwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3Q3QW5kTmV4dDdEYXlzXCJdID0gXCJsYXN0XzdfYW5kX25leHRfN19kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDMwQW5kTmV4dDMwRGF5c1wiXSA9IFwibGFzdF8zMF9hbmRfbmV4dF8zMF9kYXlzXCI7XG4gICAgLy8gRnV0dXJlXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiVG9tb3Jyb3dcIl0gPSBcInRvbW9ycm93XCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dDdEYXlzXCJdID0gXCJuZXh0XzdfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHQzMERheXNcIl0gPSBcIm5leHRfMzBfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHQ5MERheXNcIl0gPSBcIm5leHRfOTBfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHQxODBEYXlzXCJdID0gXCJuZXh0XzE4MF9kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dDM2NURheXNcIl0gPSBcIm5leHRfMzY1X2RheXNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJOZXh0V2Vla1wiXSA9IFwibmV4dF93ZWVrXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dE1vbnRoXCJdID0gXCJuZXh0X21vbnRoXCI7XG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dDNNb250aHNcIl0gPSBcIm5leHRfM19tb250aHNcIjtcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJOZXh0Nk1vbnRoc1wiXSA9IFwibmV4dF82X21vbnRoc1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHRZZWFyXCJdID0gXCJuZXh0X3llYXJcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBkYXRlIHJhbmdlIGJlZ2lubmluZyBpbiB0aGUgdmVyeSBkaXN0YW50IHBhc3QgKGUuZy4gMS8xLzEsIGFrYSAxIEEuRC4pXG4gICAgICogYW5kIGVuZGluZyBpbiB0aGUgZGlzdGFudCBmdXR1cmUgKGUuZy4gMTIvMzEvMzk5OSkuIEV4YWN0IGRhdGVzIGFyZSBzdWJqZWN0IHRvIGNoYW5nZS5cbiAgICAgKi9cbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJFdmVyeXRoaW5nXCJdID0gXCJldmVyeXRoaW5nXCI7XG59KShQcmVjYW5uZWREYXRlUmFuZ2UgPSBleHBvcnRzLlByZWNhbm5lZERhdGVSYW5nZSB8fCAoZXhwb3J0cy5QcmVjYW5uZWREYXRlUmFuZ2UgPSB7fSkpO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hc3NlcnRDb25kaXRpb24gPSBleHBvcnRzLmVuc3VyZUV4aXN0cyA9IGV4cG9ydHMuZW5zdXJlTm9uRW1wdHlTdHJpbmcgPSBleHBvcnRzLmVuc3VyZVVucmVhY2hhYmxlID0gdm9pZCAwO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vYXBpXCIpO1xuLyoqXG4gKiBIZWxwZXIgZm9yIFR5cGVTY3JpcHQgdG8gbWFrZSBzdXJlIHRoYXQgaGFuZGxpbmcgb2YgY29kZSBmb3JrcyBpcyBleGhhdXN0aXZlLFxuICogbW9zdCBjb21tb25seSB3aXRoIGEgYHN3aXRjaGAgc3RhdGVtZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGVudW0gTXlFbnVtIHtcbiAqICAgRm9vID0gJ0ZvbycsXG4gKiAgIEJhciA9ICdCYXInLFxuICogfVxuICpcbiAqIGZ1bmN0aW9uIGhhbmRsZUVudW0odmFsdWU6IE15RW51bSkge1xuICogICBzd2l0Y2godmFsdWUpIHtcbiAqICAgICBjYXNlIE15RW51bS5Gb286XG4gKiAgICAgICByZXR1cm4gJ2Zvbyc7XG4gKiAgICAgY2FzZSBNeUVudW0uQmFyOlxuICogICAgICAgcmV0dXJuICdiYXInO1xuICogICAgIGRlZmF1bHQ6XG4gKiAgICAgICAvLyBUaGlzIGNvZGUgaXMgdW5yZWFjaGFibGUgc2luY2UgdGhlIHR3byBjYXNlcyBhYm92ZSBhcmUgZXhoYXVzdGl2ZS5cbiAqICAgICAgIC8vIEhvd2V2ZXIsIGlmIGEgdGhpcmQgdmFsdWUgd2VyZSBhZGRlZCB0byBNeUVudW0sIFR5cGVTY3JpcHQgd291bGQgZmxhZ1xuICogICAgICAgLy8gYW4gZXJyb3IgYXQgdGhpcyBsaW5lLCBpbmZvcm1pbmcgeW91IHRoYXQgeW91IG5lZWQgdG8gdXBkYXRlIHRoaXMgcGllY2Ugb2YgY29kZS5cbiAqICAgICAgIHJldHVybiBlbnN1cmVVbnJlYWNoYWJsZSh2YWx1ZSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5mdW5jdGlvbiBlbnN1cmVVbnJlYWNoYWJsZSh2YWx1ZSwgbWVzc2FnZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IGBVbnJlYWNoYWJsZSBjb2RlIGhpdCB3aXRoIHZhbHVlICR7U3RyaW5nKHZhbHVlKX1gKTtcbn1cbmV4cG9ydHMuZW5zdXJlVW5yZWFjaGFibGUgPSBlbnN1cmVVbnJlYWNoYWJsZTtcbi8qKlxuICogSGVscGVyIHRvIGNoZWNrIHRoYXQgYSBnaXZlbiB2YWx1ZSBpcyBhIHN0cmluZywgYW5kIGlzIG5vdCB0aGUgZW1wdHkgc3RyaW5nLlxuICogSWYgdGhlIHZhbHVlIGlzIG5vdCBhIHN0cmluZyBvciBpcyBlbXB0eSwgYW4gZXJyb3Igd2lsbCBiZSByYWlzZWQgYXQgcnVudGltZS5cbiAqL1xuZnVuY3Rpb24gZW5zdXJlTm9uRW1wdHlTdHJpbmcodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IChnZXRFcnJvckNvbnN0cnVjdG9yKG1lc3NhZ2UpKShtZXNzYWdlIHx8IGBFeHBlY3RlZCBub24tZW1wdHkgc3RyaW5nIGZvciAke1N0cmluZyh2YWx1ZSl9YCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydHMuZW5zdXJlTm9uRW1wdHlTdHJpbmcgPSBlbnN1cmVOb25FbXB0eVN0cmluZztcbi8qKlxuICogSGVscGVyIHRvIGNoZWNrIHRoYXQgYSBnaXZlbiB2YWx1ZSBpcyBkZWZpbmVkLCB0aGF0IGlzLCBpcyBuZWl0aGVyIGB1bmRlZmluZWRgIG5vciBgbnVsbGAuXG4gKiBJZiB0aGUgdmFsdWUgaXMgYHVuZGVmaW5lZGAgb3IgYG51bGxgLCBhbiBlcnJvciB3aWxsIGJlIHJhaXNlZCBhdCBydW50aW1lLlxuICpcbiAqIFRoaXMgaXMgdHlwaWNhbGx5IHVzZWQgdG8gaW5mb3JtIFR5cGVTY3JpcHQgdGhhdCB5b3UgZXhwZWN0IGEgZ2l2ZW4gdmFsdWUgdG8gYWx3YXlzIGV4aXN0LlxuICogQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIHJlZmluZXMgYSB0eXBlIHRoYXQgY2FuIG90aGVyd2lzZSBiZSBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZnVuY3Rpb24gZW5zdXJlRXhpc3RzKHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IChnZXRFcnJvckNvbnN0cnVjdG9yKG1lc3NhZ2UpKShtZXNzYWdlIHx8IGBFeHBlY3RlZCB2YWx1ZSBmb3IgJHtTdHJpbmcodmFsdWUpfWApO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnRzLmVuc3VyZUV4aXN0cyA9IGVuc3VyZUV4aXN0cztcbmZ1bmN0aW9uIGdldEVycm9yQ29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHJldHVybiBtZXNzYWdlID8gYXBpXzEuVXNlclZpc2libGVFcnJvciA6IEVycm9yO1xufVxuLyoqXG4gKiBIZWxwZXIgdG8gYXBwbHkgYSBUeXBlU2NyaXB0IGFzc2VydGlvbiB0byBzdWJzZXF1ZW50IGNvZGUuIFR5cGVTY3JpcHQgY2FuIGluZmVyXG4gKiB0eXBlIGluZm9ybWF0aW9uIGZyb20gbWFueSBleHByZXNzaW9ucywgYW5kIHRoaXMgaGVscGVyIGFwcGxpZXMgdGhvc2UgaW5mZXJlbmNlc1xuICogdG8gYWxsIGNvZGUgdGhhdCBmb2xsb3dzIGNhbGwgdG8gdGhpcyBmdW5jdGlvbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svcmVsZWFzZS1ub3Rlcy90eXBlc2NyaXB0LTMtNy5odG1sI2Fzc2VydGlvbi1mdW5jdGlvbnNcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBmdW5jdGlvbiBmb28odmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICogICBhc3NlcnRDb25kdGlvbih0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKTtcbiAqICAgLy8gVHlwZVNjcmlwdCB3b3VsZCBvdGhlcndpc2UgY29tcGFsaW4sIGJlY2F1c2UgYHZhbHVlYCBjb3VsZCBoYXZlIGJlZW4gbnVtYmVyLFxuICogICAvLyBidXQgdGhlIGFib3ZlIGFzc2VydGlvbiByZWZpbmVzIHRoZSB0eXBlIGJhc2VkIG9uIHRoZSBgdHlwZW9mYCBleHByZXNzaW9uLlxuICogICByZXR1cm4gdmFsdWUudG9VcHBlckNhc2UoKTtcbiAqIH1cbiAqIGBgYFxuICovXG5mdW5jdGlvbiBhc3NlcnRDb25kaXRpb24oY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IChnZXRFcnJvckNvbnN0cnVjdG9yKG1lc3NhZ2UpKShtZXNzYWdlIHx8ICdBc3NlcnRpb24gZmFpbGVkJyk7XG4gICAgfVxufVxuZXhwb3J0cy5hc3NlcnRDb25kaXRpb24gPSBhc3NlcnRDb25kaXRpb247XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzUHJvbWlzZSA9IGV4cG9ydHMuZGVlcENvcHkgPSBleHBvcnRzLmlzTmlsID0gZXhwb3J0cy5pc0RlZmluZWQgPSBleHBvcnRzLmRlZXBGcmVlemUgPSB2b2lkIDA7XG5mdW5jdGlvbiBkZWVwRnJlZXplKG9iaikge1xuICAgIE9iamVjdC5mcmVlemUob2JqKTtcbiAgICBmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgICBjb25zdCBrZXkgPSBrO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSAmJiAhT2JqZWN0LmlzRnJvemVuKHZhbHVlKSkge1xuICAgICAgICAgICAgZGVlcEZyZWV6ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmV4cG9ydHMuZGVlcEZyZWV6ZSA9IGRlZXBGcmVlemU7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgdmFsdWUgaXMgYWN0dWFsbHkgZGVmaW5lZCwgaS5lLiBpcyBhbnl0aGluZyBvdGhlciB0aGFuIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5mdW5jdGlvbiBpc0RlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICFpc05pbChvYmopO1xufVxuZXhwb3J0cy5pc0RlZmluZWQgPSBpc0RlZmluZWQ7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgdmFsdWUgaGFzIG5vdCBiZWVuIGRlZmluZWQsIGkuZS4gaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmZ1bmN0aW9uIGlzTmlsKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJyB8fCBvYmogPT09IG51bGw7XG59XG5leHBvcnRzLmlzTmlsID0gaXNOaWw7XG5mdW5jdGlvbiBkZWVwQ29weShvYmopIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbmV4cG9ydHMuZGVlcENvcHkgPSBkZWVwQ29weTtcbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBhIFByb21pc2UuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICd0aGVuJyBpbiBvYmo7XG59XG5leHBvcnRzLmlzUHJvbWlzZSA9IGlzUHJvbWlzZTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucG9zdFNldHVwTWV0YWRhdGFIZWxwZXIgPSBleHBvcnRzLnNldEVuZHBvaW50RGVmSGVscGVyID0gZXhwb3J0cy5zZXRFbmRwb2ludEhlbHBlciA9IGV4cG9ydHMucGFyYW1EZWZIZWxwZXIgPSBleHBvcnRzLm9iamVjdFNjaGVtYUhlbHBlciA9IHZvaWQgMDtcbmNvbnN0IGVuc3VyZV8xID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvZW5zdXJlXCIpO1xuZnVuY3Rpb24gb2JqZWN0U2NoZW1hSGVscGVyKHNjaGVtYSkge1xuICAgIHJldHVybiBuZXcgT2JqZWN0U2NoZW1hSGVscGVyKHNjaGVtYSk7XG59XG5leHBvcnRzLm9iamVjdFNjaGVtYUhlbHBlciA9IG9iamVjdFNjaGVtYUhlbHBlcjtcbmNsYXNzIE9iamVjdFNjaGVtYUhlbHBlciB7XG4gICAgY29uc3RydWN0b3Ioc2NoZW1hKSB7XG4gICAgICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcbiAgICB9XG4gICAgZ2V0IGlkKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLl9zY2hlbWEuaWRQcm9wZXJ0eSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc2NoZW1hLmlkO1xuICAgIH1cbiAgICBnZXQgcHJpbWFyeSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5fc2NoZW1hLmRpc3BsYXlQcm9wZXJ0eSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc2NoZW1hLnByaW1hcnk7XG4gICAgfVxuICAgIGdldCBmZWF0dXJlZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5fc2NoZW1hLmZlYXR1cmVkUHJvcGVydGllcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc2NoZW1hLmZlYXR1cmVkO1xuICAgIH1cbiAgICBnZXQgaWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2hlbWEuaWRlbnRpdHk7XG4gICAgfVxuICAgIGdldCBtdXRhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NoZW1hLm11dGFibGU7XG4gICAgfVxuICAgIGdldCBhdXRvY29tcGxldGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2hlbWEuYXV0b2NvbXBsZXRlO1xuICAgIH1cbiAgICBnZXQgcHJvcGVydGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVtYS5wcm9wZXJ0aWVzO1xuICAgIH1cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVtYS50eXBlO1xuICAgIH1cbiAgICBnZXQgYXR0cmlidXRpb24oKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLl9zY2hlbWEuYXR0cmlidXRpb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IChfYiA9IHRoaXMuX3NjaGVtYS5pZGVudGl0eSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmF0dHJpYnV0aW9uO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhcmFtRGVmSGVscGVyKGRlZikge1xuICAgIHJldHVybiBuZXcgUGFyYW1EZWZIZWxwZXIoZGVmKTtcbn1cbmV4cG9ydHMucGFyYW1EZWZIZWxwZXIgPSBwYXJhbURlZkhlbHBlcjtcbmNsYXNzIFBhcmFtRGVmSGVscGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWYpIHtcbiAgICAgICAgdGhpcy5fZGVmID0gZGVmO1xuICAgIH1cbiAgICBnZXQgZGVmYXVsdFZhbHVlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLl9kZWYuc3VnZ2VzdGVkVmFsdWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX2RlZi5kZWZhdWx0VmFsdWU7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0RW5kcG9pbnRIZWxwZXIoc3RlcCkge1xuICAgIHJldHVybiBuZXcgU2V0RW5kcG9pbnRIZWxwZXIoc3RlcCk7XG59XG5leHBvcnRzLnNldEVuZHBvaW50SGVscGVyID0gc2V0RW5kcG9pbnRIZWxwZXI7XG5jbGFzcyBTZXRFbmRwb2ludEhlbHBlciB7XG4gICAgY29uc3RydWN0b3Ioc3RlcCkge1xuICAgICAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB9XG4gICAgZ2V0IGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKChfYSA9IHRoaXMuX3N0ZXAuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc3RlcC5nZXRPcHRpb25zRm9ybXVsYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0RW5kcG9pbnREZWZIZWxwZXIoc3RlcCkge1xuICAgIHJldHVybiBuZXcgU2V0RW5kcG9pbnREZWZIZWxwZXIoc3RlcCk7XG59XG5leHBvcnRzLnNldEVuZHBvaW50RGVmSGVscGVyID0gc2V0RW5kcG9pbnREZWZIZWxwZXI7XG5jbGFzcyBTZXRFbmRwb2ludERlZkhlbHBlciB7XG4gICAgY29uc3RydWN0b3Ioc3RlcCkge1xuICAgICAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB9XG4gICAgZ2V0IGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKChfYSA9IHRoaXMuX3N0ZXAuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc3RlcC5nZXRPcHRpb25zRm9ybXVsYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcG9zdFNldHVwTWV0YWRhdGFIZWxwZXIobWV0YWRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFBvc3RTZXR1cE1ldGFkYXRhSGVscGVyKG1ldGFkYXRhKTtcbn1cbmV4cG9ydHMucG9zdFNldHVwTWV0YWRhdGFIZWxwZXIgPSBwb3N0U2V0dXBNZXRhZGF0YUhlbHBlcjtcbmNsYXNzIFBvc3RTZXR1cE1ldGFkYXRhSGVscGVyIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRhZGF0YSkge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgIH1cbiAgICBnZXQgZ2V0T3B0aW9ucygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKDAsIGVuc3VyZV8xLmVuc3VyZUV4aXN0cykoKF9hID0gdGhpcy5fbWV0YWRhdGEuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fbWV0YWRhdGEuZ2V0T3B0aW9uc0Zvcm11bGEpO1xuICAgIH1cbn1cbiIsICIvKiFcbiAqIHBhc2NhbGNhc2UgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3Bhc2NhbGNhc2U+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEpvbiAoXCJTY2hsaW5rXCIpIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgdGl0bGVjYXNlID0gaW5wdXQgPT4gaW5wdXRbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSArIGlucHV0LnNsaWNlKDEpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDApIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuICcnO1xuXG4gIGxldCBpbnB1dCA9IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICBpZiAoaW5wdXQgPT09ICcnKSByZXR1cm4gJyc7XG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDEpIHJldHVybiBpbnB1dC50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuXG4gIGxldCBtYXRjaCA9IGlucHV0Lm1hdGNoKC9bYS16QS1aMC05XSsvZyk7XG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaC5tYXAobSA9PiB0aXRsZWNhc2UobSkpLmpvaW4oJycpO1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2l0aElkZW50aXR5ID0gZXhwb3J0cy5tYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYSA9IGV4cG9ydHMubm9ybWFsaXplU2NoZW1hID0gZXhwb3J0cy5ub3JtYWxpemVQcm9wZXJ0eVZhbHVlUGF0aEludG9TY2hlbWFQYXRoID0gZXhwb3J0cy5ub3JtYWxpemVTY2hlbWFLZXlQYXRoID0gZXhwb3J0cy5ub3JtYWxpemVTY2hlbWFLZXkgPSBleHBvcnRzLm1ha2VPYmplY3RTY2hlbWEgPSBleHBvcnRzLm1ha2VTY2hlbWEgPSBleHBvcnRzLmdlbmVyYXRlU2NoZW1hID0gZXhwb3J0cy5pc0FycmF5ID0gZXhwb3J0cy5pc09iamVjdCA9IGV4cG9ydHMubWFrZUF0dHJpYnV0aW9uTm9kZSA9IGV4cG9ydHMuQXR0cmlidXRpb25Ob2RlVHlwZSA9IGV4cG9ydHMuUHJvcGVydHlMYWJlbFZhbHVlVGVtcGxhdGUgPSBleHBvcnRzLlNpbXBsZVN0cmluZ0hpbnRWYWx1ZVR5cGVzID0gZXhwb3J0cy5EdXJhdGlvblVuaXQgPSBleHBvcnRzLkltYWdlQ29ybmVyU3R5bGUgPSBleHBvcnRzLkltYWdlT3V0bGluZSA9IGV4cG9ydHMuTGlua0Rpc3BsYXlUeXBlID0gZXhwb3J0cy5FbWFpbERpc3BsYXlUeXBlID0gZXhwb3J0cy5TY2FsZUljb25TZXQgPSBleHBvcnRzLkN1cnJlbmN5Rm9ybWF0ID0gZXhwb3J0cy5PYmplY3RIaW50VmFsdWVUeXBlcyA9IGV4cG9ydHMuQm9vbGVhbkhpbnRWYWx1ZVR5cGVzID0gZXhwb3J0cy5OdW1iZXJIaW50VmFsdWVUeXBlcyA9IGV4cG9ydHMuU3RyaW5nSGludFZhbHVlVHlwZXMgPSBleHBvcnRzLlZhbHVlSGludFR5cGUgPSBleHBvcnRzLlZhbHVlVHlwZSA9IHZvaWQgMDtcbmNvbnN0IGVuc3VyZV8xID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5jb25zdCBvYmplY3RfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvb2JqZWN0X3V0aWxzXCIpO1xuY29uc3QgZW5zdXJlXzIgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmNvbnN0IGVuc3VyZV8zID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5jb25zdCBlbnN1cmVfNCA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuY29uc3QgbWlncmF0aW9uXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL21pZ3JhdGlvblwiKTtcbmNvbnN0IHBhc2NhbGNhc2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicGFzY2FsY2FzZVwiKSk7XG4vLyBEZWZpbmVzIGEgc3Vic2V0IG9mIHRoZSBKU09OIE9iamVjdCBzY2hlbWEgZm9yIHVzZSBpbiBhbm5vdGF0aW5nIEFQSSByZXN1bHRzLlxuLy8gaHR0cDovL2pzb24tc2NoZW1hLm9yZy9sYXRlc3QvanNvbi1zY2hlbWEtY29yZS5odG1sI3JmYy5zZWN0aW9uLjguMlxuLyoqXG4gKiBUaGUgc2V0IG9mIHByaW1pdGl2ZSB2YWx1ZSB0eXBlcyB0aGF0IGNhbiBiZSB1c2VkIGFzIHJldHVybiB2YWx1ZXMgZm9yIGZvcm11bGFzXG4gKiBvciBpbiBvYmplY3Qgc2NoZW1hcy5cbiAqL1xudmFyIFZhbHVlVHlwZTtcbihmdW5jdGlvbiAoVmFsdWVUeXBlKSB7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgSmF2YVNjcmlwdCBib29sZWFuICh0cnVlL2ZhbHNlKSBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICovXG4gICAgVmFsdWVUeXBlW1wiQm9vbGVhblwiXSA9IFwiYm9vbGVhblwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIEphdmFTY3JpcHQgbnVtYmVyIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBWYWx1ZVR5cGVbXCJOdW1iZXJcIl0gPSBcIm51bWJlclwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIEphdmFTY3JpcHQgc3RyaW5nIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBWYWx1ZVR5cGVbXCJTdHJpbmdcIl0gPSBcInN0cmluZ1wiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIEphdmFTY3JpcHQgYXJyYXkgc2hvdWxkIGJlIHJldHVybmVkLiBUaGUgc2NoZW1hIG9mIHRoZSBhcnJheSBpdGVtcyBtdXN0IGFsc28gYmUgc3BlY2lmaWVkLlxuICAgICAqL1xuICAgIFZhbHVlVHlwZVtcIkFycmF5XCJdID0gXCJhcnJheVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIEphdmFTY3JpcHQgb2JqZWN0IHNob3VsZCBiZSByZXR1cm5lZC4gVGhlIHNjaGVtYSBvZiBlYWNoIG9iamVjdCBwcm9wZXJ0eSBtdXN0IGFsc28gYmUgc3BlY2lmaWVkLlxuICAgICAqL1xuICAgIFZhbHVlVHlwZVtcIk9iamVjdFwiXSA9IFwib2JqZWN0XCI7XG59KShWYWx1ZVR5cGUgPSBleHBvcnRzLlZhbHVlVHlwZSB8fCAoZXhwb3J0cy5WYWx1ZVR5cGUgPSB7fSkpO1xuLyoqXG4gKiBTeW50aGV0aWMgdHlwZXMgdGhhdCBpbnN0cnVjdCBDb2RhIGhvdyB0byBjb2VyY2UgdmFsdWVzIGZyb20gcHJpbWl0aXZlcyBhdCBpbmdlc3Rpb24gdGltZS5cbiAqL1xudmFyIFZhbHVlSGludFR5cGU7XG4oZnVuY3Rpb24gKFZhbHVlSGludFR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IHRoZSB2YWx1ZSBhcyBhIGRhdGUgKGUuZy4gTWFyY2ggMywgMjAyMSkuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkRhdGVcIl0gPSBcImRhdGVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IHRoZSB2YWx1ZSBhcyBhIHRpbWUgKGUuZy4gNToyNHBtKS5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiVGltZVwiXSA9IFwidGltZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGEgZGF0ZXRpbWUgKGUuZy4gTWFyY2ggMywgMjAyMSBhdCA1OjI0cG0pLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJEYXRlVGltZVwiXSA9IFwiZGF0ZXRpbWVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IHRoZSB2YWx1ZSBhcyBhIGR1cmF0aW9uIChlLmcuIDMgaG91cnMpLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJEdXJhdGlvblwiXSA9IFwiZHVyYXRpb25cIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IHRoZSB2YWx1ZSBhcyBhbiBlbWFpbCBhZGRyZXNzIChlLmcuIGpvZUBmb28uY29tKS5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiRW1haWxcIl0gPSBcImVtYWlsXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCBhbmQgcmVuZGVyIHRoZSB2YWx1ZSBhcyBhIENvZGEgcGVyc29uIHJlZmVyZW5jZS4gVGhlIHByb3ZpZGVkIHZhbHVlIHNob3VsZCBiZVxuICAgICAqIGFuIG9iamVjdCB3aG9zZSBgaWRgIHByb3BlcnR5IGlzIGFuIGVtYWlsIGFkZHJlc3MsIHdoaWNoIENvZGEgd2lsbCB0cnkgdG8gcmVzb2x2ZSB0byBhIHVzZXJcbiAgICAgKiBhbmQgcmVuZGVyIGFuIEAtcmVmZXJlbmNlIHRvIHRoZSB1c2VyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBtYWtlT2JqZWN0U2NoZW1hKHtcbiAgICAgKiAgIHR5cGU6IFZhbHVlVHlwZS5PYmplY3QsXG4gICAgICogICBjb2RhVHlwZTogVmFsdWVIaW50VHlwZS5QZXJzb24sXG4gICAgICogICBpZDogJ2VtYWlsJyxcbiAgICAgKiAgIHByaW1hcnk6ICduYW1lJyxcbiAgICAgKiAgIHByb3BlcnRpZXM6IHtcbiAgICAgKiAgICAgZW1haWw6IHt0eXBlOiBWYWx1ZVR5cGUuU3RyaW5nLCByZXF1aXJlZDogdHJ1ZX0sXG4gICAgICogICAgIG5hbWU6IHt0eXBlOiBWYWx1ZVR5cGUuU3RyaW5nLCByZXF1aXJlZDogdHJ1ZX0sXG4gICAgICogICB9LFxuICAgICAqIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJQZXJzb25cIl0gPSBcInBlcnNvblwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYSBwZXJjZW50YWdlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJQZXJjZW50XCJdID0gXCJwZXJjZW50XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCBhbmQgcmVuZGVyIHRoZSB2YWx1ZSBhcyBhIGN1cnJlbmN5IHZhbHVlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJDdXJyZW5jeVwiXSA9IFwiY3VycmVuY3lcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgdGhlIHZhbHVlIGFzIGFuIGltYWdlLiBUaGUgcHJvdmlkZWQgdmFsdWUgc2hvdWxkIGJlIGEgVVJMIHRoYXRcbiAgICAgKiBwb2ludHMgdG8gYW4gaW1hZ2UuIENvZGEgd2lsbCBob3RsaW5rIHRvIHRoZSBpbWFnZSB3aGVuIHJlbmRlcmluZyBpdCBhIGRvYy5cbiAgICAgKlxuICAgICAqIFVzaW5nIHtAbGluayBJbWFnZUF0dGFjaG1lbnR9IGlzIHJlY29tbWVuZGVkIGluc3RlYWQsIHNvIHRoYXQgdGhlIGltYWdlIGlzIGFsd2F5cyBhY2Nlc3NpYmxlXG4gICAgICogYW5kIHdvbid0IGFwcGVhciBhcyBicm9rZW4gaWYgdGhlIHNvdXJjZSBpbWFnZSBpcyBsYXRlciBkZWxldGVkLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJJbWFnZVJlZmVyZW5jZVwiXSA9IFwiaW1hZ2VcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgdGhlIHZhbHVlIGFzIGFuIGltYWdlLiBUaGUgcHJvdmlkZWQgdmFsdWUgc2hvdWxkIGJlIGEgVVJMIHRoYXRcbiAgICAgKiBwb2ludHMgdG8gYW4gaW1hZ2UuIENvZGEgd2lsbCBpbmdlc3QgdGhlIGltYWdlIGFuZCBob3N0IGl0IGZyb20gQ29kYSBpbmZyYXN0cnVjdHVyZS5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiSW1hZ2VBdHRhY2htZW50XCJdID0gXCJpbWFnZUF0dGFjaG1lbnRcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgdGhlIHZhbHVlIGFzIGEgVVJMIGxpbmsuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIlVybFwiXSA9IFwidXJsXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCBhIHRleHQgdmFsdWUgYXMgTWFya2Rvd24sIHdoaWNoIHdpbGwgYmUgY29udmVydGVkIGFuZCByZW5kZXJlZCBhcyBDb2RhIHJpY2ggdGV4dC5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiTWFya2Rvd25cIl0gPSBcIm1hcmtkb3duXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCBhIHRleHQgdmFsdWUgYXMgSFRNTCwgd2hpY2ggd2lsbCBiZSBjb252ZXJ0ZWQgYW5kIHJlbmRlcmVkIGFzIENvZGEgcmljaCB0ZXh0LlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJIdG1sXCJdID0gXCJodG1sXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCBhbmQgcmVuZGVyIGEgdmFsdWUgYXMgYW4gZW1iZWQuIFRoZSBwcm92aWRlZCB2YWx1ZSBzaG91bGQgYmUgYSBVUkwgcG9pbnRpbmdcbiAgICAgKiB0byBhbiBlbWJlZGRhYmxlIHdlYiBwYWdlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJFbWJlZFwiXSA9IFwiZW1iZWRcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgdGhlIHZhbHVlIGFzIGEgQ29kYSBALXJlZmVyZW5jZSB0byBhIHRhYmxlIHJvdy4gVGhlIHByb3ZpZGVkIHZhbHVlIHNob3VsZFxuICAgICAqIGJlIGFuIG9iamVjdCB3aG9zZSBgaWRgIHZhbHVlIG1hdGNoZXMgdGhlIGlkIG9mIHNvbWUgcm93IGluIGEgc3luYyB0YWJsZS4gVGhlIHNjaGVtYSB3aGVyZSB0aGlzIGhpbnQgdHlwZSBpc1xuICAgICAqIHVzZWQgbXVzdCBzcGVjaWZ5IGFuIGlkZW50aXR5IHRoYXQgc3BlY2lmaWVzIHRoZSBkZXNpcmVkIHN5bmMgdGFibGUuXG4gICAgICpcbiAgICAgKiBOb3JtYWxseSBhIHJlZmVyZW5jZSBzY2hlbWEgaXMgY29uc3RydWN0ZWQgZnJvbSB0aGUgc2NoZW1hIG9iamVjdCBiZWluZyByZWZlcmVuY2VkIHVzaW5nIHRoZSBoZWxwZXJcbiAgICAgKiB7QGxpbmsgbWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWF9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBtYWtlT2JqZWN0U2NoZW1hKHtcbiAgICAgKiAgIHR5cGU6IFZhbHVlVHlwZS5PYmplY3QsXG4gICAgICogICBjb2RhVHlwZTogVmFsdWVIaW50VHlwZS5SZWZlcmVuY2UsXG4gICAgICogICBpZGVudGl0eToge1xuICAgICAqICAgICBuYW1lOiBcIlNvbWVTeW5jVGFibGVJZGVudGl0eVwiXG4gICAgICogICB9LFxuICAgICAqICAgaWQ6ICdpZGVudGlmaWVyJyxcbiAgICAgKiAgIHByaW1hcnk6ICduYW1lJyxcbiAgICAgKiAgIHByb3BlcnRpZXM6IHtcbiAgICAgKiAgICAgaWRlbnRpZmllcjoge3R5cGU6IFZhbHVlVHlwZS5OdW1iZXIsIHJlcXVpcmVkOiB0cnVlfSxcbiAgICAgKiAgICAgbmFtZToge3R5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAgICAgKiAgIH0sXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIlJlZmVyZW5jZVwiXSA9IFwicmVmZXJlbmNlXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCBhbmQgcmVuZGVyIGEgdmFsdWUgYXMgYSBmaWxlIGF0dGFjaG1lbnQuIFRoZSBwcm92aWRlZCB2YWx1ZSBzaG91bGQgYmUgYSBVUkxcbiAgICAgKiBwb2ludGluZyB0byBhIGZpbGUgb2YgYSBDb2RhLXN1cHBvcnRlZCB0eXBlLiBDb2RhIHdpbGwgaW5nZXN0IHRoZSBmaWxlIGFuZCBob3N0IGl0IGZyb20gQ29kYSBpbmZyYXN0cnVjdHVyZS5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiQXR0YWNobWVudFwiXSA9IFwiYXR0YWNobWVudFwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byByZW5kZXIgYSBudW1lcmljIHZhbHVlIGFzIGEgc2xpZGVyIFVJIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiU2xpZGVyXCJdID0gXCJzbGlkZXJcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gcmVuZGVyIGEgbnVtZXJpYyB2YWx1ZSBhcyBhIHNjYWxlIFVJIGNvbXBvbmVudCAoZS5nLiBhIHN0YXIgcmF0aW5nKS5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiU2NhbGVcIl0gPSBcInNjYWxlXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIHJlbmRlciBhIG51bWVyaWMgdmFsdWUgYXMgYSBwcm9ncmVzcyBiYXIgVUkgY29tcG9uZW50LlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJQcm9ncmVzc0JhclwiXSA9IFwicHJvZ3Jlc3NCYXJcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gcmVuZGVyIGEgYm9vbGVhbiB2YWx1ZSBhcyBhIHRvZ2dsZS5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiVG9nZ2xlXCJdID0gXCJ0b2dnbGVcIjtcbn0pKFZhbHVlSGludFR5cGUgPSBleHBvcnRzLlZhbHVlSGludFR5cGUgfHwgKGV4cG9ydHMuVmFsdWVIaW50VHlwZSA9IHt9KSk7XG5leHBvcnRzLlN0cmluZ0hpbnRWYWx1ZVR5cGVzID0gW1xuICAgIFZhbHVlSGludFR5cGUuQXR0YWNobWVudCxcbiAgICBWYWx1ZUhpbnRUeXBlLkRhdGUsXG4gICAgVmFsdWVIaW50VHlwZS5UaW1lLFxuICAgIFZhbHVlSGludFR5cGUuRGF0ZVRpbWUsXG4gICAgVmFsdWVIaW50VHlwZS5EdXJhdGlvbixcbiAgICBWYWx1ZUhpbnRUeXBlLkVtYWlsLFxuICAgIFZhbHVlSGludFR5cGUuRW1iZWQsXG4gICAgVmFsdWVIaW50VHlwZS5IdG1sLFxuICAgIFZhbHVlSGludFR5cGUuSW1hZ2VSZWZlcmVuY2UsXG4gICAgVmFsdWVIaW50VHlwZS5JbWFnZUF0dGFjaG1lbnQsXG4gICAgVmFsdWVIaW50VHlwZS5NYXJrZG93bixcbiAgICBWYWx1ZUhpbnRUeXBlLlVybCxcbl07XG5leHBvcnRzLk51bWJlckhpbnRWYWx1ZVR5cGVzID0gW1xuICAgIFZhbHVlSGludFR5cGUuRGF0ZSxcbiAgICBWYWx1ZUhpbnRUeXBlLlRpbWUsXG4gICAgVmFsdWVIaW50VHlwZS5EYXRlVGltZSxcbiAgICBWYWx1ZUhpbnRUeXBlLkR1cmF0aW9uLFxuICAgIFZhbHVlSGludFR5cGUuUGVyY2VudCxcbiAgICBWYWx1ZUhpbnRUeXBlLkN1cnJlbmN5LFxuICAgIFZhbHVlSGludFR5cGUuU2xpZGVyLFxuICAgIFZhbHVlSGludFR5cGUuUHJvZ3Jlc3NCYXIsXG4gICAgVmFsdWVIaW50VHlwZS5TY2FsZSxcbl07XG5leHBvcnRzLkJvb2xlYW5IaW50VmFsdWVUeXBlcyA9IFtWYWx1ZUhpbnRUeXBlLlRvZ2dsZV07XG5leHBvcnRzLk9iamVjdEhpbnRWYWx1ZVR5cGVzID0gW1ZhbHVlSGludFR5cGUuUGVyc29uLCBWYWx1ZUhpbnRUeXBlLlJlZmVyZW5jZV07XG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIGZvcm1hdHMgc3VwcG9ydGVkIGJ5IHNjaGVtYXMgdGhhdCB1c2Uge0BsaW5rIFZhbHVlSGludFR5cGUuQ3VycmVuY3l9LlxuICpcbiAqIFRoZXNlIGFmZmVjdCBob3cgYSBudW1lcmljIHZhbHVlIGlzIHJlbmRlcmVkIGluIGRvY3MuXG4gKi9cbnZhciBDdXJyZW5jeUZvcm1hdDtcbihmdW5jdGlvbiAoQ3VycmVuY3lGb3JtYXQpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHZhbHVlIHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIG51bWJlciB3aXRoIGEgY3VycmVuY3kgc3ltYm9sIGFzIGEgcHJlZml4LCBlLmcuIGAkMi41MGAuXG4gICAgICovXG4gICAgQ3VycmVuY3lGb3JtYXRbXCJDdXJyZW5jeVwiXSA9IFwiY3VycmVuY3lcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHZhbHVlIHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIG51bWJlciB3aXRoIGEgY3VycmVuY3kgc3ltYm9sIGFzIGEgcHJlZml4LCBidXQgcGFkZGVkXG4gICAgICogdG8gYWxsb3cgdGhlIG51bWVyaWMgdmFsdWVzIHRvIGxpbmUgdXAgdmVydGljYWxseSwgZS5nLlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogJCAgICAgICAyLjUwXG4gICAgICogJCAgICAgIDI5Ljk5XG4gICAgICogYGBgXG4gICAgICovXG4gICAgQ3VycmVuY3lGb3JtYXRbXCJBY2NvdW50aW5nXCJdID0gXCJhY2NvdW50aW5nXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoZSB2YWx1ZSBzaG91bGQgYmUgcmVuZGVyZWQgYXMgYSBudW1iZXIgd2l0aG91dCBhIGN1cnJlbmN5IHN5bWJvbCwgZS5nLiBgMi41MGAuXG4gICAgICovXG4gICAgQ3VycmVuY3lGb3JtYXRbXCJGaW5hbmNpYWxcIl0gPSBcImZpbmFuY2lhbFwiO1xufSkoQ3VycmVuY3lGb3JtYXQgPSBleHBvcnRzLkN1cnJlbmN5Rm9ybWF0IHx8IChleHBvcnRzLkN1cnJlbmN5Rm9ybWF0ID0ge30pKTtcbi8qKlxuICogSWNvbnMgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGEge0BsaW5rIFNjYWxlU2NoZW1hfS5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgdG8gcmVuZGVyIGEgc3RhciByYXRpbmcsIHVzZSBhIHtAbGluayBTY2FsZVNjaGVtYX0gd2l0aCBgaWNvbjogY29kYS5TY2FsZUljb25TZXQuU3RhcmAuXG4gKi9cbnZhciBTY2FsZUljb25TZXQ7XG4oZnVuY3Rpb24gKFNjYWxlSWNvblNldCkge1xuICAgIFNjYWxlSWNvblNldFtcIlN0YXJcIl0gPSBcInN0YXJcIjtcbiAgICBTY2FsZUljb25TZXRbXCJDaXJjbGVcIl0gPSBcImNpcmNsZVwiO1xuICAgIFNjYWxlSWNvblNldFtcIkZpcmVcIl0gPSBcImZpcmVcIjtcbiAgICBTY2FsZUljb25TZXRbXCJCdWdcIl0gPSBcImJ1Z1wiO1xuICAgIFNjYWxlSWNvblNldFtcIkRpYW1vbmRcIl0gPSBcImRpYW1vbmRcIjtcbiAgICBTY2FsZUljb25TZXRbXCJCZWxsXCJdID0gXCJiZWxsXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiVGh1bWJzVXBcIl0gPSBcInRodW1ic3VwXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiSGVhcnRcIl0gPSBcImhlYXJ0XCI7XG4gICAgU2NhbGVJY29uU2V0W1wiQ2hpbGlcIl0gPSBcImNoaWxpXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiU21pbGV5XCJdID0gXCJzbWlsZXlcIjtcbiAgICBTY2FsZUljb25TZXRbXCJMaWdodG5pbmdcIl0gPSBcImxpZ2h0bmluZ1wiO1xuICAgIFNjYWxlSWNvblNldFtcIkN1cnJlbmN5XCJdID0gXCJjdXJyZW5jeVwiO1xuICAgIFNjYWxlSWNvblNldFtcIkNvZmZlZVwiXSA9IFwiY29mZmVlXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiUGVyc29uXCJdID0gXCJwZXJzb25cIjtcbiAgICBTY2FsZUljb25TZXRbXCJCYXR0ZXJ5XCJdID0gXCJiYXR0ZXJ5XCI7XG4gICAgU2NhbGVJY29uU2V0W1wiQ29ja3RhaWxcIl0gPSBcImNvY2t0YWlsXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiQ2xvdWRcIl0gPSBcImNsb3VkXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiU3VuXCJdID0gXCJzdW5cIjtcbiAgICBTY2FsZUljb25TZXRbXCJDaGVja21hcmtcIl0gPSBcImNoZWNrbWFya1wiO1xuICAgIFNjYWxlSWNvblNldFtcIkxpZ2h0QnVsYlwiXSA9IFwibGlnaHRidWxiXCI7XG59KShTY2FsZUljb25TZXQgPSBleHBvcnRzLlNjYWxlSWNvblNldCB8fCAoZXhwb3J0cy5TY2FsZUljb25TZXQgPSB7fSkpO1xuLyoqXG4gKiBEaXNwbGF5IHR5cGVzIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBhbiB7QGxpbmsgRW1haWxTY2hlbWF9LlxuICovXG52YXIgRW1haWxEaXNwbGF5VHlwZTtcbihmdW5jdGlvbiAoRW1haWxEaXNwbGF5VHlwZSkge1xuICAgIC8qKlxuICAgICAqIERpc3BsYXkgYm90aCBpY29uIGFuZCBlbWFpbCAoZGVmYXVsdCkuXG4gICAgICovXG4gICAgRW1haWxEaXNwbGF5VHlwZVtcIkljb25BbmRFbWFpbFwiXSA9IFwiaWNvbkFuZEVtYWlsXCI7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBpY29uIG9ubHkuXG4gICAgICovXG4gICAgRW1haWxEaXNwbGF5VHlwZVtcIkljb25Pbmx5XCJdID0gXCJpY29uT25seVwiO1xuICAgIC8qKlxuICAgICAqIERpc3BsYXkgZW1haWwgYWRkcmVzcyBvbmx5LlxuICAgICAqL1xuICAgIEVtYWlsRGlzcGxheVR5cGVbXCJFbWFpbE9ubHlcIl0gPSBcImVtYWlsT25seVwiO1xufSkoRW1haWxEaXNwbGF5VHlwZSA9IGV4cG9ydHMuRW1haWxEaXNwbGF5VHlwZSB8fCAoZXhwb3J0cy5FbWFpbERpc3BsYXlUeXBlID0ge30pKTtcbi8qKlxuICogRGlzcGxheSB0eXBlcyB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYSB7QGxpbmsgTGlua1NjaGVtYX0uXG4gKi9cbnZhciBMaW5rRGlzcGxheVR5cGU7XG4oZnVuY3Rpb24gKExpbmtEaXNwbGF5VHlwZSkge1xuICAgIC8qKlxuICAgICAqIERpc3BsYXkgaWNvbiBvbmx5LlxuICAgICAqL1xuICAgIExpbmtEaXNwbGF5VHlwZVtcIkljb25Pbmx5XCJdID0gXCJpY29uT25seVwiO1xuICAgIC8qKlxuICAgICAqIERpc3BsYXkgVVJMLlxuICAgICAqL1xuICAgIExpbmtEaXNwbGF5VHlwZVtcIlVybFwiXSA9IFwidXJsXCI7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSB3ZWIgcGFnZSB0aXRsZS5cbiAgICAgKi9cbiAgICBMaW5rRGlzcGxheVR5cGVbXCJUaXRsZVwiXSA9IFwidGl0bGVcIjtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHRoZSByZWZlcmVuY2VkIHdlYiBwYWdlIGFzIGEgY2FyZC5cbiAgICAgKi9cbiAgICBMaW5rRGlzcGxheVR5cGVbXCJDYXJkXCJdID0gXCJjYXJkXCI7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSB0aGUgcmVmZXJlbmNlZCB3ZWIgcGFnZSBhcyBhbiBlbWJlZC5cbiAgICAgKi9cbiAgICBMaW5rRGlzcGxheVR5cGVbXCJFbWJlZFwiXSA9IFwiZW1iZWRcIjtcbn0pKExpbmtEaXNwbGF5VHlwZSA9IGV4cG9ydHMuTGlua0Rpc3BsYXlUeXBlIHx8IChleHBvcnRzLkxpbmtEaXNwbGF5VHlwZSA9IHt9KSk7XG4vKipcbiAqIFN0YXRlIG9mIG91dGxpbmUgb24gaW1hZ2VzIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBhIHtAbGluayBJbWFnZVNjaGVtYX0uXG4gKi9cbnZhciBJbWFnZU91dGxpbmU7XG4oZnVuY3Rpb24gKEltYWdlT3V0bGluZSkge1xuICAgIC8qKiBJbWFnZSBpcyByZW5kZXJlZCB3aXRob3V0IG91dGxpbmUuICovXG4gICAgSW1hZ2VPdXRsaW5lW1wiRGlzYWJsZWRcIl0gPSBcImRpc2FibGVkXCI7XG4gICAgLyoqIEltYWdlIGlzIHJlbmRlcmVkIHdpdGggb3V0bGluZS4gKi9cbiAgICBJbWFnZU91dGxpbmVbXCJTb2xpZFwiXSA9IFwic29saWRcIjtcbn0pKEltYWdlT3V0bGluZSA9IGV4cG9ydHMuSW1hZ2VPdXRsaW5lIHx8IChleHBvcnRzLkltYWdlT3V0bGluZSA9IHt9KSk7XG4vKipcbiAqIFN0YXRlIG9mIGNvcm5lcnMgb24gaW1hZ2VzIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBhIHtAbGluayBJbWFnZVNjaGVtYX0uXG4gKi9cbnZhciBJbWFnZUNvcm5lclN0eWxlO1xuKGZ1bmN0aW9uIChJbWFnZUNvcm5lclN0eWxlKSB7XG4gICAgLyoqIEltYWdlIGlzIHJlbmRlcmVkIHdpdGggcm91bmRlZCBjb3JuZXJzLiAqL1xuICAgIEltYWdlQ29ybmVyU3R5bGVbXCJSb3VuZGVkXCJdID0gXCJyb3VuZGVkXCI7XG4gICAgLyoqIEltYWdlIGlzIHJlbmRlcmVkIHdpdGggc3F1YXJlIGNvcm5lcnMuICovXG4gICAgSW1hZ2VDb3JuZXJTdHlsZVtcIlNxdWFyZVwiXSA9IFwic3F1YXJlXCI7XG59KShJbWFnZUNvcm5lclN0eWxlID0gZXhwb3J0cy5JbWFnZUNvcm5lclN0eWxlIHx8IChleHBvcnRzLkltYWdlQ29ybmVyU3R5bGUgPSB7fSkpO1xuLyoqXG4gKiBFbnVtZXJhdGlvbiBvZiB1bml0cyBzdXBwb3J0ZWQgYnkgZHVyYXRpb24gc2NoZW1hcy4gU2VlIHtAbGluayBEdXJhdGlvblNjaGVtYS5tYXhVbml0fS5cbiAqL1xudmFyIER1cmF0aW9uVW5pdDtcbihmdW5jdGlvbiAoRHVyYXRpb25Vbml0KSB7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGlvbnMgYSBkdXJhdGlvbiBhcyBhIG51bWJlciBvZiBkYXlzLlxuICAgICAqL1xuICAgIER1cmF0aW9uVW5pdFtcIkRheXNcIl0gPSBcImRheXNcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0aW9ucyBhIGR1cmF0aW9uIGFzIGEgbnVtYmVyIG9mIGhvdXJzLlxuICAgICAqL1xuICAgIER1cmF0aW9uVW5pdFtcIkhvdXJzXCJdID0gXCJob3Vyc1wiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRpb25zIGEgZHVyYXRpb24gYXMgYSBudW1iZXIgb2YgbWludXRlcy5cbiAgICAgKi9cbiAgICBEdXJhdGlvblVuaXRbXCJNaW51dGVzXCJdID0gXCJtaW51dGVzXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGlvbnMgYSBkdXJhdGlvbiBhcyBhIG51bWJlciBvZiBzZWNvbmRzLlxuICAgICAqL1xuICAgIER1cmF0aW9uVW5pdFtcIlNlY29uZHNcIl0gPSBcInNlY29uZHNcIjtcbn0pKER1cmF0aW9uVW5pdCA9IGV4cG9ydHMuRHVyYXRpb25Vbml0IHx8IChleHBvcnRzLkR1cmF0aW9uVW5pdCA9IHt9KSk7XG4vKipcbiAqIFRoZSBzdWJzZXQgb2YgU3RyaW5nSGludFR5cGVzIHRoYXQgZG9uJ3QgaGF2ZSBzcGVjaWZpYyBzY2hlbWEgYXR0cmlidXRlcy5cbiAqL1xuZXhwb3J0cy5TaW1wbGVTdHJpbmdIaW50VmFsdWVUeXBlcyA9IFtcbiAgICBWYWx1ZUhpbnRUeXBlLkF0dGFjaG1lbnQsXG4gICAgVmFsdWVIaW50VHlwZS5IdG1sLFxuICAgIFZhbHVlSGludFR5cGUuTWFya2Rvd24sXG4gICAgVmFsdWVIaW50VHlwZS5VcmwsXG4gICAgVmFsdWVIaW50VHlwZS5FbWFpbCxcbl07XG4vKipcbiAqIEFuIGlkZW50aWZpZXIgZm9yIHRoZSB2YWx1ZSBvZiBhIHByb3BlcnR5IGZvciB1c2UgaW4gdGhlIHtAbGluayBQcm9wZXJ0eUlkZW50aWZpZXJEZXRhaWxzLmxhYmVsfSBmaWVsZC5cbiAqIFdoZW4gdXNlZCwgdGhpcyB3aWxsIGJlIHN1YnN0aXR1dGVkIHdpdGggdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBmb3IgdGhlIGZpbmFsIG91dHB1dCBvZiB0aGUgbGFiZWwuXG4gKlxuICogSWYgbm90IHByZXNlbnQsIHRoZSBsYWJlbCB3aWxsIGJlIHVzZWQgYXMtaXMgaW4gdGhlIGRlZmF1bHQgbGFiZWwgZm9ybWF0IG9mICdcXHtsYWJlbFxcfTogXFx7VkFMVUVcXH0nLlxuICovXG5leHBvcnRzLlByb3BlcnR5TGFiZWxWYWx1ZVRlbXBsYXRlID0gJ3tWQUxVRX0nO1xuLyoqXG4gKiBUaGUgdHlwZSBvZiBjb250ZW50IGluIHRoaXMgYXR0cmlidXRpb24gbm9kZS5cbiAqXG4gKiBNdWx0aXBsZSBhdHRyaWJ1dGlvbiBub2RlcyBjYW4gYmUgcmVuZGVyZWQgYWxsIHRvZ2V0aGVyLCBmb3IgZXhhbXBsZSB0byBoYXZlXG4gKiBhdHRyaWJ1dGlvbiB0aGF0IGNvbnRhaW5zIGJvdGggdGV4dCBhbmQgYSBsb2dvIGltYWdlLlxuICpcbiAqIEBzZWUgW1N0cnVjdHVyaW5nIGRhdGEgd2l0aCBzY2hlbWFzIC0gRGF0YSBhdHRyaWJ1dGlvbl0oaHR0cHM6Ly9jb2RhLmlvL3BhY2tzL2J1aWxkL2xhdGVzdC9ndWlkZXMvYWR2YW5jZWQvc2NoZW1hcy8jYXR0cmlidXRpb24pXG4gKi9cbnZhciBBdHRyaWJ1dGlvbk5vZGVUeXBlO1xuKGZ1bmN0aW9uIChBdHRyaWJ1dGlvbk5vZGVUeXBlKSB7XG4gICAgLyoqXG4gICAgICogVGV4dCBhdHRyaWJ1dGlvbiBjb250ZW50LlxuICAgICAqL1xuICAgIEF0dHJpYnV0aW9uTm9kZVR5cGVbQXR0cmlidXRpb25Ob2RlVHlwZVtcIlRleHRcIl0gPSAxXSA9IFwiVGV4dFwiO1xuICAgIC8qKlxuICAgICAqIEEgaHlwZXJsaW5rIHBvaW50aW5nIHRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGlvbk5vZGVUeXBlW0F0dHJpYnV0aW9uTm9kZVR5cGVbXCJMaW5rXCJdID0gMl0gPSBcIkxpbmtcIjtcbiAgICAvKipcbiAgICAgKiBBbiBpbWFnZSwgb2Z0ZW4gYSBsb2dvIG9mIHRoZSBkYXRhIHNvdXJjZS5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGlvbk5vZGVUeXBlW0F0dHJpYnV0aW9uTm9kZVR5cGVbXCJJbWFnZVwiXSA9IDNdID0gXCJJbWFnZVwiO1xufSkoQXR0cmlidXRpb25Ob2RlVHlwZSA9IGV4cG9ydHMuQXR0cmlidXRpb25Ob2RlVHlwZSB8fCAoZXhwb3J0cy5BdHRyaWJ1dGlvbk5vZGVUeXBlID0ge30pKTtcbi8qKlxuICogQSBoZWxwZXIgZm9yIGNvbnN0cnVjdGluZyBhdHRyaWJ1dGlvbiB0ZXh0LCBsaW5rcywgb3IgaW1hZ2VzIHRoYXQgcmVuZGVyIGFsb25nIHdpdGggYSBQYWNrIHZhbHVlLlxuICpcbiAqIE1hbnkgQVBJcyBoYXZlIGxpY2Vuc2luZyByZXF1aXJlbWVudHMgdGhhdCBhc2sgZm9yIHNwZWNpZmljIGF0dHJpYnV0aW9uIHRvIGJlIGluY2x1ZGVkXG4gKiB3aGVuIHVzaW5nIHRoZWlyIGRhdGEuIEZvciBleGFtcGxlLCBhIHN0b2NrIHBob3RvIEFQSSBtYXkgcmVxdWlyZSBhdHRyaWJ1dGlvbiB0ZXh0XG4gKiBhbmQgYSBsb2dvLlxuICpcbiAqIEFueSB7QGxpbmsgSWRlbnRpdHlEZWZpbml0aW9ufSBjYW4gaW5jbHVkZSBvbmUgb3IgbW9yZSBhdHRyaWJ1dGlvbiBub2RlcyB0aGF0IHdpbGwgYmVcbiAqIHJlbmRlcmVkIGFueSB0aW1lIGEgdmFsdWUgd2l0aCB0aGF0IGlkZW50aXR5IGlzIHJlbmRlcmVkIGluIGEgZG9jLlxuICovXG5mdW5jdGlvbiBtYWtlQXR0cmlidXRpb25Ob2RlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZTtcbn1cbmV4cG9ydHMubWFrZUF0dHJpYnV0aW9uTm9kZSA9IG1ha2VBdHRyaWJ1dGlvbk5vZGU7XG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgICByZXR1cm4gQm9vbGVhbih2YWwgJiYgdmFsLnR5cGUgPT09IFZhbHVlVHlwZS5PYmplY3QpO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgICByZXR1cm4gQm9vbGVhbih2YWwgJiYgdmFsLnR5cGUgPT09IFZhbHVlVHlwZS5BcnJheSk7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuLyoqXG4gKiBVdGlsaXR5IHRoYXQgZXhhbWluZXMgYSBKYXZhU2NyaXB0IHZhbHVlIGFuZCBhdHRlbXB0cyB0byBpbmZlciBhIHNjaGVtYSBkZWZpbml0aW9uXG4gKiB0aGF0IGRlc2NyaWJlcyBpdC5cbiAqXG4gKiBJdCBpcyB2YXN0bHkgcHJlZmVyYWJsZSB0byBkZWZpbmUgYSBzY2hlbWEgbWFudWFsbHkuIEEgY2xlYXIgYW5kIGFjY3VyYXRlIHNjaGVtYSBpcyBvbmUgb2YgdGhlXG4gKiBmdW5kYW1lbnRhbHMgb2YgYSBnb29kIHBhY2suIEhvd2V2ZXIsIGZvciBkYXRhIHRoYXQgaXMgdHJ1bHkgZHluYW1pYyBmb3Igd2hpY2ggYSBzY2hlbWEgY2FuJ3RcbiAqIGJlIGtub3duIGluIGFkdmFuY2Ugbm9yIGNhbiBhIGZ1bmN0aW9uIGJlIHdyaXR0ZW4gdG8gZ2VuZXJhdGUgYSBkeW5hbWljIHNjaGVtYSBmcm9tIG90aGVyXG4gKiBpbnB1dHMsIGl0IG1heSBiZSB1c2VmdWwgdG8gdXMgdGhpcyBoZWxwZXIgdG8gc25pZmYgdGhlIHJldHVybiB2YWx1ZSBhbmQgZ2VuZXJhdGUgYSBiYXNpY1xuICogaW5mZXJyZWQgc2NoZW1hIGZyb20gaXQuXG4gKlxuICogVGhpcyB1dGlsaXR5IGRvZXMgTk9UIGF0dGVtcHQgdG8gZGV0ZXJtaW5lIHtAbGluayBPYmplY3RTY2hlbWFEZWZpbml0aW9uLmlkUHJvcGVydHl9IG9yXG4gKiB7QGxpbmsgT2JqZWN0U2NoZW1hRGVmaW5pdGlvbi5kaXNwbGF5UHJvcGVydHl9IGF0dHJpYnV0ZXMgZm9yXG4gKiBhbiBvYmplY3Qgc2NoZW1hLCB0aG9zZSBhcmUgbGVmdCB1bmRlZmluZWQuXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlU2NoZW1hKG9iaikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgaWYgKG9iai5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBoYXZlIHJlcHJlc2VudGF0aXZlIHZhbHVlLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5BcnJheSwgaXRlbXM6IGdlbmVyYXRlU2NoZW1hKG9ialswXSkgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRGVmYXVsdCBudWxscyB0byBzdHJpbmcgd2hpY2ggaXMgdGhlIGxlYXN0IGNvbW1vbiBkZW5vbWluYXRvci5cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5TdHJpbmcgfTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNba2V5XSA9IGdlbmVyYXRlU2NoZW1hKG9ialtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0eXBlOiBWYWx1ZVR5cGUuT2JqZWN0LCBwcm9wZXJ0aWVzIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5TdHJpbmcgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5Cb29sZWFuIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5OdW1iZXIgfTtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBlbnN1cmVfNC5lbnN1cmVVbnJlYWNoYWJsZSkob2JqKTtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVTY2hlbWEgPSBnZW5lcmF0ZVNjaGVtYTtcbi8qKlxuICogQSB3cmFwcGVyIGZvciBjcmVhdGluZyBhbnkgc2NoZW1hIGRlZmluaXRpb24uXG4gKlxuICogSWYgeW91IGFyZSBjcmVhdGluZyBhIHNjaGVtYSBmb3IgYW4gb2JqZWN0IChhcyBvcHBvc2VkIHRvIGEgc2NhbGFyIG9yIGFycmF5KSxcbiAqIHVzZSB0aGUgbW9yZSBzcGVjaWZpYyB7QGxpbmsgbWFrZU9iamVjdFNjaGVtYX0uXG4gKlxuICogSXQgaXMgYWx3YXlzIHJlY29tbWVuZGVkIHRvIHVzZSB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgY3JlYXRpbmcgdG9wLWxldmVsIHNjaGVtYVxuICogb2JqZWN0cyByYXRoZXIgdGhhbiBzcGVjaWZ5aW5nIG9iamVjdCBsaXRlcmFscy4gV3JhcHBlcnMgdmFsaWRhdGUgeW91ciBzY2hlbWFzXG4gKiBhdCBjcmVhdGlvbiB0aW1lLCBwcm92aWRlIGJldHRlciBUeXBlU2NyaXB0IHR5cGUgaW5mZXJlbmNlLCBhbmQgY2FuIHJlZHVjZVxuICogYm9pbGVycGxhdGUuXG4gKlxuICogQXQgdGhpcyB0aW1lLCB0aGlzIHdyYXBwZXIgcHJvdmlkZXMgb25seSBiZXR0ZXIgVHlwZVNjcmlwdCB0eXBlIGluZmVyZW5jZSxcbiAqIGJ1dCBpdCBtYXkgZG8gdmFsaWRhdGlvbiBpbiBhIGZ1dHVyZSBTREsgdmVyc2lvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb2RhLm1ha2VTY2hlbWEoe1xuICogICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5BcnJheSxcbiAqICAgaXRlbXM6IHt0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmd9LFxuICogfSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gbWFrZVNjaGVtYShzY2hlbWEpIHtcbiAgICByZXR1cm4gc2NoZW1hO1xufVxuZXhwb3J0cy5tYWtlU2NoZW1hID0gbWFrZVNjaGVtYTtcbi8qKlxuICogQSB3cmFwcGVyIGZvciBjcmVhdGluZyBhIHNjaGVtYSBkZWZpbml0aW9uIGZvciBhbiBvYmplY3QgdmFsdWUuXG4gKlxuICogSXQgaXMgYWx3YXlzIHJlY29tbWVuZGVkIHRvIHVzZSB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgY3JlYXRpbmcgdG9wLWxldmVsIHNjaGVtYVxuICogb2JqZWN0cyByYXRoZXIgdGhhbiBzcGVjaWZ5aW5nIG9iamVjdCBsaXRlcmFscy4gV3JhcHBlcnMgdmFsaWRhdGUgeW91ciBzY2hlbWFzXG4gKiBhdCBjcmVhdGlvbiB0aW1lLCBwcm92aWRlIGJldHRlciBUeXBlU2NyaXB0IHR5cGUgaW5mZXJlbmNlLCBhbmQgY2FuIHJlZHVjZVxuICogYm9pbGVycGxhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogY29kYS5tYWtlT2JqZWN0U2NoZW1hKHtcbiAqICAgaWQ6IFwiZW1haWxcIixcbiAqICAgcHJpbWFyeTogXCJuYW1lXCIsXG4gKiAgIHByb3BlcnRpZXM6IHtcbiAqICAgICBlbWFpbDoge3R5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZywgcmVxdWlyZWQ6IHRydWV9LFxuICogICAgIG5hbWU6IHt0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAqICAgfSxcbiAqIH0pO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIG1ha2VPYmplY3RTY2hlbWEoc2NoZW1hRGVmKSB7XG4gICAgY29uc3Qgc2NoZW1hID0geyAuLi5zY2hlbWFEZWYsIHR5cGU6IFZhbHVlVHlwZS5PYmplY3QgfTtcbiAgICAvLyBJbiBjYXNlIGEgc2luZ2xlIHNjaGVtYSBvYmplY3Qgd2FzIHVzZWQgZm9yIG11bHRpcGxlIHByb3BlcnRpZXMsIG1ha2UgY29waWVzIGZvciBlYWNoIG9mIHRoZW0uXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMpKSB7XG4gICAgICAgIC8vICd0eXBlJyB3YXMganVzdCBjcmVhdGVkIGZyb20gc2NyYXRjaCBhYm92ZVxuICAgICAgICBpZiAoa2V5ICE9PSAndHlwZScpIHtcbiAgICAgICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCBsaWtlIHRoZSByYXcgc2NoZW1hLnByb3BlcnRpZXNba2V5XSAob24gdGhlIGxlZnQgb25seSB0aG91Z2guLi4pXG4gICAgICAgICAgICBjb25zdCB0eXBlZEtleSA9IGtleTtcbiAgICAgICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW3R5cGVkS2V5XSA9ICgwLCBvYmplY3RfdXRpbHNfMS5kZWVwQ29weSkoc2NoZW1hLnByb3BlcnRpZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGVPYmplY3RTY2hlbWEoc2NoZW1hKTtcbiAgICByZXR1cm4gc2NoZW1hO1xufVxuZXhwb3J0cy5tYWtlT2JqZWN0U2NoZW1hID0gbWFrZU9iamVjdFNjaGVtYTtcbmZ1bmN0aW9uIHZhbGlkYXRlT2JqZWN0U2NoZW1hKHNjaGVtYSkge1xuICAgIC8vIFRPRE8oam9uYXRoYW4pOiBUaGVzZSBzaG91bGQgYWxsIG1vdmUgdG8gdXBsb2FkX3ZhbGlkYXRpb24gY2hlY2tzLCBzaW5jZSB0aGVzZSBhcmVuJ3QgZ2V0dGluZ1xuICAgIC8vIGVuZm9yY2VkIG9uIHVwbG9hZCBhbmQgYSBoYWNrZWQgQ0xJIGNvdWxkIGp1c3QgYnlwYXNzIHRoZXNlLlxuICAgIC8vIFRoZXNlIGFyZW4ndCBwYXJ0aWN1bGFybHkgaW1wb3J0YW50IGNoZWNrcywgdGhleSdyZSBtb3JlIGp1c3QgYWlkcyBmb3IgdGhlIG1ha2VyXG4gICAgLy8gc28gdGhhdCB0aGVpciByZWZlcmVuY2UgYW5kIHBlb3BsZSB2YWx1ZXMgd29uJ3QgYmUgYnJva2VuIGF0IHJ1bnRpbWUuXG4gICAgaWYgKHNjaGVtYS5jb2RhVHlwZSA9PT0gVmFsdWVIaW50VHlwZS5SZWZlcmVuY2UpIHtcbiAgICAgICAgY29uc3QgeyBpZCwgaWRlbnRpdHksIHByaW1hcnkgfSA9ICgwLCBtaWdyYXRpb25fMS5vYmplY3RTY2hlbWFIZWxwZXIpKHNjaGVtYSk7XG4gICAgICAgIGNoZWNrUmVxdWlyZWRGaWVsZEluT2JqZWN0U2NoZW1hKGlkLCAnaWRQcm9wZXJ0eScsIHNjaGVtYS5jb2RhVHlwZSk7XG4gICAgICAgIGNoZWNrUmVxdWlyZWRGaWVsZEluT2JqZWN0U2NoZW1hKGlkZW50aXR5LCAnaWRlbnRpdHknLCBzY2hlbWEuY29kYVR5cGUpO1xuICAgICAgICBjaGVja1JlcXVpcmVkRmllbGRJbk9iamVjdFNjaGVtYShwcmltYXJ5LCAnZGlzcGxheVByb3BlcnR5Jywgc2NoZW1hLmNvZGFUeXBlKTtcbiAgICAgICAgY2hlY2tTY2hlbWFQcm9wZXJ0eUlzUmVxdWlyZWQoKDAsIGVuc3VyZV8yLmVuc3VyZUV4aXN0cykoaWQpLCBzY2hlbWEsICdpZFByb3BlcnR5Jyk7XG4gICAgICAgIGNoZWNrU2NoZW1hUHJvcGVydHlJc1JlcXVpcmVkKCgwLCBlbnN1cmVfMi5lbnN1cmVFeGlzdHMpKHByaW1hcnkpLCBzY2hlbWEsICdkaXNwbGF5UHJvcGVydHknKTtcbiAgICB9XG4gICAgaWYgKHNjaGVtYS5jb2RhVHlwZSA9PT0gVmFsdWVIaW50VHlwZS5QZXJzb24pIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gKDAsIG1pZ3JhdGlvbl8xLm9iamVjdFNjaGVtYUhlbHBlcikoc2NoZW1hKTtcbiAgICAgICAgY2hlY2tSZXF1aXJlZEZpZWxkSW5PYmplY3RTY2hlbWEoaWQsICdpZFByb3BlcnR5Jywgc2NoZW1hLmNvZGFUeXBlKTtcbiAgICAgICAgY2hlY2tTY2hlbWFQcm9wZXJ0eUlzUmVxdWlyZWQoKDAsIGVuc3VyZV8yLmVuc3VyZUV4aXN0cykoaWQpLCBzY2hlbWEsICdpZFByb3BlcnR5Jyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW19wcm9wZXJ0eUtleSwgcHJvcGVydHlTY2hlbWFdIG9mIE9iamVjdC5lbnRyaWVzKHNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAgICBpZiAocHJvcGVydHlTY2hlbWEudHlwZSA9PT0gVmFsdWVUeXBlLk9iamVjdCkge1xuICAgICAgICAgICAgdmFsaWRhdGVPYmplY3RTY2hlbWEocHJvcGVydHlTY2hlbWEpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tSZXF1aXJlZEZpZWxkSW5PYmplY3RTY2hlbWEoZmllbGQsIGZpZWxkTmFtZSwgY29kYVR5cGUpIHtcbiAgICAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShmaWVsZCwgYE9iamVjdHMgd2l0aCBjb2RhVHlwZSBcIiR7Y29kYVR5cGV9XCIgcmVxdWlyZSBhIFwiJHtmaWVsZE5hbWV9XCIgcHJvcGVydHkgaW4gdGhlIHNjaGVtYSBkZWZpbml0aW9uLmApO1xufVxuZnVuY3Rpb24gY2hlY2tTY2hlbWFQcm9wZXJ0eUlzUmVxdWlyZWQoZmllbGQsIHNjaGVtYSwgcmVmZXJlbmNlZEJ5UHJvcGVydHlOYW1lKSB7XG4gICAgY29uc3QgeyBwcm9wZXJ0aWVzLCBjb2RhVHlwZSB9ID0gc2NoZW1hO1xuICAgICgwLCBlbnN1cmVfMS5hc3NlcnRDb25kaXRpb24pKHByb3BlcnRpZXNbZmllbGRdLCBgJHtyZWZlcmVuY2VkQnlQcm9wZXJ0eU5hbWV9IHNldCB0byB1bmRlZmluZWQgZmllbGQgXCIke2ZpZWxkfVwiYCk7XG4gICAgKDAsIGVuc3VyZV8xLmFzc2VydENvbmRpdGlvbikocHJvcGVydGllc1tmaWVsZF0ucmVxdWlyZWQsIGBGaWVsZCBcIiR7ZmllbGR9XCIgbXVzdCBiZSBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gc2NoZW1hIHdpdGggY29kYVR5cGUgXCIke2NvZGFUeXBlfVwiLmApO1xufVxuLyoqXG4gKiBOb3JtYWxpemVzIGEgc2NoZW1hIGtleSBpbnRvIFBhc2NhbENhc2UuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNjaGVtYUtleShrZXkpIHtcbiAgICAvLyBDb2xvbnMgY2F1c2UgcHJvYmxlbXMgaW4gb3VyIGZvcm11bGEgaGFuZGxpbmcuXG4gICAgcmV0dXJuICgwLCBwYXNjYWxjYXNlXzEuZGVmYXVsdCkoa2V5KS5yZXBsYWNlKC86L2csICdfJyk7XG59XG5leHBvcnRzLm5vcm1hbGl6ZVNjaGVtYUtleSA9IG5vcm1hbGl6ZVNjaGVtYUtleTtcbi8qKlxuICogTm9ybWFsaXplcyBhIHNjaGVtYSBwcm9wZXJ0eSBrZXkgcGF0aC4gVGhpcyBpbnRlcnByZXRzIFwiLlwicyBhcyBhY2Nlc3Npbmcgb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFuZCBcIltdXCIgYXMgYWNjZXNzaW5nIGFycmF5IGl0ZW1zLiBVc2VzIG5vcm1hbGl6ZVNjaGVtYUtleSB0byBub3JtYWxpemUgZWFjaCBwYXJ0IGluLWJldHdlZW4uXG4gKlxuICogVGhpcyBpcyB1c2VkIGZvciBvYmplY3Qgc2NoZW1hIHByb3BlcnRpZXMgdGhhdCBzdXBwb3J0IHBhdGggcHJvamVjdGlvbi5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplU2NoZW1hS2V5UGF0aChrZXksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKSB7XG4gICAgLy8gVHJ5IGFuIGV4YWN0IG1hdGNoIG9uIHRoZSBwcm9wZXJ0aWVzIGZpcnN0LlxuICAgIGlmIChub3JtYWxpemVkUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVTY2hlbWFLZXkoa2V5KSkpIHtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVNjaGVtYUtleShrZXkpO1xuICAgIH1cbiAgICAvLyBUcnkgc3BsaXR0aW5nIGJ5IC4gdG8gaGFuZGxlIGpzb24gcGF0aHMuXG4gICAgcmV0dXJuIGtleVxuICAgICAgICAuc3BsaXQoJy4nKVxuICAgICAgICAubWFwKHZhbCA9PiB7XG4gICAgICAgIGxldCBwYXJ0VG9Ob3JtYWxpemUgPSB2YWw7XG4gICAgICAgIGxldCBwYXJ0VG9JZ25vcmVOb3JtYWxpemF0aW9uID0gJyc7XG4gICAgICAgIC8vIEhhbmRsZXMgYXJyYXkgcGF0aGluZy5cbiAgICAgICAgaWYgKHZhbC5pbmNsdWRlcygnWycpKSB7XG4gICAgICAgICAgICBwYXJ0VG9Ob3JtYWxpemUgPSB2YWwuc3Vic3RyaW5nKDAsIHZhbC5pbmRleE9mKCdbJykpO1xuICAgICAgICAgICAgcGFydFRvSWdub3JlTm9ybWFsaXphdGlvbiA9IHZhbC5zdWJzdHJpbmcodmFsLmluZGV4T2YoJ1snKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVNjaGVtYUtleShwYXJ0VG9Ob3JtYWxpemUpICsgcGFydFRvSWdub3JlTm9ybWFsaXphdGlvbjtcbiAgICB9KVxuICAgICAgICAuam9pbignLicpO1xufVxuZXhwb3J0cy5ub3JtYWxpemVTY2hlbWFLZXlQYXRoID0gbm9ybWFsaXplU2NoZW1hS2V5UGF0aDtcbi8qKlxuICogTm9ybWFsaXplcyBhIHNjaGVtYSBQcm9wZXJ0eUlkZW50aWZpZXIgYnkgY29udmVydGluZyBpdCB0byBQYXNjYWxDYXNlLlxuICovXG5mdW5jdGlvbiBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIoa2V5LCBub3JtYWxpemVkUHJvcGVydGllcykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplU2NoZW1hS2V5UGF0aChrZXksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgY29uc3QgeyBsYWJlbCwgcHJvcGVydHk6IHZhbHVlLCBwbGFjZWhvbGRlciB9ID0ga2V5O1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb3BlcnR5OiBub3JtYWxpemVTY2hlbWFLZXlQYXRoKHZhbHVlLCBub3JtYWxpemVkUHJvcGVydGllcyksXG4gICAgICAgIGxhYmVsLFxuICAgICAgICBwbGFjZWhvbGRlcixcbiAgICB9O1xufVxuLyoqXG4gKiBBdHRlbXB0cyB0byB0cmFuc2Zvcm0gYSBwcm9wZXJ0eSB2YWx1ZSAod2hpY2ggbWF5IGJlIGEganNvbi1wYXRoIHN0cmluZyBvciBhIG5vcm1hbCBvYmplY3Qgc2NoZW1hIHByb3BlcnR5KSBpbnRvXG4gKiBhIHBhdGggdG8gYWNjZXNzIHRoZSByZWxldmFudCBzY2hlbWEuIFNwZWNpZmljYWxseSB0aGlzIGhhbmRsZXMgdGhlIGNhc2Ugb2ZcbiAqICAgMSkgb2JqZWN0IHNjaGVtYXMgd2hpY2ggaGF2ZSBhbiBpbnRlcm1lZGlhdGUgYHByb3BlcnRpZXNgIG9iamVjdCBhbmRcbiAqICAgMikgYXJyYXkgc2NoZW1hcyB3aGljaCBoYXZlIGFuIGludGVybWVkaWF0ZSBgaXRlbXNgIG9iamVjdCB0byB0cmF2ZXJzZS5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUHJvcGVydHlWYWx1ZVBhdGhJbnRvU2NoZW1hUGF0aChwcm9wZXJ0eVZhbHVlKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gcHJvcGVydHlWYWx1ZVxuICAgICAgICAuc3BsaXQoJy4nKVxuICAgICAgICAubWFwKHZhbCA9PiB7XG4gICAgICAgIHJldHVybiB2YWwucmVwbGFjZSgvXFxbKC4qPylcXF0vLCAnLml0ZW1zJyk7XG4gICAgfSlcbiAgICAgICAgLmpvaW4oJy5wcm9wZXJ0aWVzLicpO1xuICAgIHJldHVybiBub3JtYWxpemVkVmFsdWU7XG59XG5leHBvcnRzLm5vcm1hbGl6ZVByb3BlcnR5VmFsdWVQYXRoSW50b1NjaGVtYVBhdGggPSBub3JtYWxpemVQcm9wZXJ0eVZhbHVlUGF0aEludG9TY2hlbWFQYXRoO1xuZnVuY3Rpb24gbm9ybWFsaXplU2NoZW1hKHNjaGVtYSkge1xuICAgIGlmIChpc0FycmF5KHNjaGVtYSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnNjaGVtYSxcbiAgICAgICAgICAgIHR5cGU6IFZhbHVlVHlwZS5BcnJheSxcbiAgICAgICAgICAgIGl0ZW1zOiBub3JtYWxpemVTY2hlbWEoc2NoZW1hLml0ZW1zKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0ge307XG4gICAgICAgIGNvbnN0IHsgaWQsIHByaW1hcnksIGZlYXR1cmVkLCBpZFByb3BlcnR5LCBkaXNwbGF5UHJvcGVydHksIGZlYXR1cmVkUHJvcGVydGllcywgdGl0bGVQcm9wZXJ0eSwgc3VidGl0bGVQcm9wZXJ0aWVzLCBpbWFnZVByb3BlcnR5LCBzbmlwcGV0UHJvcGVydHksIGxpbmtQcm9wZXJ0eSwgfSA9IHNjaGVtYTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxpemVkS2V5ID0gbm9ybWFsaXplU2NoZW1hS2V5KGtleSk7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHNjaGVtYS5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgICAgICBjb25zdCB7IHJlcXVpcmVkLCBmcm9tS2V5IH0gPSBwcm9wcztcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRbbm9ybWFsaXplZEtleV0gPSBPYmplY3QuYXNzaWduKG5vcm1hbGl6ZVNjaGVtYShwcm9wcyksIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBmcm9tS2V5OiBmcm9tS2V5IHx8IChub3JtYWxpemVkS2V5ICE9PSBrZXkgPyBrZXkgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFNjaGVtYSA9IHtcbiAgICAgICAgICAgIHR5cGU6IFZhbHVlVHlwZS5PYmplY3QsXG4gICAgICAgICAgICBpZDogaWQgPyBub3JtYWxpemVTY2hlbWFLZXkoaWQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZmVhdHVyZWQ6IGZlYXR1cmVkID8gZmVhdHVyZWQubWFwKG5vcm1hbGl6ZVNjaGVtYUtleSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcmltYXJ5OiBwcmltYXJ5ID8gbm9ybWFsaXplU2NoZW1hS2V5KHByaW1hcnkpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaWRQcm9wZXJ0eTogaWRQcm9wZXJ0eSA/IG5vcm1hbGl6ZVNjaGVtYUtleShpZFByb3BlcnR5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGZlYXR1cmVkUHJvcGVydGllczogZmVhdHVyZWRQcm9wZXJ0aWVzID8gZmVhdHVyZWRQcm9wZXJ0aWVzLm1hcChub3JtYWxpemVTY2hlbWFLZXkpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGlzcGxheVByb3BlcnR5OiBkaXNwbGF5UHJvcGVydHkgPyBub3JtYWxpemVTY2hlbWFLZXkoZGlzcGxheVByb3BlcnR5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IG5vcm1hbGl6ZWQsXG4gICAgICAgICAgICBpZGVudGl0eTogc2NoZW1hLmlkZW50aXR5LFxuICAgICAgICAgICAgY29kYVR5cGU6IHNjaGVtYS5jb2RhVHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzY2hlbWEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhdHRyaWJ1dGlvbjogc2NoZW1hLmF0dHJpYnV0aW9uLFxuICAgICAgICAgICAgaW5jbHVkZVVua25vd25Qcm9wZXJ0aWVzOiBzY2hlbWEuaW5jbHVkZVVua25vd25Qcm9wZXJ0aWVzLFxuICAgICAgICAgICAgdGl0bGVQcm9wZXJ0eTogdGl0bGVQcm9wZXJ0eSA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcih0aXRsZVByb3BlcnR5LCBub3JtYWxpemVkKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN1YnRpdGxlUHJvcGVydGllczogc3VidGl0bGVQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgPyBzdWJ0aXRsZVByb3BlcnRpZXMubWFwKHN1YlByb3AgPT4gbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKHN1YlByb3AsIG5vcm1hbGl6ZWQpKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaW1hZ2VQcm9wZXJ0eTogaW1hZ2VQcm9wZXJ0eSA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihpbWFnZVByb3BlcnR5LCBub3JtYWxpemVkKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNuaXBwZXRQcm9wZXJ0eTogc25pcHBldFByb3BlcnR5ID8gbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKHNuaXBwZXRQcm9wZXJ0eSwgbm9ybWFsaXplZCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBsaW5rUHJvcGVydHk6IGxpbmtQcm9wZXJ0eSA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihsaW5rUHJvcGVydHksIG5vcm1hbGl6ZWQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbXV0YWJsZTogc2NoZW1hLm11dGFibGUsXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IHNjaGVtYS5hdXRvY29tcGxldGUsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub3JtYWxpemVkU2NoZW1hO1xuICAgIH1cbiAgICByZXR1cm4gc2NoZW1hO1xufVxuZXhwb3J0cy5ub3JtYWxpemVTY2hlbWEgPSBub3JtYWxpemVTY2hlbWE7XG4vKipcbiAqIENvbnZlbmllbmNlIGZvciBjcmVhdGluZyBhIHJlZmVyZW5jZSBvYmplY3Qgc2NoZW1hIGZyb20gYW4gZXhpc3Rpbmcgc2NoZW1hIGZvciB0aGVcbiAqIG9iamVjdC4gQ29waWVzIG92ZXIgdGhlIGlkZW50aXR5LCBpZFByb3BlcnR5LCBhbmQgZGlzcGxheVByb3BlcnR5IGZyb20gdGhlIHNjaGVtYSxcbiAqIGFuZCB0aGUgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW5kaWNhdGVkIGJ5IHRoZSBpZFByb3BlcnR5IGFuZCBkaXNwbGF5UHJvcGVydHkuXG4gKiBBIHJlZmVyZW5jZSBzY2hlbWEgY2FuIGFsd2F5cyBiZSBkZWZpbmVkIGRpcmVjdGx5LCBidXQgaWYgeW91IGFscmVhZHkgaGF2ZSBhbiBvYmplY3RcbiAqIHNjaGVtYSBpdCBwcm92aWRlcyBiZXR0ZXIgY29kZSByZXVzZSB0byBkZXJpdmUgYSByZWZlcmVuY2Ugc2NoZW1hIGluc3RlYWQuXG4gKi9cbmZ1bmN0aW9uIG1ha2VSZWZlcmVuY2VTY2hlbWFGcm9tT2JqZWN0U2NoZW1hKHNjaGVtYSwgaWRlbnRpdHlOYW1lKSB7XG4gICAgY29uc3QgeyB0eXBlLCBpZCwgcHJpbWFyeSwgaWRlbnRpdHksIHByb3BlcnRpZXMsIG11dGFibGUsIGF1dG9jb21wbGV0ZSB9ID0gKDAsIG1pZ3JhdGlvbl8xLm9iamVjdFNjaGVtYUhlbHBlcikoc2NoZW1hKTtcbiAgICAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShpZGVudGl0eSB8fCBpZGVudGl0eU5hbWUsICdTb3VyY2Ugc2NoZW1hIG11c3QgaGF2ZSBhbiBpZGVudGl0eSBmaWVsZCwgb3IgeW91IG11c3QgcHJvdmlkZSBhbiBpZGVudGl0eSBuYW1lIGZvciB0aGUgcmVmZXJlbmNlLicpO1xuICAgIGNvbnN0IHZhbGlkSWQgPSAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShpZCk7XG4gICAgY29uc3QgcmVmZXJlbmNlUHJvcGVydGllcyA9IHsgW3ZhbGlkSWRdOiBwcm9wZXJ0aWVzW3ZhbGlkSWRdIH07XG4gICAgaWYgKHByaW1hcnkgJiYgcHJpbWFyeSAhPT0gaWQpIHtcbiAgICAgICAgcmVmZXJlbmNlUHJvcGVydGllc1twcmltYXJ5XSA9IHByb3BlcnRpZXNbcHJpbWFyeV07XG4gICAgfVxuICAgIHJldHVybiBtYWtlT2JqZWN0U2NoZW1hKHtcbiAgICAgICAgY29kYVR5cGU6IFZhbHVlSGludFR5cGUuUmVmZXJlbmNlLFxuICAgICAgICB0eXBlLFxuICAgICAgICBpZFByb3BlcnR5OiBpZCxcbiAgICAgICAgaWRlbnRpdHk6IGlkZW50aXR5IHx8IHsgbmFtZTogKDAsIGVuc3VyZV8yLmVuc3VyZUV4aXN0cykoaWRlbnRpdHlOYW1lKSB9LFxuICAgICAgICBkaXNwbGF5UHJvcGVydHk6IHByaW1hcnksXG4gICAgICAgIHByb3BlcnRpZXM6IHJlZmVyZW5jZVByb3BlcnRpZXMsXG4gICAgICAgIG11dGFibGUsXG4gICAgICAgIGF1dG9jb21wbGV0ZSxcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWEgPSBtYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYTtcbi8qKlxuICogQ29udmVuaWVuY2UgZm9yIGRlZmluaW5nIHRoZSByZXN1bHQgc2NoZW1hIGZvciBhbiBhY3Rpb24uIFRoZSBpZGVudGl0eSBlbmFibGVzIENvZGEgdG9cbiAqIHVwZGF0ZSB0aGUgY29ycmVzcG9uZGluZyBzeW5jIHRhYmxlIHJvdywgaWYgaXQgZXhpc3RzLlxuICogWW91IGNvdWxkIGFkZCB0aGUgaWRlbnRpdHkgZGlyZWN0bHksIGJ1dCB0aGF0IHdvdWxkIG1ha2UgdGhlIHNjaGVtYSBsZXNzIHJlLXVzYWJsZS5cbiAqL1xuZnVuY3Rpb24gd2l0aElkZW50aXR5KHNjaGVtYSwgaWRlbnRpdHlOYW1lKSB7XG4gICAgcmV0dXJuIG1ha2VPYmplY3RTY2hlbWEoe1xuICAgICAgICAuLi4oMCwgb2JqZWN0X3V0aWxzXzEuZGVlcENvcHkpKHNjaGVtYSksXG4gICAgICAgIGlkZW50aXR5OiB7IG5hbWU6ICgwLCBlbnN1cmVfMy5lbnN1cmVOb25FbXB0eVN0cmluZykoaWRlbnRpdHlOYW1lKSB9LFxuICAgIH0pO1xufVxuZXhwb3J0cy53aXRoSWRlbnRpdHkgPSB3aXRoSWRlbnRpdHk7XG4iLCAidmFyIGNsb25lID0gKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW5zdGFuY2VvZihvYmosIHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUgIT0gbnVsbCAmJiBvYmogaW5zdGFuY2VvZiB0eXBlO1xufVxuXG52YXIgbmF0aXZlTWFwO1xudHJ5IHtcbiAgbmF0aXZlTWFwID0gTWFwO1xufSBjYXRjaChfKSB7XG4gIC8vIG1heWJlIGEgcmVmZXJlbmNlIGVycm9yIGJlY2F1c2Ugbm8gYE1hcGAuIEdpdmUgaXQgYSBkdW1teSB2YWx1ZSB0aGF0IG5vXG4gIC8vIHZhbHVlIHdpbGwgZXZlciBiZSBhbiBpbnN0YW5jZW9mLlxuICBuYXRpdmVNYXAgPSBmdW5jdGlvbigpIHt9O1xufVxuXG52YXIgbmF0aXZlU2V0O1xudHJ5IHtcbiAgbmF0aXZlU2V0ID0gU2V0O1xufSBjYXRjaChfKSB7XG4gIG5hdGl2ZVNldCA9IGZ1bmN0aW9uKCkge307XG59XG5cbnZhciBuYXRpdmVQcm9taXNlO1xudHJ5IHtcbiAgbmF0aXZlUHJvbWlzZSA9IFByb21pc2U7XG59IGNhdGNoKF8pIHtcbiAgbmF0aXZlUHJvbWlzZSA9IGZ1bmN0aW9uKCkge307XG59XG5cbi8qKlxuICogQ2xvbmVzIChjb3BpZXMpIGFuIE9iamVjdCB1c2luZyBkZWVwIGNvcHlpbmcuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBzdXBwb3J0cyBjaXJjdWxhciByZWZlcmVuY2VzIGJ5IGRlZmF1bHQsIGJ1dCBpZiB5b3UgYXJlIGNlcnRhaW5cbiAqIHRoZXJlIGFyZSBubyBjaXJjdWxhciByZWZlcmVuY2VzIGluIHlvdXIgb2JqZWN0LCB5b3UgY2FuIHNhdmUgc29tZSBDUFUgdGltZVxuICogYnkgY2FsbGluZyBjbG9uZShvYmosIGZhbHNlKS5cbiAqXG4gKiBDYXV0aW9uOiBpZiBgY2lyY3VsYXJgIGlzIGZhbHNlIGFuZCBgcGFyZW50YCBjb250YWlucyBjaXJjdWxhciByZWZlcmVuY2VzLFxuICogeW91ciBwcm9ncmFtIG1heSBlbnRlciBhbiBpbmZpbml0ZSBsb29wIGFuZCBjcmFzaC5cbiAqXG4gKiBAcGFyYW0gYHBhcmVudGAgLSB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZFxuICogQHBhcmFtIGBjaXJjdWxhcmAgLSBzZXQgdG8gdHJ1ZSBpZiB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZCBtYXkgY29udGFpblxuICogICAgY2lyY3VsYXIgcmVmZXJlbmNlcy4gKG9wdGlvbmFsIC0gdHJ1ZSBieSBkZWZhdWx0KVxuICogQHBhcmFtIGBkZXB0aGAgLSBzZXQgdG8gYSBudW1iZXIgaWYgdGhlIG9iamVjdCBpcyBvbmx5IHRvIGJlIGNsb25lZCB0b1xuICogICAgYSBwYXJ0aWN1bGFyIGRlcHRoLiAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBJbmZpbml0eSlcbiAqIEBwYXJhbSBgcHJvdG90eXBlYCAtIHNldHMgdGhlIHByb3RvdHlwZSB0byBiZSB1c2VkIHdoZW4gY2xvbmluZyBhbiBvYmplY3QuXG4gKiAgICAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBwYXJlbnQgcHJvdG90eXBlKS5cbiAqIEBwYXJhbSBgaW5jbHVkZU5vbkVudW1lcmFibGVgIC0gc2V0IHRvIHRydWUgaWYgdGhlIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAqICAgIHNob3VsZCBiZSBjbG9uZWQgYXMgd2VsbC4gTm9uLWVudW1lcmFibGUgcHJvcGVydGllcyBvbiB0aGUgcHJvdG90eXBlXG4gKiAgICBjaGFpbiB3aWxsIGJlIGlnbm9yZWQuIChvcHRpb25hbCAtIGZhbHNlIGJ5IGRlZmF1bHQpXG4qL1xuZnVuY3Rpb24gY2xvbmUocGFyZW50LCBjaXJjdWxhciwgZGVwdGgsIHByb3RvdHlwZSwgaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PT0gJ29iamVjdCcpIHtcbiAgICBkZXB0aCA9IGNpcmN1bGFyLmRlcHRoO1xuICAgIHByb3RvdHlwZSA9IGNpcmN1bGFyLnByb3RvdHlwZTtcbiAgICBpbmNsdWRlTm9uRW51bWVyYWJsZSA9IGNpcmN1bGFyLmluY2x1ZGVOb25FbnVtZXJhYmxlO1xuICAgIGNpcmN1bGFyID0gY2lyY3VsYXIuY2lyY3VsYXI7XG4gIH1cbiAgLy8gbWFpbnRhaW4gdHdvIGFycmF5cyBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcywgd2hlcmUgY29ycmVzcG9uZGluZyBwYXJlbnRzXG4gIC8vIGFuZCBjaGlsZHJlbiBoYXZlIHRoZSBzYW1lIGluZGV4XG4gIHZhciBhbGxQYXJlbnRzID0gW107XG4gIHZhciBhbGxDaGlsZHJlbiA9IFtdO1xuXG4gIHZhciB1c2VCdWZmZXIgPSB0eXBlb2YgQnVmZmVyICE9ICd1bmRlZmluZWQnO1xuXG4gIGlmICh0eXBlb2YgY2lyY3VsYXIgPT0gJ3VuZGVmaW5lZCcpXG4gICAgY2lyY3VsYXIgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZGVwdGggPT0gJ3VuZGVmaW5lZCcpXG4gICAgZGVwdGggPSBJbmZpbml0eTtcblxuICAvLyByZWN1cnNlIHRoaXMgZnVuY3Rpb24gc28gd2UgZG9uJ3QgcmVzZXQgYWxsUGFyZW50cyBhbmQgYWxsQ2hpbGRyZW5cbiAgZnVuY3Rpb24gX2Nsb25lKHBhcmVudCwgZGVwdGgpIHtcbiAgICAvLyBjbG9uaW5nIG51bGwgYWx3YXlzIHJldHVybnMgbnVsbFxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIGlmIChkZXB0aCA9PT0gMClcbiAgICAgIHJldHVybiBwYXJlbnQ7XG5cbiAgICB2YXIgY2hpbGQ7XG4gICAgdmFyIHByb3RvO1xuICAgIGlmICh0eXBlb2YgcGFyZW50ICE9ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZU1hcCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZU1hcCgpO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVTZXQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBuYXRpdmVTZXQoKTtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlUHJvbWlzZSkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBwYXJlbnQudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJlc29sdmUoX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KF9jbG9uZShlcnIsIGRlcHRoIC0gMSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2xvbmUuX19pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gW107XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzUmVnRXhwKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IFJlZ0V4cChwYXJlbnQuc291cmNlLCBfX2dldFJlZ0V4cEZsYWdzKHBhcmVudCkpO1xuICAgICAgaWYgKHBhcmVudC5sYXN0SW5kZXgpIGNoaWxkLmxhc3RJbmRleCA9IHBhcmVudC5sYXN0SW5kZXg7XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzRGF0ZShwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBEYXRlKHBhcmVudC5nZXRUaW1lKCkpO1xuICAgIH0gZWxzZSBpZiAodXNlQnVmZmVyICYmIEJ1ZmZlci5pc0J1ZmZlcihwYXJlbnQpKSB7XG4gICAgICBpZiAoQnVmZmVyLmFsbG9jVW5zYWZlKSB7XG4gICAgICAgIC8vIE5vZGUuanMgPj0gNC41LjBcbiAgICAgICAgY2hpbGQgPSBCdWZmZXIuYWxsb2NVbnNhZmUocGFyZW50Lmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPbGRlciBOb2RlLmpzIHZlcnNpb25zXG4gICAgICAgIGNoaWxkID0gbmV3IEJ1ZmZlcihwYXJlbnQubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIHBhcmVudC5jb3B5KGNoaWxkKTtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgRXJyb3IpKSB7XG4gICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwcm90b3R5cGUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocGFyZW50KTtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcbiAgICAgICAgcHJvdG8gPSBwcm90b3R5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNpcmN1bGFyKSB7XG4gICAgICB2YXIgaW5kZXggPSBhbGxQYXJlbnRzLmluZGV4T2YocGFyZW50KTtcblxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIHJldHVybiBhbGxDaGlsZHJlbltpbmRleF07XG4gICAgICB9XG4gICAgICBhbGxQYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIGFsbENoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIH1cblxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZU1hcCkpIHtcbiAgICAgIHBhcmVudC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdmFyIGtleUNoaWxkID0gX2Nsb25lKGtleSwgZGVwdGggLSAxKTtcbiAgICAgICAgdmFyIHZhbHVlQ2hpbGQgPSBfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSk7XG4gICAgICAgIGNoaWxkLnNldChrZXlDaGlsZCwgdmFsdWVDaGlsZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlU2V0KSkge1xuICAgICAgcGFyZW50LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIGVudHJ5Q2hpbGQgPSBfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSk7XG4gICAgICAgIGNoaWxkLmFkZChlbnRyeUNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgaW4gcGFyZW50KSB7XG4gICAgICB2YXIgYXR0cnM7XG4gICAgICBpZiAocHJvdG8pIHtcbiAgICAgICAgYXR0cnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJzICYmIGF0dHJzLnNldCA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY2hpbGRbaV0gPSBfY2xvbmUocGFyZW50W2ldLCBkZXB0aCAtIDEpO1xuICAgIH1cblxuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBEb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IGNsb25pbmcgYSBzeW1ib2wgYmVjYXVzZSBpdCBpcyBhIHByaW1pdGl2ZSxcbiAgICAgICAgLy8gbGlrZSBhIG51bWJlciBvciBzdHJpbmcuXG4gICAgICAgIHZhciBzeW1ib2wgPSBzeW1ib2xzW2ldO1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocGFyZW50LCBzeW1ib2wpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiAhZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmICFpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkW3N5bWJvbF0gPSBfY2xvbmUocGFyZW50W3N5bWJvbF0sIGRlcHRoIC0gMSk7XG4gICAgICAgIGlmICghZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBzeW1ib2wsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgICAgIHZhciBhbGxQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsUHJvcGVydHlOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gYWxsUHJvcGVydHlOYW1lc1tpXTtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBhcmVudCwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGRbcHJvcGVydHlOYW1lXSA9IF9jbG9uZShwYXJlbnRbcHJvcGVydHlOYW1lXSwgZGVwdGggLSAxKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBwcm9wZXJ0eU5hbWUsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICByZXR1cm4gX2Nsb25lKHBhcmVudCwgZGVwdGgpO1xufVxuXG4vKipcbiAqIFNpbXBsZSBmbGF0IGNsb25lIHVzaW5nIHByb3RvdHlwZSwgYWNjZXB0cyBvbmx5IG9iamVjdHMsIHVzZWZ1bGwgZm9yIHByb3BlcnR5XG4gKiBvdmVycmlkZSBvbiBGTEFUIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChubyBuZXN0ZWQgcHJvcHMpLlxuICpcbiAqIFVTRSBXSVRIIENBVVRJT04hIFRoaXMgbWF5IG5vdCBiZWhhdmUgYXMgeW91IHdpc2ggaWYgeW91IGRvIG5vdCBrbm93IGhvdyB0aGlzXG4gKiB3b3Jrcy5cbiAqL1xuY2xvbmUuY2xvbmVQcm90b3R5cGUgPSBmdW5jdGlvbiBjbG9uZVByb3RvdHlwZShwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICByZXR1cm4gbnVsbDtcblxuICB2YXIgYyA9IGZ1bmN0aW9uICgpIHt9O1xuICBjLnByb3RvdHlwZSA9IHBhcmVudDtcbiAgcmV0dXJuIG5ldyBjKCk7XG59O1xuXG4vLyBwcml2YXRlIHV0aWxpdHkgZnVuY3Rpb25zXG5cbmZ1bmN0aW9uIF9fb2JqVG9TdHIobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuY2xvbmUuX19vYmpUb1N0ciA9IF9fb2JqVG9TdHI7XG5cbmZ1bmN0aW9uIF9faXNEYXRlKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5jbG9uZS5fX2lzRGF0ZSA9IF9faXNEYXRlO1xuXG5mdW5jdGlvbiBfX2lzQXJyYXkobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5jbG9uZS5fX2lzQXJyYXkgPSBfX2lzQXJyYXk7XG5cbmZ1bmN0aW9uIF9faXNSZWdFeHAobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuY2xvbmUuX19pc1JlZ0V4cCA9IF9faXNSZWdFeHA7XG5cbmZ1bmN0aW9uIF9fZ2V0UmVnRXhwRmxhZ3MocmUpIHtcbiAgdmFyIGZsYWdzID0gJyc7XG4gIGlmIChyZS5nbG9iYWwpIGZsYWdzICs9ICdnJztcbiAgaWYgKHJlLmlnbm9yZUNhc2UpIGZsYWdzICs9ICdpJztcbiAgaWYgKHJlLm11bHRpbGluZSkgZmxhZ3MgKz0gJ20nO1xuICByZXR1cm4gZmxhZ3M7XG59XG5jbG9uZS5fX2dldFJlZ0V4cEZsYWdzID0gX19nZXRSZWdFeHBGbGFncztcblxucmV0dXJuIGNsb25lO1xufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgY29tcGxleGl0eTogWzIsIDE4XSwgbWF4LXN0YXRlbWVudHM6IFsyLCAzM10gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJykgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdHZhciBvYmogPSB7fTtcblx0dmFyIHN5bSA9IFN5bWJvbCgndGVzdCcpO1xuXHR2YXIgc3ltT2JqID0gT2JqZWN0KHN5bSk7XG5cdGlmICh0eXBlb2Ygc3ltID09PSAnc3RyaW5nJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bU9iaikgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvb2JqZWN0LmFzc2lnbi9pc3N1ZXMvMTdcblx0Ly8gaWYgKHN5bSBpbnN0YW5jZW9mIFN5bWJvbCkgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzL2lzc3Vlcy80XG5cdC8vIGlmICghKHN5bU9iaiBpbnN0YW5jZW9mIFN5bWJvbCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gaWYgKHR5cGVvZiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyBpZiAoU3RyaW5nKHN5bSkgIT09IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1WYWwgPSA0Mjtcblx0b2JqW3N5bV0gPSBzeW1WYWw7XG5cdGZvciAoc3ltIGluIG9iaikgeyByZXR1cm4gZmFsc2U7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tdW5yZWFjaGFibGUtbG9vcFxuXHRpZiAodHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaik7XG5cdGlmIChzeW1zLmxlbmd0aCAhPT0gMSB8fCBzeW1zWzBdICE9PSBzeW0pIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHN5bSk7XG5cdFx0aWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IHN5bVZhbCB8fCBkZXNjcmlwdG9yLmVudW1lcmFibGUgIT09IHRydWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb3JpZ1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbDtcbnZhciBoYXNTeW1ib2xTaGFtID0gcmVxdWlyZSgnLi9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZVN5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCgnZm9vJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCgnYmFyJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHJldHVybiBoYXNTeW1ib2xTaGFtKCk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHRlc3QgPSB7XG5cdGZvbzoge31cbn07XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1Byb3RvKCkge1xuXHRyZXR1cm4geyBfX3Byb3RvX186IHRlc3QgfS5mb28gPT09IHRlc3QuZm9vICYmICEoeyBfX3Byb3RvX186IG51bGwgfSBpbnN0YW5jZW9mICRPYmplY3QpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBuby1pbnZhbGlkLXRoaXM6IDEgKi9cblxudmFyIEVSUk9SX01FU1NBR0UgPSAnRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSAnO1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmdW5jVHlwZSA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZCh0aGF0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbCh0YXJnZXQpICE9PSBmdW5jVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEVSUk9SX01FU1NBR0UgKyB0YXJnZXQpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIHZhciBib3VuZDtcbiAgICB2YXIgYmluZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGF0LFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJvdW5kTGVuZ3RoID0gTWF0aC5tYXgoMCwgdGFyZ2V0Lmxlbmd0aCAtIGFyZ3MubGVuZ3RoKTtcbiAgICB2YXIgYm91bmRBcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3VuZExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvdW5kQXJncy5wdXNoKCckJyArIGkpO1xuICAgIH1cblxuICAgIGJvdW5kID0gRnVuY3Rpb24oJ2JpbmRlcicsICdyZXR1cm4gZnVuY3Rpb24gKCcgKyBib3VuZEFyZ3Muam9pbignLCcpICsgJyl7IHJldHVybiBiaW5kZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpOyB9JykoYmluZGVyKTtcblxuICAgIGlmICh0YXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgIHZhciBFbXB0eSA9IGZ1bmN0aW9uIEVtcHR5KCkge307XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG4gICAgICAgIGJvdW5kLnByb3RvdHlwZSA9IG5ldyBFbXB0eSgpO1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgaW1wbGVtZW50YXRpb247XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdW5kZWZpbmVkO1xuXG52YXIgJFN5bnRheEVycm9yID0gU3ludGF4RXJyb3I7XG52YXIgJEZ1bmN0aW9uID0gRnVuY3Rpb247XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG52YXIgZ2V0RXZhbGxlZENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGV4cHJlc3Npb25TeW50YXgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gJEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjsgcmV0dXJuICgnICsgZXhwcmVzc2lvblN5bnRheCArICcpLmNvbnN0cnVjdG9yOycpKCk7XG5cdH0gY2F0Y2ggKGUpIHt9XG59O1xuXG52YXIgJGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoe30sICcnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdCRnT1BEID0gbnVsbDsgLy8gdGhpcyBpcyBJRSA4LCB3aGljaCBoYXMgYSBicm9rZW4gZ09QRFxuXHR9XG59XG5cbnZhciB0aHJvd1R5cGVFcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoKTtcbn07XG52YXIgVGhyb3dUeXBlRXJyb3IgPSAkZ09QRFxuXHQ/IChmdW5jdGlvbiAoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLWNhbGxlciwgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG5cdFx0XHRhcmd1bWVudHMuY2FsbGVlOyAvLyBJRSA4IGRvZXMgbm90IHRocm93IGhlcmVcblx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHR9IGNhdGNoIChjYWxsZWVUaHJvd3MpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElFIDggdGhyb3dzIG9uIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXJndW1lbnRzLCAnJylcblx0XHRcdFx0cmV0dXJuICRnT1BEKGFyZ3VtZW50cywgJ2NhbGxlZScpLmdldDtcblx0XHRcdH0gY2F0Y2ggKGdPUER0aHJvd3MpIHtcblx0XHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fSgpKVxuXHQ6IHRocm93VHlwZUVycm9yO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcbnZhciBoYXNQcm90byA9IHJlcXVpcmUoJ2hhcy1wcm90bycpKCk7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCAoXG5cdGhhc1Byb3RvXG5cdFx0PyBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5fX3Byb3RvX187IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuXHRcdDogbnVsbFxuKTtcblxudmFyIG5lZWRzRXZhbCA9IHt9O1xuXG52YXIgVHlwZWRBcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyB8fCAhZ2V0UHJvdG8gPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCclQWdncmVnYXRlRXJyb3IlJzogdHlwZW9mIEFnZ3JlZ2F0ZUVycm9yID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFnZ3JlZ2F0ZUVycm9yLFxuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgJiYgZ2V0UHJvdG8gPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogbmVlZHNFdmFsLFxuXHQnJUF0b21pY3MlJzogdHlwZW9mIEF0b21pY3MgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXRvbWljcyxcblx0JyVCaWdJbnQlJzogdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQsXG5cdCclQmlnSW50NjRBcnJheSUnOiB0eXBlb2YgQmlnSW50NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQ2NEFycmF5LFxuXHQnJUJpZ1VpbnQ2NEFycmF5JSc6IHR5cGVvZiBCaWdVaW50NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdVaW50NjRBcnJheSxcblx0JyVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGUlJzogRGF0ZSxcblx0JyVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCclZW5jb2RlVVJJJSc6IGVuY29kZVVSSSxcblx0JyVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJUVycm9yJSc6IEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgJiYgZ2V0UHJvdG8gPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzIHx8ICFnZXRQcm90byA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBNYXAoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJU1hdGglJzogTWF0aCxcblx0JyVOdW1iZXIlJzogTnVtYmVyLFxuXHQnJU9iamVjdCUnOiBPYmplY3QsXG5cdCclcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJXBhcnNlSW50JSc6IHBhcnNlSW50LFxuXHQnJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCclUmFuZ2VFcnJvciUnOiBSYW5nZUVycm9yLFxuXHQnJVJlZmVyZW5jZUVycm9yJSc6IFJlZmVyZW5jZUVycm9yLFxuXHQnJVJlZmxlY3QlJzogdHlwZW9mIFJlZmxlY3QgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUmVmbGVjdCxcblx0JyVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJVNldCUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldCxcblx0JyVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyB8fCAhZ2V0UHJvdG8gPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgU2V0KClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlciUnOiB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2hhcmVkQXJyYXlCdWZmZXIsXG5cdCclU3RyaW5nJSc6IFN0cmluZyxcblx0JyVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzICYmIGdldFByb3RvID8gZ2V0UHJvdG8oJydbU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVTeW1ib2wlJzogaGFzU3ltYm9scyA/IFN5bWJvbCA6IHVuZGVmaW5lZCxcblx0JyVTeW50YXhFcnJvciUnOiAkU3ludGF4RXJyb3IsXG5cdCclVGhyb3dUeXBlRXJyb3IlJzogVGhyb3dUeXBlRXJyb3IsXG5cdCclVHlwZWRBcnJheSUnOiBUeXBlZEFycmF5LFxuXHQnJVR5cGVFcnJvciUnOiAkVHlwZUVycm9yLFxuXHQnJVVpbnQ4QXJyYXklJzogdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhBcnJheSxcblx0JyVVaW50OENsYW1wZWRBcnJheSUnOiB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhDbGFtcGVkQXJyYXksXG5cdCclVWludDE2QXJyYXklJzogdHlwZW9mIFVpbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQxNkFycmF5LFxuXHQnJVVpbnQzMkFycmF5JSc6IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MzJBcnJheSxcblx0JyVVUklFcnJvciUnOiBVUklFcnJvcixcblx0JyVXZWFrTWFwJSc6IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtNYXAsXG5cdCclV2Vha1JlZiUnOiB0eXBlb2YgV2Vha1JlZiA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrUmVmLFxuXHQnJVdlYWtTZXQlJzogdHlwZW9mIFdlYWtTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1NldFxufTtcblxuaWYgKGdldFByb3RvKSB7XG5cdHRyeSB7XG5cdFx0bnVsbC5lcnJvcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXNoYWRvd3JlYWxtL3B1bGwvMzg0I2lzc3VlY29tbWVudC0xMzY0MjY0MjI5XG5cdFx0dmFyIGVycm9yUHJvdG8gPSBnZXRQcm90byhnZXRQcm90byhlKSk7XG5cdFx0SU5UUklOU0lDU1snJUVycm9yLnByb3RvdHlwZSUnXSA9IGVycm9yUHJvdG87XG5cdH1cbn1cblxudmFyIGRvRXZhbCA9IGZ1bmN0aW9uIGRvRXZhbChuYW1lKSB7XG5cdHZhciB2YWx1ZTtcblx0aWYgKG5hbWUgPT09ICclQXN5bmNGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2Z1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3IlJykge1xuXHRcdHZhciBmbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJyk7XG5cdFx0aWYgKGZuKSB7XG5cdFx0XHR2YWx1ZSA9IGZuLnByb3RvdHlwZTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJScpIHtcblx0XHR2YXIgZ2VuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3IlJyk7XG5cdFx0aWYgKGdlbiAmJiBnZXRQcm90bykge1xuXHRcdFx0dmFsdWUgPSBnZXRQcm90byhnZW4ucHJvdG90eXBlKTtcblx0XHR9XG5cdH1cblxuXHRJTlRSSU5TSUNTW25hbWVdID0gdmFsdWU7XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxudmFyIExFR0FDWV9BTElBU0VTID0ge1xuXHQnJUFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b3R5cGUlJzogWydBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvX2VudHJpZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZW50cmllcyddLFxuXHQnJUFycmF5UHJvdG9fZm9yRWFjaCUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdmb3JFYWNoJ10sXG5cdCclQXJyYXlQcm90b19rZXlzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2tleXMnXSxcblx0JyVBcnJheVByb3RvX3ZhbHVlcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICd2YWx1ZXMnXSxcblx0JyVBc3luY0Z1bmN0aW9uUHJvdG90eXBlJSc6IFsnQXN5bmNGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3JQcm90b3R5cGUlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVCb29sZWFuUHJvdG90eXBlJSc6IFsnQm9vbGVhbicsICdwcm90b3R5cGUnXSxcblx0JyVEYXRhVmlld1Byb3RvdHlwZSUnOiBbJ0RhdGFWaWV3JywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGVQcm90b3R5cGUlJzogWydEYXRlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUVycm9yUHJvdG90eXBlJSc6IFsnRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRXZhbEVycm9yUHJvdG90eXBlJSc6IFsnRXZhbEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0MzJBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDY0QXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDY0QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRnVuY3Rpb25Qcm90b3R5cGUlJzogWydGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3IlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3JQcm90b3R5cGUlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclSW50OEFycmF5UHJvdG90eXBlJSc6IFsnSW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDE2QXJyYXlQcm90b3R5cGUlJzogWydJbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDMyQXJyYXlQcm90b3R5cGUlJzogWydJbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUpTT05QYXJzZSUnOiBbJ0pTT04nLCAncGFyc2UnXSxcblx0JyVKU09OU3RyaW5naWZ5JSc6IFsnSlNPTicsICdzdHJpbmdpZnknXSxcblx0JyVNYXBQcm90b3R5cGUlJzogWydNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclTnVtYmVyUHJvdG90eXBlJSc6IFsnTnVtYmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJU9iamVjdFByb3RvdHlwZSUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnXSxcblx0JyVPYmpQcm90b190b1N0cmluZyUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndG9TdHJpbmcnXSxcblx0JyVPYmpQcm90b192YWx1ZU9mJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd2YWx1ZU9mJ10sXG5cdCclUHJvbWlzZVByb3RvdHlwZSUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJ10sXG5cdCclUHJvbWlzZVByb3RvX3RoZW4lJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZScsICd0aGVuJ10sXG5cdCclUHJvbWlzZV9hbGwlJzogWydQcm9taXNlJywgJ2FsbCddLFxuXHQnJVByb21pc2VfcmVqZWN0JSc6IFsnUHJvbWlzZScsICdyZWplY3QnXSxcblx0JyVQcm9taXNlX3Jlc29sdmUlJzogWydQcm9taXNlJywgJ3Jlc29sdmUnXSxcblx0JyVSYW5nZUVycm9yUHJvdG90eXBlJSc6IFsnUmFuZ2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWZlcmVuY2VFcnJvclByb3RvdHlwZSUnOiBbJ1JlZmVyZW5jZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZ0V4cFByb3RvdHlwZSUnOiBbJ1JlZ0V4cCcsICdwcm90b3R5cGUnXSxcblx0JyVTZXRQcm90b3R5cGUlJzogWydTZXQnLCAncHJvdG90eXBlJ10sXG5cdCclU2hhcmVkQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydTaGFyZWRBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVTdHJpbmdQcm90b3R5cGUlJzogWydTdHJpbmcnLCAncHJvdG90eXBlJ10sXG5cdCclU3ltYm9sUHJvdG90eXBlJSc6IFsnU3ltYm9sJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bnRheEVycm9yUHJvdG90eXBlJSc6IFsnU3ludGF4RXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZWRBcnJheVByb3RvdHlwZSUnOiBbJ1R5cGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZUVycm9yUHJvdG90eXBlJSc6IFsnVHlwZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4QXJyYXlQcm90b3R5cGUlJzogWydVaW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhDbGFtcGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDE2QXJyYXlQcm90b3R5cGUlJzogWydVaW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVSSUVycm9yUHJvdG90eXBlJSc6IFsnVVJJRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha01hcFByb3RvdHlwZSUnOiBbJ1dlYWtNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha1NldFByb3RvdHlwZSUnOiBbJ1dlYWtTZXQnLCAncHJvdG90eXBlJ11cbn07XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJ2hhcycpO1xudmFyICRjb25jYXQgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgQXJyYXkucHJvdG90eXBlLmNvbmNhdCk7XG52YXIgJHNwbGljZUFwcGx5ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmFwcGx5LCBBcnJheS5wcm90b3R5cGUuc3BsaWNlKTtcbnZhciAkcmVwbGFjZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xudmFyICRzdHJTbGljZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnNsaWNlKTtcbnZhciAkZXhlYyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBSZWdFeHAucHJvdG90eXBlLmV4ZWMpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciBmaXJzdCA9ICRzdHJTbGljZShzdHJpbmcsIDAsIDEpO1xuXHR2YXIgbGFzdCA9ICRzdHJTbGljZShzdHJpbmcsIC0xKTtcblx0aWYgKGZpcnN0ID09PSAnJScgJiYgbGFzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBjbG9zaW5nIGAlYCcpO1xuXHR9IGVsc2UgaWYgKGxhc3QgPT09ICclJyAmJiBmaXJzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBvcGVuaW5nIGAlYCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogbnVtYmVyIHx8IG1hdGNoO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4vKiBlbmQgYWRhcHRhdGlvbiAqL1xuXG52YXIgZ2V0QmFzZUludHJpbnNpYyA9IGZ1bmN0aW9uIGdldEJhc2VJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWNOYW1lID0gbmFtZTtcblx0dmFyIGFsaWFzO1xuXHRpZiAoaGFzT3duKExFR0FDWV9BTElBU0VTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdGFsaWFzID0gTEVHQUNZX0FMSUFTRVNbaW50cmluc2ljTmFtZV07XG5cdFx0aW50cmluc2ljTmFtZSA9ICclJyArIGFsaWFzWzBdICsgJyUnO1xuXHR9XG5cblx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdHZhciB2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljTmFtZV07XG5cdFx0aWYgKHZhbHVlID09PSBuZWVkc0V2YWwpIHtcblx0XHRcdHZhbHVlID0gZG9FdmFsKGludHJpbnNpY05hbWUpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJiAhYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSEnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0YWxpYXM6IGFsaWFzLFxuXHRcdFx0bmFtZTogaW50cmluc2ljTmFtZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHZXRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdGlmICgkZXhlYygvXiU/W14lXSolPyQvLCBuYW1lKSA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2AlYCBtYXkgbm90IGJlIHByZXNlbnQgYW55d2hlcmUgYnV0IGF0IHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiB0aGUgaW50cmluc2ljIG5hbWUnKTtcblx0fVxuXHR2YXIgcGFydHMgPSBzdHJpbmdUb1BhdGgobmFtZSk7XG5cdHZhciBpbnRyaW5zaWNCYXNlTmFtZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0c1swXSA6ICcnO1xuXG5cdHZhciBpbnRyaW5zaWMgPSBnZXRCYXNlSW50cmluc2ljKCclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnLCBhbGxvd01pc3NpbmcpO1xuXHR2YXIgaW50cmluc2ljUmVhbE5hbWUgPSBpbnRyaW5zaWMubmFtZTtcblx0dmFyIHZhbHVlID0gaW50cmluc2ljLnZhbHVlO1xuXHR2YXIgc2tpcEZ1cnRoZXJDYWNoaW5nID0gZmFsc2U7XG5cblx0dmFyIGFsaWFzID0gaW50cmluc2ljLmFsaWFzO1xuXHRpZiAoYWxpYXMpIHtcblx0XHRpbnRyaW5zaWNCYXNlTmFtZSA9IGFsaWFzWzBdO1xuXHRcdCRzcGxpY2VBcHBseShwYXJ0cywgJGNvbmNhdChbMCwgMV0sIGFsaWFzKSk7XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMSwgaXNPd24gPSB0cnVlOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHR2YXIgcGFydCA9IHBhcnRzW2ldO1xuXHRcdHZhciBmaXJzdCA9ICRzdHJTbGljZShwYXJ0LCAwLCAxKTtcblx0XHR2YXIgbGFzdCA9ICRzdHJTbGljZShwYXJ0LCAtMSk7XG5cdFx0aWYgKFxuXHRcdFx0KFxuXHRcdFx0XHQoZmlyc3QgPT09ICdcIicgfHwgZmlyc3QgPT09IFwiJ1wiIHx8IGZpcnN0ID09PSAnYCcpXG5cdFx0XHRcdHx8IChsYXN0ID09PSAnXCInIHx8IGxhc3QgPT09IFwiJ1wiIHx8IGxhc3QgPT09ICdgJylcblx0XHRcdClcblx0XHRcdCYmIGZpcnN0ICE9PSBsYXN0XG5cdFx0KSB7XG5cdFx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdwcm9wZXJ0eSBuYW1lcyB3aXRoIHF1b3RlcyBtdXN0IGhhdmUgbWF0Y2hpbmcgcXVvdGVzJyk7XG5cdFx0fVxuXHRcdGlmIChwYXJ0ID09PSAnY29uc3RydWN0b3InIHx8ICFpc093bikge1xuXHRcdFx0c2tpcEZ1cnRoZXJDYWNoaW5nID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbnRyaW5zaWNCYXNlTmFtZSArPSAnLicgKyBwYXJ0O1xuXHRcdGludHJpbnNpY1JlYWxOYW1lID0gJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJSc7XG5cblx0XHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY1JlYWxOYW1lKSkge1xuXHRcdFx0dmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0XHRcdGlmICghKHBhcnQgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdGlmICghYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Jhc2UgaW50cmluc2ljIGZvciAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgdGhlIHByb3BlcnR5IGlzIG5vdCBhdmFpbGFibGUuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZvaWQgdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCRnT1BEICYmIChpICsgMSkgPj0gcGFydHMubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBkZXNjID0gJGdPUEQodmFsdWUsIHBhcnQpO1xuXHRcdFx0XHRpc093biA9ICEhZGVzYztcblxuXHRcdFx0XHQvLyBCeSBjb252ZW50aW9uLCB3aGVuIGEgZGF0YSBwcm9wZXJ0eSBpcyBjb252ZXJ0ZWQgdG8gYW4gYWNjZXNzb3Jcblx0XHRcdFx0Ly8gcHJvcGVydHkgdG8gZW11bGF0ZSBhIGRhdGEgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBzdWZmZXIgZnJvbVxuXHRcdFx0XHQvLyB0aGUgb3ZlcnJpZGUgbWlzdGFrZSwgdGhhdCBhY2Nlc3NvcidzIGdldHRlciBpcyBtYXJrZWQgd2l0aFxuXHRcdFx0XHQvLyBhbiBgb3JpZ2luYWxWYWx1ZWAgcHJvcGVydHkuIEhlcmUsIHdoZW4gd2UgZGV0ZWN0IHRoaXMsIHdlXG5cdFx0XHRcdC8vIHVwaG9sZCB0aGUgaWxsdXNpb24gYnkgcHJldGVuZGluZyB0byBzZWUgdGhhdCBvcmlnaW5hbCBkYXRhXG5cdFx0XHRcdC8vIHByb3BlcnR5LCBpLmUuLCByZXR1cm5pbmcgdGhlIHZhbHVlIHJhdGhlciB0aGFuIHRoZSBnZXR0ZXJcblx0XHRcdFx0Ly8gaXRzZWxmLlxuXHRcdFx0XHRpZiAoaXNPd24gJiYgJ2dldCcgaW4gZGVzYyAmJiAhKCdvcmlnaW5hbFZhbHVlJyBpbiBkZXNjLmdldCkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlc2MuZ2V0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzT3duID0gaGFzT3duKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzT3duICYmICFza2lwRnVydGhlckNhY2hpbmcpIHtcblx0XHRcdFx0SU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRnT1BEID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnLCB0cnVlKTtcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSk7XG52YXIgJG1heCA9IEdldEludHJpbnNpYygnJU1hdGgubWF4JScpO1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZChvcmlnaW5hbEZ1bmN0aW9uKSB7XG5cdHZhciBmdW5jID0gJHJlZmxlY3RBcHBseShiaW5kLCAkY2FsbCwgYXJndW1lbnRzKTtcblx0aWYgKCRnT1BEICYmICRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdHZhciBkZXNjID0gJGdPUEQoZnVuYywgJ2xlbmd0aCcpO1xuXHRcdGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0Ly8gb3JpZ2luYWwgbGVuZ3RoLCBwbHVzIHRoZSByZWNlaXZlciwgbWludXMgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIChhZnRlciB0aGUgcmVjZWl2ZXIpXG5cdFx0XHQkZGVmaW5lUHJvcGVydHkoXG5cdFx0XHRcdGZ1bmMsXG5cdFx0XHRcdCdsZW5ndGgnLFxuXHRcdFx0XHR7IHZhbHVlOiAxICsgJG1heCgwLCBvcmlnaW5hbEZ1bmN0aW9uLmxlbmd0aCAtIChhcmd1bWVudHMubGVuZ3RoIC0gMSkpIH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmdW5jO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwgIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgndXRpbCcpLmluc3BlY3Q7XG4iLCAidmFyIGhhc01hcCA9IHR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgTWFwLnByb3RvdHlwZTtcbnZhciBtYXBTaXplRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgaGFzTWFwID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihNYXAucHJvdG90eXBlLCAnc2l6ZScpIDogbnVsbDtcbnZhciBtYXBTaXplID0gaGFzTWFwICYmIG1hcFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBtYXBTaXplRGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicgPyBtYXBTaXplRGVzY3JpcHRvci5nZXQgOiBudWxsO1xudmFyIG1hcEZvckVhY2ggPSBoYXNNYXAgJiYgTWFwLnByb3RvdHlwZS5mb3JFYWNoO1xudmFyIGhhc1NldCA9IHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgU2V0LnByb3RvdHlwZTtcbnZhciBzZXRTaXplRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgaGFzU2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihTZXQucHJvdG90eXBlLCAnc2l6ZScpIDogbnVsbDtcbnZhciBzZXRTaXplID0gaGFzU2V0ICYmIHNldFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBzZXRTaXplRGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicgPyBzZXRTaXplRGVzY3JpcHRvci5nZXQgOiBudWxsO1xudmFyIHNldEZvckVhY2ggPSBoYXNTZXQgJiYgU2V0LnByb3RvdHlwZS5mb3JFYWNoO1xudmFyIGhhc1dlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrTWFwLnByb3RvdHlwZTtcbnZhciB3ZWFrTWFwSGFzID0gaGFzV2Vha01hcCA/IFdlYWtNYXAucHJvdG90eXBlLmhhcyA6IG51bGw7XG52YXIgaGFzV2Vha1NldCA9IHR5cGVvZiBXZWFrU2V0ID09PSAnZnVuY3Rpb24nICYmIFdlYWtTZXQucHJvdG90eXBlO1xudmFyIHdlYWtTZXRIYXMgPSBoYXNXZWFrU2V0ID8gV2Vha1NldC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbnZhciBoYXNXZWFrUmVmID0gdHlwZW9mIFdlYWtSZWYgPT09ICdmdW5jdGlvbicgJiYgV2Vha1JlZi5wcm90b3R5cGU7XG52YXIgd2Vha1JlZkRlcmVmID0gaGFzV2Vha1JlZiA/IFdlYWtSZWYucHJvdG90eXBlLmRlcmVmIDogbnVsbDtcbnZhciBib29sZWFuVmFsdWVPZiA9IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2Y7XG52YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgJG1hdGNoID0gU3RyaW5nLnByb3RvdHlwZS5tYXRjaDtcbnZhciAkc2xpY2UgPSBTdHJpbmcucHJvdG90eXBlLnNsaWNlO1xudmFyICRyZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyICR0b1VwcGVyQ2FzZSA9IFN0cmluZy5wcm90b3R5cGUudG9VcHBlckNhc2U7XG52YXIgJHRvTG93ZXJDYXNlID0gU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZTtcbnZhciAkdGVzdCA9IFJlZ0V4cC5wcm90b3R5cGUudGVzdDtcbnZhciAkY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbnZhciAkam9pbiA9IEFycmF5LnByb3RvdHlwZS5qb2luO1xudmFyICRhcnJTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciAkZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIGJpZ0ludFZhbHVlT2YgPSB0eXBlb2YgQmlnSW50ID09PSAnZnVuY3Rpb24nID8gQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mIDogbnVsbDtcbnZhciBnT1BTID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBzeW1Ub1N0cmluZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcgPyBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nIDogbnVsbDtcbnZhciBoYXNTaGFtbWVkU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ29iamVjdCc7XG4vLyBpZSwgYGhhcy10b3N0cmluZ3RhZy9zaGFtc1xudmFyIHRvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcgJiYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09IGhhc1NoYW1tZWRTeW1ib2xzID8gJ29iamVjdCcgOiAnc3ltYm9sJylcbiAgICA/IFN5bWJvbC50b1N0cmluZ1RhZ1xuICAgIDogbnVsbDtcbnZhciBpc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG52YXIgZ1BPID0gKHR5cGVvZiBSZWZsZWN0ID09PSAnZnVuY3Rpb24nID8gUmVmbGVjdC5nZXRQcm90b3R5cGVPZiA6IE9iamVjdC5nZXRQcm90b3R5cGVPZikgfHwgKFxuICAgIFtdLl9fcHJvdG9fXyA9PT0gQXJyYXkucHJvdG90eXBlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cbiAgICAgICAgPyBmdW5jdGlvbiAoTykge1xuICAgICAgICAgICAgcmV0dXJuIE8uX19wcm90b19fOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG4gICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4pO1xuXG5mdW5jdGlvbiBhZGROdW1lcmljU2VwYXJhdG9yKG51bSwgc3RyKSB7XG4gICAgaWYgKFxuICAgICAgICBudW0gPT09IEluZmluaXR5XG4gICAgICAgIHx8IG51bSA9PT0gLUluZmluaXR5XG4gICAgICAgIHx8IG51bSAhPT0gbnVtXG4gICAgICAgIHx8IChudW0gJiYgbnVtID4gLTEwMDAgJiYgbnVtIDwgMTAwMClcbiAgICAgICAgfHwgJHRlc3QuY2FsbCgvZS8sIHN0cilcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgdmFyIHNlcFJlZ2V4ID0gL1swLTldKD89KD86WzAtOV17M30pKyg/IVswLTldKSkvZztcbiAgICBpZiAodHlwZW9mIG51bSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdmFyIGludCA9IG51bSA8IDAgPyAtJGZsb29yKC1udW0pIDogJGZsb29yKG51bSk7IC8vIHRydW5jKG51bSlcbiAgICAgICAgaWYgKGludCAhPT0gbnVtKSB7XG4gICAgICAgICAgICB2YXIgaW50U3RyID0gU3RyaW5nKGludCk7XG4gICAgICAgICAgICB2YXIgZGVjID0gJHNsaWNlLmNhbGwoc3RyLCBpbnRTdHIubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChpbnRTdHIsIHNlcFJlZ2V4LCAnJCZfJykgKyAnLicgKyAkcmVwbGFjZS5jYWxsKCRyZXBsYWNlLmNhbGwoZGVjLCAvKFswLTldezN9KS9nLCAnJCZfJyksIC9fJC8sICcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChzdHIsIHNlcFJlZ2V4LCAnJCZfJyk7XG59XG5cbnZhciB1dGlsSW5zcGVjdCA9IHJlcXVpcmUoJy4vdXRpbC5pbnNwZWN0Jyk7XG52YXIgaW5zcGVjdEN1c3RvbSA9IHV0aWxJbnNwZWN0LmN1c3RvbTtcbnZhciBpbnNwZWN0U3ltYm9sID0gaXNTeW1ib2woaW5zcGVjdEN1c3RvbSkgPyBpbnNwZWN0Q3VzdG9tIDogbnVsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnNwZWN0XyhvYmosIG9wdGlvbnMsIGRlcHRoLCBzZWVuKSB7XG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKGhhcyhvcHRzLCAncXVvdGVTdHlsZScpICYmIChvcHRzLnF1b3RlU3R5bGUgIT09ICdzaW5nbGUnICYmIG9wdHMucXVvdGVTdHlsZSAhPT0gJ2RvdWJsZScpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcInF1b3RlU3R5bGVcIiBtdXN0IGJlIFwic2luZ2xlXCIgb3IgXCJkb3VibGVcIicpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAgIGhhcyhvcHRzLCAnbWF4U3RyaW5nTGVuZ3RoJykgJiYgKHR5cGVvZiBvcHRzLm1heFN0cmluZ0xlbmd0aCA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8gb3B0cy5tYXhTdHJpbmdMZW5ndGggPCAwICYmIG9wdHMubWF4U3RyaW5nTGVuZ3RoICE9PSBJbmZpbml0eVxuICAgICAgICAgICAgOiBvcHRzLm1heFN0cmluZ0xlbmd0aCAhPT0gbnVsbFxuICAgICAgICApXG4gICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcIm1heFN0cmluZ0xlbmd0aFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIEluZmluaXR5LCBvciBgbnVsbGAnKTtcbiAgICB9XG4gICAgdmFyIGN1c3RvbUluc3BlY3QgPSBoYXMob3B0cywgJ2N1c3RvbUluc3BlY3QnKSA/IG9wdHMuY3VzdG9tSW5zcGVjdCA6IHRydWU7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21JbnNwZWN0ICE9PSAnYm9vbGVhbicgJiYgY3VzdG9tSW5zcGVjdCAhPT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwiY3VzdG9tSW5zcGVjdFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBgdHJ1ZWAsIGBmYWxzZWAsIG9yIGBcXCdzeW1ib2xcXCdgJyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICBoYXMob3B0cywgJ2luZGVudCcpXG4gICAgICAgICYmIG9wdHMuaW5kZW50ICE9PSBudWxsXG4gICAgICAgICYmIG9wdHMuaW5kZW50ICE9PSAnXFx0J1xuICAgICAgICAmJiAhKHBhcnNlSW50KG9wdHMuaW5kZW50LCAxMCkgPT09IG9wdHMuaW5kZW50ICYmIG9wdHMuaW5kZW50ID4gMClcbiAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwiaW5kZW50XCIgbXVzdCBiZSBcIlxcXFx0XCIsIGFuIGludGVnZXIgPiAwLCBvciBgbnVsbGAnKTtcbiAgICB9XG4gICAgaWYgKGhhcyhvcHRzLCAnbnVtZXJpY1NlcGFyYXRvcicpICYmIHR5cGVvZiBvcHRzLm51bWVyaWNTZXBhcmF0b3IgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJudW1lcmljU2VwYXJhdG9yXCIsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGB0cnVlYCBvciBgZmFsc2VgJyk7XG4gICAgfVxuICAgIHZhciBudW1lcmljU2VwYXJhdG9yID0gb3B0cy5udW1lcmljU2VwYXJhdG9yO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICB9XG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiBvYmogPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gaW5zcGVjdFN0cmluZyhvYmosIG9wdHMpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5IC8gb2JqID4gMCA/ICcwJyA6ICctMCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0ciA9IFN0cmluZyhvYmopO1xuICAgICAgICByZXR1cm4gbnVtZXJpY1NlcGFyYXRvciA/IGFkZE51bWVyaWNTZXBhcmF0b3Iob2JqLCBzdHIpIDogc3RyO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2JpZ2ludCcpIHtcbiAgICAgICAgdmFyIGJpZ0ludFN0ciA9IFN0cmluZyhvYmopICsgJ24nO1xuICAgICAgICByZXR1cm4gbnVtZXJpY1NlcGFyYXRvciA/IGFkZE51bWVyaWNTZXBhcmF0b3Iob2JqLCBiaWdJbnRTdHIpIDogYmlnSW50U3RyO1xuICAgIH1cblxuICAgIHZhciBtYXhEZXB0aCA9IHR5cGVvZiBvcHRzLmRlcHRoID09PSAndW5kZWZpbmVkJyA/IDUgOiBvcHRzLmRlcHRoO1xuICAgIGlmICh0eXBlb2YgZGVwdGggPT09ICd1bmRlZmluZWQnKSB7IGRlcHRoID0gMDsgfVxuICAgIGlmIChkZXB0aCA+PSBtYXhEZXB0aCAmJiBtYXhEZXB0aCA+IDAgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdbQXJyYXldJyA6ICdbT2JqZWN0XSc7XG4gICAgfVxuXG4gICAgdmFyIGluZGVudCA9IGdldEluZGVudChvcHRzLCBkZXB0aCk7XG5cbiAgICBpZiAodHlwZW9mIHNlZW4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNlZW4gPSBbXTtcbiAgICB9IGVsc2UgaWYgKGluZGV4T2Yoc2Vlbiwgb2JqKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zcGVjdCh2YWx1ZSwgZnJvbSwgbm9JbmRlbnQpIHtcbiAgICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgICAgIHNlZW4gPSAkYXJyU2xpY2UuY2FsbChzZWVuKTtcbiAgICAgICAgICAgIHNlZW4ucHVzaChmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9JbmRlbnQpIHtcbiAgICAgICAgICAgIHZhciBuZXdPcHRzID0ge1xuICAgICAgICAgICAgICAgIGRlcHRoOiBvcHRzLmRlcHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGhhcyhvcHRzLCAncXVvdGVTdHlsZScpKSB7XG4gICAgICAgICAgICAgICAgbmV3T3B0cy5xdW90ZVN0eWxlID0gb3B0cy5xdW90ZVN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluc3BlY3RfKHZhbHVlLCBuZXdPcHRzLCBkZXB0aCArIDEsIHNlZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnNwZWN0Xyh2YWx1ZSwgb3B0cywgZGVwdGggKyAxLCBzZWVuKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJyAmJiAhaXNSZWdFeHAob2JqKSkgeyAvLyBpbiBvbGRlciBlbmdpbmVzLCByZWdleGVzIGFyZSBjYWxsYWJsZVxuICAgICAgICB2YXIgbmFtZSA9IG5hbWVPZihvYmopO1xuICAgICAgICB2YXIga2V5cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0KTtcbiAgICAgICAgcmV0dXJuICdbRnVuY3Rpb24nICsgKG5hbWUgPyAnOiAnICsgbmFtZSA6ICcgKGFub255bW91cyknKSArICddJyArIChrZXlzLmxlbmd0aCA+IDAgPyAnIHsgJyArICRqb2luLmNhbGwoa2V5cywgJywgJykgKyAnIH0nIDogJycpO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wob2JqKSkge1xuICAgICAgICB2YXIgc3ltU3RyaW5nID0gaGFzU2hhbW1lZFN5bWJvbHMgPyAkcmVwbGFjZS5jYWxsKFN0cmluZyhvYmopLCAvXihTeW1ib2xcXCguKlxcKSlfW14pXSokLywgJyQxJykgOiBzeW1Ub1N0cmluZy5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhaGFzU2hhbW1lZFN5bWJvbHMgPyBtYXJrQm94ZWQoc3ltU3RyaW5nKSA6IHN5bVN0cmluZztcbiAgICB9XG4gICAgaWYgKGlzRWxlbWVudChvYmopKSB7XG4gICAgICAgIHZhciBzID0gJzwnICsgJHRvTG93ZXJDYXNlLmNhbGwoU3RyaW5nKG9iai5ub2RlTmFtZSkpO1xuICAgICAgICB2YXIgYXR0cnMgPSBvYmouYXR0cmlidXRlcyB8fCBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcyArPSAnICcgKyBhdHRyc1tpXS5uYW1lICsgJz0nICsgd3JhcFF1b3RlcyhxdW90ZShhdHRyc1tpXS52YWx1ZSksICdkb3VibGUnLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBzICs9ICc+JztcbiAgICAgICAgaWYgKG9iai5jaGlsZE5vZGVzICYmIG9iai5jaGlsZE5vZGVzLmxlbmd0aCkgeyBzICs9ICcuLi4nOyB9XG4gICAgICAgIHMgKz0gJzwvJyArICR0b0xvd2VyQ2FzZS5jYWxsKFN0cmluZyhvYmoubm9kZU5hbWUpKSArICc+JztcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgaWYgKG9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuICdbXSc7IH1cbiAgICAgICAgdmFyIHhzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICBpZiAoaW5kZW50ICYmICFzaW5nbGVMaW5lVmFsdWVzKHhzKSkge1xuICAgICAgICAgICAgcmV0dXJuICdbJyArIGluZGVudGVkSm9pbih4cywgaW5kZW50KSArICddJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ1sgJyArICRqb2luLmNhbGwoeHMsICcsICcpICsgJyBdJztcbiAgICB9XG4gICAgaWYgKGlzRXJyb3Iob2JqKSkge1xuICAgICAgICB2YXIgcGFydHMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIGlmICghKCdjYXVzZScgaW4gRXJyb3IucHJvdG90eXBlKSAmJiAnY2F1c2UnIGluIG9iaiAmJiAhaXNFbnVtZXJhYmxlLmNhbGwob2JqLCAnY2F1c2UnKSkge1xuICAgICAgICAgICAgcmV0dXJuICd7IFsnICsgU3RyaW5nKG9iaikgKyAnXSAnICsgJGpvaW4uY2FsbCgkY29uY2F0LmNhbGwoJ1tjYXVzZV06ICcgKyBpbnNwZWN0KG9iai5jYXVzZSksIHBhcnRzKSwgJywgJykgKyAnIH0nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHsgcmV0dXJuICdbJyArIFN0cmluZyhvYmopICsgJ10nOyB9XG4gICAgICAgIHJldHVybiAneyBbJyArIFN0cmluZyhvYmopICsgJ10gJyArICRqb2luLmNhbGwocGFydHMsICcsICcpICsgJyB9JztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIGN1c3RvbUluc3BlY3QpIHtcbiAgICAgICAgaWYgKGluc3BlY3RTeW1ib2wgJiYgdHlwZW9mIG9ialtpbnNwZWN0U3ltYm9sXSA9PT0gJ2Z1bmN0aW9uJyAmJiB1dGlsSW5zcGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHV0aWxJbnNwZWN0KG9iaiwgeyBkZXB0aDogbWF4RGVwdGggLSBkZXB0aCB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXN0b21JbnNwZWN0ICE9PSAnc3ltYm9sJyAmJiB0eXBlb2Ygb2JqLmluc3BlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmouaW5zcGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc01hcChvYmopKSB7XG4gICAgICAgIHZhciBtYXBQYXJ0cyA9IFtdO1xuICAgICAgICBpZiAobWFwRm9yRWFjaCkge1xuICAgICAgICAgICAgbWFwRm9yRWFjaC5jYWxsKG9iaiwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBtYXBQYXJ0cy5wdXNoKGluc3BlY3Qoa2V5LCBvYmosIHRydWUpICsgJyA9PiAnICsgaW5zcGVjdCh2YWx1ZSwgb2JqKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbk9mKCdNYXAnLCBtYXBTaXplLmNhbGwob2JqKSwgbWFwUGFydHMsIGluZGVudCk7XG4gICAgfVxuICAgIGlmIChpc1NldChvYmopKSB7XG4gICAgICAgIHZhciBzZXRQYXJ0cyA9IFtdO1xuICAgICAgICBpZiAoc2V0Rm9yRWFjaCkge1xuICAgICAgICAgICAgc2V0Rm9yRWFjaC5jYWxsKG9iaiwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0UGFydHMucHVzaChpbnNwZWN0KHZhbHVlLCBvYmopKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uT2YoJ1NldCcsIHNldFNpemUuY2FsbChvYmopLCBzZXRQYXJ0cywgaW5kZW50KTtcbiAgICB9XG4gICAgaWYgKGlzV2Vha01hcChvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKCdXZWFrTWFwJyk7XG4gICAgfVxuICAgIGlmIChpc1dlYWtTZXQob2JqKSkge1xuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZignV2Vha1NldCcpO1xuICAgIH1cbiAgICBpZiAoaXNXZWFrUmVmKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoJ1dlYWtSZWYnKTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0KE51bWJlcihvYmopKSk7XG4gICAgfVxuICAgIGlmIChpc0JpZ0ludChvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoaW5zcGVjdChiaWdJbnRWYWx1ZU9mLmNhbGwob2JqKSkpO1xuICAgIH1cbiAgICBpZiAoaXNCb29sZWFuKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChib29sZWFuVmFsdWVPZi5jYWxsKG9iaikpO1xuICAgIH1cbiAgICBpZiAoaXNTdHJpbmcob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QoU3RyaW5nKG9iaikpKTtcbiAgICB9XG4gICAgaWYgKCFpc0RhdGUob2JqKSAmJiAhaXNSZWdFeHAob2JqKSkge1xuICAgICAgICB2YXIgeXMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIHZhciBpc1BsYWluT2JqZWN0ID0gZ1BPID8gZ1BPKG9iaikgPT09IE9iamVjdC5wcm90b3R5cGUgOiBvYmogaW5zdGFuY2VvZiBPYmplY3QgfHwgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgICAgIHZhciBwcm90b1RhZyA9IG9iaiBpbnN0YW5jZW9mIE9iamVjdCA/ICcnIDogJ251bGwgcHJvdG90eXBlJztcbiAgICAgICAgdmFyIHN0cmluZ1RhZyA9ICFpc1BsYWluT2JqZWN0ICYmIHRvU3RyaW5nVGFnICYmIE9iamVjdChvYmopID09PSBvYmogJiYgdG9TdHJpbmdUYWcgaW4gb2JqID8gJHNsaWNlLmNhbGwodG9TdHIob2JqKSwgOCwgLTEpIDogcHJvdG9UYWcgPyAnT2JqZWN0JyA6ICcnO1xuICAgICAgICB2YXIgY29uc3RydWN0b3JUYWcgPSBpc1BsYWluT2JqZWN0IHx8IHR5cGVvZiBvYmouY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicgPyAnJyA6IG9iai5jb25zdHJ1Y3Rvci5uYW1lID8gb2JqLmNvbnN0cnVjdG9yLm5hbWUgKyAnICcgOiAnJztcbiAgICAgICAgdmFyIHRhZyA9IGNvbnN0cnVjdG9yVGFnICsgKHN0cmluZ1RhZyB8fCBwcm90b1RhZyA/ICdbJyArICRqb2luLmNhbGwoJGNvbmNhdC5jYWxsKFtdLCBzdHJpbmdUYWcgfHwgW10sIHByb3RvVGFnIHx8IFtdKSwgJzogJykgKyAnXSAnIDogJycpO1xuICAgICAgICBpZiAoeXMubGVuZ3RoID09PSAwKSB7IHJldHVybiB0YWcgKyAne30nOyB9XG4gICAgICAgIGlmIChpbmRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0YWcgKyAneycgKyBpbmRlbnRlZEpvaW4oeXMsIGluZGVudCkgKyAnfSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhZyArICd7ICcgKyAkam9pbi5jYWxsKHlzLCAnLCAnKSArICcgfSc7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcob2JqKTtcbn07XG5cbmZ1bmN0aW9uIHdyYXBRdW90ZXMocywgZGVmYXVsdFN0eWxlLCBvcHRzKSB7XG4gICAgdmFyIHF1b3RlQ2hhciA9IChvcHRzLnF1b3RlU3R5bGUgfHwgZGVmYXVsdFN0eWxlKSA9PT0gJ2RvdWJsZScgPyAnXCInIDogXCInXCI7XG4gICAgcmV0dXJuIHF1b3RlQ2hhciArIHMgKyBxdW90ZUNoYXI7XG59XG5cbmZ1bmN0aW9uIHF1b3RlKHMpIHtcbiAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChTdHJpbmcocyksIC9cIi9nLCAnJnF1b3Q7Jyk7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBBcnJheV0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNEYXRlKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgRGF0ZV0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBSZWdFeHBdJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzRXJyb3Iob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBFcnJvcl0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBTdHJpbmddJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzTnVtYmVyKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc0Jvb2xlYW4ob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBCb29sZWFuXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5cbi8vIFN5bWJvbCBhbmQgQmlnSW50IGRvIGhhdmUgU3ltYm9sLnRvU3RyaW5nVGFnIGJ5IHNwZWMsIHNvIHRoYXQgY2FuJ3QgYmUgdXNlZCB0byBlbGltaW5hdGUgZmFsc2UgcG9zaXRpdmVzXG5mdW5jdGlvbiBpc1N5bWJvbChvYmopIHtcbiAgICBpZiAoaGFzU2hhbW1lZFN5bWJvbHMpIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogaW5zdGFuY2VvZiBTeW1ib2w7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3ltYm9sJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgIXN5bVRvU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgc3ltVG9TdHJpbmcuY2FsbChvYmopO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNCaWdJbnQob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgIWJpZ0ludFZhbHVlT2YpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBiaWdJbnRWYWx1ZU9mLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5IHx8IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleSBpbiB0aGlzOyB9O1xuZnVuY3Rpb24gaGFzKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn1cblxuZnVuY3Rpb24gdG9TdHIob2JqKSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqKTtcbn1cblxuZnVuY3Rpb24gbmFtZU9mKGYpIHtcbiAgICBpZiAoZi5uYW1lKSB7IHJldHVybiBmLm5hbWU7IH1cbiAgICB2YXIgbSA9ICRtYXRjaC5jYWxsKGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChmKSwgL15mdW5jdGlvblxccyooW1xcdyRdKykvKTtcbiAgICBpZiAobSkgeyByZXR1cm4gbVsxXTsgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBpbmRleE9mKHhzLCB4KSB7XG4gICAgaWYgKHhzLmluZGV4T2YpIHsgcmV0dXJuIHhzLmluZGV4T2YoeCk7IH1cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHhzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoeHNbaV0gPT09IHgpIHsgcmV0dXJuIGk7IH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBpc01hcCh4KSB7XG4gICAgaWYgKCFtYXBTaXplIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIG1hcFNpemUuY2FsbCh4KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldFNpemUuY2FsbCh4KTtcbiAgICAgICAgfSBjYXRjaCAocykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBNYXA7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xuICAgIGlmICghd2Vha01hcEhhcyB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB3ZWFrTWFwSGFzLmNhbGwoeCwgd2Vha01hcEhhcyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3ZWFrU2V0SGFzLmNhbGwoeCwgd2Vha1NldEhhcyk7XG4gICAgICAgIH0gY2F0Y2ggKHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgV2Vha01hcDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjIuNS4wXG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzV2Vha1JlZih4KSB7XG4gICAgaWYgKCF3ZWFrUmVmRGVyZWYgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha1JlZkRlcmVmLmNhbGwoeCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1NldCh4KSB7XG4gICAgaWYgKCFzZXRTaXplIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHNldFNpemUuY2FsbCh4KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1hcFNpemUuY2FsbCh4KTtcbiAgICAgICAgfSBjYXRjaCAobSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBTZXQ7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1dlYWtTZXQoeCkge1xuICAgIGlmICghd2Vha1NldEhhcyB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB3ZWFrU2V0SGFzLmNhbGwoeCwgd2Vha1NldEhhcyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3ZWFrTWFwSGFzLmNhbGwoeCwgd2Vha01hcEhhcyk7XG4gICAgICAgIH0gY2F0Y2ggKHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgV2Vha1NldDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjIuNS4wXG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudCh4KSB7XG4gICAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB4IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgeC5ub2RlTmFtZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHguZ2V0QXR0cmlidXRlID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpbnNwZWN0U3RyaW5nKHN0ciwgb3B0cykge1xuICAgIGlmIChzdHIubGVuZ3RoID4gb3B0cy5tYXhTdHJpbmdMZW5ndGgpIHtcbiAgICAgICAgdmFyIHJlbWFpbmluZyA9IHN0ci5sZW5ndGggLSBvcHRzLm1heFN0cmluZ0xlbmd0aDtcbiAgICAgICAgdmFyIHRyYWlsZXIgPSAnLi4uICcgKyByZW1haW5pbmcgKyAnIG1vcmUgY2hhcmFjdGVyJyArIChyZW1haW5pbmcgPiAxID8gJ3MnIDogJycpO1xuICAgICAgICByZXR1cm4gaW5zcGVjdFN0cmluZygkc2xpY2UuY2FsbChzdHIsIDAsIG9wdHMubWF4U3RyaW5nTGVuZ3RoKSwgb3B0cykgKyB0cmFpbGVyO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuICAgIHZhciBzID0gJHJlcGxhY2UuY2FsbCgkcmVwbGFjZS5jYWxsKHN0ciwgLyhbJ1xcXFxdKS9nLCAnXFxcXCQxJyksIC9bXFx4MDAtXFx4MWZdL2csIGxvd2J5dGUpO1xuICAgIHJldHVybiB3cmFwUXVvdGVzKHMsICdzaW5nbGUnLCBvcHRzKTtcbn1cblxuZnVuY3Rpb24gbG93Ynl0ZShjKSB7XG4gICAgdmFyIG4gPSBjLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIHggPSB7XG4gICAgICAgIDg6ICdiJyxcbiAgICAgICAgOTogJ3QnLFxuICAgICAgICAxMDogJ24nLFxuICAgICAgICAxMjogJ2YnLFxuICAgICAgICAxMzogJ3InXG4gICAgfVtuXTtcbiAgICBpZiAoeCkgeyByZXR1cm4gJ1xcXFwnICsgeDsgfVxuICAgIHJldHVybiAnXFxcXHgnICsgKG4gPCAweDEwID8gJzAnIDogJycpICsgJHRvVXBwZXJDYXNlLmNhbGwobi50b1N0cmluZygxNikpO1xufVxuXG5mdW5jdGlvbiBtYXJrQm94ZWQoc3RyKSB7XG4gICAgcmV0dXJuICdPYmplY3QoJyArIHN0ciArICcpJztcbn1cblxuZnVuY3Rpb24gd2Vha0NvbGxlY3Rpb25PZih0eXBlKSB7XG4gICAgcmV0dXJuIHR5cGUgKyAnIHsgPyB9Jztcbn1cblxuZnVuY3Rpb24gY29sbGVjdGlvbk9mKHR5cGUsIHNpemUsIGVudHJpZXMsIGluZGVudCkge1xuICAgIHZhciBqb2luZWRFbnRyaWVzID0gaW5kZW50ID8gaW5kZW50ZWRKb2luKGVudHJpZXMsIGluZGVudCkgOiAkam9pbi5jYWxsKGVudHJpZXMsICcsICcpO1xuICAgIHJldHVybiB0eXBlICsgJyAoJyArIHNpemUgKyAnKSB7JyArIGpvaW5lZEVudHJpZXMgKyAnfSc7XG59XG5cbmZ1bmN0aW9uIHNpbmdsZUxpbmVWYWx1ZXMoeHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpbmRleE9mKHhzW2ldLCAnXFxuJykgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRJbmRlbnQob3B0cywgZGVwdGgpIHtcbiAgICB2YXIgYmFzZUluZGVudDtcbiAgICBpZiAob3B0cy5pbmRlbnQgPT09ICdcXHQnKSB7XG4gICAgICAgIGJhc2VJbmRlbnQgPSAnXFx0JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLmluZGVudCA9PT0gJ251bWJlcicgJiYgb3B0cy5pbmRlbnQgPiAwKSB7XG4gICAgICAgIGJhc2VJbmRlbnQgPSAkam9pbi5jYWxsKEFycmF5KG9wdHMuaW5kZW50ICsgMSksICcgJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGJhc2U6IGJhc2VJbmRlbnQsXG4gICAgICAgIHByZXY6ICRqb2luLmNhbGwoQXJyYXkoZGVwdGggKyAxKSwgYmFzZUluZGVudClcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpbmRlbnRlZEpvaW4oeHMsIGluZGVudCkge1xuICAgIGlmICh4cy5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG4gICAgdmFyIGxpbmVKb2luZXIgPSAnXFxuJyArIGluZGVudC5wcmV2ICsgaW5kZW50LmJhc2U7XG4gICAgcmV0dXJuIGxpbmVKb2luZXIgKyAkam9pbi5jYWxsKHhzLCAnLCcgKyBsaW5lSm9pbmVyKSArICdcXG4nICsgaW5kZW50LnByZXY7XG59XG5cbmZ1bmN0aW9uIGFyck9iaktleXMob2JqLCBpbnNwZWN0KSB7XG4gICAgdmFyIGlzQXJyID0gaXNBcnJheShvYmopO1xuICAgIHZhciB4cyA9IFtdO1xuICAgIGlmIChpc0Fycikge1xuICAgICAgICB4cy5sZW5ndGggPSBvYmoubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgeHNbaV0gPSBoYXMob2JqLCBpKSA/IGluc3BlY3Qob2JqW2ldLCBvYmopIDogJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHN5bXMgPSB0eXBlb2YgZ09QUyA9PT0gJ2Z1bmN0aW9uJyA/IGdPUFMob2JqKSA6IFtdO1xuICAgIHZhciBzeW1NYXA7XG4gICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzKSB7XG4gICAgICAgIHN5bU1hcCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHN5bXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIHN5bU1hcFsnJCcgKyBzeW1zW2tdXSA9IHN5bXNba107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgICAgaWYgKCFoYXMob2JqLCBrZXkpKSB7IGNvbnRpbnVlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLWNvbnRpbnVlXG4gICAgICAgIGlmIChpc0FyciAmJiBTdHJpbmcoTnVtYmVyKGtleSkpID09PSBrZXkgJiYga2V5IDwgb2JqLmxlbmd0aCkgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby1jb250aW51ZVxuICAgICAgICBpZiAoaGFzU2hhbW1lZFN5bWJvbHMgJiYgc3ltTWFwWyckJyArIGtleV0gaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdG8gcHJldmVudCBzaGFtbWVkIFN5bWJvbHMsIHdoaWNoIGFyZSBzdG9yZWQgYXMgc3RyaW5ncywgZnJvbSBiZWluZyBpbmNsdWRlZCBpbiB0aGUgc3RyaW5nIGtleSBzZWN0aW9uXG4gICAgICAgICAgICBjb250aW51ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmICgkdGVzdC5jYWxsKC9bXlxcdyRdLywga2V5KSkge1xuICAgICAgICAgICAgeHMucHVzaChpbnNwZWN0KGtleSwgb2JqKSArICc6ICcgKyBpbnNwZWN0KG9ialtrZXldLCBvYmopKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHhzLnB1c2goa2V5ICsgJzogJyArIGluc3BlY3Qob2JqW2tleV0sIG9iaikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZ09QUyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN5bXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChpc0VudW1lcmFibGUuY2FsbChvYmosIHN5bXNbal0pKSB7XG4gICAgICAgICAgICAgICAgeHMucHVzaCgnWycgKyBpbnNwZWN0KHN5bXNbal0pICsgJ106ICcgKyBpbnNwZWN0KG9ialtzeW1zW2pdXSwgb2JqKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHhzO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG52YXIgaW5zcGVjdCA9IHJlcXVpcmUoJ29iamVjdC1pbnNwZWN0Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xudmFyICRXZWFrTWFwID0gR2V0SW50cmluc2ljKCclV2Vha01hcCUnLCB0cnVlKTtcbnZhciAkTWFwID0gR2V0SW50cmluc2ljKCclTWFwJScsIHRydWUpO1xuXG52YXIgJHdlYWtNYXBHZXQgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLmdldCcsIHRydWUpO1xudmFyICR3ZWFrTWFwU2V0ID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5zZXQnLCB0cnVlKTtcbnZhciAkd2Vha01hcEhhcyA9IGNhbGxCb3VuZCgnV2Vha01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG52YXIgJG1hcEdldCA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5nZXQnLCB0cnVlKTtcbnZhciAkbWFwU2V0ID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLnNldCcsIHRydWUpO1xudmFyICRtYXBIYXMgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG5cbi8qXG4gKiBUaGlzIGZ1bmN0aW9uIHRyYXZlcnNlcyB0aGUgbGlzdCByZXR1cm5pbmcgdGhlIG5vZGUgY29ycmVzcG9uZGluZyB0byB0aGVcbiAqIGdpdmVuIGtleS5cbiAqXG4gKiBUaGF0IG5vZGUgaXMgYWxzbyBtb3ZlZCB0byB0aGUgaGVhZCBvZiB0aGUgbGlzdCwgc28gdGhhdCBpZiBpdCdzIGFjY2Vzc2VkXG4gKiBhZ2FpbiB3ZSBkb24ndCBuZWVkIHRvIHRyYXZlcnNlIHRoZSB3aG9sZSBsaXN0LiBCeSBkb2luZyBzbywgYWxsIHRoZSByZWNlbnRseVxuICogdXNlZCBub2RlcyBjYW4gYmUgYWNjZXNzZWQgcmVsYXRpdmVseSBxdWlja2x5LlxuICovXG52YXIgbGlzdEdldE5vZGUgPSBmdW5jdGlvbiAobGlzdCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0Zm9yICh2YXIgcHJldiA9IGxpc3QsIGN1cnI7IChjdXJyID0gcHJldi5uZXh0KSAhPT0gbnVsbDsgcHJldiA9IGN1cnIpIHtcblx0XHRpZiAoY3Vyci5rZXkgPT09IGtleSkge1xuXHRcdFx0cHJldi5uZXh0ID0gY3Vyci5uZXh0O1xuXHRcdFx0Y3Vyci5uZXh0ID0gbGlzdC5uZXh0O1xuXHRcdFx0bGlzdC5uZXh0ID0gY3VycjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHRcdFx0cmV0dXJuIGN1cnI7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgbGlzdEdldCA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXkpIHtcblx0dmFyIG5vZGUgPSBsaXN0R2V0Tm9kZShvYmplY3RzLCBrZXkpO1xuXHRyZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlO1xufTtcbnZhciBsaXN0U2V0ID0gZnVuY3Rpb24gKG9iamVjdHMsIGtleSwgdmFsdWUpIHtcblx0dmFyIG5vZGUgPSBsaXN0R2V0Tm9kZShvYmplY3RzLCBrZXkpO1xuXHRpZiAobm9kZSkge1xuXHRcdG5vZGUudmFsdWUgPSB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHQvLyBQcmVwZW5kIHRoZSBuZXcgbm9kZSB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0XG5cdFx0b2JqZWN0cy5uZXh0ID0geyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHRrZXk6IGtleSxcblx0XHRcdG5leHQ6IG9iamVjdHMubmV4dCxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cbn07XG52YXIgbGlzdEhhcyA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXkpIHtcblx0cmV0dXJuICEhbGlzdEdldE5vZGUob2JqZWN0cywga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0U2lkZUNoYW5uZWwoKSB7XG5cdHZhciAkd207XG5cdHZhciAkbTtcblx0dmFyICRvO1xuXHR2YXIgY2hhbm5lbCA9IHtcblx0XHRhc3NlcnQ6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmICghY2hhbm5lbC5oYXMoa2V5KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignU2lkZSBjaGFubmVsIGRvZXMgbm90IGNvbnRhaW4gJyArIGluc3BlY3Qoa2V5KSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uIChrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuXHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEdldCgkd20sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0XHRyZXR1cm4gJG1hcEdldCgkbSwga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCRvKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZWx5LWlmXG5cdFx0XHRcdFx0cmV0dXJuIGxpc3RHZXQoJG8sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGhhczogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEhhcygkd20sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0XHRyZXR1cm4gJG1hcEhhcygkbSwga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCRvKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZWx5LWlmXG5cdFx0XHRcdFx0cmV0dXJuIGxpc3RIYXMoJG8sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdGlmICghJHdtKSB7XG5cdFx0XHRcdFx0JHdtID0gbmV3ICRXZWFrTWFwKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHdlYWtNYXBTZXQoJHdtLCBrZXksIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoISRtKSB7XG5cdFx0XHRcdFx0JG0gPSBuZXcgJE1hcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRtYXBTZXQoJG0sIGtleSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCEkbykge1xuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogSW5pdGlhbGl6ZSB0aGUgbGlua2VkIGxpc3QgYXMgYW4gZW1wdHkgbm9kZSwgc28gdGhhdCB3ZSBkb24ndCBoYXZlXG5cdFx0XHRcdFx0ICogdG8gc3BlY2lhbC1jYXNlIGhhbmRsaW5nIG9mIHRoZSBmaXJzdCBub2RlOiB3ZSBjYW4gYWx3YXlzIHJlZmVyIHRvXG5cdFx0XHRcdFx0ICogaXQgYXMgKHByZXZpb3VzIG5vZGUpLm5leHQsIGluc3RlYWQgb2Ygc29tZXRoaW5nIGxpa2UgKGxpc3QpLmhlYWRcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHQkbyA9IHsga2V5OiB7fSwgbmV4dDogbnVsbCB9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3RTZXQoJG8sIGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGNoYW5uZWw7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG52YXIgRm9ybWF0ID0ge1xuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdkZWZhdWx0JzogRm9ybWF0LlJGQzM5ODYsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogRm9ybWF0LlJGQzE3MzgsXG4gICAgUkZDMzk4NjogRm9ybWF0LlJGQzM5ODZcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICAvKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IDAgKi9cbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKChvcHRpb25zICYmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcykpIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJdGVtID0gdGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJdGVtICYmIHR5cGVvZiB0YXJnZXRJdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBtZXJnZSh0YXJnZXRJdGVtLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBtZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbnZhciBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoc3RyLCBkZWNvZGVyLCBjaGFyc2V0KSB7XG4gICAgdmFyIHN0cldpdGhvdXRQbHVzID0gc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgLy8gdW5lc2NhcGUgbmV2ZXIgdGhyb3dzLCBubyB0cnkuLi5jYXRjaCBuZWVkZWQ6XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cy5yZXBsYWNlKC8lWzAtOWEtZl17Mn0vZ2ksIHVuZXNjYXBlKTtcbiAgICB9XG4gICAgLy8gdXRmLThcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cldpdGhvdXRQbHVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cztcbiAgICB9XG59O1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0ciwgZGVmYXVsdEVuY29kZXIsIGNoYXJzZXQsIGtpbmQsIGZvcm1hdCkge1xuICAgIC8vIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IEJyaWFuIFdoaXRlIChtc2NkZXgpIGZvciB0aGUgaW8uanMgY29yZSBxdWVyeXN0cmluZyBsaWJyYXJ5LlxuICAgIC8vIEl0IGhhcyBiZWVuIGFkYXB0ZWQgaGVyZSBmb3Igc3RyaWN0ZXIgYWRoZXJlbmNlIHRvIFJGQyAzOTg2XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gc3RyO1xuICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3ltYm9sJykge1xuICAgICAgICBzdHJpbmcgPSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3RyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHN0cmluZyA9IFN0cmluZyhzdHIpO1xuICAgIH1cblxuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZShzdHJpbmcpLnJlcGxhY2UoLyV1WzAtOWEtZl17NH0vZ2ksIGZ1bmN0aW9uICgkMCkge1xuICAgICAgICAgICAgcmV0dXJuICclMjYlMjMnICsgcGFyc2VJbnQoJDAuc2xpY2UoMiksIDE2KSArICclM0InO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgICAgIHx8IChmb3JtYXQgPT09IGZvcm1hdHMuUkZDMTczOCAmJiAoYyA9PT0gMHgyOCB8fCBjID09PSAweDI5KSkgLy8gKCApXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICAvKiBlc2xpbnQgb3BlcmF0b3ItbGluZWJyZWFrOiBbMiwgXCJiZWZvcmVcIl0gKi9cbiAgICAgICAgb3V0ICs9IGhleFRhYmxlWzB4RjAgfCAoYyA+PiAxOCldXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gMTIpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG52YXIgY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpIHtcbiAgICB2YXIgcXVldWUgPSBbeyBvYmo6IHsgbzogdmFsdWUgfSwgcHJvcDogJ28nIH1dO1xuICAgIHZhciByZWZzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWVbaV07XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwgJiYgcmVmcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCh7IG9iajogb2JqLCBwcm9wOiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgcmVmcy5wdXNoKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wYWN0UXVldWUocXVldWUpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxudmFyIGlzUmVnRXhwID0gZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cbnZhciBpc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyKG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuXG52YXIgY29tYmluZSA9IGZ1bmN0aW9uIGNvbWJpbmUoYSwgYikge1xuICAgIHJldHVybiBbXS5jb25jYXQoYSwgYik7XG59O1xuXG52YXIgbWF5YmVNYXAgPSBmdW5jdGlvbiBtYXliZU1hcCh2YWwsIGZuKSB7XG4gICAgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgICB2YXIgbWFwcGVkID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBtYXBwZWQucHVzaChmbih2YWxbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwcGVkO1xuICAgIH1cbiAgICByZXR1cm4gZm4odmFsKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFycmF5VG9PYmplY3Q6IGFycmF5VG9PYmplY3QsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgY29tYmluZTogY29tYmluZSxcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWF5YmVNYXA6IG1heWJlTWFwLFxuICAgIG1lcmdlOiBtZXJnZVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTaWRlQ2hhbm5lbCA9IHJlcXVpcmUoJ3NpZGUtY2hhbm5lbCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gICAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdEZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhZGRRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZGVmYXVsdEZvcm1hdF0sXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGluZGljZXM6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkge1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIGlzTm9uTnVsbGlzaFByaW1pdGl2ZSA9IGZ1bmN0aW9uIGlzTm9uTnVsbGlzaFByaW1pdGl2ZSh2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ251bWJlcidcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdib29sZWFuJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ3N5bWJvbCdcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdiaWdpbnQnO1xufTtcblxudmFyIHNlbnRpbmVsID0ge307XG5cbnZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoXG4gICAgb2JqZWN0LFxuICAgIHByZWZpeCxcbiAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgIGNvbW1hUm91bmRUcmlwLFxuICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICBza2lwTnVsbHMsXG4gICAgZW5jb2RlcixcbiAgICBmaWx0ZXIsXG4gICAgc29ydCxcbiAgICBhbGxvd0RvdHMsXG4gICAgc2VyaWFsaXplRGF0ZSxcbiAgICBmb3JtYXQsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgY2hhcnNldCxcbiAgICBzaWRlQ2hhbm5lbFxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcblxuICAgIHZhciB0bXBTYyA9IHNpZGVDaGFubmVsO1xuICAgIHZhciBzdGVwID0gMDtcbiAgICB2YXIgZmluZEZsYWcgPSBmYWxzZTtcbiAgICB3aGlsZSAoKHRtcFNjID0gdG1wU2MuZ2V0KHNlbnRpbmVsKSkgIT09IHZvaWQgdW5kZWZpbmVkICYmICFmaW5kRmxhZykge1xuICAgICAgICAvLyBXaGVyZSBvYmplY3QgbGFzdCBhcHBlYXJlZCBpbiB0aGUgcmVmIHRyZWVcbiAgICAgICAgdmFyIHBvcyA9IHRtcFNjLmdldChvYmplY3QpO1xuICAgICAgICBzdGVwICs9IDE7XG4gICAgICAgIGlmICh0eXBlb2YgcG9zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHBvcyA9PT0gc3RlcCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdDeWNsaWMgb2JqZWN0IHZhbHVlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbmRGbGFnID0gdHJ1ZTsgLy8gQnJlYWsgd2hpbGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRtcFNjLmdldChzZW50aW5lbCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBzdGVwID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgaXNBcnJheShvYmopKSB7XG4gICAgICAgIG9iaiA9IHV0aWxzLm1heWJlTWFwKG9iaiwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZURhdGUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknLCBmb3JtYXQpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGlzTm9uTnVsbGlzaFByaW1pdGl2ZShvYmopIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ2tleScsIGZvcm1hdCk7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICd2YWx1ZScsIGZvcm1hdCkpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgaXNBcnJheShvYmopKSB7XG4gICAgICAgIC8vIHdlIG5lZWQgdG8gam9pbiBlbGVtZW50cyBpblxuICAgICAgICBpZiAoZW5jb2RlVmFsdWVzT25seSAmJiBlbmNvZGVyKSB7XG4gICAgICAgICAgICBvYmogPSB1dGlscy5tYXliZU1hcChvYmosIGVuY29kZXIpO1xuICAgICAgICB9XG4gICAgICAgIG9iaktleXMgPSBbeyB2YWx1ZTogb2JqLmxlbmd0aCA+IDAgPyBvYmouam9pbignLCcpIHx8IG51bGwgOiB2b2lkIHVuZGVmaW5lZCB9XTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIHZhciBhZGp1c3RlZFByZWZpeCA9IGNvbW1hUm91bmRUcmlwICYmIGlzQXJyYXkob2JqKSAmJiBvYmoubGVuZ3RoID09PSAxID8gcHJlZml4ICsgJ1tdJyA6IHByZWZpeDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqS2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tqXTtcbiAgICAgICAgdmFyIHZhbHVlID0gdHlwZW9mIGtleSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGtleS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgPyBrZXkudmFsdWUgOiBvYmpba2V5XTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXlQcmVmaXggPSBpc0FycmF5KG9iailcbiAgICAgICAgICAgID8gdHlwZW9mIGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdmdW5jdGlvbicgPyBnZW5lcmF0ZUFycmF5UHJlZml4KGFkanVzdGVkUHJlZml4LCBrZXkpIDogYWRqdXN0ZWRQcmVmaXhcbiAgICAgICAgICAgIDogYWRqdXN0ZWRQcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKTtcblxuICAgICAgICBzaWRlQ2hhbm5lbC5zZXQob2JqZWN0LCBzdGVwKTtcbiAgICAgICAgdmFyIHZhbHVlU2lkZUNoYW5uZWwgPSBnZXRTaWRlQ2hhbm5lbCgpO1xuICAgICAgICB2YWx1ZVNpZGVDaGFubmVsLnNldChzZW50aW5lbCwgc2lkZUNoYW5uZWwpO1xuICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAga2V5UHJlZml4LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIGNvbW1hUm91bmRUcmlwLFxuICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2NvbW1hJyAmJiBlbmNvZGVWYWx1ZXNPbmx5ICYmIGlzQXJyYXkob2JqKSA/IG51bGwgOiBlbmNvZGVyLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBmb3JtYXQsXG4gICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgY2hhcnNldCxcbiAgICAgICAgICAgIHZhbHVlU2lkZUNoYW5uZWxcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbnZhciBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5lbmNvZGVyICE9PSBudWxsICYmIHR5cGVvZiBvcHRzLmVuY29kZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBvcHRzLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdHMuY2hhcnNldCB8fCBkZWZhdWx0cy5jaGFyc2V0O1xuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5mb3JtYXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghaGFzLmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtYXQgPSBvcHRzLmZvcm1hdDtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXG4gICAgdmFyIGZpbHRlciA9IGRlZmF1bHRzLmZpbHRlcjtcbiAgICBpZiAodHlwZW9mIG9wdHMuZmlsdGVyID09PSAnZnVuY3Rpb24nIHx8IGlzQXJyYXkob3B0cy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdHMuZmlsdGVyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZFF1ZXJ5UHJlZml4OiB0eXBlb2Ygb3B0cy5hZGRRdWVyeVByZWZpeCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hZGRRdWVyeVByZWZpeCA6IGRlZmF1bHRzLmFkZFF1ZXJ5UHJlZml4LFxuICAgICAgICBhbGxvd0RvdHM6IHR5cGVvZiBvcHRzLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5hbGxvd0RvdHMgOiAhIW9wdHMuYWxsb3dEb3RzLFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdHMuZGVsaW1pdGVyLFxuICAgICAgICBlbmNvZGU6IHR5cGVvZiBvcHRzLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGUsXG4gICAgICAgIGVuY29kZXI6IHR5cGVvZiBvcHRzLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyLFxuICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5OiB0eXBlb2Ygb3B0cy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICAgICAgICBzZXJpYWxpemVEYXRlOiB0eXBlb2Ygb3B0cy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0cy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgc2tpcE51bGxzOiB0eXBlb2Ygb3B0cy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdHMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzLFxuICAgICAgICBzb3J0OiB0eXBlb2Ygb3B0cy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0cy5zb3J0IDogbnVsbCxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpO1xuXG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdHMgJiYgb3B0cy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAob3B0cyAmJiAnaW5kaWNlcycgaW4gb3B0cykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcbiAgICBpZiAob3B0cyAmJiAnY29tbWFSb3VuZFRyaXAnIGluIG9wdHMgJiYgdHlwZW9mIG9wdHMuY29tbWFSb3VuZFRyaXAgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgY29tbWFSb3VuZFRyaXBgIG11c3QgYmUgYSBib29sZWFuLCBvciBhYnNlbnQnKTtcbiAgICB9XG4gICAgdmFyIGNvbW1hUm91bmRUcmlwID0gZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2NvbW1hJyAmJiBvcHRzICYmIG9wdHMuY29tbWFSb3VuZFRyaXA7XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICB9XG5cbiAgICB2YXIgc2lkZUNoYW5uZWwgPSBnZXRTaWRlQ2hhbm5lbCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAob3B0aW9ucy5za2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hUb0FycmF5KGtleXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIGNvbW1hUm91bmRUcmlwLFxuICAgICAgICAgICAgb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBvcHRpb25zLnNraXBOdWxscyxcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlID8gb3B0aW9ucy5lbmNvZGVyIDogbnVsbCxcbiAgICAgICAgICAgIG9wdGlvbnMuZmlsdGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5zb3J0LFxuICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0RvdHMsXG4gICAgICAgICAgICBvcHRpb25zLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBvcHRpb25zLmZvcm1hdCxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0dGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgb3B0aW9ucy5jaGFyc2V0LFxuICAgICAgICAgICAgc2lkZUNoYW5uZWxcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihvcHRpb25zLmRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBpZiAob3B0aW9ucy5jaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKSwgdGhlIFwibnVtZXJpYyBlbnRpdHlcIiByZXByZXNlbnRhdGlvbiBvZiBhIGNoZWNrbWFya1xuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJ1x1MjcxMycpXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JUUyJTlDJTkzJic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBhbGxvd1Byb3RvdHlwZXM6IGZhbHNlLFxuICAgIGFsbG93U3BhcnNlOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgY29tbWE6IGZhbHNlLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBpZ25vcmVRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiBmYWxzZSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwYXJzZUFycmF5czogdHJ1ZSxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpbnRlcnByZXROdW1lcmljRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mIyhcXGQrKTsvZywgZnVuY3Rpb24gKCQwLCBudW1iZXJTdHIpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobnVtYmVyU3RyLCAxMCkpO1xuICAgIH0pO1xufTtcblxudmFyIHBhcnNlQXJyYXlWYWx1ZSA9IGZ1bmN0aW9uICh2YWwsIG9wdGlvbnMpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIG9wdGlvbnMuY29tbWEgJiYgdmFsLmluZGV4T2YoJywnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB2YWwuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsO1xufTtcblxuLy8gVGhpcyBpcyB3aGF0IGJyb3dzZXJzIHdpbGwgc3VibWl0IHdoZW4gdGhlIFx1MjcxMyBjaGFyYWN0ZXIgb2NjdXJzIGluIGFuXG4vLyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQgYm9keSBhbmQgdGhlIGVuY29kaW5nIG9mIHRoZSBwYWdlIGNvbnRhaW5pbmdcbi8vIHRoZSBmb3JtIGlzIGlzby04ODU5LTEsIG9yIHdoZW4gdGhlIHN1Ym1pdHRlZCBmb3JtIGhhcyBhbiBhY2NlcHQtY2hhcnNldFxuLy8gYXR0cmlidXRlIG9mIGlzby04ODU5LTEuIFByZXN1bWFibHkgYWxzbyB3aXRoIG90aGVyIGNoYXJzZXRzIHRoYXQgZG8gbm90IGNvbnRhaW5cbi8vIHRoZSBcdTI3MTMgY2hhcmFjdGVyLCBzdWNoIGFzIHVzLWFzY2lpLlxudmFyIGlzb1NlbnRpbmVsID0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0InOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JylcblxuLy8gVGhlc2UgYXJlIHRoZSBwZXJjZW50LWVuY29kZWQgdXRmLTggb2N0ZXRzIHJlcHJlc2VudGluZyBhIGNoZWNrbWFyaywgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IGFjdHVhbGx5IGlzIHV0Zi04IGVuY29kZWQuXG52YXIgY2hhcnNldFNlbnRpbmVsID0gJ3V0Zjg9JUUyJTlDJTkzJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCdcdTI3MTMnKVxuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG4gICAgdmFyIHNraXBJbmRleCA9IC0xOyAvLyBLZWVwIHRyYWNrIG9mIHdoZXJlIHRoZSB1dGY4IHNlbnRpbmVsIHdhcyBmb3VuZFxuICAgIHZhciBpO1xuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRpb25zLmNoYXJzZXQ7XG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcnRzW2ldLmluZGV4T2YoJ3V0Zjg9JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV0gPT09IGNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSBpc29TZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ2lzby04ODU5LTEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBza2lwSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGkgPSBwYXJ0cy5sZW5ndGg7IC8vIFRoZSBlc2xpbnQgc2V0dGluZ3MgZG8gbm90IGFsbG93IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChpID09PSBza2lwSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gdXRpbHMubWF5YmVNYXAoXG4gICAgICAgICAgICAgICAgcGFyc2VBcnJheVZhbHVlKHBhcnQuc2xpY2UocG9zICsgMSksIG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlbmNvZGVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmRlY29kZXIoZW5jb2RlZFZhbCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgJiYgb3B0aW9ucy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgJiYgY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICB2YWwgPSBpbnRlcnByZXROdW1lcmljRW50aXRpZXModmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0LmluZGV4T2YoJ1tdPScpID4gLTEpIHtcbiAgICAgICAgICAgIHZhbCA9IGlzQXJyYXkodmFsKSA/IFt2YWxdIDogdmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB1dGlscy5jb21iaW5lKG9ialtrZXldLCB2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMsIHZhbHVlc1BhcnNlZCkge1xuICAgIHZhciBsZWFmID0gdmFsdWVzUGFyc2VkID8gdmFsIDogcGFyc2VBcnJheVZhbHVlKHZhbCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIG9iajtcbiAgICAgICAgdmFyIHJvb3QgPSBjaGFpbltpXTtcblxuICAgICAgICBpZiAocm9vdCA9PT0gJ1tdJyAmJiBvcHRpb25zLnBhcnNlQXJyYXlzKSB7XG4gICAgICAgICAgICBvYmogPSBbXS5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnBhcnNlQXJyYXlzICYmIGNsZWFuUm9vdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBvYmogPSB7IDA6IGxlYWYgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xlYW5Sb290ICE9PSAnX19wcm90b19fJykge1xuICAgICAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gbGVhZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxlYWYgPSBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IG9wdGlvbnMuZGVwdGggPiAwICYmIGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXMgdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChvcHRpb25zLmRlcHRoID4gMCAmJiAoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKTtcbn07XG5cbnZhciBub3JtYWxpemVQYXJzZU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRzLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB2YXIgY2hhcnNldCA9IHR5cGVvZiBvcHRzLmNoYXJzZXQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuY2hhcnNldCA6IG9wdHMuY2hhcnNldDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGFsbG93UHJvdG90eXBlczogdHlwZW9mIG9wdHMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcyxcbiAgICAgICAgYWxsb3dTcGFyc2U6IHR5cGVvZiBvcHRzLmFsbG93U3BhcnNlID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93U3BhcnNlIDogZGVmYXVsdHMuYWxsb3dTcGFyc2UsXG4gICAgICAgIGFycmF5TGltaXQ6IHR5cGVvZiBvcHRzLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0cy5hcnJheUxpbWl0IDogZGVmYXVsdHMuYXJyYXlMaW1pdCxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBjb21tYTogdHlwZW9mIG9wdHMuY29tbWEgPT09ICdib29sZWFuJyA/IG9wdHMuY29tbWEgOiBkZWZhdWx0cy5jb21tYSxcbiAgICAgICAgZGVjb2RlcjogdHlwZW9mIG9wdHMuZGVjb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZGVjb2RlciA6IGRlZmF1bHRzLmRlY29kZXIsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCB1dGlscy5pc1JlZ0V4cChvcHRzLmRlbGltaXRlcikgPyBvcHRzLmRlbGltaXRlciA6IGRlZmF1bHRzLmRlbGltaXRlcixcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uLCBuby1leHRyYS1wYXJlbnNcbiAgICAgICAgZGVwdGg6ICh0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ251bWJlcicgfHwgb3B0cy5kZXB0aCA9PT0gZmFsc2UpID8gK29wdHMuZGVwdGggOiBkZWZhdWx0cy5kZXB0aCxcbiAgICAgICAgaWdub3JlUXVlcnlQcmVmaXg6IG9wdHMuaWdub3JlUXVlcnlQcmVmaXggPT09IHRydWUsXG4gICAgICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogdHlwZW9mIG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID09PSAnYm9vbGVhbicgPyBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA6IGRlZmF1bHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyxcbiAgICAgICAgcGFyYW1ldGVyTGltaXQ6IHR5cGVvZiBvcHRzLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdHMucGFyYW1ldGVyTGltaXQgOiBkZWZhdWx0cy5wYXJhbWV0ZXJMaW1pdCxcbiAgICAgICAgcGFyc2VBcnJheXM6IG9wdHMucGFyc2VBcnJheXMgIT09IGZhbHNlLFxuICAgICAgICBwbGFpbk9iamVjdHM6IHR5cGVvZiBvcHRzLnBsYWluT2JqZWN0cyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5wbGFpbk9iamVjdHMgOiBkZWZhdWx0cy5wbGFpbk9iamVjdHMsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyhvcHRzKTtcblxuICAgIGlmIChzdHIgPT09ICcnIHx8IHN0ciA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgfVxuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBwYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMsIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFsbG93U3BhcnNlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1hdHM6IGZvcm1hdHMsXG4gICAgcGFyc2U6IHBhcnNlLFxuICAgIHN0cmluZ2lmeTogc3RyaW5naWZ5XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVjayBpZiB3ZSdyZSByZXF1aXJlZCB0byBhZGQgYSBwb3J0IG51bWJlci5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZGVmYXVsdC1wb3J0XG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHBvcnQgUG9ydCBudW1iZXIgd2UgbmVlZCB0byBjaGVja1xuICogQHBhcmFtIHtTdHJpbmd9IHByb3RvY29sIFByb3RvY29sIHdlIG5lZWQgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBJcyBpdCBhIGRlZmF1bHQgcG9ydCBmb3IgdGhlIGdpdmVuIHByb3RvY29sXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXF1aXJlZChwb3J0LCBwcm90b2NvbCkge1xuICBwcm90b2NvbCA9IHByb3RvY29sLnNwbGl0KCc6JylbMF07XG4gIHBvcnQgPSArcG9ydDtcblxuICBpZiAoIXBvcnQpIHJldHVybiBmYWxzZTtcblxuICBzd2l0Y2ggKHByb3RvY29sKSB7XG4gICAgY2FzZSAnaHR0cCc6XG4gICAgY2FzZSAnd3MnOlxuICAgIHJldHVybiBwb3J0ICE9PSA4MDtcblxuICAgIGNhc2UgJ2h0dHBzJzpcbiAgICBjYXNlICd3c3MnOlxuICAgIHJldHVybiBwb3J0ICE9PSA0NDM7XG5cbiAgICBjYXNlICdmdHAnOlxuICAgIHJldHVybiBwb3J0ICE9PSAyMTtcblxuICAgIGNhc2UgJ2dvcGhlcic6XG4gICAgcmV0dXJuIHBvcnQgIT09IDcwO1xuXG4gICAgY2FzZSAnZmlsZSc6XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHBvcnQgIT09IDA7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCB1bmRlZjtcblxuLyoqXG4gKiBEZWNvZGUgYSBVUkkgZW5jb2RlZCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBVUkkgZW5jb2RlZCBzdHJpbmcuXG4gKiBAcmV0dXJucyB7U3RyaW5nfE51bGx9IFRoZSBkZWNvZGVkIHN0cmluZy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0LnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gZW5jb2RlIGEgZ2l2ZW4gaW5wdXQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgdGhhdCBuZWVkcyB0byBiZSBlbmNvZGVkLlxuICogQHJldHVybnMge1N0cmluZ3xOdWxsfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSBxdWVyeSBzdHJpbmcgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgcXVlcnkgc3RyaW5nIHRoYXQgbmVlZHMgdG8gYmUgcGFyc2VkLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5nKHF1ZXJ5KSB7XG4gIHZhciBwYXJzZXIgPSAvKFtePT8jJl0rKT0/KFteJl0qKS9nXG4gICAgLCByZXN1bHQgPSB7fVxuICAgICwgcGFydDtcblxuICB3aGlsZSAocGFydCA9IHBhcnNlci5leGVjKHF1ZXJ5KSkge1xuICAgIHZhciBrZXkgPSBkZWNvZGUocGFydFsxXSlcbiAgICAgICwgdmFsdWUgPSBkZWNvZGUocGFydFsyXSk7XG5cbiAgICAvL1xuICAgIC8vIFByZXZlbnQgb3ZlcnJpZGluZyBvZiBleGlzdGluZyBwcm9wZXJ0aWVzLiBUaGlzIGVuc3VyZXMgdGhhdCBidWlsZC1pblxuICAgIC8vIG1ldGhvZHMgbGlrZSBgdG9TdHJpbmdgIG9yIF9fcHJvdG9fXyBhcmUgbm90IG92ZXJyaWRlbiBieSBtYWxpY2lvdXNcbiAgICAvLyBxdWVyeXN0cmluZ3MuXG4gICAgLy9cbiAgICAvLyBJbiB0aGUgY2FzZSBpZiBmYWlsZWQgZGVjb2RpbmcsIHdlIHdhbnQgdG8gb21pdCB0aGUga2V5L3ZhbHVlIHBhaXJzXG4gICAgLy8gZnJvbSB0aGUgcmVzdWx0LlxuICAgIC8vXG4gICAgaWYgKGtleSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCBrZXkgaW4gcmVzdWx0KSBjb250aW51ZTtcbiAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSBxdWVyeSBzdHJpbmcgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHRoYXQgc2hvdWxkIGJlIHRyYW5zZm9ybWVkLlxuICogQHBhcmFtIHtTdHJpbmd9IHByZWZpeCBPcHRpb25hbCBwcmVmaXguXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcXVlcnlzdHJpbmdpZnkob2JqLCBwcmVmaXgpIHtcbiAgcHJlZml4ID0gcHJlZml4IHx8ICcnO1xuXG4gIHZhciBwYWlycyA9IFtdXG4gICAgLCB2YWx1ZVxuICAgICwga2V5O1xuXG4gIC8vXG4gIC8vIE9wdGlvbmFsbHkgcHJlZml4IHdpdGggYSAnPycgaWYgbmVlZGVkXG4gIC8vXG4gIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIHByZWZpeCkgcHJlZml4ID0gJz8nO1xuXG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhbHVlID0gb2JqW2tleV07XG5cbiAgICAgIC8vXG4gICAgICAvLyBFZGdlIGNhc2VzIHdoZXJlIHdlIGFjdHVhbGx5IHdhbnQgdG8gZW5jb2RlIHRoZSB2YWx1ZSB0byBhbiBlbXB0eVxuICAgICAgLy8gc3RyaW5nIGluc3RlYWQgb2YgdGhlIHN0cmluZ2lmaWVkIHZhbHVlLlxuICAgICAgLy9cbiAgICAgIGlmICghdmFsdWUgJiYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZiB8fCBpc05hTih2YWx1ZSkpKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGtleSA9IGVuY29kZShrZXkpO1xuICAgICAgdmFsdWUgPSBlbmNvZGUodmFsdWUpO1xuXG4gICAgICAvL1xuICAgICAgLy8gSWYgd2UgZmFpbGVkIHRvIGVuY29kZSB0aGUgc3RyaW5ncywgd2Ugc2hvdWxkIGJhaWwgb3V0IGFzIHdlIGRvbid0XG4gICAgICAvLyB3YW50IHRvIGFkZCBpbnZhbGlkIHN0cmluZ3MgdG8gdGhlIHF1ZXJ5LlxuICAgICAgLy9cbiAgICAgIGlmIChrZXkgPT09IG51bGwgfHwgdmFsdWUgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgcGFpcnMucHVzaChrZXkgKyc9JysgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYWlycy5sZW5ndGggPyBwcmVmaXggKyBwYWlycy5qb2luKCcmJykgOiAnJztcbn1cblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbmV4cG9ydHMuc3RyaW5naWZ5ID0gcXVlcnlzdHJpbmdpZnk7XG5leHBvcnRzLnBhcnNlID0gcXVlcnlzdHJpbmc7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWlyZWQgPSByZXF1aXJlKCdyZXF1aXJlcy1wb3J0JylcbiAgLCBxcyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5naWZ5JylcbiAgLCBjb250cm9sT3JXaGl0ZXNwYWNlID0gL15bXFx4MDAtXFx4MjBcXHUwMGEwXFx1MTY4MFxcdTIwMDAtXFx1MjAwYVxcdTIwMjhcXHUyMDI5XFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1ZmVmZl0rL1xuICAsIENSSFRMRiA9IC9bXFxuXFxyXFx0XS9nXG4gICwgc2xhc2hlcyA9IC9eW0EtWmEtel1bQS1aYS16MC05Ky0uXSo6XFwvXFwvL1xuICAsIHBvcnQgPSAvOlxcZCskL1xuICAsIHByb3RvY29scmUgPSAvXihbYS16XVthLXowLTkuKy1dKjopPyhcXC9cXC8pPyhbXFxcXC9dKyk/KFtcXFNcXHNdKikvaVxuICAsIHdpbmRvd3NEcml2ZUxldHRlciA9IC9eW2EtekEtWl06LztcblxuLyoqXG4gKiBSZW1vdmUgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB3aGl0ZXNwYWNlIGZyb20gdGhlIGJlZ2lubmluZyBvZiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHN0ciBTdHJpbmcgdG8gdHJpbS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgbmV3IHN0cmluZyByZXByZXNlbnRpbmcgYHN0cmAgc3RyaXBwZWQgb2YgY29udHJvbFxuICogICAgIGNoYXJhY3RlcnMgYW5kIHdoaXRlc3BhY2UgZnJvbSBpdHMgYmVnaW5uaW5nLlxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiB0cmltTGVmdChzdHIpIHtcbiAgcmV0dXJuIChzdHIgPyBzdHIgOiAnJykudG9TdHJpbmcoKS5yZXBsYWNlKGNvbnRyb2xPcldoaXRlc3BhY2UsICcnKTtcbn1cblxuLyoqXG4gKiBUaGVzZSBhcmUgdGhlIHBhcnNlIHJ1bGVzIGZvciB0aGUgVVJMIHBhcnNlciwgaXQgaW5mb3JtcyB0aGUgcGFyc2VyXG4gKiBhYm91dDpcbiAqXG4gKiAwLiBUaGUgY2hhciBpdCBOZWVkcyB0byBwYXJzZSwgaWYgaXQncyBhIHN0cmluZyBpdCBzaG91bGQgYmUgZG9uZSB1c2luZ1xuICogICAgaW5kZXhPZiwgUmVnRXhwIHVzaW5nIGV4ZWMgYW5kIE5hTiBtZWFucyBzZXQgYXMgY3VycmVudCB2YWx1ZS5cbiAqIDEuIFRoZSBwcm9wZXJ0eSB3ZSBzaG91bGQgc2V0IHdoZW4gcGFyc2luZyB0aGlzIHZhbHVlLlxuICogMi4gSW5kaWNhdGlvbiBpZiBpdCdzIGJhY2t3YXJkcyBvciBmb3J3YXJkIHBhcnNpbmcsIHdoZW4gc2V0IGFzIG51bWJlciBpdCdzXG4gKiAgICB0aGUgdmFsdWUgb2YgZXh0cmEgY2hhcnMgdGhhdCBzaG91bGQgYmUgc3BsaXQgb2ZmLlxuICogMy4gSW5oZXJpdCBmcm9tIGxvY2F0aW9uIGlmIG5vbiBleGlzdGluZyBpbiB0aGUgcGFyc2VyLlxuICogNC4gYHRvTG93ZXJDYXNlYCB0aGUgcmVzdWx0aW5nIHZhbHVlLlxuICovXG52YXIgcnVsZXMgPSBbXG4gIFsnIycsICdoYXNoJ10sICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJz8nLCAncXVlcnknXSwgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgZnVuY3Rpb24gc2FuaXRpemUoYWRkcmVzcywgdXJsKSB7ICAgICAvLyBTYW5pdGl6ZSB3aGF0IGlzIGxlZnQgb2YgdGhlIGFkZHJlc3NcbiAgICByZXR1cm4gaXNTcGVjaWFsKHVybC5wcm90b2NvbCkgPyBhZGRyZXNzLnJlcGxhY2UoL1xcXFwvZywgJy8nKSA6IGFkZHJlc3M7XG4gIH0sXG4gIFsnLycsICdwYXRobmFtZSddLCAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJ0AnLCAnYXV0aCcsIDFdLCAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgZnJvbnQuXG4gIFtOYU4sICdob3N0JywgdW5kZWZpbmVkLCAxLCAxXSwgICAgICAgLy8gU2V0IGxlZnQgb3ZlciB2YWx1ZS5cbiAgWy86KFxcZCopJC8sICdwb3J0JywgdW5kZWZpbmVkLCAxXSwgICAgLy8gUmVnRXhwIHRoZSBiYWNrLlxuICBbTmFOLCAnaG9zdG5hbWUnLCB1bmRlZmluZWQsIDEsIDFdICAgIC8vIFNldCBsZWZ0IG92ZXIuXG5dO1xuXG4vKipcbiAqIFRoZXNlIHByb3BlcnRpZXMgc2hvdWxkIG5vdCBiZSBjb3BpZWQgb3IgaW5oZXJpdGVkIGZyb20uIFRoaXMgaXMgb25seSBuZWVkZWRcbiAqIGZvciBhbGwgbm9uIGJsb2IgVVJMJ3MgYXMgYSBibG9iIFVSTCBkb2VzIG5vdCBpbmNsdWRlIGEgaGFzaCwgb25seSB0aGVcbiAqIG9yaWdpbi5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmFyIGlnbm9yZSA9IHsgaGFzaDogMSwgcXVlcnk6IDEgfTtcblxuLyoqXG4gKiBUaGUgbG9jYXRpb24gb2JqZWN0IGRpZmZlcnMgd2hlbiB5b3VyIGNvZGUgaXMgbG9hZGVkIHRocm91Z2ggYSBub3JtYWwgcGFnZSxcbiAqIFdvcmtlciBvciB0aHJvdWdoIGEgd29ya2VyIHVzaW5nIGEgYmxvYi4gQW5kIHdpdGggdGhlIGJsb2JibGUgYmVnaW5zIHRoZVxuICogdHJvdWJsZSBhcyB0aGUgbG9jYXRpb24gb2JqZWN0IHdpbGwgY29udGFpbiB0aGUgVVJMIG9mIHRoZSBibG9iLCBub3QgdGhlXG4gKiBsb2NhdGlvbiBvZiB0aGUgcGFnZSB3aGVyZSBvdXIgY29kZSBpcyBsb2FkZWQgaW4uIFRoZSBhY3R1YWwgb3JpZ2luIGlzXG4gKiBlbmNvZGVkIGluIHRoZSBgcGF0aG5hbWVgIHNvIHdlIGNhbiB0aGFua2Z1bGx5IGdlbmVyYXRlIGEgZ29vZCBcImRlZmF1bHRcIlxuICogbG9jYXRpb24gZnJvbSBpdCBzbyB3ZSBjYW4gZ2VuZXJhdGUgcHJvcGVyIHJlbGF0aXZlIFVSTCdzIGFnYWluLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbG9jIE9wdGlvbmFsIGRlZmF1bHQgbG9jYXRpb24gb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gbG9sY2F0aW9uIG9iamVjdC5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gbG9sY2F0aW9uKGxvYykge1xuICB2YXIgZ2xvYmFsVmFyO1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgZ2xvYmFsVmFyID0gd2luZG93O1xuICBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgZ2xvYmFsVmFyID0gZ2xvYmFsO1xuICBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIGdsb2JhbFZhciA9IHNlbGY7XG4gIGVsc2UgZ2xvYmFsVmFyID0ge307XG5cbiAgdmFyIGxvY2F0aW9uID0gZ2xvYmFsVmFyLmxvY2F0aW9uIHx8IHt9O1xuICBsb2MgPSBsb2MgfHwgbG9jYXRpb247XG5cbiAgdmFyIGZpbmFsZGVzdGluYXRpb24gPSB7fVxuICAgICwgdHlwZSA9IHR5cGVvZiBsb2NcbiAgICAsIGtleTtcblxuICBpZiAoJ2Jsb2I6JyA9PT0gbG9jLnByb3RvY29sKSB7XG4gICAgZmluYWxkZXN0aW5hdGlvbiA9IG5ldyBVcmwodW5lc2NhcGUobG9jLnBhdGhuYW1lKSwge30pO1xuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlKSB7XG4gICAgZmluYWxkZXN0aW5hdGlvbiA9IG5ldyBVcmwobG9jLCB7fSk7XG4gICAgZm9yIChrZXkgaW4gaWdub3JlKSBkZWxldGUgZmluYWxkZXN0aW5hdGlvbltrZXldO1xuICB9IGVsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlKSB7XG4gICAgZm9yIChrZXkgaW4gbG9jKSB7XG4gICAgICBpZiAoa2V5IGluIGlnbm9yZSkgY29udGludWU7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uW2tleV0gPSBsb2Nba2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZmluYWxkZXN0aW5hdGlvbi5zbGFzaGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9IHNsYXNoZXMudGVzdChsb2MuaHJlZik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbmFsZGVzdGluYXRpb247XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhIHByb3RvY29sIHNjaGVtZSBpcyBzcGVjaWFsLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBUaGUgcHJvdG9jb2wgc2NoZW1lIG9mIHRoZSBVUkxcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgcHJvdG9jb2wgc2NoZW1lIGlzIHNwZWNpYWwsIGVsc2UgYGZhbHNlYFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNTcGVjaWFsKHNjaGVtZSkge1xuICByZXR1cm4gKFxuICAgIHNjaGVtZSA9PT0gJ2ZpbGU6JyB8fFxuICAgIHNjaGVtZSA9PT0gJ2Z0cDonIHx8XG4gICAgc2NoZW1lID09PSAnaHR0cDonIHx8XG4gICAgc2NoZW1lID09PSAnaHR0cHM6JyB8fFxuICAgIHNjaGVtZSA9PT0gJ3dzOicgfHxcbiAgICBzY2hlbWUgPT09ICd3c3M6J1xuICApO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIFByb3RvY29sRXh0cmFjdFxuICogQHR5cGUgT2JqZWN0XG4gKiBAcHJvcGVydHkge1N0cmluZ30gcHJvdG9jb2wgUHJvdG9jb2wgbWF0Y2hlZCBpbiB0aGUgVVJMLCBpbiBsb3dlcmNhc2UuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IHNsYXNoZXMgYHRydWVgIGlmIHByb3RvY29sIGlzIGZvbGxvd2VkIGJ5IFwiLy9cIiwgZWxzZSBgZmFsc2VgLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IHJlc3QgUmVzdCBvZiB0aGUgVVJMIHRoYXQgaXMgbm90IHBhcnQgb2YgdGhlIHByb3RvY29sLlxuICovXG5cbi8qKlxuICogRXh0cmFjdCBwcm90b2NvbCBpbmZvcm1hdGlvbiBmcm9tIGEgVVJMIHdpdGgvd2l0aG91dCBkb3VibGUgc2xhc2ggKFwiLy9cIikuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgVVJMIHdlIHdhbnQgdG8gZXh0cmFjdCBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IGxvY2F0aW9uXG4gKiBAcmV0dXJuIHtQcm90b2NvbEV4dHJhY3R9IEV4dHJhY3RlZCBpbmZvcm1hdGlvbi5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RQcm90b2NvbChhZGRyZXNzLCBsb2NhdGlvbikge1xuICBhZGRyZXNzID0gdHJpbUxlZnQoYWRkcmVzcyk7XG4gIGFkZHJlc3MgPSBhZGRyZXNzLnJlcGxhY2UoQ1JIVExGLCAnJyk7XG4gIGxvY2F0aW9uID0gbG9jYXRpb24gfHwge307XG5cbiAgdmFyIG1hdGNoID0gcHJvdG9jb2xyZS5leGVjKGFkZHJlc3MpO1xuICB2YXIgcHJvdG9jb2wgPSBtYXRjaFsxXSA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiAnJztcbiAgdmFyIGZvcndhcmRTbGFzaGVzID0gISFtYXRjaFsyXTtcbiAgdmFyIG90aGVyU2xhc2hlcyA9ICEhbWF0Y2hbM107XG4gIHZhciBzbGFzaGVzQ291bnQgPSAwO1xuICB2YXIgcmVzdDtcblxuICBpZiAoZm9yd2FyZFNsYXNoZXMpIHtcbiAgICBpZiAob3RoZXJTbGFzaGVzKSB7XG4gICAgICByZXN0ID0gbWF0Y2hbMl0gKyBtYXRjaFszXSArIG1hdGNoWzRdO1xuICAgICAgc2xhc2hlc0NvdW50ID0gbWF0Y2hbMl0ubGVuZ3RoICsgbWF0Y2hbM10ubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN0ID0gbWF0Y2hbMl0gKyBtYXRjaFs0XTtcbiAgICAgIHNsYXNoZXNDb3VudCA9IG1hdGNoWzJdLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG90aGVyU2xhc2hlcykge1xuICAgICAgcmVzdCA9IG1hdGNoWzNdICsgbWF0Y2hbNF07XG4gICAgICBzbGFzaGVzQ291bnQgPSBtYXRjaFszXS5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3QgPSBtYXRjaFs0XVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcm90b2NvbCA9PT0gJ2ZpbGU6Jykge1xuICAgIGlmIChzbGFzaGVzQ291bnQgPj0gMikge1xuICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoMik7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzU3BlY2lhbChwcm90b2NvbCkpIHtcbiAgICByZXN0ID0gbWF0Y2hbNF07XG4gIH0gZWxzZSBpZiAocHJvdG9jb2wpIHtcbiAgICBpZiAoZm9yd2FyZFNsYXNoZXMpIHtcbiAgICAgIHJlc3QgPSByZXN0LnNsaWNlKDIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChzbGFzaGVzQ291bnQgPj0gMiAmJiBpc1NwZWNpYWwobG9jYXRpb24ucHJvdG9jb2wpKSB7XG4gICAgcmVzdCA9IG1hdGNoWzRdO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwcm90b2NvbDogcHJvdG9jb2wsXG4gICAgc2xhc2hlczogZm9yd2FyZFNsYXNoZXMgfHwgaXNTcGVjaWFsKHByb3RvY29sKSxcbiAgICBzbGFzaGVzQ291bnQ6IHNsYXNoZXNDb3VudCxcbiAgICByZXN0OiByZXN0XG4gIH07XG59XG5cbi8qKlxuICogUmVzb2x2ZSBhIHJlbGF0aXZlIFVSTCBwYXRobmFtZSBhZ2FpbnN0IGEgYmFzZSBVUkwgcGF0aG5hbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aXZlIFBhdGhuYW1lIG9mIHRoZSByZWxhdGl2ZSBVUkwuXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZSBQYXRobmFtZSBvZiB0aGUgYmFzZSBVUkwuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJlc29sdmVkIHBhdGhuYW1lLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZShyZWxhdGl2ZSwgYmFzZSkge1xuICBpZiAocmVsYXRpdmUgPT09ICcnKSByZXR1cm4gYmFzZTtcblxuICB2YXIgcGF0aCA9IChiYXNlIHx8ICcvJykuc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuY29uY2F0KHJlbGF0aXZlLnNwbGl0KCcvJykpXG4gICAgLCBpID0gcGF0aC5sZW5ndGhcbiAgICAsIGxhc3QgPSBwYXRoW2kgLSAxXVxuICAgICwgdW5zaGlmdCA9IGZhbHNlXG4gICAgLCB1cCA9IDA7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGlmIChwYXRoW2ldID09PSAnLicpIHtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAocGF0aFtpXSA9PT0gJy4uJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIGlmIChpID09PSAwKSB1bnNoaWZ0ID0gdHJ1ZTtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAodW5zaGlmdCkgcGF0aC51bnNoaWZ0KCcnKTtcbiAgaWYgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSBwYXRoLnB1c2goJycpO1xuXG4gIHJldHVybiBwYXRoLmpvaW4oJy8nKTtcbn1cblxuLyoqXG4gKiBUaGUgYWN0dWFsIFVSTCBpbnN0YW5jZS4gSW5zdGVhZCBvZiByZXR1cm5pbmcgYW4gb2JqZWN0IHdlJ3ZlIG9wdGVkLWluIHRvXG4gKiBjcmVhdGUgYW4gYWN0dWFsIGNvbnN0cnVjdG9yIGFzIGl0J3MgbXVjaCBtb3JlIG1lbW9yeSBlZmZpY2llbnQgYW5kXG4gKiBmYXN0ZXIgYW5kIGl0IHBsZWFzZXMgbXkgT0NELlxuICpcbiAqIEl0IGlzIHdvcnRoIG5vdGluZyB0aGF0IHdlIHNob3VsZCBub3QgdXNlIGBVUkxgIGFzIGNsYXNzIG5hbWUgdG8gcHJldmVudFxuICogY2xhc2hlcyB3aXRoIHRoZSBnbG9iYWwgVVJMIGluc3RhbmNlIHRoYXQgZ290IGludHJvZHVjZWQgaW4gYnJvd3NlcnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBwYXJzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gW2xvY2F0aW9uXSBMb2NhdGlvbiBkZWZhdWx0cyBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IFtwYXJzZXJdIFBhcnNlciBmb3IgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIFVybChhZGRyZXNzLCBsb2NhdGlvbiwgcGFyc2VyKSB7XG4gIGFkZHJlc3MgPSB0cmltTGVmdChhZGRyZXNzKTtcbiAgYWRkcmVzcyA9IGFkZHJlc3MucmVwbGFjZShDUkhUTEYsICcnKTtcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVXJsKSkge1xuICAgIHJldHVybiBuZXcgVXJsKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpO1xuICB9XG5cbiAgdmFyIHJlbGF0aXZlLCBleHRyYWN0ZWQsIHBhcnNlLCBpbnN0cnVjdGlvbiwgaW5kZXgsIGtleVxuICAgICwgaW5zdHJ1Y3Rpb25zID0gcnVsZXMuc2xpY2UoKVxuICAgICwgdHlwZSA9IHR5cGVvZiBsb2NhdGlvblxuICAgICwgdXJsID0gdGhpc1xuICAgICwgaSA9IDA7XG5cbiAgLy9cbiAgLy8gVGhlIGZvbGxvd2luZyBpZiBzdGF0ZW1lbnRzIGFsbG93cyB0aGlzIG1vZHVsZSB0d28gaGF2ZSBjb21wYXRpYmlsaXR5IHdpdGhcbiAgLy8gMiBkaWZmZXJlbnQgQVBJOlxuICAvL1xuICAvLyAxLiBOb2RlLmpzJ3MgYHVybC5wYXJzZWAgYXBpIHdoaWNoIGFjY2VwdHMgYSBVUkwsIGJvb2xlYW4gYXMgYXJndW1lbnRzXG4gIC8vICAgIHdoZXJlIHRoZSBib29sZWFuIGluZGljYXRlcyB0aGF0IHRoZSBxdWVyeSBzdHJpbmcgc2hvdWxkIGFsc28gYmUgcGFyc2VkLlxuICAvL1xuICAvLyAyLiBUaGUgYFVSTGAgaW50ZXJmYWNlIG9mIHRoZSBicm93c2VyIHdoaWNoIGFjY2VwdHMgYSBVUkwsIG9iamVjdCBhc1xuICAvLyAgICBhcmd1bWVudHMuIFRoZSBzdXBwbGllZCBvYmplY3Qgd2lsbCBiZSB1c2VkIGFzIGRlZmF1bHQgdmFsdWVzIC8gZmFsbC1iYWNrXG4gIC8vICAgIGZvciByZWxhdGl2ZSBwYXRocy5cbiAgLy9cbiAgaWYgKCdvYmplY3QnICE9PSB0eXBlICYmICdzdHJpbmcnICE9PSB0eXBlKSB7XG4gICAgcGFyc2VyID0gbG9jYXRpb247XG4gICAgbG9jYXRpb24gPSBudWxsO1xuICB9XG5cbiAgaWYgKHBhcnNlciAmJiAnZnVuY3Rpb24nICE9PSB0eXBlb2YgcGFyc2VyKSBwYXJzZXIgPSBxcy5wYXJzZTtcblxuICBsb2NhdGlvbiA9IGxvbGNhdGlvbihsb2NhdGlvbik7XG5cbiAgLy9cbiAgLy8gRXh0cmFjdCBwcm90b2NvbCBpbmZvcm1hdGlvbiBiZWZvcmUgcnVubmluZyB0aGUgaW5zdHJ1Y3Rpb25zLlxuICAvL1xuICBleHRyYWN0ZWQgPSBleHRyYWN0UHJvdG9jb2woYWRkcmVzcyB8fCAnJywgbG9jYXRpb24pO1xuICByZWxhdGl2ZSA9ICFleHRyYWN0ZWQucHJvdG9jb2wgJiYgIWV4dHJhY3RlZC5zbGFzaGVzO1xuICB1cmwuc2xhc2hlcyA9IGV4dHJhY3RlZC5zbGFzaGVzIHx8IHJlbGF0aXZlICYmIGxvY2F0aW9uLnNsYXNoZXM7XG4gIHVybC5wcm90b2NvbCA9IGV4dHJhY3RlZC5wcm90b2NvbCB8fCBsb2NhdGlvbi5wcm90b2NvbCB8fCAnJztcbiAgYWRkcmVzcyA9IGV4dHJhY3RlZC5yZXN0O1xuXG4gIC8vXG4gIC8vIFdoZW4gdGhlIGF1dGhvcml0eSBjb21wb25lbnQgaXMgYWJzZW50IHRoZSBVUkwgc3RhcnRzIHdpdGggYSBwYXRoXG4gIC8vIGNvbXBvbmVudC5cbiAgLy9cbiAgaWYgKFxuICAgIGV4dHJhY3RlZC5wcm90b2NvbCA9PT0gJ2ZpbGU6JyAmJiAoXG4gICAgICBleHRyYWN0ZWQuc2xhc2hlc0NvdW50ICE9PSAyIHx8IHdpbmRvd3NEcml2ZUxldHRlci50ZXN0KGFkZHJlc3MpKSB8fFxuICAgICghZXh0cmFjdGVkLnNsYXNoZXMgJiZcbiAgICAgIChleHRyYWN0ZWQucHJvdG9jb2wgfHxcbiAgICAgICAgZXh0cmFjdGVkLnNsYXNoZXNDb3VudCA8IDIgfHxcbiAgICAgICAgIWlzU3BlY2lhbCh1cmwucHJvdG9jb2wpKSlcbiAgKSB7XG4gICAgaW5zdHJ1Y3Rpb25zWzNdID0gWy8oLiopLywgJ3BhdGhuYW1lJ107XG4gIH1cblxuICBmb3IgKDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIGluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zW2ldO1xuXG4gICAgaWYgKHR5cGVvZiBpbnN0cnVjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYWRkcmVzcyA9IGluc3RydWN0aW9uKGFkZHJlc3MsIHVybCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBwYXJzZSA9IGluc3RydWN0aW9uWzBdO1xuICAgIGtleSA9IGluc3RydWN0aW9uWzFdO1xuXG4gICAgaWYgKHBhcnNlICE9PSBwYXJzZSkge1xuICAgICAgdXJsW2tleV0gPSBhZGRyZXNzO1xuICAgIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBwYXJzZSkge1xuICAgICAgaW5kZXggPSBwYXJzZSA9PT0gJ0AnXG4gICAgICAgID8gYWRkcmVzcy5sYXN0SW5kZXhPZihwYXJzZSlcbiAgICAgICAgOiBhZGRyZXNzLmluZGV4T2YocGFyc2UpO1xuXG4gICAgICBpZiAofmluZGV4KSB7XG4gICAgICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIGluc3RydWN0aW9uWzJdKSB7XG4gICAgICAgICAgdXJsW2tleV0gPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZShpbmRleCArIGluc3RydWN0aW9uWzJdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKGluZGV4ID0gcGFyc2UuZXhlYyhhZGRyZXNzKSkpIHtcbiAgICAgIHVybFtrZXldID0gaW5kZXhbMV07XG4gICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleC5pbmRleCk7XG4gICAgfVxuXG4gICAgdXJsW2tleV0gPSB1cmxba2V5XSB8fCAoXG4gICAgICByZWxhdGl2ZSAmJiBpbnN0cnVjdGlvblszXSA/IGxvY2F0aW9uW2tleV0gfHwgJycgOiAnJ1xuICAgICk7XG5cbiAgICAvL1xuICAgIC8vIEhvc3RuYW1lLCBob3N0IGFuZCBwcm90b2NvbCBzaG91bGQgYmUgbG93ZXJjYXNlZCBzbyB0aGV5IGNhbiBiZSB1c2VkIHRvXG4gICAgLy8gY3JlYXRlIGEgcHJvcGVyIGBvcmlnaW5gLlxuICAgIC8vXG4gICAgaWYgKGluc3RydWN0aW9uWzRdKSB1cmxba2V5XSA9IHVybFtrZXldLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICAvL1xuICAvLyBBbHNvIHBhcnNlIHRoZSBzdXBwbGllZCBxdWVyeSBzdHJpbmcgaW4gdG8gYW4gb2JqZWN0LiBJZiB3ZSdyZSBzdXBwbGllZFxuICAvLyB3aXRoIGEgY3VzdG9tIHBhcnNlciBhcyBmdW5jdGlvbiB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGJ1aWxkLWluXG4gIC8vIHBhcnNlci5cbiAgLy9cbiAgaWYgKHBhcnNlcikgdXJsLnF1ZXJ5ID0gcGFyc2VyKHVybC5xdWVyeSk7XG5cbiAgLy9cbiAgLy8gSWYgdGhlIFVSTCBpcyByZWxhdGl2ZSwgcmVzb2x2ZSB0aGUgcGF0aG5hbWUgYWdhaW5zdCB0aGUgYmFzZSBVUkwuXG4gIC8vXG4gIGlmIChcbiAgICAgIHJlbGF0aXZlXG4gICAgJiYgbG9jYXRpb24uc2xhc2hlc1xuICAgICYmIHVybC5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJ1xuICAgICYmICh1cmwucGF0aG5hbWUgIT09ICcnIHx8IGxvY2F0aW9uLnBhdGhuYW1lICE9PSAnJylcbiAgKSB7XG4gICAgdXJsLnBhdGhuYW1lID0gcmVzb2x2ZSh1cmwucGF0aG5hbWUsIGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfVxuXG4gIC8vXG4gIC8vIERlZmF1bHQgdG8gYSAvIGZvciBwYXRobmFtZSBpZiBub25lIGV4aXN0cy4gVGhpcyBub3JtYWxpemVzIHRoZSBVUkxcbiAgLy8gdG8gYWx3YXlzIGhhdmUgYSAvXG4gIC8vXG4gIGlmICh1cmwucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycgJiYgaXNTcGVjaWFsKHVybC5wcm90b2NvbCkpIHtcbiAgICB1cmwucGF0aG5hbWUgPSAnLycgKyB1cmwucGF0aG5hbWU7XG4gIH1cblxuICAvL1xuICAvLyBXZSBzaG91bGQgbm90IGFkZCBwb3J0IG51bWJlcnMgaWYgdGhleSBhcmUgYWxyZWFkeSB0aGUgZGVmYXVsdCBwb3J0IG51bWJlclxuICAvLyBmb3IgYSBnaXZlbiBwcm90b2NvbC4gQXMgdGhlIGhvc3QgYWxzbyBjb250YWlucyB0aGUgcG9ydCBudW1iZXIgd2UncmUgZ29pbmdcbiAgLy8gb3ZlcnJpZGUgaXQgd2l0aCB0aGUgaG9zdG5hbWUgd2hpY2ggY29udGFpbnMgbm8gcG9ydCBudW1iZXIuXG4gIC8vXG4gIGlmICghcmVxdWlyZWQodXJsLnBvcnQsIHVybC5wcm90b2NvbCkpIHtcbiAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZTtcbiAgICB1cmwucG9ydCA9ICcnO1xuICB9XG5cbiAgLy9cbiAgLy8gUGFyc2UgZG93biB0aGUgYGF1dGhgIGZvciB0aGUgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLlxuICAvL1xuICB1cmwudXNlcm5hbWUgPSB1cmwucGFzc3dvcmQgPSAnJztcblxuICBpZiAodXJsLmF1dGgpIHtcbiAgICBpbmRleCA9IHVybC5hdXRoLmluZGV4T2YoJzonKTtcblxuICAgIGlmICh+aW5kZXgpIHtcbiAgICAgIHVybC51c2VybmFtZSA9IHVybC5hdXRoLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgIHVybC51c2VybmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodXJsLnVzZXJuYW1lKSk7XG5cbiAgICAgIHVybC5wYXNzd29yZCA9IHVybC5hdXRoLnNsaWNlKGluZGV4ICsgMSk7XG4gICAgICB1cmwucGFzc3dvcmQgPSBlbmNvZGVVUklDb21wb25lbnQoZGVjb2RlVVJJQ29tcG9uZW50KHVybC5wYXNzd29yZCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHVybC51c2VybmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodXJsLmF1dGgpKTtcbiAgICB9XG5cbiAgICB1cmwuYXV0aCA9IHVybC5wYXNzd29yZCA/IHVybC51c2VybmFtZSArJzonKyB1cmwucGFzc3dvcmQgOiB1cmwudXNlcm5hbWU7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICE9PSAnZmlsZTonICYmIGlzU3BlY2lhbCh1cmwucHJvdG9jb2wpICYmIHVybC5ob3N0XG4gICAgPyB1cmwucHJvdG9jb2wgKycvLycrIHVybC5ob3N0XG4gICAgOiAnbnVsbCc7XG5cbiAgLy9cbiAgLy8gVGhlIGhyZWYgaXMganVzdCB0aGUgY29tcGlsZWQgcmVzdWx0LlxuICAvL1xuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjaGFuZ2luZyBwcm9wZXJ0aWVzIGluIHRoZSBVUkwgaW5zdGFuY2UgdG9cbiAqIGluc3VyZSB0aGF0IHRoZXkgYWxsIHByb3BhZ2F0ZSBjb3JyZWN0bHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcnQgICAgICAgICAgUHJvcGVydHkgd2UgbmVlZCB0byBhZGp1c3QuXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAgICAgICAgICBUaGUgbmV3bHkgYXNzaWduZWQgdmFsdWUuXG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IGZuICBXaGVuIHNldHRpbmcgdGhlIHF1ZXJ5LCBpdCB3aWxsIGJlIHRoZSBmdW5jdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZCB0byBwYXJzZSB0aGUgcXVlcnkuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaGVuIHNldHRpbmcgdGhlIHByb3RvY29sLCBkb3VibGUgc2xhc2ggd2lsbCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBmaW5hbCB1cmwgaWYgaXQgaXMgdHJ1ZS5cbiAqIEByZXR1cm5zIHtVUkx9IFVSTCBpbnN0YW5jZSBmb3IgY2hhaW5pbmcuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHNldChwYXJ0LCB2YWx1ZSwgZm4pIHtcbiAgdmFyIHVybCA9IHRoaXM7XG5cbiAgc3dpdGNoIChwYXJ0KSB7XG4gICAgY2FzZSAncXVlcnknOlxuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHZhbHVlID0gKGZuIHx8IHFzLnBhcnNlKSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwb3J0JzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAoIXJlcXVpcmVkKHZhbHVlLCB1cmwucHJvdG9jb2wpKSB7XG4gICAgICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgICAgICB1cmxbcGFydF0gPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWUgKyc6JysgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICh1cmwucG9ydCkgdmFsdWUgKz0gJzonKyB1cmwucG9ydDtcbiAgICAgIHVybC5ob3N0ID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hvc3QnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmIChwb3J0LnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJzonKTtcbiAgICAgICAgdXJsLnBvcnQgPSB2YWx1ZS5wb3AoKTtcbiAgICAgICAgdXJsLmhvc3RuYW1lID0gdmFsdWUuam9pbignOicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsLmhvc3RuYW1lID0gdmFsdWU7XG4gICAgICAgIHVybC5wb3J0ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncHJvdG9jb2wnOlxuICAgICAgdXJsLnByb3RvY29sID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHVybC5zbGFzaGVzID0gIWZuO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwYXRobmFtZSc6XG4gICAgY2FzZSAnaGFzaCc6XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGNoYXIgPSBwYXJ0ID09PSAncGF0aG5hbWUnID8gJy8nIDogJyMnO1xuICAgICAgICB1cmxbcGFydF0gPSB2YWx1ZS5jaGFyQXQoMCkgIT09IGNoYXIgPyBjaGFyICsgdmFsdWUgOiB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICd1c2VybmFtZSc6XG4gICAgY2FzZSAncGFzc3dvcmQnOlxuICAgICAgdXJsW3BhcnRdID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYXV0aCc6XG4gICAgICB2YXIgaW5kZXggPSB2YWx1ZS5pbmRleE9mKCc6Jyk7XG5cbiAgICAgIGlmICh+aW5kZXgpIHtcbiAgICAgICAgdXJsLnVzZXJuYW1lID0gdmFsdWUuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICB1cmwudXNlcm5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQoZGVjb2RlVVJJQ29tcG9uZW50KHVybC51c2VybmFtZSkpO1xuXG4gICAgICAgIHVybC5wYXNzd29yZCA9IHZhbHVlLnNsaWNlKGluZGV4ICsgMSk7XG4gICAgICAgIHVybC5wYXNzd29yZCA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodXJsLnBhc3N3b3JkKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmwudXNlcm5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQoZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGlucyA9IHJ1bGVzW2ldO1xuXG4gICAgaWYgKGluc1s0XSkgdXJsW2luc1sxXV0gPSB1cmxbaW5zWzFdXS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgdXJsLmF1dGggPSB1cmwucGFzc3dvcmQgPyB1cmwudXNlcm5hbWUgKyc6JysgdXJsLnBhc3N3b3JkIDogdXJsLnVzZXJuYW1lO1xuXG4gIHVybC5vcmlnaW4gPSB1cmwucHJvdG9jb2wgIT09ICdmaWxlOicgJiYgaXNTcGVjaWFsKHVybC5wcm90b2NvbCkgJiYgdXJsLmhvc3RcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xuXG4gIHJldHVybiB1cmw7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBwcm9wZXJ0aWVzIGJhY2sgaW4gdG8gYSB2YWxpZCBhbmQgZnVsbCBVUkwgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZ2lmeSBPcHRpb25hbCBxdWVyeSBzdHJpbmdpZnkgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBDb21waWxlZCB2ZXJzaW9uIG9mIHRoZSBVUkwuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHN0cmluZ2lmeSkge1xuICBpZiAoIXN0cmluZ2lmeSB8fCAnZnVuY3Rpb24nICE9PSB0eXBlb2Ygc3RyaW5naWZ5KSBzdHJpbmdpZnkgPSBxcy5zdHJpbmdpZnk7XG5cbiAgdmFyIHF1ZXJ5XG4gICAgLCB1cmwgPSB0aGlzXG4gICAgLCBob3N0ID0gdXJsLmhvc3RcbiAgICAsIHByb3RvY29sID0gdXJsLnByb3RvY29sO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5jaGFyQXQocHJvdG9jb2wubGVuZ3RoIC0gMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIHZhciByZXN1bHQgPVxuICAgIHByb3RvY29sICtcbiAgICAoKHVybC5wcm90b2NvbCAmJiB1cmwuc2xhc2hlcykgfHwgaXNTcGVjaWFsKHVybC5wcm90b2NvbCkgPyAnLy8nIDogJycpO1xuXG4gIGlmICh1cmwudXNlcm5hbWUpIHtcbiAgICByZXN1bHQgKz0gdXJsLnVzZXJuYW1lO1xuICAgIGlmICh1cmwucGFzc3dvcmQpIHJlc3VsdCArPSAnOicrIHVybC5wYXNzd29yZDtcbiAgICByZXN1bHQgKz0gJ0AnO1xuICB9IGVsc2UgaWYgKHVybC5wYXNzd29yZCkge1xuICAgIHJlc3VsdCArPSAnOicrIHVybC5wYXNzd29yZDtcbiAgICByZXN1bHQgKz0gJ0AnO1xuICB9IGVsc2UgaWYgKFxuICAgIHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6JyAmJlxuICAgIGlzU3BlY2lhbCh1cmwucHJvdG9jb2wpICYmXG4gICAgIWhvc3QgJiZcbiAgICB1cmwucGF0aG5hbWUgIT09ICcvJ1xuICApIHtcbiAgICAvL1xuICAgIC8vIEFkZCBiYWNrIHRoZSBlbXB0eSB1c2VyaW5mbywgb3RoZXJ3aXNlIHRoZSBvcmlnaW5hbCBpbnZhbGlkIFVSTFxuICAgIC8vIG1pZ2h0IGJlIHRyYW5zZm9ybWVkIGludG8gYSB2YWxpZCBvbmUgd2l0aCBgdXJsLnBhdGhuYW1lYCBhcyBob3N0LlxuICAgIC8vXG4gICAgcmVzdWx0ICs9ICdAJztcbiAgfVxuXG4gIC8vXG4gIC8vIFRyYWlsaW5nIGNvbG9uIGlzIHJlbW92ZWQgZnJvbSBgdXJsLmhvc3RgIHdoZW4gaXQgaXMgcGFyc2VkLiBJZiBpdCBzdGlsbFxuICAvLyBlbmRzIHdpdGggYSBjb2xvbiwgdGhlbiBhZGQgYmFjayB0aGUgdHJhaWxpbmcgY29sb24gdGhhdCB3YXMgcmVtb3ZlZC4gVGhpc1xuICAvLyBwcmV2ZW50cyBhbiBpbnZhbGlkIFVSTCBmcm9tIGJlaW5nIHRyYW5zZm9ybWVkIGludG8gYSB2YWxpZCBvbmUuXG4gIC8vXG4gIGlmIChob3N0W2hvc3QubGVuZ3RoIC0gMV0gPT09ICc6JyB8fCAocG9ydC50ZXN0KHVybC5ob3N0bmFtZSkgJiYgIXVybC5wb3J0KSkge1xuICAgIGhvc3QgKz0gJzonO1xuICB9XG5cbiAgcmVzdWx0ICs9IGhvc3QgKyB1cmwucGF0aG5hbWU7XG5cbiAgcXVlcnkgPSAnb2JqZWN0JyA9PT0gdHlwZW9mIHVybC5xdWVyeSA/IHN0cmluZ2lmeSh1cmwucXVlcnkpIDogdXJsLnF1ZXJ5O1xuICBpZiAocXVlcnkpIHJlc3VsdCArPSAnPycgIT09IHF1ZXJ5LmNoYXJBdCgwKSA/ICc/JysgcXVlcnkgOiBxdWVyeTtcblxuICBpZiAodXJsLmhhc2gpIHJlc3VsdCArPSB1cmwuaGFzaDtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5VcmwucHJvdG90eXBlID0geyBzZXQ6IHNldCwgdG9TdHJpbmc6IHRvU3RyaW5nIH07XG5cbi8vXG4vLyBFeHBvc2UgdGhlIFVSTCBwYXJzZXIgYW5kIHNvbWUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRoYXQgbWlnaHQgYmUgdXNlZnVsIGZvclxuLy8gb3RoZXJzIG9yIHRlc3RpbmcuXG4vL1xuVXJsLmV4dHJhY3RQcm90b2NvbCA9IGV4dHJhY3RQcm90b2NvbDtcblVybC5sb2NhdGlvbiA9IGxvbGNhdGlvbjtcblVybC50cmltTGVmdCA9IHRyaW1MZWZ0O1xuVXJsLnFzID0gcXM7XG5cbm1vZHVsZS5leHBvcnRzID0gVXJsO1xuIiwgIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5qb2luID0gZXhwb3J0cy5nZXRRdWVyeVBhcmFtcyA9IGV4cG9ydHMud2l0aFF1ZXJ5UGFyYW1zID0gdm9pZCAwO1xuY29uc3QgZW5zdXJlXzEgPSByZXF1aXJlKFwiLi9lbnN1cmVcIik7XG5jb25zdCBxc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJxc1wiKSk7XG5jb25zdCB1cmxfcGFyc2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwidXJsLXBhcnNlXCIpKTtcbi8qKlxuICogSGVscGVyIHRvIGNyZWF0ZSBhIG5ldyBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtZXRlcnMgdG8gYSBiYXNlIFVSTC5cbiAqXG4gKiBUaGUgaW5wdXQgVVJMIG1heSBvciBtYXkgbm90IGhhdmluZyBleGlzdGluZyBwYXJhbWV0ZXJzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIC8vIFJldHVybnMgYFwiL3NvbWVBcGkvc29tZUVuZHBvaW50P3Rva2VuPWFzZGYmbGltaXQ9NVwiYFxuICogbGV0IHVybCA9IHdpdGhRdWVyeVBhcmFtcyhcIi9zb21lQXBpL3NvbWVFbmRwb2ludFwiLCB7dG9rZW46IFwiYXNkZlwiLCBsaW1pdDogNX0pO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIHdpdGhRdWVyeVBhcmFtcyh1cmwsIHBhcmFtcykge1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICAgIGNvbnN0IHBhcnNlZFVybCA9ICgwLCB1cmxfcGFyc2VfMS5kZWZhdWx0KSh1cmwpO1xuICAgIC8vIE1lcmdlIHRoZSBwYXJhbXMgdG9nZXRoZXJcbiAgICBjb25zdCB1cGRhdGVkUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcXNfMS5kZWZhdWx0LnBhcnNlKHBhcnNlZFVybC5xdWVyeSwgeyBpZ25vcmVRdWVyeVByZWZpeDogdHJ1ZSB9KSwgcGFyYW1zKTtcbiAgICBwYXJzZWRVcmwuc2V0KCdxdWVyeScsIHFzXzEuZGVmYXVsdC5zdHJpbmdpZnkoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh1cGRhdGVkUGFyYW1zKSksIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSkpO1xuICAgIHJldHVybiBwYXJzZWRVcmwudG9TdHJpbmcoKTtcbn1cbmV4cG9ydHMud2l0aFF1ZXJ5UGFyYW1zID0gd2l0aFF1ZXJ5UGFyYW1zO1xuLyoqXG4gKiBIZWxwZXIgdG8gdGFrZSBhIFVSTCBzdHJpbmcgYW5kIHJldHVybiB0aGUgcGFyYW1ldGVycyAoaWYgYW55KSBhcyBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIC8vIFJldHVybnMgYHt0b2tlbjogXCJhc2RmXCIsIGxpbWl0OiBcIjVcIn1gXG4gKiBsZXQgcGFyYW1zID0gZ2V0UXVlcnlQYXJhbXMoXCIvc29tZUFwaS9zb21lRW5kcG9pbnQ/dG9rZW49YXNkZiZsaW1pdD01XCIpO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIGdldFF1ZXJ5UGFyYW1zKHVybCkge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9ICgwLCB1cmxfcGFyc2VfMS5kZWZhdWx0KSh1cmwpO1xuICAgIC8vIE1lcmdlIHRoZSBwYXJhbXMgdG9nZXRoZXJcbiAgICByZXR1cm4gcXNfMS5kZWZhdWx0LnBhcnNlKHBhcnNlZFVybC5xdWVyeSwgeyBpZ25vcmVRdWVyeVByZWZpeDogdHJ1ZSB9KTtcbn1cbmV4cG9ydHMuZ2V0UXVlcnlQYXJhbXMgPSBnZXRRdWVyeVBhcmFtcztcbi8qKlxuICogSm9pbnMgYWxsIHRoZSB0b2tlbnMgaW50byBhIHNpbmdsZSBVUkwgc3RyaW5nIHNlcGFyYXRlZCBieSAnLycuIFplcm8gbGVuZ3RoIHRva2VucyBjYXVzZSBlcnJvcnMuXG4gKiBAcGFyYW0gdG9rZW5zIFplcm8gb3IgbW9yZSB0b2tlbnMgdG8gYmUgY29tYmluZWQuIElmIHRva2VuIGRvZXNuJ3QgZW5kIHdpdGggJy8nLCBvbmUgd2lsbCBiZSBhZGRlZCBhcyB0aGUgc2VwYXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGpvaW4oLi4udG9rZW5zKSB7XG4gICAgaWYgKCF0b2tlbnMgfHwgIXRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBjb21iaW5lZFRva2VucyA9IFtdO1xuICAgIGZvciAoY29uc3QgdG9rZW4gb2YgdG9rZW5zKSB7XG4gICAgICAgICgwLCBlbnN1cmVfMS5lbnN1cmVOb25FbXB0eVN0cmluZykodG9rZW4pO1xuICAgICAgICBpZiAoY29tYmluZWRUb2tlbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb21iaW5lZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVuc3VyZSB0b2tlbnMgKG90aGVyIHRoYW4gdGhlIGZpcnN0KSBkb24ndCBoYXZlIGxlYWRpbmcgc2xhc2hlc1xuICAgICAgICAgICAgY29tYmluZWRUb2tlbnMucHVzaCh0b2tlbi5yZXBsYWNlKC9eXFwvKy8sICcnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b2tlbi5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICBjb21iaW5lZFRva2Vucy5wdXNoKCcvJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29tYmluZWQgPSBjb21iaW5lZFRva2Vucy5qb2luKCcnKTtcbiAgICBpZiAoIXRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0uZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICAvLyBVc2VyIGRpZG4ndCBwcm92aWRlIHRva2VuIHdpdGggLywgc3RyaXAgb3V0IHRoZSBsYXN0IG9uZVxuICAgICAgICByZXR1cm4gY29tYmluZWQuc2xpY2UoMCwgY29tYmluZWQubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiBjb21iaW5lZDtcbn1cbmV4cG9ydHMuam9pbiA9IGpvaW47XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlT2JqZWN0UmVzcG9uc2VIYW5kbGVyID0gZXhwb3J0cy51bnRyYW5zZm9ybUtleXMgPSBleHBvcnRzLnVudHJhbnNmb3JtQm9keSA9IGV4cG9ydHMudHJhbnNmb3JtQm9keSA9IGV4cG9ydHMuZ2VuZXJhdGVSZXF1ZXN0SGFuZGxlciA9IHZvaWQgMDtcbmNvbnN0IGNsb25lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNsb25lXCIpKTtcbmNvbnN0IG9iamVjdF91dGlsc18xID0gcmVxdWlyZShcIi4vaGVscGVycy9vYmplY3RfdXRpbHNcIik7XG5jb25zdCBlbnN1cmVfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuY29uc3Qgc2NoZW1hXzEgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5jb25zdCBzY2hlbWFfMiA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbmNvbnN0IHVybF8xID0gcmVxdWlyZShcIi4vaGVscGVycy91cmxcIik7XG5mdW5jdGlvbiBnZW5lcmF0ZVBhcmFtTWFwKGtleXMsIG5hbWVUb1ZhbHVlTWFwLCBvcHRpb25hbE5hbWVzKSB7XG4gICAgY29uc3QgbWFwID0ge307XG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCB2YWwgPSBuYW1lVG9WYWx1ZU1hcFtrZXldO1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25hbE5hbWVzICYmIG9wdGlvbmFsTmFtZXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOZXZlciBwYXNzIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhbCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIG1hcFtrZXldID0gdmFsO1xuICAgIH0pO1xuICAgIHJldHVybiBtYXA7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVF1ZXJ5UGFyYW1NYXAoa2V5cywgbmFtZVRvVmFsdWVNYXAsIG9wdGlvbmFsTmFtZXMpIHtcbiAgICBjb25zdCBtYXAgPSB7fTtcbiAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IHZhbCA9IG5hbWVUb1ZhbHVlTWFwW2tleV07XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbmFsTmFtZXMgJiYgb3B0aW9uYWxOYW1lcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5ldmVyIHBhc3MgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFsID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgbWFwW2tleV0gPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBtYXA7XG59XG4vLyBBIHF1aWNrIGltcGxlbWVuYXRpb24gb2Ygc3RyaW5nLXRlbXBsYXRlLiBOZWVkIHRvIHJlbW92ZSB0aGUgcGFja2FnZSBiZWNhdXNlIGl0IHVzZXMgdGhlXG4vLyBgbmV3IEZ1bmN0aW9uKDxjb2RlPilgIHN5bnRheC5cbmZ1bmN0aW9uIGZvcm1hdFN0cmluZyh0ZW1wbGF0ZSwgcGFyYW1zKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRlbXBsYXRlO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHBhcmFtcykpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoYHske2tleX19YCwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVSZXF1ZXN0SGFuZGxlcihyZXF1ZXN0LCBwYXJhbWV0ZXJzKSB7XG4gICAgY29uc3QgeyB1cmwsIHF1ZXJ5UGFyYW1zLCBuYW1lTWFwcGluZzogcGFyYW1OYW1lTWFwcGluZywgYm9keVRlbXBsYXRlLCBib2R5UGFyYW1zLCBtZXRob2QsIGhlYWRlcnMsIHRyYW5zZm9ybXMsIH0gPSByZXF1ZXN0O1xuICAgIC8vIEdlbmVyYXRlIGEgbWFwIGZyb20gaW5kZXggdG8gbmFtZSB0aGF0IHdlIHdpbGwgdXNlIHRvIGJpbmQgYXJncyB0byB0aGUgYXBwcm9wcmlhdGUgc3BvdHMuXG4gICAgY29uc3QgaW5kZXhUb05hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgbmFtZXMgPSBuZXcgU2V0KCk7XG4gICAgY29uc3Qgb3B0aW9uYWxOYW1lcyA9IG5ldyBTZXQoKTtcbiAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBjYXN0IG9uY2UgVFMgdW5kZXJzdGFuZHMgYW4gYXJyYXkgb2Ygc2l6ZSAwIGluIHRoZSB0eXBlZGVmLlxuICAgIHBhcmFtZXRlcnMuZm9yRWFjaCgoYXJnLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyBDb252ZXJ0IHBhcmFtZXRlciBuYW1lIHRvIGludGVybmFsIG5hbWUsIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgY29uc3QgbmFtZSA9IChwYXJhbU5hbWVNYXBwaW5nICYmIHBhcmFtTmFtZU1hcHBpbmdbYXJnLm5hbWVdKSB8fCBhcmcubmFtZTtcbiAgICAgICAgaWYgKG5hbWVzLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGUgbmFtZSAke25hbWV9IGRldGVjdGVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgbmFtZXMuYWRkKG5hbWUpO1xuICAgICAgICBpZiAoYXJnLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICBvcHRpb25hbE5hbWVzLmFkZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpbmRleFRvTmFtZU1hcC5zZXQoaW5kZXgsIG5hbWUpO1xuICAgIH0pO1xuICAgIGNvbnN0IGhhc1F1ZXJ5UGFyYW1zID0gQm9vbGVhbihxdWVyeVBhcmFtcyAmJiBxdWVyeVBhcmFtcy5sZW5ndGgpO1xuICAgIGNvbnN0IGhhc0JvZHlQYXJhbXMgPSBCb29sZWFuKGJvZHlQYXJhbXMgJiYgYm9keVBhcmFtcy5sZW5ndGgpO1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0SGFuZGxlcihwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgbmFtZU1hcHBpbmcgPSB7fTtcbiAgICAgICAgcGFyYW1zLmZvckVhY2goKHBhcmFtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1OYW1lID0gKDAsIGVuc3VyZV8xLmVuc3VyZUV4aXN0cykoaW5kZXhUb05hbWVNYXAuZ2V0KGluZGV4KSk7XG4gICAgICAgICAgICBjb25zdCBwYXJhbVRyYW5zZm9ybSA9IHRyYW5zZm9ybXMgPyB0cmFuc2Zvcm1zW3BhcmFtTmFtZV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAocGFyYW1UcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1SZXN1bHQgPSBwYXJhbVRyYW5zZm9ybShwYXJhbSk7XG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybVJlc3VsdCAmJiB0eXBlb2YgdHJhbnNmb3JtUmVzdWx0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBNZXJnZSB0aGVzZSByZXN1bHRzIGludG8gdGhlIG5hbWUgbWFwcGluZyBzaW5jZSB3ZSBhcmUgc3BsYXlpbmcgb3V0IHJlc3VsdHMuXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obmFtZU1hcHBpbmcsIHRyYW5zZm9ybVJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYW1lTWFwcGluZ1twYXJhbU5hbWVdID0gdHJhbnNmb3JtUmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWVNYXBwaW5nW3BhcmFtTmFtZV0gPSBwYXJhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFdlIGRvbid0IGtub3cgYSBwcmlvcmkgd2hpY2ggcGFyYW1zIGFyZSB1c2VkIHdpdGhpbiB0aGUgVVJMLCBzbyBnZW5lcmF0ZSBhIG1hcCBmb3IgYWxsIG9mIHRoZW0uXG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBmb3JtYXRTdHJpbmcodXJsLCBnZW5lcmF0ZVF1ZXJ5UGFyYW1NYXAoT2JqZWN0LmtleXMobmFtZU1hcHBpbmcpLCBuYW1lTWFwcGluZykpO1xuICAgICAgICBjb25zdCBmdWxsVXJsID0gaGFzUXVlcnlQYXJhbXNcbiAgICAgICAgICAgID8gKDAsIHVybF8xLndpdGhRdWVyeVBhcmFtcykoYmFzZVVybCwgZ2VuZXJhdGVRdWVyeVBhcmFtTWFwKCgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKHF1ZXJ5UGFyYW1zKSwgbmFtZU1hcHBpbmcsIG9wdGlvbmFsTmFtZXMpKVxuICAgICAgICAgICAgOiBiYXNlVXJsO1xuICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgaWYgKGJvZHlUZW1wbGF0ZSkge1xuICAgICAgICAgICAgYm9keSA9ICgwLCBjbG9uZV8xLmRlZmF1bHQpKGJvZHlUZW1wbGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0JvZHlQYXJhbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRCb2R5UGFyYW1zID0gZ2VuZXJhdGVQYXJhbU1hcCgoMCwgZW5zdXJlXzEuZW5zdXJlRXhpc3RzKShib2R5UGFyYW1zKSwgbmFtZU1hcHBpbmcsIG9wdGlvbmFsTmFtZXMpO1xuICAgICAgICAgICAgLy8gTWVyZ2UgdGhlIHBhcmFtIGlmIG5lZWRlZC5cbiAgICAgICAgICAgIGJvZHkgPSBib2R5ID8geyAuLi5ib2R5LCAuLi5jdXJyZW50Qm9keVBhcmFtcyB9IDogY3VycmVudEJvZHlQYXJhbXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogZnVsbFVybCxcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIC4uLmhlYWRlcnMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogYm9keSA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgIH07XG59XG5leHBvcnRzLmdlbmVyYXRlUmVxdWVzdEhhbmRsZXIgPSBnZW5lcmF0ZVJlcXVlc3RIYW5kbGVyO1xuZnVuY3Rpb24gbWFwS2V5cyhvYmosIHNjaGVtYSkge1xuICAgIGlmICghKHNjaGVtYSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKHNjaGVtYSkpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGNvbnN0IHsgcHJvcGVydGllcyB9ID0gc2NoZW1hO1xuICAgIC8vIExvb2sgYXQgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNjaGVtYSBhbmQgaW52ZXJ0IGFueSBrZXlzIGlmIHByZXNlbnQuXG4gICAgY29uc3QgcmVtYXBwZWRLZXlzID0gbmV3IE1hcCgpO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwcm9wZXJ0aWVzW2tleV0uZnJvbUtleSkge1xuICAgICAgICAgICAgY29uc3QgZnJvbUtleSA9ICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKHByb3BlcnRpZXNba2V5XS5mcm9tS2V5KTtcbiAgICAgICAgICAgIHJlbWFwcGVkS2V5cy5zZXQoZnJvbUtleSwgWy4uLihyZW1hcHBlZEtleXMuZ2V0KGZyb21LZXkpIHx8IFtdKSwga2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVtYXBwZWRPYmplY3QgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFwcGVkS2V5cyA9IHJlbWFwcGVkS2V5cy5nZXQoa2V5KSB8fCBba2V5XTtcbiAgICAgICAgZm9yIChjb25zdCBuZXdLZXkgb2YgbWFwcGVkS2V5cykge1xuICAgICAgICAgICAgaWYgKCFzY2hlbWEucHJvcGVydGllc1tuZXdLZXldICYmICFzY2hlbWEuaW5jbHVkZVVua25vd25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZW1hcHBlZE9iamVjdFtuZXdLZXldID0gbWFwcGVkS2V5cy5sZW5ndGggPiAxID8gKDAsIG9iamVjdF91dGlsc18xLmRlZXBDb3B5KShvYmpba2V5XSkgOiBvYmpba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGtleVNjaGVtYSA9IHNjaGVtYS5wcm9wZXJ0aWVzW25ld0tleV07XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSByZW1hcHBlZE9iamVjdFtuZXdLZXldO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudFZhbHVlKSAmJiAoMCwgc2NoZW1hXzEuaXNBcnJheSkoa2V5U2NoZW1hKSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKGtleVNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICAgICAgICByZW1hcHBlZE9iamVjdFtuZXdLZXldID0gY3VycmVudFZhbHVlLm1hcCh2YWwgPT4gbWFwS2V5cyh2YWwsIGtleVNjaGVtYS5pdGVtcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ29iamVjdCcgJiYgKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShrZXlTY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmVtYXBwZWRPYmplY3RbbmV3S2V5XSA9IG1hcEtleXMoY3VycmVudFZhbHVlLCBrZXlTY2hlbWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZW1hcHBlZE9iamVjdDtcbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybUJvZHkoYm9keSwgc2NoZW1hKSB7XG4gICAgaWYgKCgwLCBzY2hlbWFfMS5pc0FycmF5KShzY2hlbWEpICYmICgwLCBzY2hlbWFfMi5pc09iamVjdCkoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgICBjb25zdCBvYmplY3RzID0gYm9keTtcbiAgICAgICAgY29uc3QgbWFwcGVkT2JqcyA9IG9iamVjdHMubWFwKG9iaiA9PiBtYXBLZXlzKG9iaiwgc2NoZW1hLml0ZW1zKSk7XG4gICAgICAgIHJldHVybiBtYXBwZWRPYmpzO1xuICAgIH1cbiAgICBpZiAoKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShzY2hlbWEpKSB7XG4gICAgICAgIHJldHVybiBtYXBLZXlzKGJvZHksIHNjaGVtYSk7XG4gICAgfVxuICAgIHJldHVybiBib2R5O1xufVxuZXhwb3J0cy50cmFuc2Zvcm1Cb2R5ID0gdHJhbnNmb3JtQm9keTtcbmZ1bmN0aW9uIGdldFVubWFwS2V5TG9va3VwKHNjaGVtYSkge1xuICAgIGNvbnN0IHJlbWFwcGVkS2V5cyA9IG5ldyBNYXAoKTtcbiAgICBpZiAoIShzY2hlbWEgJiYgKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShzY2hlbWEpKSkge1xuICAgICAgICByZXR1cm4gcmVtYXBwZWRLZXlzO1xuICAgIH1cbiAgICBjb25zdCB7IHByb3BlcnRpZXMgfSA9IHNjaGVtYTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkgJiYgcHJvcGVydGllc1trZXldLmZyb21LZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb21LZXkgPSAoMCwgZW5zdXJlXzEuZW5zdXJlRXhpc3RzKShwcm9wZXJ0aWVzW2tleV0uZnJvbUtleSk7XG4gICAgICAgICAgICByZW1hcHBlZEtleXMuc2V0KGtleSwgZnJvbUtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbWFwcGVkS2V5cztcbn1cbmZ1bmN0aW9uIHVubWFwS2V5cyhvYmosIHNjaGVtYSkge1xuICAgIGlmICghKHNjaGVtYSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKHNjaGVtYSkpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIC8vIExvb2sgYXQgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNjaGVtYSBhbmQgaW52ZXJ0IGFueSBrZXlzIGlmIHByZXNlbnQuXG4gICAgY29uc3QgcmVtYXBwZWRLZXlzID0gZ2V0VW5tYXBLZXlMb29rdXAoc2NoZW1hKTtcbiAgICBjb25zdCByZW1hcHBlZE9iamVjdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdLZXkgPSByZW1hcHBlZEtleXMuZ2V0KGtleSkgfHwga2V5O1xuICAgICAgICBpZiAoIXNjaGVtYS5wcm9wZXJ0aWVzW2tleV0gJiYgIXNjaGVtYS5pbmNsdWRlVW5rbm93blByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlbWFwcGVkT2JqZWN0W25ld0tleV0gPSAoMCwgb2JqZWN0X3V0aWxzXzEuZGVlcENvcHkpKG9ialtrZXldKTtcbiAgICAgICAgY29uc3Qga2V5U2NoZW1hID0gc2NoZW1hLnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gcmVtYXBwZWRPYmplY3RbbmV3S2V5XTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudFZhbHVlKSAmJiAoMCwgc2NoZW1hXzEuaXNBcnJheSkoa2V5U2NoZW1hKSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKGtleVNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICAgIHJlbWFwcGVkT2JqZWN0W25ld0tleV0gPSBjdXJyZW50VmFsdWUubWFwKHZhbCA9PiB1bm1hcEtleXModmFsLCBrZXlTY2hlbWEuaXRlbXMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnb2JqZWN0JyAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKGtleVNjaGVtYSkpIHtcbiAgICAgICAgICAgIHJlbWFwcGVkT2JqZWN0W25ld0tleV0gPSB1bm1hcEtleXMoY3VycmVudFZhbHVlLCBrZXlTY2hlbWEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZW1hcHBlZE9iamVjdDtcbn1cbmZ1bmN0aW9uIHVudHJhbnNmb3JtQm9keShib2R5LCBzY2hlbWEpIHtcbiAgICBpZiAoKDAsIHNjaGVtYV8xLmlzQXJyYXkpKHNjaGVtYSkgJiYgKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgIGNvbnN0IG9iamVjdEJvZHkgPSBib2R5O1xuICAgICAgICBjb25zdCBtYXBwZWRPYmpzID0gdW5tYXBLZXlzKG9iamVjdEJvZHksIHNjaGVtYS5pdGVtcyk7XG4gICAgICAgIHJldHVybiBtYXBwZWRPYmpzO1xuICAgIH1cbiAgICBpZiAoKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShzY2hlbWEpKSB7XG4gICAgICAgIHJldHVybiB1bm1hcEtleXMoYm9keSwgc2NoZW1hKTtcbiAgICB9XG4gICAgcmV0dXJuIGJvZHk7XG59XG5leHBvcnRzLnVudHJhbnNmb3JtQm9keSA9IHVudHJhbnNmb3JtQm9keTtcbi8qKlxuICogUmV2ZXJzZXMgdGhlIHRyYW5zZm9ybWF0aW9uIG9mIHNjaGVtYSBvYmplY3Qga2V5cyB0byB0aGUgdmFsdWVzIGV4cGVjdGVkIGJ5IHRoZSBwYWNrLlxuICogVXNlZnVsIHdoZW4gcGFzc2luZyBpbiBhIGxpc3Qgb2Yga2V5cyBmcm9tIENvZGEgLT4gUGFjaywgc3VjaCBhcyB3aGVuIHNlbmRpbmcgdGhlIGFnZ3JlZ2F0ZWRcbiAqIHN5bmMgdGFibGUgdXBkYXRlIHBheWxvYWQuXG4gKi9cbmZ1bmN0aW9uIHVudHJhbnNmb3JtS2V5cyhrZXlzLCBzY2hlbWEpIHtcbiAgICBjb25zdCBzY2hlbWFPYmplY3QgPSAoMCwgc2NoZW1hXzEuaXNBcnJheSkoc2NoZW1hKSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKHNjaGVtYS5pdGVtcykgPyBzY2hlbWEuaXRlbXMgOiBzY2hlbWE7XG4gICAgY29uc3QgcmVtYXBwZWRLZXlzID0gZ2V0VW5tYXBLZXlMb29rdXAoc2NoZW1hT2JqZWN0KTtcbiAgICByZXR1cm4ga2V5cy5tYXAoa2V5ID0+IHJlbWFwcGVkS2V5cy5nZXQoa2V5KSB8fCBrZXkpO1xufVxuZXhwb3J0cy51bnRyYW5zZm9ybUtleXMgPSB1bnRyYW5zZm9ybUtleXM7XG5mdW5jdGlvbiBnZW5lcmF0ZU9iamVjdFJlc3BvbnNlSGFuZGxlcihyZXNwb25zZSkge1xuICAgIGNvbnN0IHsgcHJvamVjdEtleSB9ID0gcmVzcG9uc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9iamVjdFJlc3BvbnNlSGFuZGxlcihyZXNwKSB7XG4gICAgICAgIGNvbnN0IHsgYm9keSB9ID0gcmVzcDtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBlcnJvciwgd2UnbGwgZmxhZyBpdCBkdXJpbmcgdmFsaWRhdGlvbi5cbiAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb2plY3RlZEJvZHkgPSBwcm9qZWN0S2V5ID8gYm9keVtwcm9qZWN0S2V5XSA6IGJvZHk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0ZWRCb2R5O1xuICAgIH07XG59XG5leHBvcnRzLmdlbmVyYXRlT2JqZWN0UmVzcG9uc2VIYW5kbGVyID0gZ2VuZXJhdGVPYmplY3RSZXNwb25zZUhhbmRsZXI7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhID0gZXhwb3J0cy5tYWtlRW1wdHlGb3JtdWxhID0gZXhwb3J0cy5tYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYSA9IGV4cG9ydHMubWFrZUR5bmFtaWNTeW5jVGFibGUgPSBleHBvcnRzLm1ha2VTeW5jVGFibGVMZWdhY3kgPSBleHBvcnRzLm1ha2VTeW5jVGFibGUgPSBleHBvcnRzLm1ha2VPYmplY3RGb3JtdWxhID0gZXhwb3J0cy5tYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhID0gZXhwb3J0cy5hdXRvY29tcGxldGVTZWFyY2hPYmplY3RzID0gZXhwb3J0cy5zaW1wbGVBdXRvY29tcGxldGUgPSBleHBvcnRzLm1ha2VNZXRhZGF0YUZvcm11bGEgPSBleHBvcnRzLm5vcm1hbGl6ZVByb3BlcnR5QXV0b2NvbXBsZXRlUmVzdWx0cyA9IGV4cG9ydHMubWFrZUZvcm11bGEgPSBleHBvcnRzLm1ha2VTdHJpbmdGb3JtdWxhID0gZXhwb3J0cy5tYWtlTnVtZXJpY0Zvcm11bGEgPSBleHBvcnRzLlVwZGF0ZU91dGNvbWUgPSBleHBvcnRzLmlzU3luY1BhY2tGb3JtdWxhID0gZXhwb3J0cy5pc1N0cmluZ1BhY2tGb3JtdWxhID0gZXhwb3J0cy5pc09iamVjdFBhY2tGb3JtdWxhID0gZXhwb3J0cy5jaGVjayA9IGV4cG9ydHMubWFrZVVzZXJWaXNpYmxlRXJyb3IgPSBleHBvcnRzLm1ha2VGaWxlQXJyYXlQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VGaWxlUGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlSW1hZ2VBcnJheVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZUltYWdlUGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlSHRtbEFycmF5UGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlSHRtbFBhcmFtZXRlciA9IGV4cG9ydHMubWFrZURhdGVBcnJheVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZURhdGVQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VCb29sZWFuQXJyYXlQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VCb29sZWFuUGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlTnVtZXJpY0FycmF5UGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlTnVtZXJpY1BhcmFtZXRlciA9IGV4cG9ydHMubWFrZVN0cmluZ0FycmF5UGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlU3RyaW5nUGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlUGFyYW1ldGVyID0gZXhwb3J0cy53cmFwR2V0U2NoZW1hID0gZXhwb3J0cy53cmFwTWV0YWRhdGFGdW5jdGlvbiA9IGV4cG9ydHMuaXNEeW5hbWljU3luY1RhYmxlID0gZXhwb3J0cy5pc1VzZXJWaXNpYmxlRXJyb3IgPSBleHBvcnRzLk1pc3NpbmdTY29wZXNFcnJvciA9IGV4cG9ydHMuU3RhdHVzQ29kZUVycm9yID0gZXhwb3J0cy5Vc2VyVmlzaWJsZUVycm9yID0gdm9pZCAwO1xuY29uc3QgYXBpX3R5cGVzXzEgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5jb25zdCBhcGlfdHlwZXNfMiA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IGFwaV90eXBlc18zID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3Qgc2NoZW1hXzEgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5jb25zdCBhcGlfdHlwZXNfNCA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IGFwaV90eXBlc181ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3Qgb2JqZWN0X3V0aWxzXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL29iamVjdF91dGlsc1wiKTtcbmNvbnN0IGVuc3VyZV8xID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5jb25zdCBhcGlfdHlwZXNfNiA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IGhhbmRsZXJfdGVtcGxhdGVzXzEgPSByZXF1aXJlKFwiLi9oYW5kbGVyX3RlbXBsYXRlc1wiKTtcbmNvbnN0IGhhbmRsZXJfdGVtcGxhdGVzXzIgPSByZXF1aXJlKFwiLi9oYW5kbGVyX3RlbXBsYXRlc1wiKTtcbmNvbnN0IGFwaV90eXBlc183ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgYXBpX3R5cGVzXzggPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5jb25zdCBvYmplY3RfdXRpbHNfMiA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvb2JqZWN0X3V0aWxzXCIpO1xuY29uc3Qgc2NoZW1hXzIgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5jb25zdCBzY2hlbWFfMyA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbmNvbnN0IGFwaV90eXBlc185ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgbWlncmF0aW9uXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL21pZ3JhdGlvblwiKTtcbmNvbnN0IGFwaV90eXBlc18xMCA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbi8qKlxuICogQW4gZXJyb3Igd2hvc2UgbWVzc2FnZSB3aWxsIGJlIHNob3duIHRvIHRoZSBlbmQgdXNlciBpbiB0aGUgVUkgd2hlbiBpdCBvY2N1cnMuXG4gKiBJZiBhbiBlcnJvciBpcyBlbmNvdW50ZXJlZCBpbiBhIGZvcm11bGEgYW5kIHlvdSB3YW50IHRvIGRlc2NyaWJlIHRoZSBlcnJvclxuICogdG8gdGhlIGVuZCB1c2VyLCB0aHJvdyBhIFVzZXJWaXNpYmxlRXJyb3Igd2l0aCBhIHVzZXItZnJpZW5kbHkgbWVzc2FnZVxuICogYW5kIHRoZSBDb2RhIFVJIHdpbGwgZGlzcGxheSB0aGUgbWVzc2FnZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpZiAoIXVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpIHtcbiAqICAgdGhyb3cgbmV3IGNvZGEuVXNlclZpc2libGVFcnJvcihcIlBsZWFzZSBwcm92aWRlIGEgdmFsaWQgdXJsLlwiKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBzZWVcbiAqIC0gW0hhbmRsaW5nIGVycm9ycyAtIFVzZXItdmlzaWJsZSBlcnJvcnNdKGh0dHBzOi8vY29kYS5pby9wYWNrcy9idWlsZC9sYXRlc3QvZ3VpZGVzL2FkdmFuY2VkL2Vycm9ycy8jdXNlci12aXNpYmxlLWVycm9ycylcbiAqL1xuY2xhc3MgVXNlclZpc2libGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKipcbiAgICAgKiBVc2UgdG8gY29uc3RydWN0IGEgdXNlci12aXNpYmxlIGVycm9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGludGVybmFsRXJyb3IpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIC8qKiBAaGlkZGVuICovXG4gICAgICAgIHRoaXMuaXNVc2VyVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxFcnJvciA9IGludGVybmFsRXJyb3I7XG4gICAgfVxufVxuZXhwb3J0cy5Vc2VyVmlzaWJsZUVycm9yID0gVXNlclZpc2libGVFcnJvcjtcbi8vIFN0YXR1c0NvZGVFcnJvciBpcyBhIHNpbXBsZSB2ZXJzaW9uIG9mIFN0YXR1c0NvZGVFcnJvciBpbiByZXF1ZXN0LXByb21pc2UgdG8ga2VlcCBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbi8vIFRoaXMgdHJpZXMgdG8gcmVwbGljYXRlIGl0cyBleGFjdCBzdHJ1Y3R1cmUsIG1hc3NhZ2luZyBhcyBuZWNlc3NhcnkgdG8gaGFuZGxlIHRoZSB2YXJpb3VzIHRyYW5zZm9ybXNcbi8vIGluIG91ciBzdGFjay5cbi8vXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcmVxdWVzdC9wcm9taXNlLWNvcmUvYmxvYi9tYXN0ZXIvbGliL2Vycm9ycy5qcyNMMjJcbi8qKlxuICogQW4gZXJyb3IgdGhhdCB3aWxsIGJlIHRocm93biBieSB7QGxpbmsgRmV0Y2hlci5mZXRjaH0gd2hlbiB0aGUgZmV0Y2hlciByZXNwb25zZSBoYXMgYW5cbiAqIEhUVFAgc3RhdHVzIGNvZGUgb2YgNDAwIG9yIGdyZWF0ZXIuXG4gKlxuICogVGhpcyBjbGFzcyBsYXJnZWx5IG1vZGVscyB0aGUgYFN0YXR1c0NvZGVFcnJvcmAgZnJvbSB0aGUgKG5vdyBkZXByZWNhdGVkKSBgcmVxdWVzdC1wcm9taXNlYCBsaWJyYXJ5LFxuICogd2hpY2ggaGFzIGEgcXVpcmt5IHN0cnVjdHVyZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGxldCByZXNwb25zZTtcbiAqIHRyeSB7XG4gKiAgIHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHtcbiAqICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gKiAgICAgLy8gT3BlbiB0aGlzIFVSTCBpbiB5b3VyIGJyb3dzZXIgdG8gc2VlIHdoYXQgdGhlIGRhdGEgbG9va3MgbGlrZS5cbiAqICAgICB1cmw6IFwiaHR0cHM6Ly9hcGkuYXJ0aWMuZWR1L2FwaS92MS9hcnR3b3Jrcy8xMjNcIixcbiAqICAgfSk7XG4gKiB9IGNhdGNoIChlcnJvcikge1xuICogICAvLyBJZiB0aGUgcmVxdWVzdCBmYWlsZWQgYmVjYXVzZSB0aGUgc2VydmVyIHJldHVybmVkIGEgMzAwKyBzdGF0dXMgY29kZS5cbiAqICAgaWYgKGNvZGEuU3RhdHVzQ29kZUVycm9yLmlzU3RhdHVzQ29kZUVycm9yKGVycm9yKSkge1xuICogICAgIC8vIENhc3QgdGhlIGVycm9yIGFzIGEgU3RhdHVzQ29kZUVycm9yLCBmb3IgYmV0dGVyIGludGVsbGlzZW5zZS5cbiAqICAgICBsZXQgc3RhdHVzRXJyb3IgPSBlcnJvciBhcyBjb2RhLlN0YXR1c0NvZGVFcnJvcjtcbiAqICAgICAvLyBJZiB0aGUgQVBJIHJldHVybmVkIGFuIGVycm9yIG1lc3NhZ2UgaW4gdGhlIGJvZHksIHNob3cgaXQgdG8gdGhlIHVzZXIuXG4gKiAgICAgbGV0IG1lc3NhZ2UgPSBzdGF0dXNFcnJvci5ib2R5Py5kZXRhaWw7XG4gKiAgICAgaWYgKG1lc3NhZ2UpIHtcbiAqICAgICAgIHRocm93IG5ldyBjb2RhLlVzZXJWaXNpYmxlRXJyb3IobWVzc2FnZSk7XG4gKiAgICAgfVxuICogICB9XG4gKiAgIC8vIFRoZSByZXF1ZXN0IGZhaWxlZCBmb3Igc29tZSBvdGhlciByZWFzb24uIFJlLXRocm93IHRoZSBlcnJvciBzbyB0aGF0IGl0XG4gKiAgIC8vIGJ1YmJsZXMgdXAuXG4gKiAgIHRocm93IGVycm9yO1xuICogfVxuICogYGBgXG4gKlxuICogQHNlZSBbRmV0Y2hpbmcgcmVtb3RlIGRhdGEgLSBFcnJvcnNdKGh0dHBzOi8vY29kYS5pby9wYWNrcy9idWlsZC9sYXRlc3QvZ3VpZGVzL2Jhc2ljcy9mZXRjaGVyLyNlcnJvcnMpXG4gKi9cbmNsYXNzIFN0YXR1c0NvZGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHN0YXR1c0NvZGUsIGJvZHksIG9wdGlvbnMsIHJlc3BvbnNlKSB7XG4gICAgICAgIHN1cGVyKGAke3N0YXR1c0NvZGV9IC0gJHtKU09OLnN0cmluZ2lmeShib2R5KX1gKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvciwgZm9yIGlkZW50aWZpY2F0aW9uIHB1cnBvc2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uYW1lID0gJ1N0YXR1c0NvZGVFcnJvcic7XG4gICAgICAgIHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1c0NvZGU7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBib2R5O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBsZXQgcmVzcG9uc2VCb2R5ID0gcmVzcG9uc2UgPT09IG51bGwgfHwgcmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VCb2R5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gXCJyZXF1ZXN0LXByb21pc2VcIidzIGVycm9yLnJlc3BvbnNlLmJvZHkgaXMgYWx3YXlzIHRoZSBvcmlnaW5hbCwgdW5wYXJzZWQgcmVzcG9uc2UgYm9keSxcbiAgICAgICAgICAgIC8vIHdoaWxlIG91ciBmZXRjaGVyIHNlcnZpY2UgbWF5IGF0dGVtcHQgYSBKU09OLnBhcnNlIGZvciBhbnkgcmVzcG9uc2UgYm9keSBhbmQgYWx0ZXIgdGhlIGJlaGF2aW9yLlxuICAgICAgICAgICAgLy8gSGVyZSB3ZSBhdHRlbXB0IHRvIHJlc3RvcmUgdGhlIG9yaWdpbmFsIHJlc3BvbnNlIGJvZHkgZm9yIGEgZmV3IHYxIHBhY2tzIGNvbXBhdGliaWxpdHkuXG4gICAgICAgICAgICByZXNwb25zZUJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZUJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSB7IC4uLnJlc3BvbnNlLCBib2R5OiByZXNwb25zZUJvZHkgfTtcbiAgICB9XG4gICAgLyoqIFJldHVybnMgaWYgdGhlIGVycm9yIGlzIGFuIGluc3RhbmNlIG9mIFN0YXR1c0NvZGVFcnJvci4gTm90ZSB0aGF0IGBpbnN0YW5jZW9mYCBtYXkgbm90IHdvcmsuICovXG4gICAgc3RhdGljIGlzU3RhdHVzQ29kZUVycm9yKGVycikge1xuICAgICAgICByZXR1cm4gJ25hbWUnIGluIGVyciAmJiBlcnIubmFtZSA9PT0gU3RhdHVzQ29kZUVycm9yLm5hbWU7XG4gICAgfVxufVxuZXhwb3J0cy5TdGF0dXNDb2RlRXJyb3IgPSBTdGF0dXNDb2RlRXJyb3I7XG4vKipcbiAqIFRocm93IHRoaXMgZXJyb3IgaWYgdGhlIHVzZXIgbmVlZHMgdG8gcmUtYXV0aGVudGljYXRlIHRvIGdhaW4gT0F1dGggc2NvcGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkXG4gKiB0byB0aGUgcGFjayBzaW5jZSB0aGVpciBjb25uZWN0aW9uIHdhcyBjcmVhdGVkLCBvciBzY29wZXMgdGhhdCBhcmUgc3BlY2lmaWMgdG8gYSBjZXJ0YWluIGZvcm11bGEuXG4gKiBUaGlzIGlzIHVzZWZ1bCBiZWNhdXNlIENvZGEgd2lsbCBhbHdheXMgYXR0ZW1wdCB0byBleGVjdXRlIGEgZm9ybXVsYSBldmVuIGlmIGEgdXNlciBoYXMgbm90IHlldFxuICogcmUtYXV0aGVudGljYXRlZCB3aXRoIGFsbCByZWxldmFudCBzY29wZXMuXG4gKlxuICogWW91IGRvbid0ICphbHdheXMqIG5lZWQgdG8gdGhyb3cgdGhpcyBzcGVjaWZpYyBlcnJvciwgYXMgQ29kYSB3aWxsIGludGVycHJldCBhIDQwMyAoRm9yYmlkZGVuKVxuICogc3RhdHVzIGNvZGUgZXJyb3IgYXMgYSBNaXNzaW5nU2NvcGVzRXJyb3Igd2hlbiB0aGUgdXNlcidzIGNvbm5lY3Rpb24gd2FzIG1hZGUgd2l0aG91dCBhbGxcbiAqIGN1cnJlbnRseSByZWxldmFudCBzY29wZXMuIFRoaXMgZXJyb3IgZXhpc3RzIGJlY2F1c2UgdGhhdCBkZWZhdWx0IGJlaGF2aW9yIGlzIGluc3VmZmljaWVudCBpZlxuICogdGhlIE9BdXRoIHNlcnZpY2UgZG9lcyBub3Qgc2V0IGEgNDAzIHN0YXR1cyBjb2RlICh0aGUgT0F1dGggc3BlYyBkb2Vzbid0IHNwZWNpZmljYWxseSByZXF1aXJlXG4gKiB0aGVtIHRvLCBhZnRlciBhbGwpLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogdHJ5IHtcbiAqICAgbGV0IHJlc3BvbnNlID0gY29udGV4dC5mZXRjaGVyLmZldGNoKHtcbiAqICAgICAvLyAuLi5cbiAqICAgfSk7XG4gKiB9IGNhdGNoIChlcnJvcikge1xuICogICAvLyBEZXRlcm1pbmUgaWYgdGhlIGVycm9yIGlzIGR1ZSB0byBtaXNzaW5nIHNjb3Blcy5cbiAqICAgaWYgKGVycm9yLnN0YXR1c0NvZGUgPT0gNDAwICYmIGVycm9yLmJvZHk/Lm1lc3NhZ2UuaW5jbHVkZXMoXCJwZXJtaXNzaW9uXCIpKSB7XG4gKiAgICAgdGhyb3cgbmV3IGNvZGEuTWlzc2luZ1Njb3Blc0Vycm9yKCk7XG4gKiAgIH1cbiAqICAgLy8gRWxzZSBoYW5kbGUgb3IgdGhyb3cgdGhlIGVycm9yIGFzIG5vcm1hbC5cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBzZWVcbiAqIC0gW0d1aWRlOiBBdXRoZW50aWNhdGluZyB1c2luZyBPQXV0aF0oaHR0cHM6Ly9jb2RhLmlvL3BhY2tzL2J1aWxkL2xhdGVzdC9ndWlkZXMvYmFzaWNzL2F1dGhlbnRpY2F0aW9uL29hdXRoMi8jdHJpZ2dlcmluZy1hLXByb21wdClcbiAqL1xuY2xhc3MgTWlzc2luZ1Njb3Blc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8ICdBZGRpdGlvbmFsIHBlcm1pc3Npb25zIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLCBmb3IgaWRlbnRpZmljYXRpb24gcHVycG9zZXMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5hbWUgPSAnTWlzc2luZ1Njb3Blc0Vycm9yJztcbiAgICB9XG4gICAgLyoqIFJldHVybnMgaWYgdGhlIGVycm9yIGlzIGFuIGluc3RhbmNlIG9mIE1pc3NpbmdTY29wZXNFcnJvci4gTm90ZSB0aGF0IGBpbnN0YW5jZW9mYCBtYXkgbm90IHdvcmsuICovXG4gICAgc3RhdGljIGlzTWlzc2luZ1Njb3Blc0Vycm9yKGVycikge1xuICAgICAgICByZXR1cm4gJ25hbWUnIGluIGVyciAmJiBlcnIubmFtZSA9PT0gTWlzc2luZ1Njb3Blc0Vycm9yLm5hbWU7XG4gICAgfVxufVxuZXhwb3J0cy5NaXNzaW5nU2NvcGVzRXJyb3IgPSBNaXNzaW5nU2NvcGVzRXJyb3I7XG4vKipcbiAqIEhlbHBlciB0byBkZXRlcm1pbmUgaWYgYW4gZXJyb3IgaXMgY29uc2lkZXJlZCB1c2VyLXZpc2libGUgYW5kIGNhbiBiZSBzaG93biBpbiB0aGUgVUkuXG4gKiBTZWUge0BsaW5rIFVzZXJWaXNpYmxlRXJyb3J9LlxuICogQHBhcmFtIGVycm9yIEFueSBlcnJvciBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGlzVXNlclZpc2libGVFcnJvcihlcnJvcikge1xuICAgIHJldHVybiAnaXNVc2VyVmlzaWJsZScgaW4gZXJyb3IgJiYgZXJyb3IuaXNVc2VyVmlzaWJsZTtcbn1cbmV4cG9ydHMuaXNVc2VyVmlzaWJsZUVycm9yID0gaXNVc2VyVmlzaWJsZUVycm9yO1xuZnVuY3Rpb24gaXNEeW5hbWljU3luY1RhYmxlKHN5bmNUYWJsZSkge1xuICAgIHJldHVybiAnaXNEeW5hbWljJyBpbiBzeW5jVGFibGU7XG59XG5leHBvcnRzLmlzRHluYW1pY1N5bmNUYWJsZSA9IGlzRHluYW1pY1N5bmNUYWJsZTtcbmZ1bmN0aW9uIHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGZuT3JGb3JtdWxhKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBmbk9yRm9ybXVsYSA9PT0gJ2Z1bmN0aW9uJyA/IG1ha2VNZXRhZGF0YUZvcm11bGEoZm5PckZvcm11bGEpIDogZm5PckZvcm11bGE7XG59XG5leHBvcnRzLndyYXBNZXRhZGF0YUZ1bmN0aW9uID0gd3JhcE1ldGFkYXRhRnVuY3Rpb247XG5mdW5jdGlvbiB0cmFuc2Zvcm1Ub0FycmF5U2NoZW1hKHNjaGVtYSkge1xuICAgIGlmICgoc2NoZW1hID09PSBudWxsIHx8IHNjaGVtYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoZW1hLnR5cGUpID09PSBzY2hlbWFfMS5WYWx1ZVR5cGUuQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBzY2hlbWFfMS5WYWx1ZVR5cGUuQXJyYXksXG4gICAgICAgICAgICBpdGVtczogc2NoZW1hLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHdyYXBHZXRTY2hlbWEoZ2V0U2NoZW1hKSB7XG4gICAgaWYgKCFnZXRTY2hlbWEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5nZXRTY2hlbWEsXG4gICAgICAgIGV4ZWN1dGUocGFyYW1zLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBzY2hlbWEgPSBnZXRTY2hlbWEuZXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKCgwLCBvYmplY3RfdXRpbHNfMi5pc1Byb21pc2UpKHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZW1hLnRoZW4odmFsdWUgPT4gdHJhbnNmb3JtVG9BcnJheVNjaGVtYSh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVRvQXJyYXlTY2hlbWEoc2NoZW1hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuZXhwb3J0cy53cmFwR2V0U2NoZW1hID0gd3JhcEdldFNjaGVtYTtcbi8qKlxuICogQ3JlYXRlIGEgZGVmaW5pdGlvbiBmb3IgYSBwYXJhbWV0ZXIgZm9yIGEgZm9ybXVsYSBvciBzeW5jLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VQYXJhbWV0ZXIoe3R5cGU6IFBhcmFtZXRlclR5cGUuU3RyaW5nLCBuYW1lOiAnbXlQYXJhbScsIGRlc2NyaXB0aW9uOiAnTXkgZGVzY3JpcHRpb24nfSk7XG4gKiBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBtYWtlUGFyYW1ldGVyKHt0eXBlOiBQYXJhbWV0ZXJUeXBlLlN0cmluZ0FycmF5LCBuYW1lOiAnbXlBcnJheVBhcmFtJywgZGVzY3JpcHRpb246ICdNeSBkZXNjcmlwdGlvbid9KTtcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBtYWtlUGFyYW1ldGVyKHBhcmFtRGVmaW5pdGlvbikge1xuICAgIGNvbnN0IHsgdHlwZSwgYXV0b2NvbXBsZXRlOiBhdXRvY29tcGxldGVEZWZPckl0ZW1zLCAuLi5yZXN0IH0gPSBwYXJhbURlZmluaXRpb247XG4gICAgY29uc3QgYWN0dWFsVHlwZSA9IGFwaV90eXBlc18yLlBhcmFtZXRlclR5cGVJbnB1dE1hcFt0eXBlXTtcbiAgICBsZXQgYXV0b2NvbXBsZXRlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGF1dG9jb21wbGV0ZURlZk9ySXRlbXMpKSB7XG4gICAgICAgIGNvbnN0IGF1dG9jb21wbGV0ZURlZiA9IG1ha2VTaW1wbGVBdXRvY29tcGxldGVNZXRhZGF0YUZvcm11bGEoYXV0b2NvbXBsZXRlRGVmT3JJdGVtcyk7XG4gICAgICAgIGF1dG9jb21wbGV0ZSA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGF1dG9jb21wbGV0ZURlZik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdXRvY29tcGxldGUgPSB3cmFwTWV0YWRhdGFGdW5jdGlvbihhdXRvY29tcGxldGVEZWZPckl0ZW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5yZXN0LCBhdXRvY29tcGxldGUsIHR5cGU6IGFjdHVhbFR5cGUgfSk7XG59XG5leHBvcnRzLm1ha2VQYXJhbWV0ZXIgPSBtYWtlUGFyYW1ldGVyO1xuLy8gT3RoZXIgcGFyYW1ldGVyIGhlbHBlcnMgYmVsb3cgaGVyZSBhcmUgb2Jzb2xldGUgZ2l2ZW4gdGhlIGFib3ZlIGdlbmVyYXRlIHBhcmFtZXRlciBtYWtlcnMuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VTdHJpbmdQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc18zLlR5cGUuc3RyaW5nIH0pO1xufVxuZXhwb3J0cy5tYWtlU3RyaW5nUGFyYW1ldGVyID0gbWFrZVN0cmluZ1BhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZVN0cmluZ0FycmF5UGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfMTAuc3RyaW5nQXJyYXkgfSk7XG59XG5leHBvcnRzLm1ha2VTdHJpbmdBcnJheVBhcmFtZXRlciA9IG1ha2VTdHJpbmdBcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZU51bWVyaWNQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc18zLlR5cGUubnVtYmVyIH0pO1xufVxuZXhwb3J0cy5tYWtlTnVtZXJpY1BhcmFtZXRlciA9IG1ha2VOdW1lcmljUGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlTnVtZXJpY0FycmF5UGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfOS5udW1iZXJBcnJheSB9KTtcbn1cbmV4cG9ydHMubWFrZU51bWVyaWNBcnJheVBhcmFtZXRlciA9IG1ha2VOdW1lcmljQXJyYXlQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VCb29sZWFuUGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfMy5UeXBlLmJvb2xlYW4gfSk7XG59XG5leHBvcnRzLm1ha2VCb29sZWFuUGFyYW1ldGVyID0gbWFrZUJvb2xlYW5QYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VCb29sZWFuQXJyYXlQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc180LmJvb2xlYW5BcnJheSB9KTtcbn1cbmV4cG9ydHMubWFrZUJvb2xlYW5BcnJheVBhcmFtZXRlciA9IG1ha2VCb29sZWFuQXJyYXlQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VEYXRlUGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfMy5UeXBlLmRhdGUgfSk7XG59XG5leHBvcnRzLm1ha2VEYXRlUGFyYW1ldGVyID0gbWFrZURhdGVQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VEYXRlQXJyYXlQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc181LmRhdGVBcnJheSB9KTtcbn1cbmV4cG9ydHMubWFrZURhdGVBcnJheVBhcmFtZXRlciA9IG1ha2VEYXRlQXJyYXlQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VIdG1sUGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfMy5UeXBlLmh0bWwgfSk7XG59XG5leHBvcnRzLm1ha2VIdG1sUGFyYW1ldGVyID0gbWFrZUh0bWxQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VIdG1sQXJyYXlQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc183Lmh0bWxBcnJheSB9KTtcbn1cbmV4cG9ydHMubWFrZUh0bWxBcnJheVBhcmFtZXRlciA9IG1ha2VIdG1sQXJyYXlQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VJbWFnZVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzMuVHlwZS5pbWFnZSB9KTtcbn1cbmV4cG9ydHMubWFrZUltYWdlUGFyYW1ldGVyID0gbWFrZUltYWdlUGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlSW1hZ2VBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzguaW1hZ2VBcnJheSB9KTtcbn1cbmV4cG9ydHMubWFrZUltYWdlQXJyYXlQYXJhbWV0ZXIgPSBtYWtlSW1hZ2VBcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUZpbGVQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc18zLlR5cGUuZmlsZSB9KTtcbn1cbmV4cG9ydHMubWFrZUZpbGVQYXJhbWV0ZXIgPSBtYWtlRmlsZVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUZpbGVBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzYuZmlsZUFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlRmlsZUFycmF5UGFyYW1ldGVyID0gbWFrZUZpbGVBcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZVVzZXJWaXNpYmxlRXJyb3IobXNnKSB7XG4gICAgcmV0dXJuIG5ldyBVc2VyVmlzaWJsZUVycm9yKG1zZyk7XG59XG5leHBvcnRzLm1ha2VVc2VyVmlzaWJsZUVycm9yID0gbWFrZVVzZXJWaXNpYmxlRXJyb3I7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIGNoZWNrKGNvbmRpdGlvbiwgbXNnKSB7XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbWFrZVVzZXJWaXNpYmxlRXJyb3IobXNnKTtcbiAgICB9XG59XG5leHBvcnRzLmNoZWNrID0gY2hlY2s7XG5mdW5jdGlvbiBpc09iamVjdFBhY2tGb3JtdWxhKGZuKSB7XG4gICAgcmV0dXJuIGZuLnJlc3VsdFR5cGUgPT09IGFwaV90eXBlc18zLlR5cGUub2JqZWN0O1xufVxuZXhwb3J0cy5pc09iamVjdFBhY2tGb3JtdWxhID0gaXNPYmplY3RQYWNrRm9ybXVsYTtcbmZ1bmN0aW9uIGlzU3RyaW5nUGFja0Zvcm11bGEoZm4pIHtcbiAgICByZXR1cm4gZm4ucmVzdWx0VHlwZSA9PT0gYXBpX3R5cGVzXzMuVHlwZS5zdHJpbmc7XG59XG5leHBvcnRzLmlzU3RyaW5nUGFja0Zvcm11bGEgPSBpc1N0cmluZ1BhY2tGb3JtdWxhO1xuZnVuY3Rpb24gaXNTeW5jUGFja0Zvcm11bGEoZm4pIHtcbiAgICByZXR1cm4gQm9vbGVhbihmbi5pc1N5bmNGb3JtdWxhKTtcbn1cbmV4cG9ydHMuaXNTeW5jUGFja0Zvcm11bGEgPSBpc1N5bmNQYWNrRm9ybXVsYTtcbi8qKlxuICogUG9zc2libGUgb3V0Y29tZXMgZm9yIGEgc2luZ2xlIHN5bmMgdXBkYXRlLlxuICogQGhpZGRlblxuICovXG52YXIgVXBkYXRlT3V0Y29tZTtcbihmdW5jdGlvbiAoVXBkYXRlT3V0Y29tZSkge1xuICAgIFVwZGF0ZU91dGNvbWVbXCJTdWNjZXNzXCJdID0gXCJzdWNjZXNzXCI7XG4gICAgVXBkYXRlT3V0Y29tZVtcIkVycm9yXCJdID0gXCJlcnJvclwiO1xufSkoVXBkYXRlT3V0Y29tZSA9IGV4cG9ydHMuVXBkYXRlT3V0Y29tZSB8fCAoZXhwb3J0cy5VcGRhdGVPdXRjb21lID0ge30pKTtcbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqXG4gKiBIZWxwZXIgZm9yIHJldHVybmluZyB0aGUgZGVmaW5pdGlvbiBvZiBhIGZvcm11bGEgdGhhdCByZXR1cm5zIGEgbnVtYmVyLiBBZGRzIHJlc3VsdCB0eXBlIGluZm9ybWF0aW9uXG4gKiB0byBhIGdlbmVyaWMgZm9ybXVsYSBkZWZpbml0aW9uLlxuICpcbiAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIGEgZm9ybXVsYSB0aGF0IHJldHVybnMgYSBudW1iZXIuXG4gKi9cbmZ1bmN0aW9uIG1ha2VOdW1lcmljRm9ybXVsYShkZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmluaXRpb24sIHsgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5udW1iZXIgfSk7XG59XG5leHBvcnRzLm1ha2VOdW1lcmljRm9ybXVsYSA9IG1ha2VOdW1lcmljRm9ybXVsYTtcbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqXG4gKiBIZWxwZXIgZm9yIHJldHVybmluZyB0aGUgZGVmaW5pdGlvbiBvZiBhIGZvcm11bGEgdGhhdCByZXR1cm5zIGEgc3RyaW5nLiBBZGRzIHJlc3VsdCB0eXBlIGluZm9ybWF0aW9uXG4gKiB0byBhIGdlbmVyaWMgZm9ybXVsYSBkZWZpbml0aW9uLlxuICpcbiAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIGEgZm9ybXVsYSB0aGF0IHJldHVybnMgYSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdHJpbmdGb3JtdWxhKGRlZmluaXRpb24pIHtcbiAgICBjb25zdCB7IHJlc3BvbnNlIH0gPSBkZWZpbml0aW9uO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkZWZpbml0aW9uLCB7XG4gICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc18zLlR5cGUuc3RyaW5nLFxuICAgICAgICAuLi4ocmVzcG9uc2UgJiYgeyBzY2hlbWE6IHJlc3BvbnNlLnNjaGVtYSB9KSxcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFrZVN0cmluZ0Zvcm11bGEgPSBtYWtlU3RyaW5nRm9ybXVsYTtcbi8qKlxuICogQ3JlYXRlcyBhIGZvcm11bGEgZGVmaW5pdGlvbi5cbiAqXG4gKiBZb3UgbXVzdCBpbmRpY2F0ZSB0aGUga2luZCBvZiB2YWx1ZSB0aGF0IHRoaXMgZm9ybXVsYSByZXR1cm5zIChzdHJpbmcsIG51bWJlciwgYm9vbGVhbiwgYXJyYXksIG9yIG9iamVjdClcbiAqIHVzaW5nIHRoZSBgcmVzdWx0VHlwZWAgZmllbGQuXG4gKlxuICogRm9ybXVsYXMgYWx3YXlzIHJldHVybiBiYXNpYyB0eXBlcywgYnV0IHlvdSBtYXkgb3B0aW9uYWxseSBnaXZlIGEgdHlwZSBoaW50IHVzaW5nXG4gKiBgY29kYVR5cGVgIHRvIHRlbGwgQ29kYSBob3cgdG8gaW50ZXJwcmV0IGEgZ2l2ZW4gdmFsdWUuIEZvciBleGFtcGxlLCB5b3UgY2FuIHJldHVyblxuICogYSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIGEgZGF0ZSwgYnV0IHVzZSBgY29kYVR5cGU6IFZhbHVlVHlwZS5EYXRlYCB0byB0ZWxsIENvZGFcbiAqIHRvIGludGVycHJldCBhcyBhIGRhdGUgaW4gYSBkb2N1bWVudC5cbiAqXG4gKiBJZiB5b3VyIGZvcm11bGEgcmV0dXJucyBhbiBvYmplY3QsIHlvdSBtdXN0IHByb3ZpZGUgYSBgc2NoZW1hYCBwcm9wZXJ0eSB0aGF0IGRlc2NyaWJlc1xuICogdGhlIHN0cnVjdHVyZSBvZiB0aGUgb2JqZWN0LiBTZWUge0BsaW5rIG1ha2VPYmplY3RTY2hlbWF9IGZvciBob3cgdG8gY29uc3RydWN0IGFuIG9iamVjdCBzY2hlbWEuXG4gKlxuICogSWYgeW91ciBmb3JtdWxhIHJldHVybnMgYSBsaXN0IChhcnJheSksIHlvdSBtdXN0IHByb3ZpZGUgYW4gYGl0ZW1zYCBwcm9wZXJ0eSB0aGF0IGRlc2NyaWJlc1xuICogd2hhdCB0aGUgZWxlbWVudHMgb2YgdGhlIGFycmF5IGFyZS4gVGhpcyBjb3VsZCBiZSBhIHNpbXBsZSBzY2hlbWEgbGlrZSBge3R5cGU6IFZhbHVlVHlwZS5TdHJpbmd9YFxuICogaW5kaWNhdGluZyB0aGF0IHRoZSBhcnJheSBlbGVtZW50cyBhcmUgYWxsIGp1c3Qgc3RyaW5ncywgb3IgaXQgY291bGQgYmUgYW4gb2JqZWN0IHNjaGVtYVxuICogY3JlYXRlZCB1c2luZyB7QGxpbmsgbWFrZU9iamVjdFNjaGVtYX0gaWYgdGhlIGVsZW1lbnRzIGFyZSBvYmplY3RzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VGb3JtdWxhKHtyZXN1bHRUeXBlOiBWYWx1ZVR5cGUuU3RyaW5nLCBuYW1lOiAnSGVsbG8nLCAuLi59KTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VGb3JtdWxhKHtyZXN1bHRUeXBlOiBWYWx1ZVR5cGUuU3RyaW5nLCBjb2RhVHlwZTogVmFsdWVUeXBlLkh0bWwsIG5hbWU6ICdIZWxsb0h0bWwnLCAuLi59KTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VGb3JtdWxhKHtyZXN1bHRUeXBlOiBWYWx1ZVR5cGUuQXJyYXksIGl0ZW1zOiB7dHlwZTogVmFsdWVUeXBlLlN0cmluZ30sIG5hbWU6ICdIZWxsb1N0cmluZ0FycmF5JywgLi4ufSk7XG4gKiBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBtYWtlRm9ybXVsYSh7XG4gKiAgIHJlc3VsdFR5cGU6IFZhbHVlVHlwZS5PYmplY3QsXG4gKiAgIHNjaGVtYTogbWFrZU9iamVjdFNjaGVtYSh7dHlwZTogVmFsdWVUeXBlLk9iamVjdCwgcHJvcGVydGllczogey4uLn19KSxcbiAqICAgbmFtZTogJ0hlbGxvT2JqZWN0JyxcbiAqICAgLi4uXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VGb3JtdWxhKHtcbiAqICAgcmVzdWx0VHlwZTogVmFsdWVUeXBlLkFycmF5LFxuICogICBpdGVtczogbWFrZU9iamVjdFNjaGVtYSh7dHlwZTogVmFsdWVUeXBlLk9iamVjdCwgcHJvcGVydGllczogey4uLn19KSxcbiAqICAgbmFtZTogJ0hlbGxvT2JqZWN0QXJyYXknLFxuICogICAuLi5cbiAqIH0pO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIG1ha2VGb3JtdWxhKGZ1bGxEZWZpbml0aW9uKSB7XG4gICAgbGV0IGZvcm11bGE7XG4gICAgc3dpdGNoIChmdWxsRGVmaW5pdGlvbi5yZXN1bHRUeXBlKSB7XG4gICAgICAgIGNhc2Ugc2NoZW1hXzEuVmFsdWVUeXBlLlN0cmluZzoge1xuICAgICAgICAgICAgLy8gdmVyeSBzdHJhbmdlIHRzIGtub3dzIHRoYXQgZnVsbERlZmluaXRpb24uY29kYVR5cGUgaXMgU3RyaW5nSGludFR5cGVzIGJ1dCBkb2Vzbid0IGtub3cgaWZcbiAgICAgICAgICAgIC8vIGZ1bGxEZWZpbml0aW9uIGlzIFN0cmluZ0Zvcm11bGFEZWZWMi5cbiAgICAgICAgICAgIGNvbnN0IGRlZiA9IHtcbiAgICAgICAgICAgICAgICAuLi5mdWxsRGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICBjb2RhVHlwZTogJ2NvZGFUeXBlJyBpbiBmdWxsRGVmaW5pdGlvbiA/IGZ1bGxEZWZpbml0aW9uLmNvZGFUeXBlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGZvcm11bGFTY2hlbWE6ICdzY2hlbWEnIGluIGZ1bGxEZWZpbml0aW9uID8gZnVsbERlZmluaXRpb24uc2NoZW1hIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHsgb25FcnJvcjogXywgcmVzdWx0VHlwZTogdW51c2VkLCBjb2RhVHlwZSwgZm9ybXVsYVNjaGVtYSwgLi4ucmVzdCB9ID0gZGVmO1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nRm9ybXVsYSA9IHtcbiAgICAgICAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc18zLlR5cGUuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHNjaGVtYTogZm9ybXVsYVNjaGVtYSB8fCAoY29kYVR5cGUgPyB7IHR5cGU6IHNjaGVtYV8xLlZhbHVlVHlwZS5TdHJpbmcsIGNvZGFUeXBlIH0gOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvcm11bGEgPSBzdHJpbmdGb3JtdWxhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBzY2hlbWFfMS5WYWx1ZVR5cGUuTnVtYmVyOiB7XG4gICAgICAgICAgICBjb25zdCBkZWYgPSB7XG4gICAgICAgICAgICAgICAgLi4uZnVsbERlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgY29kYVR5cGU6ICdjb2RhVHlwZScgaW4gZnVsbERlZmluaXRpb24gPyBmdWxsRGVmaW5pdGlvbi5jb2RhVHlwZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBmb3JtdWxhU2NoZW1hOiAnc2NoZW1hJyBpbiBmdWxsRGVmaW5pdGlvbiA/IGZ1bGxEZWZpbml0aW9uLnNjaGVtYSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCB7IG9uRXJyb3I6IF8sIHJlc3VsdFR5cGU6IHVudXNlZCwgY29kYVR5cGUsIGZvcm11bGFTY2hlbWEsIC4uLnJlc3QgfSA9IGRlZjtcbiAgICAgICAgICAgIGNvbnN0IG51bWVyaWNGb3JtdWxhID0ge1xuICAgICAgICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5udW1iZXIsXG4gICAgICAgICAgICAgICAgc2NoZW1hOiBmb3JtdWxhU2NoZW1hIHx8IChjb2RhVHlwZSA/IHsgdHlwZTogc2NoZW1hXzEuVmFsdWVUeXBlLk51bWJlciwgY29kYVR5cGUgfSA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9ybXVsYSA9IG51bWVyaWNGb3JtdWxhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBzY2hlbWFfMS5WYWx1ZVR5cGUuQm9vbGVhbjoge1xuICAgICAgICAgICAgY29uc3QgeyBvbkVycm9yOiBfLCByZXN1bHRUeXBlOiB1bnVzZWQsIC4uLnJlc3QgfSA9IGZ1bGxEZWZpbml0aW9uO1xuICAgICAgICAgICAgY29uc3QgYm9vbGVhbkZvcm11bGEgPSB7XG4gICAgICAgICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfMy5UeXBlLmJvb2xlYW4sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9ybXVsYSA9IGJvb2xlYW5Gb3JtdWxhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBzY2hlbWFfMS5WYWx1ZVR5cGUuQXJyYXk6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25FcnJvcjogXywgcmVzdWx0VHlwZTogdW51c2VkLCBpdGVtcywgLi4ucmVzdCB9ID0gZnVsbERlZmluaXRpb247XG4gICAgICAgICAgICBjb25zdCBhcnJheUZvcm11bGEgPSB7XG4gICAgICAgICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICAgICAgICAvLyBUeXBlT2Y8U2NoZW1hVHlwZTxBcnJheVNjaGVtYTxTY2hlbWFUPj4+IGlzIGFsd2F5cyBUeXBlLm9iamVjdCBidXQgVFMgY2FuJ3QgaW5mZXIgdGhpcy5cbiAgICAgICAgICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfMy5UeXBlLm9iamVjdCxcbiAgICAgICAgICAgICAgICBzY2hlbWE6ICgwLCBzY2hlbWFfMy5ub3JtYWxpemVTY2hlbWEpKHsgdHlwZTogc2NoZW1hXzEuVmFsdWVUeXBlLkFycmF5LCBpdGVtcyB9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3JtdWxhID0gYXJyYXlGb3JtdWxhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBzY2hlbWFfMS5WYWx1ZVR5cGUuT2JqZWN0OiB7XG4gICAgICAgICAgICBjb25zdCB7IG9uRXJyb3I6IF8sIHJlc3VsdFR5cGU6IHVudXNlZCwgc2NoZW1hLCAuLi5yZXN0IH0gPSBmdWxsRGVmaW5pdGlvbjtcbiAgICAgICAgICAgIC8vIG5lZWQgYSBmb3JjZSBjYXN0IHNpbmNlIGV4ZWN1dGUgaGFzIGEgZGlmZmVyZW50IHJldHVybiB2YWx1ZSBkdWUgdG8ga2V5IG5vcm1hbGl6YXRpb24uXG4gICAgICAgICAgICBjb25zdCBvYmplY3RGb3JtdWxhID0ge1xuICAgICAgICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5vYmplY3QsXG4gICAgICAgICAgICAgICAgc2NoZW1hOiAoMCwgc2NoZW1hXzMubm9ybWFsaXplU2NoZW1hKShzY2hlbWEpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvcm11bGEgPSBvYmplY3RGb3JtdWxhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAoMCwgZW5zdXJlXzEuZW5zdXJlVW5yZWFjaGFibGUpKGZ1bGxEZWZpbml0aW9uKTtcbiAgICB9XG4gICAgY29uc3Qgb25FcnJvciA9IGZ1bGxEZWZpbml0aW9uLm9uRXJyb3I7XG4gICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlZEV4ZWN1dGUgPSBmb3JtdWxhLmV4ZWN1dGU7XG4gICAgICAgIGZvcm11bGEuZXhlY3V0ZSA9IGFzeW5jIGZ1bmN0aW9uIChwYXJhbXMsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHdyYXBwZWRFeGVjdXRlKHBhcmFtcywgY29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKGZvcm11bGEsIGZ1bGxEZWZpbml0aW9uLmNvbm5lY3Rpb25SZXF1aXJlbWVudCk7XG59XG5leHBvcnRzLm1ha2VGb3JtdWxhID0gbWFrZUZvcm11bGE7XG5mdW5jdGlvbiBub3JtYWxpemVQcm9wZXJ0eUF1dG9jb21wbGV0ZVJlc3VsdHNBcnJheShyZXN1bHRzKSB7XG4gICAgcmV0dXJuIHJlc3VsdHMubWFwKHIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHIpLmxlbmd0aCA9PT0gMiAmJiAnZGlzcGxheScgaW4gciAmJiAndmFsdWUnIGluIHIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRpc3BsYXk6IHIuZGlzcGxheSwgdmFsdWU6IHIudmFsdWUgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkaXNwbGF5OiB1bmRlZmluZWQsIHZhbHVlOiByIH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVQcm9wZXJ0eUF1dG9jb21wbGV0ZVJlc3VsdHMocmVzdWx0cykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdHMpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN1bHRzOiBub3JtYWxpemVQcm9wZXJ0eUF1dG9jb21wbGV0ZVJlc3VsdHNBcnJheShyZXN1bHRzKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgeyByZXN1bHRzOiByZXN1bHRzQXJyYXksIC4uLm90aGVyUHJvcHMgfSA9IHJlc3VsdHM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdWx0czogbm9ybWFsaXplUHJvcGVydHlBdXRvY29tcGxldGVSZXN1bHRzQXJyYXkocmVzdWx0c0FycmF5KSxcbiAgICAgICAgLi4ub3RoZXJQcm9wcyxcbiAgICB9O1xufVxuZXhwb3J0cy5ub3JtYWxpemVQcm9wZXJ0eUF1dG9jb21wbGV0ZVJlc3VsdHMgPSBub3JtYWxpemVQcm9wZXJ0eUF1dG9jb21wbGV0ZVJlc3VsdHM7XG4vKipcbiAqIEEgd3JhcHBlciB0aGF0IGdlbmVyYXRlcyBhIGZvcm11bGEgZGVmaW5pdGlvbiBmcm9tIHRoZSBmdW5jdGlvbiB0aGF0IGltcGxlbWVudHMgYSBtZXRhZGF0YSBmb3JtdWxhLlxuICogSXQgaXMgdW5jb21tb24gdG8gZXZlciBuZWVkIHRvIGNhbGwgdGhpcyBkaXJlY3RseSwgbm9ybWFsbHkgeW91IHdvdWxkIGp1c3QgZGVmaW5lIHRoZSBKYXZhU2NyaXB0XG4gKiBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvbiwgYW5kIENvZGEgd2lsbCB3cmFwIGl0IHdpdGggdGhpcyB0byBnZW5lcmF0ZSBhIGZ1bGwgbWV0YWRhdGEgZm9ybXVsYVxuICogZGVmaW5pdGlvbi5cbiAqXG4gKiBBbGwgZnVuY3Rpb24tbGlrZSBiZWhhdmlvciBpbiBhIHBhY2sgaXMgdWx0aW1hdGVseSBpbXBsZW1lbnRlZCB1c2luZyBmb3JtdWxhcywgbGlrZSB5b3Ugd291bGRcbiAqIGRlZmluZSB1c2luZyB7QGxpbmsgbWFrZUZvcm11bGF9LiBUaGF0IGlzLCBhIGZvcm11bGEgd2l0aCBhIG5hbWUsIGRlc2NyaXB0aW9uLCBwYXJhbWV0ZXIgbGlzdCxcbiAqIGFuZCBhbiBgZXhlY3V0ZWAgZnVuY3Rpb24gYm9keS4gVGhpcyBpbmNsdWRlcyBzdXBwb3J0aW5nIHV0aWxpdGllcyBsaWtlIHBhcmFtZXRlciBhdXRvY29tcGxldGUgZnVuY3Rpb25zLlxuICogVGhpcyB3cmFwcGVyIHNpbXBseSBhZGRzIHRoZSBzdXJyb3VuZGluZyBib2lsZXJwbGF0ZSBmb3IgYSBnaXZlbiBKYXZhU2NyaXB0IGZ1bmN0aW9uIHNvIHRoYXRcbiAqIGl0IGlzIHNoYXBlZCBsaWtlIGEgQ29kYSBmb3JtdWxhIHRvIGJlIHVzZWQgYXQgcnVudGltZS5cbiAqL1xuZnVuY3Rpb24gbWFrZU1ldGFkYXRhRm9ybXVsYShleGVjdXRlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG1ha2VPYmplY3RGb3JtdWxhKHtcbiAgICAgICAgbmFtZTogJ2dldE1ldGFkYXRhJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdHZXRzIG1ldGFkYXRhJyxcbiAgICAgICAgLy8gRm9ybXVsYSBjb250ZXh0IGlzIHNlcmlhbGl6ZWQgaGVyZSBiZWNhdXNlIHdlIGRvIG5vdCB3YW50IHRvIHBhc3Mgb2JqZWN0cyBpbnRvXG4gICAgICAgIC8vIHJlZ3VsYXIgcGFjayBmdW5jdGlvbnMgKHdoaWNoIHRoaXMgaXMpXG4gICAgICAgIGV4ZWN1dGUoW3NlYXJjaCwgc2VyaWFsaXplZEZvcm11bGFDb250ZXh0XSwgY29udGV4dCkge1xuICAgICAgICAgICAgbGV0IGZvcm11bGFDb250ZXh0ID0ge307XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvcm11bGFDb250ZXh0ID0gSlNPTi5wYXJzZShzZXJpYWxpemVkRm9ybXVsYUNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vICBJZ25vcmUuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXhlY3V0ZShjb250ZXh0LCBzZWFyY2gsIGZvcm11bGFDb250ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgICAgbWFrZVN0cmluZ1BhcmFtZXRlcignc2VhcmNoJywgJ01ldGFkYXRhIHRvIHNlYXJjaCBmb3InLCB7IG9wdGlvbmFsOiB0cnVlIH0pLFxuICAgICAgICAgICAgbWFrZVN0cmluZ1BhcmFtZXRlcignZm9ybXVsYUNvbnRleHQnLCAnU2VyaWFsaXplZCBKU09OIGZvciBtZXRhZGF0YScsIHsgb3B0aW9uYWw6IHRydWUgfSksXG4gICAgICAgIF0sXG4gICAgICAgIGV4YW1wbGVzOiBbXSxcbiAgICAgICAgY29ubmVjdGlvblJlcXVpcmVtZW50OiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNvbm5lY3Rpb25SZXF1aXJlbWVudCkgfHwgYXBpX3R5cGVzXzEuQ29ubmVjdGlvblJlcXVpcmVtZW50Lk9wdGlvbmFsLFxuICAgIH0pO1xufVxuZXhwb3J0cy5tYWtlTWV0YWRhdGFGb3JtdWxhID0gbWFrZU1ldGFkYXRhRm9ybXVsYTtcbmZ1bmN0aW9uIG1ha2VQcm9wZXJ0eUF1dG9jb21wbGV0ZUZvcm11bGEoZXhlY3V0ZSwgb3B0aW9ucykge1xuICAgIGlmICghKGV4ZWN1dGUgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWYWx1ZSBmb3IgcHJvcGVydHlBdXRvY29tcGxldGUgbXVzdCBiZSBhIGZ1bmN0aW9uYCk7XG4gICAgfVxuICAgIHJldHVybiBtYWtlT2JqZWN0Rm9ybXVsYSh7XG4gICAgICAgIG5hbWU6ICdnZXRQcm9wZXJ0eUF1dG9jb21wbGV0ZU1ldGFkYXRhJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdHZXRzIHByb3BlcnR5IGF1dG9jb21wbGV0ZScsXG4gICAgICAgIGV4ZWN1dGUoW10sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBleGVjdXRlKGNvbnRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXSxcbiAgICAgICAgZXhhbXBsZXM6IFtdLFxuICAgICAgICBjb25uZWN0aW9uUmVxdWlyZW1lbnQ6IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY29ubmVjdGlvblJlcXVpcmVtZW50KSB8fCBhcGlfdHlwZXNfMS5Db25uZWN0aW9uUmVxdWlyZW1lbnQuT3B0aW9uYWwsXG4gICAgfSk7XG59XG4vKipcbiAqIFV0aWxpdHkgdG8gc2VhcmNoIG92ZXIgYW4gYXJyYXkgb2YgYXV0b2NvbXBsZXRlIHJlc3VsdHMgYW5kIHJldHVybiBvbmx5IHRob3NlIHRoYXRcbiAqIG1hdGNoIHRoZSBnaXZlbiBzZWFyY2ggc3RyaW5nLlxuICpcbiAqIFlvdSBjYW4gZG8gdGhpcyB5b3Vyc2VsZiBidXQgdGhpcyBmdW5jdGlvbiBoZWxwcyBzaW1wbGlmeSBtYW55IGNvbW1vbiBzY2VuYXJpb3MuXG4gKiBOb3RlIHRoYXQgaWYgeW91IGhhdmUgYSBoYXJkY29kZWQgbGlzdCBvZiBhdXRvY29tcGxldGUgb3B0aW9ucywgeW91IGNhbiBzaW1wbHkgc3BlY2lmeVxuICogdGhlbSBkaXJlY3RseSBhcyBhIGxpc3QsIHlvdSBuZWVkIG5vdCBhY3R1YWxseSBpbXBsZW1lbnQgYW4gYXV0b2NvbXBsZXRlIGZ1bmN0aW9uLlxuICpcbiAqIFRoZSBwcmltYXJ5IHVzZSBjYXNlIGhlcmUgaXMgZmV0Y2hpbmcgYSBsaXN0IG9mIGFsbCBwb3NzaWJsZSByZXN1bHRzIGZyb20gYW4gQVBJXG4gKiBhbmQgdGhlbiByZWZpbmluZyB0aGVtIHVzaW5nIHRoZSB1c2VyJ3MgY3VycmVudCBzZWFyY2ggc3RyaW5nLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGF1dG9jb21wbGV0ZTogYXN5bmMgZnVuY3Rpb24oY29udGV4dCwgc2VhcmNoKSB7XG4gKiAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHttZXRob2Q6IFwiR0VUXCIsIHVybDogXCIvYXBpL2VudGl0aWVzXCJ9KTtcbiAqICAgY29uc3QgYWxsT3B0aW9ucyA9IHJlc3BvbnNlLmJvZHkuZW50aXRpZXMubWFwKGVudGl0eSA9PiBlbnRpdHkubmFtZSk7XG4gKiAgIHJldHVybiBjb2RhLnNpbXBsZUF1dG9jb21wbGV0ZShzZWFyY2gsIGFsbE9wdGlvbnMpO1xuICogfVxuICogYGBgXG4gKi9cbmZ1bmN0aW9uIHNpbXBsZUF1dG9jb21wbGV0ZShzZWFyY2gsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBub3JtYWxpemVkU2VhcmNoID0gKHNlYXJjaCB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBmaWx0ZXJlZCA9IG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb3B0aW9uID09PSAnbnVtYmVyJyA/IG9wdGlvbiA6IG9wdGlvbi5kaXNwbGF5O1xuICAgICAgICByZXR1cm4gZGlzcGxheS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobm9ybWFsaXplZFNlYXJjaCk7XG4gICAgfSk7XG4gICAgY29uc3QgbWV0YWRhdGFSZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZmlsdGVyZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXRhZGF0YVJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbixcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBvcHRpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgbWV0YWRhdGFSZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24sXG4gICAgICAgICAgICAgICAgZGlzcGxheTogb3B0aW9uLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1ldGFkYXRhUmVzdWx0cy5wdXNoKG9wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRhZGF0YVJlc3VsdHMpO1xufVxuZXhwb3J0cy5zaW1wbGVBdXRvY29tcGxldGUgPSBzaW1wbGVBdXRvY29tcGxldGU7XG4vKipcbiAqIEEgaGVscGVyIHRvIHNlYXJjaCBvdmVyIGEgbGlzdCBvZiBvYmplY3RzIHJlcHJlc2VudGluZyBjYW5kaWRhdGUgc2VhcmNoIHJlc3VsdHMsXG4gKiBmaWx0ZXJpbmcgdG8gb25seSB0aG9zZSB0aGF0IG1hdGNoIGEgc2VhcmNoIHN0cmluZywgYW5kIGNvbnZlcnRpbmcgdGhlIG1hdGNoaW5nXG4gKiBvYmplY3RzIGludG8gdGhlIGZvcm1hdCBuZWVkZWQgZm9yIGF1dG9jb21wbGV0ZSByZXN1bHRzLlxuICpcbiAqIEEgY2FzZS1pbnNlbnNpdGl2ZSBzZWFyY2ggaXMgcGVyZm9ybWVkIG92ZXIgZWFjaCBvYmplY3QncyBgZGlzcGxheUtleWAgcHJvcGVydHkuXG4gKlxuICogQSBjb21tb24gcGF0dGVybiBmb3IgaW1wbGVtZW50aW5nIGF1dG9jb21wbGV0ZSBmb3IgYSBmb3JtdWxhIHBhdHRlcm4gaXMgdG9cbiAqIG1ha2UgYSByZXF1ZXN0IHRvIGFuIEFQSSBlbmRwb2ludCB0aGF0IHJldHVybnMgYSBsaXN0IG9mIGFsbCBlbnRpdGllcyxcbiAqIGFuZCB0aGVuIHRvIHRha2UgdGhlIHVzZXIncyBwYXJ0aWFsIGlucHV0IGFuZCBzZWFyY2ggb3ZlciB0aG9zZSBlbnRpdGllc1xuICogZm9yIG1hdGNoZXMuIFRoZSBoZWxwZXIgZ2VuZXJhbGl6ZXMgdGhpcyB1c2UgY2FzZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICogICB0eXBlOiBQYXJhbWV0ZXJUeXBlLk51bWJlcixcbiAqICAgbmFtZTogXCJ1c2VySWRcIixcbiAqICAgZGVzY3JpcHRpb246IFwiVGhlIElEIG9mIGEgdXNlci5cIixcbiAqICAgYXV0b2NvbXBsZXRlOiBhc3luYyBmdW5jdGlvbihjb250ZXh0LCBzZWFyY2gpIHtcbiAqICAgICAvLyBTdXBwb3NlIHRoaXMgZW5kcG9pbnQgcmV0dXJucyBhIGxpc3Qgb2YgdXNlcnMgdGhhdCBoYXZlIHRoZSBmb3JtXG4gKiAgICAgLy8gYHtuYW1lOiBcIkphbmUgRG9lXCIsIHVzZXJJZDogMTIzLCBlbWFpbDogXCJqYW5lQGRvZS5jb21cIn1gXG4gKiAgICAgY29uc3QgdXNlcnNSZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaChcIi9hcGkvdXNlcnNcIik7XG4gKiAgICAgLy8gVGhpcyB3aWxsIHNlYXJjaCBvdmVyIHRoZSBuYW1lIHByb3BlcnR5IG9mIGVhY2ggb2JqZWN0IGFuZCBmaWx0ZXIgdG8gb25seVxuICogICAgIC8vIHRob3NlIHRoYXQgbWF0Y2guIFRoZW4gaXQgd2lsbCB0cmFuc2Zvcm0gdGhlIG1hdGNoaW5nIG9iamVjdHMgaW50byB0aGUgZm9ybVxuICogICAgIC8vIGB7ZGlzcGxheTogXCJKYW5lIERvZVwiLCB2YWx1ZTogMTIzfWAgd2hpY2ggaXMgd2hhdCBpcyByZXF1aXJlZCB0byByZW5kZXJcbiAqICAgICAvLyBhdXRvY29tcGxldGUgcmVzcG9uc2VzLlxuICogICAgIHJldHVybiBjb2RhLmF1dG9jb21wbGV0ZVNlYXJjaE9iamVjdHMoc2VhcmNoLCB1c2Vyc1Jlc3BvbnNlLmJvZHksIFwibmFtZVwiLCBcInVzZXJJZFwiKTtcbiAqICAgfVxuICogfSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gYXV0b2NvbXBsZXRlU2VhcmNoT2JqZWN0cyhzZWFyY2gsIG9ianMsIGRpc3BsYXlLZXksIHZhbHVlS2V5KSB7XG4gICAgaWYgKHR5cGVvZiBzZWFyY2ggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGluZyBhIHN0cmluZyBmb3IgXCJzZWFyY2hcIiBwYXJhbWV0ZXIgYnV0IHJlY2VpdmVkICR7c2VhcmNofWApO1xuICAgIH1cbiAgICBjb25zdCBub3JtYWxpemVkU2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZmlsdGVyZWQgPSBvYmpzLmZpbHRlcihvID0+IG9bZGlzcGxheUtleV0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhub3JtYWxpemVkU2VhcmNoKSk7XG4gICAgY29uc3QgbWV0YWRhdGFSZXN1bHRzID0gZmlsdGVyZWQubWFwKG8gPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IG9bdmFsdWVLZXldLFxuICAgICAgICAgICAgZGlzcGxheTogb1tkaXNwbGF5S2V5XSxcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1ldGFkYXRhUmVzdWx0cyk7XG59XG5leHBvcnRzLmF1dG9jb21wbGV0ZVNlYXJjaE9iamVjdHMgPSBhdXRvY29tcGxldGVTZWFyY2hPYmplY3RzO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCBJZiB5b3UgaGF2ZSBhIGhhcmRjb2RlZCBhcnJheSBvZiBhdXRvY29tcGxldGUgb3B0aW9ucywgc2ltcGx5IGluY2x1ZGUgdGhhdCBhcnJheVxuICogYXMgdGhlIHZhbHVlIG9mIHRoZSBgYXV0b2NvbXBsZXRlYCBwcm9wZXJ0eSBpbiB5b3VyIHBhcmFtZXRlciBkZWZpbml0aW9uLiBUaGVyZSBpcyBubyBsb25nZXJcbiAqIGFueSBuZWVkZWQgdG8gd3JhcCBhIHZhbHVlIHdpdGggdGhpcyBmb3JtdWxhLlxuICovXG5mdW5jdGlvbiBtYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbWFrZU1ldGFkYXRhRm9ybXVsYSgoY29udGV4dCwgW3NlYXJjaF0pID0+IHNpbXBsZUF1dG9jb21wbGV0ZShzZWFyY2gsIG9wdGlvbnMpLCB7XG4gICAgICAgIC8vIEEgY29ubmVjdGlvbiB3b24ndCBiZSB1c2VkIGhlcmUsIGJ1dCBpZiB0aGUgcGFyZW50IGZvcm11bGEgdXNlcyBhIGNvbm5lY3Rpb25cbiAgICAgICAgLy8gdGhlIGV4ZWN1dGlvbiBjb2RlIGlzIGdvaW5nIHRvIHRyeSB0byBwYXNzIGl0IGhlcmUuIFdlIHNob3VsZCBmaXggdGhhdC5cbiAgICAgICAgY29ubmVjdGlvblJlcXVpcmVtZW50OiBhcGlfdHlwZXNfMS5Db25uZWN0aW9uUmVxdWlyZW1lbnQuT3B0aW9uYWwsXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VTaW1wbGVBdXRvY29tcGxldGVNZXRhZGF0YUZvcm11bGEgPSBtYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhO1xuZnVuY3Rpb24gaXNSZXNwb25zZUhhbmRsZXJUZW1wbGF0ZShvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5zY2hlbWE7XG59XG5mdW5jdGlvbiBpc1Jlc3BvbnNlRXhhbXBsZVRlbXBsYXRlKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLmV4YW1wbGU7XG59XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VPYmplY3RGb3JtdWxhKHsgcmVzcG9uc2UsIC4uLmRlZmluaXRpb24gfSkge1xuICAgIGxldCBzY2hlbWE7XG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChpc1Jlc3BvbnNlSGFuZGxlclRlbXBsYXRlKHJlc3BvbnNlKSAmJiByZXNwb25zZS5zY2hlbWEpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNjaGVtYSA9ICgwLCBzY2hlbWFfMy5ub3JtYWxpemVTY2hlbWEpKHJlc3BvbnNlLnNjaGVtYSk7XG4gICAgICAgICAgICBzY2hlbWEgPSByZXNwb25zZS5zY2hlbWE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNSZXNwb25zZUV4YW1wbGVUZW1wbGF0ZShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIC8vIFRPRE8oYWxleGQpOiBGaWd1cmUgb3V0IHdoYXQgdG8gZG8gd2l0aCBleGFtcGxlcy5cbiAgICAgICAgICAgIC8vIHNjaGVtYSA9IGdlbmVyYXRlU2NoZW1hKHJlc3BvbnNlLmV4YW1wbGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBleGVjdXRlID0gZGVmaW5pdGlvbi5leGVjdXRlO1xuICAgIGlmIChpc1Jlc3BvbnNlSGFuZGxlclRlbXBsYXRlKHJlc3BvbnNlKSkge1xuICAgICAgICBjb25zdCB7IG9uRXJyb3IgfSA9IHJlc3BvbnNlO1xuICAgICAgICBjb25zdCB3cmFwcGVkRXhlY3V0ZSA9IGV4ZWN1dGU7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlSGFuZGxlciA9ICgwLCBoYW5kbGVyX3RlbXBsYXRlc18xLmdlbmVyYXRlT2JqZWN0UmVzcG9uc2VIYW5kbGVyKShyZXNwb25zZSk7XG4gICAgICAgIGV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbiBleGVjKHBhcmFtcywgY29udGV4dCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgd3JhcHBlZEV4ZWN1dGUocGFyYW1zLCBjb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBvbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlSGFuZGxlcih7IGJvZHk6IHJlc3VsdCB8fCB7fSwgc3RhdHVzOiAyMDAsIGhlYWRlcnM6IHt9IH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmaW5pdGlvbiwge1xuICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfMy5UeXBlLm9iamVjdCxcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgc2NoZW1hLFxuICAgIH0pO1xufVxuZXhwb3J0cy5tYWtlT2JqZWN0Rm9ybXVsYSA9IG1ha2VPYmplY3RGb3JtdWxhO1xuLyoqXG4gKiBXcmFwcGVyIHRvIHByb2R1Y2UgYSBzeW5jIHRhYmxlIGRlZmluaXRpb24uIEFsbCAobm9uLWR5bmFtaWMpIHN5bmMgdGFibGVzIHNob3VsZCBiZSBjcmVhdGVkXG4gKiB1c2luZyB0aGlzIHdyYXBwZXIgcmF0aGVyIHRoYW4gZGVjbGFyaW5nIGEgc3luYyB0YWJsZSBkZWZpbml0aW9uIG9iamVjdCBkaXJlY3RseS5cbiAqXG4gKiBUaGlzIHdyYXBwZXIgZG9lcyBhIHZhcmlldHkgb2YgaGVscGZ1bCB0aGluZ3MsIGluY2x1ZGluZ1xuICogKiBEb2luZyBiYXNpYyB2YWxpZGF0aW9uIG9mIHRoZSBwcm92aWRlZCBkZWZpbml0aW9uLlxuICogKiBOb3JtYWxpemluZyB0aGUgc2NoZW1hIGRlZmluaXRpb24gdG8gY29uZm9ybSB0byBDb2RhLXJlY29tbWVuZGVkIHN5bnRheC5cbiAqICogV3JhcHBpbmcgdGhlIGV4ZWN1dGUgZm9ybXVsYSB0byBub3JtYWxpemUgcmV0dXJuIHZhbHVlcyB0byBtYXRjaCB0aGUgbm9ybWFsaXplZCBzY2hlbWEuXG4gKlxuICogU2VlIFtOb3JtYWxpemF0aW9uXSgvaW5kZXguaHRtbCNub3JtYWxpemF0aW9uKSBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBzY2hlbWEgbm9ybWFsaXphdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWFrZVN5bmNUYWJsZSh7IG5hbWUsIGRlc2NyaXB0aW9uLCBpZGVudGl0eU5hbWUsIHNjaGVtYTogaW5wdXRTY2hlbWEsIGZvcm11bGEsIHByb3BlcnR5QXV0b2NvbXBsZXRlLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQsIGR5bmFtaWNPcHRpb25zID0ge30sIH0pIHtcbiAgICBjb25zdCB7IGdldFNjaGVtYTogZ2V0U2NoZW1hRGVmLCBlbnRpdHlOYW1lLCBkZWZhdWx0QWRkRHluYW1pY0NvbHVtbnMgfSA9IGR5bmFtaWNPcHRpb25zO1xuICAgIGNvbnN0IHsgZXhlY3V0ZTogd3JhcHBlZEV4ZWN1dGUsIGV4ZWN1dGVVcGRhdGU6IHdyYXBwZWRFeGVjdXRlVXBkYXRlLCAuLi5kZWZpbml0aW9uIH0gPSBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShmb3JtdWxhLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpO1xuICAgIGNvbnN0IHdyYXBwZWRBdXRvY29tcGxldGUgPSBwcm9wZXJ0eUF1dG9jb21wbGV0ZSA/IG1ha2VQcm9wZXJ0eUF1dG9jb21wbGV0ZUZvcm11bGEocHJvcGVydHlBdXRvY29tcGxldGUpIDogdW5kZWZpbmVkO1xuICAgIC8vIFNpbmNlIHdlIG11dGF0ZSBzY2hlbWFEZWYsIHdlIG5lZWQgdG8gbWFrZSBhIGNvcHkgc28gdGhlIGlucHV0IHNjaGVtYSBjYW4gYmUgcmV1c2VkIGFjcm9zcyBzeW5jIHRhYmxlcy5cbiAgICBjb25zdCBzY2hlbWFEZWYgPSAoMCwgb2JqZWN0X3V0aWxzXzEuZGVlcENvcHkpKGlucHV0U2NoZW1hKTtcbiAgICAvLyBIeWRyYXRlIHRoZSBzY2hlbWEncyBpZGVudGl0eS5cbiAgICBpZiAoIWlkZW50aXR5TmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5bmMgdGFibGUgc2NoZW1hcyBtdXN0IHNldCBhbiBpZGVudGl0eU5hbWVgKTtcbiAgICB9XG4gICAgaWYgKHNjaGVtYURlZi5pZGVudGl0eSkge1xuICAgICAgICBpZiAoc2NoZW1hRGVmLmlkZW50aXR5Lm5hbWUgJiYgc2NoZW1hRGVmLmlkZW50aXR5Lm5hbWUgIT09IGlkZW50aXR5TmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJZGVudGl0eSBuYW1lIG1pc21hdGNoIGZvciBzeW5jIHRhYmxlICR7bmFtZX0uIEVpdGhlciByZW1vdmUgdGhlIHNjaGVtYSdzIGlkZW50aXR5Lm5hbWUgKCR7c2NoZW1hRGVmLmlkZW50aXR5Lm5hbWV9KSBvciBlbnN1cmUgaXQgbWF0Y2hlcyB0aGUgdGFibGUncyBpZGVudGl0eU5hbWUgKCR7aWRlbnRpdHlOYW1lfSkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgc2NoZW1hRGVmLmlkZW50aXR5ID0geyAuLi5zY2hlbWFEZWYuaWRlbnRpdHksIG5hbWU6IGlkZW50aXR5TmFtZSB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2NoZW1hRGVmLmlkZW50aXR5ID0geyBuYW1lOiBpZGVudGl0eU5hbWUgfTtcbiAgICB9XG4gICAgY29uc3QgZ2V0U2NoZW1hID0gd3JhcEdldFNjaGVtYSh3cmFwTWV0YWRhdGFGdW5jdGlvbihnZXRTY2hlbWFEZWYpKTtcbiAgICBjb25zdCBzY2hlbWEgPSAoMCwgc2NoZW1hXzIubWFrZU9iamVjdFNjaGVtYSkoc2NoZW1hRGVmKTtcbiAgICBjb25zdCBmb3JtdWxhU2NoZW1hID0gZ2V0U2NoZW1hXG4gICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgIDogKDAsIHNjaGVtYV8zLm5vcm1hbGl6ZVNjaGVtYSkoeyB0eXBlOiBzY2hlbWFfMS5WYWx1ZVR5cGUuQXJyYXksIGl0ZW1zOiBzY2hlbWEgfSk7XG4gICAgY29uc3QgeyBpZGVudGl0eSwgaWQsIHByaW1hcnkgfSA9ICgwLCBtaWdyYXRpb25fMS5vYmplY3RTY2hlbWFIZWxwZXIpKHNjaGVtYSk7XG4gICAgaWYgKCEocHJpbWFyeSAmJiBpZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTeW5jIHRhYmxlIHNjaGVtYXMgc2hvdWxkIGhhdmUgZGVmaW5lZCBwcm9wZXJ0aWVzIGZvciBpZFByb3BlcnR5IGFuZCBkaXNwbGF5UHJvcGVydHlgKTtcbiAgICB9XG4gICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZXJyb3IgY3JlYXRpbmcgc3luYyB0YWJsZSBpZGVudGl0eWApO1xuICAgIH1cbiAgICBpZiAobmFtZS5pbmNsdWRlcygnICcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3luYyB0YWJsZSBuYW1lIHNob3VsZCBub3QgaW5jbHVkZSBzcGFjZXMnKTtcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2VIYW5kbGVyID0gKDAsIGhhbmRsZXJfdGVtcGxhdGVzXzEuZ2VuZXJhdGVPYmplY3RSZXNwb25zZUhhbmRsZXIpKHsgc2NoZW1hOiBmb3JtdWxhU2NoZW1hIH0pO1xuICAgIGNvbnN0IGV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbiBleGVjKHBhcmFtcywgY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IHJlc3VsdCwgY29udGludWF0aW9uIH0gPSAoYXdhaXQgd3JhcHBlZEV4ZWN1dGUocGFyYW1zLCBjb250ZXh0KSkgfHwge307XG4gICAgICAgIGNvbnN0IGFwcGxpZWRTY2hlbWEgPSBjb250ZXh0LnN5bmMuc2NoZW1hO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdWx0OiByZXNwb25zZUhhbmRsZXIoeyBib2R5OiByZXN1bHQgfHwgW10sIHN0YXR1czogMjAwLCBoZWFkZXJzOiB7fSB9LCBhcHBsaWVkU2NoZW1hKSxcbiAgICAgICAgICAgIGNvbnRpbnVhdGlvbixcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIGNvbnN0IGV4ZWN1dGVVcGRhdGUgPSB3cmFwcGVkRXhlY3V0ZVVwZGF0ZVxuICAgICAgICA/IGFzeW5jIGZ1bmN0aW9uIGV4ZWNVcGRhdGUocGFyYW1zLCB1cGRhdGVzLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB7IHJlc3VsdCB9ID0gKGF3YWl0IHdyYXBwZWRFeGVjdXRlVXBkYXRlKHBhcmFtcywgdXBkYXRlcywgY29udGV4dCkpIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgYXBwbGllZFNjaGVtYSA9IGNvbnRleHQuc3luYy5zY2hlbWE7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzcG9uc2VIYW5kbGVyKHsgYm9keTogcmVzdWx0IHx8IFtdLCBzdGF0dXM6IDIwMCwgaGVhZGVyczoge30gfSwgYXBwbGllZFNjaGVtYSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBzY2hlbWE6ICgwLCBzY2hlbWFfMy5ub3JtYWxpemVTY2hlbWEpKHNjaGVtYSksXG4gICAgICAgIGlkZW50aXR5TmFtZSxcbiAgICAgICAgZ2V0dGVyOiB7XG4gICAgICAgICAgICAuLi5kZWZpbml0aW9uLFxuICAgICAgICAgICAgY2FjaGVUdGxTZWNzOiAwLFxuICAgICAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgICAgIGV4ZWN1dGVVcGRhdGU6IGV4ZWN1dGVVcGRhdGUsXG4gICAgICAgICAgICBzY2hlbWE6IGZvcm11bGFTY2hlbWEsXG4gICAgICAgICAgICBpc1N5bmNGb3JtdWxhOiB0cnVlLFxuICAgICAgICAgICAgc3VwcG9ydHNVcGRhdGVzOiBCb29sZWFuKGV4ZWN1dGVVcGRhdGUpLFxuICAgICAgICAgICAgY29ubmVjdGlvblJlcXVpcmVtZW50OiBkZWZpbml0aW9uLmNvbm5lY3Rpb25SZXF1aXJlbWVudCB8fCBjb25uZWN0aW9uUmVxdWlyZW1lbnQsXG4gICAgICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfMy5UeXBlLm9iamVjdCxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydHlBdXRvY29tcGxldGU6IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKHdyYXBwZWRBdXRvY29tcGxldGUsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgIGdldFNjaGVtYTogbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEoZ2V0U2NoZW1hLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICBlbnRpdHlOYW1lLFxuICAgICAgICBkZWZhdWx0QWRkRHluYW1pY0NvbHVtbnMsXG4gICAgfTtcbn1cbmV4cG9ydHMubWFrZVN5bmNUYWJsZSA9IG1ha2VTeW5jVGFibGU7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VTeW5jVGFibGVMZWdhY3kobmFtZSwgc2NoZW1hLCBmb3JtdWxhLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQsIGR5bmFtaWNPcHRpb25zID0ge30pIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCEoKF9hID0gc2NoZW1hLmlkZW50aXR5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMZWdhY3kgc3luYyB0YWJsZXMgbXVzdCBzcGVjaWZ5IGlkZW50aXR5Lm5hbWUnKTtcbiAgICB9XG4gICAgaWYgKHNjaGVtYS5fX3BhY2tJZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhlIF9fcGFja0lkIGZpZWxkLCBpdCBpcyBvbmx5IGZvciBpbnRlcm5hbCBDb2RhIHVzZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VTeW5jVGFibGUoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpZGVudGl0eU5hbWU6IHNjaGVtYS5pZGVudGl0eS5uYW1lLFxuICAgICAgICBzY2hlbWEsXG4gICAgICAgIGZvcm11bGEsXG4gICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgZHluYW1pY09wdGlvbnMsXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VTeW5jVGFibGVMZWdhY3kgPSBtYWtlU3luY1RhYmxlTGVnYWN5O1xuLyoqXG4gKiBJbmNsdWRlcyB0aGUgdW5yZWxlYXNlZCBwcm9wZXJ0eUF1dG9jb21wbGV0ZSBwYXJhbWV0ZXIuXG4gKiBAaGlkZGVuXG4gKi9cbmZ1bmN0aW9uIG1ha2VEeW5hbWljU3luY1RhYmxlKHsgbmFtZSwgZGVzY3JpcHRpb24sIGdldE5hbWU6IGdldE5hbWVEZWYsIGdldFNjaGVtYTogZ2V0U2NoZW1hRGVmLCBpZGVudGl0eU5hbWUsIGdldERpc3BsYXlVcmw6IGdldERpc3BsYXlVcmxEZWYsIGZvcm11bGEsIGxpc3REeW5hbWljVXJsczogbGlzdER5bmFtaWNVcmxzRGVmLCBzZWFyY2hEeW5hbWljVXJsczogc2VhcmNoRHluYW1pY1VybHNEZWYsIGVudGl0eU5hbWUsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCwgZGVmYXVsdEFkZER5bmFtaWNDb2x1bW5zLCBwbGFjZWhvbGRlclNjaGVtYTogcGxhY2Vob2xkZXJTY2hlbWFJbnB1dCwgcHJvcGVydHlBdXRvY29tcGxldGUsIH0pIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlclNjaGVtYSA9IHBsYWNlaG9sZGVyU2NoZW1hSW5wdXQgfHxcbiAgICAgICAgLy8gZGVmYXVsdCBwbGFjZWhvbGRlciBvbmx5IHNob3dzIGEgY29sdW1uIG9mIGlkLCB3aGljaCB3aWxsIGJlIHJlcGxhY2VkIGxhdGVyIGJ5IHRoZSBkeW5hbWljIHNjaGVtYS5cbiAgICAgICAgKDAsIHNjaGVtYV8yLm1ha2VPYmplY3RTY2hlbWEpKHtcbiAgICAgICAgICAgIHR5cGU6IHNjaGVtYV8xLlZhbHVlVHlwZS5PYmplY3QsXG4gICAgICAgICAgICBpZFByb3BlcnR5OiAnaWQnLFxuICAgICAgICAgICAgZGlzcGxheVByb3BlcnR5OiAnaWQnLFxuICAgICAgICAgICAgaWRlbnRpdHk6IHsgbmFtZTogaWRlbnRpdHlOYW1lIH0sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogc2NoZW1hXzEuVmFsdWVUeXBlLlN0cmluZyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgY29uc3QgZ2V0TmFtZSA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldE5hbWVEZWYpO1xuICAgIGNvbnN0IGdldFNjaGVtYSA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldFNjaGVtYURlZik7XG4gICAgY29uc3QgZ2V0RGlzcGxheVVybCA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldERpc3BsYXlVcmxEZWYpO1xuICAgIGNvbnN0IGxpc3REeW5hbWljVXJscyA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGxpc3REeW5hbWljVXJsc0RlZik7XG4gICAgY29uc3Qgc2VhcmNoRHluYW1pY1VybHMgPSB3cmFwTWV0YWRhdGFGdW5jdGlvbihzZWFyY2hEeW5hbWljVXJsc0RlZik7XG4gICAgY29uc3QgdGFibGUgPSBtYWtlU3luY1RhYmxlKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGlkZW50aXR5TmFtZSxcbiAgICAgICAgc2NoZW1hOiBwbGFjZWhvbGRlclNjaGVtYSxcbiAgICAgICAgZm9ybXVsYSxcbiAgICAgICAgY29ubmVjdGlvblJlcXVpcmVtZW50LFxuICAgICAgICBkeW5hbWljT3B0aW9uczogeyBnZXRTY2hlbWEsIGVudGl0eU5hbWUsIGRlZmF1bHRBZGREeW5hbWljQ29sdW1ucyB9LFxuICAgICAgICBwcm9wZXJ0eUF1dG9jb21wbGV0ZSxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi50YWJsZSxcbiAgICAgICAgaXNEeW5hbWljOiB0cnVlLFxuICAgICAgICBnZXREaXNwbGF5VXJsOiBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShnZXREaXNwbGF5VXJsLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICBsaXN0RHluYW1pY1VybHM6IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKGxpc3REeW5hbWljVXJscywgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgc2VhcmNoRHluYW1pY1VybHM6IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKHNlYXJjaER5bmFtaWNVcmxzLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICBnZXROYW1lOiBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShnZXROYW1lLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgIH07XG59XG5leHBvcnRzLm1ha2VEeW5hbWljU3luY1RhYmxlID0gbWFrZUR5bmFtaWNTeW5jVGFibGU7XG4vKipcbiAqIEhlbHBlciB0byBnZW5lcmF0ZSBhIGZvcm11bGEgdGhhdCBmZXRjaGVzIGEgbGlzdCBvZiBlbnRpdGllcyBmcm9tIGEgZ2l2ZW4gVVJMIGFuZCByZXR1cm5zIHRoZW0uXG4gKlxuICogT25lIG9mIHRoZSBzaW1wbGVzdCBidXQgbW9zdCBjb21tb24gdXNlIGNhc2VzIGZvciBhIHBhY2sgZm9ybXVsYSBpcyB0byBtYWtlIGEgcmVxdWVzdCB0byBhbiBBUElcbiAqIGVuZHBvaW50IHRoYXQgcmV0dXJucyBhIGxpc3Qgb2Ygb2JqZWN0cywgYW5kIHRoZW4gcmV0dXJuIHRob3NlIG9iamVjdHMgZWl0aGVyIGFzLWlzXG4gKiBvciB3aXRoIHNsaWdodCB0cmFuc2Zvcm1hdGlvbnMuIFRoZSBjYW4gYmUgYWNjb21wbGlzaGVkIHdpdGggYW4gYGV4ZWN1dGVgIGZ1bmN0aW9uIHRoYXQgZG9lc1xuICogZXhhY3RseSB0aGF0LCBidXQgYWx0ZXJuYXRpdmVseSB5b3UgY291bGQgdXNlIGBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYWAgYW5kIGFuXG4gKiBgZXhlY3V0ZWAgaW1wbGVtZW50YXRpb24gd2lsbCBiZSBnZW5lcmF0ZWQgZm9yIHlvdS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYSh7XG4gKiAgIG5hbWU6IFwiVXNlcnNcIixcbiAqICAgZGVzY3JpcHRpb246IFwiUmV0dXJucyBhIGxpc3Qgb2YgdXNlcnMuXCJcbiAqICAgLy8gVGhpcyB3aWxsIGdlbmVyYXRlIGFuIGBleGVjdXRlYCBmdW5jdGlvbiB0aGF0IG1ha2VzIGEgR0VUIHJlcXVlc3QgdG8gdGhlIGdpdmVuIFVSTC5cbiAqICAgcmVxdWVzdDoge1xuICogICAgIG1ldGhvZDogJ0dFVCcsXG4gKiAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnMnLFxuICogICB9LFxuICogICByZXNwb25zZToge1xuICogICAgIC8vIFN1cHBvc2UgdGhlIHJlc3BvbnNlIGJvZHkgaGFzIHRoZSBmb3JtIGB7dXNlcnM6IFt7IC4uLnVzZXIxIH0sIHsgLi4udXNlcjIgfV19YC5cbiAqICAgICAvLyBUaGlzIFwicHJvamVjdGlvblwiIGtleSB0ZWxscyB0aGUgYGV4ZWN1dGVgIGZ1bmN0aW9uIHRoYXQgdGhlIGxpc3Qgb2YgcmVzdWx0cyB0byByZXR1cm5cbiAqICAgICAvLyBjYW4gYmUgZm91bmQgaW4gdGhlIG9iamVjdCBwcm9wZXJ0eSBgdXNlcnNgLiBJZiBvbWl0dGVkLCB0aGUgcmVzcG9uc2UgYm9keSBpdHNlbGZcbiAqICAgICAvLyBzaG91bGQgYmUgdGhlIGxpc3Qgb2YgcmVzdWx0cy5cbiAqICAgICBwcm9qZWN0S2V5OiAndXNlcnMnLFxuICogICAgIHNjaGVtYTogVXNlclNjaGVtYSxcbiAqICAgfSxcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYSh7IHJlc3BvbnNlLCAuLi5kZWZpbml0aW9uIH0pIHtcbiAgICBjb25zdCB7IHJlcXVlc3QsIC4uLnJlc3QgfSA9IGRlZmluaXRpb247XG4gICAgY29uc3QgeyBwYXJhbWV0ZXJzIH0gPSByZXN0O1xuICAgIHJlc3BvbnNlLnNjaGVtYSA9IHJlc3BvbnNlLnNjaGVtYSA/ICgwLCBzY2hlbWFfMy5ub3JtYWxpemVTY2hlbWEpKHJlc3BvbnNlLnNjaGVtYSkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgeyBvbkVycm9yIH0gPSByZXNwb25zZTtcbiAgICBjb25zdCByZXF1ZXN0SGFuZGxlciA9ICgwLCBoYW5kbGVyX3RlbXBsYXRlc18yLmdlbmVyYXRlUmVxdWVzdEhhbmRsZXIpKHJlcXVlc3QsIHBhcmFtZXRlcnMpO1xuICAgIGNvbnN0IHJlc3BvbnNlSGFuZGxlciA9ICgwLCBoYW5kbGVyX3RlbXBsYXRlc18xLmdlbmVyYXRlT2JqZWN0UmVzcG9uc2VIYW5kbGVyKShyZXNwb25zZSk7XG4gICAgZnVuY3Rpb24gZXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuZmV0Y2hlclxuICAgICAgICAgICAgLmZldGNoKHJlcXVlc3RIYW5kbGVyKHBhcmFtcykpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlSGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZXN0LCB7XG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc18zLlR5cGUub2JqZWN0LFxuICAgICAgICBzY2hlbWE6IHJlc3BvbnNlLnNjaGVtYSxcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFrZVRyYW5zbGF0ZU9iamVjdEZvcm11bGEgPSBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYTtcbi8vIFRPRE8oam9uYXRoYW4vZWtvbGVkYSk6IEZsZXNoIG91dCBhIGd1aWRlIGZvciBlbXB0eSBmb3JtdWxhcyBpZiB0aGlzIGlzIHNvbWV0aGluZyB3ZSBjYXJlIHRvIHN1cHBvcnQuXG4vLyBXZSBwcm9iYWJseSBhbHNvIG5lZWQgdGhlIGJ1aWxkZXIncyBhZGRGb3JtdWxhKCkgbWV0aG9kIHRvIHN1cHBvcnQgZW1wdHkgZm9ybXVsYSBkZWZzIGlmIGl0IGRvZXNuJ3QgYWxyZWFkeS5cbi8qKlxuICogQ3JlYXRlcyB0aGUgZGVmaW5pdGlvbiBvZiBhbiBcImVtcHR5XCIgZm9ybXVsYSwgdGhhdCBpcywgYSBmb3JtdWxhIHRoYXQgdXNlcyBhIHtAbGluayBSZXF1ZXN0SGFuZGxlclRlbXBsYXRlfVxuICogdG8gZGVmaW5lIGFuIGltcGxlbWVudGF0aW9uIGZvciB0aGUgZm9ybXVsYSByYXRoZXIgdGhhbiBpbXBsZW1lbnRpbmcgYW4gYWN0dWFsIGBleGVjdXRlYCBmdW5jdGlvblxuICogaW4gSmF2YVNjcmlwdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb2RhLm1ha2VFbXB0eUZvcm11bGEoe1xuICAgIG5hbWU6IFwiR2V0V2lkZ2V0XCIsXG4gICAgZGVzY3JpcHRpb246IFwiR2V0cyBhIHdpZGdldC5cIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICB1cmw6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbS93aWRnZXRzL3tpZH1cIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB9LFxuICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgIGNvZGEubWFrZVBhcmFtZXRlcih7dHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlciwgbmFtZTogXCJpZFwiLCBkZXNjcmlwdGlvbjogXCJUaGUgSUQgb2YgdGhlIHdpZGdldCB0byBnZXQuXCJ9KSxcbiAgICBdLFxuICB9KSxcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBtYWtlRW1wdHlGb3JtdWxhKGRlZmluaXRpb24pIHtcbiAgICBjb25zdCB7IHJlcXVlc3QsIC4uLnJlc3QgfSA9IGRlZmluaXRpb247XG4gICAgY29uc3QgeyBwYXJhbWV0ZXJzIH0gPSByZXN0O1xuICAgIGNvbnN0IHJlcXVlc3RIYW5kbGVyID0gKDAsIGhhbmRsZXJfdGVtcGxhdGVzXzIuZ2VuZXJhdGVSZXF1ZXN0SGFuZGxlcikocmVxdWVzdCwgcGFyYW1ldGVycyk7XG4gICAgZnVuY3Rpb24gZXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuZmV0Y2hlci5mZXRjaChyZXF1ZXN0SGFuZGxlcihwYXJhbXMpKS50aGVuKCgpID0+ICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJlc3QsIHtcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5zdHJpbmcsXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VFbXB0eUZvcm11bGEgPSBtYWtlRW1wdHlGb3JtdWxhO1xuZnVuY3Rpb24gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEoZm9ybXVsYSwgY29ubmVjdGlvblJlcXVpcmVtZW50KSB7XG4gICAgdmFyIF9hO1xuICAgIGlmIChmb3JtdWxhICYmIGNvbm5lY3Rpb25SZXF1aXJlbWVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZm9ybXVsYSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IGZvcm11bGEucGFyYW1ldGVycy5tYXAoKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucGFyYW0sXG4gICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogcGFyYW0uYXV0b2NvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKHBhcmFtLmF1dG9jb21wbGV0ZSwgY29ubmVjdGlvblJlcXVpcmVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmFyYXJnUGFyYW1ldGVyczogKF9hID0gZm9ybXVsYS52YXJhcmdQYXJhbWV0ZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnBhcmFtLFxuICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IHBhcmFtLmF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShwYXJhbS5hdXRvY29tcGxldGUsIGNvbm5lY3Rpb25SZXF1aXJlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm11bGE7XG59XG5leHBvcnRzLm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhID0gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGE7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBhY2tEZWZpbml0aW9uQnVpbGRlciA9IGV4cG9ydHMubmV3UGFjayA9IHZvaWQgMDtcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcbmNvbnN0IGFwaV90eXBlc18xID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBhcGlfMiA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IGFwaV8zID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuY29uc3QgYXBpXzQgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBhcGlfNSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IG1pZ3JhdGlvbl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9taWdyYXRpb25cIik7XG5jb25zdCBhcGlfNiA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBza2VsZXRvbiBwYWNrIGRlZmluaXRpb24gdGhhdCBjYW4gYmUgYWRkZWQgdG8uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogZXhwb3J0IGNvbnN0IHBhY2sgPSBuZXdQYWNrKCk7XG4gKiBwYWNrLmFkZEZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIG5hbWU6ICdNeUZvcm11bGEnLCAuLi59KTtcbiAqIHBhY2suYWRkU3luY1RhYmxlKCdNeVRhYmxlJywgLi4uKTtcbiAqIHBhY2suc2V0VXNlckF1dGhlbnRpY2F0aW9uKHt0eXBlOiBBdXRoZW50aWNhdGlvblR5cGUuSGVhZGVyQmVhcmVyVG9rZW59KTtcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBuZXdQYWNrKGRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gbmV3IFBhY2tEZWZpbml0aW9uQnVpbGRlcihkZWZpbml0aW9uKTtcbn1cbmV4cG9ydHMubmV3UGFjayA9IG5ld1BhY2s7XG4vKipcbiAqIEEgY2xhc3MgdGhhdCBhc3Npc3RzIGluIGNvbnN0cnVjdGluZyBhIHBhY2sgZGVmaW5pdGlvbi4gVXNlIHtAbGluayBuZXdQYWNrfSB0byBjcmVhdGUgb25lLlxuICovXG5jbGFzcyBQYWNrRGVmaW5pdGlvbkJ1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSB7QGxpbmsgUGFja0RlZmluaXRpb25CdWlsZGVyfS4gSG93ZXZlciwgYGNvZGEubmV3UGFjaygpYCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkXG4gICAgICogcmF0aGVyIHRoYW4gY29uc3RydWN0aW5nIGEgYnVpbGRlciBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IHsgZm9ybXVsYXMsIGZvcm1hdHMsIHN5bmNUYWJsZXMsIG5ldHdvcmtEb21haW5zLCBkZWZhdWx0QXV0aGVudGljYXRpb24sIHN5c3RlbUNvbm5lY3Rpb25BdXRoZW50aWNhdGlvbiwgdmVyc2lvbiwgZm9ybXVsYU5hbWVzcGFjZSwgfSA9IGRlZmluaXRpb24gfHwge307XG4gICAgICAgIHRoaXMuZm9ybXVsYXMgPSBmb3JtdWxhcyB8fCBbXTtcbiAgICAgICAgdGhpcy5mb3JtYXRzID0gZm9ybWF0cyB8fCBbXTtcbiAgICAgICAgdGhpcy5zeW5jVGFibGVzID0gc3luY1RhYmxlcyB8fCBbXTtcbiAgICAgICAgdGhpcy5uZXR3b3JrRG9tYWlucyA9IG5ldHdvcmtEb21haW5zIHx8IFtdO1xuICAgICAgICB0aGlzLmRlZmF1bHRBdXRoZW50aWNhdGlvbiA9IGRlZmF1bHRBdXRoZW50aWNhdGlvbjtcbiAgICAgICAgdGhpcy5zeXN0ZW1Db25uZWN0aW9uQXV0aGVudGljYXRpb24gPSBzeXN0ZW1Db25uZWN0aW9uQXV0aGVudGljYXRpb247XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuZm9ybXVsYU5hbWVzcGFjZSA9IGZvcm11bGFOYW1lc3BhY2UgfHwgJ0RlcHJlY2F0ZWQnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZm9ybXVsYSBkZWZpbml0aW9uIHRvIHRoaXMgcGFjay5cbiAgICAgKlxuICAgICAqIEluIHRoZSB3ZWIgZWRpdG9yLCB0aGUgYC9Gb3JtdWxhYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBmb3JtdWxhLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBwYWNrLmFkZEZvcm11bGEoe1xuICAgICAqICAgcmVzdWx0VHlwZTogVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgKiAgICBuYW1lOiAnTXlGb3JtdWxhJyxcbiAgICAgKiAgICBkZXNjcmlwdGlvbjogJ015IGRlc2NyaXB0aW9uLicsXG4gICAgICogICAgcGFyYW1ldGVyczogW1xuICAgICAqICAgICAgbWFrZVBhcmFtZXRlcih7XG4gICAgICogICAgICAgIHR5cGU6IFBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAqICAgICAgICBuYW1lOiAnbXlQYXJhbScsXG4gICAgICogICAgICAgIGRlc2NyaXB0aW9uOiAnTXkgcGFyYW0gZGVzY3JpcHRpb24uJyxcbiAgICAgKiAgICAgIH0pLFxuICAgICAqICAgIF0sXG4gICAgICogICAgZXhlY3V0ZTogYXN5bmMgKFtwYXJhbV0pID0+IHtcbiAgICAgKiAgICAgIHJldHVybiBgSGVsbG8gJHtwYXJhbX1gO1xuICAgICAqICAgIH0sXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWRkRm9ybXVsYShkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IGZvcm11bGEgPSAoMCwgYXBpXzMubWFrZUZvcm11bGEpKHtcbiAgICAgICAgICAgIC4uLmRlZmluaXRpb24sXG4gICAgICAgICAgICBjb25uZWN0aW9uUmVxdWlyZW1lbnQ6IGRlZmluaXRpb24uY29ubmVjdGlvblJlcXVpcmVtZW50IHx8IHRoaXMuX2RlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvcm11bGFzLnB1c2goZm9ybXVsYSk7IC8vIFdURlxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIHN5bmMgdGFibGUgZGVmaW5pdGlvbiB0byB0aGlzIHBhY2suXG4gICAgICpcbiAgICAgKiBJbiB0aGUgd2ViIGVkaXRvciwgdGhlIGAvU3luY1RhYmxlYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBzeW5jIHRhYmxlLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBwYWNrLmFkZFN5bmNUYWJsZSh7XG4gICAgICogICBuYW1lOiAnTXlTeW5jVGFibGUnLFxuICAgICAqICAgaWRlbnRpdHlOYW1lOiAnRW50aXR5TmFtZScsXG4gICAgICogICBzY2hlbWE6IGNvZGEubWFrZU9iamVjdFNjaGVtYSh7XG4gICAgICogICAgIC4uLlxuICAgICAqICAgfSksXG4gICAgICogICBmb3JtdWxhOiB7XG4gICAgICogICAgIC4uLlxuICAgICAqICAgfSxcbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhZGRTeW5jVGFibGUoeyBuYW1lLCBkZXNjcmlwdGlvbiwgaWRlbnRpdHlOYW1lLCBzY2hlbWEsIGZvcm11bGEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCwgcHJvcGVydHlBdXRvY29tcGxldGUsIGR5bmFtaWNPcHRpb25zID0ge30sIH0pIHtcbiAgICAgICAgY29uc3QgY29ubmVjdGlvblJlcXVpcmVtZW50VG9Vc2UgPSBjb25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgdGhpcy5fZGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudDtcbiAgICAgICAgY29uc3Qgc3luY1RhYmxlID0gKDAsIGFwaV80Lm1ha2VTeW5jVGFibGUpKHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGlkZW50aXR5TmFtZSxcbiAgICAgICAgICAgIHNjaGVtYSxcbiAgICAgICAgICAgIGZvcm11bGEsXG4gICAgICAgICAgICBjb25uZWN0aW9uUmVxdWlyZW1lbnQ6IGNvbm5lY3Rpb25SZXF1aXJlbWVudFRvVXNlLFxuICAgICAgICAgICAgcHJvcGVydHlBdXRvY29tcGxldGUsXG4gICAgICAgICAgICBkeW5hbWljT3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3luY1RhYmxlcy5wdXNoKHN5bmNUYWJsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZHluYW1pYyBzeW5jIHRhYmxlIGRlZmluaXRpb24gdG8gdGhpcyBwYWNrLlxuICAgICAqXG4gICAgICogSW4gdGhlIHdlYiBlZGl0b3IsIHRoZSBgL0R5bmFtaWNTeW5jVGFibGVgIHNob3J0Y3V0IHdpbGwgaW5zZXJ0IGEgc25pcHBldCBvZiBhIHNrZWxldG9uIHN5bmMgdGFibGUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suYWRkRHluYW1pY1N5bmNUYWJsZSh7XG4gICAgICogICBuYW1lOiBcIk15U3luY1RhYmxlXCIsXG4gICAgICogICBnZXROYW1lOiBhc3luYyBmdW5jaXRvbiAoY29udGV4dCkgPT4ge1xuICAgICAqICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7bWV0aG9kOiBcIkdFVFwiLCB1cmw6IGNvbnRleHQuc3luYy5keW5hbWljVXJsfSk7XG4gICAgICogICAgIHJldHVybiByZXNwb25zZS5ib2R5Lm5hbWU7XG4gICAgICogICB9LFxuICAgICAqICAgZ2V0TmFtZTogYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpID0+IHtcbiAgICAgKiAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe21ldGhvZDogXCJHRVRcIiwgdXJsOiBjb250ZXh0LnN5bmMuZHluYW1pY1VybH0pO1xuICAgICAqICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5icm93c2VyTGluaztcbiAgICAgKiAgIH0sXG4gICAgICogICAuLi5cbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhZGREeW5hbWljU3luY1RhYmxlKGRlZmluaXRpb24pIHtcbiAgICAgICAgY29uc3QgZHluYW1pY1N5bmNUYWJsZSA9ICgwLCBhcGlfMi5tYWtlRHluYW1pY1N5bmNUYWJsZSkoe1xuICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogZGVmaW5pdGlvbi5jb25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgdGhpcy5fZGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3luY1RhYmxlcy5wdXNoKGR5bmFtaWNTeW5jVGFibGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGNvbHVtbiBmb3JtYXQgZGVmaW5pdGlvbiB0byB0aGlzIHBhY2suXG4gICAgICpcbiAgICAgKiBJbiB0aGUgd2ViIGVkaXRvciwgdGhlIGAvQ29sdW1uRm9ybWF0YCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBmb3JtYXQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suYWRkQ29sdW1uRm9ybWF0KHtcbiAgICAgKiAgIG5hbWU6ICdNeUNvbHVtbicsXG4gICAgICogICBmb3JtdWxhTmFtZTogJ015Rm9ybXVsYScsXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWRkQ29sdW1uRm9ybWF0KGZvcm1hdCkge1xuICAgICAgICB0aGlzLmZvcm1hdHMucHVzaChmb3JtYXQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGlzIHBhY2sgdG8gdXNlIGF1dGhlbnRpY2F0aW9uIGZvciBpbmRpdmlkdWFsIHVzZXJzLCB1c2luZyB0aGVcbiAgICAgKiBhdXRoZW50aWNhdGlvbiBtZXRob2QgaXMgdGhlIGdpdmVuIGRlZmluaXRpb24uXG4gICAgICpcbiAgICAgKiBFYWNoIHVzZXIgd2lsbCBuZWVkIHRvIHJlZ2lzdGVyIGFuIGFjY291bnQgaW4gb3JkZXIgdG8gdXNlIHRoaXMgcGFjay5cbiAgICAgKlxuICAgICAqIEluIHRoZSB3ZWIgZWRpdG9yLCB0aGUgYC9Vc2VyQXV0aGVudGljYXRpb25gIHNob3J0Y3V0IHdpbGwgaW5zZXJ0IGEgc25pcHBldCBvZiBhIHNrZWxldG9uXG4gICAgICogYXV0aGVudGljYXRpb24gZGVmaW5pdGlvbi5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHRoaXMgd2lsbCBzZXQgYSBkZWZhdWx0IGNvbm5lY3Rpb24gKGFjY291bnQpIHJlcXVpcmVtZW50LCBtYWtpbmcgYSB1c2VyIGFjY291bnRcbiAgICAgKiByZXF1aXJlZCB0byBpbnZva2UgYWxsIGZvcm11bGFzIGluIHRoaXMgcGFjayB1bmxlc3MgeW91IHNwZWNpZnkgZGlmZmVyZW50bHkgb24gYSBwYXJ0aWN1bGFyXG4gICAgICogZm9ybXVsYS4gVG8gY2hhbmdlIHRoZSBkZWZhdWx0LCB5b3UgY2FuIHBhc3MgYSBgZGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudGAgb3B0aW9uIGludG9cbiAgICAgKiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogcGFjay5zZXRVc2VyQXV0aGVudGljYXRpb24oe1xuICAgICAqICAgdHlwZTogQXV0aGVudGljYXRpb25UeXBlLkhlYWRlckJlYXJlclRva2VuLFxuICAgICAqIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFVzZXJBdXRoZW50aWNhdGlvbihhdXRoRGVmKSB7XG4gICAgICAgIGNvbnN0IHsgZGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudCA9IGFwaV90eXBlc18xLkNvbm5lY3Rpb25SZXF1aXJlbWVudC5SZXF1aXJlZCwgLi4uYXV0aGVudGljYXRpb24gfSA9IGF1dGhEZWY7XG4gICAgICAgIGlmIChhdXRoZW50aWNhdGlvbi50eXBlID09PSB0eXBlc18xLkF1dGhlbnRpY2F0aW9uVHlwZS5Ob25lIHx8IGF1dGhlbnRpY2F0aW9uLnR5cGUgPT09IHR5cGVzXzEuQXV0aGVudGljYXRpb25UeXBlLlZhcmlvdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEF1dGhlbnRpY2F0aW9uID0gYXV0aGVudGljYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7IGdldENvbm5lY3Rpb25OYW1lOiBnZXRDb25uZWN0aW9uTmFtZURlZiwgZ2V0Q29ubmVjdGlvblVzZXJJZDogZ2V0Q29ubmVjdGlvblVzZXJJZERlZiwgcG9zdFNldHVwOiBwb3N0U2V0dXBEZWYsIC4uLnJlc3QgfSA9IGF1dGhlbnRpY2F0aW9uO1xuICAgICAgICAgICAgY29uc3QgZ2V0Q29ubmVjdGlvbk5hbWUgPSAoMCwgYXBpXzYud3JhcE1ldGFkYXRhRnVuY3Rpb24pKGdldENvbm5lY3Rpb25OYW1lRGVmKTtcbiAgICAgICAgICAgIGNvbnN0IGdldENvbm5lY3Rpb25Vc2VySWQgPSAoMCwgYXBpXzYud3JhcE1ldGFkYXRhRnVuY3Rpb24pKGdldENvbm5lY3Rpb25Vc2VySWREZWYpO1xuICAgICAgICAgICAgY29uc3QgcG9zdFNldHVwID0gcG9zdFNldHVwRGVmID09PSBudWxsIHx8IHBvc3RTZXR1cERlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9zdFNldHVwRGVmLm1hcChzdGVwID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5zdGVwLCBnZXRPcHRpb25zOiAoMCwgYXBpXzYud3JhcE1ldGFkYXRhRnVuY3Rpb24pKCgwLCBtaWdyYXRpb25fMS5zZXRFbmRwb2ludERlZkhlbHBlcikoc3RlcCkuZ2V0T3B0aW9ucykgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0QXV0aGVudGljYXRpb24gPSB7IC4uLnJlc3QsIGdldENvbm5lY3Rpb25OYW1lLCBnZXRDb25uZWN0aW9uVXNlcklkLCBwb3N0U2V0dXAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXV0aGVudGljYXRpb24udHlwZSAhPT0gdHlwZXNfMS5BdXRoZW50aWNhdGlvblR5cGUuTm9uZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0RGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudChkZWZhdWx0Q29ubmVjdGlvblJlcXVpcmVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGlzIHBhY2sgdG8gdXNlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVkIGJ5IHlvdSBhcyB0aGUgbWFrZXIgb2YgdGhpcyBwYWNrLlxuICAgICAqXG4gICAgICogWW91IHdpbGwgbmVlZCB0byByZWdpc3RlciBjcmVkZW50aWFscyB0byB1c2Ugd2l0aCB0aGlzIHBhY2suIFdoZW4gdXNlcnMgdXNlIHRoZVxuICAgICAqIHBhY2ssIHRoZWlyIHJlcXVlc3RzIHdpbGwgYmUgYXV0aGVudGljYXRlZCB3aXRoIHRob3NlIHN5c3RlbSBjcmVkZW50aWFscywgdGhleSBuZWVkXG4gICAgICogbm90IHJlZ2lzdGVyIHRoZWlyIG93biBhY2NvdW50LlxuICAgICAqXG4gICAgICogSW4gdGhlIHdlYiBlZGl0b3IsIHRoZSBgL1N5c3RlbUF1dGhlbnRpY2F0aW9uYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvblxuICAgICAqIGF1dGhlbnRpY2F0aW9uIGRlZmluaXRpb24uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suc2V0U3lzdGVtQXV0aGVudGljYXRpb24oe1xuICAgICAqICAgdHlwZTogQXV0aGVudGljYXRpb25UeXBlLkhlYWRlckJlYXJlclRva2VuLFxuICAgICAqIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFN5c3RlbUF1dGhlbnRpY2F0aW9uKHN5c3RlbUF1dGhlbnRpY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IHsgZ2V0Q29ubmVjdGlvbk5hbWU6IGdldENvbm5lY3Rpb25OYW1lRGVmLCBnZXRDb25uZWN0aW9uVXNlcklkOiBnZXRDb25uZWN0aW9uVXNlcklkRGVmLCBwb3N0U2V0dXA6IHBvc3RTZXR1cERlZiwgLi4ucmVzdCB9ID0gc3lzdGVtQXV0aGVudGljYXRpb247XG4gICAgICAgIGNvbnN0IGdldENvbm5lY3Rpb25OYW1lID0gKDAsIGFwaV82LndyYXBNZXRhZGF0YUZ1bmN0aW9uKShnZXRDb25uZWN0aW9uTmFtZURlZik7XG4gICAgICAgIGNvbnN0IGdldENvbm5lY3Rpb25Vc2VySWQgPSAoMCwgYXBpXzYud3JhcE1ldGFkYXRhRnVuY3Rpb24pKGdldENvbm5lY3Rpb25Vc2VySWREZWYpO1xuICAgICAgICBjb25zdCBwb3N0U2V0dXAgPSBwb3N0U2V0dXBEZWYgPT09IG51bGwgfHwgcG9zdFNldHVwRGVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb3N0U2V0dXBEZWYubWFwKHN0ZXAgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4uc3RlcCwgZ2V0T3B0aW9uczogKDAsIGFwaV82LndyYXBNZXRhZGF0YUZ1bmN0aW9uKSgoMCwgbWlncmF0aW9uXzEuc2V0RW5kcG9pbnREZWZIZWxwZXIpKHN0ZXApLmdldE9wdGlvbnMpIH07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN5c3RlbUNvbm5lY3Rpb25BdXRoZW50aWNhdGlvbiA9IHtcbiAgICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgICBnZXRDb25uZWN0aW9uTmFtZSxcbiAgICAgICAgICAgIGdldENvbm5lY3Rpb25Vc2VySWQsXG4gICAgICAgICAgICBwb3N0U2V0dXAsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBkb21haW4gdGhhdCB0aGlzIHBhY2sgbWFrZXMgSFRUUCByZXF1ZXN0cyB0by5cbiAgICAgKiBGb3IgZXhhbXBsZSwgaWYgeW91ciBwYWNrIG1ha2VzIEhUVFAgcmVxdWVzdHMgdG8gXCJhcGkuZXhhbXBsZS5jb21cIixcbiAgICAgKiB1c2UgXCJleGFtcGxlLmNvbVwiIGFzIHlvdXIgbmV0d29yayBkb21haW4uXG4gICAgICpcbiAgICAgKiBJZiB5b3VyIHBhY2sgbWFrZSBIVFRQIHJlcXVlc3RzLCBpdCBtdXN0IGRlY2xhcmUgYSBuZXR3b3JrIGRvbWFpbixcbiAgICAgKiBmb3Igc2VjdXJpdHkgcHVycG9zZXMuIENvZGEgZW5mb3JjZXMgdGhhdCB5b3VyIHBhY2sgY2Fubm90IG1ha2UgcmVxdWVzdHMgdG9cbiAgICAgKiBhbnkgdW5kZWNsYXJlZCBkb21haW5zLlxuICAgICAqXG4gICAgICogWW91IGFyZSBhbGxvd2VkIG9uZSBuZXR3b3JrIGRvbWFpbiBwZXIgcGFjayBieSBkZWZhdWx0LiBJZiB5b3VyIHBhY2sgbmVlZHNcbiAgICAgKiB0byBjb25uZWN0IHRvIG11bHRpcGxlIGRvbWFpbnMsIGNvbnRhY3QgQ29kYSBTdXBwb3J0IGZvciBhcHByb3ZhbC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogcGFjay5hZGROZXR3b3JrRG9tYWluKCdleGFtcGxlLmNvbScpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGFkZE5ldHdvcmtEb21haW4oLi4uZG9tYWluKSB7XG4gICAgICAgIHRoaXMubmV0d29ya0RvbWFpbnMucHVzaCguLi5kb21haW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2VtYW50aWMgdmVyc2lvbiBvZiB0aGlzIHBhY2sgdmVyc2lvbiwgZS5nLiBgJzEuMi4zJ2AuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG9wdGlvbmFsLCBhbmQgeW91IG9ubHkgbmVlZCB0byBwcm92aWRlIGEgdmVyc2lvbiBpZiB5b3UgYXJlIG1hbnVhbGx5IGRvaW5nXG4gICAgICogc2VtYW50aWMgdmVyc2lvbmluZywgb3IgdXNpbmcgdGhlIENMSS4gSWYgdXNpbmcgdGhlIHdlYiBlZGl0b3IsIHlvdSBjYW4gb21pdCB0aGlzXG4gICAgICogYW5kIHRoZSB3ZWIgZWRpdG9yIHdpbGwgYXV0b21hdGljYWxseSBwcm92aWRlIGFuIGFwcHJvcHJpYXRlIHNlbWFudGljIHZlcnNpb25cbiAgICAgKiBlYWNoIHRpbWUgeW91IGJ1aWxkIGEgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogcGFjay5zZXRWZXJzaW9uKCcxLjIuMycpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3NldERlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQoY29ubmVjdGlvblJlcXVpcmVtZW50KSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQgPSBjb25uZWN0aW9uUmVxdWlyZW1lbnQ7XG4gICAgICAgIC8vIFJld3JpdGUgYW55IGZvcm11bGFzIG9yIHN5bmMgdGFibGVzIHRoYXQgd2VyZSBhbHJlYWR5IGRlZmluZWQsIGluIGNhc2UgdGhlIG1ha2VyIHNldHMgdGhlIGRlZmF1bHRcbiAgICAgICAgLy8gYWZ0ZXIgdGhlIGZhY3QuXG4gICAgICAgIHRoaXMuZm9ybXVsYXMgPSB0aGlzLmZvcm11bGFzLm1hcChmb3JtdWxhID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtdWxhLmNvbm5lY3Rpb25SZXF1aXJlbWVudCA/IGZvcm11bGEgOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKGZvcm11bGEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN5bmNUYWJsZXMgPSB0aGlzLnN5bmNUYWJsZXMubWFwKHN5bmNUYWJsZSA9PiB7XG4gICAgICAgICAgICBpZiAoc3luY1RhYmxlLmdldHRlci5jb25uZWN0aW9uUmVxdWlyZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3luY1RhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKDAsIGFwaV8xLmlzRHluYW1pY1N5bmNUYWJsZSkoc3luY1RhYmxlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN5bmNUYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0dGVyOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXR0ZXIsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZXNlIDQgYXJlIG1ldGFkYXRhIGZvcm11bGFzLCBzbyB0aGV5IHVzZSBDb25uZWN0aW9uUmVxdWlyZW1lbnQuUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gYnkgZGVmYXVsdCBpZiB5b3UgZG9uJ3Qgc3BlY2lmeSBhIGNvbm5lY3Rpb24gcmVxdWlyZW1lbnQgKGEgbGVnYWN5IGJlaGF2aW9yXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgaXMgY29uZnVzaW5nIGFuZCBwZXJoYXBzIHVuZGVzaXJhYmxlIG5vdyB0aGF0IHdlIGhhdmUgYmV0dGVyIGJ1aWxkZXJzKS5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qga25vdyBpZiB0aGUgbWFrZXIgc2V0IFJlcXVpcmVkIGV4cGxpY2l0bHkgb3IgaWYgd2FzIGp1c3QgdGhlIGRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IGtub3cgaWYgd2Ugc2hvdWxkIG92ZXJ3cml0ZSB0aGUgY29ubmVjdGlvbiByZXF1aXJlbWVudC4gRm9yIGxhY2tcbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgYSBiZXR0ZXIgb3B0aW9uLCB3ZSdsbCBvdmVycmlkZSBpdCBoZXJlIHJlZ2FyZGxlc3MuIFRoaXMgZW5zdXJlIHRoYXQgdGhlc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gZHluYW1pYyBzeW5jIHRhYmxlIG1ldGFkYXRhIGZvcm11bGFzIGhhdmUgdGhlIHNhbWUgY29ubmV0aW9uIHJlcXVpcmVtZW50IGFzIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBzeW5jIHRhYmxlIGl0c2VsZiwgd2hpY2ggc2VlbXMgZGVzaXJhYmxlIGJhc2ljYWxseSAxMDAlIG9mIHRoZSB0aW1lIGFuZCBzaG91bGRcbiAgICAgICAgICAgICAgICAgICAgLy8gYWx3YXlzIHdvcmssIGJ1dCBpdCBkb2VzIGdpdmUgcmlzZSB0byBjb25mdXNpbmcgYmVoYXZpb3IgdGhhdCBjYWxsaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldERlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQoKSBjYW4gd2lwZSBhd2F5IGFuIGV4cGxpY2l0IGNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWlyZW1lbnQgb3ZlcnJpZGUgc2V0IG9uIG9uZSBvZiB0aGVzZSA0IG1ldGFkYXRhIGZvcm11bGFzLlxuICAgICAgICAgICAgICAgICAgICBnZXROYW1lOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXROYW1lLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBnZXREaXNwbGF5VXJsOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXREaXNwbGF5VXJsLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBnZXRTY2hlbWE6ICgwLCBhcGlfNS5tYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYSkoc3luY1RhYmxlLmdldFNjaGVtYSwgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdER5bmFtaWNVcmxzOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5saXN0RHluYW1pY1VybHMsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaER5bmFtaWNVcmxzOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5zZWFyY2hEeW5hbWljVXJscywgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlBdXRvY29tcGxldGU6ICgwLCBhcGlfNS5tYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYSkoc3luY1RhYmxlLnByb3BlcnR5QXV0b2NvbXBsZXRlLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5zeW5jVGFibGUsXG4gICAgICAgICAgICAgICAgICAgIGdldHRlcjogKDAsIGFwaV81Lm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKShzeW5jVGFibGUuZ2V0dGVyLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUF1dG9jb21wbGV0ZTogKDAsIGFwaV81Lm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKShzeW5jVGFibGUucHJvcGVydHlBdXRvY29tcGxldGUsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIGdldFNjaGVtYTogKDAsIGFwaV81Lm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKShzeW5jVGFibGUuZ2V0U2NoZW1hLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLlBhY2tEZWZpbml0aW9uQnVpbGRlciA9IFBhY2tEZWZpbml0aW9uQnVpbGRlcjtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RWZmZWN0aXZlUHJvcGVydHlLZXlzRnJvbVNjaGVtYSA9IHZvaWQgMDtcbmNvbnN0IHNjaGVtYV8xID0gcmVxdWlyZShcIi4uL3NjaGVtYVwiKTtcbi8qKlxuICogQSBoZWxwZXIgdG8gZXh0cmFjdCBwcm9wZXJ0aWVzIGZyb21LZXlzIGZyb20gYSBzY2hlbWEgb2JqZWN0LiBUaGlzIGlzIG1vc3RseSB1c2VmdWxcbiAqIGluIHByb2Nlc3NpbmcgdGhlIGNvbnRleHQuc3luYy5zY2hlbWEgaW4gYSBzeW5jIGZvcm11bGEsIHdoZXJlIHRoZSBzY2hlbWEgd291bGQgb25seVxuICogaW5jbHVkZSBhIHN1YnNldCBvZiBwcm9wZXJ0aWVzIHdoaWNoIHdlcmUgbWFudWFsbHkgc2VsZWN0ZWQgYnkgdGhlIFBhY2sgdXNlci5cbiAqL1xuZnVuY3Rpb24gZ2V0RWZmZWN0aXZlUHJvcGVydHlLZXlzRnJvbVNjaGVtYShzY2hlbWEpIHtcbiAgICAvLyBtYWtlIGl0IGVhc2llciBpZiB0aGUgY2FsbGVyIHNpbXBseSBwYXNzZWQgaW4gdGhlIGZ1bGwgc3luYyBzY2hlbWEuXG4gICAgaWYgKHNjaGVtYS50eXBlID09PSBzY2hlbWFfMS5WYWx1ZVR5cGUuQXJyYXkpIHtcbiAgICAgICAgc2NoZW1hID0gc2NoZW1hLml0ZW1zO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hLnR5cGUgIT09IHNjaGVtYV8xLlZhbHVlVHlwZS5PYmplY3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoT2JqZWN0LmVudHJpZXMoc2NoZW1hLnByb3BlcnRpZXMpLm1hcCgoW2tleSwgcHJvcGVydHldKSA9PiBwcm9wZXJ0eS5mcm9tS2V5IHx8IGtleSkpXTtcbn1cbmV4cG9ydHMuZ2V0RWZmZWN0aXZlUHJvcGVydHlLZXlzRnJvbVNjaGVtYSA9IGdldEVmZmVjdGl2ZVByb3BlcnR5S2V5c0Zyb21TY2hlbWE7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlN2Z0NvbnN0YW50cyA9IHZvaWQgMDtcbi8qKiBDb25zdGFudHMgZm9yIHdvcmtpbmcgd2l0aCBTVkcgaW1hZ2VzLiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbnZhciBTdmdDb25zdGFudHM7XG4oZnVuY3Rpb24gKFN2Z0NvbnN0YW50cykge1xuICAgIC8qKiBJRCBvZiB0aGUgbm9kZSBpbiBhIHJldHVybmVkIFNWRyBmaWxlIHRoYXQgaXMgdGFyZ2V0ZWQgd2hlbiBEYXJrIE1vZGUgaXMgZW5hYmxlZCBpbiBDb2RhLiAqL1xuICAgIFN2Z0NvbnN0YW50cy5EYXJrTW9kZUZyYWdtZW50SWQgPSAnRGFya01vZGUnO1xuICAgIC8qKiBQcmVmaXggdG8gdXNlIGZvciBiYXNlLTY0IGVuY29kZWQgU1ZHcyByZXR1cm5lZCBieSBmb3JtdWxhcy4gKi9cbiAgICBTdmdDb25zdGFudHMuRGF0YVVybFByZWZpeCA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCc7XG4gICAgLyoqIFByZWZpeCB0byB1c2UgZm9yIGJhc2UtNjQgZW5jb2RlZCBTVkdzICh0aGF0IHN1cHBvcnQgRGFyayBNb2RlKSByZXR1cm5lZCBieSBmb3JtdWxhcy4gKi9cbiAgICBTdmdDb25zdGFudHMuRGF0YVVybFByZWZpeFdpdGhEYXJrTW9kZVN1cHBvcnQgPSAnZGF0YTppbWFnZS9zdmcreG1sO3N1cHBvcnRzRGFya01vZGU9MTtiYXNlNjQsJztcbn0pKFN2Z0NvbnN0YW50cyA9IGV4cG9ydHMuU3ZnQ29uc3RhbnRzIHx8IChleHBvcnRzLlN2Z0NvbnN0YW50cyA9IHt9KSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFRoZSBjb3JlIGNvbXBvbmVudHMgb2YgdGhlIFBhY2sgU0RLLiBUaGVzZSBmdW5jdGlvbnMgYW5kIHR5cGVzIGFyZSB1c2VkIHRvXG4gKiBkZWZpbmUgeW91ciBQYWNrLCBpdCdzIGJ1aWxkaW5nIGJsb2NrcywgYW5kIHRoZWlyIGxvZ2ljLlxuICpcbiAqIFRoaXMgbW9kdWxlIGlzIGltcG9ydGVkIHVzaW5nIHRoZSBmb2xsb3dpbmcgY29kZTpcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0ICogYXMgY29kYSBmcm9tIFwiQGNvZGFocS9wYWNrcy1zZGtcIjtcbiAqIGBgYFxuICpcbiAqIEBtb2R1bGUgY29yZVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZhbGlkRmV0Y2hNZXRob2RzID0gZXhwb3J0cy53aXRoSWRlbnRpdHkgPSBleHBvcnRzLm1ha2VTY2hlbWEgPSBleHBvcnRzLm1ha2VSZWZlcmVuY2VTY2hlbWFGcm9tT2JqZWN0U2NoZW1hID0gZXhwb3J0cy5tYWtlT2JqZWN0U2NoZW1hID0gZXhwb3J0cy5tYWtlQXR0cmlidXRpb25Ob2RlID0gZXhwb3J0cy5nZW5lcmF0ZVNjaGVtYSA9IGV4cG9ydHMuVmFsdWVUeXBlID0gZXhwb3J0cy5WYWx1ZUhpbnRUeXBlID0gZXhwb3J0cy5TY2FsZUljb25TZXQgPSBleHBvcnRzLlByb3BlcnR5TGFiZWxWYWx1ZVRlbXBsYXRlID0gZXhwb3J0cy5MaW5rRGlzcGxheVR5cGUgPSBleHBvcnRzLkltYWdlT3V0bGluZSA9IGV4cG9ydHMuSW1hZ2VDb3JuZXJTdHlsZSA9IGV4cG9ydHMuRW1haWxEaXNwbGF5VHlwZSA9IGV4cG9ydHMuRHVyYXRpb25Vbml0ID0gZXhwb3J0cy5DdXJyZW5jeUZvcm1hdCA9IGV4cG9ydHMuQXR0cmlidXRpb25Ob2RlVHlwZSA9IGV4cG9ydHMuZW5zdXJlVW5yZWFjaGFibGUgPSBleHBvcnRzLmVuc3VyZU5vbkVtcHR5U3RyaW5nID0gZXhwb3J0cy5lbnN1cmVFeGlzdHMgPSBleHBvcnRzLmFzc2VydENvbmRpdGlvbiA9IGV4cG9ydHMuU3ZnQ29uc3RhbnRzID0gZXhwb3J0cy5nZXRFZmZlY3RpdmVQcm9wZXJ0eUtleXNGcm9tU2NoZW1hID0gZXhwb3J0cy53aXRoUXVlcnlQYXJhbXMgPSBleHBvcnRzLmpvaW5VcmwgPSBleHBvcnRzLmdldFF1ZXJ5UGFyYW1zID0gZXhwb3J0cy5zaW1wbGVBdXRvY29tcGxldGUgPSBleHBvcnRzLm1ha2VTaW1wbGVBdXRvY29tcGxldGVNZXRhZGF0YUZvcm11bGEgPSBleHBvcnRzLmF1dG9jb21wbGV0ZVNlYXJjaE9iamVjdHMgPSBleHBvcnRzLm1ha2VQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VUcmFuc2xhdGVPYmplY3RGb3JtdWxhID0gZXhwb3J0cy5tYWtlU3luY1RhYmxlID0gZXhwb3J0cy5tYWtlRm9ybXVsYSA9IGV4cG9ydHMubWFrZUVtcHR5Rm9ybXVsYSA9IGV4cG9ydHMubWFrZUR5bmFtaWNTeW5jVGFibGUgPSBleHBvcnRzLm1ha2VNZXRhZGF0YUZvcm11bGEgPSBleHBvcnRzLlVzZXJWaXNpYmxlRXJyb3IgPSBleHBvcnRzLlR5cGUgPSBleHBvcnRzLk1pc3NpbmdTY29wZXNFcnJvciA9IGV4cG9ydHMuU3RhdHVzQ29kZUVycm9yID0gZXhwb3J0cy5QcmVjYW5uZWREYXRlUmFuZ2UgPSBleHBvcnRzLlBhcmFtZXRlclR5cGUgPSBleHBvcnRzLk5ldHdvcmtDb25uZWN0aW9uID0gZXhwb3J0cy5VcGRhdGVPdXRjb21lID0gZXhwb3J0cy5Db25uZWN0aW9uUmVxdWlyZW1lbnQgPSBleHBvcnRzLlBhY2tEZWZpbml0aW9uQnVpbGRlciA9IGV4cG9ydHMubmV3UGFjayA9IGV4cG9ydHMuUG9zdFNldHVwVHlwZSA9IGV4cG9ydHMuQXV0aGVudGljYXRpb25UeXBlID0gdm9pZCAwO1xuZXhwb3J0cy5Ub2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbiA9IHZvaWQgMDtcbnZhciB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBdXRoZW50aWNhdGlvblR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHR5cGVzXzEuQXV0aGVudGljYXRpb25UeXBlOyB9IH0pO1xudmFyIHR5cGVzXzIgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlBvc3RTZXR1cFR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHR5cGVzXzIuUG9zdFNldHVwVHlwZTsgfSB9KTtcbnZhciBidWlsZGVyXzEgPSByZXF1aXJlKFwiLi9idWlsZGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmV3UGFja1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVpbGRlcl8xLm5ld1BhY2s7IH0gfSk7XG52YXIgYnVpbGRlcl8yID0gcmVxdWlyZShcIi4vYnVpbGRlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlBhY2tEZWZpbml0aW9uQnVpbGRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVpbGRlcl8yLlBhY2tEZWZpbml0aW9uQnVpbGRlcjsgfSB9KTtcbnZhciBhcGlfdHlwZXNfMSA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbm5lY3Rpb25SZXF1aXJlbWVudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpX3R5cGVzXzEuQ29ubmVjdGlvblJlcXVpcmVtZW50OyB9IH0pO1xudmFyIGFwaV8xID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVXBkYXRlT3V0Y29tZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzEuVXBkYXRlT3V0Y29tZTsgfSB9KTtcbnZhciBhcGlfdHlwZXNfMiA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5ldHdvcmtDb25uZWN0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfdHlwZXNfMi5OZXR3b3JrQ29ubmVjdGlvbjsgfSB9KTtcbnZhciBhcGlfdHlwZXNfMyA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlBhcmFtZXRlclR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV90eXBlc18zLlBhcmFtZXRlclR5cGU7IH0gfSk7XG52YXIgYXBpX3R5cGVzXzQgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJQcmVjYW5uZWREYXRlUmFuZ2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV90eXBlc180LlByZWNhbm5lZERhdGVSYW5nZTsgfSB9KTtcbnZhciBhcGlfMiA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlN0YXR1c0NvZGVFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzIuU3RhdHVzQ29kZUVycm9yOyB9IH0pO1xudmFyIGFwaV8zID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTWlzc2luZ1Njb3Blc0Vycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMy5NaXNzaW5nU2NvcGVzRXJyb3I7IH0gfSk7XG52YXIgYXBpX3R5cGVzXzUgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfdHlwZXNfNS5UeXBlOyB9IH0pO1xudmFyIGFwaV80ID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVXNlclZpc2libGVFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzQuVXNlclZpc2libGVFcnJvcjsgfSB9KTtcbi8vIEZvcm11bGEgZGVmaW5pdGlvbiBoZWxwZXJzXG52YXIgYXBpXzUgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlTWV0YWRhdGFGb3JtdWxhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfNS5tYWtlTWV0YWRhdGFGb3JtdWxhOyB9IH0pO1xudmFyIGFwaV82ID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZUR5bmFtaWNTeW5jVGFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV82Lm1ha2VEeW5hbWljU3luY1RhYmxlOyB9IH0pO1xudmFyIGFwaV83ID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZUVtcHR5Rm9ybXVsYVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzcubWFrZUVtcHR5Rm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfOCA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VGb3JtdWxhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfOC5tYWtlRm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfOSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VTeW5jVGFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV85Lm1ha2VTeW5jVGFibGU7IH0gfSk7XG52YXIgYXBpXzEwID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVRyYW5zbGF0ZU9iamVjdEZvcm11bGFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV8xMC5tYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfMTEgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlUGFyYW1ldGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTEubWFrZVBhcmFtZXRlcjsgfSB9KTtcbnZhciBhcGlfMTIgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhdXRvY29tcGxldGVTZWFyY2hPYmplY3RzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTIuYXV0b2NvbXBsZXRlU2VhcmNoT2JqZWN0czsgfSB9KTtcbnZhciBhcGlfMTMgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTMubWFrZVNpbXBsZUF1dG9jb21wbGV0ZU1ldGFkYXRhRm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfMTQgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzaW1wbGVBdXRvY29tcGxldGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV8xNC5zaW1wbGVBdXRvY29tcGxldGU7IH0gfSk7XG4vLyBVUkwgaGVscGVycy5cbnZhciB1cmxfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvdXJsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0UXVlcnlQYXJhbXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVybF8xLmdldFF1ZXJ5UGFyYW1zOyB9IH0pO1xudmFyIHVybF8yID0gcmVxdWlyZShcIi4vaGVscGVycy91cmxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJqb2luVXJsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB1cmxfMi5qb2luOyB9IH0pO1xudmFyIHVybF8zID0gcmVxdWlyZShcIi4vaGVscGVycy91cmxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aXRoUXVlcnlQYXJhbXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVybF8zLndpdGhRdWVyeVBhcmFtczsgfSB9KTtcbi8vIFNjaGVtYSBoZWxwZXJzLlxudmFyIHNjaGVtYV8xID0gcmVxdWlyZShcIi4vaGVscGVycy9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRFZmZlY3RpdmVQcm9wZXJ0eUtleXNGcm9tU2NoZW1hXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMS5nZXRFZmZlY3RpdmVQcm9wZXJ0eUtleXNGcm9tU2NoZW1hOyB9IH0pO1xuLy8gU1ZHIGNvbnN0YW50cy5cbnZhciBzdmdfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvc3ZnXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU3ZnQ29uc3RhbnRzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdmdfMS5TdmdDb25zdGFudHM7IH0gfSk7XG4vLyBHZW5lcmFsIFV0aWxpdGllc1xudmFyIGVuc3VyZV8xID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhc3NlcnRDb25kaXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuc3VyZV8xLmFzc2VydENvbmRpdGlvbjsgfSB9KTtcbnZhciBlbnN1cmVfMiA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZW5zdXJlRXhpc3RzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbnN1cmVfMi5lbnN1cmVFeGlzdHM7IH0gfSk7XG52YXIgZW5zdXJlXzMgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImVuc3VyZU5vbkVtcHR5U3RyaW5nXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbnN1cmVfMy5lbnN1cmVOb25FbXB0eVN0cmluZzsgfSB9KTtcbnZhciBlbnN1cmVfNCA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZW5zdXJlVW5yZWFjaGFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuc3VyZV80LmVuc3VyZVVucmVhY2hhYmxlOyB9IH0pO1xudmFyIHNjaGVtYV8yID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQXR0cmlidXRpb25Ob2RlVHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzIuQXR0cmlidXRpb25Ob2RlVHlwZTsgfSB9KTtcbnZhciBzY2hlbWFfMyA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkN1cnJlbmN5Rm9ybWF0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMy5DdXJyZW5jeUZvcm1hdDsgfSB9KTtcbnZhciBzY2hlbWFfNCA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkR1cmF0aW9uVW5pdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzQuRHVyYXRpb25Vbml0OyB9IH0pO1xudmFyIHNjaGVtYV81ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRW1haWxEaXNwbGF5VHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzUuRW1haWxEaXNwbGF5VHlwZTsgfSB9KTtcbnZhciBzY2hlbWFfNiA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkltYWdlQ29ybmVyU3R5bGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV82LkltYWdlQ29ybmVyU3R5bGU7IH0gfSk7XG52YXIgc2NoZW1hXzcgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJJbWFnZU91dGxpbmVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV83LkltYWdlT3V0bGluZTsgfSB9KTtcbnZhciBzY2hlbWFfOCA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxpbmtEaXNwbGF5VHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzguTGlua0Rpc3BsYXlUeXBlOyB9IH0pO1xudmFyIHNjaGVtYV85ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHJvcGVydHlMYWJlbFZhbHVlVGVtcGxhdGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV85LlByb3BlcnR5TGFiZWxWYWx1ZVRlbXBsYXRlOyB9IH0pO1xudmFyIHNjaGVtYV8xMCA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNjYWxlSWNvblNldFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzEwLlNjYWxlSWNvblNldDsgfSB9KTtcbnZhciBzY2hlbWFfMTEgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWYWx1ZUhpbnRUeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMTEuVmFsdWVIaW50VHlwZTsgfSB9KTtcbnZhciBzY2hlbWFfMTIgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWYWx1ZVR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xMi5WYWx1ZVR5cGU7IH0gfSk7XG52YXIgc2NoZW1hXzEzID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2VuZXJhdGVTY2hlbWFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xMy5nZW5lcmF0ZVNjaGVtYTsgfSB9KTtcbnZhciBzY2hlbWFfMTQgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlQXR0cmlidXRpb25Ob2RlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMTQubWFrZUF0dHJpYnV0aW9uTm9kZTsgfSB9KTtcbnZhciBzY2hlbWFfMTUgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlT2JqZWN0U2NoZW1hXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMTUubWFrZU9iamVjdFNjaGVtYTsgfSB9KTtcbnZhciBzY2hlbWFfMTYgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzE2Lm1ha2VSZWZlcmVuY2VTY2hlbWFGcm9tT2JqZWN0U2NoZW1hOyB9IH0pO1xudmFyIHNjaGVtYV8xNyA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VTY2hlbWFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xNy5tYWtlU2NoZW1hOyB9IH0pO1xudmFyIHNjaGVtYV8xOCA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpdGhJZGVudGl0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzE4LndpdGhJZGVudGl0eTsgfSB9KTtcbi8vIEV4cG9ydHMgZm9yIGludGVybWVkaWF0ZSBlbnRpdGllcyB3ZSB3YW50IGluY2x1ZGVkIGluIHRoZSBUeXBlRG9jIGRvY3VtZW50YXRpb25cbi8vIGJ1dCBvdGhlcndpc2Ugd291bGRuJ3QgY2FyZSBhYm91dCBpbmNsdWRpbmcgYXMgdG9wLWxldmVsIGV4cG9ydHMgb2YgdGhlIFNES1xudmFyIGFwaV90eXBlc182ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsaWRGZXRjaE1ldGhvZHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV90eXBlc182LlZhbGlkRmV0Y2hNZXRob2RzOyB9IH0pO1xudmFyIHR5cGVzXzMgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlc18zLlRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uOyB9IH0pO1xuIiwgImltcG9ydCAqIGFzIGNvZGEgZnJvbSBcIkBjb2RhaHEvcGFja3Mtc2RrXCI7XG5cbmV4cG9ydCBjb25zdCBwYWNrID0gY29kYS5uZXdQYWNrKCk7XG5cbnBhY2suYWRkTmV0d29ya0RvbWFpbignaHR0cHM6Ly9jb2J1ZGdldC5jb20vYXBpJyk7XG5cbmNvbnN0IGJ1Y2tldFF1ZXJ5ID0gYFxuICAgIHF1ZXJ5IEJ1Y2tldHMoJGdyb3VwU2x1ZzogU3RyaW5nLCAkcm91bmRTbHVnOiBTdHJpbmchLCAkb2Zmc2V0OiBJbnQsICRsaW1pdDogSW50LCAkc3RhdHVzOiBbU3RhdHVzVHlwZSFdKSB7XG4gICAgICAgIGJ1Y2tldHNQYWdlKFxuICAgICAgICBncm91cFNsdWc6ICRncm91cFNsdWdcbiAgICAgICAgcm91bmRTbHVnOiAkcm91bmRTbHVnXG4gICAgICAgIG9mZnNldDogJG9mZnNldFxuICAgICAgICBsaW1pdDogJGxpbWl0XG4gICAgICAgIHN0YXR1czogJHN0YXR1c1xuICAgICAgICApIHtcbiAgICAgICAgbW9yZUV4aXN0XG4gICAgICAgIGJ1Y2tldHMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICBzdW1tYXJ5XG4gICAgICAgICAgICB0aXRsZVxuICAgICAgICAgICAgbWluR29hbFxuICAgICAgICAgICAgbWF4R29hbFxuICAgICAgICAgICAgZmxhZ3Mge1xuICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgX190eXBlbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9PZkZ1bmRlcnNcbiAgICAgICAgICAgIGluY29tZVxuICAgICAgICAgICAgdG90YWxDb250cmlidXRpb25zXG4gICAgICAgICAgICB0b3RhbENvbnRyaWJ1dGlvbnNGcm9tQ3VycmVudE1lbWJlclxuICAgICAgICAgICAgbm9PZkNvbW1lbnRzXG4gICAgICAgICAgICBwdWJsaXNoZWRcbiAgICAgICAgICAgIGFwcHJvdmVkXG4gICAgICAgICAgICBjYW5jZWxlZFxuICAgICAgICAgICAgc3RhdHVzXG4gICAgICAgICAgICBwZXJjZW50YWdlRnVuZGVkXG4gICAgICAgICAgICByb3VuZCB7XG4gICAgICAgICAgICBjYW5Db2NyZWF0b3JTdGFydEZ1bmRpbmdcbiAgICAgICAgICAgIF9fdHlwZW5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1c3RvbUZpZWxkcyB7XG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgY3VzdG9tRmllbGQge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHR5cGVcbiAgICAgICAgICAgICAgICBsaW1pdFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX190eXBlbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1hZ2VzIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBzbWFsbFxuICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgIF9fdHlwZW5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9fdHlwZW5hbWVcbiAgICAgICAgfVxuICAgICAgICBfX3R5cGVuYW1lXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5jb25zdCBCdWNrZXRTY2hlbWEgPSBjb2RhLm1ha2VPYmplY3RTY2hlbWEoe1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGlkIG9mIHRoZSBidWNrZXQuJyxcbiAgICAgICAgfSxcbiAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBidWNrZXQuJyxcbiAgICAgICAgfSxcbiAgICAgICAgc3VtbWFyeToge1xuICAgICAgICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgc3VtbWFyeSBvZiB0aGUgYnVja2V0LicsXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSB0aXRsZSBvZiB0aGUgYnVja2V0LicsXG4gICAgICAgIH0sXG4gICAgICAgIG1pbkdvYWw6IHtcbiAgICAgICAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG1pbmltdW0gZ29hbCBvZiB0aGUgYnVja2V0LicsXG4gICAgICAgIH0sXG4gICAgICAgIG1heEdvYWw6IHtcbiAgICAgICAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG1heGltdW0gZ29hbCBvZiB0aGUgYnVja2V0LicsXG4gICAgICAgIH0sXG4gICAgICAgIG5vT2ZGdW5kZXJzOiB7XG4gICAgICAgICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5OdW1iZXIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBudW1iZXIgb2YgZnVuZGVycyBvZiB0aGUgYnVja2V0LicsXG4gICAgICAgIH0sXG4gICAgICAgIGluY29tZToge1xuICAgICAgICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuTnVtYmVyLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgaW5jb21lIG9mIHRoZSBidWNrZXQuJyxcbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxDb250cmlidXRpb25zOiB7XG4gICAgICAgICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5OdW1iZXIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSB0b3RhbCBjb250cmlidXRpb25zIG9mIHRoZSBidWNrZXQuJyxcbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxDb250cmlidXRpb25zRnJvbUN1cnJlbnRNZW1iZXI6IHtcbiAgICAgICAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIHRvdGFsIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgY3VycmVudCBtZW1iZXIgb2YgdGhlIGJ1Y2tldC4nLFxuICAgICAgICB9LFxuICAgICAgICBub09mQ29tbWVudHM6IHtcbiAgICAgICAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG51bWJlciBvZiBjb21tZW50cyBvZiB0aGUgYnVja2V0LicsXG4gICAgICAgIH0sXG4gICAgICAgIHB1Ymxpc2hlZDoge1xuICAgICAgICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuQm9vbGVhbixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIHB1Ymxpc2hlZCBzdGF0dXMgb2YgdGhlIGJ1Y2tldC4nLFxuICAgICAgICB9LFxuICAgICAgICBhcHByb3ZlZDoge1xuICAgICAgICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuQm9vbGVhbixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGFwcHJvdmVkIHN0YXR1cyBvZiB0aGUgYnVja2V0LicsXG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbGVkOiB7XG4gICAgICAgICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5Cb29sZWFuLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgY2FuY2VsZWQgc3RhdHVzIG9mIHRoZSBidWNrZXQuJyxcbiAgICAgICAgfSxcbiAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzdGF0dXMgb2YgdGhlIGJ1Y2tldC4nLFxuICAgICAgICB9LFxuICAgICAgICBwZXJjZW50YWdlRnVuZGVkOiB7XG4gICAgICAgICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5OdW1iZXIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBwZXJjZW50YWdlIGZ1bmRlZCBvZiB0aGUgYnVja2V0LicsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBkaXNwbGF5UHJvcGVydHk6ICd0aXRsZScsXG4gICAgaWRQcm9wZXJ0eTogJ2lkJyxcbn0pO1xuXG5wYWNrLmFkZFN5bmNUYWJsZSh7XG4gICAgc2NoZW1hOiBCdWNrZXRTY2hlbWEsXG4gICAgbmFtZTogJ0J1Y2tldHMnLFxuICAgIGRlc2NyaXB0aW9uOiAnR2V0IGEgbGlzdCBvZiBidWNrZXRzLicsXG4gICAgaWRlbnRpdHlOYW1lOiAnQnVja2V0JyxcbiAgICBmb3JtdWxhOiB7XG4gICAgICAgIG5hbWU6ICdzeW5jQnVja2V0cycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnR2V0IGEgbGlzdCBvZiBidWNrZXRzLicsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICAgICAgICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ3JvdXBTbHVnJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzbHVnIG9mIHRoZSBncm91cC4nLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5TdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3JvdW5kU2x1ZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgc2x1ZyBvZiB0aGUgcm91bmQuJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlOiBhc3luYyBmdW5jdGlvbiAoYXJncywgY29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgW2dyb3VwU2x1Zywgcm91bmRTbHVnXSA9IGFyZ3M7XG4gICAgICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7XG4gICAgICAgICAgICAgICAgXCJncm91cFNsdWdcIjogZ3JvdXBTbHVnLFxuICAgICAgICAgICAgICAgIFwicm91bmRTbHVnXCI6IHJvdW5kU2x1ZyxcbiAgICAgICAgICAgICAgICBcIm9mZnNldFwiOiAwLFxuICAgICAgICAgICAgICAgIFwibGltaXRcIjogMTAwMCxcbiAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBbXCJQRU5ESU5HX0FQUFJPVkFMXCIsIFwiT1BFTl9GT1JfRlVORElOR1wiLCBcIkZVTkRFRFwiLCBcIkNPTVBMRVRFRFwiLCBcIkNBTkNFTEVEXCJdXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9jb2J1ZGdldC5jb20vYXBpJyxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHF1ZXJ5OiBidWNrZXRRdWVyeSwgdmFyaWFibGVzIH0pLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ1Y2tldHMgPSByZXNwb25zZS5ib2R5LmRhdGEuYnVja2V0c1BhZ2UuYnVja2V0cztcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IGJ1Y2tldHNcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSxtRUFBQUEsU0FBQTtBQUFBO0FBa0VBLFFBQUlDLG1CQUFrQixnQ0FBUyxNQUFNO0FBQ3BDLFVBQUksUUFBUSxRQUFXO0FBQ3RCLGdCQUFPLG9CQUFJLEtBQUssR0FBRSxRQUFRO0FBQUEsTUFDM0I7QUFHQSxXQUFLLElBQUk7QUFDVCxXQUFLLElBQUk7QUFDVCxXQUFLLFdBQVc7QUFDaEIsV0FBSyxhQUFhO0FBQ2xCLFdBQUssYUFBYTtBQUVsQixXQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssQ0FBQztBQUMxQixXQUFLLE1BQUksS0FBSyxJQUFFO0FBRWhCLFVBQUksS0FBSyxlQUFlLE9BQU87QUFDOUIsYUFBSyxjQUFjLE1BQU0sS0FBSyxNQUFNO0FBQUEsTUFDckMsT0FDSztBQUNKLGFBQUssVUFBVSxJQUFJO0FBQUEsTUFDcEI7QUFBQSxJQUNELEdBckJzQjtBQXlCdEIsSUFBQUEsaUJBQWdCLFVBQVUsWUFBWSxTQUFTLEdBQUc7QUFDakQsV0FBSyxHQUFHLENBQUMsSUFBSSxNQUFNO0FBQ25CLFdBQUssS0FBSyxNQUFJLEdBQUcsS0FBSyxNQUFJLEtBQUssR0FBRyxLQUFLLE9BQU87QUFDN0MsWUFBSSxJQUFJLEtBQUssR0FBRyxLQUFLLE1BQUksQ0FBQyxJ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QUFXLE1BQU0sUUFBUSxRQUFRLE1BQU07QUFBQSxRQUN6QyxRQUFRO0FBQUEsUUFDUixLQUFLO0FBQUEsUUFDTCxNQUFNLEtBQUssVUFBVSxFQUFFLE9BQU8sYUFBYSxVQUFVLENBQUM7QUFBQSxNQUMxRCxDQUFDO0FBRUQsWUFBTSxVQUFVLFNBQVMsS0FBSyxLQUFLLFlBQVk7QUFFL0MsYUFBTztBQUFBLFFBQ0gsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNOO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbIm1vZHVsZSIsICJNZXJzZW5uZVR3aXN0ZXIiLCAiUGFja0NhdGVnb3J5IiwgIkF1dGhlbnRpY2F0aW9uVHlwZSIsICJQb3N0U2V0dXBUeXBlIiwgIlRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uIiwgIkZlYXR1cmVTZXQiLCAiUXVvdGFMaW1pdFR5cGUiLCAiU3luY0ludGVydmFsIiwgIlR5cGUiLCAiUGFyYW1ldGVyVHlwZSIsICJDb25uZWN0aW9uUmVxdWlyZW1lbnQiLCAiTmV0d29ya0Nvbm5lY3Rpb24iLCAiUHJlY2FubmVkRGF0ZVJhbmdlIiwgIm1vZHVsZSIsICJWYWx1ZVR5cGUiLCAiVmFsdWVIaW50VHlwZSIsICJDdXJyZW5jeUZvcm1hdCIsICJTY2FsZUljb25TZXQiLCAiRW1haWxEaXNwbGF5VHlwZSIsICJMaW5rRGlzcGxheVR5cGUiLCAiSW1hZ2VPdXRsaW5lIiwgIkltYWdlQ29ybmVyU3R5bGUiLCAiRHVyYXRpb25Vbml0IiwgIkF0dHJpYnV0aW9uTm9kZVR5cGUiLCAibWFrZU9iamVjdFNjaGVtYSIsICJtb2R1bGUiLCAiY2xvbmUiLCAicGFyZW50IiwgImRlcHRoIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJFbXB0eSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJ1bmRlZmluZWQiLCAiZG9FdmFsIiwgInN0cmluZ1RvUGF0aCIsICJnZXRCYXNlSW50cmluc2ljIiwgIm1vZHVsZSIsICJhcHBseUJpbmQiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiY29tcGFjdFF1ZXVlIiwgImFycmF5VG9PYmplY3QiLCAibWVyZ2UiLCAiZW5jb2RlIiwgImNvbXBhY3QiLCAiaXNSZWdFeHAiLCAiaXNCdWZmZXIiLCAiY29tYmluZSIsICJtYXliZU1hcCIsICJtb2R1bGUiLCAiaXNOb25OdWxsaXNoUHJpbWl0aXZlIiwgInN0cmluZ2lmeSIsICJ2YWx1ZSIsICJub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zIiwgIm1vZHVsZSIsICJub3JtYWxpemVQYXJzZU9wdGlvbnMiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibWFrZVBhcmFtZXRlciIsICJVcGRhdGVPdXRjb21lIiwgIm5ld1BhY2siLCAicmVxdWlyZV9zY2hlbWEiLCAiU3ZnQ29uc3RhbnRzIl0KfQo=
