// Ensure environment variables from .env are loaded before Prisma
// evaluates the config and validates required env vars like DATABASE_URL.
require("dotenv").config();

const { defineConfig, env } = require("prisma/config");

module.exports = defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
