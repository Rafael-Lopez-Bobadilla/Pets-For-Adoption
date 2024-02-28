import s from './Filters.module.css'
import { PetType } from '../../utils/IPetType'
import { useSearchParams } from 'react-router-dom'
import Select from '../Select/Select'
import { Breeds } from './utils/IBreeds'
import { useState, useEffect, useContext } from 'react'
import { getBreeds } from './utils/getBreeds'
import { TokenContext } from '../../../../App'
const Filters = ({ types }: { types: PetType[] }) => {
  const [params] = useSearchParams()
  const token = useContext(TokenContext) as string
  const [breeds, setBreeds] = useState<Breeds>({ data: null, loading: false })
  const selected = types.find((type: PetType) =>
    type.name.toLowerCase() === params.get('type')?.toLocaleLowerCase())
  useEffect(() => {
    if (selected) {
      getBreeds(token, selected._links.breeds.href, setBreeds)
    }
  }, [selected])
  return (
    <>{selected && <>
      {breeds.data && <div className={s.filter}>
        <span>Breeds</span>
        <Select options={breeds.data} field='breed' />
      </div>}
      {selected.coats.length > 0 && <div className={s.filter}>
        <span>Coats</span>
        <Select options={selected.coats} field='coat' />
      </div>}
      {selected.colors.length > 0 && <div className={s.filter}>
        <span>Colors</span>
        <Select options={selected.colors} field='color' />
      </div>}
      {selected.genders.length > 0 && <div className={s.filter}>
        <span>Genders</span>
        <Select options={selected.genders} field='gender' />
      </div>}
    </>
    }
    </>
  )
}

export default Filters