"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { commentSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const commentFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Доод тал нь 2 тэмдэгт байна.",
    })
    .max(30, {
      message: "Дээд тал нь 30 тэмдэгт байна.",
    }),

  comment: z
    .string()
    .max(160, {
      message: "Дээд тал нь 160 тэмдэгт байна.",
    })
    .min(4, {
      message: "Доод тал нь 2 тэмдэгт байна.",
    }),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

const CommentPost = () => {
  const [isSaveLoading, setIsSaveLoading] = React.useState<boolean>(false);
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CommentFormValues) {}
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-2">
          <FormField
            control={form.control}
            name="name"
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
                <FormLabel>Сэтгэгдэл:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Таны сэтгэгдэл."
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Илгээх</Button>
        </form>
      </Form>
    </>
  );
};

export default CommentPost;
