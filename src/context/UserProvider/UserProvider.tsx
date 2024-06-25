import { createContext, useContext } from "react";
import { authenticate } from "../../services/userService";
import { TUserSchema } from "../../services/userService";
import { useFetch } from "../../useFetch";
type User = TUserSchema | null;
type TUserContext = {
  user: User;
  updateUser: (data: User) => void;
  loading: boolean;
  error: boolean;
};
export const UserContext = createContext<TUserContext | null>(null);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    error,
    setData,
  } = useFetch<TUserSchema>(authenticate);
  const updateUser = (user: User) => {
    setData(user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext)
    throw new Error("user context has to be used within its provider");
  return userContext;
};

export default UserProvider;
