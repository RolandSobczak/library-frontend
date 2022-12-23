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
import Author from "./Author/Author";
import useListLoad from "../../../Helpers/useListLoad";
import API from "../../../../requests";
import { AppContext } from "../../../AppProvider";
import ListReducer from "../../../Reducers/ListReducer";
import Loading from "../../../UI/Loading";

const AuthorsList = ({ sortBy, params }) => {
  const [countries, countriesDispatch] = useReducer(ListReducer, []);
  const { urls } = useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const { data } = await API.request({
      url: urls.authors.href,
      method: urls.authors.method,
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
    sortBy ? links[sortBy].href : urls.authors.href,
    sortBy ? links[sortBy].method : urls.authors.method,
    params
  );

  const observer = useRef();
  const lastAuthorElement = useCallback(
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
      url: urls.countries.href,
      method: urls.countries.method,
    });
    countriesDispatch({ type: "FETCH", payload: data.results });
  };

  useEffect(() => {
    fetchHandler();
  }, [urls]);

  const authors = items.map((obj, index) => {
    const authorOriginCountry = countries.filter(
      (country) => country.id === obj.origin_country
    );
    obj.countryObj = authorOriginCountry;
    if (items.length === index + 1) {
      return (
        <Author key={index} {...obj} lastAuthorElement={lastAuthorElement} />
      );
    }
    return <Author key={index} {...obj} lastBookElenent={null} />;
  });

  return (
    <>
      <Container fluid>
        <Row xs={2} md={2} lg={3} xl={4} className="g-4">
          {authors}
        </Row>
      </Container>
      {loading && <Loading />}
    </>
  );
};

export default AuthorsList;
