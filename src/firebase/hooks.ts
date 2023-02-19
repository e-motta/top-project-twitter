import { signInAnonymously, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTweetsByHandle, getTweetsByHandlesLazy } from "../service/tweets";
import { getProfile, getProfilesByHandlesLazy } from "../service/profiles";
import { type Tweet, type ProfileInfo } from "../types";
import { auth, provider } from "./auth";
import { type DocWithNotFound } from "./firestore";
import { type DocWithIdAndDate } from "./firestoreTypes";
import { type QueryDocumentSnapshot } from "firebase/firestore";

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

export const useProfileInfo = (handle: string) => {
  const [profileInfo, setProfileInfo] =
    useState<DocWithNotFound<ProfileInfo>>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getProfile(handle);
      setProfileInfo(data);
    };
    if (handle !== "") void getData(); // todo: handle errors
  }, [handle]);
  return profileInfo;
};

export const useTweetsBySingleHandle = (handle: string) => {
  const [tweets, setTweets] = useState<Tweet[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getTweetsByHandle(handle);
      setTweets(data);
    };
    void getData(); // todo: handle errors
  }, []);

  return tweets;
};

export const useTweetsbyHandlesLazy = (handles: string[]) => {
  const [tweets, setTweets] = useState<Tweet[] | null>(null);
  const [prevLastVisible, setPrevLastVisibile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data, lastVisible } = await getTweetsByHandlesLazy(
        handles,
        prevLastVisible
      );
      setTweets(data);
      setPrevLastVisibile(lastVisible);
    };
    void getData(); // todo: handle errors
  }, []);

  return tweets;
};

export const useProfilesByHandlesLazy = (
  handles: string[],
  // currentProfiles: ProfileInfo[] | null
  loadFollows: boolean
) => {
  const [profiles, setProfiles] = useState<ProfileInfo[]>([]);
  const [prevLastVisible, setPrevLastVisibile] = useState<QueryDocumentSnapshot<
    DocWithIdAndDate<ProfileInfo>
  > | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data, lastVisible } = await getProfilesByHandlesLazy(
        handles,
        prevLastVisible
      );
      if (data.length > 0 && lastVisible !== undefined) {
        setProfiles((p) => [...p, ...data]);
        setPrevLastVisibile(lastVisible);
      } else {
        setDone(true);
      }
    };
    if (handles.length > 0 && loadFollows) void getData(); // todo: handle errors
  }, [handles, loadFollows]);

  return { profiles, done };
};
