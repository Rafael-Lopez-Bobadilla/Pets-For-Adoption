import { TPet } from "../../../../../services/petfinderService/schemas/PetsSchema";

export const getAboutData = (data: TPet) => {
  return [
    {
      key: "Gender",
      value: data.gender,
    },
    {
      key: "Age",
      value: data.age,
    },
    {
      key: "Coat length",
      value: data.coat,
    },
    {
      key: "Species",
      value: data.species,
    },
    {
      key: "Size",
      value: data.size,
    },
  ];
};
