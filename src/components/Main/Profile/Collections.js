import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../AppProvider";
import { Card, Container, ListGroup } from "react-bootstrap";
import API from "../../../requests";
import useFetchAll from "../../Helpers/useFetchAll";
import { NavLink } from "react-router-dom";

const CollectionsCard = () => {
  const { urls } = useContext(AppContext);
  const [collection, setCollection] = useState({ books: [] });
  const [books, setBook] = useState([]);

  const fetchCollection = async () => {
    const { data } = await API.request({
      url: urls.my_collections.href,
      method: urls.my_collections.method,
      params: {
        ps: 1,
      },
    });
    data.results.length > 0 && setCollection(data.results[0]);
  };

  const { items } = useFetchAll(
    collection.books.length > 0,
    10,
    urls.books.href,
    urls.books.method,
    { id: collection.books.toString() }
  );

  useEffect(() => {
    fetchCollection();
  }, []);

  const booksItems = items.map((book) => (
    <ListGroup.Item key={book.id}>
      <NavLink className="text-decoration-none" to={`/books/${book.slug}`}>
        {book.name}
      </NavLink>
    </ListGroup.Item>
  ));

  return (
    <Card border="light">
      <Card.Header>
        <NavLink to="/my-collections" className="text-decoration-none">
          Twoje kolekcje
        </NavLink>
      </Card.Header>
      <Card.Body>
        <Container>
          <Card>
            <Card.Body>
              <p className="h3">{collection.name}</p>
              <ListGroup>{booksItems}</ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default CollectionsCard;
