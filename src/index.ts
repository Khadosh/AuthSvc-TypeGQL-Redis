import "reflect-metadata";

import Express from 'express';
import session from "express-session";
import connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { RegisterResolver } from './modules/user/Register';
import { LoginResolver } from "./modules/user/Login";
import { redis } from "./redis";
import cors from 'cors';
import { MeResolver } from "./modules/user/Me";

const MAX_AGE_SEVEN_YEARS = 1000 * 60 * 60 * 24 * 7;

const main = async () => {
  await createConnection();
  const app = Express();
  const RedisStore = connectRedis(session)

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      MeResolver
    ]
  })
    
  const server = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  });
  
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "some-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        maxAge: MAX_AGE_SEVEN_YEARS
      }
    })
  )
  server.applyMiddleware({ app });
   
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

main();