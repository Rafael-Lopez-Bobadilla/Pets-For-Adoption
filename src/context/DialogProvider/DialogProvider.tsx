import { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { createContext } from "react";
import LogIn from "../../components/AuthForms/LogIn/LogIn";
import SignUp from "../../components/AuthForms/SignUp/SignUp";

type TUpdateDialogContext = {
  showDialog: (title: string, content: ReactNode) => void;
  closeDialog: () => void;
  showSignUp: () => void;
  showLogIn: () => void;
};
type TDialogContext = {
  open: boolean;
  title: string;
  content: ReactNode;
};
const DialogContext = createContext<TDialogContext | null>(null);
const UpdateDialogContext = createContext<TUpdateDialogContext | null>(null);
const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string>("");
  const showDialog = useCallback((title: string, content: ReactNode) => {
    setContent(content);
    setTitle(title);
    setOpen(true);
  }, []);
  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);
  const showSignUp = useCallback(() => {
    showDialog("Sign Up", <SignUp />);
  }, []);
  const showLogIn = useCallback(() => {
    showDialog("Log In", <LogIn />);
  }, []);
  const updateContext = useMemo(() => {
    return { showDialog, closeDialog, showLogIn, showSignUp };
  }, []);
  return (
    <DialogContext.Provider value={{ open, title, content }}>
      <UpdateDialogContext.Provider value={updateContext}>
        {children}
      </UpdateDialogContext.Provider>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const value = useContext(DialogContext);
  if (!value)
    throw new Error("Dialog context can only be used within its provider");
  return value;
};

export const useDialogUpdate = () => {
  const value = useContext(UpdateDialogContext);
  if (!value)
    throw new Error(
      "Update Dialog context can only be used within its provider"
    );
  return value;
};

export default DialogProvider;
