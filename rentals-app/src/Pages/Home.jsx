import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import homeImg from "../assets/homePagePhoto.jpg";


function Home() {
  const [suburb, setSuburb] = useState("");
  const navigate = useNavigate();
  const handleQuickSearch = (e) => {
    e.preventDefault();
    navigate("/search", { state: { initialSuburb: suburb } });
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

          <Form onSubmit={handleQuickSearch} className="d-flex gap-2 justify-content-center mx-auto" style={{ maxWidth: "500px" }}>
            <Form.Control
              type="text"
              placeholder="Enter suburb..."
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              style={{ maxWidth: "450px" }}
            />
            <Button variant="primary" type="submit">Search</Button>
          </Form>

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