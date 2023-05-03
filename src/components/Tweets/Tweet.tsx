import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { useAuthUserUsernameAndEmail } from "../../backend/service/hooks/useAuthUserUsername";
import { useUserInfo } from "../../backend/service/hooks/usersHooks";
import {
  timeString,
  formatDatePretty,
  yearString,
} from "../../lib/stringFormattingUtils";

const Tweet = ({
  id,
  name,
  username,
  date,
  text,
  likes,
  avatarUrl,
  deleteTweet,
}: {
  id: string;
  name: string;
  username: string;
  date: Date | undefined;
  text: string;
  likes: number;
  avatarUrl: string | null;
  deleteTweet: (id: string) => void;
}) => {
  const { username: authUsername } = useAuthUserUsernameAndEmail();
  const { data: userInfo } = useUserInfo(authUsername);

  const isLoggedIn = authUsername !== null;

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (userInfo !== null) setLiked(userInfo.liked_tweets.includes(id));
  }, [JSON.stringify(userInfo?.liked_tweets), id]);

  return (
    <div
      className="flex flex-col border-b border-slate-100 transition-all pr-2
      hover:bg-gray-50"
    >
      <div className="flex gap-2 relative">
        <div className="ml-4 mt-3">
          <Avatar size="md" url={avatarUrl} username={username} />
        </div>
        <Link
          to={`/${username}`}
          className="pt-3 flex flex-col text-[0.95rem] whitespace-normal"
        >
          <div id="tweet-header" className="flex gap-2">
            <span className="font-bold hover:underline">{name}</span>
            <span className="text-gray-500 flex gap-1">
              <span>@{username}</span>·
              <span
                className="hover:underline"
                title={`${timeString(date)} · ${yearString(date)}`}
              >
                {formatDatePretty(date ?? new Date())}
              </span>
            </span>
          </div>
          <div id="tweet-body" style={{ wordBreak: "break-word" }}>
            {text}
          </div>
        </Link>
        {authUsername === username && (
          <DeleteButton tweetId={id} onClick={deleteTweet} />
        )}
      </div>
      <div id="tweet-footer" className="flex items-center gap-3 text-gray-500">
        <LikeButton
          tweetId={id}
          userInfo={userInfo}
          likedByAuthUser={liked}
          likes={likes}
          setLiked={setLiked}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
};

export default Tweet;
