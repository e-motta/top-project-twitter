import Avatar from "../../generics/Avatar";
import { useRef, useState } from "react";
import { type User } from "../../../types";
import TweetButton from "../../generics/buttons/TweetButton";

const TweetInput = ({ userInfo }: { userInfo: User }) => {
  const TWEET_LENGTH_LIMIT = 280;

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const clearInput = () => {
    if (inputRef.current !== null)
      (inputRef.current as HTMLElement).innerText = "";
    setInputText("");
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
          onSubmit={(e) => {
            e.preventDefault();
            if (inputText.length <= TWEET_LENGTH_LIMIT) {
              setLoading(true);
              setTimeout(() => {
                // todo: remove setTimeout
                setLoading(false);
                clearInput();
              }, 4000);
              // clearInput();
            }
          }}
        >
          <div
            className="text-xl outline-0 resize-none overflow-hidden break-words w-full"
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