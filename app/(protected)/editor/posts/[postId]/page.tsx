import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { postConfig } from "@/config/post";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import supabase from "@/utils/supabase-server";
import PostEditor from "@/components/protected/editor/post-editor";
import { Category, Draft } from "@/types/collection";
import { notFound } from "next/navigation";
import { editorConfig } from "@/config/editor";

interface PostEditorPageProps {
  params: { postId: string };
}

export default async function PostEditorPage({ params }: PostEditorPageProps) {
  // Fetch user from session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Fetch post from database
  const { data, error } = await supabase
    .from("drafts")
    .select("*")
    .match({ id: params.postId, author_id: session?.user.id ?? "" })
    .single<Draft>();

  if (!data || error) {
    return notFound;
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
      <div>
        <h3 className="text-lg font-medium">{editorConfig.title}</h3>
        <p className="py-2 text-sm text-muted-foreground">
          {editorConfig.description}
        </p>
      </div>
      <Separator className="mb-5" />
      <PostEditor post={data} />
    </div>
  );
}
