import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setError(res.error);
        setData(res.data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;