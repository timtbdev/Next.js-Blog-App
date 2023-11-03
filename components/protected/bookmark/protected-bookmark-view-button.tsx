import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProtectedBookMarkViewButtonProps {
  slug?: string;
}

const ProtectedBookMarkViewButton: FC<ProtectedBookMarkViewButtonProps> = ({
  slug,
}) => {
  return (
    <Link
      href={`/posts/${slug}`}
      target="_blank"
      className="rounded-md border bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
    >
      <EyeIcon className="h-4 w-4" />
    </Link>
  );
};

export default ProtectedBookMarkViewButton;
