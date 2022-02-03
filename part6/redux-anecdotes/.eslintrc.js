module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react-redux/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
	'react-redux'
  ],
  rules: {
	  'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
	  "react/prop-types": "off",
  },
};
