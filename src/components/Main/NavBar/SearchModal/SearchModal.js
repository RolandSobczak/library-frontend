import React, { useState, useContext } from "react";
import { Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppProvider";
import useListLoad from "../../../Helpers/useListLoad";
import SearchedElement from "./SearchedElement";

const SearchModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const { urls } = useContext(AppContext);
  const [query, setQuery] = useState("");

  const { loading, error, items } = useListLoad(
    1,
    () => {},
    10,
    urls.books.href,
    urls.books.method,
    { search: query }
  );

  const changeQueryHandler = (e) => setQuery(e.target.value);

  const searchedElements = items.map((book) => (
    <SearchedElement key={book.id} {...book} onHide={onHide} />
  ));

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="flex-grow-1">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
            onChange={changeQueryHandler}
            value={query}
            autoFocus
            onSubmit={() => navigate("/books")}
          />
        </Modal.Title>
        <button
          className="btn-close ms-1"
          aria-label="Close"
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body>
        <Row xs={1}>{searchedElements}</Row>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
