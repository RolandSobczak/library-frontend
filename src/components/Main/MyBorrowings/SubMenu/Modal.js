import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Col, Row } from "react-bootstrap";
import { AppContext } from "../../../AppProvider";
import Accordion from "react-bootstrap/Accordion";
import DateRangeFilter from "../../../UI/DateRangeFilter";
import BooleanFilter from "../../../UI/BooleanFilter";
import { useEffect } from "react";

const FilterModal = ({ show, onClose, setParams }) => {
  const { urls } = useContext(AppContext);
  const [minReturnal, setMinReturnal] = useState("");
  const [maxReturnal, setMaxReturnal] = useState("");
  const [minPredictedReturnal, setMinPredictedReturnal] = useState("");
  const [maxPredictedReturnal, setMaxPredictedReturnal] = useState("");
  const [minCreated, setMinCreated] = useState("");
  const [maxCreated, setMaxCreated] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    setParams({
      returnal_date_after: minReturnal,
      returnal_date_before: maxReturnal,
      predicted_returnal_date_after: minPredictedReturnal,
      predicted_returnal_date_before: maxPredictedReturnal,
      created_after: minCreated,
      created_before: maxCreated,
      active,
    });
  }, [
    minReturnal,
    maxReturnal,
    minPredictedReturnal,
    maxPredictedReturnal,
    minCreated,
    maxCreated,
    active,
  ]);

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
              <Accordion.Header>Data początku wypożyczenia</Accordion.Header>
              <Accordion.Body>
                <Container className="my-4">
                  <h3 className="text-center">Data początku wypożyczenia</h3>
                  <DateRangeFilter
                    minDate={minCreated}
                    setMinDate={setMinCreated}
                    maxDate={maxCreated}
                    setMaxDate={setMaxCreated}
                  />
                </Container>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Data końca wypożyczenia</Accordion.Header>
              <Accordion.Body>
                <Container className="my-4">
                  <h3 className="text-center">Data końca wypożyczenia</h3>
                  <DateRangeFilter
                    minDate={minPredictedReturnal}
                    setMinDate={setMinPredictedReturnal}
                    maxDate={maxPredictedReturnal}
                    setMaxDate={setMaxPredictedReturnal}
                  />
                </Container>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Data zwrotu</Accordion.Header>
              <Accordion.Body>
                <Container className="my-4">
                  <h3 className="text-center">Data zwrotu</h3>
                  <DateRangeFilter
                    minDate={minReturnal}
                    setMinDate={setMinReturnal}
                    maxDate={maxReturnal}
                    setMaxDate={setMaxReturnal}
                  />
                </Container>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Oddane</Accordion.Header>
              <Accordion.Body>
                <Container className="my-4 text-center">
                  <h3 className="text-center">Oddane</h3>
                  <BooleanFilter value={active} setValue={setActive} />
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
