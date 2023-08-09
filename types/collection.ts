import { Database } from "./supabase";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Author = Database["public"]["Tables"]["authors"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type BookMark = Database["public"]["Tables"]["bookmarks"]["Row"];

export interface PostWithCategory extends Omit<Post, "categories"> {
  categories: Category;
}

export interface PostWithCategoryWithAuthor
  extends Omit<PostWithCategory, "authors"> {
  authors: Author;
}

export interface CategoryWithPost extends Omit<Category, "posts"> {
  posts: Post;
}

export interface BookMarkWithPost extends Omit<BookMark, "posts"> {
  posts: Post;
}
