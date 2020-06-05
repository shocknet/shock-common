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
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
  ],
  rules: {
    // complains about javascript file functions even though it shouldn't
    // if/when the whole codebase is in typescript we'll turn it back on
    '@typescript-eslint/explicit-module-boundary-types': 0,

    // this is a job for code reviews
    '@typescript-eslint/ban-ts-comment': 0,

    // these rules are great but lots of reworking needs to be done to comply
    // with them, so we'll put them aside (as warnings) for now
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/no-unsafe-return': 1,
    '@typescript-eslint/no-unsafe-member-access': 1,
    '@typescript-eslint/no-explicit-any': 1,
  },
}
