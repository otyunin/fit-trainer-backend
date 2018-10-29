module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'indent': ['error', 2],
    'no-console': 'off',
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    semi: [2, 'never'],
    'max-len': [2, 120],
  }
}
