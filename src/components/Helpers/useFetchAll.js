import React, { useEffect, useState, useReducer } from "react";
import API from "../../requests";
import ListReducer from "../Reducers/ListReducer";

const useFetchAll = (condition, pageSize, url, method, params) => {
  const [loading, setLoading] = useState(true);
  const [items, dispatch] = useReducer(ListReducer, []);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshState, setRefreshState] = useState(false);

  const refresh = () => setRefreshState((prevState) => !prevState);

  useEffect(() => {
    setPageNumber(1);
    dispatch({ type: "CLEAR" });
    refresh();
  }, [url, params && params.id ? params.id : null]);

  useEffect(() => {
    if (condition) {
      setLoading(true);
      setError(false);
      API.request({
        method,
        url,
        params: { p: pageNumber, ps: pageSize, ...params },
      })
        .then((response) => {
          dispatch({ type: "FETCH", payload: response.data.results });
          if (response.data.next) {
            setPageNumber((prevPage) => prevPage++);
          } else {
            setLoading(false);
          }
        })
        .catch((e) => {
          console.error(e);
          setError(true);
        });
    }
  }, [pageNumber, refreshState]);

  return { loading, error, items, dispatch };
};

export default useFetchAll;
