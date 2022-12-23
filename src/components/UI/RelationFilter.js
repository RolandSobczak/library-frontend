import React, { useReducer, useState, useEffect } from "react";
import API from "../../requests";
import useListLoad from "../Helpers/useListLoad";
import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

const ReltionFilter = ({ url, method, setOutput, attrs }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => setOutput(activeItem), [activeItem]);

  const { items, hasNext, loading, error } = useListLoad(
    page,
    setPage,
    5,
    url,
    method,
    {}
  );

  const showMore = () => hasNext && setPage((prevPage) => prevPage + 1);

  const itemsLabels = items.map((obj) => {
    const words = attrs.map((attr) => obj[attr]);
    return words.join(" ");
  });

  const listGroupItem = items.map((element, index) => (
    <ListGroup.Item
      active={activeItem === element.id}
      onClick={() => setActiveItem(element.id)}
      key={element.id}
    >
      {itemsLabels[index]}
    </ListGroup.Item>
  ));

  return (
    <>
      <ListGroup>{listGroupItem}</ListGroup>
      {hasNext && <Button onClick={showMore}>Więcej</Button>}
    </>
  );
};

export default ReltionFilter;
