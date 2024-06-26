import s from "../AuthForm.module.css";
import { useForm } from "react-hook-form";
import { useDialog } from "../../../context/DialogProvider/DialogProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUpSchema } from "./signUpSchema";
import { signUp } from "../../../services/userService";
import { useUserContext } from "../../../context/UserProvider/UserProvider";
import { AxiosError } from "axios";
import ErrorDialog from "../../ErrorDialog/ErrorDialog";
const SignUp = () => {
  const { showLogIn, closeDialog, showDialog } = useDialog();
  const { updateUser } = useUserContext();
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
      const user = await signUp(data);
      updateUser(user);
      closeDialog();
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        const message = "An account with this email already exists";
        setError("email", { message });
        return;
      }
      showDialog("", <ErrorDialog message="Unsuccessful Sign Up" />);
    }
  };
  return (
    <>
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
    </>
  );
};

export default SignUp;