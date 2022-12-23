import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import CollectionsModal from "./CollectionsModal/CollectionsModal";

const SideDetails = ({
  id,
  name,
  authorsObj,
  categoryObj,
  publication_date,
  is_available,
  available_count,
  suggestion,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const onClose = () => setModalShow(false);
  const onShow = () => setModalShow(true);

  const authorsElements = authorsObj.map((author, index) => (
    <Badge key={index} bg="primary" className="m-1">
      {author.first_name + " " + author.last_name}
    </Badge>
  ));

  const availableCountColor = () => {
    if (available_count > 2) {
      return "success";
    } else if (available_count) {
      return "warning";
    } else {
      return "danger";
    }
  };

  return (
    <div className="text-left">
      <div className="d-flex justify-content-between m-3">
        <h1 className="text-left">{name}</h1>
        <span className="material-symbols-outlined" onClick={onShow}>
          bookmark
        </span>
        <CollectionsModal onClose={onClose} show={modalShow} currentBook={id} />
      </div>
      <div className="d-flex">
        <p>Autorzy:</p>
        <div className="authors">{authorsElements}</div>
      </div>
      <div className="d-flex">
        <p className="m-0">Kategoria:</p>
        <Badge bg="primary" className="m-1">
          {categoryObj && categoryObj.name}
        </Badge>
      </div>
      <p className="text-left">data wydania: {publication_date}</p>
      <div className="d-flex">
        <p className="m-0 me-1">Dostępność:</p>
        {is_available ? (
          <Badge bg="success" className="m-1">
            Dostępna
          </Badge>
        ) : (
          <Badge bg="danger" className="m-1">
            Niedostępna
          </Badge>
        )}
      </div>
      <div className="d-flex">
        <p className="m-0">W bibliotece:</p>
        <Badge bg={availableCountColor()} className="ms-1">
          {available_count}
        </Badge>
      </div>
    </div>
  );
};

export default SideDetails;
