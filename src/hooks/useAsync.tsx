import { useState } from "react";
export const useAsync = <T,>({
  asyncFunc,
  onError,
  onSuccess,
}: {
  asyncFunc: (payload: T) => void;
  onError?: (err: unknown) => void;
  onSuccess?: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const asyncCall = async (payload: T) => {
    try {
      setLoading(true);
      await asyncFunc(payload);
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, asyncCall };
};
