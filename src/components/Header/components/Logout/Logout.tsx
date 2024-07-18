import { AxiosError } from "axios";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { useSnackbar } from "../../../../context/SnackbarContext/context";
import { useUser } from "../../../../context/UserContext/context";
import bs from "../button.module.css";
const Logout = () => {
  const { showError } = useDialogUpdate();
  const { showSnackbar } = useSnackbar();
  const { logout, clearUser } = useUser();
  const handleLogout = async () => {
    try {
      await logout();
      showSnackbar("Logout Successful");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        showError("Session Expired");
        clearUser();
      } else {
        showError("Unsuccessful Logout");
      }
    }
  };
  return (
    <button
      className={bs.button}
      onClick={handleLogout}
      style={{ width: "100%" }}
    >
      Log out
    </button>
  );
};

export default Logout;
