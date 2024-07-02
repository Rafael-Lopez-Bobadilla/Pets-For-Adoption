import { useSearchParams } from "react-router-dom";
import { useLocation } from "../../../../context/LocationContext/context";
import s from "./Message.module.css";
import { memo } from "react";
const Message = memo(() => {
  const [params] = useSearchParams();
  const { location } = useLocation();
  const type = () => {
    const paramsType = params.get("type")?.toLowerCase();
    if (!paramsType) return undefined;
    if (paramsType === "barnyard" || paramsType === "small & furry")
      return `${params.get("type")} animals`;
    return `${params.get("type")}s`;
  };
  return (
    <span className={s.message}>
      {type()} in adoption in {location ? location.address : "North America"}
    </span>
  );
});

export default Message;
