import s from './Filters.module.css'
import Select from '../Select/Select'
import { useContext } from 'react'
import BreedsFilter from './BreedsFilter/BreedsFilter'
import { TypesContext } from '../PetsInfoProvider/PetsInfoProvider'
import Autocomplete from '../Autocomplete/Autocomplete'
import { useSearchParams } from 'react-router-dom'
import { PetType } from '../../utils/IPetType'
const Filters = ({ closeOverlay }: { closeOverlay?: () => void }) => {
  const types = useContext(TypesContext)
  const [params] = useSearchParams()
  const selected = types?.find((type: PetType) =>
    type.name.toLowerCase() === params.get('type')?.toLowerCase())
  console.log('render')
  return (
    <>{selected && <>
      <div className={s.filter}>
        <BreedsFilter closeOverlay={closeOverlay} />
      </div>
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