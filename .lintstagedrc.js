const path = require("path");

const buildEslintCommand = (filenames) =>
  filenames
    ? `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(" --file ")}`
    : undefined;

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "prettier --ignore-unknown --write",
    buildEslintCommand,
  ],
};
