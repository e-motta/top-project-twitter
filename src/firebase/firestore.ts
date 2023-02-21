import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  type QueryDocumentSnapshot,
  setDoc,
  where,
  startAfter,
  type QueryFieldFilterConstraint,
  type DocumentData,
} from "firebase/firestore";
import { type ProfileInfo } from "../types";
import { app } from "./config";
import { selectConverter } from "./converters";

export const db = getFirestore(app);

export const addDocToFirestore = async (
  collectionName: string,
  docObj: ProfileInfo
) => {
  await addDoc(collection(db, collectionName), docObj);
};

export const setDocToFirestore = async (
  collectionName: string,
  docObj: any,
  id: string
) => {
  await setDoc(doc(db, collectionName, id), docObj);
};

export const getDocFromFirestore = async <Doc>(
  collectionName: string,
  id: string
) => {
  const converter = selectConverter(collectionName);
  const docSnapshot = await getDoc(
    doc(db, collectionName, id).withConverter(converter)
  );
  let data: Doc | null = null;
  let status: 200 | 404;
  if (docSnapshot.exists()) {
    data = docSnapshot.data();
    status = 200;
  } else {
    status = 404;
  }
  return { data, status };
};

export const queryDocsByFieldFromFirestore = async <Doc>(
  collectionName: string,
  field: string,
  target: string
) => {
  const converter = selectConverter(collectionName);
  const q = query(
    collection(db, collectionName).withConverter(converter),
    where(field, "==", target)
  );
  const querySnapshot = await getDocs(q);
  const data: Doc[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const queryDocsFromFirestoreLazy = async <Doc>({
  collectionName,
  whereContraints,
  orderByField,
  limitTo,
  startAfterDoc,
}: {
  collectionName: "users" | "tweets";
  whereContraints: QueryFieldFilterConstraint[];
  orderByField?: string;
  limitTo?: number;
  startAfterDoc?: QueryDocumentSnapshot<DocumentData> | null;
}) => {
  const queryArguments = [];

  orderByField !== undefined && queryArguments.push(orderBy(orderByField));
  limitTo !== undefined && queryArguments.push(limit(limitTo));
  startAfterDoc !== undefined && queryArguments.push(startAfter(startAfterDoc));

  const converter = selectConverter(collectionName);

  const q = query(
    collection(db, collectionName).withConverter(converter),
    ...whereContraints,
    ...queryArguments
  );
  const querySnapshot = await getDocs(q);

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const data: Doc[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return {
    data,
    lastVisible,
  };
};
