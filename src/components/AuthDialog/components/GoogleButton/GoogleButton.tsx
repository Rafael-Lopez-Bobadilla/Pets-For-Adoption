import { useRef, useEffect, memo } from "react";
import { useUserContext } from "../../../UserProvider/UserProvider";
import { googleAuth } from "./googleAuth";
import { useDialogUpdaterContext } from "../../../DialogProvider/DialogProvider";
const GoogleButton = memo(() => {
  const googleRef = useRef<HTMLDivElement>(null);
  const { updateUser } = useUserContext();
  const { closeDialog } = useDialogUpdaterContext();
  const onSignIn = async (response: google.accounts.id.CredentialResponse) => {
    const data = await googleAuth(response);
    if (data.user) {
      updateUser(data.user);
      closeDialog();
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
