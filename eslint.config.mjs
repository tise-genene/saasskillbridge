import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Basic rules only - no overly strict formatting rules
      "no-unused-vars": "warn",
      "no-console": "off", // Allow console statements for debugging
      "react/no-unescaped-entities": "off", // Allow quotes and apostrophes
      "react/no-array-index-key": "warn", // Just warn, don't error
      "react-hooks/exhaustive-deps": "warn", // Just warn about missing dependencies
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off", // Allow any type during development
    },
  },
];

export default eslintConfig;
