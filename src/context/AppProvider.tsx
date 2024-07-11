import DialogProvider from "./DialogContext/DialogProvider";
import SnackbarProvider from "./SnackbarContext/SnackbarProvider";
import UserProvider from "./UserContext/UserProvider";
import PetTypesProvider from "./PetTypesContext/PetTypesProvider";
import { TokenProvider } from "./TokenContext/TokenProvider";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DialogProvider>
      <UserProvider>
        <TokenProvider>
          <PetTypesProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </PetTypesProvider>
        </TokenProvider>
      </UserProvider>
    </DialogProvider>
  );
};

export default AppProvider;
