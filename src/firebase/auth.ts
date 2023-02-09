import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "./config";

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
