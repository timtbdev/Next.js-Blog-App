import { Separator } from "@/components/ui/separator";
import { FC } from "react";

interface FormTitleProps {
  title: string;
  description: string;
}

const PostTitle: FC<FormTitleProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <span className="text-sm text-gray-500">{description}</span>
      <Separator />
    </div>
  );
};

export default PostTitle;
