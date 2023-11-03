"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mainNewsLetterConfig } from "@/config/main";
import { emailSchema } from "@/lib/validation/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 as SpinnerIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const MainNewsletter = () => {
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
      return toast.error(mainNewsLetterConfig.error);
    }

    setIsLoading(false);
    toast.success(mainNewsLetterConfig.success);
    form.reset();

    return true;
  }
  return (
    <div className="mt-10 xl:mt-0">
      <h3 className="text-sm font-semibold leading-6 text-gray-900">
        {mainNewsLetterConfig.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">
        {mainNewsLetterConfig.description}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 sm:flex sm:max-w-md"
        >
          <label htmlFor="email-address" className="sr-only">
            {mainNewsLetterConfig.email}
          </label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                    placeholder={mainNewsLetterConfig.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
            <button
              disabled={isLoading}
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-gray-600 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 px-3 py-2 text-sm text-gray-500 shadow-md shadow-sm shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gray-500 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 active:scale-[96%] active:ring-black/20"
            >
              {isLoading && (
                <SpinnerIcon className="mr-2 h-6 w-6 animate-spin" />
              )}
              {mainNewsLetterConfig.subscribe}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MainNewsletter;
