import React, { useState, useContext, useEffect, useReducer } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Col, Row } from "react-bootstrap";
import ReltionFilter from "../../../UI/RelationFilter";
import API from "../../../../requests";
import { AppContext } from "../../../AppProvider";
import Accordion from "react-bootstrap/Accordion";
import DateRangeFilter from "../../../UI/DateRangeFilter";

const FilterModal = ({ show, onClose, setParams }) => {
  const [author, setAuthors] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [authorUrl, setAuthorUrl] = useState([]);
  const [categoriesUrl, setCategoriesUrl] = useState([]);
  const { urls } = useContext(AppContext);

  const fetchUrls = async () => {
    const authors = await API.request({
      url: urls.authors.href,
      method: urls.authors.method,
      params: { ps: 1 },
    });
    const categories = await API.request({
      url: urls.categories.href,
      method: urls.categories.method,
      params: { ps: 1 },
    });
    const authorLink = authors.data._links.total_borrowings;
    const categoriesLink = categories.data._links.total_borrowings;

    setAuthorUrl([authorLink.href, authorLink.method]);
    setCategoriesUrl([categoriesLink.href, categoriesLink.method]);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  useEffect(
    () =>
      setParams({
        authors: author,
        category,
        publication_date_after: startDate,
        publication_date_before: endDate,
      }),
    [author, category, startDate, endDate]
  );

  return (
    <Modal
      show={show}
      onHide={onClose}
      fullscreen={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Filtruj</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Autorzy</Accordion.Header>
              <Accordion.Body>
                <ReltionFilter
                  url={authorUrl[0]}
                  method={authorUrl[1]}
                  setOutput={setAuthors}
                  attrs={["first_name", "last_name"]}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Kategoria</Accordion.Header>
              <Accordion.Body>
                <ReltionFilter
                  url={categoriesUrl[0]}
                  method={categoriesUrl[1]}
                  setOutput={setCategory}
                  attrs={["name"]}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Data wydania</Accordion.Header>
              <Accordion.Body>
                <Container className="my-4">
                  <h3 className="text-center">Data wydania</h3>
                  <DateRangeFilter
                    minDate={startDate}
                    setMinDate={setStartDate}
                    maxDate={endDate}
                    setMaxDate={setEndDate}
                  />
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
