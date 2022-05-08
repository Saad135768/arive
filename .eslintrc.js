/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'never'],
    'prettier/prettier': 'off',
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 'off',
    'class-methods-use-this': [0],
    'no-unused-vars': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'linebreak-style': [0],
    'react/jsx-curly-brace-presence': 0,
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],
    'max-len': [
      'error',
      { code: 120, ignorePattern: '^import [^,]+ from |^export | implements' },
    ],
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
}
