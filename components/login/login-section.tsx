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
import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function signInWithGoogle() {
    setSignInGoogleClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    //router.push("/");
    router.refresh();
  }

  async function signInWithGitHub() {
    setSignInGithubClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    //router.push("/");
    router.refresh();
  }

  async function signInWithFacebook() {
    setSignInFacebookClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    //router.push("/");
    router.refresh();
  }

  async function signInWithEmail(formData: z.infer<typeof FormSchema>) {
    setSignInEmailClicked(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email: formData.email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error(error);
      setSignInEmailClicked(false);
      toast.error(loginConfig.error);
    } else {
      openModal();
      setSignInEmailClicked(false);
      //router.push("/");
      router.refresh();
    }
  }

  return (
    <>
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
          <h3 className="font-display text-2xl font-bold">
            {loginConfig.title}
          </h3>
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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {loginConfig.email}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {loginConfig.emailSent}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {loginConfig.close}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginSection;
