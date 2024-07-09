import s from "../AuthForm.module.css";
import { useForm } from "react-hook-form";
import {
  logInSchema,
  TLogInSchema,
} from "../../../../services/userService/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUserUpdate } from "../../../../context/UserContext/updateContext";
import { getError } from "./getError";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSnackbar } from "../../../../context/SnackbarContext/context";
import { useAsync } from "../../../../hooks/useAsync";
const LogIn = () => {
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
  const onError = (err: unknown) => {
    const authError = getError(err);
    if (!authError) showError("Unsuccessful Login");
    if (authError) setError(authError.key, { message: authError.message });
  };
  const onSuccess = () => {
    closeDialog();
    showSnackbar("Log In Successful");
  };
  const { loading, asyncCall } = useAsync({
    asyncFunc: login,
    onError,
    onSuccess,
  });
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(asyncCall)}>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p>{`${errors.email.message}`}</p>}
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{`${errors.password.message}`}</p>}
        <button disabled={isSubmitting}>Log In</button>
      </form>
      <p className={s.alt}>
        {`No account? `}
        <span className={s.link} onClick={() => showSignUp()}>
          Create one
        </span>
      </p>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default LogIn;
