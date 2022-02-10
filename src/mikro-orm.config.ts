import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./models/Post";
import { MikroORM } from "@mikro-orm/core";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files (TS/JS)
  },
  dbName: "reddit_clone_db",
  type: "postgresql",
  debug: !__prod__,
  entities: [Post],
} as Parameters<typeof MikroORM.init>[0];
