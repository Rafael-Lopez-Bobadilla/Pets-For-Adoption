import { useRef, useEffect, memo } from "react";
import { useUser } from "../../../../context/UserContext/context";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
const GoogleButton = memo(() => {
  const googleRef = useRef<HTMLDivElement>(null);
  const { authWithGoogle } = useUser();
  const { closeDialog } = useDialogUpdate();
  const onSignIn = async (response: google.accounts.id.CredentialResponse) => {
    try {
      await authWithGoogle(response.credential);
      closeDialog();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
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
  }, []);
  return <div ref={googleRef}></div>;
});

export default GoogleButton;
