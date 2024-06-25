import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
type TDialogContext = {
  open: boolean;
  type: string;
};
type TUpdaterContext = {
  openDialog: (type: string) => void;
  closeDialog: () => void;
};
export const DialogContext = createContext<TDialogContext | null>(null);
export const DialogUpdaterContext = createContext<TUpdaterContext | null>(null);
const AuthDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("none");
  const closeDialog = useCallback(() => {
    setType("none");
    setOpen(false);
  }, []);
  const openDialog = useCallback((type: string) => {
    setOpen(true);
    setType(type);
  }, []);
  const updaterValue = useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    []
  );
  return (
    <DialogContext.Provider value={{ open, type }}>
      <DialogUpdaterContext.Provider value={updaterValue}>
        {children}
      </DialogUpdaterContext.Provider>
    </DialogContext.Provider>
  );
};

export const useAuthDialog = () => {
  const dialogContext = useContext(DialogContext);
  if (!dialogContext)
    throw new Error("Auth Dialog context has to be used within its provider");
  return dialogContext;
};

export const useAuthDialogUpdater = () => {
  const dialogContext = useContext(DialogUpdaterContext);
  if (!dialogContext)
    throw new Error(
      "Auth Dialog update context has to be used within its provider"
    );
  return dialogContext;
};

export default AuthDialogProvider;
