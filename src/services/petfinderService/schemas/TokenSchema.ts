import { z } from "zod";

export const TokenSchema = z.object({
  token_type: z.string(),
  expires_in: z.number(),
  access_token: z.string(),
});
