// export interface User {
//   username: string;
//   name: string;
//   email: string;
//   avatar: string;
//   bgImage: string;
//   followers: string[];
//   following: string[];
//   tweets: string[];
// }

export interface User {
  id?: string;
  name: string;
  username: string | null;
  email: string;
  profile_image_url: string | null;
  background_image_url: string | null;
  following: string[];
  followers: string[];
  liked_tweets: string[];
}

// export interface Tweet {
//   id: string;
//   date: Date;
//   handle: string;
//   likes: number;
//   text: string;
// }

export interface Tweet {
  id?: string;
  text: string;
  author_id: string;
  created_at?: Date;
  likes: number;
}

export type Collection = "users" | "tweets";
