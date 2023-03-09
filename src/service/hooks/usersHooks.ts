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
  return useFetchFromFirestoreGeneric<User>(getUserByUsername, username);
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
