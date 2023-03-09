export const validateName = (name: string) => {
  let message: string;
  let valid: boolean;
  const limit = 30;

  switch (true) {
    case name.length > limit:
      valid = false;
      message = `Your name must be ${limit} characters long or shorter`;
      break;
    case name.length < 1:
      valid = false;
      message = "Please enter a name";
      break;
    default:
      valid = true;
      message = "";
  }
  return { valid, message };
};

export const validateUsername = (username: string) => {
  let message: string;
  let valid: boolean;
  const limit = 20;

  switch (true) {
    case username.length > limit:
      valid = false;
      message = `Your username must be ${limit} characters long or shorter`;
      break;
    case username.length < 3:
      valid = false;
      message = "Your username must have at least three characters";
      break;
    case !/^[A-Za-z0-9]*$/.test(username):
      valid = false;
      message = "Your username must contain only letters and numbers";
      break;
    default:
      valid = true;
      message = "";
  }
  return { valid, message };
};
