import * as argon2 from "argon2";
import { Ctx, Resolver, Arg, Mutation, Query } from "type-graphql";
import { EmContext } from "src/types";
import User from "../models/User";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async getUsers(@Ctx() { em }: EmContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  async getUser(
    @Arg("id", () => Number) id: number,
    @Ctx() { em }: EmContext,
  ): Promise<User | null> {
    const fetchedUser = await em.findOne(User, { id });
    if (fetchedUser) {
      return fetchedUser;
    }
    return null;
  }

  @Mutation(() => User)
  async register(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em }: EmContext,
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const newUser = em.create(User, { username, password: hashedPassword });
    await em.persistAndFlush(newUser);
    return newUser;
  }

  @Mutation(() => User)
  async login(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em }: EmContext,
  ): Promise<User | undefined> {
    const fetchedUser = await em.findOne(User, { username });

    if (fetchedUser) {
      const isValidPassword = await argon2.verify(fetchedUser.password, password);

      if (isValidPassword) {
        return fetchedUser;
      }
    }

    return undefined;
  }
}
