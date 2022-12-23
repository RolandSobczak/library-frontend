import React from "react";
import { Spinner } from "react-bootstrap";

const LodingFull = () => {
  return (
    <Spinner
      className="position-fixed top-50 start-50"
      animation="border"
      size=""
      variant="primary"
    />
  );
};

export default LodingFull;
