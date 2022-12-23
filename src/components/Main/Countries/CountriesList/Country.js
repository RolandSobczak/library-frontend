import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const Country = ({ id, name, slug, lastCountryElement }) => {
  const navigate = useNavigate();

  return (
    <Col key={id}>
      <div ref={lastCountryElement} onClick={() => navigate(slug)}>
        <Card>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default Country;
