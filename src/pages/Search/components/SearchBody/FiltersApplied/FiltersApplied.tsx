import s from './FiltersApplied.module.css'
import { useSearchParams } from 'react-router-dom'
import close from '../../../../../assets/svgs/close.svg'
const options = ['breed', 'coat', 'color', 'gender']
const FiltersApplied = () => {
  const [params, setParams] = useSearchParams()
  const deleteParam = (filter: string) => {
    const newParams = new URLSearchParams(params)
    newParams.delete(filter)
    setParams(newParams)
  }
  const clearAll = () => {
    const newParams = new URLSearchParams()
    newParams.set('type', params.get('type') as string)
    params.get('location') && newParams.set('location', params.get('location') as string)
    setParams(newParams)
  }
  const filters = options.filter(option => params.has(option))
  return (
    <>
      {(params.size > 2 || (!params.has('location') && params.size > 1)) &&
        <>
          <p>Filters Applied:</p>
          <div className={s.filters}>
            {filters.map(filter => {
              return (
                <div className={s.filter} key={filter}>{params.get(filter)}
                  <img src={close} onClick={() => deleteParam(filter)} />
                </div>
              )
            })}
            <div className={s.clear}><span onClick={clearAll}>Clear all</span></div>
          </div>
        </>
      }
    </>
  )
}

export default FiltersApplied