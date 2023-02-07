import logoImg from "../../assets/twitter-logo-blue.png";
import Button from "../generics/Button";
import googleLogo from "../../assets/google-logo.svg";
import { auth, useSignIn, useSignInAnonymous } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

const Login = () => {
  const signIn = useSignIn();
  const signInAnonymous = useSignInAnonymous();

  const navigate = useNavigate();

  const onAuthStateChangedCallback = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) navigate("/");
    });
  }, []);

  useEffect(() => {
    onAuthStateChangedCallback();
  }, []);

  return (
    <div
      id="login-container"
      className="bg-white min-h-screen flex justify-center items-center sm:bg-neutral-400"
    >
      <div
        id="login-box"
        className="bg-white w-[600px] rounded-2xl flex justify-center p-3 py-16"
      >
        <div
          id="login-inner-box"
          className="min-w-[300px] flex flex-col gap-10 justify-center items-center"
        >
          <div id="logo">
            <img src={logoImg} alt="logo" width="30" />
          </div>
          <div id="title" className="font-bold text-3xl">
            <h2>Sign in to Twitter</h2>
          </div>
          <Button
            className="font-bold self-stretch hover:bg-gray-100"
            outlined
            onClick={signIn}
          >
            <img className="w-5" src={googleLogo} alt="btn-image" />
            Sign in with Google
          </Button>
          <span>
            Or click{" "}
            <button
              className="text-blue-400 hover:underline"
              onClick={signInAnonymous}
            >
              here
            </button>{" "}
            to log in as a guest.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
