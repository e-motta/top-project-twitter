module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "eslint-config-prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],
  },
};
