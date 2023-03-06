import { Link } from "react-router-dom";

const NavButton = ({
  children,
  id,
  selected,
  notImplemented,
  to,
  onClick,
}: {
  children: React.ReactNode;
  id?: "for-you" | "following";
  selected?: boolean;
  notImplemented?: boolean;
  to?: string;
  onClick?: React.Dispatch<React.SetStateAction<"following" | "for-you">>;
}) => {
  const color = selected === undefined || !selected ? "text-gray-500" : "";

  const onButtonClick = () => {
    if (notImplemented === true) {
      alert("Not implemented!");
    }
    if (selected !== undefined && onClick !== undefined)
      onClick(id ?? "following");
  };

  return (
    <>
      {to === undefined ? (
        <a
          className={`w-full flex justify-center transition-all ${color}
        hover:bg-gray-200`}
          href="#"
          onClick={onButtonClick}
        >
          <div className="pt-3 px-4 flex flex-col gap-3">
            <span className={`font-bold text-sm`}>{children}</span>
            {(selected ?? false) && (
              <div className="h-1 rounded-full bg-sky-500 self-stretch" />
            )}
          </div>
        </a>
      ) : (
        <Link
          to={to}
          className={`w-full flex justify-center transition-all ${color}
          hover:bg-gray-200`}
          onClick={onButtonClick}
        >
          <div className="pt-3 px-4 flex flex-col gap-3">
            <span className={`font-bold text-sm mx-[2px]`}>{children}</span>
            {(selected ?? false) && (
              <div className="h-1 rounded-full bg-sky-500 self-stretch" />
            )}
          </div>
        </Link>
      )}
    </>
  );
};

export default NavButton;
