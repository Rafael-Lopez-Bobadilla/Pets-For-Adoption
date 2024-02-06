import s from './SearchBar.module.css'
import pencil from '../../assets/svgs/pencil.svg'
import Select from '../Select/Select'
import usePetTypes from './usePetTypes'

const SearchBar = () => {
  const types = usePetTypes()
  return (
    <div className={s.bar}>
      <div className={s.wrapper}>
        <span>Dogs in adoption in a Long location given by the user
          more long location</span>
        <img src={pencil} />
        <div className={s.select}>
          <Select options={types} />
        </div>
      </div>
    </div >
  )
}

export default SearchBar