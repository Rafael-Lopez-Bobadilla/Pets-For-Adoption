export interface PetType {
  name: string
  coats: string[]
  colors: string[]
  genders: string[]
  _links: Links
}

export interface Links {
  self: Self
  breeds: Breeds
}

export interface Self {
  href: string
}

export interface Breeds {
  href: string
}