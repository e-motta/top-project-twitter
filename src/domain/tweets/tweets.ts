import { type Tweet, type User } from "../types";

export const getAuthorName = (tweetsUsersInfo: User[], tweet: Tweet) => {
  return tweetsUsersInfo.find((u) => u.id === tweet.author_id)?.name ?? "";
};

export const getAuthorUsername = (tweetsUsersInfo: User[], tweet: Tweet) => {
  return tweetsUsersInfo.find((u) => u.id === tweet.author_id)?.username ?? "";
};

export const getAuthorAvatar = (tweetsUsersInfo: User[], tweet: Tweet) => {
  return (
    tweetsUsersInfo.find((u) => u.id === tweet.author_id)?.profile_image_url ??
    ""
  );
};
