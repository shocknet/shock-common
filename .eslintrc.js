module.exports = {
  root: true,
  env: {
    es6: true,
  },
  globals: {
    fetch: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
  ],
  rules: {
    // complains about javascript file functions even though it shouldn't
    '@typescript-eslint/explicit-function-return-type': 0,
    // hostile rule
    '@typescript-eslint/no-explicit-any': 0,
  },
}
