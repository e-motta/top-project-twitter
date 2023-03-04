import TwitterLogo from "../../assets/twitter-logo-blue.png";
import Tweet from "./Tweet";
import { useTweetsbyUserIdsLazy, useUsersByIds } from "../../firebase/hooks";
import Loading from "../generics/Loading";
import NetworkError from "../generics/NetworkError";
import InfiniteScroll from "react-infinite-scroll-component";

const TweetsTimeline = ({ userIds }: { userIds: string[] | null }) => {
  const {
    data: tweets,
    loadMore: loadMoreTweets,
    hasMore: hasMoreTweets,
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

  if (
    isTweetsUsersInfoSuccess &&
    isTweetsSuccess &&
    tweetsUsersInfo !== null &&
    tweets !== null
  )
    return (
      <>
        {
          <InfiniteScroll
            dataLength={tweets.length}
            next={loadMoreTweets}
            hasMore={hasMoreTweets}
            loader={
              <div className="relative h-12">
                <Loading />
              </div>
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
                name={
                  tweetsUsersInfo.find((u) => u.id === t.author_id)?.name ?? ""
                }
                username={
                  tweetsUsersInfo.find((u) => u.id === t.author_id)?.username ??
                  ""
                }
                date={t.created_at}
                text={t.text}
                likes={t.likes}
                avatarUrl={
                  tweetsUsersInfo.find((u) => u.id === t.author_id)
                    ?.profile_image_url ?? ""
                }
              />
            ))}
          </InfiniteScroll>
        }
      </>
    );
  return <></>;
};

export default TweetsTimeline;
