"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));
var import_cookie = __toESM(require("@fastify/cookie"));

// src/routes/transactions.ts
var import_node_crypto = __toESM(require("crypto"));
var import_zod2 = require("zod");

// src/lib/knex.ts
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

// src/middlewares/auth.ts
async function auth(request, reply) {
  const sessionId = request.cookies.sessionId;
  if (!sessionId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
}

// src/routes/transactions.ts
var createTransactionBodySchema = import_zod2.z.object({
  title: import_zod2.z.string(),
  amount: import_zod2.z.number(),
  type: import_zod2.z.enum(["credit", "debit"])
});
var getTransactionParamsSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid()
});
async function transactionRoutes(app2) {
  app2.get("/", { preHandler: [auth] }, async (request, reply) => {
    const { sessionId } = request.cookies;
    const transactions = await knex("transactions").select().where("session_id", sessionId);
    return reply.status(200).send({ transactions });
  });
  app2.get("/:id", { preHandler: [auth] }, async (request, reply) => {
    const params = getTransactionParamsSchema.parse(request.params);
    const { sessionId } = request.cookies;
    const { id } = params;
    const transaction = await knex("transactions").select().where({
      id,
      session_id: sessionId
    }).first();
    return reply.status(200).send({ transaction });
  });
  app2.get("/summary", { preHandler: [auth] }, async (request, reply) => {
    const { sessionId } = request.cookies;
    const summary = await knex("transactions").where("session_id", sessionId).sum("amount", { as: "amount" }).first();
    return reply.status(200).send({ summary });
  });
  app2.post("/", async (request, reply) => {
    const body = createTransactionBodySchema.parse(request.body);
    const { title, amount, type } = body;
    const amountByType = type === "credit" ? amount : amount * -1;
    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = import_node_crypto.default.randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1e3 * 60 * 60 * 24 * 7
        // 7 days
      });
    }
    await knex("transactions").insert({
      id: import_node_crypto.default.randomUUID(),
      title,
      amount: amountByType,
      session_id: sessionId
    });
    return reply.status(201).send();
  });
}

// src/routes/index.ts
async function routes(app2) {
  app2.register(transactionRoutes, { prefix: "transactions" });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_cookie.default);
app.register(routes);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
