import { Database } from './supabase';

export type Category = Database['public']['Tables']['categories']['Row'];
export type Author = Database['public']['Tables']['authors']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type BookMark = Database['public']['Tables']['bookmarks']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Drafts = Database['public']['Tables']['drafts']['Row'];

export interface PostWithCategory extends Omit<Post, 'categories'> {
    categories: Category;
}

export interface PostWithCategoryWithAuthor extends Omit<PostWithCategory, 'authors'> {
    authors: Author;
}

export interface CategoryWithPost extends Omit<Category, 'posts'> {
    posts: Post;
}

export interface BookMarkWithPost extends Omit<BookMark, 'posts'> {
    posts: Post;
}

export interface CommentWithProfile extends Omit<Comment, 'profiles'> {
    profiles: Profile;
}

export interface DraftsWithCategory extends Omit<Drafts, 'categories'> {
    categories: Category;
}
