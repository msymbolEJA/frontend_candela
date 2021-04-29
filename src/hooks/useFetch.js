import { useState, useEffect } from "react";
import { getData } from "../helpers/DataTransitions";

const useFetch = (url, initVal) => {
  const [response, setResponse] = useState(initVal);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  //   console.log("useFetchLoading", loading);

  useEffect(() => {
    getData(url)
      .then((data) => {
        // console.log("useFetch", data);
        setResponse(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { response, error, loading, setLoading };
};

export default useFetch;
