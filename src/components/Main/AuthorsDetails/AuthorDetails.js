import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import API from "../../../requests";
import { AppContext } from "../../AppProvider";
import useFetchElement from "../../Helpers/useFetchElementBy";
import AuthorImage from "./Image";
import SideDetails from "./SideDetails";
import BooksList from "../Books/BooksList/BooksList";

const AuthorsDetails = () => {
  const [country, setCountry] = useState({});
  const { slug } = useParams();
  const { urls } = useContext(AppContext);

  const [author, isLoading, error] = useFetchElement(
    urls.authors.href,
    urls.authors.method,
    "slug",
    slug
  );

  const fetchCountry = async () => {
    const { data } = await API.request({
      url: urls.countries.href + `${author.origin_country}/`,
      method: urls.countries.method,
    });
    setCountry(data);
  };

  useEffect(() => {
    if (author.origin_country) {
      fetchCountry();
    }
  }, [author]);

  return (
    <div>
      <Container fluid className="my-4">
        <Row xs={1} md={2}>
          <Col>
            <AuthorImage
              imgUrl={
                author.img ? author.img : "https://via.placeholder.com/100"
              }
            />
          </Col>
          <Col>
            <SideDetails {...author} originCountry={country.name} />
          </Col>
        </Row>
      </Container>
      <div className="text-center">
        <h2>Książki autora:</h2>
        <BooksList params={{ authors: author.id }} />
      </div>
    </div>
  );
};

export default AuthorsDetails;
