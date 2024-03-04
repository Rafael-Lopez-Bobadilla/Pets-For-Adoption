import s from './OverlaySearch.module.css'
import Select from '../../Select/Select'
import PlacesInput from '../../PlacesInput/PlacesInput'
import closeBlack from '../../../../../assets/svgs/closeBlack.svg'
type OverlayParams = {
  names: string[] | null,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const OverlaySearch = ({ names, setIsOpen }: OverlayParams) => {
  const closeOverlay = () => {
    setIsOpen(false)
  }
  return (
    <div className={s.overlay}>
      <div>
        <span>Pet Type</span>
        {names && <Select options={names} field='type' closeOverlay={closeOverlay} />}
      </div>
      <div>
        <span>Location</span>
        <PlacesInput closeOverlay={closeOverlay} />
      </div>
      <img src={closeBlack} onClick={() => setIsOpen(false)} />
    </div>
  )
}

export default OverlaySearch