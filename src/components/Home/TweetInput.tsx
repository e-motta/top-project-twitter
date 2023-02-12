import Avatar from "../generics/Avatar";
import Button from "../generics/Button";
import { useRef, useState } from "react";
import { type ProfileInfo } from "../../types";
import { type DocWithNotFound } from "../../firebase/firestore";

const TweetInput = ({
  profileInfo,
}: {
  profileInfo: DocWithNotFound<ProfileInfo>;
}) => {
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
        <div className="absolute top-0 left-0 h-1 w-full bg-sky-500 animate-pulse" />
      )}
      <div className="flex gap-4">
        <Avatar
          size="md"
          url={profileInfo?.avatar ?? ""}
          handle={profileInfo?.handle ?? ""}
        />
        <form
          id="tweet"
          action="#"
          className="flex flex-col w-full gap-4 pt-3 relative transition-all"
          onSubmit={(e) => {
            e.preventDefault();
            if (inputText.length <= TWEET_LENGTH_LIMIT) {
              console.log(inputText);
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
        <Button
          type="submit"
          form="tweet"
          disabled={
            loading ||
            inputText.length === 0 ||
            inputText.length > TWEET_LENGTH_LIMIT
          }
          className="text-white font-bold bg-sky-500"
        >
          Tweet
        </Button>
      </div>
    </div>
  );
};

export default TweetInput;
