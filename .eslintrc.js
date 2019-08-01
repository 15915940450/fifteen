module.exports = {
    "env": {
      "browser": true,
      "jquery":true,
      "commonjs":true,
      "node": true,
      "es6": true
    },
    "globals":{
      "X2JS":true,
      "Vue":true,
      "api":true,
      "obj":true,
      "_":true
    },
    "parserOptions":{"sourceType":"module"},
    "extends": "eslint:recommended",
    "rules": {
      "indent": ["error", 2],
      "no-console": "off",
      "semi": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "eqeqeq": ["error", "always"],
      "quotes": ["error", "single"]
    }
};
