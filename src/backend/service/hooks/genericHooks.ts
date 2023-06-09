import {
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFetchFromFirestoreGeneric = <Doc>(
  fetchFunc: (arg0: any) => Promise<any>,
  param: any
) => {
  const [data, setData] = useState<Doc | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const effectDeps = typeof param === "object" ? JSON.stringify(param) : param;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const responseData = await fetchFunc(param);
        setData(responseData);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setError(e);
        setIsError(true);
      }
    };
    if (param !== null) void getData();
  }, [effectDeps]);

  return { data, setData, isLoading, isSuccess, isError, error };
};

export const useFetchFromFirestoreGenericLazy = <Doc extends { id?: string }>(
  fetchFunc: (arg0: any, arg1: any) => Promise<any>,
  param: any
) => {
  const [data, setData] = useState<Doc[] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [prevLastVisible, setPrevLastVisibile] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [load, setLoad] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const effectDeps: any[] = [load];
  typeof param === "object"
    ? effectDeps.push(JSON.stringify(param))
    : effectDeps.push(param);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data: responseData, lastVisible } = await fetchFunc(
          param,
          prevLastVisible
        );
        if (responseData !== undefined) {
          if (responseData.length > 0 && lastVisible !== undefined) {
            setData((d) => {
              if (d !== null) {
                return [...d, ...responseData];
              } else {
                return responseData;
              }
            });
            setPrevLastVisibile(lastVisible);
          }
          if (lastVisible === undefined) setHasMore(false);
          setIsSuccess(true);
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        setError(e);
        setIsError(true);
      }
    };
    if (param !== null && load) {
      void getData();
      setLoad(false);
    }
  }, [effectDeps]);

  useEffect(() => {
    setLoad(true);
  }, []);

  const loadMore = () => {
    setLoad(true);
  };

  const addDoc = (docObj: Doc) => {
    setData((d) => {
      if (d !== null) {
        return [docObj, ...d];
      } else {
        return null;
      }
    });
  };

  const deleteDoc = (id: string) => {
    setData((d) => {
      if (d !== null) return d.filter((d) => d.id !== id);
      return null;
    });
  };

  return {
    data,
    loadMore,
    hasMore,
    addDoc,
    deleteDoc,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const useFetchCountGeneric = (
  fetchFunc: (arg0: any) => Promise<any>,
  param: any
) => {
  const [data, setData] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getCount = async () => {
      setIsLoading(true);
      try {
        const count = await fetchFunc(param);
        setData(count);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setError(e);
        setIsError(true);
      }
    };
    if (param !== "") void getCount();
  }, [param]);

  return { data, isLoading, isSuccess, isError, error };
};
