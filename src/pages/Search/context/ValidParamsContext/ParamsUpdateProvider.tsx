import { memo } from "react";
import { ParamsUpdateContext } from "./updateContext";
import { TValidParams } from "./paramsSchema";
import { SetURLSearchParams } from "react-router-dom";
type Props = {
  children: React.ReactNode;
  setParams: SetURLSearchParams;
};
const ParamsUpdateProvider = memo(({ children, setParams }: Props) => {
  const getNewParams = (params: URLSearchParams) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", "1");
    return newParams;
  };
  const changeType = (value: string) => {
    setParams(new URLSearchParams({ page: "1", type: value }));
  };
  const changeParam = (value: string, field: keyof TValidParams) => {
    setParams((prevParams) => {
      const newParams = getNewParams(prevParams);
      newParams.set(field, value);
      return newParams;
    });
  };
  const removeParam = (field: keyof TValidParams) => {
    setParams((prevParams) => {
      const newParams = getNewParams(prevParams);
      newParams.delete(field);
      return newParams;
    });
  };
  return (
    <ParamsUpdateContext.Provider
      value={{ changeType, removeParam, changeParam }}
    >
      {children}
    </ParamsUpdateContext.Provider>
  );
});

export default ParamsUpdateProvider;
