import { signInAnonymously, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./auth";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const signIn = async () => {
    setIsLoading(true);
    await signInWithPopup(auth, provider)
      .then(() => {
        navigate("/");
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };

  return { signIn, isLoading, isError };
};

export const useSignInAnonymous = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const signIn = async () => {
    setIsLoading(true);
    await signInAnonymously(auth)
      .then(() => {
        navigate("/");
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };

  return { signIn, isLoading, isError };
};

export const useLogOut = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };
  return { logOut, isError };
};
