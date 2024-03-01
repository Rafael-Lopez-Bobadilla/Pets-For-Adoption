import { paramsSchema } from "./paramsSchema"
import { SetURLSearchParams } from "react-router-dom"
export const validateParams = (
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams
) => {
  const validParams = paramsSchema.safeParse(Object.fromEntries(searchParams))
  if (!validParams.success) {
    setSearchParams(new URLSearchParams({ type: 'Dog' }))
    return false
  }
  const params = new URLSearchParams(validParams.data)
  if (params.size !== searchParams.size) {
    setSearchParams(params)
    return false
  }
  return params
}