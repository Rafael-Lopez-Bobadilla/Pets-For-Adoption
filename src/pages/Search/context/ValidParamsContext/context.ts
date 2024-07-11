import { createContext, useContext } from "react";
import { TValidParams } from "./paramsSchema";

type TValidParamsContext = {
  params: TValidParams | null;
};
export const ValidParamsContext = createContext<TValidParamsContext | null>(
  null
);

export const useValidParams = () => {
  const value = useContext(ValidParamsContext);
  if (!value)
    throw new Error(
      "Valid params context can only be used within its provider"
    );
  return value;
};
