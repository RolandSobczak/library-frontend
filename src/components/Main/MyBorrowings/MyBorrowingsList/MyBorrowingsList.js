import React, { useState, useContext, useRef, useCallback } from "react";
import API from "../../../../requests";
import { AppContext } from "../../../AppProvider";
import useListLoad from "../../../Helpers/useListLoad";
import Borrowing from "./Borrowing";
import Loading from "../../../UI/Loading";
import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";

const MyBorrowingsList = ({ sortBy, params }) => {
  const { urls } = useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const { data } = await API.request({
      url: urls.my_borrowings.href,
      method: urls.my_borrowings.method,
    });
    setLinks(data._links);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const { items, hasNext, loading, error } = useListLoad(
    pageNumber,
    setPageNumber,
    10,
    sortBy ? links[sortBy].href : urls.my_borrowings.href,
    sortBy ? links[sortBy].method : urls.my_borrowings.method,
    params
  );

  const observer = useRef();
  const lastBorrowingElement = useCallback(
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

  const borrowings = items.map((obj, index) => {
    if (items.length === index + 1) {
      return (
        <Borrowing
          {...obj}
          key={obj.id}
          lastBorrowingElement={lastBorrowingElement}
        />
      );
    }
    return <Borrowing {...obj} key={obj.id} lastBorrowingElenent={null} />;
  });

  return (
    <>
      <Row xs={2} md={2} lg={3} xl={4} className="g-4">
        {borrowings}
      </Row>
      {loading && <Loading />}
    </>
  );
};

export default MyBorrowingsList;
