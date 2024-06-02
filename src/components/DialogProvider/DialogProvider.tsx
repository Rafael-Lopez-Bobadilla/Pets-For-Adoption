import { useState, createContext, useEffect, useContext } from "react";
import { googleAuth } from "./googleAuth";
import { UserContext } from "../UserProvider/UserProvider";
type SetterContext = {
  handleDialogOpen: (type: string) => void;
  handleDialogClose: () => void;
};
export const DialogContext = createContext({ open: false, type: "none" });
export const DialogSetterContext = createContext<SetterContext>({
  handleDialogOpen: () => {},
  handleDialogClose: () => {},
});
const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("none");
  const { setUser } = useContext(UserContext);
  const handleDialogClose = () => {
    setType("none");
    setOpen(false);
  };
  const handleDialogOpen = (type: string) => {
    setOpen(true);
    setType(type);
  };
  const onSignIn = async (response: google.accounts.id.CredentialResponse) => {
    const data = await googleAuth(response);
    if (data.status === "success") {
      setUser(data.user);
      setOpen(false);
    }
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "215994121648-uc647b3pmh2jui4pp6te812880pd5rvk.apps.googleusercontent.com",
      callback: onSignIn,
      use_fedcm_for_prompt: true,
    });
  }, []);
  return (
    <DialogContext.Provider value={{ open, type }}>
      <DialogSetterContext.Provider
        value={{ handleDialogOpen, handleDialogClose }}
      >
        {children}
      </DialogSetterContext.Provider>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
