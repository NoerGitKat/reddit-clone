import { Connection, IDatabaseDriver, EntityManager } from "@mikro-orm/core";

export type PostContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
};
