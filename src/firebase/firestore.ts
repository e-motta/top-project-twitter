import {
  addDoc,
  collection,
  doc,
  type DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
  setDoc,
  where,
  startAfter,
  type QueryFieldFilterConstraint,
  type CollectionReference,
  type QueryOrderByConstraint,
  type QueryLimitConstraint,
  type QueryStartAtConstraint,
  type FirestoreDataConverter,
} from "firebase/firestore";
import { type ProfileInfo } from "../types";
import { app } from "./config";
import { profileDataConverter, tweetDataConverter } from "./converters";
import {
  type ProfileLazy,
  type DocWithIdAndDate,
  type DocWithNotFound,
} from "./firestoreTypes";

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
): Promise<DocWithNotFound<Doc>> => {
  const docSnapshot = await getDoc(doc(db, collectionName, id));
  let data;
  if (docSnapshot.exists()) {
    data = docSnapshot.data();
  } else {
    data = { notFound: true };
  }
  return data as DocWithNotFound<Doc>;
};

export const queryDocsByFieldFromFirestore = async <Doc>(
  collectionName: string,
  field: string,
  target: string
): Promise<Array<DocWithIdAndDate<Doc>>> => {
  const q = query(collection(db, collectionName), where(field, "==", target));
  const querySnapshot = await getDocs(q);
  const data: Doc[] = [];
  querySnapshot.forEach((doc) => {
    let date = new Date();
    if ("date" in doc.data()) {
      date = doc.data().date.toDate();
    }
    const docWithId = {
      ...doc.data(),
      id: doc.id,
      date,
    };
    data.push(docWithId as DocWithIdAndDate<Doc>);
  });
  return data as Array<DocWithIdAndDate<Doc>>;
};

export const queryDocsByFieldFromFirestoreLazy = async <Doc>({
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
  startAfterDoc?: QueryDocumentSnapshot<Doc> | null;
}) => {
  const queryArguments = [];

  orderByField !== undefined && queryArguments.push(orderBy(orderByField));
  limitTo !== undefined && queryArguments.push(limit(limitTo));
  startAfterDoc !== undefined && queryArguments.push(startAfter(startAfterDoc));

  let converter: FirestoreDataConverter<any>;
  switch (collectionName) {
    case "users":
      converter = profileDataConverter;
      break;
    case "tweets":
      converter = tweetDataConverter;
      break;
    default:
      throw TypeError("Collection name does not exist.");
  }

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
