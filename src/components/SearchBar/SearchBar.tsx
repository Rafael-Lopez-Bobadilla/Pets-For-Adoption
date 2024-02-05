import s from './SearchBar.module.css'
import pencil from '../../assets/svgs/pencil.svg'
const SearchBar = () => {
  return (
    <div className={s.bar}>
      <div className={s.wrapper}>
        <span>Dogs in adoption in a Long location given by the user
          more long location</span>
        <img src={pencil} />
        <div className={s.select}>

        </div>
      </div>
    </div >
  )
}

export default SearchBar