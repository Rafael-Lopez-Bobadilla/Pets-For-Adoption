import s from "../AuthForm.module.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { useLogIn } from "./useLogIn";
const LogIn = () => {
  const { register, errors, onSubmit, isSubmitting, showSignUp } = useLogIn();
  return (
    <>
      <form className={s.form} onSubmit={onSubmit}>
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
        <span onClick={() => showSignUp()}>Create one</span>
      </p>
      <Backdrop open={isSubmitting} className={s.back}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LogIn;
