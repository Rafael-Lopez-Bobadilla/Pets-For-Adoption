import s from "../AuthForm.module.css";
import { useForm } from "react-hook-form";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  TSignUpSchema,
} from "../../../../services/userService/schemas";
import { userUserUpdate } from "../../../../context/UserContext/updateContext";
import { AxiosError } from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSnackbar } from "../../../../context/SnackbarContext/context";
import { useAsync } from "../../../../hooks/useAsync";
const SignUp = () => {
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
  const onSuccess = () => {
    showSnackbar("Sign Up Successful!");
    closeDialog();
  };
  const onError = (err: unknown) => {
    if (err instanceof AxiosError && err.response?.status === 400) {
      const message = "An account with this email already exists";
      setError("email", { message });
      return;
    }
    showError("Unsuccessful Sign Up");
  };
  const { loading, asyncCall } = useAsync({
    asyncFunc: signup,
    onSuccess,
    onError,
  });
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(asyncCall)}>
        <label>Username</label>
        <input {...register("name")} />
        {errors.name && <p>{`${errors.name.message}`}</p>}
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p>{`${errors.email.message}`}</p>}
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{`${errors.password.message}`}</p>}
        <label>Confirm Password</label>
        <input type="password" {...register("confirm")} />
        {errors.confirm && <p>{`${errors.confirm.message}`}</p>}
        <button disabled={isSubmitting}>Sign Up</button>
      </form>
      <p className={s.alt}>
        {`Already have an account? `}
        <span className={s.link} onClick={() => showLogIn()}>
          Log in
        </span>
      </p>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default SignUp;
