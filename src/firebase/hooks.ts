import {
  signInAnonymously,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./auth";

const isUserRegistered = (user) => {
  // query firebase for userInfo
  const userInfo = {
    handle: "eduardom0tta",
    name: "Eduardo",
    email: "edumrs90@gmail.com",
    avatar: "",
    bgImage: "",
    followers: ["elonmusk", "billgates"],
    following: ["elonmusk"],
    tweets: ["id1", "id2"],
  };
};

export const useSignIn = () => {
  const navigate = useNavigate();
  return async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log({ user });
        navigate("/");
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };
};

export const useSignInAnonymous = () => {
  const navigate = useNavigate();
  return async () => {
    await signInAnonymously(auth)
      .then((result) => {
        console.log({ result });
        navigate("/");
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };
};

export const useLogOut = () => {
  const navigate = useNavigate();
  return async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };
};
