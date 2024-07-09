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
import ErrorDialog from "../../ErrorDialog/ErrorDialog";
import { useState } from "react";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { createPortal } from "react-dom";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { showLogIn, closeDialog, showDialog } = useDialogUpdate();
  const { signup } = userUserUpdate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data: TSignUpSchema) => {
    try {
      setLoading(true);
      await signup(data);
      setOpen(true);
      closeDialog();
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        const message = "An account with this email already exists";
        setError("email", { message });
        return;
      }
      showDialog("", <ErrorDialog message="Unsuccessful Sign Up" />);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div onClick={() => setOpen(true)}>Open Snackbar</div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
        <div className={s.loading}>
          <CircularProgress color="inherit" />
        </div>
      </Backdrop>
      {createPortal(
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Sign Up Successful!
          </Alert>
        </Snackbar>,
        document.body
      )}
    </>
  );
};

export default SignUp;
