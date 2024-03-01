import s from './SearchBody.module.css'
import PetList from "./PetList/PetList"
const SearchBody = () => {
  return (
    <>
      <h2 className={s.heading}>Find pets for adoption in North America</h2>
      <PetList />
    </>
  )
}

export default SearchBody