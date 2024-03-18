import { useState, createContext, useEffect, useContext } from "react"
import { googleAuth } from "./googleAuth"
import { UserContext } from "../UserProvider/UserProvider"
type SetterContext = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setType: React.Dispatch<React.SetStateAction<string>>
}
export const DialogContext = createContext({ open: false, type: 'none' })
export const DialogSetterContext = createContext<SetterContext>({ setOpen: () => { }, setType: () => { } })
const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('none')
  const { setUser } = useContext(UserContext)
  const onSignIn = async (response: google.accounts.id.CredentialResponse) => {
    const data = await googleAuth(response)
    if (data.status === 'success') {
      setUser(data.user)
      setOpen(false)
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "215994121648-uc647b3pmh2jui4pp6te812880pd5rvk.apps.googleusercontent.com",
      callback: onSignIn,
      use_fedcm_for_prompt: true,
    })
  }, [])
  return (
    <DialogContext.Provider value={{ open, type }}>
      <DialogSetterContext.Provider value={{ setOpen, setType }}>
        {children}
      </DialogSetterContext.Provider>
    </DialogContext.Provider>
  )
}

export default DialogProvider