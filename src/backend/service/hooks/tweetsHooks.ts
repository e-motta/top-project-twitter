import { getTweetsByUserIdsLazy, getTweetsCount } from "../tweets";
import { getFollowersCount } from "../users";
import { type Tweet } from "../../../types";
import {
  useFetchCountGeneric,
  useFetchFromFirestoreGenericLazy,
} from "./genericHooks";

export const useTweetsbyUserIdsLazy = (userIds: string[] | null) => {
  return useFetchFromFirestoreGenericLazy<Tweet>(
    getTweetsByUserIdsLazy,
    userIds
  );
};

export const useFollowersCount = (userId: string) => {
  return useFetchCountGeneric(getFollowersCount, userId);
};

export const useTweetsCount = (userId: string) => {
  return useFetchCountGeneric(getTweetsCount, userId);
};
