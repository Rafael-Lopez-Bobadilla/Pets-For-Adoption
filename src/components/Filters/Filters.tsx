import s from './Filters.module.css'
import { PetType } from '../../pages/Search/IPetType'
import { useSearchParams } from 'react-router-dom'
import useBreeds from './useBreeds'
import Select from '../Select/Select'

const Filters = ({ types }: { types: PetType[] }) => {
  const [params] = useSearchParams()
  const type = types.find(type => type.name.toLocaleLowerCase() === params.get('type')) as PetType
  const { breeds, isLoading } = useBreeds(type._links.breeds.href, params)

  return (
    <>
      <div className={s.filter}>
        <span>Breeds</span>
        {!isLoading && <Select options={breeds} field='breed' />}
      </div>
      {type.coats.length > 0 && <div className={s.filter}>
        <span>Coats</span>
        <Select options={type.coats} field='coat' />
      </div>}
      {type.colors.length > 0 && <div className={s.filter}>
        <span>Colors</span>
        <Select options={type.colors} field='color' />
      </div>}
      {type.genders.length > 0 && <div className={s.filter}>
        <span>Genders</span>
        <Select options={type.genders} field='gender' />
      </div>}
    </>
  )
}

export default Filters