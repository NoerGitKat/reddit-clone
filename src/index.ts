import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";

const main = async () => {
  const orm = await MikroORM.init({
    dbName: "reddit_clone_DB",
    type: "postgresql",
    debug: !__prod__,
  });

  console.log("orm", orm);
};

main();
