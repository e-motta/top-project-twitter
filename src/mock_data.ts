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
  {
    author_id: "lVdyKfmdickhzNFIDBL4",
    text: "I am in awe of people who have dedicated their lives to making the world a more equitable place, and I feel lucky to be able to support their efforts.",
    created_at: new Date("2022-12-20T12:01:04.753Z"),
    likes: 5300,
  },
  {
    author_id: "lVdyKfmdickhzNFIDBL4",
    text: "Africa has always been at the heart of our foundation’s mission. Today, we are announcing our commitment of $7 billion over the next 4 years for the development of more breakthrough innovations in health and agriculture across the continent.",
    created_at: new Date("2022-11-17T12:01:04.753Z"),
    likes: 2600,
  },
  {
    author_id: "g1yQGuEjkvyAgniW6I2O",
    text: "Hello, world! I am Elon Musk.",
    created_at: new Date("2016-02-04T15:01:04.753Z"),
    likes: 230492,
  },
  {
    author_id: "g1yQGuEjkvyAgniW6I2O",
    text: "The ability of Twitter advertising to reach the most influential people in the world is often not fully appreciated. While a few other social networks are technically bigger, Twitter is where the writers & leaders spend their time.",
    created_at: new Date("2023-03-01T19:01:04.753Z"),
    likes: 23040,
  },
  {
    author_id: "g1yQGuEjkvyAgniW6I2O",
    text: "You’re not gonna believe this, but we’re running a little late! Presentation starts in ~5 mins.",
    created_at: new Date("2023-03-01T18:01:04.753Z"),
    likes: 57600,
  },
  {
    author_id: "g1yQGuEjkvyAgniW6I2O",
    text: "What do you call an infinite gear ratio? All torque, no action.",
    created_at: new Date("2023-03-02T18:01:04.753Z"),
    likes: 92000,
  },
  {
    author_id: "g1yQGuEjkvyAgniW6I2O",
    text: "BasedAI",
    created_at: new Date("2023-02-28T18:01:04.753Z"),
    likes: 54000,
  },
  {
    author_id: "g1yQGuEjkvyAgniW6I2O",
    text: "Having a bit of AI existential angst today",
    created_at: new Date("2023-02-26T18:01:04.753Z"),
    likes: 95100,
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
      await addDocToFirestore<Tweet>("tweets", tweets[14]);
    };
    void add();
  }, []);
};
