/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  env: {
    browser: true,
    node: true,
    'vitest-globals/env': true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // set the jest version for vitest (same api)
  settings: {
    jest: {
      version: 28,
    },
  },
  extends: [
    'airbnb-base',
    'plugin:vitest-globals/recommended',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'plugin:prettier/recommended', // must be at bottom
  ],
  rules: {
    // import
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'unknown', 'object', 'type'],
      },
    ],

    // misc
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
  overrides: [
    /** TypeScript File Config */
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',

        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.eslint.json',
          },
        },
      },
    },
  ],
};
