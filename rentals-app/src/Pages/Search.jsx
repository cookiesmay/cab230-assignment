import { useState } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../Components/SearchBar.jsx";
import Rentals from "../Components/Rentals.jsx";

function Search() {
  // 1. Change state from a string ("") to an empty object ({})
  const [query, setQuery] = useState({}); 

  // 2. This function now receives the full filters object from SearchBar
  const handleSearch = (newFilters) => {
    setQuery(newFilters);
  };
  
  return (
    <Container fluid>
      <div className="Search">
        <h1>Rental Search</h1>
        <SearchBar onSubmit={handleSearch} />
         <hr />
        <Rentals searchParams={query} />
      </div>
    </Container>
  );
}

export default Search;