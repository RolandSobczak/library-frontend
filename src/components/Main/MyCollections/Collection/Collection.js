import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppProvider";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import useFetchAll from "../../../Helpers/useFetchAll";
import { useState } from "react";
import API from "../../../../requests";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

const Collection = ({
  books,
  lastCollectionElement,
  name,
  href,
  collectionsDispatch,
  id,
}) => {
  const navigate = useNavigate();
  const { urls } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [showDelteModal, setShowDeleteMoal] = useState(false);

  const { items, dispatch } = useFetchAll(
    books && books.length > 0,
    5,
    urls.books.href,
    urls.books.method,
    { id: books.toString() }
  );

  const removeBookHandler = async (id) => {
    const books_ids = items
      .map((obj) => obj.id)
      .filter((bookId) => bookId !== id);
    const { data } = await API.request({
      url: href,
      method: urls.my_collections.method,
    });
    API.request({
      url: data._links.partial_update.href,
      method: data._links.partial_update.method,
      data: { books: books_ids },
    });
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const editModeHandler = () => setEditMode((prevState) => !prevState);

  const booksElements = items.map((obj) => (
    <ListGroupItem key={obj.id} className="d-flex justify-content-between">
      <Link to={`/books/${obj.slug}`} className="text-decoration-none">
        {obj.name}
      </Link>
      {editMode && (
        <span
          className="material-symbols-outlined text-warning"
          onClick={() => removeBookHandler(obj.id)}
        >
          remove
        </span>
      )}
    </ListGroupItem>
  ));

  const deleteCollectionHandler = async () => {
    const { data } = await API.request({
      url: href,
      method: urls.my_collections.method,
    });
    API.request({
      url: data._links.destroy.href,
      method: data._links.destroy.method,
    });
    collectionsDispatch({ type: "REMOVE", payload: { id } });
  };

  return (
    <Col>
      <div ref={lastCollectionElement}>
        <Card>
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <p>{name}</p>
              <div>
                {editMode ? (
                  <span
                    style={{ fontSize: "22px" }}
                    className="material-symbols-outlined text-primary"
                    onClick={editModeHandler}
                  >
                    done
                  </span>
                ) : (
                  <span
                    style={{ fontSize: "20px" }}
                    className="material-symbols-outlined text-primary"
                    onClick={editModeHandler}
                  >
                    edit
                  </span>
                )}
                <span
                  style={{ fontSize: "20px" }}
                  className="material-symbols-outlined text-primary"
                  onClick={() => setShowDeleteMoal(true)}
                >
                  delete
                </span>
                <DeleteModal
                  show={showDelteModal}
                  onHide={() => setShowDeleteMoal(false)}
                  onDelete={deleteCollectionHandler}
                />
              </div>
            </Card.Title>
            <ListGroup>{booksElements}</ListGroup>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default Collection;
