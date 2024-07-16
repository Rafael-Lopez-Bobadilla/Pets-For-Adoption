import { useRef, useEffect, memo, useState } from "react";
import { useUser } from "../../../../context/UserContext/context";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSnackbar } from "../../../../context/SnackbarContext/context";
const GoogleButton = memo(() => {
  const googleRef = useRef<HTMLDivElement>(null);
  const { authWithGoogle } = useUser();
  const { closeDialog, showError } = useDialogUpdate();
  const { showSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const onSignIn = async (response: google.accounts.id.CredentialResponse) => {
    try {
      setOpen(true);
      await authWithGoogle(response.credential);
      closeDialog();
      showSnackbar("Successful Sign In");
    } catch (err) {
      showError("Unsuccessful Sign In");
    } finally {
      setOpen(false);
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      google.accounts.id.initialize({
        client_id:
          "215994121648-uc647b3pmh2jui4pp6te812880pd5rvk.apps.googleusercontent.com",
        callback: onSignIn,
        use_fedcm_for_prompt: true,
      });
      google.accounts.id.renderButton(googleRef.current!, {
        theme: "filled_blue",
        size: "medium",
        shape: "pill",
        type: "standard",
        text: "continue_with",
        width: 150,
      });
    };
    document.body.appendChild(script);
  }, []);
  return (
    <>
      <div ref={googleRef}></div>
      <Backdrop open={open} sx={{ color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
});

export default GoogleButton;
