import { ChangeEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import ImageModal from "./image-modal";
import content from "@/content/(main)/add-exercise/content-add-exercise-form";

export default function InputImage({
  initialImageUrl = null,
  label,
  description,
}: {
  initialImageUrl?: string | null;
  label: string;
  description?: string;
}) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [fileInputValue, setFileInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleUserUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    setFileInputValue(e.target.value);
    if (!e.target.files) {
      setImageUrl(null);
      return;
    }
    const newImageUrl = URL.createObjectURL(e.target.files[0]);
    setImageUrl(newImageUrl);
  };

  const showInputElement = !imageUrl;

  return (
    <div className="min-h-36">
      <div className="mb-5">
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor={label}
        >
          {label}
        </label>
        <div className={showInputElement ? "" : "hidden"}>
          <input
            name={label}
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id={label}
            type="file"
            onChange={handleUserUploadImage}
            accept="image/*"
            value={fileInputValue}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            {description}
          </div>
        </div>
      </div>
      {imageUrl && (
        <div>
          <ImageModal show={showModal} closeModal={() => setShowModal(false)}>
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              width={500}
              height={500}
              onLoad={() => URL.revokeObjectURL(imageUrl)}
              className="mb-5"
            />
          </ImageModal>
          <div className="mb-5 text-sm text-gray-900 dark:text-gray-400">
            {`Uploaded image: ${fileInputValue.replace("C:\\fakepath\\", "")}`}
          </div>
          <button
            className="mb-5 mr-5 cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-1 text-base text-gray-900 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            type="button"
            onClick={() => setShowModal(true)}
          >
            {content.showImageButton}
          </button>
          <button
            className="mb-5 mr-5 cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-1 text-base text-gray-900 hover:bg-red-300 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            onClick={() => {
              setFileInputValue("");
              setImageUrl(null);
            }}
          >
            Delete image
          </button>
        </div>
      )}
    </div>
  );
}
