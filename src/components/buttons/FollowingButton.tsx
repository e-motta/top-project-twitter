import { useState } from "react";
import { removeFromFollowedByUser } from "../../service/users";
import Button from "./Button";

const FollowingButton = ({
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
    removeFromFollowing(followUserId);
    try {
      await removeFromFollowedByUser(authUserId, followUserId);
      setDisabled(false);
    } catch (e) {
      console.error(e);
      addToFollowing(followUserId);
      setDisabled(false);
    }
  };

  return (
    <Button
      className="font-bold w-24 hover:text-red-600
      hover:bg-red-100 hover:border-red-200"
      hoverText="Unfollow"
      outlined
      onClick={onButtonClick}
      disabled={disabled}
    >
      Following
    </Button>
  );
};

export default FollowingButton;
