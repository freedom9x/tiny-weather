module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,

  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',

  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    semi: [2, 'never'],
    'react/jsx-indent': [2, 2],
    'class-methods-use-this': 0,
    'import/no-unresolved': 0,
    'camelcase': 0
  },
}
