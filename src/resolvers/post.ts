import Post from "../models/Post";
import { Ctx, Query, Resolver, Int, Arg, Mutation } from "type-graphql";
import { PostContext } from "src/types";

@Resolver()
export default class PostResolver {
  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx()
    { em }: PostContext,
  ): Promise<Post> {
    const newPost = em.create(Post, { title });
    await em.persistAndFlush(newPost);
    return newPost;
  }

  @Query(() => [Post])
  getPosts(@Ctx() { em }: PostContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  getPost(
    @Arg("id", () => Int) id: number,
    @Ctx()
    { em }: PostContext,
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Number) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: PostContext,
  ): Promise<Post | null> {
    const fetchedPost = await em.findOne(Post, { id });
    if (!fetchedPost) return null;
    if (typeof title !== "undefined") {
      fetchedPost.title = title;
      await em.persistAndFlush(fetchedPost);
    }
    return fetchedPost;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number, @Ctx() { em }: PostContext): Promise<boolean> {
    try {
      const fetchedPost = await em.findOne(Post, { id });
      if (!fetchedPost) return false;
      await em.nativeDelete(Post, { id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
