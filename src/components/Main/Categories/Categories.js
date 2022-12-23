import React, { useState } from "react";
import CategoriesList from "./CategoriesList/CategoriesList";
import SubMenu from "./SubMenu/SubMenu";

const Categories = () => {
  const [sortBy, setSortBy] = useState("");
  const [params, setParams] = useState({});

  return (
    <div className="authors">
      <SubMenu sortBy={sortBy} setSortBy={setSortBy} setParams={setParams} />
      <CategoriesList sortBy={sortBy} params={params} />
    </div>
  );
};

export default Categories;
