import { Connection, IDatabaseDriver, EntityManager } from "@mikro-orm/core";

export type EmContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
};
