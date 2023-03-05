import { useEffect } from "react";
import { addDocToFirestore } from "./firebase/firestore";
import { type User, type Tweet } from "./types";

// mock
export const tweets = [
  // {
  //   author_id: "VcpkTR8KFDsS3rv2njFa",
  //   text: "This is tweet number 1",
  //   likes: 230492,
  // },
  // {
  //   author_id: "VcpkTR8KFDsS3rv2njFa",
  //   text: "This is tweet number 2",
  //   created_at: new Date("2023-02-04T15:01:04.753Z"),
  //   likes: 2304,
  // },
  // {
  //   author_id: "VcpkTR8KFDsS3rv2njFa",
  //   text: "This is tweet number 3",
  //   created_at: new Date("2023-02-05T18:01:04.753Z"),
  //   likes: 23040,
  // },
  {
    author_id: "lVdyKfmdickhzNFIDBL4",
    text: "Hello, world! I am Bill gates.",
    created_at: new Date("2013-02-20T12:01:04.753Z"),
    likes: 2304,
  },
  {
    author_id: "lVdyKfmdickhzNFIDBL4",
    text: "India is making strong progress toward a healthier future for women and children through POSHAN 2.0 with a focus on data & monitoring. Today I met with two amazing administrators, Amy Joseph and Lakshmi Priya, who are helping to improve nutrition outcomes.",
    created_at: new Date("2023-03-02T12:01:04.753Z"),
    likes: 2304,
  },
  {
    author_id: "lVdyKfmdickhzNFIDBL4",
    text: "Aside from being a neat piece of art, the periodic table reminds me of how one discovery can lead to countless others.",
    created_at: new Date("2023-02-02T12:01:04.753Z"),
    likes: 4500,
  },
];

// mock
export const usersInfo = [
  {
    username: "eduardom0tta",
    name: "Eduardo",
    email: "edumrs90@gmail.com",
    profile_image_url: null,
    background_image_url: null,
    following: [],
    liked_tweets: [],
  },
  {
    username: "elonmusk",
    name: "Elon Musk",
    email: "elon@musk.com",
    profile_image_url: null,
    background_image_url: null,
    following: ["VcpkTR8KFDsS3rv2njFa"],
    liked_tweets: [],
  },
  {
    username: "billgates",
    name: "Bill Gates",
    email: "bill@gates.com",
    profile_image_url: null,
    background_image_url: null,
    following: ["VcpkTR8KFDsS3rv2njFa", "g1yQGuEjkvyAgniW6I2O"],
    liked_tweets: [],
  },
];

export const useAddUserToDb = () => {
  useEffect(() => {
    const add = async () => {
      await addDocToFirestore<User>("users", usersInfo[2]);
    };
    void add();
  }, []);
};

export const useAddTweetsToDb = () => {
  useEffect(() => {
    const add = async () => {
      await addDocToFirestore<Tweet>("tweets", tweets[0]);
    };
    void add();
  }, []);
};
