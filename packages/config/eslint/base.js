module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    es2020: true,
  },
  rules: {
    'no-console': 'off',
  },
};
