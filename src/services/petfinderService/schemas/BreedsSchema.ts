import { z } from "zod";
export const BreedsSchema = z.object({
  breeds: z.array(
    z.object({
      name: z.string(),
      _links: z.object({
        type: z.object({
          href: z.string(),
        }),
      }),
    })
  ),
});
