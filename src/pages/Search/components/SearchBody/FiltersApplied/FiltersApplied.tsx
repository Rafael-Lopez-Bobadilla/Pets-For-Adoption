import s from './FiltersApplied.module.css'
import { useSearchParams } from 'react-router-dom'
import close from '../../../../../assets/svgs/close.svg'
const filters = ['breed', 'coat', 'color', 'gender']
const FiltersApplied = () => {
  const [params, setParams] = useSearchParams()
  const deleteParam = (filter: string) => {
    const newParams = new URLSearchParams(params)
    newParams.delete(filter)
    setParams(newParams)
  }
  return (
    <>
      {(params.size > 2 || (!params.has('location') && params.size > 1)) &&
        <p>Filters Applied:</p>
      }
      <div className={s.filters}>
        {filters.map(filter => {
          return (<>
            {params.has(filter) ?
              <div className={s.filter}>{params.get(filter)}
                <img src={close} onClick={() => deleteParam(filter)} />
              </div> :
              <></>}
          </>
          )
        })}
      </div>
    </>
  )
}

export default FiltersApplied