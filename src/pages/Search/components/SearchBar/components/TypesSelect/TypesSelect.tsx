import Select from "../../../Select/Select"
import { TypesContext } from "../../../PetsInfoProvider/PetsInfoProvider"
import { PetType } from "../../../../utils/IPetType"
import { useContext } from "react"
const TypesSelect = () => {
  const types = useContext(TypesContext)
  const names = types ? types.map((type: PetType) => type.name) : null
  return (
    <>
      {names && <Select options={names} field='type' />}
    </>
  )
}

export default TypesSelect