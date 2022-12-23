import React, { useState } from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import API from "../../../../../requests";
import { AppContext } from "../../../../AppProvider";

const AddCollection = ({ currentBook, setAddWindow }) => {
  const [name, setName] = useState("");
  const changeNameHandler = (e) => setName(e.target.value);
  const { urls } = useContext(AppContext);

  const addCollectionHandler = async () => {
    const { data } = await API.request({
      url: urls.my_collections.href,
      method: urls.my_collections.method,
    });
    API.request({
      url: data._links.create.href,
      method: data._links.create.method,
      data: {
        name,
        books: [currentBook],
      },
    });
    setAddWindow(false);
  };

  return (
    <Form.Group className="mb-3 d-flex justify-content-center">
      <Form.Control
        value={name}
        onChange={changeNameHandler}
        type="text"
        placeholder="Nazwa kolekcji"
      />
      <Button variant="success" onClick={addCollectionHandler}>
        Zapisz
      </Button>
    </Form.Group>
  );
};

export default AddCollection;
