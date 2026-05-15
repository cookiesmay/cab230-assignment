import { useState } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../Components/SearchBar.jsx";
import Rentals from "../Components/Rentals.jsx";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation(); 
  const [query, setQuery] = useState(location.state?.initialFilters || {});


  const handleSearch = (newFilters) => {
    setQuery(newFilters);
  };
  
  return (
    <Container className="py-4">
      <SearchBar 
        key={JSON.stringify(query)} 
        onSubmit={handleSearch} 
        initialValues={query} 
      />
      <hr className="my-4 opacity-25" />
      <Rentals searchParams={query} />
    </Container>
  );
}

export default Search;