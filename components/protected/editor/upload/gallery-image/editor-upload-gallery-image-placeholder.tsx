import { PhotoIcon } from "@heroicons/react/20/solid";
import React from "react";

const EditorUploadGalleryImagePlaceholder = () => {
  return (
    <div className="flex flex-row items-center border-b border-dashed border-gray-200">
      <div className="my-3 items-center">
        <PhotoIcon className="h-8 w-8 rounded-md text-gray-100" />
      </div>
      <div className="ml-4 items-center">
        <div className="h-4 w-[300px] rounded-md bg-gray-100 sm:w-[400px]"></div>
      </div>
    </div>
  );
};

export default EditorUploadGalleryImagePlaceholder;
