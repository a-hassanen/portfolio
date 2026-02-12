import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Target all JS/JSX files
    files: ["**/*.{js,jsx,mjs,cjs}"],
    // Extend recommended JS rules
    extends: [js.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser }, // browser globals
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    // React rules
    files: ["**/*.{jsx,js}"],
    plugins: { react: pluginReact },
    extends: [pluginReact.configs.flat.recommended],
    settings: {
        react: {
          version: "detect"
        }
    },
    rules: {
      // Customize rules here if needed
      "react/react-in-jsx-scope": "off", // not needed in React 17+
      "react/prop-types": "off", 
      "no-prototype-builtins": "off",
      "react/no-unescaped-entities": "off",
    },
  },
]);
