import { useSearchParams } from "react-router-dom";
import { paramsSchema } from "./paramsSchema";
import { ValidParamsContext } from "./context";
import ParamsUpdateProvider from "./ParamsUpdateProvider";

const ValidParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useSearchParams();
  const parseResult = paramsSchema.safeParse(Object.fromEntries(params));
  let validParams = null;
  if (!parseResult.success)
    setParams(new URLSearchParams({ type: "Dog", page: "1" }));
  if (parseResult.success) {
    validParams = parseResult.data;
    if (Object.keys(validParams).length !== params.size)
      setParams(new URLSearchParams(validParams));
  }
  return (
    <ValidParamsContext.Provider value={{ params: validParams }}>
      <ParamsUpdateProvider setParams={setParams}>
        {children}
      </ParamsUpdateProvider>
    </ValidParamsContext.Provider>
  );
};

export default ValidParamsProvider;
