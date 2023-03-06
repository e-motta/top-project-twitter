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
// 3. Implement Register component
// 4. Redirect to Register if user is logged in but doesn't have a username
// 6. Implement Anonymous user
// 8. Implement: Following button must turn Unfollow with red text
// 9. Implement: For you / Following tabs
// 10. Update Router to new syntax
// 11. Implement: Delete tweets