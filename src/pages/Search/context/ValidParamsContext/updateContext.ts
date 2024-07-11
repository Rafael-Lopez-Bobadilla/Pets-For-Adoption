import { createContext, useContext } from "react";
import { TValidParams } from "./paramsSchema";

type TParamsUpdateContext = {
  changeParam: (value: string, field: keyof TValidParams) => void;
  removeParam: (field: keyof TValidParams) => void;
  changeType: (value: string) => void;
};
export const ParamsUpdateContext = createContext<TParamsUpdateContext | null>(
  null
);

export const useParamsUpdate = () => {
  const value = useContext(ParamsUpdateContext);
  if (!value)
    throw new Error(
      "Params update context can only be used within its provider"
    );
  return value;
};
