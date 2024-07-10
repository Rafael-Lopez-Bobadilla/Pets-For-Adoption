import { useForm } from "react-hook-form";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  TSignUpSchema,
} from "../../../../services/userService/schemas";
import { userUserUpdate } from "../../../../context/UserContext/updateContext";
import { AxiosError } from "axios";
import { useSnackbar } from "../../../../context/SnackbarContext/context";

export const useSignUp = () => {
  const { showSnackbar } = useSnackbar();
  const { showLogIn, closeDialog, showError } = useDialogUpdate();
  const { signup } = userUserUpdate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const submit = async (data: TSignUpSchema) => {
    try {
      await signup(data);
      showSnackbar("Sign Up Successful!");
      closeDialog();
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        const message = "An account with this email already exists";
        setError("email", { message });
        return;
      }
      showError("Unsuccessful Sign Up");
    }
  };
  const onSubmit = () => handleSubmit(submit);
  return { isSubmitting, errors, register, onSubmit, showLogIn };
};
