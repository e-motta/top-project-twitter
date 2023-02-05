import Avatar from "../generics/Avatar";
import AvatarImg from "../../assets/avatar_example.jpeg";
import Button from "../generics/Button";
import { useRef, useState } from "react";
import { flickerButtonRed } from "../../lib/uiUtils";

const TweetInput = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [numOfCharacters, setNumOfCharacters] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tweetButtonBgColor, setTweetButtonBgColor] = useState("bg-sky-500");

  const inputRef = useRef(null);

  const tweetLengthLimit = 280;

  const clearInput = () => {
    if (inputRef.current) (inputRef.current as HTMLElement).innerText = "";
    setShowPlaceholder(true);
  };

  return (
    <div className="flex flex-col py-2 px-4 gap-4 border-b border-neutral-100 relative">
      {loading && (
        <div className="absolute top-0 left-0 h-1 w-full bg-sky-500 animate-pulse" />
      )}
      <div className="flex gap-4">
        <Avatar size="md" url={AvatarImg} />
        <form
          id="tweet"
          action="#"
          className="flex flex-col w-full gap-4 pt-3 relative transition-all"
          onSubmit={(e) => {
            e.preventDefault();
            const tweet = (e.target as HTMLElement).innerText;
            setNumOfCharacters(tweet.length);

            if (!tweet.length || tweet.length > tweetLengthLimit) {
              flickerButtonRed(setTweetButtonBgColor, "bg-sky-500");
            } else if (tweet.length <= tweetLengthLimit) {
              console.log(tweet);
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
              setShowPlaceholder(e.currentTarget.innerText === "");
            }}
            ref={inputRef}
          />
        </form>
      </div>
      {showPlaceholder && (
        <div className="text-xl text-gray-500 absolute top-5 left-20 pointer-events-none">
          What's happening?
        </div>
      )}
      <div className="flex justify-end items-center gap-4 px-1">
        {numOfCharacters < tweetLengthLimit + 1 || (
          <span className="text-red-600">{280 - numOfCharacters}</span>
        )}
        <Button
          type="submit"
          form="tweet"
          disabled={loading}
          className={`text-white font-bold ${tweetButtonBgColor}`}
        >
          Tweet
        </Button>
      </div>
    </div>
  );
};

export default TweetInput;
