import { Pets } from "../../utils/IPets"

const PetList = ({ pets }: { pets: Pets }) => {

  return (
    <div>
      {pets.data && pets.data.animals.map(pet => <div key={pet.id}>{pet.name}</div>)}
    </div>
  )
}

export default PetList