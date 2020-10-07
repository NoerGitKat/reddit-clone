import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const PORT = process.env.PORT || 4000;

const main = async () => {
  // Init MikroORM
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // Instantiate web server
  const app = express();

  // Init connection with GraphQL
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  // Connect Express with GraphQL
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
