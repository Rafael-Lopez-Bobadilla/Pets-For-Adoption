import DialogProvider from "./DialogContext/DialogProvider";
import SnackbarProvider from "./SnackbarContext/SnackbarProvider";
import UserProvider from "./UserContext/UserProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DialogProvider>
      <UserProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </UserProvider>
    </DialogProvider>
  );
};

export default AppProvider;
