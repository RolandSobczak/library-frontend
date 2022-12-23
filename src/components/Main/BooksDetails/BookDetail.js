import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AppContext } from "../../AppProvider";
import API from "../../../requests";
import useFetchAll from "../../Helpers/useFetchAll";
import BookImage from "./Image";
import SideDetails from "./SideDetails/SideDetails";
import Suggestions from "./SideDetails/Suggestions";
import { data } from "autoprefixer";

const BookDetails = () => {
  const { slug } = useParams();
  const { urls, user } = useContext(AppContext);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [canBorrow, setCanBorrow] = useState(false);

  const fetchBook = async () => {
    const bookList = await API.request({
      url: urls.books.href,
      method: urls.books.method,
      params: {
        slug,
      },
    });
    const bookUrl = bookList.data.results[0].href;
    const { data } = await API.request({
      url: bookUrl,
      method: urls.books.method,
    });
    const category = await API.request({
      url: urls.categories.href,
      method: urls.categories.method,
      params: {
        id: data.category,
      },
    });
    data.categoryObj = category.data.results[0];
    setBook(data);
  };

  const checkIfCanBorrow = async () => {
    const { data } = await API.request({
      url: urls.my_borrowings.href,
      method: urls.my_borrowings.method,
    });
    const borrowingStatusResponse = await API.request({
      url: book._links.borrowing_status.href,
      method: book._links.borrowing_status.method,
    });
    const borrowingsCounter = data.results.filter((obj) => obj.active).length;
    const borrowingStatus = borrowingStatusResponse.data.status;
    if (borrowingsCounter < 3 && !borrowingStatus) setCanBorrow(true);
  };

  const borrowHandler = async () => {};

  useEffect(() => {
    fetchBook();
  }, [slug]);

  useEffect(() => {
    if (book.name && user) checkIfCanBorrow();
  }, [user, book]);

  const { items, error } = useFetchAll(
    book.authors && book.authors.length > 0,
    5,
    urls.authors.href,
    urls.authors.method,
    { id: book.authors ? book.authors.toString() : null }
  );

  return (
    <Container fluid className="my-4">
      <Row xs={1} md={2}>
        <Col>
          <BookImage imgUrl={book.img} />
        </Col>
        <Col>
          <SideDetails {...book} authorsObj={items} />
          {canBorrow ? <Button className="my-5">Wypożycz</Button> : null}
        </Col>
      </Row>
      <p className="m-4 text-center">{book.description}</p>
      <Suggestions suggestion={book.suggestion ? book.suggestion : []} />
    </Container>
  );
};

export default BookDetails;
