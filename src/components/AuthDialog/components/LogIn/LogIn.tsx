import s from "../../AuthDialog.module.css";
import { useDialogUpdaterContext } from "../../../../context/DialogProvider/DialogProvider";
import { useForm } from "react-hook-form";
import { logInSchema, TLogInSchema } from "./logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../../../context/UserProvider/UserProvider";
import { logIn } from "../../../../services/userService";
import { AxiosError } from "axios";
const LogIn = () => {
  const { openDialog, closeDialog } = useDialogUpdaterContext();
  const { updateUser } = useUserContext();
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
      const user = await logIn(formData);
      updateUser(user);
      closeDialog();
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        if (err.response.data === "email") {
          const message = "An account with this email does not exists";
          setError("email", { message });
        }
        if (err.response.data === "password") {
          const message = "Incorrect password";
          setError("password", { message });
        }
      }
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
        <span className={s.link} onClick={() => openDialog("signup")}>
          Create one
        </span>
      </p>
    </>
  );
};

export default LogIn;
