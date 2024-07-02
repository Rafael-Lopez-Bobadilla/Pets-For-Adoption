import { authenticate } from "../../services/userService";
import { TUserSchema } from "./context";
import { useFetch } from "../../useFetch";
import { UserContext, User } from "./context";
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

export default UserProvider;
