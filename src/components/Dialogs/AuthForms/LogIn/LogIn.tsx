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
import ErrorDialog from "../../ErrorDialog/ErrorDialog";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

const LogIn = () => {
  const { showSignUp, closeDialog, showDialog } = useDialogUpdate();
  const [Loading, setLoading] = useState(false);
  const { login } = userUserUpdate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  });
  const onSubmit = async (formData: TLogInSchema) => {
    try {
      setLoading(true);
      await login(formData);
      closeDialog();
    } catch (err) {
      const authError = getError(err);
      if (!authError)
        showDialog("", <ErrorDialog message="Unsuccessful Login" />);
      if (authError) setError(authError.key, { message: authError.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
      <Backdrop open={Loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default LogIn;
