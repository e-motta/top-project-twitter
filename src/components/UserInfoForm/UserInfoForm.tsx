import { CameraIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useAuthUserUsername, useUserInfo } from "../../firebase/hooks";
import Button from "../buttons/Button";
import Input from "../Settings/Input";
import Avatar from "../generics/Avatar";
import Loading from "../generics/Loading";
import NetworkError from "../generics/NetworkError";
import NotFound from "../generics/NotFound";
import useForm from "./useForm";

const UserInfoForm = ({ redirectTo }: { redirectTo?: string }) => {
  const form = useForm(redirectTo);

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
      form.setNewName(userInfo.name);
      if (userInfo.username !== null) form.setNewUsername(userInfo.username);
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
      <>
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
            form.onSubmitForm(e);
          }}
        >
          <div className="flex flex-col gap-5 relative">
            <Input
              value={form.newName}
              setValue={(e) => {
                form.setNewNameMessage("");
                form.setNewName(e);
              }}
              label="Name"
              validationMessage={form.newNameMessage}
            />
            <Input
              value={form.newUsername}
              setValue={(e) => {
                form.setNewUsernameMessage("");
                form.setNewUsername(e);
              }}
              label="Username"
              validationMessage={form.newUsernameMessage}
            />
            {form.submitLoading && <Loading />}
          </div>
          <div className="flex justify-start">
            <div onClick={form.onClickDisabledButton}>
              <Button
                className="text-white bg-black font-bold disabled:pointer-events-none"
                type="submit"
                form="edit-profile"
                disabled={
                  form.newName.length === 0 || form.newUsername.length === 0
                }
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </>
    );

  return null;
};

export default UserInfoForm;
