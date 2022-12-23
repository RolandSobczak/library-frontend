import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Author = ({
  id,
  first_name,
  last_name,
  countryObj,
  img,
  lastAuthorElement,
  slug,
}) => {
  const navigate = useNavigate();

  return (
    <Col key={id}>
      <div ref={lastAuthorElement} onClick={() => navigate(`/authors/${slug}`)}>
        <Card>
          <Card.Img
            variant="top"
            src={img ? img : "https://via.placeholder.com/100"}
          />
          <Card.Body>
            <Card.Title>{`${first_name} ${last_name}`}</Card.Title>
            <Card.Subtitle>
              <Badge bg="primary" className="m-1">
                {countryObj.name}
              </Badge>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default Author;
