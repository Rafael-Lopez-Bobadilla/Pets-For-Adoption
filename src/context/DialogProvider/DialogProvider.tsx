import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import Dialog from "./Dialog/Dialog";
type TDialogContext = {
  showDialog: (title: string, content: ReactNode) => void;
  closeDialog: () => void;
};
const DialogContext = createContext<TDialogContext | null>(null);
const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string>("");
  const showDialog = (title: string, content: ReactNode) => {
    setContent(content);
    setTitle(title);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
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
