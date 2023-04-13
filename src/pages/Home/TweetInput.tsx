import { useRef, useState } from "react";
import { type Tweet, type User } from "../../types";
import TweetButton from "../../components/buttons/TweetButton";
import { postTweet } from "../../backend/service/tweets";
import Avatar from "../../components/Avatar";

const TweetInput = ({
  userInfo,
  addTweet,
}: {
  userInfo: User;
  addTweet: (docObj: Tweet) => void;
}) => {
  const TWEET_LENGTH_LIMIT = 280;

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef(null);

  const clearInput = () => {
    if (inputRef.current !== null)
      (inputRef.current as HTMLElement).innerText = "";
    setInputText("");
  };

  const onTweetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.length <= TWEET_LENGTH_LIMIT) {
      setLoading(true);
      try {
        if (userInfo.id === undefined) throw new TypeError();

        const tweetObj: Tweet = {
          author_id: userInfo.id,
          created_at: new Date(),
          likes: 0,
          text: inputText,
        };

        const tweetId = await postTweet(tweetObj);

        tweetObj.id = tweetId;
        addTweet(tweetObj);

        setLoading(false);
        clearInput();
      } catch (e) {
        console.error(e);
        setErrorMessage("An error ocurred. Please try again later.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col py-2 px-4 gap-4 border-b border-neutral-100 relative">
      {loading && (
        <div className="absolute top-[2px] left-[150px] h-1 w-1/2 -translate-x-1/2 bg-sky-500 animate-ping" />
      )}
      <div className="flex gap-4">
        <Avatar
          size="md"
          url={userInfo?.profile_image_url ?? ""}
          username={userInfo?.username ?? ""}
        />
        <form
          id="tweet"
          action="#"
          className="flex flex-col w-full gap-4 pt-3 relative transition-all"
          onSubmit={onTweetSubmit}
        >
          <div
            className="text-xl outline-none resize-none overflow-hidden break-words w-full"
            role="textbox"
            contentEditable
            onInput={(e) => {
              setInputText(e.currentTarget.innerText);
            }}
            ref={inputRef}
          />
        </form>
      </div>
      {inputText.length === 0 && (
        <div className="text-xl text-gray-500 absolute top-5 left-20 pointer-events-none">
          {"What's happening?"}
        </div>
      )}
      <div className="flex justify-end items-center gap-4 px-1">
        {errorMessage.length > 0 && (
          <span className="text-red-600">{errorMessage}</span>
        )}
        {inputText.length < TWEET_LENGTH_LIMIT + 1 || (
          <span className="text-red-600">{280 - inputText.length}</span>
        )}
        {inputText.length < TWEET_LENGTH_LIMIT + 1 && inputText.length > 0 && (
          <span className="text-sky-600">{280 - inputText.length}</span>
        )}
        <TweetButton
          loading={loading}
          inputText={inputText}
          tweetLengthLimit={TWEET_LENGTH_LIMIT}
        />
      </div>
    </div>
  );
};

export default TweetInput;
