import { Dialog } from "@mui/material"
import { useContext } from "react"
import { DialogContext, DialogSetterContext } from "../DialogProvider/DialogProvider"
import SignUp from "./SignUp/SignUp"
import LogIn from "./LogIn/LogIn"
const AuthDialog = () => {
  const { open, type } = useContext(DialogContext)
  const { setOpen } = useContext(DialogSetterContext)
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      {type === 'signup' && <SignUp />}
      {type === 'login' && <LogIn />}
    </Dialog>
  )
}

export default AuthDialog