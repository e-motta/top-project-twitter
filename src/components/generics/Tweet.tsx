import Avatar from "./Avatar";
import { HeartIcon as HearIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HearIconSolid } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { formatDate, formatNum } from "../../lib/formatUtils";

const Tweet = ({
  name,
  handle,
  date,
  text,
  likes,
  avatarUrl,
}: {
  name: string;
  handle: string;
  date: Date;
  text: string;
  likes: number;
  avatarUrl: string;
}) => {
  return (
    <div
      role="button"
      className="flex flex-col border-b border-slate-100 transition-all pr-2
      hover:bg-gray-50"
    >
      <div className="flex gap-2">
        <div className="ml-4 mt-3">
          <Avatar size="md" url={avatarUrl} />
        </div>
        <div className="pt-3 flex flex-col text-[0.95rem]">
          <div id="tweet-header" className="flex gap-2">
            <span className="font-bold hover:underline">{name}</span>
            <span className="text-gray-500 flex gap-1">
              <span>@{handle}</span>·
              <span className="hover:underline">{formatDate(date)}</span>
            </span>
          </div>
          <div id="tweet-body">{text}</div>
        </div>
      </div>
      <div id="tweet-footer" className="flex items-center gap-3 text-gray-500">
        <button
          className="flex items-center gap-1 ml-16 group hover:text-pink-500"
          type="button"
        >
          <span className="rounded-full p-2 transition-all group-hover:bg-pink-100">
            <HearIconOutline className="h-5 w-5" />
          </span>
          <span className="text-sm">{formatNum(likes, 1)}</span>
        </button>
      </div>
    </div>
  );
};

export default Tweet;
