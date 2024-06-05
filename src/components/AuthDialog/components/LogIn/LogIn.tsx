import s from "../../AuthDialog.module.css";
import { useDialogUpdaterContext } from "../../../DialogProvider/DialogProvider";
import { useForm } from "react-hook-form";
import { logInSchema } from "./logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logInRequest } from "./loginRequest";
import { useUserContext } from "../../../UserProvider/UserProvider";
export type LogInSchema = z.infer<typeof logInSchema>;
const LogIn = () => {
  const { openDialog, closeDialog } = useDialogUpdaterContext();
  const { updateUser } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<LogInSchema>({
    resolver: zodResolver(logInSchema),
  });
  const onSubmit = (formData: LogInSchema) => {
    logInRequest(formData, closeDialog, setError, updateUser);
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
