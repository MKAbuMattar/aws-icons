/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'unused-imports',
  ],
  rules: {
    'import/order': 0,
    'import/no-unresolved': 0,
    'import/no-duplicates': 1,
    'sort-imports': 0,
    'simple-import-sort/imports': 1,
    'simple-import-sort/exports': 1,
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-case-declarations': 'off',
    'no-empty': 'off',
    'no-useless-escape': 'off',
    'no-control-regex': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};

module.exports = eslintConfig;
