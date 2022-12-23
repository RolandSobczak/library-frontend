import React, { createContext, useState, useReducer, useEffect } from "react";
import UserReducer from "./Reducers/UserReducer";
import API from "../requests";
import LodingFull from "./UI/LoadingFull";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, null);
  const [urls, setUrls] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoged, setIsLoged] = useState(false);

  const fetchUrls = async () => {
    const { data } = await API.get("api/v1.0/");
    setUrls(data);
  };

  const loginHandler = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const urls = await API.get("api/v1.0/");
      const { data } = await API.request({
        url: urls.data.users.href + "me/",
        method: urls.data.users.method,
        headers: { Authorization: `Token ${token}` },
      });
      dispatch({
        type: "LOGIN",
        payload: { ...data, token: token },
      });
      setIsLoged(true);
    }
  };

  const logoutHandler = () => {
    setIsLoged(false);
    dispatch({ type: "LOGOUT" });
  };

  const initializeHandler = async () => {
    await fetchUrls();
    await loginHandler();
    setIsLoaded(true);
  };

  useEffect(() => {
    initializeHandler();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        urls,
        fetchUrls,
        dispatch,
        setIsLoged,
        isLoged,
        logoutHandler,
      }}
    >
      {isLoaded && urls ? children : <LodingFull />}
    </AppContext.Provider>
  );
};

export default AppProvider;
