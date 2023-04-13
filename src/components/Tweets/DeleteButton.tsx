import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteTweet } from "../../service/tweets";

const DeleteButton = ({
  tweetId,
  onClick,
}: {
  tweetId: string;
  onClick: (id: string) => void;
}) => {
  const [disabled, setDisabled] = useState(false);

  const onDeleteClick = async () => {
    setDisabled(true);

    try {
      await deleteTweet(tweetId);
      onClick(tweetId);
    } catch (e) {
      console.error(e);
      setDisabled(false);
    }
  };

  return (
    <button
      className="absolute top-1 right-0 p-2 rounded-full group transition-all
            hover:bg-red-100 active:bg-red-200"
      onClick={onDeleteClick}
      disabled={disabled}
    >
      <TrashIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
    </button>
  );
};

export default DeleteButton;
