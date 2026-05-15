import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { Map, Marker } from "pigeon-maps";
import { getRentalById, postRating, getSpecificRating } from "../API/api";
import { useOutletContext } from "react-router-dom";

export default function RentalDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const { token } = useOutletContext();

  useEffect(() => {
    getRentalById(id).then(data => setProperty(data));
    if (token) {
    getSpecificRating(id).then(data => {
       if(data && data.rating) setUserRating(data.rating);
    });
    }
  }, [id, token]);

  const handleRate = async (val) => {
    setUserRating(val);
    await postRating(id, val);
    alert("Rating submitted!");
  };

  if (!property) return <Container className="mt-5">Loading...</Container>;

  return (
    <Container className="py-5">
      <Row>
        <Col lg={7}>
          <h1 className="fw-bold">{property.title}</h1>
          <p className="text-muted">{property.streetAddress}, {property.suburb}, {property.state} {property.postcode}</p>
          <hr className="border-dark" />
          
          <div className="d-flex gap-4 mb-4">
            <span><strong>{property.bedrooms}</strong> Beds</span>
            <span><strong>{property.bathrooms}</strong> Baths</span>
            <span><strong>{property.parkingSpaces}</strong> Parks</span>
            <Badge bg="primary" className="rounded-0 p-2">${property.rent} / week</Badge>
          </div>

          <h4>Description</h4>
        <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
            {property.description.replace(/<br\s*\/?>/gi, '\n')}
        </p>
        </Col>

        <Col lg={5}>
          <div className="border border-2 border-dark" style={{ height: "400px" }}>
            <Map 
              height={400} 
              defaultCenter={[parseFloat(property.latitude), parseFloat(property.longitude)]} 
              defaultZoom={15}
            >
              <Marker width={50} anchor={[parseFloat(property.latitude), parseFloat(property.longitude)]} />
            </Map>
          </div>

          <div className="mt-4 p-3 bg-light border border-dark">
            <h5>{token ? "Rate this property" : "Login to rate"}</h5>
            {token ? (
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <Button 
                    key={n} 
                    variant={userRating >= n ? "warning" : "outline-dark"}
                    onClick={() => handleRate(n)}
                  >
                    ★
                  </Button>
                ))}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary w-100 rounded-0">Login</Link>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}