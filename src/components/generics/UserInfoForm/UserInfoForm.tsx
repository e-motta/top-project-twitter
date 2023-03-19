import { CameraIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAuthUserUsernameAndEmail } from "../../../service/hooks/useAuthUserUsername";
import { useUserInfo } from "../../../service/hooks/usersHooks";
import NetworkError from "../../pages/NetworkError";
import NotFound from "../../pages/NotFound";
import Input from "./Input";
import Avatar from "../Avatar";
import Button from "../buttons/Button";
import Loading from "../Loading";
import useForm from "./useForm";
import EditMedia from "./EditMedia";

const UserInfoForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageType, setImageType] = useState<"background" | "profile" | null>(
    null
  );
  const [showImages, setShowImages] = useState(false);

  const form = useForm();

  const {
    username,
    isLoading: isUsernameLoading,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsernameAndEmail();

  const {
    data: userInfo,
    updateImage,
    isSuccess: isUserInfoSuccess,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useUserInfo(username);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) setImageFile(e.target.files[0]);
    if (e.target.id === "profile-image-input") {
      setImageType("profile");
    } else {
      setImageType("background");
    }
  };

  useEffect(() => {
    if (userInfo !== null) {
      form.setNewName(userInfo.name);
      if (userInfo.username !== null) form.setNewUsername(userInfo.username);
    }
  }, [userInfo]);

  useEffect(() => {
    isUsernameSuccess && username === null
      ? setShowImages(false)
      : setShowImages(true);
  }, [username, isUsernameSuccess]);

  if (isUsernameLoading || isUserInfoLoading) {
    return <Loading />;
  }

  if (isUserInfoSuccess && userInfo === null) {
    return <NotFound />;
  }

  if (isUsernameError || isUserInfoError) {
    return <NetworkError />;
  }

  if (isUsernameSuccess)
    return (
      <>
        {showImages && (
          <div
            id="bg-img"
            className={`max-h-48 aspect-[25/8] relative mb-24 ${
              userInfo?.background_image_url === null ? "bg-gray-300" : ""
            }`}
          >
            {userInfo === null ||
              (userInfo.background_image_url !== null && (
                <img
                  src={userInfo.background_image_url}
                  alt="background image"
                />
              ))}

            <input
              onChange={onUploadImage}
              id="background-image-input"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
            />
            <label
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            p-3 rounded-full bg-gray-900 bg-opacity-50 transition-all cursor-pointer
            hover:bg-opacity-80"
              htmlFor="background-image-input"
            >
              <CameraIcon className="h-6 w-6 text-white" />
            </label>

            <div
              className="absolute bottom-0 left-0 translate-y-1/2 p-1 bg-white
          rounded-full ml-4"
            >
              <div>
                {userInfo !== null ? (
                  <Avatar
                    size="lg"
                    url={userInfo.profile_image_url}
                    username={userInfo.username ?? ""}
                    disabled
                  />
                ) : (
                  <Avatar size="lg" url={""} username={""} disabled />
                )}

                <input
                  id="profile-image-input"
                  type="file"
                  className="hidden"
                  onChange={onUploadImage}
                  accept="image/png, image/jpeg"
                />
                <label
                  htmlFor="profile-image-input"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 cursor-pointer
                -translate-y-1/2 p-3 rounded-full bg-gray-900 bg-opacity-50
                transition-all hover:bg-opacity-80"
                >
                  <CameraIcon className="h-6 w-6 text-white" />
                </label>
              </div>
            </div>
          </div>
        )}

        <form
          id="edit-profile"
          action="#"
          className="flex flex-col gap-5 p-4"
          onSubmit={async (e) => {
            await form.onSubmitForm(e);
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
          <div className="flex justify-start items-center gap-4">
            <div onClick={form.onClickDisabledButton}>
              <Button
                className="text-white bg-black font-bold disabled:pointer-events-none"
                type="submit"
                form="edit-profile"
                disabled={form.disableSubmitButton}
              >
                Save
              </Button>
            </div>
            {form.isSubmitError && (
              <span className="text-red-500">{form.submitErrorMessage}</span>
            )}
          </div>
        </form>
        {imageFile !== null && imageType !== null && (
          <EditMedia
            file={imageFile}
            setFile={setImageFile}
            type={imageType}
            userId={userInfo?.id ?? ""}
            updateImage={updateImage}
          />
        )}
      </>
    );

  return null;
};

export default UserInfoForm;
