import s from '../AuthDialog.module.css'
import { DialogSetterContext } from '../../DialogProvider/DialogProvider'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { logInSchema } from './logInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
type LogInSchema = z.infer<typeof logInSchema>
const LogIn = () => {
  const { setType } = useContext(DialogSetterContext)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<LogInSchema>({
    resolver: zodResolver(logInSchema)
  })
  const onSubmit = (data: LogInSchema) => {
    console.log(data)
  }
  return (
    <div className={s.container}>
      <h3>Log In</h3>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{`${errors.email.message}`}</p>}
        <label>Password</label>
        <input type='password' {...register('password')} />
        {errors.password && <p>{`${errors.password.message}`}</p>}
        <button disabled={isSubmitting}>Sign Up</button>
      </form>
      <p>{`No account? `}
        <span className={s.link} onClick={() => setType('signup')}>Create one</span>
      </p>
    </div>
  )
}

export default LogIn