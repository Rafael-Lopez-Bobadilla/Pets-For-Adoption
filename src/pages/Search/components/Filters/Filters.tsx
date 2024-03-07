import s from './Filters.module.css'
import { PetType } from '../../utils/IPetType'
import { useSearchParams } from 'react-router-dom'
import Select from '../Select/Select'
import { Breeds } from './utils/IBreeds'
import { useState, useEffect, useContext } from 'react'
import { getBreeds } from './utils/getBreeds'
import { TokenContext } from '../../../../App'
import Autocomplete from '../Autocomplete/Autocomplete'
const Filters = ({ types, closeOverlay }: { types: PetType[], closeOverlay?: () => void }) => {
  const [params] = useSearchParams()
  const token = useContext(TokenContext)
  const [breeds, setBreeds] = useState<Breeds>({ data: null, loading: false })
  const selected = types.find((type: PetType) =>
    type.name.toLowerCase() === params.get('type')?.toLocaleLowerCase())
  useEffect(() => {
    if (selected) {
      getBreeds(token, selected._links.breeds.href, setBreeds)
    }
  }, [selected, token])
  return (
    <>{selected && <>
      {breeds.data && <div className={s.filter}>
        <span>Breeds</span>
        <Autocomplete options={['Any', ...breeds.data]} field='breed' closeOverlay={closeOverlay} />
      </div>}
      {selected.coats.length > 0 && <div className={s.filter}>
        <span>Coats</span>
        <Select options={['Any', ...selected.coats]} field='coat' closeOverlay={closeOverlay} />
      </div>}
      {selected.colors.length > 0 && <div className={s.filter}>
        <span>Colors</span>
        <Autocomplete options={['Any', ...selected.colors]} field='color' closeOverlay={closeOverlay} />
      </div>}
      {selected.genders.length > 0 && <div className={s.filter}>
        <span>Genders</span>
        <Select options={['Any', ...selected.genders]} field='gender' closeOverlay={closeOverlay} />
      </div>}
    </>
    }
    </>
  )
}

export default Filters