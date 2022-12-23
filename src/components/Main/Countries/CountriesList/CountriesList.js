import React, {
  useEffect,
  useRef,
  useCallback,
  useContext,
  useState,
} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useListLoad from "../../../Helpers/useListLoad";
import API from "../../../../requests";
import { AppContext } from "../../../AppProvider";
import Loading from "../../../UI/Loading";
import Country from "./Country";

const CountriesList = ({ sortBy, params }) => {
  const { urls } = useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const { data } = await API.request({
      url: urls.countries.href,
      method: urls.countries.method,
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
    sortBy ? links[sortBy].href : urls.countries.href,
    sortBy ? links[sortBy].method : urls.countries.method,
    params
  );

  const observer = useRef();
  const lastCategoriesElement = useCallback(
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

  const countries = items.map((obj, index) => {
    if (items.length === index + 1) {
      return (
        <Country
          key={index}
          {...obj}
          lastCategoryElement={lastCategoriesElement}
        />
      );
    }
    return <Country key={index} {...obj} lastCategoryElenent={null} />;
  });

  return (
    <>
      <Container fluid>
        <Row xs={2} md={2} lg={3} xl={4} className="g-4">
          {countries}
        </Row>
      </Container>
      {loading && <Loading />}
    </>
  );
};

export default CountriesList;
