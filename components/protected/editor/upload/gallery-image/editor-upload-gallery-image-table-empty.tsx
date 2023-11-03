import EditorUploadGalleryImagePlaceholder from "./editor-upload-gallery-image-placeholder";

const EditorUploadGalleryImageTableEmpty = () => {
  return (
    <div className="col-span-full max-w-2xl">
      <div className="mt-2 flex flex-col justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <EditorUploadGalleryImagePlaceholder />
        <EditorUploadGalleryImagePlaceholder />
        <EditorUploadGalleryImagePlaceholder />
      </div>
    </div>
  );
};

export default EditorUploadGalleryImageTableEmpty;
