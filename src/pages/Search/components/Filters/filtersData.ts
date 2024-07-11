import { TSelectedType } from "../../../../services/petfinderService/schemas/TypesSchema";
type TFilters = {
  selectedKey: keyof Omit<TSelectedType, "_links" | "name">;
  label: string;
  paramId: string;
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
