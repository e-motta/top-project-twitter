import Button from "./Button";

const FollowingButton = () => {
  return (
    <Button
      className="font-bold w-24 hover:text-red-600
      hover:bg-red-100 hover:border-red-200"
      hoverText="Unfollow"
      outlined
    >
      Following
    </Button>
  );
};

export default FollowingButton;
