"use client";

import CheckIcon from "@/components/icons/check";
import CopyIcon from "@/components/icons/copy";
import Email from "@/components/icons/email";
import Facebook from "@/components/icons/facebook";
import LinkedIn from "@/components/icons/linkedin";
import ShareOutline from "@/components/icons/share-outline";
import ShareSolid from "@/components/icons/share-solid";
import Twitter from "@/components/icons/twitter";
import { buttonConfig } from "@/config/buttons";
import React, { Fragment, useEffect, useState } from "react";
import { Drawer } from "vaul";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

const CopyButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const copy = () => {
    setCopied(true);
    window.navigator.clipboard.writeText(url);
  };

  return (
    <button type="button" title="Copy url to clipboard" onClick={copy}>
      {copied ? (
        <CheckIcon className="h-8 w-8 text-gray-500" />
      ) : (
        <CopyIcon className="h-8 w-8 text-gray-500" />
      )}
    </button>
  );
};

const ShareButton: React.FC<ShareButtonProps> = ({
  title = "",
  text = "",
  url = window.location.href,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <button
            type="button"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
          >
            {isHovering ? (
              <ShareSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
            ) : (
              <ShareOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
            )}
            <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
              {buttonConfig.share}
            </span>
          </button>
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
            <div className="flex-1 rounded-t-[10px] bg-white p-4">
              <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
              <div className="mx-auto max-w-md">
                <Drawer.Title className="mx-auto mb-4 text-center font-sans text-lg font-semibold text-gray-600">
                  {buttonConfig.share}
                </Drawer.Title>
                <div className="mx-auto my-6 grid grid-cols-3 justify-center gap-8">
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                        title,
                      )}`}
                      rel="noopener noreferrer"
                      className="text-gray-400"
                    >
                      <Twitter className="h-8 w-8 text-gray-500" />
                    </a>
                  </div>
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                      rel="noopener noreferrer"
                      className="text-gray-400"
                    >
                      <Facebook className="h-8 w-8 text-gray-500" />
                    </a>
                  </div>
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                      rel="noopener noreferrer"
                      className="text-gray-400"
                    >
                      <LinkedIn className="h-8 w-8 text-gray-500" />
                    </a>
                  </div>

                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`mailto:?subject=${encodeURIComponent(
                        title,
                      )}&body=${encodeURIComponent(text + "\n\n")}${url}`}
                      rel="noopener noreferrer"
                      className="text-gray-400"
                    >
                      <Email className="h-8 w-8 text-gray-500" />
                    </a>
                  </div>

                  <div className="mx-auto flex ">
                    <CopyButton url={url} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto border-t border-gray-200 bg-gray-100 p-4"></div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default ShareButton;
