import { useForm } from "react-hook-form";
import {
  logInSchema,
  TLogInSchema,
} from "../../../../services/userService/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUserUpdate } from "../../../../context/UserContext/updateContext";
import { handleError } from "./handleError";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { useSnackbar } from "../../../../context/SnackbarContext/context";
export const useLogIn = () => {
  const { showSignUp, closeDialog, showError } = useDialogUpdate();
  const { showSnackbar } = useSnackbar();
  const { login } = userUserUpdate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  });
  const submit = async (data: TLogInSchema) => {
    try {
      await login(data);
      closeDialog();
      showSnackbar("Log In Successful");
    } catch (err) {
      handleError(err, setError, showError);
    }
  };
  const onSubmit = handleSubmit(submit);
  return { isSubmitting, errors, register, onSubmit, showSignUp };
};
