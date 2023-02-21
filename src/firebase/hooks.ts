import { signInAnonymously, signInWithPopup, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTweetsByHandle, getTweetsByHandlesLazy } from "../service/tweets";
import {
  getProfile,
  getProfileByEmail,
  getProfilesByHandlesLazy,
} from "../service/profiles";
import { type Tweet, type ProfileInfo } from "../types";
import { auth, provider } from "./auth";
import {
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { UserContext } from "./UserContext";

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

export const useUserHandle = () => {
  const user = useContext(UserContext);
  const [handle, setHandle] = useState<string | null>(null);

  let email: string;
  if (user !== null) email = user.email ?? "anonymousUser";

  const get = async () => {
    const profilesWithEmail = await getProfileByEmail(email ?? "");
    if (profilesWithEmail.length > 0) setHandle(profilesWithEmail[0].handle);
  };
  void get(); // todo: handle error?

  return handle;
};

export const useProfileInfo = (handle: string) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [status, setStatus] = useState<200 | 404 | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data, status } = await getProfile(handle);
      setProfileInfo(data);
      setStatus(status);
    };
    if (handle !== "") void getData(); // todo: handle errors
  }, [handle]);
  return { profileInfo, status };
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
  const [prevLastVisible, setPrevLastVisibile] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

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
  loadFollows: boolean
) => {
  const [profiles, setProfiles] = useState<ProfileInfo[]>([]);
  const [prevLastVisible, setPrevLastVisibile] =
    useState<QueryDocumentSnapshot<ProfileInfo> | null>(null);
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
