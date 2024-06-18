import { User } from "../context/UserProvider/UserProvider";
import { LogInSchema } from "../components/AuthDialog/components/LogIn/LogIn";
import { SignUpSchema } from "../components/AuthDialog/components/SignUp/SignUp";
type APIError = {
  status: number;
  message: string;
};

type APIRes = {
  status: number;
  user: User;
};

export const getUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/authenticate`, {
    credentials: "include",
  });
  if (res.status !== 200) {
    const error: APIError = await res.json();
    throw new Error(error.message);
  }
  const data: APIRes = await res.json();
  console.log(data.user);
  return data.user;
};

export const getUserWithGoogle = async (googleToken: string) => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/googleAuth`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${googleToken}`,
    },
    credentials: "include",
  });
  if (res.status !== 200) {
    const error: APIError = await res.json();
    throw error.message;
  }
  const data: APIRes = await res.json();
  console.log(data.user);
  return data.user;
};

export const logIn = async (formData: LogInSchema) => {
  const { email, password } = formData;
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.status !== 200) {
    const error: APIError = await res.json();
    throw error.message;
  }
  const data: APIRes = await res.json();
  console.log(data.user);
  return data.user;
};

export const signUp = async (formData: SignUpSchema) => {
  const { name, email, password } = formData;
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.status !== 201) {
    const err: APIError = await res.json();
    throw err.message;
  }
  const data: APIRes = await res.json();
  console.log(data.user);
  return data.user;
};

export const updateFavorites = async (id: number, action: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API}/api/v1/updateFavorites/${action}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: id.toString() }),
      credentials: "include",
    }
  );
  if (res.status !== 200) {
    const err: APIError = await res.json();
    throw err.message;
  }
  const data: APIRes = await res.json();
  console.log(data.user);
  return data.user;
};

export const logout = async () => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/logout`, {
    credentials: "include",
  });
  if (res.status !== 200) {
    const err: APIError = await res.json();
    throw err;
  }
  const data: { status: boolean } = await res.json();
  return data.status;
};
