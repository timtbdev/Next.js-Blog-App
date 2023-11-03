"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginIcon } from "@/icons";
import { useState } from "react";
import { default as LoginSection } from "./login-section";

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex sm:ml-4 sm:mt-0">
          <button type="button">
            <LoginIcon className="h-10 w-10" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="font-sans sm:max-w-[425px]">
        <LoginSection setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
