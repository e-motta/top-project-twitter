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
  updateDocInFireStore,
  deleteDocFromFirestore,
  addDocToFirestore,
} from "../firebase/firestore";
import { type Tweet } from "../../domain/types";

const COLLECTION_NAME = "tweets";

// POST

export const postTweet = async (tweetObj: Tweet) => {
  const id = await addDocToFirestore(COLLECTION_NAME, tweetObj);
  return id;
};

// UPDATE

export const updateTweetLikes = async (
  tweetId: string,
  updatedLikes: number
) => {
  const partialDoc = {
    likes: updatedLikes,
  };

  await updateDocInFireStore(COLLECTION_NAME, partialDoc, tweetId);
};

// GET

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

// DELETE

export const deleteTweet = async (tweetId: string) => {
  await deleteDocFromFirestore({
    collectionName: COLLECTION_NAME,
    id: tweetId,
  });
};
