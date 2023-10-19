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
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    'plugin:jsx-a11y/recommended',
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
  plugins: ["react", "prettier", "@typescript-eslint"],
  rules: {
    "import/prefer-default-export": "off",
    "prettier/prettier": "error",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/forbid-prop-types": "off",
    "import/no-unresolved": "off",
  },

};
