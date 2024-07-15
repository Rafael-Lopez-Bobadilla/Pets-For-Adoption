import {
  TUpdateAction,
  userService,
} from "../../services/userService/userService";
import { TUserSchema } from "../../services/userService/schemas";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "./context";
import {
  TSignUpSchema,
  TLogInSchema,
} from "../../services/userService/schemas";
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    error,
    setData,
  } = useFetch<TUserSchema>(userService.authenticate);
  const signup = async (formData: TSignUpSchema) => {
    const user = await userService.signUp(formData);
    setData(user);
  };
  const login = async (formData: TLogInSchema) => {
    const user = await userService.logIn(formData);
    setData(user);
  };
  const authWithGoogle = async (googleToken: string) => {
    const user = await userService.authWithGoogle(googleToken);
    setData(user);
  };
  const logout = async () => {
    await userService.logout();
    setData(null);
  };
  const updateFavorites = async (id: number, action: TUpdateAction) => {
    const user = await userService.updateFavorites(id, action);
    setData(user);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateFavorites,
        authWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
