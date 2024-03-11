import { BreedsContext } from "../../PetsInfoProvider/PetsInfoProvider"
import { useContext } from "react"
import Autocomplete from "../../Autocomplete/Autocomplete"
const BreedsFilter = ({ closeOverlay }: { closeOverlay?: () => void }) => {
  const breeds = useContext(BreedsContext)
  return (
    <>
      <span>Breeds</span>
      {breeds &&
        <Autocomplete options={['Any', ...breeds]} field='breed' closeOverlay={closeOverlay} />}
    </>
  )
}

export default BreedsFilter