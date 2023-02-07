import { Link } from "react-router-dom";

const NavButton = ({
  children,
  selected,
  notImplemented,
  to,
}: {
  children: React.ReactNode;
  selected?: boolean;
  notImplemented?: boolean;
  to: string;
}) => {
  const color = selected !== undefined ? "" : "text-gray-500";

  const onClick = () => {
    if (notImplemented !== undefined) {
      alert("Not implemented!");
    }
  };

  return (
    <>
      {notImplemented !== undefined ? (
        <a
          className={`w-full flex justify-center transition-all ${color}
        hover:bg-gray-200`}
          href="#"
          onClick={onClick}
        >
          <div className="pt-3 px-4 flex flex-col gap-3">
            <span className={`font-bold text-sm`}>{children}</span>
            {selected !== undefined && (
              <div className="h-1 rounded-full bg-sky-500 self-stretch" />
            )}
          </div>
        </a>
      ) : (
        <Link
          to={to}
          className={`w-full flex justify-center transition-all ${color}
          hover:bg-gray-200`}
          onClick={onClick}
        >
          <div className="pt-3 px-4 flex flex-col gap-3">
            <span className={`font-bold text-sm`}>{children}</span>
            {selected !== undefined && (
              <div className="h-1 rounded-full bg-sky-500 self-stretch" />
            )}
          </div>
        </Link>
      )}
    </>
  );
};

export default NavButton;
