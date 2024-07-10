import s from "../AuthForm.module.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSignUp } from "./useSignUp";
const SignUp = () => {
  const { onSubmit, register, isSubmitting, errors, showLogIn } = useSignUp();
  return (
    <>
      <form className={s.form} onSubmit={onSubmit}>
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
        <span onClick={() => showLogIn()}>Log in</span>
      </p>
      <Backdrop open={isSubmitting}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default SignUp;
