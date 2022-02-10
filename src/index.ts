import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig); // Connect to DB
  await orm.getMigrator().up(); // Run migration to sync data in  DB
};

main().catch((err) => console.error(err));
