import React, { useState, useRef, useEffect } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { uploadToStorage } from "../../../../firebase/storage";
import { type User } from "../../../../types";
import { updateUser } from "../../../../service/users";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageCropper = ({
  file,
  apply,
  type,
  closeModal,
  userId,
  updateImage,
}: {
  file: File;
  apply: boolean;
  type: "background" | "profile";
  closeModal: () => void;
  userId: string;
  updateImage: (newUrl: string, type: "profile" | "background") => void;
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const aspect = type === "profile" ? 1 : 25 / 8;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    setImgSrc(reader.result?.toString() ?? "");
  });
  reader.readAsDataURL(file);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width !== undefined &&
        completedCrop?.height !== undefined &&
        imgRef.current != null &&
        previewCanvasRef.current != null
      ) {
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0
        );
      }
    },
    100,
    [completedCrop]
  );

  useEffect(() => {
    if (apply) {
      if (previewCanvasRef.current == null) {
        throw new Error("Crop canvas does not exist");
      }

      previewCanvasRef.current.toBlob((blob) => {
        if (blob !== null) {
          const upload = async () => {
            const url = await uploadToStorage(blob, `${type}-images`);

            let partialDoc: Partial<User>;

            if (type === "profile") {
              partialDoc = {
                profile_image_url: url,
              };
            } else {
              partialDoc = {
                background_image_url: url,
              };
            }

            await updateUser(userId, partialDoc);

            updateImage(url, type);

            closeModal();
          };
          void upload();
        }
      }, "image/jpeg");
    }
  }, [apply]);

  return (
    <div>
      <canvas
        ref={previewCanvasRef}
        style={{
          border: "1px solid black",
          objectFit: "contain",
        }}
        className="hidden"
      />
      {Boolean(imgSrc) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => {
            setCrop(percentCrop);
          }}
          onComplete={(c) => {
            setCompletedCrop(c);
          }}
          aspect={aspect}
        >
          <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
        </ReactCrop>
      )}
    </div>
  );
};

export default ImageCropper;
