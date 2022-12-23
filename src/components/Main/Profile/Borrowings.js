import React, { useState, useEffect, useContext } from "react";
import { Card, Container } from "react-bootstrap";
import API from "../../../requests";
import { AppContext } from "../../AppProvider";
import { NavLink } from "react-router-dom";

const BorrwoingsCard = () => {
  const { urls } = useContext(AppContext);
  const [borrowing, setBorrowing] = useState({});
  const [book, setBook] = useState({});

  const fetchLastBorrowing = async () => {
    const { data } = await API.request({
      url: urls.my_borrowings.href,
      method: urls.my_borrowings.method,
      params: { ps: 1, active: true },
    });
    setBorrowing(data.results[0]);
  };

  const fetchBook = async () => {
    const { data } = await API.request({
      url: urls.books.href,
      method: urls.books.method,
      params: {
        id: borrowing.book,
      },
    });
    setBook(data.results[0]);
  };

  const fetchData = async () => {
    await fetchLastBorrowing();
    await fetchBook();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card border="light">
      <Card.Header>
        <NavLink to="/my-borrowings" className="text-decoration-none">
          Twoje wypożyczenia
        </NavLink>
      </Card.Header>
      <Card.Body>
        <Container>
          <Card>
            <Card.Body>
              <h2>Książka: {book.name}</h2>
              <p>
                Data wypożyczenia:{" "}
                {borrowing.created && borrowing.created.split("T")[0]}
              </p>
              <p>Termin zwrotu: {borrowing.predicted_returnal_date}</p>
              <p className="h3 text-primary">
                {borrowing.active ? "Nie zwrócono" : "Zwrócono"}
              </p>
            </Card.Body>
          </Card>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default BorrwoingsCard;
