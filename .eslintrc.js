module.exports = {
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      js: "never",
      jsx: "never",
      ts: "never",
      tsx: "never",
    },
  ],
  extends: [
    "eslint-config-airbnb-typescript",
    "next/core-web-vitals",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "import/prefer-default-export": "off",
    "prettier/prettier": "error",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "warn",
    "react/forbid-prop-types": "warn",
    // "import/no-unresolved": "off",
  },
};
