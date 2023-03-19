import Button from "../buttons/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ImageCropper from "./ImageCropper/ImageCropper";
import { useState } from "react";

const EditMedia = ({
  file,
  setFile,
  type,
  userId,
  updateImage,
}: {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  type: "background" | "profile";
  userId: string;
  updateImage: (newUrl: string, type: "profile" | "background") => void;
}) => {
  const [apply, setApply] = useState(false);

  const closeModal = () => {
    setFile(null);
    setApply(false);
  };

  return (
    <>
      <div
        id="modal-background"
        className="-translate-x-[5000px] min-h-screen w-[10000px] 
      min absolute top-0 left-0 bg-black opacity-70 z-40 cursor-auto"
        aria-hidden
        role="button"
        onClick={closeModal}
      />
      <div
        className="absolute top-0 left-0 bg-white z-50 rounded-xl py-3 
      flex flex-col gap-3 mt-10"
      >
        <div className="flex justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-full p-2 hover:bg-gray-200"
              onClick={closeModal}
              disabled={apply}
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <span className="font-bold text-xl">Edit media</span>
          </div>
          <Button
            className="bg-black text-white font-bold"
            onClick={() => {
              setApply(true);
            }}
            disabled={apply}
          >
            Apply
          </Button>
        </div>
        <div className="h-[550px] overflow-auto flex flex-col justify-center bg-sky-50 px-3">
          <ImageCropper
            file={file}
            apply={apply}
            type={type}
            closeModal={closeModal}
            userId={userId}
            updateImage={updateImage}
          />
        </div>
      </div>
    </>
  );
};

export default EditMedia;
