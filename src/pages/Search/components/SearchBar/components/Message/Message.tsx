import { useSearchParams } from "react-router-dom"
import { LocationContext } from "../../../LocationProvider/LocationProvider"
import { useContext } from "react"
import s from './Message.module.css'
import { memo } from "react"
const Message = memo(() => {
  const [params] = useSearchParams()
  const { location } = useContext(LocationContext)
  return (
    <span className={s.message}>{params.get('type')}s in adoption in {location ?
      location.address : 'North America'}</span>
  )
})

export default Message