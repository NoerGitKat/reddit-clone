import "reflect-metadata";
import express from "express";
import cors from 'cors'

import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const PORT = process.env.PORT || 4000;

import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
  // Init MikroORM
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // Instantiate web server
  const app = express();

  // Instantiate Redis connection
  let RedisStore = connectRedis(session);
  let redisClient = redis.createClient();

  // Enable cors globally
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))

  // Connect Express with Redis conecction
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: __prod__, // Cookie only works in prod
        sameSite: "lax", // Protecting against CSRF
      },
      saveUninitialized: false,
      secret: "wjkenbfknsdikln",
      resave: false,
    })
  );

  // Init connection with GraphQL
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  // Connect Express with GraphQL
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
