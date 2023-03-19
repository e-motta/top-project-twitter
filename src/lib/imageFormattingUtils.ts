const cropAndResizeImage = (
  imageFile: File,
  aspectRatio: number,
  width: number
) => {
  const imageUrl = URL.createObjectURL(imageFile);
  console.log({ imageUrl });

  const image = new Image();
  image.src = imageUrl;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // if (image.width > image.height) {
  //   canvas.width = image.height / aspectRatio;
  // }
  // if (image.width < image.height) {
  //   canvas.height = image.width / aspectRatio;
  // }

  // if (ctx !== null) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // const aspect = image.width / image.height;

  // canvas.width = width;
  // canvas.height = width / aspect;

  canvas.width = 1196;
  canvas.height = 382.72;

  if (ctx !== null) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // return canvas.toDataURL();
  return imageUrl;
};

export const editBackgroundImage = (imageFile: File) => {
  return cropAndResizeImage(imageFile, 25 / 8, 1196);
};

export const editProfileImage = (imageFile: File) => {
  return cropAndResizeImage(imageFile, 1, 256);
};
