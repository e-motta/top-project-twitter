import { type FirestoreDataConverter } from "firebase/firestore";
import { type Tweet, type ProfileInfo } from "../types";

export const profileDataConverter: FirestoreDataConverter<ProfileInfo> = {
  toFirestore: (data) => data,
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.handle = snapshot.id;
    return data as ProfileInfo;
  },
};

export const tweetDataConverter: FirestoreDataConverter<Tweet> = {
  toFirestore: (data) => data,
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.date = data.date.toDate();
    data.id = snapshot.id;
    return data as Tweet;
  },
};
