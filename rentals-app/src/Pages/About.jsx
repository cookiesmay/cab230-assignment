import { Container, Row, Col, Accordion } from "react-bootstrap";
import loginPhoto from "../assets/Login-Photo.png";
import searchPhoto from "../assets/All-Filters.png"; 
import detailPhoto from "../assets/Details-Page.png";
import ratedPhoto from "../assets/Rated-Rentals.png";
import registrationPhoto from "../assets/Registration-Screen.png";

function About() {
  return (
    <Container className="pt-4 pb-5">
      <Row className="justify-content-center">
        <Col md={10} lg={7}>
          <section className="mb-5">
            <h1 className="fw-bold mb-4 text-center">About this project</h1>
            
            <div className="p-4 border rounded shadow-sm bg-white">
              <p className="fs-5 mb-3 fw-medium">
                This project started as a university project for a course focusing 
                on client-side web design, and it is still exactly that. 
                Hope you find it useful.
              </p>

              <p className="mb-4 text-secondary">
                This is a free project... Well actually I had to pay to do the course to make this :(
                Anyway would be appreciated if you can support me in my mission to stave off sleep and
                buy me a coffee{" "}
                <a 
                  href="https://tinyurl.com/3dt9npzk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="fw-bold"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  here
                </a>.
              </p>

              <hr className="my-3 opacity-25" />

              <p className="text-muted mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                <span className="fw-bold text-dark text-uppercase small">Disclaimer:</span> This is a student project. 
                While the data is accurate, the webpage is not always maintained 
                and technical issues may cause temporary inaccuracies.
              </p>
            </div>
          </section>

          <hr className="my-4 border-secondary opacity-25" />

          <section>
            <h4 className="text-center mb-4 fw-bold">User Guide</h4>
            <p className="text-muted text-center mb-4" style={{ fontSize: '0.8rem' }}>
              Please note: Images may be from an older version of the application. 
              Functional changes are prioritized over graphic updates.
            </p>

            <Accordion flush className="shadow-sm border rounded bg-white">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Login & Registration Guide</Accordion.Header>
                <Accordion.Body>
                  <p>
                    Firstly, only logged-in users can utilize some functionality; 
                    currently, only logged-in users can view their reviews as well as 
                    review properties.
                  </p>
                  <p>
                    To sign up, please utilize the <strong>Login/Register</strong> button 
                    at the top of the page then follow the relevant prompts.
                  </p>
                  <div className="text-center mb-3">
                    <img src={loginPhoto} alt="Login Page" className="img-fluid border border-dark rounded shadow-sm" />
                  </div>
                  <h6 className="text-muted mt-4 mb-2 text-uppercase small fw-bold text-center">Registration Screen</h6>
                  <div className="text-center">
                    <img src={registrationPhoto} alt="Registration Page" className="img-fluid border border-dark rounded shadow-sm" />
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Search Guide</Accordion.Header>
                <Accordion.Body>
                  <p>
                    This website is predominantly meant to be used through the rental search page. 
                    This page allows you to retrieve different rentals, and the search bar allows 
                    for specific criteria:
                  </p>
                  <ul>
                    <li>Min/Max rental price</li>
                    <li>Specific suburbs</li>
                    <li>Bedroom and bathroom counts</li>
                  </ul>
                  <div className="text-center mb-4">
                    <img src={searchPhoto} alt="Search Filters" className="img-fluid border border-dark rounded shadow-sm" />
                  </div>
                  <p>
                    On the search page, you can select a single row to open a more detailed view, 
                    showing further information and the property's location.
                  </p>
                  <div className="text-center mb-2">
                    <img src={detailPhoto} alt="Detailed View" className="img-fluid border border-dark rounded shadow-sm" />
                  </div>
                  <p className="text-muted small fst-italic mt-2">
                    Note: Use the back button to return to the search results.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Review Guide</Accordion.Header>
                <Accordion.Body>
                  <p>
                    When logged in, you can review properties through the details page 
                    found in the search results.
                  </p>
                  <div className="text-center mb-4">
                    {/* Reusing the detail photo here since it usually contains the review stars */}
                    <img src={detailPhoto} alt="Review Interface" className="img-fluid border border-dark rounded shadow-sm" />
                  </div>
                  <p>
                    Logged-in users can also utilize the <strong>My Rated Rentals</strong> button 
                    at the top of the page to view a history of properties they have rated.
                  </p>
                  <div className="text-center mb-2">
                    <img src={ratedPhoto} alt="Rated Rentals Page" className="img-fluid border border-dark rounded shadow-sm" />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default About;