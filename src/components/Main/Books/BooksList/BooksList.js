import React, {
  useEffect,
  useRef,
  useCallback,
  useContext,
  useState,
  useReducer,
} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Book from "./Book/Book";
import useListLoad from "../../../Helpers/useListLoad";
import API from "../../../../requests";
import { AppContext } from "../../../AppProvider";
import ListReducer from "../../../Reducers/ListReducer";
import Loading from "../../../UI/Loading";

const BooksList = ({ sortBy, params }) => {
  const [authors, authorsDispatch] = useReducer(ListReducer, []);
  const { urls } = useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const { data } = await API.request({
      url: urls.books.href,
      method: urls.books.method,
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
    sortBy ? links[sortBy].href : urls.books.href,
    sortBy ? links[sortBy].method : urls.books.method,
    params
  );

  const observer = useRef();
  const lastBookElement = useCallback(
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

  const fetchHandler = async () => {
    const { data } = await API.request({
      url: urls.authors.href,
      method: urls.authors.method,
    });
    authorsDispatch({ type: "FETCH", payload: data.results });
  };

  useEffect(() => {
    fetchHandler();
  }, [urls]);

  const books = items.map((obj, index) => {
    const booksAuthors = authors.filter((author) =>
      obj.authors.includes(author.id)
    );
    obj.authorsObj = booksAuthors;
    if (items.length === index + 1) {
      return <Book key={index} {...obj} lastBookElement={lastBookElement} />;
    }
    return <Book key={index} {...obj} lastBookElenent={null} />;
  });

  return (
    <>
      <Container fluid>
        <Row xs={2} md={2} lg={3} xl={4} className="g-4">
          {books}
        </Row>
      </Container>
      {loading && <Loading />}
    </>
  );
};

export default BooksList;
