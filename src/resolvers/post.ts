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
  getPostById(
    @Arg("id", () => Int) id: number,
    @Ctx()
    { em }: PostContext,
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }
}
