import { FC } from "react";
import { v4 } from "uuid";
import EditorUploadGalleryImageItem from "./editor-upload-gallery-image-item";
import EditorUploadGalleryImageTableEmpty from "./editor-upload-gallery-image-table-empty";

interface EditorUploadGalleryImageTableProps {
  userId: string;
  postId: string;
  fileNames: string[];
  imageUrls: string[];
}

const EditorUploadGalleryImageTable: FC<EditorUploadGalleryImageTableProps> = ({
  userId,
  postId,
  fileNames,
  imageUrls,
}) => {
  return (
    <div className="inline-block max-w-2xl rounded-lg border border-gray-200 p-5 align-middle">
      <div className="min-w-full divide-y divide-gray-300">
        <div className="space-y-5 bg-white">
          {imageUrls.map((url, idx) => (
            <EditorUploadGalleryImageItem
              key={v4()}
              userId={userId}
              postId={postId}
              fileName={fileNames[idx]}
              imageUrl={url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorUploadGalleryImageTable;
