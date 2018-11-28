module.exports = {
    "env": {
      "browser": true,
      "jquery":true,
      "commonjs":true,
      "node": true,
      "es6": true
    },
    "globals":{
      "apiInStore":true,
      "WebUploader":true,
      "protocol":true,

      "env":true,
      "serverTime":true,
      "dobjServerTime":true,
      "offsetMS":true,
      "rqs":true,
      "token":true,
      "ecadmin":true,
      "hostname":true,
      "dpOption":true,
      "port":true,
      "dpOption":true,
      "iliechartsOpt":true,
      "pageNumber":true,
      "paginationDefaults":true,
      "cityName":true,
      "cityCode":true,
      "dtpOption":true,
      "clientWidth":true,
      "loginPageUrl":true,

      "md5":true,
      "Chart":true,
      "swal":true,
      "Morris":true,
      "AMap":true,
      "AMapUI":true,
      "BMap":true,
      "echarts":true,
      "ili":true,
      "_":true,
      "imPostForm":true,
      "Mock":true,
      "ajaxPOST":true,
      "ajaxGET":true,
      "logout":true,
      "ActiveXObject":true,
      "arrCitys":true,
      "objCitys":true,
      "Switchery":true,

      "eSys":true,
      "eSysRoles":true,
      "eSysIsAdmin":true,
      "eSysIsSAdmin":true,

      "Moon":true
    },
    "extends": "eslint:recommended",
    "rules": {
      "indent": ["error", 2],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "eqeqeq": ["error", "always"],
      "quotes": ["error", "single"]
    }
};
