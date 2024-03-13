import { z } from 'zod'

export const paramsSchema = z.object({
  type: z.string(),
  location: z.string(),
  color: z.string(),
  coat: z.string(),
  gender: z.string(),
  breed: z.string(),
  page: z.string()
}).partial().required({
  type: true,
  page: true
}).strip()