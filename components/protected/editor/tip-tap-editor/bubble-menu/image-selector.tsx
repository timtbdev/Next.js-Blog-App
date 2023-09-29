"use client";

import { cn, getUrlFromString } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Check, ImageIcon, Trash } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

interface ImageSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ImageSelector: FC<ImageSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const handleLinkSubmission = () => {
    const url = getUrlFromString(inputRef.current?.value || "");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <p className="text-base">
          <ImageIcon className="h4 w-4" />
        </p>
        <p className="text-gray-900 underline decoration-stone-400 underline-offset-4">
          Image
        </p>
      </button>
      {isOpen && (
        <div className="fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a image link"
            className="flex-1 bg-white p-1 text-sm outline-none"
            defaultValue=""
          />
          <button
            onClick={handleLinkSubmission}
            type="button"
            className="flex items-center rounded-sm p-1 text-stone-600 transition-all hover:bg-stone-100"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
