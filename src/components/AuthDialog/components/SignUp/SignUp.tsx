import s from "../../AuthDialog.module.css";
import { useForm } from "react-hook-form";
import { useDialogContext } from "../../../DialogProvider/DialogProvider";
import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "./signUpSchema";
import { z } from "zod";
import { signUpRequest } from "./signUpRequest";
import { UserContext } from "../../../UserProvider/UserProvider";
export type SignUpSchema = z.infer<typeof signUpSchema>;
const SignUp = () => {
  const { handleDialogOpen, handleDialogClose } = useDialogContext();
  const { setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data: SignUpSchema) => {
    signUpRequest(data, handleDialogClose, setError, setUser);
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
        <span className={s.link} onClick={() => handleDialogOpen("login")}>
          Log in
        </span>
      </p>
    </>
  );
};

export default SignUp;
