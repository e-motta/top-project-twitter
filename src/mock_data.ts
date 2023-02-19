import { useEffect } from "react";
import AvatarImg from "./assets/avatar_example.jpeg";
import bgImg from "./assets/bg-example.jpeg";
import { setDocToFirestore } from "./firebase/firestore";

// mock
export const tweets = [
  {
    id: "id1",
    handle: "eduardom0tta",
    text: "This is tweet number 1",
    date: new Date("2013-02-20T12:01:04.753Z"),
    likes: 230492,
  },
  {
    id: "id2",
    handle: "eduardom0tta",
    text: "This is tweet number 2",
    date: new Date("2023-02-04T15:01:04.753Z"),
    likes: 2304,
  },
  {
    id: "id3",
    handle: "eduardom0tta",
    text: "This is tweet number 3",
    date: new Date("2023-02-05T18:01:04.753Z"),
    likes: 23040,
  },
  {
    id: "id4",
    handle: "billgates",
    text: "This is tweet number 4",
    date: new Date("2013-02-20T12:01:04.753Z"),
    likes: 230492,
  },
  {
    id: "id5",
    handle: "elonmusk",
    text: "This is tweet number 5",
    date: new Date("2023-02-04T15:01:04.753Z"),
    likes: 2304,
  },
  {
    id: "id6",
    handle: "elonmusk",
    text: "This is tweet number 6",
    date: new Date("2023-02-05T18:01:04.753Z"),
    likes: 23040,
  },
];

// mock
export const usersInfo = [
  {
    handle: "eduardom0tta",
    name: "Eduardo",
    email: "edumrs90@gmail.com",
    avatar: AvatarImg,
    bgImage: bgImg,
    followers: ["elonmusk", "billgates"],
    following: ["elonmusk"],
    tweets: ["id1", "id2"],
  },
  {
    handle: "elonmusk",
    name: "Elon Musk",
    email: "elon@musk.com",
    avatar: AvatarImg,
    bgImage: null,
    followers: ["elonmusk", "billgates"],
    following: ["elonmusk"],
    tweets: ["id1", "id2"],
  },
  {
    handle: "billgates",
    name: "Bill Gates",
    email: "bill@gates.com",
    avatar: AvatarImg,
    bgImage: null,
    followers: ["elonmusk", "eduardom0tta"],
    following: ["elonmusk"],
    tweets: ["id1", "id3"],
  },
];

export const useGetUserToDb = () => {
  useEffect(() => {
    const get = async () => {
      await setDocToFirestore(
        "users",
        {
          handle: "billgates",
          name: "Bill Gates",
          email: "bill@gates.com",
          avatar: null,
          bgImage: null,
          followers: ["elonmusk", "eduardom0tta"],
          following: ["elonmusk"],
          tweets: ["id1", "id3"],
        },
        "billgates"
      );
    };
    void get();
  }, []);
};
