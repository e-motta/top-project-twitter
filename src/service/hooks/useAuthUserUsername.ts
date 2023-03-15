import { useContext, useEffect, useState } from "react";
import { getUserByEmail } from "../users";
import { AuthContext } from "../../firebase/AuthContext";
import { UsernameContext } from "../UsernameContext";

export function useAuthUserUsernameAndEmail() {
  const authUser = useContext(AuthContext);
  const { username, setUsername } = useContext(UsernameContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  let email: string | null = null;
  if (authUser !== null) email = authUser.email ?? "anonymousUser";

  useEffect(() => {
    const getUsername = async () => {
      setIsLoading(true);
      try {
        const usersWithEmail = await getUserByEmail(email ?? "");
        if (usersWithEmail.length > 0) {
          setUsername(usersWithEmail[0].username);
        }
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
    };
    void getUsername();
  }, [authUser]);

  return { username, setUsername, email, isLoading, isSuccess, isError };
}
