import { TSelectedType } from "../../../../services/petfinderService/schemas/TypesSchema";
import { TParamKey } from "../../utils/paramsSchema";
type TFilters = {
  selectedKey: keyof Omit<TSelectedType, "_links" | "name">;
  label: string;
  paramKey: TParamKey;
};
export const filtersData: TFilters[] = [
  {
    selectedKey: "coats",
    label: "Coats",
    paramKey: "coat",
  },
  {
    selectedKey: "colors",
    label: "Colors",
    paramKey: "color",
  },
  {
    selectedKey: "genders",
    label: "Genders",
    paramKey: "gender",
  },
];
