import s from './Favorites.module.css'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../components/UserProvider/UserProvider'
import { TokenContext } from '../../components/TokenProvider/TokenProvider'
import { getPet } from './getPet'
import { Pet } from '../Search/components/SearchBody/PetList/utils/IPets'
import PetCard from '../Search/components/SearchBody/PetList/components/PetCard/PetCard'
const Favorites = () => {
  const { user } = useContext(UserContext)
  const token = useContext(TokenContext)
  const [favorites, setFavorites] = useState<Pet[]>([])
  useEffect(() => {
    if (token && user && favorites.length === 0) {
      user.favorites.forEach(id => {
        getPet(id, token, setFavorites)
      })
    }
  }, [token, user])
  return (
    <div className={s.wrapper}>
      <h1>{`My Favorites (${user?.favorites.length})`}</h1>
      <div className={s.list}>
        {favorites.map(pet => {
          return <div className={s.card} key={pet.id}><PetCard pet={pet} /></div>
        })}
      </div>
    </div>
  )
}

export default Favorites