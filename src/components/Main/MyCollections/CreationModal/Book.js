import React, { useContext } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { AppContext } from "../../../AppProvider";
import useFetchAll from "../../../Helpers/useFetchAll";

const Book = ({ id, name, authors, addBookHandler }) => {
  const { urls } = useContext(AppContext);

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
    <Col className="my-1">
      <Card>
        <Card.Body className="d-flex justify-content-between p-1 align-items-center">
          <div className="mx-auto">
            <p className="h3 m-0 text-center">{name}</p>
            {authorsNames}
          </div>
          <Button
            size="sm"
            variant="success d-flex justify-content-center align-items-center"
            onClick={addBookHandler}
          >
            <span>Dodaj</span>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1.4rem" }}
            >
              add
            </span>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Book;
