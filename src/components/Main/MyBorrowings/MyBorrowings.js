import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MyBorrowingsList from "./MyBorrowingsList/MyBorrowingsList";
import SubMenu from "./SubMenu/SubMenu";

const MyBorrwoings = () => {
  const [sortBy, setSortBy] = useState("");
  const [params, setParams] = useState({
    returnal_date_after: "",
    returnal_date_before: "",
    predicted_returnal_date_after: "",
    predicted_returnal_date_before: "",
    created_after: "",
    created_before: "",
    active: "",
  });

  return (
    <Container fluid>
      <h1 className="text-center m-5">Twoje wypożyczenia</h1>
      <SubMenu sortBy={sortBy} setSortBy={setSortBy} setParams={setParams} />
      <MyBorrowingsList sortBy={sortBy} params={params} />
    </Container>
  );
};

export default MyBorrwoings;
