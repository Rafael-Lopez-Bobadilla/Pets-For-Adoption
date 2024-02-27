import { PetsData } from "../../utils/IPets"

const PetList = ({ pets }: { pets: PetsData | null }) => {

  return (
    <div>
      {pets && pets.animals.map(pet => <div key={pet.id}>{pet.name}</div>)}
    </div>
  )
}

export default PetList