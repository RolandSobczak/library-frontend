import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ show, onHide, onDelete }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Body>
        <h4>Czy napewno chcesz usnuąć ten element?</h4>
        <div className="d-flex justify-content-end mt-3">
          <Button onClick={onDelete} variant="danger" size="sm">
            Zatwierdź
          </Button>
          <Button onClick={onHide} size="sm" className="ms-1">
            Anuluj
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
