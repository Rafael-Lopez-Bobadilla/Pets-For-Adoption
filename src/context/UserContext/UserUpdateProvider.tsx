import { userService } from "../../services/userService/userService";
import {
  TSignUpSchema,
  TLogInSchema,
  TUserSchema,
} from "../../services/userService/schemas";
import { UserUpdateContext } from "./updateContext";
type Props = {
  children: React.ReactNode;
  updateUser: (user: TUserSchema | null) => void;
};
const UserUpdateProvider = ({ children, updateUser }: Props) => {
  const signup = async (formData: TSignUpSchema) => {
    const user = await userService.signUp(formData);
    updateUser(user);
  };
  const login = async (formData: TLogInSchema) => {
    const user = await userService.logIn(formData);
    updateUser(user);
  };
  const authWithGoogle = async (googleToken: string) => {
    const user = await userService.authWithGoogle(googleToken);
    updateUser(user);
  };
  const logout = async () => {
    await userService.logout();
    updateUser(null);
  };
  const updateFavorites = async (id: number, action: string) => {
    const user = await userService.updateFavorites(id, action);
    updateUser(user);
  };
  return (
    <UserUpdateContext.Provider
      value={{ signup, login, authWithGoogle, logout, updateFavorites }}
    >
      {children}
    </UserUpdateContext.Provider>
  );
};

export default UserUpdateProvider;
