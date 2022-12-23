import React from "react";
import { Badge } from "react-bootstrap";

const CurrentBook = ({ name, onRemove }) => {
  return (
    <Badge pill bg="primary" className="p-2 m-1">
      <div className="d-flex align-items-center">
        <span className="h6 m-0">{name}</span>
        <span
          className="material-symbols-outlined ms-2 text-warning "
          style={{ fontSize: "1.2rem" }}
          onClick={onRemove}
        >
          remove
        </span>
      </div>
    </Badge>
  );
};

export default CurrentBook;
