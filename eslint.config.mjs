// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    ignores: ["dist", ".eslintrc.cjs"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
      },
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",

      // Core ESLint rules
      "no-useless-catch": "warn",
      "no-useless-escape": "warn",
      "no-unused-vars": "warn",

      "@typescript-eslint/no-empty-object-type": "off",

      // Original rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
      indent: ["warn", 2],
      "object-curly-spacing": ["warn", "always"],
      "comma-dangle": ["warn", "always-multiline"],
      "arrow-parens": ["warn", "always"],
      "jsx-quotes": ["warn", "prefer-double"],
    },
  },
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
