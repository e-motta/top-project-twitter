import { useEffect, useState } from "react";
import {
  getUsersByUsernamesLazy,
  getUserByUsername,
  getUsersById,
  getUsersByIdLazy,
  getAllUserIds,
} from "../users";
import { type User } from "../../types";
import {
  useFetchFromFirestoreGeneric,
  useFetchFromFirestoreGenericLazy,
} from "./genericHooks";

export const useUserInfo = (username: string | null) => {
  const { data, setData, isLoading, isSuccess, isError, error } =
    useFetchFromFirestoreGeneric<User>(getUserByUsername, username);

  const addToFollowing = (id: string) => {
    setData((d) => {
      if (d !== null) {
        return { ...d, following: [...d.following, id] };
      } else {
        return null;
      }
    });
  };

  const removeFromFollowing = (id: string) => {
    setData((d) => {
      if (d !== null) {
        return { ...d, following: d?.following.filter((f) => f !== id) };
      } else {
        return null;
      }
    });
  };

  const updateImage = (newUrl: string, type: "profile" | "background") => {
    if (type === "background") {
      setData((d) => {
        if (d !== null) {
          return { ...d, background_image_url: newUrl };
        } else {
          return null;
        }
      });
    } else {
      setData((d) => {
        if (d !== null) {
          return { ...d, profile_image_url: newUrl };
        } else {
          return null;
        }
      });
    }
  };

  return {
    data,
    addToFollowing,
    removeFromFollowing,
    updateImage,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const useUsersByUsernamesLazy = (usernames: string[] | null) => {
  return useFetchFromFirestoreGenericLazy<User>(
    getUsersByUsernamesLazy,
    usernames
  );
};

export const useUsersByIdLazy = (ids: string[] | null) => {
  return useFetchFromFirestoreGenericLazy<User>(getUsersByIdLazy, ids);
};

export const useUsersByIds = (ids: string[] | null) => {
  return useFetchFromFirestoreGeneric<User[]>(getUsersById, ids);
};

export const useAllUserIds = () => {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getIds = async () => {
      setIsLoading(true);
      try {
        const ids = await getAllUserIds();
        setData(ids);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
    };
    void getIds();
  }, []);
  return { data, isLoading, isSuccess, isError };
};
