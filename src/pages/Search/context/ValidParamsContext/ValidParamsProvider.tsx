import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { paramsSchema, TParamKey, TValidParams } from "./paramsSchema";
import { ValidParamsContext } from "./context";
const ValidParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useSearchParams();
  const [validParams, setValidParams] = useState<TValidParams | null>(null);
  const setDefaultParams = () => {
    setParams({ type: "Dog", page: "1" });
  };
  useEffect(() => {
    const parseResult = paramsSchema.safeParse(Object.fromEntries(params));
    if (parseResult.success) {
      setValidParams(parseResult.data);
      if (Object.keys(parseResult.data).length !== params.size)
        setParams(parseResult.data);
    } else {
      setDefaultParams();
    }
  }, [params]);
  const getNewParams = () => {
    if (!validParams) return null;
    validParams.page = "1";
    return validParams;
  };
  const changeType = (value: string) => {
    const newParams = getNewParams();
    if (!newParams) return;
    newParams.type = value;
    setParams(newParams);
  };
  const changeParam = (key: TParamKey, value: string) => {
    const newParams = getNewParams();
    if (!newParams) return;
    newParams[key] = value;
    setParams(newParams);
  };
  const removeParam = (key: TParamKey) => {
    const newParams = getNewParams();
    if (!newParams) return;
    delete newParams[key];
    setParams(newParams);
  };
  const changePage = (page: string) => {
    if (!validParams) return;
    validParams.page = page;
    setParams({ ...validParams });
  };
  const clearFilters = () => {
    const newParams = getNewParams();
    if (!newParams) return;
    delete newParams.coat;
    delete newParams.color;
    delete newParams.gender;
    delete newParams.breed;
    setParams(newParams);
  };
  return (
    <ValidParamsContext.Provider
      value={{
        params: validParams,
        changeParam,
        changeType,
        removeParam,
        clearFilters,
        changePage,
        setDefaultParams,
      }}
    >
      {children}
    </ValidParamsContext.Provider>
  );
};

export default ValidParamsProvider;
