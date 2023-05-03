/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Link } from "react-router-dom";
import { defaultAvatar, sizes } from "../domain/users/avatar";

const Avatar = ({
  size,
  url,
  username,
  disabled,
}: {
  size: "md" | "lg";
  url: string | null;
  username: string;
  disabled?: boolean;
}) => {
  const disabledClass = disabled !== undefined ? "pointer-events-none" : "";

  return (
    <Link to={`/${username}`} className={disabledClass}>
      <div
        className={`min-w-[48px] w-12 transition-all hover:opacity-90 ${sizes[size]}`}
      >
        <img src={url || defaultAvatar} alt="avatar" className="rounded-full" />
      </div>
    </Link>
  );
};

export default Avatar;
