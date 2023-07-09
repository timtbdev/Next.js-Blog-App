"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircleIcon,
  MailIcon,
  Loader2 as SpinnerIcon,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { form as siteForm } from "@/config/site";

const emailSchema = z.object({
  email: z.string().email({ message: "Имэйл хаяг оруулна уу." }),
});

const SiteForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof emailSchema>) {
    setIsLoading(true);

    const response = await fetch("/api/subscribe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    if (!response?.ok) {
      setIsLoading(false);
      return toast.error("Алдаа гарлаа!");
    }

    setIsLoading(false);
    toast.success("Амжилттай");
    form.reset();

    return true;
  }

  return (
    <div className="mx-auto max-w-3xl mt-10 flex-col justify-center">
      <div className="relative mx-auto p-5 items-center justify-center rounded-xl border border-dashed border-slate-500/50 sm:flex-row">
        <div className="text-normal absolute left-2.5 top-0 -translate-y-1/2 bg-white px-2 font-normal text-slate-500">
          <div className="inline-flex">
            <MailIcon className="h-6 w-6 mr-2 text-gray-400" />
            <span className="text-gray-400 tracking-tight [word-spacing:-5px] text-md">
              {siteForm.title}
            </span>
          </div>
        </div>
        <div className="flex-row py-2 justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="sm:flex sm:max-w-md lg:mt-0 justify-center mx-auto"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Имэйл хаяг"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="flex w-full items-center justify-center bg-gray-600 px-3 py-2 text-sm rounded-lg bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-500 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
                >
                  {isLoading && (
                    <SpinnerIcon className="mr-2 h-6 w-6 animate-spin" />
                  )}
                  {siteForm.button}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="text-xs px-2 text-gray-400 inline-flex w-full mx-auto justify-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {siteForm.warning}
        </div>
      </div>
    </div>
  );
};

export default SiteForm;
