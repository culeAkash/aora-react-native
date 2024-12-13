import { AuthContext } from "@/context/auth-context-provider";
import { getCurrentUser } from "@/lib/appwrite";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, isLoading, isLoggedIn, setIsLoggedIn, setUser, setIsLoading } =
    context;

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        if (response) {
          setIsLoggedIn(true);
          // console.log(response);

          setUser(response.documents[0] as any);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { user, isLoading, setIsLoggedIn, setUser, isLoggedIn };
};
