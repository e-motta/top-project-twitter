import {
  addDoc,
  collection,
  doc,
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
  getCountFromServer,
  type FieldPath,
  type OrderByDirection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "./config";
import { selectConverter } from "./converters";
import { type Collection } from "../types";

export const db = getFirestore(app);

// POST

export const addDocToFirestore = async <Doc>(
  collectionName: Collection,
  docObj: Doc
) => {
  const converter = selectConverter(collectionName);
  const ref = await addDoc(
    collection(db, collectionName).withConverter(converter),
    docObj
  );
  return ref.id;
};

export const setDocToFirestore = async <Doc>(
  collectionName: Collection,
  docObj: Doc,
  id: string
) => {
  const converter = selectConverter(collectionName);
  await setDoc(doc(db, collectionName, id).withConverter(converter), docObj);
};

// UPDATE

export const updateDocInFireStore = async (
  collectionName: Collection,
  partialDocObj: Record<string, any>,
  id: string
) => {
  await updateDoc(doc(db, collectionName, id), partialDocObj);
};

// GET

export const getAllCollectionDocsFromFirestore = async (
  collectionName: Collection
) => {
  const converter = selectConverter(collectionName);
  const querySnapshot = await getDocs(
    collection(db, collectionName).withConverter(converter)
  );
  const data: string[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.id);
  });
  return data;
};

export const queryDocsByFieldFromFirestore = async <Doc>(
  collectionName: Collection,
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

export const queryDocsByFieldsFromFirestore = async <Doc>(
  collectionName: Collection,
  fields: string[],
  target: string | FieldPath
) => {
  const converter = selectConverter(collectionName);
  const q = query(
    collection(db, collectionName).withConverter(converter),
    where(target, "in", fields)
  );
  const querySnapshot = await getDocs(q);
  const data: Doc[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export interface QueryDocsByFirestoreLazy {
  collectionName: Collection;
  whereContraints: QueryFieldFilterConstraint[];
  orderByField?: string | FieldPath;
  orderByDirection?: OrderByDirection;
  limitTo?: number;
  startAfterDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

export const queryDocsFromFirestoreLazy = async <Doc>({
  collectionName,
  whereContraints,
  orderByField,
  orderByDirection,
  limitTo,
  startAfterDoc,
}: QueryDocsByFirestoreLazy) => {
  const queryArguments = [];

  orderByField !== undefined &&
    queryArguments.push(orderBy(orderByField, orderByDirection));
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

export const getCountByQuery = async ({
  collectionName,
  whereConstraints,
}: {
  collectionName: Collection;
  whereConstraints: QueryFieldFilterConstraint[];
}) => {
  const q = query(collection(db, collectionName), ...whereConstraints);
  const querySnapshot = await getCountFromServer(q);
  return querySnapshot.data().count;
};

// DELETE

export const deleteDocFromFirestore = async ({
  collectionName,
  id,
}: {
  collectionName: Collection;
  id: string;
}) => {
  await deleteDoc(doc(db, collectionName, id));
};
