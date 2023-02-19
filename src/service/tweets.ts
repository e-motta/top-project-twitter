import {
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  queryDocsByFieldFromFirestore,
  queryDocsByFieldFromFirestoreLazy,
} from "../firebase/firestore";
import { type Tweet } from "../types";

const COLLECTION_NAME = "tweets";

export const getTweetsByHandle = async (handle: string) => {
  const tweets = await queryDocsByFieldFromFirestore<Tweet>(
    COLLECTION_NAME,
    "handle",
    handle
  );
  return tweets;
};

export const getTweetsByHandlesLazy = async (
  handles: string[],
  prevLastVisible: QueryDocumentSnapshot<DocumentData>
) => {
  const { data, lastVisible } = await queryDocsByFieldFromFirestoreLazy({
    collectionName: COLLECTION_NAME,
    whereContraints: [where("handle", "in", handles)],
    orderByField: "date",
    limitTo: 10,
    startAfterDoc: prevLastVisible,
  });
  return { data, lastVisible };
};
