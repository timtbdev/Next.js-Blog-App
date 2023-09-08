create table
  public.profiles (
    id uuid not null,
    updated_at timestamp with time zone null,
    username text null,
    full_name text null,
    avatar_url text null,
    website text null,
    constraint profiles_pkey primary key (id),
    constraint profiles_username_key unique (username),
    constraint profiles_id_fkey foreign key (id) references auth.users (id),
    constraint username_length check ((char_length(username) >= 3))
  ) tablespace pg_default;

  create table
  public.categories (
    id uuid not null default gen_random_uuid (),
    title text null default ''::text,
    created_at timestamp with time zone null default now(),
    slug text null,
    constraint category_pkey primary key (id),
    constraint category_id_key unique (id)
  ) tablespace pg_default;

  create table
  public.comments (
    id uuid not null default gen_random_uuid (),
    comment text null default ''::text,
    created_at timestamp with time zone null default now(),
    user_id uuid null,
    post_id uuid null,
    constraint comments_pkey primary key (id),
    constraint comments_post_id_fkey foreign key (post_id) references posts (id) on delete cascade,
    constraint comments_user_id_fkey foreign key (user_id) references profiles (id) on delete cascade
  ) tablespace pg_default;

  create table
  public.bookmarks (
    id uuid not null,
    user_id uuid null,
    created_at timestamp with time zone null default now(),
    constraint bookmarks_pkey primary key (id),
    constraint bookmarks_id_fkey foreign key (id) references posts (id) on delete cascade,
    constraint bookmarks_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

  create table
  public.posts (
    id uuid not null default gen_random_uuid (),
    category_id uuid null,
    title text null,
    image text null,
    description text null,
    content text null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null,
    slug text null default ''::text,
    author_id uuid null,
    published boolean null default false,
    constraint post_pkey primary key (id),
    constraint post_id_key unique (id),
    constraint post_slug_key unique (slug),
    constraint posts_author_id_fkey foreign key (author_id) references profiles (id),
    constraint posts_category_id_fkey foreign key (category_id) references categories (id)
  ) tablespace pg_default;

create trigger handle_updated_at before
update on posts for each row
execute function moddatetime ('updated_at');

create table
  public.drafts (
    id uuid not null default gen_random_uuid (),
    category_id uuid null,
    title text null default 'Untitled'::text,
    slug text null default 'untitled'::text,
    image text null,
    description text null,
    content text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp without time zone null,
    author_id uuid null,
    published boolean null default false,
    constraint drafts_pkey primary key (id),
    constraint drafts_author_id_fkey foreign key (author_id) references profiles (id),
    constraint drafts_category_id_fkey foreign key (category_id) references categories (id) on delete cascade
  ) tablespace pg_default;

create trigger handle_updated_at before
update on drafts for each row
execute function moddatetime ('updated_at');