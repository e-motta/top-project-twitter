import { useState } from "react";
import { addToFollowedByUser } from "../../../service/users";
import Button from "./Button";

const FollowButton = ({
  authUserId,
  followUserId,
  addToFollowing,
  removeFromFollowing,
}: {
  authUserId: string;
  followUserId: string;
  addToFollowing: (id: string) => void;
  removeFromFollowing: (id: string) => void;
}) => {
  const [disabled, setDisabled] = useState(false);

  const onButtonClick = async () => {
    setDisabled(true);
    addToFollowing(followUserId);
    try {
      await addToFollowedByUser(authUserId, followUserId);
      setDisabled(false);
    } catch (e) {
      console.error(e);
      removeFromFollowing(followUserId);
      setDisabled(false);
    }
  };

  return (
    <Button
      className="text-white bg-black font-bold hover:bg-gray-800"
      onClick={onButtonClick}
      disabled={disabled}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
