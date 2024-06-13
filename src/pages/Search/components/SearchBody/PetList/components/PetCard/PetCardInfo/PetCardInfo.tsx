import s from "./PetCardInfo.module.css";
import { Breeds } from "../../../utils/IPets";
import { useSearchParams } from "react-router-dom";
import { memo } from "react";
type InfoProps = {
  name: string;
  age: string;
  gender: string;
  distance: any;
  breeds: Breeds;
};
const PetCardInfo = memo(
  ({ name, age, gender, distance, breeds }: InfoProps) => {
    const [params] = useSearchParams();
    return (
      <div className={s.info}>
        <h3>{`${name.charAt(0).toUpperCase()}${name
          .slice(1)
          .toLowerCase()}`}</h3>
        <p>
          <span>{age}</span>|<span>{gender}</span>
        </p>
        <p>{breeds.primary}</p>
        {params.has("location") && <p>{Math.round(distance)} miles away</p>}
      </div>
    );
  }
);

export default PetCardInfo;
