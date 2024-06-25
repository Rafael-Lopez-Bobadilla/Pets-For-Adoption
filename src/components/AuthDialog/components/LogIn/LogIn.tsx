import s from "../../AuthDialog.module.css";
import { useAuthDialogUpdater } from "../../../../context/DialogProvider/DialogProvider";
import { useForm } from "react-hook-form";
import { logInSchema, TLogInSchema } from "./logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../../../context/UserProvider/UserProvider";
import { logIn } from "../../../../services/userService";
import { handleError } from "./handleError";
const LogIn = () => {
  const { openDialog, closeDialog } = useAuthDialogUpdater();
  const { updateUser } = useUserContext();
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
      const user = await logIn(formData);
      updateUser(user);
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
        <span className={s.link} onClick={() => openDialog("signup")}>
          Create one
        </span>
      </p>
    </>
  );
};

export default LogIn;
