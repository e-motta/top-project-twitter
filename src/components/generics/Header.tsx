import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Header = ({
  mainText,
  subText,
  showBackBtn,
}: {
  mainText: string;
  subText?: string;
  showBackBtn?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div id="header" className="flex items-center gap-4 px-2 pb-1 min-h-[52px]">
      {showBackBtn && (
        <button
          type="button"
          className="rounded-full p-2 hover:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      )}
      <div className="pl-2 flex flex-col">
        <div className="font-bold text-xl">{mainText}</div>
        {subText && <div className="text-sm text-gray-500">{subText}</div>}
      </div>
    </div>
  );
};

export default Header;
