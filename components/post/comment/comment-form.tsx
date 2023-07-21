"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SendIcon, Loader2 as SpinnerIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { commentSchema, commentFormSchema } from "@/lib/validations";
import { PostComment } from "@/actions/post-comment";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "2 ба түүнээс дээш тэмдэгт байх шаардлагатай.",
    })
    .max(30, {
      message: "30 тэмдэгтэнд багтаах шаардлагатай.",
    }),
  comment: z.string().max(160).min(4),
});

type FormValues = z.infer<typeof formSchema>;

interface CommentFormProps {
  slug: string;
  username?: string;
  profileImage?: string;
}

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
  username: "Зочин",
  comment: "Таны сэтгэгдэл",
};

const CommentForm: React.FC<CommentFormProps> = ({
  slug,
  username,
  profileImage,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    const formData = {
      username: username ? username : data.username,
      image: profileImage ? profileImage : "",
      slug: slug,
      comment: data.comment,
    };

    const response = await PostComment(formData);

    if (response) {
      setIsLoading(false);
      toast.success("Амжилттай");
      router.refresh();
    } else {
      setIsLoading(false);
      toast.error("Алдаа гарлаа");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нэр</FormLabel>
              <FormControl>
                <Input placeholder="Зочин" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сэтгэгдэл</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="group flex p-2 items-center justify-center rounded-lg bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-400 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
        >
          {isLoading ? (
            <SpinnerIcon className="mr-2 h-4 w-4 animate-spin text-gray-600" />
          ) : (
            <SendIcon className="mr-2 h-4 w-4 text-gray-600" />
          )}
          <span className="text-gray-600">Илгээх</span>
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
