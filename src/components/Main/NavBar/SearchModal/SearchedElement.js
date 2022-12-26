import React, { useContext } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppProvider";
import useFetchAll from "../../../Helpers/useFetchAll";

const SearchedElement = ({
  id,
  name,
  slug,
  authors,
  addBookHandler,
  onHide,
}) => {
  const { urls } = useContext(AppContext);
  const navigate = useNavigate();

  const { items } = useFetchAll(
    authors && authors.length > 0,
    2,
    urls.authors.href,
    urls.authors.method,
    { id: authors.toString() }
  );

  const authorsNames = items.map((author) => (
    <span key={author.id} className="ms-1">
      {author.first_name} {author.last_name}
    </span>
  ));

  return (
    <Col
      className="my-1"
      onClick={() => {
        onHide();
        navigate(`/books/${slug}`);
      }}
    >
      <Card>
        <Card.Body className="d-flex justify-content-between p-1 align-items-center">
          <div className="mx-auto">
            <p className="h3 m-0 text-center">{name}</p>
            {authorsNames}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SearchedElement;
