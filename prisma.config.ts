import path from "node:path";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { defineConfig } = require("prisma/config");

module.exports = defineConfig({
  schema: path.join(__dirname, "prisma/schema.prisma"),
  datasource: {
    url: "file:" + path.join(__dirname, "prisma/dev.db"),
  },
});
