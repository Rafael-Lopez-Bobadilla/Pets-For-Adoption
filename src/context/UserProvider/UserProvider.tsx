import { useState, createContext, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authenticate } from "../../services/userService";
import { TUserSchema } from "../../services/userService";
type User = TUserSchema | null;
type TUserContext = {
  user: User;
  updateUser: (user: User) => void;
};
export const UserContext = createContext<TUserContext | null>(null);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const updateUser = (user: User) => {
    setUser(user);
  };

  const getUser = async () => {
    try {
      const user = await authenticate();
      updateUser(user);
    } catch (err) {
    } finally {
      if ((!user || user.favorites.length === 0) && pathname === "/favorites")
        navigate("/search");
    }
  };

  useEffect(() => {
    getUser();
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
