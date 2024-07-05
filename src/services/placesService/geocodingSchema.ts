import { z } from "zod";

export const addressComponentSchema = z.object({
  long_name: z.string(),
  short_name: z.string(),
  types: z.array(z.string()),
});

export const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const northeastSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const southwestSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const viewportSchema = z.object({
  northeast: northeastSchema,
  southwest: southwestSchema,
});

export const geometrySchema = z.object({
  location: locationSchema,
  location_type: z.string(),
  viewport: viewportSchema,
});

export const resultSchema = z.object({
  address_components: z.array(addressComponentSchema),
  formatted_address: z.string(),
  geometry: geometrySchema,
  place_id: z.string(),
  types: z.array(z.string()),
});

export const GeocodingResponseSchema = z.object({
  results: z.array(resultSchema),
  status: z.string(),
});

export type TGeocodingResponse = z.infer<typeof GeocodingResponseSchema>;
