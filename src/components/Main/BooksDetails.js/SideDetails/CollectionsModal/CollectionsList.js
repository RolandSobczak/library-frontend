import React, { useState, useContext } from "react";
import { AppContext } from "../../../../AppProvider";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import API from "../../../../../requests";
import useFetchAll from "../../../../Helpers/useFetchAll";

const CollectionsList = ({ currentBook, setAddWindow }) => {
  const { urls, user } = useContext(AppContext);
  const { items, dispatch } = useFetchAll(
    user && user.username,
    5,
    urls.my_collections.href,
    urls.my_collections.method,
    {}
  );

  const addToCollectionHandler = async (collection) => {
    const { data } = await API.request({
      url: collection.href,
      method: urls.my_collections.method,
    });
    await API.request({
      url: data._links.partial_update.href,
      method: data._links.partial_update.method,
      data: { books: [...data.books, currentBook] },
    });
    dispatch({
      type: "PARTIAL_UPDATE",
      payload: {
        id: collection.id,
        fieldName: "books",
        newValue: [...data.books, currentBook],
      },
    });
  };

  const deleteFromCollection = async (collection) => {
    const { data } = await API.request({
      url: collection.href,
      method: urls.my_collections.method,
    });
    await API.request({
      url: data._links.partial_update.href,
      method: data._links.partial_update.method,
      data: { books: data.books.filter((obj) => obj !== currentBook) },
    });
    const newState = Object.create(data);
    newState.books = data.books.filter((obj) => obj !== currentBook);
    await dispatch({
      type: "UPDATE",
      payload: newState,
    });
  };

  const onChangeHandler = (collection) => {
    if (!collection.books.includes(currentBook)) {
      addToCollectionHandler(collection);
    } else {
      deleteFromCollection(collection);
    }
  };

  const collections = items.map((obj) => (
    <ListGroupItem key={obj.id} className="d-flex justify-content-between">
      <input
        type="checkbox"
        checked={obj.books.includes(currentBook)}
        value={obj.books.includes(currentBook)}
        onChange={(e) => {
          onChangeHandler(obj);
        }}
      />
      <h2>{obj.name}</h2>
      <p>liczba książek: {obj.books.length}</p>
    </ListGroupItem>
  ));

  return <ListGroup>{collections}</ListGroup>;
};

export default CollectionsList;
