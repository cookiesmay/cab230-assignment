import { useState,useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { getStates, getPropertyTypes } from "../API/api.js";

const initialState = {
  location: "",
  minRent: "",
  maxRent: "",
  propertyType: "Any",
  minBeds: "",
  maxBeds: "",
  minBaths: "",
  maxBaths: "",
  minParks: "",
  maxParks: "",
  minRating: ""
};

export default function SearchBar({ onSubmit, initialValues }) {
  const [filters, setFilters] = useState(initialValues || initialState);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  

    useEffect(() => {
    getPropertyTypes().then(types => setAvailableTypes(types));
    }, []);
    useEffect(() => {
        getPropertyTypes().then(setAvailableTypes);
        getStates().then(setAvailableStates); // Fetch states from API
        }, []);

  return (
    <Container className="mb-4">
      <Form className="p-4 bg-white border border-2 border-dark shadow-sm" onSubmit={(e) => { e.preventDefault(); onSubmit(filters); }}>
        <Row className="g-2">
          <Col lg={7} md={6}>
            <Form.Control name="location" className="rounded-0 border-dark py-2" value={filters.location} onChange={handleInputChange} placeholder="Search suburb, postcode or state..." />
          </Col>
          <Col lg={2} md={3}>
            <Button variant="outline-dark" className="w-100 rounded-0 fw-bold py-2" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? "CLOSE" : "FILTERS"}
            </Button>
          </Col>
          <Col lg={3} md={3}>
            <Button type="submit" variant="primary" className="w-100 rounded-0 fw-bold py-2">SEARCH</Button>
          </Col>
        </Row>

        {showAdvanced && (
          <div className="mt-4 pt-4 border-top border-dark">
            <Row className="g-3">
              {/* Rent Range */}
              <Col md={3}>
                <Form.Label className="small fw-bold">MIN RENT</Form.Label>
                <Form.Control name="minRent" type="number" className="rounded-0" value={filters.minRent} onChange={handleInputChange} placeholder="$" />
              </Col>
              <Col md={3}>
                <Form.Label className="small fw-bold">MAX RENT</Form.Label>
                <Form.Control name="maxRent" type="number" className="rounded-0" value={filters.maxRent} onChange={handleInputChange} placeholder="$" />
              </Col>
              <Col md={6}>
                <Form.Label className="small fw-bold">PROPERTY TYPE</Form.Label>
                <Form.Select 
                    name="propertyType" 
                    className="rounded-0 border-dark"
                    value={filters.propertyType}
                    onChange={handleInputChange}
                >
                    <option value="Any">Any Type</option>
                    {availableTypes.map(type => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                    ))}
                </Form.Select>
                </Col>

                <Col md={3}>
                <Form.Label className="small fw-bold">STATE</Form.Label>
                <Form.Select 
                    name="location"
                    className="rounded-0 border-dark"
                    value={filters.location} 
                    onChange={handleInputChange}
                >
                    <option value="">Any State</option>
                    {availableStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                    ))}
                </Form.Select>
                </Col>

              <Col md={3}>
                <Form.Label className="small fw-bold">BEDROOMS (MIN - MAX)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control name="minBeds" type="number" className="rounded-0" value={filters.minBeds} onChange={handleInputChange} placeholder="Min" />
                  <Form.Control name="maxBeds" type="number" className="rounded-0" value={filters.maxBeds} onChange={handleInputChange} placeholder="Max" />
                </div>
              </Col>
              <Col md={3}>
                <Form.Label className="small fw-bold">BATHROOMS (MIN - MAX)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control name="minBaths" type="number" className="rounded-0" value={filters.minBaths} onChange={handleInputChange} placeholder="Min" />
                  <Form.Control name="maxBaths" type="number" className="rounded-0" value={filters.maxBaths} onChange={handleInputChange} placeholder="Max" />
                </div>
              </Col>
              <Col md={3}>
                <Form.Label className="small fw-bold">PARKING (MIN - MAX)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control name="minParks" type="number" className="rounded-0" value={filters.minParks} onChange={handleInputChange} placeholder="Min" />
                  <Form.Control name="maxParks" type="number" className="rounded-0" value={filters.maxParks} onChange={handleInputChange} placeholder="Max" />
                </div>
              </Col>
              <Col md={3}>
                <Form.Label className="small fw-bold">MIN RATING</Form.Label>
                <Form.Select name="minRating" className="rounded-0" value={filters.minRating} onChange={handleInputChange}>
                  <option value="">Any</option>
                  <option value="1">1+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
        )}
      </Form>
    </Container>
  );
}