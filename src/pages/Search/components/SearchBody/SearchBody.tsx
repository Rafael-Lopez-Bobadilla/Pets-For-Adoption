import s from './SearchBody.module.css'
import PetList from "./PetList/PetList"
import filters from '../../../../assets/svgs/filters.svg'
import FiltersApplied from './FiltersApplied/FiltersApplied'
import { PetType } from '../../utils/IPetType'
const SearchBody = ({ types }: { types: PetType[] | null }) => {
  console.log(types)
  return (
    <>
      <h2 className={s.heading}>Find pets for adoption in North America</h2>
      <button className={s.button}>Filters
        <img src={filters} />
      </button>
      <FiltersApplied />
      <PetList />
    </>
  )
}

export default SearchBody