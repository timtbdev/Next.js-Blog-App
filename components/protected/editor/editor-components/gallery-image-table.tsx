import { FC } from "react";
import { v4 } from "uuid";
import GalleryImageItem from "./gallery-image-item";
import GalleryImageTableEmpty from "./gallery-image-table-empty";

interface GalleryImageTableProps {
  userId: string;
  postId: string;
  fileNames: string[];
  imageUrls: string[];
}

const GalleryImageTable: FC<GalleryImageTableProps> = ({
  userId,
  postId,
  fileNames,
  imageUrls,
}) => {
  return (
    <div className="inline-block max-w-2xl rounded-lg border border-gray-200 p-5 align-middle">
      <div className="min-w-full divide-y divide-gray-300">
        <div className="space-y-5 bg-white">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <GalleryImageItem
                key={v4()}
                userId={userId}
                postId={postId}
                fileName={fileNames[idx]}
                imageUrl={url}
              />
            ))
          ) : (
            <GalleryImageTableEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryImageTable;
