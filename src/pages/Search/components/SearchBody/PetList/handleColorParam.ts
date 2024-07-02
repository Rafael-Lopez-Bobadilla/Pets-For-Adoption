export const handleColorParam = (params: URLSearchParams) => {
  if (params.has("color")) {
    const color = params.get("color") as string;
    params.delete("color");
    params.set("color[]", color);
  }
  return params;
};
