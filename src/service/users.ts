import {
  type DocumentData,
  where,
  type QueryDocumentSnapshot,
  documentId,
} from "firebase/firestore";
import {
  addDocToFirestore,
  getCountByQuery,
  getDocFromFirestore,
  queryDocsByFieldFromFirestore,
  queryDocsByFieldsFromFirestore,
  type QueryDocsByFirestoreLazy,
  queryDocsFromFirestoreLazy,
  setDocToFirestore,
} from "../firebase/firestore";
import { type User } from "../types";

const COLLECTION_NAME = "users";

// todo: handle errors

export const postUser = async (data: User) => {
  await addDocToFirestore(COLLECTION_NAME, data);
};

export const postUserWithId = async (data: User, id: string) => {
  await setDocToFirestore(COLLECTION_NAME, data, id);
};

export const getUserById = async (id: string) => {
  const user = await getDocFromFirestore<User>(COLLECTION_NAME, id);
  return user;
};

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
    "username",
    username ?? "?"
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
    whereConstraints: [
      where("following", "array-contains", userId.slice(0, 10)),
    ],
  });
  return count;
};
