import React from "react";
import { Spinner, Container, Col, Row } from "react-bootstrap";

const Loading = () => {
  return (
    <Container className="d-flex justify-content-center">
      <div className="my-4">
        Loading <Spinner animation="border" role="status" />
      </div>
    </Container>
  );
};

export default Loading;
