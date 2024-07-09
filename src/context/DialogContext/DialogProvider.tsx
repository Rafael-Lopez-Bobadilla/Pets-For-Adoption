import { ReactNode, useCallback, useMemo, useState } from "react";
import LogIn from "../../components/Dialogs/AuthForms/LogIn/LogIn";
import SignUp from "../../components/Dialogs/AuthForms/SignUp/SignUp";
import { DialogContext, UpdateDialogContext } from "./context";
import ErrorDialog from "../../components/Dialogs/ErrorDialog/ErrorDialog";

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
  const showError = useCallback((message: string) => {
    showDialog("", <ErrorDialog message={message} />);
  }, []);
  const updateContext = useMemo(() => {
    return { showDialog, closeDialog, showLogIn, showSignUp, showError };
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
