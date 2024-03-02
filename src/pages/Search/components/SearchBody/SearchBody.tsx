import s from './SearchBody.module.css'
import PetList from "./PetList/PetList"
import FiltersApplied from './FiltersApplied/FiltersApplied'
const SearchBody = () => {
  return (
    <>
      <h2 className={s.heading}>Find pets for adoption in North America</h2>
      <FiltersApplied />
      <PetList />
    </>
  )
}

export default SearchBody