import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import API from "../../requests";
import ListReducer from "../Reducers/ListReducer";

const useListLoad = (
  pageNumber,
  setPageNumber,
  pageSize,
  url,
  method,
  params
) => {
  const [loading, setLoading] = useState(true);
  const [items, dispatch] = useReducer(ListReducer, []);
  const [error, setError] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    setPageNumber(1);
    setHasNext(false);
    dispatch({ type: "CLEAR" });
  }, [url, ...Object.values(params)]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    API.request({
      method,
      url,
      params: { p: pageNumber, ps: pageSize, ...params },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        dispatch({ type: "FETCH", payload: response.data.results });
        setHasNext(response.data.next ? true : false);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        console.error(e);
        setError(true);
      });
    return () => cancel();
  }, [pageNumber, url, ...Object.values(params)]);

  return { loading, error, items, hasNext, dispatch };
};

export default useListLoad;
