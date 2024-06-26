import { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { createContext } from "react";
import Dialog from "./Dialog/Dialog";
import LogIn from "../../components/AuthForms/LogIn/LogIn";
import SignUp from "../../components/AuthForms/SignUp/SignUp";

type TDialogContext = {
  showDialog: (title: string, content: ReactNode) => void;
  closeDialog: () => void;
  showSignUp: () => void;
  showLogIn: () => void;
};
const DialogContext = createContext<TDialogContext | null>(null);
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
  const contextValue = useMemo(() => {
    return { showDialog, closeDialog, showLogIn, showSignUp };
  }, []);
  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <Dialog
        open={open}
        title={title}
        content={content}
        closeDialog={closeDialog}
      />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const dialog = useContext(DialogContext);
  if (!dialog)
    throw new Error("Dialog context has to be used within its provider");
  return dialog;
};

export default DialogProvider;
