import {
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  queryDocsByFieldFromFirestore,
  type QueryDocsByFirestoreLazy,
  queryDocsFromFirestoreLazy,
  getCountByQuery,
} from "../firebase/firestore";
import { type Tweet } from "../types";

const COLLECTION_NAME = "tweets";

export const postTweet = () => {};

export const getTweetsByUserId = async (userId: string) => {
  const tweets = await queryDocsByFieldFromFirestore<Tweet>(
    COLLECTION_NAME,
    "author_id",
    userId
  );
  return tweets;
};

export const getTweetsByUserIdsLazy = async (
  userIds: string[] | null,
  prevLastVisible: QueryDocumentSnapshot<DocumentData> | null
) => {
  const args: QueryDocsByFirestoreLazy = {
    collectionName: COLLECTION_NAME,
    whereContraints: [where("author_id", "in", userIds?.slice(0, 10))],
    orderByField: "created_at",
    orderByDirection: "desc",
    limitTo: 10,
  };

  if (prevLastVisible !== null) {
    args.startAfterDoc = prevLastVisible;
  }

  const { data, lastVisible } = await queryDocsFromFirestoreLazy<Tweet>(args);
  return { data, lastVisible };
};

export const getTweetsCount = async (userId: string) => {
  const count = await getCountByQuery({
    collectionName: COLLECTION_NAME,
    whereConstraints: [where("author_id", "==", userId)],
  });
  return count;
};
