import React, { useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { AppContext } from "../../../AppProvider";
import useFetchAll from "../../../Helpers/useFetchAll";
import { Card, Col, Row, Container, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Suggestions = ({ suggestion }) => {
  const { urls } = useContext(AppContext);
  const navigate = useNavigate();

  const { items, loading } = useFetchAll(
    suggestion && suggestion.length > 1,
    6,
    urls.books.href,
    urls.books.method,
    { id: suggestion.toString() }
  );

  const suggestedElements = items.map((obj, index) => (
    <Col key={index}>
      <Card onClick={() => navigate(`/books/${obj.slug}`)}>
        <Card.Img
          variant="top"
          width="10px"
          src={obj.img ? obj.img : "https://via.placeholder.com/100"}
        />
        <Card.Body>
          <Card.Title>{obj.name}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <Container className="my-3">
      <h2>Proponowane</h2>
      <Row xs={1} sm={2} md={4}>
        {suggestion && suggestion.length > 0 && suggestedElements}
      </Row>
    </Container>
  );
};

export default Suggestions;
