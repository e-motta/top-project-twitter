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
// 1. Post to backend when tweet is liked
// 2. Post to backend when user is followed (following and followers arrays (both users))
// 2.1. Update follow button optimistically
// 3. Post to backend when user is unfollowed (following and followers arrays (both users))
// 3.1. Update unfollow button optimistically
// 4. Post to backend when updating profile
// 5. Post to backend when sending tweet
// 6. Upload images (expand)

// *. Delete mock_data.ts and new_data_structure.ts when finished
// *2. Remove any comments, console.log, unused files
