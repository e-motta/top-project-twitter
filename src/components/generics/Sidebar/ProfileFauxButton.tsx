import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../service/hooks/usersHooks";
import Avatar from "../Avatar";

const ProfileFauxButton = ({ username }: { username: string | null }) => {
  const { data: userInfo } = useUserInfo(username);
  const navigate = useNavigate();

  const name = userInfo?.name ?? "";
  const profileImageUrl = userInfo?.profile_image_url;

  return (
    <div className="relative mb-4">
      <button
        type="button"
        onClick={() => {
          navigate(`/${username ?? ""}`);
        }}
      >
        <div
          className="p-3 rounded-full flex text-xl items-center 
          transition-all hover:bg-gray-200"
        >
          <Avatar
            size="md"
            url={profileImageUrl ?? ""}
            username={username ?? ""}
          />
          <span className="hidden px-4 text-[1rem] flex-col items-start justify-center md:flex">
            {/* <span className="font-bold">
              {name.slice(0, 9)}
              {name.length > 9 ? "..." : ""}
            </span> */}
            <span className="text-gray-500 text-[.8rem]">@{username}</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default ProfileFauxButton;
