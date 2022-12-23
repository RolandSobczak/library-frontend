import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const BooleanFilter = ({ value, setValue }) => {
  return (
    <ButtonGroup vertical>
      <ToggleButton
        size="lg"
        variant={value === true ? "primary" : "outline-primary"}
        onClick={() => setValue(true)}
      >
        Tak
      </ToggleButton>
      <ToggleButton
        size="lg"
        variant={value === false ? "primary" : "outline-primary"}
        onClick={() => setValue(false)}
      >
        Nie
      </ToggleButton>
    </ButtonGroup>
  );
};

export default BooleanFilter;
