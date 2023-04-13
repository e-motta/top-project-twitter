import { HeartIcon as HearIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HearIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { updateLikes } from "../../../domain/tweets/likes";
import { formatNumWithPrefix } from "../../../lib/stringFormattingUtils";
import { type User } from "../../../types";

const LikeButton = ({
  tweetId,
  userInfo,
  likedByAuthUser,
  likes,
  setLiked,
  isLoggedIn,
}: {
  tweetId: string;
  userInfo: User | null;
  likedByAuthUser: boolean;
  likes: number;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const [likesNum, setLikesNum] = useState(likes);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (userInfo !== null) setDisabled(false);
  }, [JSON.stringify(userInfo)]);

  const onLikeClick = async () => {
    if (isLoggedIn) {
      setDisabled(true);
      setLiked((l) => !l);
      setLikesNum((l) => (likedByAuthUser ? (l -= 1) : (l += 1)));

      try {
        await updateLikes(likes, userInfo, tweetId);
        setDisabled(false);
      } catch (e) {
        console.error(e);
        setLiked((l) => !l);
        setLikesNum((l) => (likedByAuthUser ? (l += 1) : (l -= 1)));
        setDisabled(false);
      }
    }
  };

  return (
    <button
      className={`flex items-center gap-1 ml-16 group ${
        isLoggedIn ? "hover:text-pink-500" : "cursor-auto"
      }`}
      type="button"
      onClick={onLikeClick}
      disabled={disabled}
      title={likesNum.toLocaleString()}
    >
      <span
        className={`rounded-full p-2 transition-all ${
          isLoggedIn ? "group-hover:bg-pink-100 group-active:bg-pink-200" : ""
        }`}
      >
        {likedByAuthUser ? (
          <HearIconSolid className="h-5 w-5 text-pink-500" />
        ) : (
          <HearIconOutline className="h-5 w-5" />
        )}
      </span>
      <span className="text-sm">{formatNumWithPrefix(likesNum, 1)}</span>
    </button>
  );
};

export default LikeButton;
