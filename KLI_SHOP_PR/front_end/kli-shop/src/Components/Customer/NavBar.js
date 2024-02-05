// components/Navbar.js

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/* Documentation:
  The Navbar.js file contains a functional component 'NavBar' responsible for rendering a navigation bar using React Bootstrap components.
   It provides links to different views within the application.

  Structure of this component includes:
  - Usage of React Bootstrap components such as Navbar, Nav, and Container.
  - Utilizes the LinkContainer component from 'react-router-bootstrap' for creating navigation links with React Router.

  Return statement:
    - Renders a Bootstrap Navbar with a dark theme.
    - Includes a link to the home page ("/"), a link to create a new customer ("/create-customer"), and a link to view all customers ("/customers-view").

  Note:
    - Assumes the usage of React Bootstrap and 'react-router-bootstrap' libraries.
    - The navigation links are set up with LinkContainer to work with React Router.
*/

export function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>KLI SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/create-customer">
              <Nav.Link>Create Customer</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customers-view">
              <Nav.Link>Show Customers</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
