import { useNavigate } from "react-router-dom";

const ProfileFauxButton = ({ username }: { username: string | null }) => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-4 -translate-x-3 md:translate-x-0">
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
          <span className="hidden px-4 text-[1rem] flex-col items-start justify-center md:flex">
            <span className="text-gray-500 text-[.8rem]">@{username}</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default ProfileFauxButton;
