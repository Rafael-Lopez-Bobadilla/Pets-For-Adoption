import axios from "axios";
import { userSchema, TLogInSchema, TSignUpSchema } from "./schemas";
const userClient = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  withCredentials: true,
});

export type TUpdateAction = "add" | "remove";

export const userService = {
  authenticate: async () => {
    const res = await userClient.get("/api/v1/authenticate");
    return userSchema.parse(res.data);
  },

  authWithGoogle: async (googleToken: string) => {
    const res = await userClient.post(
      "/api/v1/googleAuth",
      {},
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      }
    );
    return userSchema.parse(res.data);
  },

  logIn: async (formData: TLogInSchema) => {
    const { email, password } = formData;
    const res = await userClient.post("/api/v1/login", { email, password });
    return userSchema.parse(res.data);
  },

  signUp: async (formData: TSignUpSchema) => {
    const { name, email, password } = formData;
    const res = await userClient.post("/api/v1/signup", {
      name,
      email,
      password,
    });
    return userSchema.parse(res.data);
  },

  updateFavorites: async (id: number, action: TUpdateAction) => {
    const res = await userClient.patch(`/api/v1/updateFavorites/${action}`, {
      favorite: id.toString(),
    });
    return userSchema.parse(res.data);
  },

  logout: async () => {
    return await userClient.get("/api/v1/logout");
  },
};
