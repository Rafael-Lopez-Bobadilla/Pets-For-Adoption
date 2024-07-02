import { useEffect, useState } from "react";

export const useFetch = <T,>(
  getData: () => Promise<T> | null,
  enable?: boolean
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    try {
      const data = await getData();
      setData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (enable !== false) fetchData();
  }, [enable]);
  return { data, loading, error, setData };
};
