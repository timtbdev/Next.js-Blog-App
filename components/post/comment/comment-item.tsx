import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format, parseISO } from "date-fns";
import { CalendarDaysIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

interface CommentItemProps {
  id: string;
  slug?: string;
  name: string;
  image?: string;
  comment: string;
  date: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  name,
  slug = "",
  image,
  comment,
  date,
}) => {
  return (
    <div className="flex flex-col my-6 text-sm bg-white ring-1 ring-black/5 shadow-sm rounded-md p-4 text-gray-500">
      <div className="flex-1 inline-flex py-2 gap-x-2">
        <Avatar>
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>
            <span className="inline-block h-full w-full overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{name}</h3>

          <p className="inline-flex items-center">
            <CalendarDaysIcon className="h-[14px] w-[14px] mr-1" />
            <span className="text-sm tex-gray-400">
              {format(parseISO(date), "yyyy-MM-dd")}
            </span>
          </p>
        </div>
      </div>
      <Separator className="mt-2 mb-4" />
      <div
        className="prose prose-sm max-w-none text-gray-500"
        dangerouslySetInnerHTML={{ __html: comment }}
      />
    </div>
  );
};

export default CommentItem;
