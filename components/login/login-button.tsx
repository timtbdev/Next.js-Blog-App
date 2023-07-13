"use client";

import Facebook from "@/components/icons/facebook";
import Google from "@/components/icons/google";
import Github from "@/components/icons/github";
import LoadingDots from "@/components/icons/loading-dots";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/utils/supabase-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoginIcon from "@/components/icons/login";
import BlurImage from "@/components/shared/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import { loginData } from "@/config/login";

const LoginButton = () => {
  const [signInGoogleClicked, setSignInGoogleClicked] =
    React.useState<boolean>(false);
  const [signInFacebookClicked, setSignInFacebookClicked] =
    React.useState<boolean>(false);
  const [signInGithubClicked, setSignInGithubClicked] =
    React.useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  async function signInWithGoogle() {
    setSignInGoogleClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
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
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex sm:ml-4 sm:mt-0">
          <button type="button">
            <LoginIcon className="h-10 w-10" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-sans">
        <DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
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
              {loginData.title}
            </h3>
            <p className="text-sm text-gray-500">{loginData.description}</p>
          </div>
        </DialogHeader>

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
                <p>{loginData.google}</p>
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
                <p>{loginData.facebook}</p>
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
                <p>{loginData.github}</p>
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
