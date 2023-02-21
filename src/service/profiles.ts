import {
  type DocumentData,
  where,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  addDocToFirestore,
  getDocFromFirestore,
  queryDocsByFieldFromFirestore,
  queryDocsFromFirestoreLazy,
  setDocToFirestore,
} from "../firebase/firestore";
import { type ProfileInfo } from "../types";

const COLLECTION_NAME = "users";

// todo: handle errors

export const post = async (data: ProfileInfo) => {
  await addDocToFirestore(COLLECTION_NAME, data);
};

export const postProfileWithId = async (data: ProfileInfo, id: string) => {
  await setDocToFirestore(COLLECTION_NAME, data, id);
};

export const getProfile = async (id: string) => {
  const profile = await getDocFromFirestore<ProfileInfo>(COLLECTION_NAME, id);
  return profile;
};

export const getProfileByEmail = async (email: string) => {
  const profiles = await queryDocsByFieldFromFirestore<ProfileInfo>(
    COLLECTION_NAME,
    "email",
    email
  );
  return profiles;
};

export const getProfilesByHandlesLazy = async (
  handles: string[],
  prevLastVisible: QueryDocumentSnapshot<DocumentData> | null
) => {
  const { data, lastVisible } = await queryDocsFromFirestoreLazy<ProfileInfo>({
    collectionName: COLLECTION_NAME,
    whereContraints: [where("handle", "in", handles)],
    orderByField: "email",
    limitTo: 10,
    startAfterDoc: prevLastVisible,
  });
  return { data, lastVisible };
};
