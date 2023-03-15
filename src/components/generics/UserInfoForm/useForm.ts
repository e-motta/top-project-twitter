import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserUsernameAndEmail } from "../../../service/hooks/useAuthUserUsername";
import { useUserInfo } from "../../../service/hooks/usersHooks";
import { isUsernameTaken, postUser, updateUser } from "../../../service/users";
import { type User } from "../../../types";
import { validateName, validateUsername } from "./helpers";

const useForm = () => {
  const [newName, setNewName] = useState("");
  const [newNameMessage, setNewNameMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameMessage, setNewUsernameMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [method, setMethod] = useState<"post" | "update" | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null
  );
  const [isSubmitError, setIsSubmitError] = useState(false);

  const {
    username,
    setUsername,
    email,
    isLoading: isUsernameLoading,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsernameAndEmail();

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useUserInfo(username);

  useEffect(() => {
    (isUsernameError || isUserInfoError) ?? setIsSubmitError(true);
  }, [isUsernameError, isUserInfoError]);

  useEffect(() => {
    isUsernameSuccess && username === null
      ? setMethod("post")
      : setMethod("update");
  }, [username, isUsernameSuccess]);

  const navigate = useNavigate();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
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
      try {
        if (newUsername === username && newName === userInfo?.name) {
          setSubmitLoading(false);
        } else if (
          (await isUsernameTaken(newUsername)) &&
          newUsername !== username
        ) {
          setNewUsernameMessage("This Username is already taken.");
          setSubmitLoading(false);
        } else {
          if (email === null) throw new TypeError("Missing field: email");
          if (method === "post") {
            const newUser: User = {
              name: newName,
              username: newUsername,
              email,
              profile_image_url: null,
              background_image_url: null,
              following: [],
              followers: [],
              liked_tweets: [],
            };
            await postUser(newUser);
            setUsername(newUsername);
            navigate("/");
          } else {
            const partialUser: Partial<User> = {
              name: newName,
              username: newUsername,
            };
            await updateUser(userInfo?.id ?? "", partialUser);
            setUsername(newUsername);
            navigate(`/${newUsername}`);
          }
        }
      } catch (e) {
        console.error(e);
        setSubmitErrorMessage(
          "Something unexpected happened. Please try again later."
        );
        setIsSubmitError(true);
        setSubmitLoading(false);
      }
    }
    setSubmitLoading(false);
  };

  const onClickDisabledButton = () => {
    if (newName === "") {
      setNewNameMessage("Please enter a name");
    }
    if (newUsername === "") {
      setNewUsernameMessage("Please enter a username");
    }
  };

  const disableSubmitButton =
    isUsernameLoading ||
    isUserInfoLoading ||
    newName.length === 0 ||
    newUsername.length === 0 ||
    submitLoading;

  return {
    onSubmitForm,
    onClickDisabledButton,
    newName,
    newNameMessage,
    newUsername,
    newUsernameMessage,
    submitLoading,
    setNewName,
    setNewNameMessage,
    setNewUsername,
    setNewUsernameMessage,
    disableSubmitButton,
    submitErrorMessage,
    isSubmitError,
  };
};

export default useForm;
