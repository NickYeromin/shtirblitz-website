import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          {
            group: ["**/*.css", "**/*.scss", "**/*.sass", "**/*.less"],
            message: "Пишите стили внутри компонента через MUI sx.",
          },
          {
            group: ["@phosphor-icons/*", "@mui/icons-material", "@mui/icons-material/*", "react-icons", "react-icons/*", "@heroicons/*"],
            message: "Используйте иконки из lucide-react.",
          },
        ],
      }],
      "no-restricted-syntax": ["error",
        {
          selector: "JSXAttribute[name.name='style']",
          message: "Используйте MUI sx вместо style.",
        },
        {
          selector: "JSXAttribute[name.name='className']",
          message: "Используйте MUI sx вместо CSS-классов.",
        },
        {
          selector: "JSXOpeningElement[name.name='style']",
          message: "Используйте MUI sx и keyframes вместо тега style.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
