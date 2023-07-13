"use client";
import React, {
  Fragment,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import ShareSolid from "@/components/icons/share-solid";
import ShareOutline from "@/components/icons/share-outline";
import { Dialog, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, XCircle } from "lucide-react";
import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import LinkedIn from "@/components/icons/linkedin";
import Email from "@/components/icons/email";
import CopyIcon from "@/components/icons/copy";
import CheckIcon from "@/components/icons/check";

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
    <li>
      <button type="button" title="Copy url to clipboard" onClick={copy}>
        {copied ? (
          <CheckIcon className="h-8 w-8" />
        ) : (
          <CopyIcon className="h-8 w-8" />
        )}
      </button>
    </li>
  );
};

const ShareButton: React.FC<ShareButtonProps> = ({
  title = "",
  text = "",
  url = window.location.href,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const shareData = useMemo(
    () => ({
      title: title,
      text: text,
      url: url || (typeof window !== "undefined" && window.location.href) || "",
    }),
    [title, text, url]
  );

  const handleOnClick = useCallback(async () => {
    if (window.navigator.share) {
      try {
        await window.navigator.share(shareData);
      } catch (e) {
        console.warn(e);
      }
    } else {
      setIsOpen(true);
    }
  }, [shareData]);

  // const onClick = async () => {
  //   if (window.navigator.share) {
  //     try {
  //       await window.navigator.share({
  //         title: title,
  //         text: text,
  //         url: url,
  //       });
  //     } catch (e) {
  //       console.warn(e);
  //     }
  //   } else {
  //     setIsOpen(true);
  //   }
  // };

  return (
    <>
      <button
        type="button"
        onClick={handleOnClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative inline-flex items-center gap-x-1.5 px-3 py-2 border-[1.5px] border-gray-300 focus:z-10 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 shadow-md shadow-black/5 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%]"
      >
        {isHovering ? (
          <ShareSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
        ) : (
          <ShareOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
        )}
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-base-900/80" />
          </Transition.Child>
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-10 overflow-y-auto"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
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
                  <Dialog.Panel className="relative w-full font-sans max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-base-700">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-base-900 dark:text-base-50"
                    >
                      Хуваалцах
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-base-700 dark:text-base-300">
                      {title}
                    </Dialog.Description>

                    <ul className="mt-6 flex justify-around gap-2 text-base-500 dark:text-base-400">
                      <a
                        title={title}
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                          title
                        )}`}
                        rel="noopener noreferrer"
                        className="text-gray-400"
                      >
                        <Twitter className="h-8 w-8" />
                      </a>
                      <a
                        title={title}
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        rel="noopener noreferrer"
                        className="text-gray-400"
                      >
                        <Facebook className="h-8 w-8 text-blue-600" />
                      </a>
                      <a
                        title={title}
                        target="_blank"
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                        rel="noopener noreferrer"
                        className="text-gray-400"
                      >
                        <LinkedIn className="h-8 w-8" />
                      </a>
                      <a
                        title={title}
                        target="_blank"
                        href={`mailto:?subject=${encodeURIComponent(
                          title
                        )}&body=${encodeURIComponent(text + "\n\n")}${url}`}
                        rel="noopener noreferrer"
                        className="text-gray-400"
                      >
                        <Email className="h-8 w-8" />
                      </a>

                      <CopyButton url={url} />
                    </ul>
                    <button
                      className="group absolute top-4 right-4"
                      aria-label="Close"
                      onClick={() => setIsOpen(false)}
                    >
                      <XCircle className="text-gray-400 hover:text-gray-600" />
                    </button>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </motion.div>
            <motion.div
              key="desktop-backdrop"
              className="fixed inset-0 bg-gray-100 bg-opacity-10 backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          </AnimatePresence>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShareButton;
