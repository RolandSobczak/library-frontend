import React, { useContext } from "react";
import { useState } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import useListLoad from "../../../Helpers/useListLoad";
import { AppContext } from "../../../AppProvider";
import Book from "./Book";
import { useEffect } from "react";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import CurrentBook from "./CurrentBook";
import API from "../../../../requests";

const CreationModal = ({ show, onHide, collectionsDispatch }) => {
  const [collectionName, setCollectionName] = useState("");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const { urls } = useContext(AppContext);
  const { loading, error, items, hasNext, dispatch } = useListLoad(
    1,
    () => {},
    10,
    urls.books.href,
    urls.books.method,
    { search: query }
  );

  const changeNameHandler = (e) => setCollectionName(e.target.value);
  const changeQueryHandler = (e) => setQuery(e.target.value);

  const addBook = ({ id, name }) => {
    const ids = books.map((book) => book.id);
    if (!ids.includes(id)) {
      setBooks((prevState) => [...prevState, { id, name }]);
    }
  };

  const removeBook = (id) =>
    setBooks((prevState) => prevState.filter((obj) => obj.id !== id));

  const addCollectionHandler = async () => {
    const { data } = await API.request({
      url: urls.my_collections.href,
      method: urls.my_collections.method,
    });
    const response = await API.request({
      url: data._links.create.href,
      method: data._links.create.method,
      data: { name: collectionName, books: books.map((book) => book.id) },
    });
    collectionsDispatch({ type: "ADD", payload: response.data });
    setCollectionName("");
    setBooks([]);
    onHide();
  };

  const booksElements = items
    .filter((book) => {
      const ids = books.map((obj) => obj.id);
      return !ids.includes(book.id);
    })
    .map((book) => (
      <Book
        key={book.id}
        {...book}
        addBookHandler={() => addBook({ id: book.id, name: book.name })}
      />
    ));

  const currentBooksElements = books.map((book) => (
    <CurrentBook
      key={book.id}
      name={book.name}
      onRemove={() => removeBook(book.id)}
    />
  ));

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Nowa kolekcja
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3 d-flex justify-content-center ">
          <Form.Control
            value={collectionName}
            onChange={changeNameHandler}
            type="text"
            placeholder="Nazwa kolekcji"
          />
        </Form.Group>
        <h3 className="text-center">Dodane książki:</h3>
        <ul>{currentBooksElements}</ul>
        <Form.Group className="mb-3 d-flex justify-content-center mx-5">
          <Form.Control
            value={query}
            onChange={changeQueryHandler}
            type="text"
            placeholder="Szukaj książkę"
          />
        </Form.Group>
        <Row xs={1} className="mx-5">
          {booksElements}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addCollectionHandler}>Stwórz</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreationModal;
