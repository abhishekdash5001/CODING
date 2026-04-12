import { useEffect, useState, useRef } from 'react';

export function useFetch(url) {
  const controllerRef = useRef(null);
  let [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    fetchData(url);

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [url]);

  async function fetchData(url) {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const newCocnc = new AbortController();
    controllerRef.current = newCocnc;

    setState((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });

    try {
      let a = await fetch(url, {
        signal: newCocnc.signal,
      });
      let d = await a.json();

      setState((prev) => {
        return {
          ...prev,
          loading: false,
          data: d,
          error: null,
        };
      });
    } catch (err) {

      f (err.name === 'AbortError') {
        return;
      }
      setState((prev) => {
        return {
          ...prev,
          loading: false,
          data: null,
          error: err,
        };
      });
    }
  }

  function refetch() {}

  const { data, loading, error } = state;

  return {
    data,
    loading,
    error,
    refetch,
  };
}
