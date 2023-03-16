export interface User {
  id?: string;
  name: string;
  username: string | null;
  username_lowercase: string | null;
  email: string;
  profile_image_url: string | null;
  background_image_url: string | null;
  following: string[];
  followers: string[];
  liked_tweets: string[];
}

export interface Tweet {
  id?: string;
  text: string;
  author_id: string;
  created_at?: Date;
  likes: number;
}

export type Collection = "users" | "tweets";
