import s from './OverlaySearch.module.css'
import Select from '../Select/Select'
import PlacesInput from '../PlacesInput/PlacesInput'
import close from '../../assets/svgs/close.svg'
type OverlayParams = {
  types: string[] | null,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const OverlaySearch = ({ types, setIsOpen }: OverlayParams) => {
  return (
    <div className={s.overlay}>
      <div className={s.control}>
        <span>Pet Type</span>
        <Select options={types} />
      </div>
      <div className={s.control}>
        <span>Location</span>
        <PlacesInput />
      </div>
      <img src={close} onClick={() => setIsOpen(false)} />
    </div>
  )
}

export default OverlaySearch