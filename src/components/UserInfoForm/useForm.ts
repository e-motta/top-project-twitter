import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateName, validateUsername } from "./helpers";

const useForm = (redirectTo?: string) => {
  const [newName, setNewName] = useState("");
  const [newNameMessage, setNewNameMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameMessage, setNewUsernameMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
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

  const onClickDisabledButton = () => {
    if (newName === "") {
      setNewNameMessage("Please enter a name");
    }
    if (newUsername === "") {
      setNewUsernameMessage("Please enter a username");
    }
  };

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
  };
};

export default useForm;
