import s from './OverlaySearch.module.css'
import PlacesInput from '../../../PlacesInput/PlacesInput'
import closeBlack from '../../../../../../assets/svgs/closeBlack.svg'
import TypesSelect from '../TypesSelect/TypesSelect'
type OverlayParams = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const OverlaySearch = ({ setIsOpen }: OverlayParams) => {
  const closeOverlay = () => {
    setIsOpen(false)
  }
  return (
    <div className={s.overlay}>
      <div>
        <span>Pet Type</span>
        <TypesSelect />
      </div>
      <div>
        <span>Location
          <p>{'(Only places in North America)'}</p>
        </span>
        <PlacesInput closeOverlay={closeOverlay} />
      </div>
      <img src={closeBlack} onClick={() => setIsOpen(false)} />
    </div>
  )
}

export default OverlaySearch