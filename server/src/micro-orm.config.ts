import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Maintenance } from './entity/Maintenance';
import { Members } from './entity/Members';
import { User } from './entity/User';

export default {
  // migrations: {
  //     path: path.join(__dirname, "./migrations"),
  //     pattern: /^[\w-]+\d+\.[tj]s$/,
  // },
  entities: [User, Members, Maintenance],
  dbName: 'qayaam',
  type: 'mongo',
  clientUrl: 'mongodb://localhost:2717',
  debug: !__prod__,
  ensureIndexes: true,
} as Parameters<typeof MikroORM.init>[0];
