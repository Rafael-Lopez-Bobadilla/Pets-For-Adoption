import axios from "axios";
import { GeocodingResponseSchema } from "./geocodingSchema";
const key = "AIzaSyBeMIrIdcecTGx6XPecpuBi-2jnNj-86mM";
export const getLocationById = async (id: string) => {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${key}`
  );
  return GeocodingResponseSchema.parse(res.data);
};
