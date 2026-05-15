import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function Header({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setToken(null);                   
    navigate("/");                    
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">AusRentals4U</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/search">Search</Nav.Link>
            
            {/* 1. Added About link back in */}
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            
            {/* 2. Rated Rentals only shows if the token exists */}
            {token && (
              <Nav.Link as={NavLink} to="/rated">Rated Rentals</Nav.Link>
            )}
          </Nav>
          
          <Nav className="align-items-center">
            {token ? (
              <Button variant="outline-light" onClick={handleLogout} className="ms-lg-3 my-2 my-lg-0">
                Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}