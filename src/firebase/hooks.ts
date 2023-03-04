import { signInAnonymously, signInWithPopup, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTweetsByUserId,
  getTweetsByUserIdsLazy,
  getTweetsCount,
} from "../service/tweets";
import {
  getUserByEmail,
  getUsersByUsernamesLazy,
  getUserByUsername,
  getFollowersCount,
  getUsersById,
} from "../service/users";
import { type Tweet, type User } from "../types";
import { auth, provider } from "./auth";
import { AuthContext } from "./AuthContext";
import {
  useFetchCountGeneric,
  useFetchFromFirestoreGeneric,
  useFetchFromFirestoreGenericLazy,
} from "./genericHooks";

// Auth

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

// User

export const useAuthUserUsername = () => {
  const authUser = useContext(AuthContext);

  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  let email: string;
  if (authUser !== null) email = authUser.email ?? "anonymousUser";

  useEffect(() => {
    const getUsername = async () => {
      setIsLoading(true);
      try {
        const usersWithEmail = await getUserByEmail(email ?? "");
        if (usersWithEmail.length > 0) {
          setIsSuccess(true);
          setUsername(usersWithEmail[0].username);
        }
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
    };
    void getUsername();
  }, [authUser]);

  return { username, isLoading, isSuccess, isError };
};

export const useUserInfo = (username: string | null) => {
  return useFetchFromFirestoreGeneric<User>(getUserByUsername, username);
};

export const useUsersByUsernamesLazy = (usernames: string[] | null) => {
  return useFetchFromFirestoreGenericLazy<User>(
    getUsersByUsernamesLazy,
    usernames
  );
};

export const useUsersByIds = (ids: string[] | null) => {
  return useFetchFromFirestoreGeneric<User[]>(getUsersById, ids);
};

// Tweets

export const useTweetsByUserId = (userId: string) => {
  // delete? (still in use, check uses)
  return useFetchFromFirestoreGeneric<Tweet[]>(getTweetsByUserId, userId);
};

export const useTweetsbyUserIdsLazy = (userIds: string[] | null) => {
  const { data, loadMore, hasMore, isLoading, isSuccess, isError, error } =
    useFetchFromFirestoreGenericLazy<Tweet>(getTweetsByUserIdsLazy, userIds);
  useEffect(() => {
    loadMore();
  }, []);
  return { data, loadMore, hasMore, isLoading, isSuccess, isError, error };
};

export const useFollowersCount = (userId: string) => {
  return useFetchCountGeneric(getFollowersCount, userId);
};

export const useTweetsCount = (userId: string) => {
  return useFetchCountGeneric(getTweetsCount, userId);
};
