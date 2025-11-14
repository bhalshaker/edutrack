module.exports = {
  testEnvironment: "node",
  // No transform (keep native ESM). If you add Babel later, adjust accordingly.
  transform: {},
  // Include .mjs tests (we use ESM test files)
  testMatch: ["**/tests/**/*.mjs", "**/?(*.)+(spec|test).mjs"],
  verbose: true,
};
