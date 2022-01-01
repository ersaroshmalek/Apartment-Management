import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import microOrmConfig from './micro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { MemberResolver } from './resolvers/members';
import { RegisterResolver } from './resolvers/user';
import { MaintenanceResolver } from './resolvers/maintenance';
import cors from 'cors';

const bootstrape = async () => {
  const orm = await MikroORM.init(microOrmConfig);
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MemberResolver, RegisterResolver, MaintenanceResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  app.options('/', cors);
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
};

bootstrape().catch((err) => {
  console.error(err);
});
