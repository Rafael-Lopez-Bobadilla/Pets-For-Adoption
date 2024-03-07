import s from './SearchBody.module.css'
import PetList from "./PetList/PetList"
import filters from '../../../../assets/svgs/filters.svg'
import FiltersApplied from './FiltersApplied/FiltersApplied'
import { useState } from 'react'
import Filters from '../Filters/Filters'
import closeBlack from '../../../../assets/svgs/closeBlack.svg'
const SearchBody = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeOverlay = () => setIsOpen(false)
  return (
    <>
      <h2 className={s.heading}>Find pets for adoption in North America</h2>
      <button className={s.button} onClick={() => setIsOpen(true)}>Filters
        <img src={filters} />
      </button>
      {isOpen && <div className={s.overlay}>
        <div className={s.filters}>
          <Filters closeOverlay={closeOverlay} />
        </div>
        <img src={closeBlack} onClick={() => setIsOpen(false)} />
      </div>}
      <FiltersApplied />
      <PetList />
    </>
  )
}

export default SearchBody