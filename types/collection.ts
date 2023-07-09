import { Database } from "./supabase";

export type CategoryType = Database["public"]["Tables"]["category"]["Row"];
export type AuthorType = Database["public"]["Tables"]["author"]["Row"];
export type PostType = Database["public"]["Tables"]["post"]["Row"];

export interface PostWithCategory extends Omit<PostType, "category"> {
  category: CategoryType;
}

export interface PostWithCategoryWithAuthor
  extends Omit<PostWithCategory, "author"> {
  author: AuthorType;
}

export interface CategoryWithPost extends Omit<CategoryType, "post"> {
  post: PostType;
}
