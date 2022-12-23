import React, { useState, useContext, useCallback, useRef } from "react";
import { AppContext } from "../../AppProvider";
import useListLoad from "../../Helpers/useListLoad";
import Loading from "../../UI/Loading";
import { Button, Container, Row } from "react-bootstrap";
import Collection from "./Collection/Collection";
import { Modal } from "react-bootstrap";
import CreationModal from "./CreationModal/CreationModal";

const MyCollections = () => {
  const { urls } = useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [showCreationModal, setShowCreationModal] = useState(false);

  const { items, hasNext, loading, error, dispatch } = useListLoad(
    pageNumber,
    setPageNumber,
    10,
    urls.my_collections.href,
    urls.my_collections.method,
    {}
  );

  const observer = useRef();
  const lastCollectionElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasNext]
  );

  const collections = items.map((obj, index) => {
    if (items.length === index + 1) {
      <Collection
        key={obj.id}
        {...obj}
        lastCollectionElement={lastCollectionElement}
        collectionsDispatch={dispatch}
      />;
    }
    return (
      <Collection
        key={obj.id}
        {...obj}
        lastCollectionElement={null}
        collectionsDispatch={dispatch}
      />
    );
  });

  return (
    <>
      <Container fluid>
        <h1 className="text-center m-5">Twoje kolekcje:</h1>
        <Button
          className="d-flex align-items-center p-2 mx-auto my-5"
          onClick={() => {
            setShowCreationModal(true);
          }}
          variant="success"
        >
          <span className="">Dodaj</span>
          <span className="material-symbols-outlined">add</span>
        </Button>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {collections}
        </Row>
      </Container>
      {loading && <Loading />}
      <CreationModal
        show={showCreationModal}
        onHide={() => setShowCreationModal(false)}
        collectionsDispatch={dispatch}
      />
    </>
  );
};

export default MyCollections;
