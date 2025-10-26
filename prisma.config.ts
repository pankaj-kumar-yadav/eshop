import { defineConfig, env } from "prisma/config";
import * as dotenv from "dotenv";

// ✅ Explicitly load .env before defining config
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
