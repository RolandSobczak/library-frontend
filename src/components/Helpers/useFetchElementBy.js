import React, { useState, useEffect } from "react";
import API from "../../requests";

const useFetchElement = (url, method, field, value) => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchItem = async () => {
    const query = await API.request({
      url,
      method,
      params: Object.fromEntries([[field, value]]),
    }).catch((e) => {
      setError(true);
      console.error(e);
    });
    if (query.data.count < 1) {
      setError(true);
      console.error("Element pass to query doesn' exists");
    }
    if (query.data.count > 1) {
      setError(true);
      console.error(
        `Query must return one elemnt, but returned: ${query.data.count}`
      );
    }
    const { data } = await API.request({
      url: query.data.results[0].href,
      method: method,
    });
    setItem(data);
  };

  useEffect(() => {
    fetchItem();
  }, [url, method]);

  return [item, isLoading, error];
};

export default useFetchElement;
