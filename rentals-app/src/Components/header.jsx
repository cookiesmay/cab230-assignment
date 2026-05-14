import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Australian Rentals</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"> Home</Nav.Link>
            <Nav.Link as={Link} to="/">Login</Nav.Link>
            <Nav.Link as={Link} to="/">Rentals</Nav.Link>
            <Nav.Link as={Link} to="/">Search</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;