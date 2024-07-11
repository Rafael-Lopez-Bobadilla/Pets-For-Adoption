import { useEffect, useState } from "react";

export const useFetch = <T,>(
  getData: () => Promise<T> | null,
  enable: boolean = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const retry = () => {
    setError(false);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getData();
      setData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (enable && !error) fetchData();
  }, [enable, error]);
  return { data, loading, error, setData, retry };
};
