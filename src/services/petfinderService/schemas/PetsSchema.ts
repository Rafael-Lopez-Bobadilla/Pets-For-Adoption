import { z } from "zod";

export const breedsSchema = z.object({
  primary: z.string().nullable(),
  secondary: z.string().optional().nullable(),
  mixed: z.boolean().nullable(),
  unknown: z.boolean(),
});

export const colorsSchema = z.object({
  primary: z.string().nullable(),
  secondary: z.string().optional().nullable(),
  tertiary: z.any(),
});

export const attributesSchema = z.object({
  spayed_neutered: z.boolean(),
  house_trained: z.boolean(),
  declawed: z.boolean().nullable(),
  special_needs: z.boolean(),
  shots_current: z.boolean(),
});

export const environmentSchema = z.object({
  children: z.boolean().optional().nullable(),
  dogs: z.boolean().optional().nullable(),
  cats: z.boolean().optional().nullable(),
});

export const photoSchema = z.object({
  small: z.string(),
  medium: z.string(),
  large: z.string(),
  full: z.string(),
});

export const primaryPhotoCroppedSchema = z.object({
  small: z.string(),
  medium: z.string(),
  large: z.string(),
  full: z.string(),
});

export const videoSchema = z.object({
  embed: z.string(),
});

export const addressSchema = z.object({
  address1: z.string().optional().nullable(),
  address2: z.string().optional().nullable(),
  city: z.string(),
  state: z.string(),
  postcode: z.string(),
  country: z.string(),
});

export const selfSchema = z.object({
  href: z.string(),
});

export const typeSchema = z.object({
  href: z.string(),
});

export const organizationSchema = z.object({
  href: z.string(),
});

export const nextSchema = z.object({
  href: z.string(),
});

export const contactSchema = z.object({
  email: z.string().nullable(),
  phone: z.string().optional().nullable(),
  address: addressSchema,
});

export const linksSchema = z.object({
  self: selfSchema,
  type: typeSchema,
  organization: organizationSchema,
});

export const links2Schema = z.object({
  next: nextSchema,
});

export const petSchema = z.object({
  id: z.number(),
  organization_id: z.string(),
  url: z.string(),
  type: z.string(),
  species: z.string(),
  breeds: breedsSchema,
  colors: colorsSchema,
  age: z.string(),
  gender: z.string(),
  size: z.string(),
  coat: z.string().optional().nullable(),
  attributes: attributesSchema,
  environment: environmentSchema,
  tags: z.array(z.string()),
  name: z.string(),
  description: z.string().optional().nullable(),
  organization_animal_id: z.string().optional().nullable(),
  photos: z.array(photoSchema),
  primary_photo_cropped: primaryPhotoCroppedSchema.optional().nullable(),
  videos: z.array(videoSchema),
  status: z.string(),
  status_changed_at: z.string(),
  published_at: z.string(),
  distance: z.any(),
  contact: contactSchema,
  _links: linksSchema,
});

export const paginationSchema = z.object({
  count_per_page: z.number(),
  total_count: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
  _links: links2Schema,
});

export const PetsSchema = z.object({
  animals: z.array(petSchema),
  pagination: paginationSchema,
});
