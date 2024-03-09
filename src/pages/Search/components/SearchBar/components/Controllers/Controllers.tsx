import TypesSelect from "../TypesSelect/TypesSelect"
import PlacesInput from "../../../PlacesInput/PlacesInput"
import s from './Controllers.module.css'
import { memo } from "react"
const Controllers = memo(() => {
  return (
    <>
      <div className={s.select}>
        <TypesSelect />
      </div>
      <div className={s.input}>
        <PlacesInput />
      </div>
    </>
  )
})

export default Controllers