import { z } from 'zod'

export const paramsSchema = z.object({
  type: z.string(),
  location: z.string(),
  color: z.string()
}).partial().required({
  type: true
}).strip()