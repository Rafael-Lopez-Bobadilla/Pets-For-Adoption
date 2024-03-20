import s from './Pet.module.css'
import { useParams } from 'react-router-dom'
const Pet = () => {
  const { id } = useParams()
  return (
    <div className={s.wrapper}>Pet page: {id}</div>
  )
}

export default Pet