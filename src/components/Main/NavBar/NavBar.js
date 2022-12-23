import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "bootstrap";
import { useContext } from "react";
import { AppContext } from "../../AppProvider";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ProfileLink from "./ProfileLink";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  return (
    <nav className="main-nav">
      <Navbar bg="light" expand="md">
        <Container className="w-100">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/LibraryLogo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            OpenRead
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="#home">Regulamin</Nav.Link>
              <Nav.Link href="#link">OpenRead</Nav.Link>
              <NavDropdown title="Zasoby" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/authors")}>
                  Autorzy
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/categories")}>
                  Kategorie
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/countries")}>
                  Kraje pochodzenia
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/books")}>
                  Ksiąki
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div className="ms-auto p-2 d-flex align-items-center">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
              {user && user.username ? (
                <ProfileLink />
              ) : (
                <NavLink className="ms-2" to="/signin">
                  Zaloguj
                </NavLink>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

export default NavBar;
