import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules", "**/*.svg"],
}, ...compat.extends("airbnb-base"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",
    },

    settings: {
        "import/resolver": {
            typescript: {},
        },
    },

    rules: {
        "import/extensions": 0,
        "import/prefer-default-export": 0,
        "no-param-reassign": 0,
        "no-use-before-define": 0,
        "no-loop-func": 0,

        "import/no-unresolved": [2, {
            ignore: ["^@theme", "^@docusaurus", "^@site"],
        }],

        "no-nested-ternary": 0,
    },
}];