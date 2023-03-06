/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  }
}
