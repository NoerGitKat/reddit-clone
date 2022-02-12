import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import mikroOrmConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig); // Connect to DB
  await orm.getMigrator().up(); // Run migration to sync data in  DB

  const app = express(); // Create web server instance
  const PORT = process.env.PORT || 4000;

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`The web server has started on port ${PORT}!`);
  });
};

main().catch((err) => console.error(err));
