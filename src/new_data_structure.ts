export const tweet = {
  id: "some_id",
  text: "this is a tweet text",
  author_id: "some_user_id",
  created_at: new Date(),
  likes: 0,
};

export const user = {
  id: "some_user_id",
  name: "Eduardo",
  username: "eduardom0tta",
  email: "edumrs90@gmail.com",
  profile_image_url: null,
  background_image_url: null,
  following: ["user_id_2", "user_id_3"], // todo: test queries
  followers: ["user_id_2"],
  liked_tweets: ["tweet_id_1, tweet_id_2"],
};

// NEXT STEPS:
// 1. Move "firestoreHooks" to service dir ? / split hooks in users/tweets files
// 2. Update Router to new syntax
// 4. Move all types to types.ts?
// 5. Change title when navigating

// *. Delete mock_data.ts and new_data_structure.ts when finished
