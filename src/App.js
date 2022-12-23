import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider, { AppContext } from "./components/AppProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./components/AppRoutes";

function App() {
  const [isSideMenuActive, setIsSideMenuActive] = useState(false);

  return (
    <div className="App">
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
