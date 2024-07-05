import axios from "axios";
import { TypesSchema } from "./schemas/TypesSchema";
import { BreedsSchema } from "./schemas/BreedsSchema";
import { TokenSchema } from "./schemas/TokenSchema";
import { PetsSchema } from "./schemas/PetsSchema";
const petfinderClient = axios.create({
  baseURL: "https://api.petfinder.com",
});
export const getToken = async () => {
  const res = await petfinderClient.post(
    "/v2/oauth2/token",
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

export const getBreeds = async (token: string, link: string) => {
  const res = await petfinderClient.get(`${link}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return BreedsSchema.parse(res.data);
};

export const getPetTypes = async (token: string) => {
  const res = await petfinderClient.get("/v2/types", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return TypesSchema.parse(res.data);
};

export const getAnimals = async (token: string, params: URLSearchParams) => {
  const res = await petfinderClient.get("/v2/animals", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return PetsSchema.parse(res.data);
};
