import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import sortChoices from "./sortChoices";

const SubMenu = ({ sortBy, setSortBy, setParams }) => {
  const [sortTitle, setSortTitle] = useState("sortuj");

  const dropdownItems = Object.values(sortChoices).map((obj, index) => (
    <Dropdown.Item
      key={index}
      onClick={() => {
        setSortBy(obj.apiKey);
        setSortTitle(obj.content);
      }}
    >
      {obj.content}
    </Dropdown.Item>
  ));

  return (
    <Container className="my-3 d-flex justify-content-center">
      <DropdownButton id="dropdown-basic-button" title={sortTitle} size="md">
        {dropdownItems}
      </DropdownButton>
    </Container>
  );
};

export default SubMenu;
