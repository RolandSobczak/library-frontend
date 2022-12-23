import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import NavBar from "./NavBar/NavBar";

const Main = () => {
  return (
    <div className="main">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Main;
