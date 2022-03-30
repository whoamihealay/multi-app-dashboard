module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',  
    'prettier'
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {},
  plugins: ['react'],
  rules: {},
  overrides: {
    files: "./client/**/*.*",
    plugins: [
      '@typescript-eslint'
    ],
    extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
  }
}
