import s from '../../AuthDialog.module.css'
import { DialogSetterContext } from '../../../DialogProvider/DialogProvider'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { logInSchema } from './logInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { logInRequest } from './loginRequest'
export type LogInSchema = z.infer<typeof logInSchema>
const LogIn = () => {
  const { setType, setOpen } = useContext(DialogSetterContext)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError
  } = useForm<LogInSchema>({
    resolver: zodResolver(logInSchema)
  })
  const onSubmit = (data: LogInSchema) => {
    logInRequest(data, setOpen, setError)
  }
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{`${errors.email.message}`}</p>}
        <label>Password</label>
        <input type='password' {...register('password')} />
        {errors.password && <p>{`${errors.password.message}`}</p>}
        <button disabled={isSubmitting}>Sign Up</button>
      </form>
      <p className={s.alt}>{`No account? `}
        <span className={s.link} onClick={() => setType('signup')}>Create one</span>
      </p>
    </>
  )
}

export default LogIn