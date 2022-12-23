import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import BorrwoingsCard from "./Borrowings";
import CollectionsCard from "./Collections";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, urls, isLoged, logoutHandler } = useContext(AppContext);

  //   useEffect(() => navigate("/signin"));

  return (
    <Container>
      <Row className="my-4">
        <img
          src={user.profile.image}
          alt="mdo"
          className="rounded-circle mx-auto img-thumbnail w-50"
        />
      </Row>
      <Row className="text-center">
        <h1>{user.username}</h1>
        <h2>
          {user.first_name} {user.last_name}
        </h2>
        <p className="m-0">{user.email}</p>
        <Container className="my-4">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              logoutHandler();
              navigate("/signin");
            }}
          >
            Wyloguj
          </Button>
        </Container>
      </Row>
      <Row xs={1} md={2}>
        <Col>
          <BorrwoingsCard />
        </Col>
        <Col>
          <CollectionsCard />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
