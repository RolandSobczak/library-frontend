import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import API from "../../../../requests";
import { AppContext } from "../../../AppProvider";

const Borrowing = ({
  book,
  created,
  predicted_returnal_date,
  returnal_date,
  lastBorrowingElement,
}) => {
  const navigate = useNavigate();
  const { urls } = useContext(AppContext);
  const [bookData, setBookData] = useState({});

  const fetchBook = async () => {
    const { data } = await API.request({
      url: urls.books.href,
      method: urls.books.method,
      params: { id: book },
    });
    setBookData(data.results[0]);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <Col>
      <div ref={lastBorrowingElement}>
        <Card>
          <Card.Img
            variant="top"
            src={
              bookData.img ? bookData.img : "https://via.placeholder.com/100"
            }
          />
          <Card.Body>
            <Card.Title className="d-flex">
              <p>Ksiąka:</p>
              <Link
                to={`/books/${bookData.slug}`}
                className="mx-2 text-decoration-none"
              >
                {bookData.name}
              </Link>
            </Card.Title>
            <Card.Text>
              koniec wypożyczenia: {predicted_returnal_date}
            </Card.Text>
            <Card.Text>data wypożyczenia: {created.split("T")[0]}</Card.Text>
            <Card.Text>
              data zwrotu: {returnal_date ? returnal_date.split("T")[0] : null}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default Borrowing;
