module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    semi: ["warn", "always"],
    quotes: ["warn", "double"], // 쌍 따옴표
    indent: ["warn", 2, { SwitchCase: 1, VariableDeclarator: 1 }], // tabWidth 설정을 indent로 변경
    "object-curly-spacing": ["warn", "always"], // 괄호 사용 시 공백
    "comma-dangle": ["warn", "always-multiline"], // 세미콜론
    "arrow-parens": ["warn", "always"], // 화살표 사용 시 괄호 사용
    "jsx-quotes": ["warn", "prefer-double"], // jsx 쌍따옴표
  },
};
