import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) => 
    `nav-link px-3 ${isActive ? "text-primary fw-bold" : "text-light opacity-75"}`;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 border-bottom border-secondary">
      <Container> 
        
        <Navbar.Brand as={NavLink} to="/" className="fw-bold me-3">
          AusRentals4U
        </Navbar.Brand>

        <div className="vr text-secondary d-none d-lg-block me-2" style={{ width: '2px', alignSelf: 'center', height: '24px' }} />

        <Navbar.Toggle aria-controls="header-nav" />
        
        <Navbar.Collapse id="header-nav">
          

          <Nav className="me-auto align-items-center"> 
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/search" className={navLinkClass}>Rental Search</NavLink>
            {isLoggedIn && (
              <NavLink to="/rated" className={navLinkClass}>Rated Rentals</NavLink>
            )}
          </Nav>


          <Nav className="align-items-center"> 
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                <NavLink to="/register" className={navLinkClass}>Register</NavLink>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} className="text-danger fw-bold px-3">
                Log Out
              </Nav.Link>
            )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;