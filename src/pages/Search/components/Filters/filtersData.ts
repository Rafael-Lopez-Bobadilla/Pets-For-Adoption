import { TSelectedType } from "../../../../services/petfinderService/schemas/TypesSchema";
import { TValidParams } from "../../context/ValidParamsContext/paramsSchema";
type TFilters = {
  selectedKey: keyof Omit<TSelectedType, "_links" | "name">;
  label: string;
  paramId: keyof TValidParams;
};
export const filtersData: TFilters[] = [
  {
    selectedKey: "coats",
    label: "Coats",
    paramId: "coat",
  },
  {
    selectedKey: "colors",
    label: "Colors",
    paramId: "color",
  },
  {
    selectedKey: "genders",
    label: "Genders",
    paramId: "gender",
  },
];
