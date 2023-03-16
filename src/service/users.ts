import {
  type DocumentData,
  where,
  type QueryDocumentSnapshot,
  documentId,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  addDocToFirestore,
  getCountByQuery,
  queryDocsByFieldFromFirestore,
  queryDocsByFieldsFromFirestore,
  type QueryDocsByFirestoreLazy,
  queryDocsFromFirestoreLazy,
  getAllCollectionIdsFromFirestore,
  updateDocInFireStore,
  getAllCollectionDocsFromFirestore,
} from "../firebase/firestore";
import { type User } from "../types";

const COLLECTION_NAME = "users";

// POST

export const postUser = async (doc: User) => {
  await addDocToFirestore(COLLECTION_NAME, doc);
};

// UPDATE

export const updateUser = async (id: string, partialDoc: Partial<User>) => {
  await updateDocInFireStore(COLLECTION_NAME, partialDoc, id);
};

export const addToTweetsLikedByUser = async (
  tweetId: string,
  userId: string
) => {
  const partialDoc = {
    liked_tweets: arrayUnion(tweetId),
  };

  await updateDocInFireStore(COLLECTION_NAME, partialDoc, userId);
};

export const removeFromTweetsLikedByUser = async (
  tweetId: string,
  userId: string
) => {
  const partialDoc = {
    liked_tweets: arrayRemove(tweetId),
  };

  await updateDocInFireStore(COLLECTION_NAME, partialDoc, userId);
};

export const addToFollowedByUser = async (
  authUserId: string,
  followUserId: string
) => {
  const partialDocAuthUser = {
    following: arrayUnion(followUserId),
  };
  await updateDocInFireStore(COLLECTION_NAME, partialDocAuthUser, authUserId);

  const partialDocFollowUser = {
    followers: arrayUnion(authUserId),
  };
  await updateDocInFireStore(
    COLLECTION_NAME,
    partialDocFollowUser,
    followUserId
  );
};

export const removeFromFollowedByUser = async (
  authUserId: string,
  followUserId: string
) => {
  const partialDocAuthUser = {
    following: arrayRemove(followUserId),
  };
  await updateDocInFireStore(COLLECTION_NAME, partialDocAuthUser, authUserId);

  const partialDocFollowUser = {
    followers: arrayRemove(authUserId),
  };
  await updateDocInFireStore(
    COLLECTION_NAME,
    partialDocFollowUser,
    followUserId
  );
};

// GET

export const getUsersById = async (ids: string[] | null) => {
  const users = await queryDocsByFieldsFromFirestore<User[]>(
    COLLECTION_NAME,
    ids ?? [""],
    documentId()
  );
  return users;
};

export const getUsersByIdLazy = async (
  ids: string[] | null,
  prevLastVisible: QueryDocumentSnapshot<DocumentData> | null
) => {
  const args: QueryDocsByFirestoreLazy = {
    collectionName: COLLECTION_NAME,
    whereContraints: [where(documentId(), "in", ids?.slice(0, 10))],
    orderByField: "__name__",
    limitTo: 10,
  };

  if (prevLastVisible !== null) {
    args.startAfterDoc = prevLastVisible;
  }

  const { data, lastVisible } = await queryDocsFromFirestoreLazy<User>(args);
  return { data, lastVisible };
};

export const getUserByUsername = async (username: string | null) => {
  const users = await queryDocsByFieldFromFirestore<User>(
    COLLECTION_NAME,
    "username_lowercase",
    username?.toLowerCase() ?? "?"
  );
  return users.length === 1 ? users[0] : null;
};

export const getUserByEmail = async (email: string) => {
  const users = await queryDocsByFieldFromFirestore<User>(
    COLLECTION_NAME,
    "email",
    email
  );
  return users;
};

export const getUsersByUsernamesLazy = async (
  usernames: string[] | null,
  prevLastVisible: QueryDocumentSnapshot<DocumentData> | null
) => {
  const { data, lastVisible } = await queryDocsFromFirestoreLazy<User>({
    collectionName: COLLECTION_NAME,
    whereContraints: [where("username", "in", usernames?.slice(0, 10))],
    orderByField: "email",
    limitTo: 10,
    startAfterDoc: prevLastVisible,
  });
  return { data, lastVisible };
};

export const getFollowersCount = async (userId: string) => {
  const count = await getCountByQuery({
    collectionName: COLLECTION_NAME,
    whereConstraints: [where("following", "array-contains", userId)],
  });
  return count;
};

export const getAllUserIds = async () => {
  return await getAllCollectionIdsFromFirestore(COLLECTION_NAME);
};

export const isUsernameTaken = async (username: string) => {
  const allDocs = await getAllCollectionDocsFromFirestore<User>(
    COLLECTION_NAME
  );
  const allUsernames = allDocs.map((d: User) => {
    if (d !== null) {
      return d.username;
    } else {
      return false;
    }
  });
  return allUsernames.includes(username);
};
