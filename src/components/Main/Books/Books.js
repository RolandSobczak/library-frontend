import React, { useState } from "react";
import BooksList from "./BooksList/BooksList";
import SubMenu from "./SubMenu/SubMenu";

const Books = () => {
  const [sortBy, setSortBy] = useState("");
  const [params, setParams] = useState({
    authors: "",
    category: "",
    publication_date_after: "",
    publication_date_before: "",
  });

  return (
    <div className="books">
      <SubMenu sortBy={sortBy} setSortBy={setSortBy} setParams={setParams} />
      <BooksList sortBy={sortBy} params={params} />
    </div>
  );
};

export default Books;
