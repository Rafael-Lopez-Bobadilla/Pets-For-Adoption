import s from './SearchBar.module.css'
import pencil from '../../assets/svgs/pencil.svg'
import Select from '../Select/Select'
import PlacesInput from '../PlacesInput/PlacesInput'
import { useState } from 'react'
import OverlaySearch from './OverlaySearch'

const SearchBar = ({ names }: { names: string[] | undefined }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={s.bar}>
      <div className={s.wrapper}>
        <span>Dogs in adoption in a Long location given by the user
          more long location</span>
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