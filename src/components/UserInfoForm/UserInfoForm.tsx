import { CameraIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserUsername, useUserInfo } from "../../firebase/hooks";
import Button from "../buttons/Button";
import Input from "../Settings/Input";
import Avatar from "../generics/Avatar";
import Loading from "../generics/Loading";
import NetworkError from "../generics/NetworkError";
import NotFound from "../generics/NotFound";
import { validateName, validateUsername } from "./helpers";

const UserInfoForm = ({ redirectTo }: { redirectTo?: string }) => {
  const [newName, setNewName] = useState("");
  const [newNameMessage, setNewNameMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameMessage, setNewUsernameMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  // todo: convert to custom hook - start
  const navigate = useNavigate();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const { valid: isNewNameValid, message: newNameStatusMessage } =
      validateName(newName);
    const { valid: isNewUsernameValid, message: newUsernameStatusMessage } =
      validateUsername(newUsername);

    if (newNameStatusMessage !== "") setNewNameMessage(newNameStatusMessage);
    if (newUsernameStatusMessage !== "")
      setNewUsernameMessage(newUsernameStatusMessage);

    if (isNewNameValid && isNewUsernameValid) {
      setTimeout(() => {
        setSubmitLoading(false);
      }, 1000);

      // todo: call redirect conditionally only when inputs are valid and response is ok
      if (redirectTo !== undefined) navigate(redirectTo);
    }

    setSubmitLoading(false);
  };

  // todo: convert to custom hook - end
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
            submitForm(e);
          }}
        >
          <div className="flex flex-col gap-5 relative">
            <Input
              value={newName}
              setValue={(e) => {
                setNewNameMessage("");
                setNewName(e);
              }}
              label="Name"
              validationMessage={newNameMessage}
            />
            <Input
              value={newUsername}
              setValue={(e) => {
                setNewUsernameMessage("");
                setNewUsername(e);
              }}
              label="Username"
              validationMessage={newUsernameMessage}
            />
            {submitLoading && <Loading />}
          </div>

          <div>
            <Button
              className="text-white bg-black font-bold"
              type="submit"
              form="edit-profile"
              disabled={newName.length === 0 || newUsername.length === 0}
              // onClick={submitForm}
            >
              Save
            </Button>
          </div>
        </form>
      </>
    );

  return null;
};

export default UserInfoForm;
