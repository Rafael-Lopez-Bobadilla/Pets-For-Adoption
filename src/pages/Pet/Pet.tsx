import s from './Pet.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { TokenContext } from '../../components/TokenProvider/TokenProvider'
import { Pet as IPet } from '../Search/components/SearchBody/PetList/utils/IPets'
import Slider from './Slider/Slider'
const Pet = () => {
  const token = useContext(TokenContext)
  const { id } = useParams()
  const [pet, setPet] = useState<IPet | null>(null)
  const getPet = async () => {
    const res = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    setPet(data.animal)
    console.log(data.animal)
  }
  useEffect(() => {
    if (token) getPet()
  }, [token])
  return (
    <div className={s.wrapper}>
      {pet && <>
        <Slider pet={pet} />
      </>}
    </div>
  )
}

export default Pet