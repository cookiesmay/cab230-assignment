import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

export default function SearchBar({onSubmit}) {
    const [filters, setFilters] = useState({
        suburb: "",
        minRent: "",
        propertyType: "Any",
        state: "Any"
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
  return (
    <Container className="mb-4">
      <Form onSubmit={(e) => { e.preventDefault(); onSubmit(filters); }}>
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Label>Suburb</Form.Label>
            <Form.Control 
              name="suburb" 
              value={filters.suburb} 
              onChange={handleInputChange} 
              placeholder="e.g. Sydney" 
            />
          </Col>
          <Col md={2}>
            <Form.Label>Min Rent</Form.Label>
            <Form.Control 
              name="minRent" 
              type="number" 
              value={filters.minRent} 
              onChange={handleInputChange} 
            />
          </Col>
          <Col md={3}>
            <Form.Label>Property Type</Form.Label>
            <Form.Select name="propertyType" value={filters.propertyType} onChange={handleInputChange}>
              <option value="Any">Any</option>
              <option value="house">House</option>
              <option value="unit">Unit</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button type="submit" variant="primary" className="w-100">Search</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}