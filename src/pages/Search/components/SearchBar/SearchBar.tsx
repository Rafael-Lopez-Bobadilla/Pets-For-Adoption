import s from './SearchBar.module.css'
import pencil from '../../../../assets/svgs/pencil.svg'
import Select from '../Select/Select'
import PlacesInput from '../PlacesInput/PlacesInput'
import { useState, useContext } from 'react'
import OverlaySearch from './OverlaySearch/OverlaySearch'
import { PetType } from '../../utils/IPetType'
import { LocationContext } from '../LocationProvider/LocationProvider'
import { useSearchParams } from 'react-router-dom'
import { TypesContext } from '../PetsInfoProvider/PetsInfoProvider'
const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [params] = useSearchParams()
  const { location } = useContext(LocationContext)
  const types = useContext(TypesContext)
  const names = types ? types.map((type: PetType) => type.name) : null
  return (
    <div className={s.bar}>
      <div className={s.wrapper}>
        <span>{params.get('type')}s in adoption in {location ?
          location.address : 'North America'}</span>
        <img src={pencil} onClick={() => setIsOpen(true)} />
        <div className={s.select}>
          {names && <Select options={names} field='type' />}
        </div>
        <div className={s.input}>
          <PlacesInput />
        </div>
        {isOpen &&
          <OverlaySearch names={names} setIsOpen={setIsOpen} />
        }
      </div>
    </div >
  )
}

export default SearchBar