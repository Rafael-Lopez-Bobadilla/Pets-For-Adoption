export interface Pets {
  data: PetsData | null,
  loading: boolean
}

export interface PetsData {
  animals: Pet[]
  pagination: Pagination
}

export interface Pet {
  id: number
  organization_id: string
  url: string
  type: string
  species: string
  breeds: Breeds
  colors: Colors
  age: string
  gender: string
  size: string
  coat?: string
  attributes: Attributes
  environment: Environment
  tags: string[]
  name: string
  description?: string
  organization_animal_id?: string
  photos: Photo[]
  primary_photo_cropped?: PrimaryPhotoCropped
  videos: Video[]
  status: string
  status_changed_at: string
  published_at: string
  distance: any
  contact: Contact
  _links: Links
}

export interface Breeds {
  primary: string
  secondary?: string
  mixed: boolean
  unknown: boolean
}

export interface Colors {
  primary: string
  secondary?: string
  tertiary: any
}

export interface Attributes {
  spayed_neutered: boolean
  house_trained: boolean
  declawed: any
  special_needs: boolean
  shots_current: boolean
}

export interface Environment {
  children?: boolean
  dogs?: boolean
  cats?: boolean
}

export interface Photo {
  small: string
  medium: string
  large: string
  full: string
}

export interface PrimaryPhotoCropped {
  small: string
  medium: string
  large: string
  full: string
}

export interface Video {
  embed: string
}

export interface Contact {
  email: string
  phone?: string
  address: Address
}

export interface Address {
  address1?: string
  address2?: string
  city: string
  state: string
  postcode: string
  country: string
}

export interface Links {
  self: Self
  type: Type
  organization: Organization
}

export interface Self {
  href: string
}

export interface Type {
  href: string
}

export interface Organization {
  href: string
}

export interface Pagination {
  count_per_page: number
  total_count: number
  current_page: number
  total_pages: number
  _links: Links2
}

export interface Links2 {
  next: Next
}

export interface Next {
  href: string
}