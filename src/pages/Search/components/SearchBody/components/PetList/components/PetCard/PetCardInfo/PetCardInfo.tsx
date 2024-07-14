import s from "./PetCardInfo.module.css";
import { memo } from "react";
import { TBreeds } from "../../../../../../../../../services/petfinderService/schemas/PetsSchema";
import { useValidParams } from "../../../../../../../context/ValidParamsContext/context";
type InfoProps = {
  name: string;
  age: string;
  gender: string;
  distance: any;
  breeds: TBreeds;
};
const PetCardInfo = memo(
  ({ name, age, gender, distance, breeds }: InfoProps) => {
    const { params } = useValidParams();
    return (
      <div className={s.info}>
        <h3>{`${name.charAt(0).toUpperCase()}${name
          .slice(1)
          .toLowerCase()}`}</h3>
        <p>
          <span>{age}</span>|<span>{gender}</span>
        </p>
        <p>{breeds.primary}</p>
        {params?.location && <p>{Math.round(distance)} miles away</p>}
      </div>
    );
  }
);

export default PetCardInfo;
