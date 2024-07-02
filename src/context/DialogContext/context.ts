import { ReactNode, createContext, useContext } from "react";
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
export const DialogContext = createContext<TDialogContext | null>(null);
export const UpdateDialogContext = createContext<TUpdateDialogContext | null>(
  null
);

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
