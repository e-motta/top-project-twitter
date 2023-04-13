import { updateTweetLikes } from "../../service/tweets";
import {
  addToTweetsLikedByUser,
  removeFromTweetsLikedByUser,
} from "../../service/users";
import { type User } from "../../types";

export const updateLikes = async (
  likes: number,
  userInfo: User | null,
  tweetId: string
) => {
  if (userInfo === null) throw new ReferenceError();

  let updatedLikes: number;
  if (!(userInfo?.liked_tweets.includes(tweetId) ?? false)) {
    updatedLikes = likes + 1;
    await updateTweetLikes(tweetId, updatedLikes);
    await addToTweetsLikedByUser(tweetId, userInfo.id ?? "");
  } else {
    updatedLikes = likes - 1;
    await updateTweetLikes(tweetId, updatedLikes);
    await removeFromTweetsLikedByUser(tweetId, userInfo.id ?? "");
  }
};
