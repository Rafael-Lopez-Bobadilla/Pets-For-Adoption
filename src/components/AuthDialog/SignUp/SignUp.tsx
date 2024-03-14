import s from './SignUp.module.css'
const SignUp = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className={s.signup}>
      <h3>Sign up</h3>
      <form className={s.form} onSubmit={handleSubmit}>
        <label>Username</label>
        <input />
        <label>Email</label>
        <input />
        <label>Password</label>
        <input />
        <label>Confirm Password</label>
        <input />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp