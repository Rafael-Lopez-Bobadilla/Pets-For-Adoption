import s from "./LoadError.module.css";
import reload from "../../assets/svgs/reload.svg";
const LoadError = ({
  children = <></>,
  message,
  retry,
}: {
  children?: React.ReactNode;
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
      {children}
    </div>
  );
};

export default LoadError;
