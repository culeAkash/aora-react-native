import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useEffect, useState } from "react";
import React from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        setIsLoggedIn,
        setUser,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
