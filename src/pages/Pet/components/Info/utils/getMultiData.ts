import { TPet } from "../../../../../services/petfinderService/schemas/PetsSchema";

export const getMultiData = (data: TPet) => {
  return [
    {
      key: "Breeds",
      values: [
        data.breeds.primary,
        data.breeds.secondary,
        data.breeds.mixed && "Mixed",
      ],
    },
    {
      key: "Colors",
      values: [
        data.colors.primary,
        data.colors.secondary,
        data.colors.tertiary,
      ],
    },
    {
      key: "Characteristics",
      values: data.tags,
    },
    {
      key: "Health",
      values: [
        data.attributes.shots_current && "Vaccinations up to date",
        data.attributes.spayed_neutered && "spayed / neutered",
      ],
    },
  ];
};
