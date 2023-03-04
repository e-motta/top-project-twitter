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
  getCountFromServer,
  type FieldPath,
  type OrderByDirection,
} from "firebase/firestore";
import { app } from "./config";
import { selectConverter } from "./converters";
import { type Collection } from "../types";

export const db = getFirestore(app);

export const addDocToFirestore = async <Doc>(
  collectionName: Collection,
  docObj: Doc
) => {
  const converter = selectConverter(collectionName);
  await addDoc(collection(db, collectionName).withConverter(converter), docObj);
};

export const setDocToFirestore = async <Doc>(
  collectionName: Collection,
  docObj: Doc,
  id: string
) => {
  const converter = selectConverter(collectionName);
  await setDoc(doc(db, collectionName, id).withConverter(converter), docObj);
};

export const getDocFromFirestore = async <Doc>(
  collectionName: Collection,
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
  console.log({
    collectionName,
    whereContraints,
    orderByField,
    orderByDirection,
    limitTo,
    startAfterDoc,
  });
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
