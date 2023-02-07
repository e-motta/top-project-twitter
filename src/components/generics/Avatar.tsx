import { Link } from "react-router-dom";

const Avatar = ({
  size,
  url,
  disabled,
}: {
  size: "md" | "lg";
  url: string;
  disabled?: boolean;
}) => {
  const sizes = {
    md: "min-w-[48px] w-12",
    lg: "min-w-[48px] sm:w-32",
  };

  const disabledClass = disabled !== undefined ? "pointer-events-none" : "";

  return (
    <Link to="/profile" className={disabledClass}>
      <div
        className={`min-w-[48px] w-12 transition-all hover:opacity-90 ${sizes[size]}`}
      >
        <img src={url} alt="avatar" className="rounded-full" />
      </div>
    </Link>
  );
};

export default Avatar;
