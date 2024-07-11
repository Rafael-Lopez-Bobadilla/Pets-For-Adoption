import s from "./LoadError.module.css";
import reload from "../../assets/svgs/reload.svg";
const LoadError = ({
  message,
  retry,
}: {
  message: string;
  retry: () => void;
}) => {
  return (
    <div className={s.error}>
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button onClick={retry}>
        Try again
        <img src={reload} />
      </button>
    </div>
  );
};

export default LoadError;
