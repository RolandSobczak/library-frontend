import React, { useState } from "react";
import CountriesList from "./CountriesList/CountriesList";
import SubMenu from "./SubMenu/SubMenu";

const Countries = () => {
  const [sortBy, setSortBy] = useState("");
  const [params, setParams] = useState({});

  return (
    <div className="countries">
      <SubMenu sortBy={sortBy} setSortBy={setSortBy} setParams={setParams} />
      <CountriesList sortBy={sortBy} params={params} />
    </div>
  );
};

export default Countries;
