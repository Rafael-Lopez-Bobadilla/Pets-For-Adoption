import { z } from "zod";
import axios from "axios";
const TokenSchema = z.object({
  token_type: z.string(),
  expires_in: z.number(),
  access_token: z.string(),
});

export type TTokenSchema = z.infer<typeof TokenSchema>;
const baseURL = "https://api.petfinder.com/v2";
const petfinderClient = axios.create({
  baseURL,
});
export const getToken = async () => {
  const res = await petfinderClient.post(
    "/oauth2/token",
    {
      grant_type: "client_credentials",
      client_id: "vvdSXI35WImE30w1spcTbVvIX6NGRa5ZdsDPQRM1m01hjziFPz",
      client_secret: "0479O0ZRBUFOuHbVrRvOBfVfhSop3cLY4XPG2fsU",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return TokenSchema.parse(res.data);
};
