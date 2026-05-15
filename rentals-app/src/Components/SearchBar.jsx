import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { getStates, getPropertyTypes } from "../API/api.js";

const initialState = {
  location: "",
  suburb: "",
  state: "",
  postcode: "",
  minRent: "",
  maxRent: "",
  propertyType:[],
  minBeds: "",
  maxBeds: "",
  minBaths: "",
  maxBaths: "",
  minParks: "",
  maxParks: "",
  minRating: "",
  maxRating: "",
  sortBy: "rent",
  sortOrder: "asc"
};

export default function SearchBar({ onSubmit, initialValues }) {
  const [filters, setFilters] = useState(() => {
    const merged = { ...initialState };
    if (initialValues) {
      Object.keys(initialValues).forEach(key => {
        if (initialValues[key] !== undefined && initialValues[key] !== null) {
          merged[key] = initialValues[key];
        }
      });
    }
    return merged;
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);

  useEffect(() => {
    Promise.all([getPropertyTypes(), getStates()])
      .then(([types, states]) => {
        setAvailableTypes(Array.isArray(types) ? types : []);
        setAvailableStates(Array.isArray(states) ? states : []);
      })
      .catch(err => console.error("Metadata fetch failed:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFilters(initialState);
    onSubmit(initialState);
  };
  const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;
  
  setFilters(prev => {
    const currentTypes = prev.propertyTypes || []; 
    
    if (checked) {
      return { ...prev, propertyTypes: [...currentTypes, value] };
    } else {
      return { ...prev, propertyTypes: currentTypes.filter(t => t !== value) };
    }
  });
};

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const input = (filters.location || "").trim();
    let finalFilters = { ...filters };

    finalFilters.suburb = "";
    finalFilters.state = "";
    finalFilters.postcode = filters.postcode || "";

    if (/^\d{4}$/.test(input)) {
      finalFilters.postcode = input;
    } else {
      const matchedState = (availableStates || []).find(
        s => String(s).toLowerCase() === input.toLowerCase()
      );
      
      if (matchedState) {
        finalFilters.state = matchedState;
      } else if (input !== "") {
        finalFilters.suburb = input;
      }
    }
    onSubmit(finalFilters);
  };

  return (
    <Container className="mb-4">
      <Form className="p-4 bg-white border border-2 border-dark shadow-sm" onSubmit={handleFormSubmit}>
 
        <Row className="g-2 align-items-end flex-nowrap">
          <Col lg={3}>
            <Form.Label className="small fw-bold text-uppercase">Location</Form.Label>
            <Form.Control 
              name="location" 
              className="rounded-0 border-dark shadow-none" 
              value={filters.location} 
              onChange={handleInputChange} 
              placeholder="Suburb, State, Postcode..." 
            />
          </Col>

          <Col lg={2}>
            <Form.Label className="small fw-bold text-uppercase">Sort By</Form.Label>
            <Form.Select 
              name="sortBy" 
              className="rounded-0 border-dark" 
              value={filters.sortBy || "id"} 
              onChange={handleInputChange}
            >
              <option value="id">ID</option>
              <option value="title">Title</option>
              <option value="rent">Rent</option>
              <option value="propertyType">Property Type</option>
              <option value="suburb">Suburb</option>
              <option value="state">State</option>
              <option value="postcode">Postcode</option>
              <option value="bedrooms">Bedrooms</option>
              <option value="bathrooms">Bathrooms</option>
              <option value="parkingSpaces">Parking</option>
              <option value="averageRating">Rating</option>
              <option value="numRatings">Review Count</option>
              <option value="latitude">Latitude</option>
              <option value="longitude">Longitude</option>
            </Form.Select>
            </Col>


          <Col lg={2}>
            <Form.Label className="small fw-bold text-uppercase">Order</Form.Label>
            <Form.Select name="sortOrder" className="rounded-0 border-dark shadow-none" value={filters.sortOrder} onChange={handleInputChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Form.Select>
          </Col>


          <Col lg={5} className="d-flex gap-1 pt-2">
            <Button 
              variant="outline-dark" 
              className="flex-fill rounded-0 fw-bold px-1" 
              style={{ fontSize: '0.8rem' }}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? "CLOSE" : "FILTERS"}
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-fill rounded-0 fw-bold px-1"
              style={{ fontSize: '0.8rem' }}
            >
              SEARCH
            </Button>
            <Button 
              variant="danger" 
              className="rounded-0 fw-bold px-2" 
              onClick={handleClear}
            >
              Clear
            </Button>
          </Col>
        </Row>

        {showAdvanced && (
          <div className="mt-4 pt-4 border-top border-dark">
            <Row className="g-3 mb-3">
              <Col md={4}>
                <Form.Label className="small fw-bold">RENT RANGE ($)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control name="minRent" type="number" step="50" className="rounded-0 border-dark" value={filters.minRent || ""} onChange={handleInputChange} placeholder="Min" />
                  <Form.Control name="maxRent" type="number" step="50" className="rounded-0 border-dark" value={filters.maxRent || ""} onChange={handleInputChange} placeholder="Max" />
                </div>
              </Col>
              <Col md={4}>
                <Form.Label className="small fw-bold text-uppercase">Property Type</Form.Label>
                <div 
                  className="border border-dark p-2 bg-light shadow-inner" 
                  style={{ maxHeight: '150px', overflowY: 'auto' }}
                >
                  {availableTypes.map(type => (
                    <Form.Check 
                      key={type}
                      type="checkbox"
                      id={`type-${type}`}
                      label={type}
                      value={type}
                      checked={(filters.propertyTypes || []).includes(type)} 
                      onChange={handleCheckboxChange}
                      className="text-capitalize small mb-1"
                    />
                  ))}
                </div>
              </Col>
              <Col md={4}>
                <Form.Label className="small fw-bold">STATE PICKER</Form.Label>
                <Form.Select name="location" className="rounded-0 border-dark" value={filters.location || ""} onChange={handleInputChange}>
                  <option value="">Any State</option>
                  {availableStates.filter(Boolean).map(state => <option key={state} value={state}>{String(state).toUpperCase()}</option>)}
                </Form.Select>
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col md={4}>
                <Form.Label className="small fw-bold">BEDROOMS (MIN-MAX)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control name="minBeds" type="number" min="0" className="rounded-0 border-dark" value={filters.minBeds || ""} onChange={handleInputChange} placeholder="Min" />
                  <Form.Control name="maxBeds" type="number" min="0" className="rounded-0 border-dark" value={filters.maxBeds || ""} onChange={handleInputChange} placeholder="Max" />
                </div>
              </Col>
              <Col md={4}>
                <Form.Label className="small fw-bold">BATHROOMS (MIN-MAX)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control name="minBaths" type="number" min="0" className="rounded-0 border-dark" value={filters.minBaths || ""} onChange={handleInputChange} placeholder="Min" />
                  <Form.Control name="maxBaths" type="number" min="0" className="rounded-0 border-dark" value={filters.maxBaths || ""} onChange={handleInputChange} placeholder="Max" />
                </div>
              </Col>
              <Col md={4}>
                <Form.Label className="small fw-bold">PARKING (MIN-MAX)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control name="minParks" type="number" min="0" className="rounded-0 border-dark" value={filters.minParks || ""} onChange={handleInputChange} placeholder="Min" />
                  <Form.Control name="maxParks" type="number" min="0" className="rounded-0 border-dark" value={filters.maxParks || ""} onChange={handleInputChange} placeholder="Max" />
                </div>
              </Col>
            </Row>
            <Col md={4}>
              <Form.Label className="small fw-bold uppercase">Manual Postcode</Form.Label>
              <Form.Control 
                name="postcode" 
                type="text" 
                maxLength="4" 
                className="rounded-0 border-dark" 
                value={filters.postcode || ""} 
                onChange={handleInputChange} 
                placeholder="e.g. 4000" 
              />
            </Col>
            <Row className="g-3">
              <Col md={4}>
                <Form.Label className="small fw-bold">RATING RANGE (★)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control name="minRating" type="number" min="0" max="5" step="0.5" className="rounded-0 border-dark" value={filters.minRating || ""} onChange={handleInputChange} placeholder="Min ★" />
                  <Form.Control name="maxRating" type="number" min="0" max="5" step="0.5" className="rounded-0 border-dark" value={filters.maxRating || ""} onChange={handleInputChange} placeholder="Max ★" />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Form>
    </Container>
  );
}