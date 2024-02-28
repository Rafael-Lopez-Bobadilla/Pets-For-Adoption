import s from './Filters.module.css'
import { PetType } from '../../utils/IPetType'
import { useSearchParams } from 'react-router-dom'
import Select from '../Select/Select'
import { Breeds } from '../../utils/IBreeds'
const Filters = ({ types, breeds }: { types: PetType[], breeds: Breeds }) => {
  const [params] = useSearchParams()
  const selected = types.find((type: PetType) =>
    type.name.toLowerCase() === params.get('type')?.toLocaleLowerCase())
  return (
    <>{selected && <>
      {breeds.data && <div className={s.filter}>
        <span>Breeds</span>
        <Select options={breeds.data} field='breeds' />
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