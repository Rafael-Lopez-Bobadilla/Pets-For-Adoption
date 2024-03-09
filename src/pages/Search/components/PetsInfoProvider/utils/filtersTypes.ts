import { PetType } from "../../../utils/IPetType"
export type BreedType = {
  name: string,
  _links: {
    type: {
      href: string
    }
  }
}

export interface Breeds {
  data: string[] | null,
  loading: boolean
}

export interface FiltersInfo {
  selected: PetType | undefined,
  breeds: Breeds
}