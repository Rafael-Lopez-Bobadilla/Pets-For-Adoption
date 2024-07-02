import { z } from "zod";

const selfSchema = z.object({
  href: z.string(),
});

const breedsSchema = z.object({
  href: z.string(),
});

const linksSchema = z.object({
  self: selfSchema,
  breeds: breedsSchema,
});

export const SelectedTypeSchema = z.object({
  name: z.string(),
  coats: z.array(z.string()),
  colors: z.array(z.string()),
  genders: z.array(z.string()),
  _links: linksSchema,
});

export const TypesSchema = z.object({
  types: z.array(SelectedTypeSchema),
});
