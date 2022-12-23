import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CollectionsList from "./CollectionsList";
import { Button } from "react-bootstrap";
import AddCollection from "./AddCollection";

const CollectionsModal = ({ show, onClose, currentBook }) => {
  const [addWindow, setAddWindow] = useState(false);

  const addWindowHandler = () => setAddWindow((prevState) => !prevState);

  return (
    <Modal
      show={show}
      onHide={onClose}
      fullscreen={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Twoje kolekcje
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {!addWindow ? (
          <CollectionsList
            currentBook={currentBook}
            setAddWindow={setAddWindow}
          />
        ) : (
          <AddCollection
            currentBook={currentBook}
            setAddWindow={setAddWindow}
          />
        )}
        <Button className="mt-4" onClick={addWindowHandler}>
          {addWindow ? "Anuluj" : "Nowa kolekcja"}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CollectionsModal;
