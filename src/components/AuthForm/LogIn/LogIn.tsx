import s from "../AuthForm.module.css";
import { useForm } from "react-hook-form";
import {
  logInSchema,
  TLogInSchema,
} from "../../../services/userService/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUserUpdate } from "../../../context/UserContext/updateContext";
import { handleError } from "./handleError";
import { useDialogUpdate } from "../../../context/DialogContext/context";

const LogIn = () => {
  const { showSignUp, closeDialog } = useDialogUpdate();
  const { login } = userUserUpdate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  });
  const createError = (key: "email" | "password", message: string) => {
    setError(key, { message });
  };
  const onSubmit = async (formData: TLogInSchema) => {
    try {
      await login(formData);
      closeDialog();
    } catch (err) {
      handleError(err, createError);
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
    </>
  );
};

export default LogIn;
