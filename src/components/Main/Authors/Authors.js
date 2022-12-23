import React, { useState } from "react";
import AuthorsList from "./AuthorsList/AuthorsList";
import SubMenu from "./SubMenu/SubMenu";

const Authors = () => {
  const [sortBy, setSortBy] = useState("");
  const [params, setParams] = useState({});

  return (
    <div className="authors">
      <SubMenu sortBy={sortBy} setSortBy={setSortBy} setParams={setParams} />
      <AuthorsList sortBy={sortBy} params={params} />
    </div>
  );
};

export default Authors;
