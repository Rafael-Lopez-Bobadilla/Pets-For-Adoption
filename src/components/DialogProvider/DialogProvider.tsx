import { useState, createContext, useEffect } from "react"
import { googleAuth } from "./googleAuth"
type SetterContext = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setType: React.Dispatch<React.SetStateAction<string>>
}
export const DialogContext = createContext({ open: false, type: 'none' })
export const DialogSetterContext = createContext<SetterContext>({ setOpen: () => { }, setType: () => { } })
const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('none')
  const onSignIn = (response: google.accounts.id.CredentialResponse) => {
    googleAuth(response)
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