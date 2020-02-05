import { useEffect, useState } from "react";

export const useFetch = request => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request().then(res => setData(res.data));
    setLoading(false);
  }, []);

  return [data, loading];
};
