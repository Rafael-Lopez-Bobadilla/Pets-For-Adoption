import s from "./PetCardInfo.module.css";
import { TBreeds } from "../../../../../../../../../services/petfinderService/schemas/PetsSchema";
type InfoProps = {
  children?: React.ReactNode;
  name: string;
  age: string;
  gender: string;
  breeds: TBreeds;
};
const PetCardInfo = ({
  children = <></>,
  name,
  age,
  gender,
  breeds,
}: InfoProps) => {
  return (
    <div className={s.info}>
      <h3>{`${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`}</h3>
      <p>
        <span>{age}</span>
        <span>{gender}</span>
      </p>
      <p>{breeds.primary}</p>
      <p>{children}</p>
    </div>
  );
};

export default PetCardInfo;
