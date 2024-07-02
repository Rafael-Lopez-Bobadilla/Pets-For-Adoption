import { ReactNode, useCallback, useMemo, useState } from "react";
import LogIn from "../../components/AuthForm/LogIn/LogIn";
import SignUp from "../../components/AuthForm/SignUp/SignUp";
import { DialogContext, UpdateDialogContext } from "./context";

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

export default DialogProvider;
