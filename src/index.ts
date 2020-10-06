import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import microOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microOrmConfig);

  orm.em.create(Post, { title: "This is amazing!!!!" });
};

main();
