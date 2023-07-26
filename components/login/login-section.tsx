"use client";

import Facebook from "@/components/icons/facebook";
import Github from "@/components/icons/github";
import Google from "@/components/icons/google";
import LoadingDots from "@/components/icons/loading-dots";
import Send from "@/components/icons/send";
import BlurImage from "@/components/shared/blur-image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginConfig } from "@/config/login";
import { placeholderBlurhash } from "@/lib/utils";
import { supabase } from "@/utils/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const FormSchema = z.object({
  email: z
    .string({
      required_error: loginConfig.emailRequiredError,
    })
    .email(),
});

const LoginSection = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [signInGoogleClicked, setSignInGoogleClicked] =
    React.useState<boolean>(false);
  const [signInFacebookClicked, setSignInFacebookClicked] =
    React.useState<boolean>(false);
  const [signInGithubClicked, setSignInGithubClicked] =
    React.useState<boolean>(false);
  const [signInEmailClicked, setSignInEmailClicked] =
    React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  async function signInWithGoogle() {
    setSignInGoogleClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    revalidatePath("/");
  }

  async function signInWithGitHub() {
    setSignInGithubClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    revalidatePath("/");
  }

  async function signInWithFacebook() {
    setSignInFacebookClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    revalidatePath("/");
  }

  async function signInWithEmail(formData: z.infer<typeof FormSchema>) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: formData.email,
      options: {
        emailRedirectTo: "https://ub.cafe/auth/callback",
      },
    });
    if (error) {
      console.error(error);
    } else {
      toast.success(loginConfig.emailSent);
      revalidatePath("/");
    }
  }

  return (
    <div className="mx-auto w-full justify-center rounded-md border border-black/5 bg-gray-50 align-middle shadow-md">
      <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center">
        <a href="https://ub.cafe">
          <BlurImage
            src="/images/logo.png"
            alt="Logo"
            className="h-16 w-16 rounded-full"
            width={64}
            height={64}
            priority
            placeholder="blur"
            blurDataURL={placeholderBlurhash}
          />
        </a>
        <h3 className="font-display text-2xl font-bold">{loginConfig.title}</h3>
      </div>

      {/* Sign in buttons with Social accounts */}
      <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
        <button
          disabled={signInGoogleClicked}
          className={`${
            signInGoogleClicked
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border border-gray-200 bg-white text-black hover:bg-gray-50"
          } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
          onClick={() => signInWithGoogle()}
        >
          {signInGoogleClicked ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              <Google className="h-5 w-5" />
              <p>{loginConfig.google}</p>
            </>
          )}
        </button>
        <button
          disabled={signInFacebookClicked}
          className={`${
            signInFacebookClicked
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border border-gray-200 bg-white text-black hover:bg-gray-50"
          } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
          onClick={() => signInWithFacebook()}
        >
          {signInFacebookClicked ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              <Facebook className="h-5 w-5 text-blue-600" />
              <p>{loginConfig.facebook}</p>
            </>
          )}
        </button>
        <button
          disabled={signInGithubClicked}
          className={`${
            signInGithubClicked
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border border-gray-200 bg-white text-black hover:bg-gray-50"
          } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
          onClick={() => signInWithGitHub()}
        >
          {signInGithubClicked ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              <Github className="h-5 w-5" />
              <p>{loginConfig.github}</p>
            </>
          )}
        </button>
      </div>

      {/* Seperation line */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm uppercase">
          <span className="bg-gray-50 px-2">{loginConfig.or}</span>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signInWithEmail)}
          className="grid-cols grid space-y-3 px-4 py-6 pt-8 text-center md:px-16"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{loginConfig.email}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    {...field}
                    className="text-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={signInEmailClicked}
            className={`${
              signInEmailClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
          >
            {signInEmailClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Send className="h-5 w-5" />
                <p>{loginConfig.sendButton}</p>
              </>
            )}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default LoginSection;
