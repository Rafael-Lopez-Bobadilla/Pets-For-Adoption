import s from './OverlaySearch.module.css'
import Select from '../Select/Select'
import PlacesInput from '../PlacesInput/PlacesInput'
import close from '../../assets/svgs/close.svg'
type OverlayParams = {
  names: string[] | undefined,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const OverlaySearch = ({ names, setIsOpen }: OverlayParams) => {
  return (
    <div className={s.overlay}>
      <div className={s.control}>
        <span>Pet Type</span>
        {names && <Select options={names} field='type' />}
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