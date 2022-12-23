import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FilterModal from "./Modal";
import Button from "react-bootstrap/Button";
import sortChoices from "./sortChoices";

const SubMenu = ({ sortBy, setSortBy, setParams }) => {
  const [modalShow, setModalShow] = useState(false);
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

  const onClose = () => setModalShow(false);
  const onShow = () => setModalShow(true);

  return (
    <Container>
      <Row className="my-3">
        <Col className="d-flex justify-content-center">
          <Button variant="primary" onClick={onShow} size="md">
            Filtruj
          </Button>
          <FilterModal
            show={modalShow}
            onClose={onClose}
            setParams={setParams}
          />
        </Col>
        <Col className="d-flex justify-content-center">
          <DropdownButton
            id="dropdown-basic-button"
            title={sortTitle}
            size="md"
          >
            {dropdownItems}
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  );
};

export default SubMenu;
