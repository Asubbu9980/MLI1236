import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./index.css";

function InvoiceNavbar() {
  return (
    <Navbar bg="dark" expand="md">
      <Container>
        <Navbar.Brand>Invoice Generator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="" className="text-muted">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="invoice" className="text-muted">
              Invoice
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InvoiceNavbar;
