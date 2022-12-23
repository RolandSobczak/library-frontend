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
  const [country, setCountry] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [countriesUrl, setCountriesUrl] = useState([]);
  const { urls } = useContext(AppContext);

  const fetchUrls = async () => {
    const countries = await API.request({
      url: urls.countries.href,
      method: urls.countries.method,
      params: { ps: 1 },
    });

    const countriesLink = countries.data._links.total_borrowings;

    setCountriesUrl([countriesLink.href, countriesLink.method]);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  useEffect(
    () =>
      setParams({
        origin_country: country,
      }),
    [country, startDate, endDate]
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
              <Accordion.Header>Kraj pochodzenia</Accordion.Header>
              <Accordion.Body>
                <ReltionFilter
                  url={countriesUrl[0]}
                  method={countriesUrl[1]}
                  setOutput={setCountry}
                  attrs={["name"]}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Rok urodzenia</Accordion.Header>
              <Accordion.Body>
                <Container className="my-4">
                  <h3 className="text-center">Rok urodzenia</h3>
                  <DateRangeFilter
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
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
