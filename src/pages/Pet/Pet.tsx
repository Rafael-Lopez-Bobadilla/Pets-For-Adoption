import s from './Pet.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { TokenContext } from '../../components/TokenProvider/TokenProvider'
import { Pet as IPet } from '../Search/components/SearchBody/PetList/utils/IPets'
import Photos from './components/Photos/Photos'
import FavButton from '../../components/FavButton/FavButton'
import NoUserDialog from '../../components/NoUserDialog/NoUserDialog'
import { CircularProgress } from '@mui/material'
const Pet = () => {
  const token = useContext(TokenContext)
  const { id } = useParams()
  const [pet, setPet] = useState<IPet | null>(null)
  const [open, setOpen] = useState(false)
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
  const getString = () => {
    let str = pet?.tags.reduce((tag, current) => `${current}, ${tag}`)
    if (pet?.attributes.house_trained) str = `${str}, House trained`
    return str
  }
  return (
    <div className={s.wrapper}>
      {!pet && <div className={s.loading}><CircularProgress size={30} /></div>}
      {pet && <>
        <Photos pet={pet} />
        <div className={s.info}>
          <div className={s.name}>
            <h2>{pet.name}</h2>
            <FavButton pet={pet} setOpen={setOpen} background='#e6dede' />
            <NoUserDialog openDialog={open} setOpenDialog={setOpen} />
          </div>
          <h3>Contact</h3>
          <p><span>Email:</span> {pet.contact.email}</p>
          {pet.contact.phone && <p><span>Phone:</span> {pet.contact.phone}</p>}
          {pet.contact.address.address1 && <p><span>Address 1:</span> {pet.contact.address.address1}</p>}
          {pet.contact.address.address2 && <p><span>Address 2:</span> {pet.contact.address.address2}</p>}
          <p><span>Postcode:</span> {pet.contact.address.postcode}</p>
          <p><span>City:</span> {pet.contact.address.city}</p>
          <p><span>State:</span> {pet.contact.address.state}</p>
          <p><span>Country:</span> {pet.contact.address.country}</p>
          <h3>About</h3>
          <p><span>Breed:</span> {pet.breeds.primary}</p>
          <p><span>Gender:</span> {pet.gender}</p>
          <p><span>Age:</span> {pet.age}</p>
          {pet.tags.length > 0 && <p><span>Characteristics:</span>{` ${getString()}`}</p>}
          {pet.coat && <p><span>Coat length:</span> {pet.coat}</p>}
          <p><span>Color:</span> {pet.colors.primary}</p>
          <p><span>Species:</span> {pet.species}</p>
          <p><span>Size:</span> {pet.size}</p>
          <p><span>Health:</span>
            {pet.attributes.shots_current && <li>Vaccinations up to date</li>}
            {pet.attributes.spayed_neutered && <li>spayed / neutered</li>}
          </p>
        </div>
      </>}
    </div>
  )
}

export default Pet