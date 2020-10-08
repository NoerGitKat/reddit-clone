import { User } from "./../entities/User";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {}

  @Query(() => User, { nullable: true })
  async getUser(
    @Arg("id", () => Number) id: number,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const foundUser = await em.findOne(User, { id });
    if (!foundUser) {
      return null;
    }
    return foundUser;
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    // Validation
    if (username.length <= 2) {
      return {
        errors: [{ field: "username", message: "Fill in a valid username." }],
      };
    }

    if (password.length <= 2) {
      return {
        errors: [{ field: "password", message: "Fill in a valid password." }],
      };
    }

    const foundUser = await em.findOne(User, { username });
    if (foundUser) {
      return {
        errors: [
          {
            field: "",
            message: "User already exists.",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = await em.create(User, {
      username,
      password: hashedPassword,
    });
    await em.persistAndFlush(newUser);
    return { user: newUser };
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const foundUser = await em.findOne(User, { username });
    // Validation
    if (!foundUser) {
      return {
        errors: [
          { field: "username", message: "That username doesn't exist!" },
        ],
      };
    }
    const validatedPassword = await argon2.verify(foundUser.password, password);
    if (!validatedPassword) {
      return {
        errors: [{ field: "password", message: "Password is incorrect!" }],
      };
    }

    // Set user ID in session
    req.session.userId = foundUser.id;

    return { user: foundUser };
  }

  @Mutation(() => User)
  updateUser() {}

  @Mutation(() => Boolean)
  deleteUser() {}
}
