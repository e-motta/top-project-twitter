import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "./config";

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
// auth.languageCode = auth.useDeviceLanguage();

export const useSignIn = () => {
  const navigate = useNavigate();
  return async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log({ token, user });
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
      .then(() => {
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

onAuthStateChanged(auth, (user) => {
  if (user != null) console.log(user);
});
