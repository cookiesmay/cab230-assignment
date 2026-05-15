import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import homeImg from "../assets/Home-Page-Photo.jpg";
import SearchBar from "../Components/SearchBar.jsx";


function Home() {
  const navigate = useNavigate();
  const handleQuickSearch = (filters) => {
    navigate("/search", { state: { initialFilters: filters } });
  };
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center"></Row>
      <Col md={10} lg={8} className="mx-auto">
      <h1>Welcome to AusRentals4U</h1>
          <p className="lead">
            The place that meets all your rental searching needs.
          </p>
          
          <img 
            src={homeImg} 
            alt="Australian Homes" 
            className="img-fluid rounded shadow my-4 d-block mx-auto" 
            style={{ maxHeight: "600px" }}
          />

          <p>
            We are proud to have built a website that can meet all your needs 
            for finding properties near you, that suit you. Get searching now!!!
          </p>
          <div className="my-5 mx-auto" style={{ maxWidth: "1100px" }}> 
            <SearchBar onSubmit={handleQuickSearch} />
          </div>
          <p>
            First time here? Click{" "}
            <Link 
              to="/about" 
              style={{ color: "blue", textDecoration: "underline" }}
            >
              here
            </Link>{" "}
            to view the User Guide.
          </p>
          
        </Col>
    </Container>
  );
}

export default Home;