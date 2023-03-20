import { Timestamp, type FirestoreDataConverter } from "firebase/firestore";
import { type Tweet, type User } from "../types";

const userDataConverter: FirestoreDataConverter<User> = {
  toFirestore: (data) => data,
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.id = snapshot.id;
    return data as User;
  },
};

const tweetDataConverter: FirestoreDataConverter<Tweet> = {
  toFirestore: (data) => {
    if (data.created_at === undefined) data.created_at = Timestamp.now();
    return data;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.created_at = data.created_at.toDate();
    data.id = snapshot.id;
    return data as Tweet;
  },
};

export const selectConverter = (collectionName: string) => {
  let converter: FirestoreDataConverter<any>;
  switch (collectionName) {
    case "users":
      converter = userDataConverter;
      break;
    case "tweets":
      converter = tweetDataConverter;
      break;
    default:
      throw TypeError("Collection name does not exist.");
  }
  return converter;
};
