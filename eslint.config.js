import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores([
    'dist',
    'src/components/**',
    'src/constants/**',
    'src/hooks/**',
    'src/layouts/**',
    'src/pages/**',
    'src/utils/**',
    'src/App.tsx',
    'src/App.css',
    'src/index.css',
  ]),
  {
    files: ['src/main.tsx', 'src/app/**/*.{ts,tsx}', 'src/features/**/*.{ts,tsx}', 'src/shared/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
