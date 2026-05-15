import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="mt-auto py-2 bg-light border-top">
      <Container>
        <Row className="justify-content-center">
         <Col className="text-center text-muted" style={{ fontSize: '0.7rem' }}>
            <p className="mb-1 fw-bold text-dark">ACKNOWLEDGEMENT OF COUNTRY</p>
            <p className="mb-1" style={{ lineHeight: '1.2' }}>
              AusRentals4U acknowledges the Traditional Owners of Country throughout Australia and acknowledges their continuing connection to land, waters and community. We pay our respects to the people, the cultures and the Elders past and present.
            </p>
            <p className="fst-italic mb-1">
              Aboriginal and Torres Strait Islander people should be aware that this website may contain images, voices and names of deceased persons.
            </p>
            <div className="pt-1 border-top mt-1" style={{ fontSize: '0.65rem' }}>
              &copy; {new Date().getFullYear()} AusRentals4U (CAB230 - Software Development for the Web). All rights reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;