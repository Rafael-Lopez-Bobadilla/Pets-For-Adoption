import {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "./authenticate";
export type User = {
  email: string;
  name: string;
  favorites: string[];
} | null;
type TUserContext = {
  user: User;
  updateUser: (user: User) => void;
};
export const UserContext = createContext<TUserContext | null>(null);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const updateUser = useCallback((user: User) => {
    setUser(user);
  }, []);

  useEffect(() => {
    authenticate(updateUser, navigate);
  }, []);
  return (
    <UserContext.Provider value={{ user, updateUser }}>
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
