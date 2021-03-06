import { useState, useEffect } from "react";
import api from "../helpers/api";

const useFetch = (url, initVal, base) => {
  const [response, setResponse] = useState(initVal);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  //   console.log("useFetchLoading", loading);

  useEffect(() => {
    api(url, "get", null, base)
      .then((data) => {
        // console.log("useFetch", data);
        setResponse(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url, base]);

  return { response, error, loading, setLoading };
};

export default useFetch;
