import { type PixelCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";

let previewUrl = "";

async function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return await new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const canvas = document.createElement("canvas");
  await canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);

  if (blob == null) {
    console.error("Failed to create blob");
    return "";
  }

  if (previewUrl.length > 0) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = URL.createObjectURL(blob);
  return previewUrl;
}
