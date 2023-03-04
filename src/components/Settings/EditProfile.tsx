import { CameraIcon } from "@heroicons/react/24/outline";
import Avatar from "../generics/Avatar";
import Button from "../generics/Button";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Input from "./Input";
import Loading from "../generics/Loading";
import { useUserInfo, useAuthUserUsername } from "../../firebase/hooks";
import NotFound from "../generics/NotFound";
import NetworkError from "../generics/NetworkError";

const EditProfile = () => {
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    username,
    isLoading: isUsernameLoading,
    isError: isUsernameError,
  } = useAuthUserUsername();

  const {
    data: userInfo,
    isSuccess: isUserInfoSuccess,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useUserInfo(username);

  useEffect(() => {
    if (userInfo !== null) {
      setNewName(userInfo.name);
      if (userInfo.username !== null) setNewUsername(userInfo.username);
    }
  }, [userInfo]);

  if (isUsernameLoading || isUserInfoLoading) {
    return <Loading />;
  }

  if (isUserInfoSuccess && userInfo === null) {
    return <NotFound />;
  }

  if (isUsernameError || isUserInfoError) {
    return <NetworkError />;
  }

  if (isUserInfoSuccess && userInfo !== null)
    return (
      <div>
        <Header
          mainText={userInfo.name}
          subText={`@${userInfo.username ?? ""}`}
          showBackBtn
        />

        <div
          id="bg-img"
          className="max-h-48 aspect-[25/8] bg-gray-300 relative mb-24"
        >
          {userInfo.background_image_url !== null && (
            <img src={userInfo.background_image_url} alt="background image" />
          )}
          <button
            type="button"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            p-3 rounded-full bg-gray-800 bg-opacity-50 transition-all
            hover:bg-opacity-40"
          >
            <CameraIcon className="h-6 w-6 text-white" />
          </button>
          <div
            className="absolute bottom-0 left-0 translate-y-1/2 p-1 bg-white
          rounded-full ml-4"
          >
            <div>
              <Avatar
                size="lg"
                url={userInfo.profile_image_url}
                username={userInfo.username ?? ""}
                disabled
              />
              <button
                type="button"
                className="absolute top-1/2 left-1/2 -translate-x-1/2
                -translate-y-1/2 p-3 rounded-full bg-gray-900 bg-opacity-50
                transition-all hover:bg-gray-800"
              >
                <CameraIcon className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        <form
          id="edit-profile"
          action="#"
          className="flex flex-col gap-5 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e); // todo: handle submit
          }}
        >
          <div className="flex flex-col gap-5 relative">
            <Input value={newName} setValue={setNewName} label="Name" />
            <Input
              value={newUsername}
              setValue={setNewUsername}
              label="Username"
            />
            {submitLoading && <Loading />}
          </div>

          <div>
            <Button
              className="text-white bg-black font-bold"
              type="submit"
              form="edit-profile"
              disabled={newName.length === 0 || newUsername.length === 0}
              onClick={() => {
                setSubmitLoading(true);
                setTimeout(() => {
                  setSubmitLoading(false);
                }, 1000);
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    );

  return null;
};

export default EditProfile;
