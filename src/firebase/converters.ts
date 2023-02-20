import { type FirestoreDataConverter } from "firebase/firestore";
import { type Tweet, type ProfileInfo } from "../types";

const profileDataConverter: FirestoreDataConverter<ProfileInfo> = {
  toFirestore: (data) => data,
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.handle = snapshot.id;
    return data as ProfileInfo;
  },
};

const tweetDataConverter: FirestoreDataConverter<Tweet> = {
  toFirestore: (data) => data,
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.date = data.date.toDate();
    data.id = snapshot.id;
    return data as Tweet;
  },
};

export const selectConverter = (collectionName: string) => {
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
  return converter;
};
