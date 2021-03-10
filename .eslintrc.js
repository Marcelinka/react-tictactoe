const prettierConfig = require('./.prettierrc.js');

module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', '@imaginary-cloud/react'],
  rules: {
    'prettier/prettier': [2, prettierConfig],
  },
};
