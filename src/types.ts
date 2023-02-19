export interface ProfileInfo {
  handle: string;
  name: string;
  email: string;
  avatar: string;
  bgImage: string;
  followers: string[];
  following: string[];
  tweets: string[];
}

export interface Tweet {
  id: string;
  date: Date;
  handle: string;
  likes: number;
  text: string;
}
