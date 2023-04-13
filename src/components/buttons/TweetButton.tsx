import Button from "./Button";

const TweetButton = ({
  loading,
  inputText,
  tweetLengthLimit,
}: {
  loading: boolean;
  inputText: string;
  tweetLengthLimit: number;
}) => {
  return (
    <Button
      type="submit"
      form="tweet"
      disabled={
        loading || inputText.length === 0 || inputText.length > tweetLengthLimit
      }
      className="text-white font-bold bg-sky-500"
    >
      Tweet
    </Button>
  );
};

export default TweetButton;
