"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/knex.ts
var knex_exports = {};
__export(knex_exports, {
  knex: () => knex
});
module.exports = __toCommonJS(knex_exports);
var import_knex = require("knex");

// src/env/index.ts
var import_dotenv = require("dotenv");
var import_zod = require("zod");
if (process.env.NODE_ENV === "test") {
  (0, import_dotenv.config)({ path: ".env.test" });
} else {
  (0, import_dotenv.config)();
}
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("production"),
  APP_PORT: import_zod.z.coerce.number().default(3333),
  DATABASE_CLIENT: import_zod.z.enum(["sqlite", "pg"]).default("sqlite"),
  DATABASE_URL: import_zod.z.string().default("./db/app.db")
});
var env = envSchema.parse(process.env);

// src/config/database.ts
var providers = {
  sqlite: {
    client: "sqlite",
    useNullAsDefault: true,
    connection: {
      filename: env.DATABASE_URL
    }
  },
  pg: {
    client: "pg",
    connection: env.DATABASE_URL
  }
};
var databaseConfig = providers[env.DATABASE_CLIENT];

// src/lib/knex.ts
var knex = (0, import_knex.knex)(databaseConfig);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  knex
});
