import { userService } from "../../services/userService/userService";
import { TUserSchema } from "../../services/userService/schemas";
import { useFetch } from "../../useFetch";
import { UserContext } from "./context";
import { useCallback } from "react";
import UserUpdateProvider from "./UserUpdateProvider";
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    error,
    setData,
  } = useFetch<TUserSchema>(userService.authenticate);
  const updateUser = useCallback((user: TUserSchema | null) => {
    setData(user);
  }, []);
  return (
    <UserContext.Provider value={{ user, loading, error }}>
      <UserUpdateProvider updateUser={updateUser}>
        {children}
      </UserUpdateProvider>
    </UserContext.Provider>
  );
};

export default UserProvider;
