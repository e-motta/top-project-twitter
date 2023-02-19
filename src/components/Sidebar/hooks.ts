import { useContext, useState } from "react";
import { UserContext } from "../../firebase/UserContext";
import { getProfileByEmail } from "../../service/profiles";

export const useUserHandle = () => {
  const user = useContext(UserContext);
  const [handle, setHandle] = useState<string | null>(null);

  let email: string;
  if (user !== null) email = user.email ?? "anonymousUser";

  const get = async () => {
    const profilesWithEmail = await getProfileByEmail(email ?? "");
    if (profilesWithEmail.length > 0) setHandle(profilesWithEmail[0].handle);
  };
  void get(); // todo: handle error?

  return handle;
};
