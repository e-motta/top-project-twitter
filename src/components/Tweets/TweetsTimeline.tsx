import TwitterLogo from "../../assets/twitter-logo-blue.png";
import Tweet from "./Tweet";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import { type User } from "../../domain/types";
import { useTweetsbyUserIdsLazy } from "../../backend/service/hooks/tweetsHooks";
import { useUsersByIds } from "../../backend/service/hooks/usersHooks";
import NetworkError from "../../pages/NetworkError";
import TweetInput from "../../pages/Home/TweetInput";
import {
  getAuthorAvatar,
  getAuthorName,
  getAuthorUsername,
} from "../../domain/tweets/tweets";

const TweetsTimeline = ({
  userIds,
  showTweetInput,
  userInfo,
}: {
  userIds: string[] | null;
  showTweetInput?: boolean;
  userInfo?: User | null;
}) => {
  const {
    data: tweets,
    loadMore: loadMoreTweets,
    hasMore: hasMoreTweets,
    addDoc: addTweet,
    deleteDoc: deleteTweet,
    isSuccess: isTweetsSuccess,
    isError: isTweetsError,
  } = useTweetsbyUserIdsLazy(userIds ?? null);

  const {
    data: tweetsUsersInfo,
    isSuccess: isTweetsUsersInfoSuccess,
    isError: isTweetsUsersInfoError,
  } = useUsersByIds(userIds);

  if (isTweetsError || isTweetsUsersInfoError) {
    return <NetworkError />;
  }

  if (isTweetsSuccess && tweets === null) {
    const title = "No tweets to show!";
    const message = "Tweets will appear here after they've been tweeted.";
    return (
      <div className="mt-10 mx-24 flex flex-col gap-4">
        <h2 className="text-5xl font-bold">{title}</h2>
        <span className="text-gray-500 text-xl">{message}</span>
      </div>
    );
  }

  if (
    isTweetsUsersInfoSuccess &&
    isTweetsSuccess &&
    tweetsUsersInfo !== null &&
    tweets !== null
  )
    return (
      <>
        {showTweetInput !== undefined &&
          showTweetInput &&
          userInfo !== null &&
          userInfo !== undefined && (
            <TweetInput userInfo={userInfo} addTweet={addTweet} />
          )}
        <InfiniteScroll
          dataLength={tweets.length}
          next={loadMoreTweets}
          hasMore={hasMoreTweets}
          loader={
            tweets.length > 0 ? (
              <div className="relative h-12">
                <Loading />
              </div>
            ) : null
          }
          endMessage={
            <span className="flex justify-center mt-4 mb-8">
              <img
                src={TwitterLogo}
                alt="twitter logo"
                className="h-6 w-6 opacity-50"
              />
            </span>
          }
        >
          {tweets?.map((t) => (
            <Tweet
              key={t.id}
              id={t.id ?? ""}
              name={getAuthorName(tweetsUsersInfo, t)}
              username={getAuthorUsername(tweetsUsersInfo, t)}
              date={t.created_at}
              text={t.text}
              likes={t.likes}
              avatarUrl={getAuthorAvatar(tweetsUsersInfo, t)}
              deleteTweet={deleteTweet}
            />
          ))}
        </InfiniteScroll>
      </>
    );
  return <></>;
};

export default TweetsTimeline;
