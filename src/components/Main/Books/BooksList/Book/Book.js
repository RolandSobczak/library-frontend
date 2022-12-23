import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Book = ({
  id,
  name,
  authorsObj,
  is_available,
  img,
  lastBookElement,
  slug,
}) => {
  const navigate = useNavigate();

  const authors = authorsObj.map((author, index) => (
    <Badge key={index} bg="primary" className="m-1">
      {author.first_name + " " + author.last_name}
    </Badge>
  ));

  return (
    <Col key={id}>
      <div ref={lastBookElement} onClick={() => navigate(`/books/${slug}`)}>
        <Card bg={is_available ? null : "danger"}>
          {!is_available && <Card.Header>Niedostępna</Card.Header>}
          <Card.Img
            variant="top"
            src={img ? img : "https://via.placeholder.com/100"}
          />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>{authors}</Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default Book;
