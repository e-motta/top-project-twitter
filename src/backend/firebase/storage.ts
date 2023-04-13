import {
  ref,
  getDownloadURL,
  uploadBytes,
  getStorage,
  uploadString,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { app } from "./config";

export const storage = getStorage(app);

export const uploadToStorage = async (file: File | Blob, folder: string) => {
  const snapshot = await uploadBytes(
    ref(storage, `${folder}/${uuidv4()}${file.name}`),
    file
  );
  return await getDownloadURL(snapshot.ref);
};

export const uploadStringToStorage = async (
  file: string,
  name: string,
  folder: string
) => {
  const snapshot = await uploadString(
    ref(storage, `${folder}/${uuidv4()}${name}`),
    file,
    "data_url"
  );
  return await getDownloadURL(snapshot.ref);
};
