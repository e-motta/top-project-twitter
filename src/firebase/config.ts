import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAngc46GicTIAoNHGwqZSYmDuUCKWans0Y",
  authDomain: "twitter-9036d.firebaseapp.com",
  projectId: "twitter-9036d",
  storageBucket: "twitter-9036d.appspot.com",
  messagingSenderId: "277017617244",
  appId: "1:277017617244:web:f694a6d3f2b6390781d799",
  measurementId: "G-5LBQJE55DW",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
