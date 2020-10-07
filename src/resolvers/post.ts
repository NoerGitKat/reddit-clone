import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";
import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
  /* CRUD: Read all posts */
  // GraphQL type
  @Query(() => [Post])
  // TypeScript type
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  /* CRUD: Read a post */
  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  /* CRUD: Create a post */
  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const newPost = em.create(Post, { title });
    await em.persistAndFlush(newPost);
    return newPost;
  }

  /* CRUD: Update a post */
  @Mutation(() => Post)
  async updatePost(
    @Arg("id", () => Number) id: number,
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const foundPost = await em.findOne(Post, { id });
    if (!foundPost) {
      return null;
    }
    if (typeof title !== "undefined") {
      foundPost.title = title;
      await em.persistAndFlush(foundPost);
    }
    return foundPost;
  }

  /* CRUD: Delete a post */
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Number) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    try {
      await em.nativeDelete(Post, { id });
      return true;
    } catch (error) {
      return false;
    }
  }
}
