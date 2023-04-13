/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Link } from "react-router-dom";

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
  const sizes = {
    md: "min-w-[48px] w-12",
    lg: "min-w-[48px] sm:w-32",
  };

  const disabledClass = disabled !== undefined ? "pointer-events-none" : "";

  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/twitter-9036d.appspot.com/o/avatars%2Fdefault-avatar.png?alt=media&token=2729ef8b-be7b-4fd5-91f1-27e34f86bbce";

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
