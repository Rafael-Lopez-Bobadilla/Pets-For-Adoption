import { useState, createContext } from "react"
type SetterContext = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setType: React.Dispatch<React.SetStateAction<string>>
}
export const DialogContext = createContext({ open: false, type: 'none' })
export const DialogSetterContext = createContext<SetterContext>({ setOpen: () => { }, setType: () => { } })
const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('none')
  return (
    <DialogContext.Provider value={{ open, type }}>
      <DialogSetterContext.Provider value={{ setOpen, setType }}>
        {children}
      </DialogSetterContext.Provider>
    </DialogContext.Provider>
  )
}

export default DialogProvider